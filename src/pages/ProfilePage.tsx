import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, UserPlus, ShieldCheck, MapPin, Calendar, ExternalLink, ArrowRight, Activity } from 'lucide-react';
import LabXReputationCard from '../components/reputation/LabXReputationCard';
import LabXPoints from '../components/reputation/LabXPoints';
import LabXContributionHeatmap from '../components/reputation/LabXContributionHeatmap';
import ContributionBadge from '../components/reputation/ContributionBadge';
import ProjectPulseCard from '../components/projects/ProjectPulseCard';
import RoadmapVisualizer from '../components/roadmap/RoadmapVisualizer';
import FundingProgressTimeline from '../components/funding/FundingProgressTimeline';
import { userService, projectService, buildUpdateService, networkService, roadmapService, fundingService } from '../services';
import { useAuth } from '../context/AuthContext';
import type { User, Project, BuildUpdate, ConnectionStatus, ProjectRoadmap, FundingProgress } from '../types';
import { pageTransition } from '../animations';
import { formatRelativeTime } from '../utils';

/**
 * ProfilePage handles two modes:
 * - /profile           → always shows the AUTHENTICATED current user (protected route)
 * - /profile/:username → shows a PUBLIC user profile for that username
 */
export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [updates, setUpdates] = useState<BuildUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'proof' | 'achievements'>('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [primaryRoadmap, setPrimaryRoadmap] = useState<ProjectRoadmap | null>(null);
  const [funding, setFunding] = useState<FundingProgress | null>(null);

  // Determine if this is viewing own profile or a public profile
  const isOwnProfile = !username;
  const isViewingOtherUser = !!username;

  useEffect(() => {
    setIsLoading(true);
    setProfileUser(null);

    let targetPromise: Promise<User | null | undefined>;

    if (isOwnProfile) {
      // /profile → always show the authenticated current user
      // This path is protected by ProtectedRoute, so currentUser will always exist
      if (!currentUser) {
        navigate('/login', { replace: true });
        return;
      }
      targetPromise = Promise.resolve(currentUser);
    } else {
      // /profile/:username → show public profile for that username
      targetPromise = userService.getUserByUsername(username!);
    }

    targetPromise.then(u => {
      if (!u) {
        setIsLoading(false);
        return;
      }
      setProfileUser(u);
      Promise.all([
        projectService.getProjects(),
        buildUpdateService.getBuildUpdates(),
        isAuthenticated && isViewingOtherUser
          ? networkService.isFollowing('current-user', u.id)
          : Promise.resolve(false),
        roadmapService.getPrimaryRoadmap(u.id),
        fundingService.getFundingProgress(u.id),
      ]).then(([pList, uList, following, roadmap, fundProgress]) => {
        setProjects(pList.filter(p => u.projectIds.includes(p.id) || p.ownerName === u.name));
        setUpdates(uList.filter(bu => bu.authorName === u.name));
        setIsFollowing(following as boolean);
        setPrimaryRoadmap(roadmap);
        setFunding(fundProgress);
        setIsLoading(false);
      });
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, currentUser?.id]);

  const handleFollow = async () => {
    if (!profileUser || isActionLoading || isOwnProfile) return;
    setIsActionLoading(true);
    if (isFollowing) {
      await networkService.unfollowUser(profileUser.id);
      setIsFollowing(false);
      setProfileUser(prev => prev ? { ...prev, followersCount: Math.max(0, (prev.followersCount || 0) - 1) } : prev);
    } else {
      await networkService.followUser(profileUser.id);
      setIsFollowing(true);
      setProfileUser(prev => prev ? { ...prev, followersCount: (prev.followersCount || 0) + 1 } : prev);
    }
    setIsActionLoading(false);
  };

  const handleConnect = async () => {
    if (!profileUser || isActionLoading || connectionStatus || isOwnProfile) return;
    setIsActionLoading(true);
    await networkService.sendConnectionRequest(profileUser.id);
    setConnectionStatus('pending');
    setIsActionLoading(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#22D3EE] border-t-transparent rounded-full animate-spin" />
          <p className="text-labx-text-muted text-sm">Loading builder profile...</p>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="labx-card p-12 max-w-md mx-auto">
          <Users className="w-12 h-12 text-labx-text-muted mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-labx-text mb-2">Builder Not Found</h2>
          <p className="text-labx-text-muted mb-6 text-sm">
            This profile doesn't exist or may have been removed.
          </p>
          <Link to="/discover" className="labx-button-primary px-5 py-2.5 rounded-xl text-sm inline-flex items-center gap-2">
            <span>Discover Builders</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Profile Header */}
      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#22D3EE]/8 via-[#7C3AED]/4 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
            <div className="relative">
              <img
                src={profileUser.avatar}
                alt={profileUser.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-[#22D3EE]/50 shadow-[0_0_20px_rgba(34,211,238,0.2)] object-cover"
              />
              {isOwnProfile && (
                <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#22D3EE] border-2 border-labx-bg flex items-center justify-center">
                  <Activity className="w-2.5 h-2.5 text-[#05060A]" />
                </span>
              )}
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-labx-text">{profileUser.name}</h1>
                {profileUser.isVerified && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-[#22D3EE] bg-[#22D3EE]/10 px-2.5 py-0.5 rounded-full border border-[#22D3EE]/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
                {isOwnProfile && (
                  <span className="text-xs font-semibold text-[#A855F7] bg-[#A855F7]/10 px-2.5 py-0.5 rounded-full border border-[#A855F7]/30">
                    You
                  </span>
                )}
                <span className="text-xs font-mono text-labx-text-muted">@{profileUser.username}</span>
              </div>

              <p className="text-sm font-medium text-labx-text-secondary max-w-xl">{profileUser.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-labx-text-muted pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{profileUser.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Joined {profileUser.joinedDate}</span>
                </span>
              </div>

              {/* Networking Stats */}
              <div className="flex flex-wrap items-center gap-6 pt-2 pb-1 border-t border-labx-border/30 mt-3">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-labx-text">{profileUser.followersCount?.toLocaleString() || 0}</span>
                  <span className="text-[10px] uppercase tracking-wider text-labx-text-muted">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-labx-text">{profileUser.connectionsCount?.toLocaleString() || 0}</span>
                  <span className="text-[10px] uppercase tracking-wider text-labx-text-muted">Connections</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-labx-text">{projects.length}</span>
                  <span className="text-[10px] uppercase tracking-wider text-labx-text-muted">Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-[#F59E0B]">
                    <LabXPoints points={profileUser.labxPoints} size="sm" hideText />
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-labx-text-muted mt-1">LabX Points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Reputation Ring */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 self-stretch sm:self-center">
            {/* Only show follow/connect for OTHER users */}
            {isViewingOtherUser && isAuthenticated && (
              <div className="flex gap-2 w-full">
                <button
                  onClick={handleFollow}
                  disabled={isActionLoading}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isFollowing
                      ? 'bg-labx-surface border border-labx-border text-labx-text hover:bg-labx-surface-hover'
                      : 'bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white hover:brightness-110 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  }`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button
                  onClick={handleConnect}
                  disabled={isActionLoading || connectionStatus !== null}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-labx-surface border border-labx-border text-labx-text hover:bg-labx-surface-hover transition-all disabled:opacity-50"
                >
                  <UserPlus className="w-4 h-4" />
                  {connectionStatus === 'pending' ? 'Request Sent' : 'Connect'}
                </button>
              </div>
            )}
            {/* Show edit profile for own profile */}
            {isOwnProfile && (
              <Link
                to="/settings"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-labx-surface border border-[#22D3EE]/30 text-[#22D3EE] hover:bg-[#22D3EE]/10 transition-all"
              >
                Edit Profile
              </Link>
            )}
            <div className="self-center hidden sm:block min-w-[280px]">
              <LabXReputationCard user={profileUser} />
            </div>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="mt-6 pt-6 border-t border-labx-border/60 flex flex-wrap gap-2">
          {profileUser.skills.map(skill => (
            <span key={skill} className="px-3 py-1 rounded-lg text-xs font-mono bg-labx-surface border border-labx-border text-labx-text-secondary hover:border-[#22D3EE]/30 transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex gap-2 border-b border-labx-border mb-8 pb-1 overflow-x-auto">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'projects', label: `Projects (${projects.length})` },
          { id: 'proof', label: `Build Logs (${updates.length})` },
          { id: 'achievements', label: `Achievements (${profileUser.achievements.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white font-bold shadow-lg shadow-cyan-500/20'
                : 'text-labx-text-muted hover:text-labx-text hover:bg-labx-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <LabXContributionHeatmap streak={profileUser.contributionStreak} />

          {primaryRoadmap && (
            <div>
              <h3 className="text-lg font-bold text-labx-text mb-4">Innovation Journey</h3>
              <div className="bg-labx-surface border border-labx-border rounded-2xl p-6">
                <div className="hidden md:block">
                  <RoadmapVisualizer roadmap={primaryRoadmap} layout="horizontal" showDetails={false} />
                </div>
                <div className="md:hidden">
                  <RoadmapVisualizer roadmap={primaryRoadmap} layout="vertical" showDetails={false} />
                </div>
                {(() => {
                  const currentStage = primaryRoadmap.stages.find(s => s.status === 'CURRENT');
                  if (!currentStage) return null;
                  return (
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                      <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Current Stage</div>
                      <div className="text-xl font-black text-[#22D3EE] uppercase mb-1">{currentStage.name}</div>
                      <div className="text-xs text-white font-medium">{currentStage.progress}% Complete</div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-labx-text mb-4">Featured Projects</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {projects.slice(0, 2).map(p => (
                  <ProjectPulseCard key={p.id} project={p} />
                ))}
                {projects.length === 0 && (
                  <div className="sm:col-span-2 labx-card p-8 text-center">
                    <p className="text-labx-text-muted text-sm">No projects yet.</p>
                  </div>
                )}
              </div>
            </div>

            {funding && (
              <div>
                <h3 className="text-lg font-bold text-labx-text mb-4">Funding Journey</h3>
                <FundingProgressTimeline
                  currentPoints={funding.progress.current}
                  targetPoints={funding.progress.target}
                />
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-labx-text mb-4">Proof Badges</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {profileUser.achievements.map(ach => (
                <ContributionBadge key={ach.id} achievement={ach} />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(p => (
            <ProjectPulseCard key={p.id} project={p} />
          ))}
          {projects.length === 0 && (
            <div className="col-span-full labx-card p-12 text-center">
              <p className="text-labx-text-muted">No projects to display.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'proof' && (
        <div className="space-y-4">
          {updates.map(up => (
            <div key={up.id} className="labx-card p-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold font-mono text-[#22D3EE]">Day {up.day} · {up.projectName}</span>
                <span className="text-xs text-labx-text-muted">{formatRelativeTime(up.createdAt)}</span>
              </div>
              <h4 className="text-base font-bold text-labx-text mb-2">{up.title}</h4>
              <p className="text-sm text-labx-text-secondary leading-relaxed mb-3">{up.content}</p>
              {up.proofUrl && (
                <a href={up.proofUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-[#22D3EE] font-mono hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{up.proofUrl}</span>
                </a>
              )}
            </div>
          ))}
          {updates.length === 0 && (
            <div className="labx-card p-12 text-center">
              <p className="text-labx-text-muted">No build logs yet.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {profileUser.achievements.map(ach => (
            <ContributionBadge key={ach.id} achievement={ach} />
          ))}
          {profileUser.achievements.length === 0 && (
            <div className="col-span-full labx-card p-12 text-center">
              <p className="text-labx-text-muted">No achievements yet. Start building to earn badges!</p>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
