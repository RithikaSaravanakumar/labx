import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mockProjects } from '../data/mockData';

export default function MyProjectsPage() {
  const { user } = useAuth();
  const projects = useMemo(() => {
    if (!user) return [];
    const userProjects = mockProjects.filter(
      p => user.projectIds.includes(p.id) || p.ownerName === user.name || p.teamMembers.some(tm => tm.userId === user.id)
    );
    return userProjects.length > 0 ? userProjects : mockProjects.slice(0, 2);
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-labx-border/80 pb-6">
        <div>
          <span className="text-xs font-bold text-labx-violet uppercase tracking-wider">
            Your Workspace
          </span>
          <h1 className="text-3xl font-black text-labx-text tracking-tight mt-1">
            My Projects &amp; <span className="labx-gradient-text">Builds</span>
          </h1>
          <p className="text-xs sm:text-sm text-labx-text-secondary mt-1">
            Track milestones, manage contributors, and publish verified build updates.
          </p>
        </div>

        <Link
          to="/build"
          className="px-4 py-2.5 rounded-xl font-black text-xs text-black bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#34D399] hover:brightness-110 flex items-center gap-2 shadow-lg shadow-emerald-500/25"
        >
          <Plus className="w-4 h-4" />
          <span>Turn Idea Into Reality</span>
        </Link>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-labx-surface/90 border border-labx-border hover:border-labx-violet/40 transition-all flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-labx-violet/10 text-labx-violet border border-labx-violet/20">
                  {project.stage}
                </span>
                <span className="text-xs font-mono text-labx-cyan">
                  +{project.labxPoints} pts
                </span>
              </div>

              <h2 className="text-lg font-bold text-labx-text group-hover:text-labx-violet transition-colors">
                {project.name}
              </h2>
              <p className="text-xs text-labx-text-secondary mt-1.5 line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Progress bar */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] text-labx-text-muted">
                  <span>Milestone Completion</span>
                  <span className="font-mono text-labx-text font-bold">{project.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-labx-bg rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-labx-violet to-labx-cyan rounded-full transition-all duration-500"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-labx-border/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-labx-text-muted">
                <Users className="w-3.5 h-3.5" />
                <span>{project.teamMembers.length} builders</span>
              </div>

              <Link
                to={`/projects/${project.id}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-labx-violet hover:text-labx-lavender transition-colors"
              >
                <span>View Workspace</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
