import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { User } from '../../types';
import { getLevelProgress } from '../../utils';
import LabXPoints from './LabXPoints';

interface LabXReputationCardProps {
  user: User;
  className?: string;
}

export default function LabXReputationCard({ user, className = '' }: LabXReputationCardProps) {
  const { level, currentLevelMinimum, nextLevelThreshold, remaining, percentage } = getLevelProgress(user.labxPoints, user.level);

  const formattedPoints = user.labxPoints.toLocaleString();
  const formattedNextLevelThreshold = nextLevelThreshold.toLocaleString();
  const roleDisplay = user.role.charAt(0).toUpperCase() + user.role.slice(1);

  return (
    <div className={`relative w-full rounded-2xl bg-[#080A12] border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.4)] overflow-hidden group ${className}`}>
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00F0FF]/[0.03] to-transparent pointer-events-none" />
      
      <div className="p-5 flex flex-col relative z-10">
        
        {/* Top Header Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {/* Minimalist Level Ring */}
            <div className="relative flex items-center justify-center w-8 h-8">
              <svg className="absolute inset-0 w-full h-full -rotate-90 transform" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                <circle 
                  cx="16" 
                  cy="16" 
                  r="14" 
                  fill="none" 
                  stroke="#00F0FF" 
                  strokeWidth="1.5" 
                  strokeDasharray="88"
                  strokeDashoffset={88 - (88 * percentage) / 100}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <span className="text-[10px] font-bold text-white tracking-widest leading-none mt-0.5">
                {level.toString().padStart(2, '0')}
              </span>
            </div>
            
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">
                Level {level.toString().padStart(2, '0')}
              </span>
              <span className="text-sm font-bold text-white tracking-wide leading-none truncate max-w-[140px] sm:max-w-[200px]">
                {user.name}
              </span>
            </div>
          </div>
          
          <Link 
            to="/profile" 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-zinc-400 hover:text-white"
            aria-label={`View ${user.name}'s profile`}
          >
            <span className="text-[10px] font-bold uppercase tracking-wider">View</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Points Display */}
        <div className="mb-4 text-xl sm:text-2xl font-black text-[#00F0FF] tracking-tight">
          <LabXPoints points={user.labxPoints} size="md" />
        </div>

        {/* Progress Bar Row */}
        <div className="mb-5 flex flex-col gap-2">
          <div className="flex items-center justify-between text-[10px] font-bold text-zinc-500 tracking-wider">
            <span>{currentLevelMinimum.toLocaleString()} PTS</span>
            <span>{formattedNextLevelThreshold} PTS</span>
          </div>
          
          <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/5 relative" aria-label={`Level ${level}, ${formattedPoints} LABX points, ${remaining} points required to reach Level ${level + 1}.`}>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#00F0FF]/50 to-[#00F0FF] rounded-full"
            />
          </div>
          
          <div className="text-[10px] font-medium text-zinc-400 text-right mt-0.5">
            <span className="text-white font-bold">{remaining.toLocaleString()}</span> points to Level {level + 1}
          </div>
        </div>

        {/* Reputation Context Row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[10px] font-bold uppercase tracking-wider">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-white">{user.projectIds?.length || 0}</span> Projects
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-white">{user.achievements?.length || 0}</span> Achievements
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <span className="w-1 h-1 rounded-full bg-zinc-600" />
            <span className="text-[#00F0FF]">{roleDisplay}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
