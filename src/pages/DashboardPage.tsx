import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Plus, Bell, Award, ChevronRight } from 'lucide-react';
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [primaryRoadmap, setPrimaryRoadmap] = useState<ProjectRoadmap | null>(null);
  const [funding, setFunding] = useState<FundingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      projectService.getProjects(),
      mentorService.getMentors(),
      notificationService.getNotifications()
    ]).then(async ([projList, mentorList, notifList]) => {
      setProjects(projList.slice(0, 3));
      setMentors(mentorList.slice(0, 2));
      setNotifications(notifList.slice(0, 3));
      
      
      if (currentUser) {
        const [roadmap, fundProgress] = await Promise.all([
          roadmapService.getPrimaryRoadmap(currentUser.id),
          fundingService.getFundingProgress(currentUser.id)
        ]);
        setPrimaryRoadmap(roadmap);
        setFunding(fundProgress);
      }
      
      setIsLoading(false);
    });
  }, [currentUser]);

  if (isLoading || !currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Skeleton */}
        <div className="labx-card p-6 sm:p-8 h-48 relative overflow-hidden bg-[#0A0C0B]">
          <Skeleton className="w-1/3 h-8 mb-6" />
          <div className="flex gap-4">
            <Skeleton className="w-48 h-20" />
            <Skeleton className="w-48 h-20" />
          </div>
        </div>
        {/* Projects Skeleton */}
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
      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden bg-gradient-to-r from-emerald-500/20 via-teal-900/10 to-labx-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-labx-green mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Personal Innovation Hub</span>
            </div>
            <h1 className="text-3xl font-extrabold text-labx-text">
              Welcome back, {currentUser.name}! 👋
            </h1>
            
            {primaryRoadmap && (() => {
              const currentStage = primaryRoadmap.stages.find(s => s.status === 'CURRENT');
              const nextMilestone = roadmapService.getNextMilestone(primaryRoadmap);
              
              if (!currentStage) return null;
              
              return (
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Your Journey</div>
                    <div className="text-2xl font-black text-white uppercase">{currentStage.name}</div>
                    <div className="text-xs text-[#00FF87] font-bold mt-1">Stage {currentStage.order} of {primaryRoadmap.stages.length} — {currentStage.progress}% Complete</div>
                  </div>
                  
                  {nextMilestone && (
                    <div className="bg-black/40 border border-white/10 rounded-xl p-3 max-w-sm">
                      <div className="text-[9px] text-zinc-500 font-bold uppercase mb-1">Next Milestone</div>
                      <div className="text-xs text-white font-medium mb-1 line-clamp-1">{nextMilestone.title}</div>
                      <div className="text-[10px] text-[#00FF87] font-bold">
                        <LabXPoints points={nextMilestone.pointsReward} showPlus size="xs" textClassName="text-[#00FF87]" />
                      </div>
                    </div>
                  )}
                  
                  <Link to="/roadmap" className="mt-2 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-[#00FF87] hover:bg-emerald-400 text-black text-xs font-bold uppercase rounded-xl transition-colors">
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
          <div className="flex items-center gap-4">
            <Link
              to="/projects/new"
              className="labx-button-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap"
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
                <Rocket className="w-5 h-5 text-labx-green" />
                <span>Active Projects</span>
              </h2>
              <Link to="/projects" className="text-xs font-semibold text-labx-green hover:underline flex items-center gap-1">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {projects.length === 0 ? (
              <EmptyState 
                icon={Rocket} 
                title="No Active Projects" 
                description="You aren't working on any projects yet. Start a new build or join an existing one to track your telemetry here."
                action={
                  <Link to="/projects/new" className="text-[#00FF87] hover:underline text-xs font-bold uppercase">
                    Launch Project →
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

        {/* Right Sidebar: Recommendations & Notifications */}
        <div className="space-y-6">
          {/* Notifications Widget */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-[#0A0C0B]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 hover:border-emerald-500/30 hover:shadow-emerald-500/10"
          >
            <h3 className="text-base font-bold text-labx-text mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-labx-green" />
              <span>Telemetry Notifications</span>
            </h3>

            {notifications.length === 0 ? (
              <EmptyState 
                icon={Bell} 
                title="Telemetry Clear" 
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
            className="p-6 rounded-2xl bg-[#0A0C0B]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.5)] transition-all duration-300 hover:border-emerald-500/30 hover:shadow-emerald-500/10"
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
                    <Link to={`/mentors/${m.id}`} className="text-xs text-labx-green font-semibold hover:underline">
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
