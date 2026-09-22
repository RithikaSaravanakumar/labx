import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, GitBranch, ArrowUpRight, Flame } from 'lucide-react';
import type { Project } from '../../types';
import { DOMAIN_LABELS, DOMAIN_COLORS, STAGE_LABELS } from '../../constants';

interface ProjectPulseCardProps {
  project: Project;
}

export default function ProjectPulseCard({ project }: ProjectPulseCardProps) {
  const domainColor = DOMAIN_COLORS[project.domain] || '#8B5CF6';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="labx-card p-6 flex flex-col justify-between h-full group relative overflow-hidden"
    >
      {/* Glow border on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at top right, ${domainColor}, transparent 70%)` }}
      />

      <div>
        {/* Header badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${domainColor}20`, color: domainColor }}
            >
              {DOMAIN_LABELS[project.domain]}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-labx-surface text-labx-text-muted uppercase">
              {STAGE_LABELS[project.stage]}
            </span>
          </div>
          {project.trendingScore && project.trendingScore > 85 && (
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>{project.trendingScore} Score</span>
            </div>
          )}
        </div>

        {/* Title & Tagline */}
        <Link to={`/projects/${project.id}`}>
          <h3 className="text-xl font-bold text-labx-text group-hover:text-labx-violet transition-colors mb-1.5 flex items-center gap-2">
            {project.name}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-labx-violet" />
          </h3>
        </Link>
        <p className="text-sm text-labx-text-secondary line-clamp-2 mb-5 leading-relaxed">
          {project.description}
        </p>
      </div>

      <div>
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map(tech => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-xs font-mono bg-labx-bg border border-labx-border/50 text-labx-text-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mb-5">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-labx-text-muted font-medium">Milestone Progress</span>
            <span className="text-labx-violet font-semibold font-mono">{project.progress}%</span>
          </div>
          <div className="h-2 bg-labx-bg rounded-full overflow-hidden p-0.5 border border-labx-border/30">
            <div
              className="h-full rounded-full bg-gradient-to-r from-labx-violet via-purple-500 to-labx-cyan transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Footer info */}
        <div className="flex items-center justify-between pt-4 border-t border-labx-border/60 text-xs text-labx-text-muted">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-labx-text-muted" />
              <span>{project.contributorCount} builders</span>
            </div>
            {project.lookingFor && project.lookingFor.length > 0 && (
              <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded">
                Hiring {project.lookingFor.length} roles
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 font-mono text-[11px]">
            <GitBranch className="w-3.5 h-3.5" />
            <span>v0.8.2</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
