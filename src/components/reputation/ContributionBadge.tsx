import { motion } from 'framer-motion';
import type { Achievement } from '../../types';

interface ContributionBadgeProps {
  achievement: Achievement;
}

export default function ContributionBadge({ achievement }: ContributionBadgeProps) {
  const getRarityStyle = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'legendary':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/40',
          text: 'text-amber-400',
          badgeBg: 'bg-amber-500/20 text-amber-300',
        };
      case 'epic':
        return {
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/40',
          text: 'text-purple-400',
          badgeBg: 'bg-purple-500/20 text-purple-300',
        };
      case 'rare':
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/40',
          text: 'text-cyan-400',
          badgeBg: 'bg-cyan-500/20 text-cyan-300',
        };
      default:
        return {
          bg: 'bg-labx-surface',
          border: 'border-labx-border',
          text: 'text-labx-text-secondary',
          badgeBg: 'bg-labx-surface text-labx-text-muted',
        };
    }
  };

  const style = getRarityStyle(achievement.rarity);

  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      className={`p-4 rounded-xl border ${style.bg} ${style.border} flex items-center gap-3 relative overflow-hidden group`}
    >
      <div className="text-3xl p-2 rounded-lg bg-labx-bg/60 border border-labx-border/40 shadow-inner flex items-center justify-center">
        {achievement.icon}
      </div>
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-sm font-bold text-labx-text">{achievement.name}</h4>
          <span className={`text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded ${style.badgeBg}`}>
            {achievement.rarity}
          </span>
        </div>
        <p className="text-xs text-labx-text-secondary line-clamp-1">{achievement.description}</p>
        <div className="text-[10px] text-labx-text-muted font-mono mt-1">Unlocked {achievement.earnedDate}</div>
      </div>
    </motion.div>
  );
}
