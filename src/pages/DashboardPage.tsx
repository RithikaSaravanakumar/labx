import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rocket, Plus, Bell, Award, ChevronRight } from 'lucide-react';
import LabXPointRing from '../components/reputation/LabXPointRing';
import ProjectPulseCard from '../components/projects/ProjectPulseCard';
import { userService, projectService, mentorService, notificationService } from '../services';
import type { User, Project, Mentor, Notification } from '../types';
import { pageTransition } from '../animations';

export default function DashboardPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      userService.getCurrentUser(),
      projectService.getProjects(),
      mentorService.getMentors(),
      notificationService.getNotifications()
    ]).then(([user, projList, mentorList, notifList]) => {
      setCurrentUser(user);
      setProjects(projList.slice(0, 3));
      setMentors(mentorList.slice(0, 2));
      setNotifications(notifList.slice(0, 3));
      setIsLoading(false);
    });
  }, []);

  if (isLoading || !currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-labx-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-labx-text-muted">Loading workspace environment...</p>
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
      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden bg-gradient-to-r from-labx-violet/20 via-purple-900/10 to-labx-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-labx-violet mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Personal Innovation Hub</span>
            </div>
            <h1 className="text-3xl font-extrabold text-labx-text">
              Welcome back, {currentUser.name}! 👋
            </h1>
            <p className="text-sm text-labx-text-secondary mt-1 max-w-xl">
              You have <span className="text-labx-violet font-semibold">3 active project milestones</span> pending and 2 recommended mentor matches ready.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <LabXPointRing points={currentUser.labxPoints} level={currentUser.level} size={100} strokeWidth={7} />
            <Link
              to="/build"
              className="labx-button-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap"
            >
              <Plus className="w-4 h-4" />
              <span>Log Build</span>
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
                <Rocket className="w-5 h-5 text-labx-violet" />
                <span>Active Projects</span>
              </h2>
              <Link to="/projects" className="text-xs font-semibold text-labx-violet hover:underline flex items-center gap-1">
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {projects.map(p => (
                <ProjectPulseCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Recommendations & Notifications */}
        <div className="space-y-6">
          {/* Notifications Widget */}
          <div className="labx-card p-6">
            <h3 className="text-base font-bold text-labx-text mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-labx-cyan" />
              <span>Telemetry Notifications</span>
            </h3>

            <div className="space-y-3">
              {notifications.map(n => (
                <div key={n.id} className="p-3 rounded-xl bg-labx-surface border border-labx-border/60">
                  <div className="text-xs font-bold text-labx-text mb-1">{n.title}</div>
                  <div className="text-xs text-labx-text-secondary line-clamp-2">{n.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Mentors */}
          <div className="labx-card p-6">
            <h3 className="text-base font-bold text-labx-text mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Recommended Mentors</span>
            </h3>

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
                  <Link to={`/mentors/${m.id}`} className="text-xs text-labx-violet font-semibold hover:underline">
                    Connect
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
