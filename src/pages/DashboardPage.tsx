import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Plus, Bell, Award, ChevronRight, Target, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LabXReputationCard from '../components/reputation/LabXReputationCard';
import LabXPoints from '../components/reputation/LabXPoints';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ProjectPulseCard from '../components/projects/ProjectPulseCard';
import { projectService, mentorService, notificationService, roadmapService, fundingService } from '../services';
import type { Project, Mentor, Notification, ProjectRoadmap, FundingProgress } from '../types';
import { pageTransition } from '../animations';

export default function DashboardPage() {
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [primaryRoadmap, setPrimaryRoadmap] = useState<ProjectRoadmap | null>(null);
  const [funding, setFunding] = useState<FundingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    Promise.all([
      projectService.getProjects(),
      mentorService.getMentors(),
      notificationService.getNotifications()
    ]).then(async ([projList, mentorList, notifList]) => {
      setProjects(projList.slice(0, 3));
      setMentors(mentorList.slice(0, 2));
      setNotifications(notifList.slice(0, 3));

      const [roadmap, fundProgress] = await Promise.all([
        roadmapService.getPrimaryRoadmap(currentUser.id),
        fundingService.getFundingProgress(currentUser.id)
      ]);
      setPrimaryRoadmap(roadmap);
      setFunding(fundProgress);

      setIsLoading(false);
    });
  }, [currentUser]);

  if (isLoading || !currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="labx-card p-6 sm:p-8 h-48 relative overflow-hidden">
          <Skeleton className="w-1/3 h-8 mb-6" />
          <div className="flex gap-4">
            <Skeleton className="w-48 h-20" />
            <Skeleton className="w-48 h-20" />
          </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="w-48 h-6 mb-4" />
            <Skeleton className="w-full h-40" />
            <Skeleton className="w-full h-40" />
          </div>
          <div className="space-y-4">
            <Skeleton className="w-full h-64" />
          </div>
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
      {/* Welcome Banner */}
      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden bg-gradient-to-r from-[#22D3EE]/10 via-[#7C3AED]/5 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/5 to-[#7C3AED]/5 pointer-events-none" />
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#22D3EE] mb-2">
              <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
              <span>Personal Innovation Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-labx-text">
              Welcome back, {currentUser.name}!
            </h1>

            {primaryRoadmap && (() => {
              const currentStage = primaryRoadmap.stages.find(s => s.status === 'CURRENT');
              const nextMilestone = roadmapService.getNextMilestone(primaryRoadmap);

              if (!currentStage) return null;

              return (
                <div className="mt-5 flex flex-col sm:flex-row items-start sm:items-center gap-5">
                  <div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Your Journey</div>
                    <div className="text-2xl font-black text-white uppercase">{currentStage.name}</div>
                    <div className="text-xs text-[#22D3EE] font-bold mt-1">Stage {currentStage.order} of {primaryRoadmap.stages.length} — {currentStage.progress}% Complete</div>
                  </div>

                  {nextMilestone && (
                    <div className="bg-black/40 border border-white/10 rounded-xl p-3 max-w-sm">
                      <div className="text-[9px] text-zinc-500 font-bold uppercase mb-1">Next Milestone</div>
                      <div className="text-xs text-white font-medium mb-1 line-clamp-1">{nextMilestone.title}</div>
                      <div className="text-[10px] text-[#F59E0B] font-bold">
                        <LabXPoints points={nextMilestone.pointsReward} showPlus size="xs" textClassName="text-[#F59E0B]" />
                      </div>
                    </div>
                  )}

                  <Link to="/roadmap" className="mt-1 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white text-xs font-bold uppercase rounded-xl transition-all hover:brightness-110">
                    Continue Journey
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })()}
          </div>

          <div className="hidden lg:block shrink-0 w-80">
            <LabXReputationCard user={currentUser} />
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/quests"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#7C3AED]/40 text-[#A855F7] text-xs font-semibold hover:bg-[#7C3AED]/10 transition-all whitespace-nowrap"
            >
              <Target className="w-4 h-4" />
              <span>My Quests</span>
            </Link>
            <Link
              to="/projects/new"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#22D3EE] to-[#0EA5E9] text-white text-xs font-semibold hover:brightness-110 transition-all whitespace-nowrap shadow-[0_0_15px_rgba(34,211,238,0.2)]"
            >
              <Plus className="w-4 h-4" />
              <span>Create Project</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Active Projects */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-labx-text flex items-center gap-2">
                <Rocket className="w-5 h-5 text-[#22D3EE]" />
                <span>Active Projects</span>
              </h2>
              <Link to="/projects" className="text-xs font-semibold text-[#22D3EE] hover:underline flex items-center gap-1">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {projects.length === 0 ? (
              <EmptyState
                icon={Rocket}
                title="No Active Projects"
                description="You aren't working on any projects yet. Start a new build or join an existing one."
                action={
                  <Link to="/projects/new" className="text-[#22D3EE] hover:underline text-xs font-bold uppercase flex items-center gap-1">
                    Launch Project <ArrowRight className="w-3 h-3" />
                  </Link>
                }
              />
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map(p => (
                  <ProjectPulseCard key={p.id} project={p} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Notifications Widget */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-[#0D1020]/80 backdrop-blur-xl border border-white/8 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 hover:border-[#22D3EE]/20"
          >
            <h3 className="text-base font-bold text-labx-text mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#22D3EE]" />
              <span>Notifications</span>
            </h3>

            {notifications.length === 0 ? (
              <EmptyState
                icon={Bell}
                title="All Clear"
                description="No recent ecosystem updates."
              />
            ) : (
              <div className="space-y-3">
                {notifications.map(n => (
                  <div key={n.id} className="p-3 rounded-xl bg-labx-surface border border-labx-border/60">
                    <div className="text-xs font-bold text-labx-text mb-1">{n.title}</div>
                    <div className="text-xs text-labx-text-secondary line-clamp-2">{n.message}</div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Recommended Mentors */}
          <motion.div
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-[#0D1020]/80 backdrop-blur-xl border border-white/8 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 hover:border-[#A855F7]/20"
          >
            <h3 className="text-base font-bold text-labx-text mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Recommended Mentors</span>
            </h3>

            {mentors.length === 0 ? (
              <EmptyState
                icon={Award}
                title="No Recommendations"
                description="Update your project domains to get tailored mentor suggestions."
              />
            ) : (
              <div className="space-y-4">
                {mentors.map(m => (
                  <div key={m.id} className="flex items-center justify-between p-3 rounded-xl bg-labx-surface border border-labx-border/60">
                    <div className="flex items-center gap-3">
                      <img src={m.avatar} alt={m.name} className="w-9 h-9 rounded-full object-cover border border-labx-border" />
                      <div>
                        <div className="text-xs font-bold text-labx-text">{m.name}</div>
                        <div className="text-[11px] text-labx-text-muted">{m.title}</div>
                      </div>
                    </div>
                    <Link to={`/mentors/${m.id}`} className="text-xs text-[#22D3EE] font-semibold hover:underline">
                      Connect
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
