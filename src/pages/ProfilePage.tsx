import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, UserPlus, Send, Activity, ShieldCheck, MapPin, Calendar, ExternalLink } from 'lucide-react';
import LabXReputationCard from '../components/reputation/LabXReputationCard';
import LabXPoints from '../components/reputation/LabXPoints';
import LabXContributionHeatmap from '../components/reputation/LabXContributionHeatmap';
import ContributionBadge from '../components/reputation/ContributionBadge';
import ProjectPulseCard from '../components/projects/ProjectPulseCard';
import RoadmapVisualizer from '../components/roadmap/RoadmapVisualizer';
import FundingProgressTimeline from '../components/funding/FundingProgressTimeline';
import { userService, projectService, buildUpdateService, networkService, roadmapService, fundingService } from '../services';
import type { User, Project, BuildUpdate, ConnectionStatus, ProjectRoadmap, FundingProgress } from '../types';
import { pageTransition } from '../animations';
import { formatRelativeTime } from '../utils';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [updates, setUpdates] = useState<BuildUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'proof' | 'achievements'>('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  
  const [primaryRoadmap, setPrimaryRoadmap] = useState<ProjectRoadmap | null>(null);
  const [funding, setFunding] = useState<FundingProgress | null>(null);

  useEffect(() => {
    const target = username ? userService.getUserByUsername(username) : userService.getCurrentUser();

    target.then(u => {
      if (u) {
        setUser(u);
        Promise.all([
          projectService.getProjects(),
          buildUpdateService.getBuildUpdates(),
          networkService.isFollowing('current-user', u.id),
          roadmapService.getPrimaryRoadmap(u.id),
          fundingService.getFundingProgress(u.id)
        ]).then(([pList, uList, following, roadmap, fundProgress]) => {
          setProjects(pList.filter(p => u.projectIds.includes(p.id) || p.ownerName === u.name));
          setUpdates(uList.filter(bu => bu.authorName === u.name));
          setIsFollowing(following);
          setPrimaryRoadmap(roadmap);
          setFunding(fundProgress);
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, [username]);

  const handleFollow = async () => {
    if (!user || isActionLoading) return;
    setIsActionLoading(true);
    if (isFollowing) {
      await networkService.unfollowUser(user.id);
      setIsFollowing(false);
      setUser(prev => prev ? { ...prev, followersCount: Math.max(0, (prev.followersCount || 0) - 1) } : prev);
    } else {
      await networkService.followUser(user.id);
      setIsFollowing(true);
      setUser(prev => prev ? { ...prev, followersCount: (prev.followersCount || 0) + 1 } : prev);
    }
    setIsActionLoading(false);
  };

  const handleConnect = async () => {
    if (!user || isActionLoading || connectionStatus) return;
    setIsActionLoading(true);
    await networkService.sendConnectionRequest(user.id);
    setConnectionStatus('pending');
    setIsActionLoading(false);
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-labx-green border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-labx-text-muted">Loading builder profile telemetry...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-labx-text mb-2">Builder Profile Not Found</h2>
        <Link to="/discover" className="labx-button-primary px-4 py-2 rounded-xl text-xs">Discover Ecosystem</Link>
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
      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/15 via-teal-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 flex-1">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-labx-green/60 shadow-[0_0_20px_rgba(0,255,135,0.2)] object-cover"
            />
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-labx-text">{user.name}</h1>
                {user.isVerified && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-labx-green bg-labx-green/10 px-2.5 py-0.5 rounded-full border border-labx-green/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                )}
                <span className="text-xs font-mono text-labx-text-muted">@{user.username}</span>
              </div>

              <p className="text-sm font-medium text-labx-text-secondary max-w-xl">{user.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-labx-text-muted pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{user.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Joined {user.joinedDate}</span>
                </span>
              </div>

              {/* Networking Stats */}
              <div className="flex flex-wrap items-center gap-6 pt-2 pb-1 border-t border-labx-border/30 mt-3">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-labx-text">{user.followersCount?.toLocaleString() || 0}</span>
                  <span className="text-[10px] uppercase tracking-wider text-labx-text-muted">Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-labx-text">{user.connectionsCount?.toLocaleString() || 0}</span>
                  <span className="text-[10px] uppercase tracking-wider text-labx-text-muted">Connections</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-labx-text">{projects.length}</span>
                  <span className="text-[10px] uppercase tracking-wider text-labx-text-muted">Projects</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-labx-green">
                    <LabXPoints points={user.labxPoints} size="sm" hideText />
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-labx-text-muted mt-1">LabX Points</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions & Level Ring */}
          <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 self-stretch sm:self-center">
            {username && username !== 'current-user' && (
              <div className="flex gap-2 w-full">
                <button
                  onClick={handleFollow}
                  disabled={isActionLoading}
                  className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    isFollowing
                      ? 'bg-labx-surface border border-labx-border text-labx-text hover:bg-labx-surface-hover'
                      : 'bg-labx-green text-black hover:bg-emerald-400 shadow-[0_0_15px_rgba(0,255,135,0.3)]'
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
            <div className="self-center hidden sm:block min-w-[280px]">
              <LabXReputationCard user={user} />
            </div>
          </div>
        </div>

        {/* Skills Pills */}
        <div className="mt-6 pt-6 border-t border-labx-border/60 flex flex-wrap gap-2">
          {user.skills.map(skill => (
            <span key={skill} className="px-3 py-1 rounded-lg text-xs font-mono bg-labx-surface border border-labx-border text-labx-text">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex gap-2 border-b border-labx-border mb-8 pb-1">
        {[
          { id: 'overview', label: 'Proof-of-Work Overview' },
          { id: 'projects', label: `Projects (${projects.length})` },
          { id: 'proof', label: `Build Logs (${updates.length})` },
          { id: 'achievements', label: `Achievements (${user.achievements.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-labx-green text-black font-bold shadow-lg shadow-emerald-500/20'
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
          {/* Heatmap */}
          <LabXContributionHeatmap streak={user.contributionStreak} />

          {/* Innovation Journey (Compact) */}
          {primaryRoadmap && (
            <div>
              <h3 className="text-lg font-bold text-labx-text mb-4">My Innovation Journey</h3>
              <div className="bg-[#0A0C0B] border border-white/5 rounded-2xl p-6">
                <div className="hidden md:block">
                  <RoadmapVisualizer roadmap={primaryRoadmap} layout="horizontal" showDetails={false} />
                </div>
                <div className="md:hidden">
                  <RoadmapVisualizer roadmap={primaryRoadmap} layout="vertical" showDetails={false} />
                </div>
                
                {/* Current Stage Summary */}
                {(() => {
                  const currentStage = primaryRoadmap.stages.find(s => s.status === 'CURRENT');
                  if (!currentStage) return null;
                  return (
                    <div className="mt-6 pt-6 border-t border-white/10 text-center">
                      <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Current Stage</div>
                      <div className="text-xl font-black text-[#00FF87] uppercase mb-1">{currentStage.name}</div>
                      <div className="text-xs text-white font-medium">{currentStage.progress}% Complete</div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Top Projects */}
            <div>
              <h3 className="text-lg font-bold text-labx-text mb-4">Featured Projects</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {projects.slice(0, 2).map(p => (
                  <ProjectPulseCard key={p.id} project={p} />
                ))}
              </div>
            </div>
            
            {/* Funding Journey */}
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

          {/* Achievements Grid */}
          <div>
            <h3 className="text-lg font-bold text-labx-text mb-4">Proof Badges</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.achievements.map(ach => (
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
        </div>
      )}

      {activeTab === 'proof' && (
        <div className="space-y-4">
          {updates.map(up => (
            <div key={up.id} className="labx-card p-6">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold font-mono text-labx-green">Day {up.day} · {up.projectName}</span>
                <span className="text-xs text-labx-text-muted">{formatRelativeTime(up.createdAt)}</span>
              </div>
              <h4 className="text-base font-bold text-labx-text mb-2">{up.title}</h4>
              <p className="text-sm text-labx-text-secondary leading-relaxed mb-3">{up.content}</p>
              {up.proofUrl && (
                <a href={up.proofUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-labx-green font-mono hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{up.proofUrl}</span>
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.achievements.map(ach => (
            <ContributionBadge key={ach.id} achievement={ach} />
          ))}
        </div>
      )}
    </motion.div>
  );
}
