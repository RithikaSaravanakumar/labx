import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, CheckCircle, ArrowRight } from 'lucide-react';
import type { Mentor } from '../../types';

interface ContextualMentorMatchProps {
  mentor: Mentor & { matchScore?: number; matchReasons?: string[] };
}

export default function ContextualMentorMatch({ mentor }: ContextualMentorMatchProps) {
  const matchScore = mentor.matchScore || 94;
  const matchReasons = mentor.matchReasons || mentor.expertise.slice(0, 2);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="labx-card p-6 flex flex-col justify-between h-full group relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 bg-gradient-to-l from-labx-cyan/20 to-transparent text-labx-cyan text-[10px] font-mono font-bold px-3 py-1 rounded-bl-xl border-b border-l border-labx-cyan/30">
         {matchScore}% AI Match
      </div>

      <div>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={mentor.avatar}
            alt={mentor.name}
            className="w-14 h-14 rounded-2xl border-2 border-labx-cyan/50 object-cover group-hover:border-labx-cyan transition-colors shadow-[0_0_12px_rgba(34, 211, 238,0.15)]"
          />
          <div>
            <h3 className="text-base font-bold text-labx-text group-hover:text-labx-cyan transition-colors flex items-center gap-1.5">
              {mentor.name}
              {mentor.isVerified && <CheckCircle className="w-4 h-4 text-labx-cyan fill-labx-cyan/20" />}
            </h3>
            <p className="text-xs text-labx-text-muted line-clamp-1">{mentor.title} at {mentor.company || 'Tech Corp'}</p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mt-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{mentor.rating} ({mentor.totalSessions} Sessions)</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-labx-text-secondary line-clamp-2 mb-4 leading-relaxed">
          {mentor.bio}
        </p>

        {/* Match Reasons */}
        <div className="mb-4 bg-labx-surface/60 border border-labx-border/60 p-2.5 rounded-xl">
          <div className="text-[10px] uppercase font-mono font-bold text-labx-cyan mb-1">Contextual Synergy</div>
          <div className="flex flex-wrap gap-1">
            {matchReasons.map(reason => (
              <span key={reason} className="text-[10px] font-mono text-labx-text-muted bg-labx-bg px-2 py-0.5 rounded border border-labx-border/30">
                 {reason}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-labx-border/60 text-xs">
        <span className={`font-semibold font-mono ${
          mentor.availability === 'available' ? 'text-cyan-300' : 'text-amber-400'
        }`}>
          ● {mentor.availability === 'available' ? 'Available this week' : 'Limited slots'}
        </span>

        <Link
          to={`/mentors/${mentor.id}`}
          className="labx-button-primary px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1"
        >
          <span>Book Office Hours</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}
