import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import type { Opportunity } from '../../types';

interface OpportunityRadarProps {
  opportunity: Opportunity;
}

export default function OpportunityRadar({ opportunity }: OpportunityRadarProps) {
  const deadlineDate = new Date(opportunity.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <motion.div
      whileHover={{ y: -3 }}
      className="labx-card p-6 flex flex-col justify-between h-full group relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-labx-cyan/10 text-labx-cyan border border-labx-cyan/20"
          >
            {opportunity.type}
          </span>
          {opportunity.isRemote && (
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-labx-surface text-labx-text-muted border border-labx-border/40">
               Remote
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-labx-text group-hover:text-labx-cyan transition-colors mb-1 flex items-center justify-between">
          <span>{opportunity.title}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-labx-cyan" />
        </h3>
        <p className="text-xs font-semibold text-labx-text-muted mb-3">{opportunity.organization}</p>
        <p className="text-sm text-labx-text-secondary line-clamp-2 mb-4 leading-relaxed">
          {opportunity.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {opportunity.tags.map(t => (
            <span key={t} className="px-2 py-0.5 rounded text-[10px] font-mono bg-labx-bg text-labx-text-muted border border-labx-border/30">
              #{t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-labx-border/60 text-xs text-labx-text-muted">
          <div className="flex items-center gap-1.5 font-mono text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>Deadline: {deadlineDate}</span>
          </div>
          <span> {opportunity.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
