import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Calendar, ExternalLink } from 'lucide-react';
import LabXPointRing from '../components/reputation/LabXPointRing';
import LabXContributionHeatmap from '../components/reputation/LabXContributionHeatmap';
import ContributionBadge from '../components/reputation/ContributionBadge';
import ProjectPulseCard from '../components/projects/ProjectPulseCard';
import { userService, projectService, buildUpdateService } from '../services';
import type { User, Project, BuildUpdate } from '../types';
import { pageTransition } from '../animations';
import { formatRelativeTime } from '../utils';

export default function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [updates, setUpdates] = useState<BuildUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'proof' | 'achievements'>('overview');

  useEffect(() => {
    const target = username ? userService.getUserByUsername(username) : userService.getCurrentUser();

    target.then(u => {
      if (u) {
        setUser(u);
        Promise.all([
          projectService.getProjects(),
          buildUpdateService.getBuildUpdates()
        ]).then(([pList, uList]) => {
          setProjects(pList.filter(p => u.projectIds.includes(p.id) || p.ownerName === u.name));
          setUpdates(uList.filter(bu => bu.authorName === u.name));
          setIsLoading(false);
        });
      } else {
        setIsLoading(false);
      }
    });
  }, [username]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-labx-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
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
      {/* Header Profile Card */}
      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-labx-violet/10 via-purple-500/5 to-transparent pointer-events-none" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-labx-violet shadow-xl object-cover"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-labx-text">{user.name}</h1>
                {user.isVerified && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-labx-violet bg-labx-violet/10 px-2.5 py-0.5 rounded-full border border-labx-violet/30">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Builder</span>
                  </span>
                )}
                <span className="text-xs font-mono text-labx-text-muted">@{user.username}</span>
              </div>

              <p className="text-sm text-labx-text-secondary max-w-xl">{user.bio}</p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-labx-text-muted pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{user.location}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Joined {user.joinedDate}</span>
                </span>
                <span className="flex items-center gap-1 text-amber-400 font-mono font-bold">
                  🔥 {user.contributionStreak} Day Streak
                </span>
              </div>
            </div>
          </div>

          {/* Level Ring Badge */}
          <div className="self-center md:self-auto">
            <LabXPointRing points={user.labxPoints} level={user.level} size={130} strokeWidth={9} />
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
                ? 'bg-labx-violet text-white shadow-lg shadow-labx-violet/20'
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

          {/* Top Projects */}
          <div>
            <h3 className="text-lg font-bold text-labx-text mb-4">Featured Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.slice(0, 2).map(p => (
                <ProjectPulseCard key={p.id} project={p} />
              ))}
            </div>
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
                <span className="text-xs font-bold font-mono text-labx-violet">Day {up.day} · {up.projectName}</span>
                <span className="text-xs text-labx-text-muted">{formatRelativeTime(up.createdAt)}</span>
              </div>
              <h4 className="text-base font-bold text-labx-text mb-2">{up.title}</h4>
              <p className="text-sm text-labx-text-secondary leading-relaxed mb-3">{up.content}</p>
              {up.proofUrl && (
                <a href={up.proofUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-labx-cyan font-mono hover:underline">
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
