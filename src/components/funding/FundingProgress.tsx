import { motion } from 'framer-motion';
import { Target, Trophy, Info } from 'lucide-react';
import type { FundingMilestone } from '../../types';

interface FundingProgressProps {
  milestone: FundingMilestone;
}

export default function FundingProgress({ milestone }: FundingProgressProps) {
  const percentage = Math.min(100, Math.round((milestone.currentPoints / milestone.pointsRequired) * 100));
  const isEligible = milestone.currentPoints >= milestone.pointsRequired;

  return (
    <div className="labx-card p-6 relative overflow-hidden group">
      {/* Background glow effect based on progress */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 transition-opacity duration-700 pointer-events-none"
        style={{ opacity: isEligible ? 0.3 : percentage > 50 ? 0.1 : 0 }}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-xl border-2 ${isEligible ? 'bg-labx-green/20 border-labx-green shadow-[0_0_15px_rgba(0,255,135,0.3)] text-labx-green' : 'bg-labx-surface border-labx-border text-labx-text-muted'}`}>
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-labx-text flex items-center gap-2">
              Funding Eligibility
              {isEligible && <Trophy className="w-4 h-4 text-amber-400" />}
            </h3>
            <p className="text-xs text-labx-text-secondary uppercase tracking-wider font-bold">
              TARGET: {milestone.fundingAmountTarget}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-black font-mono">
            <span className="text-labx-green">{milestone.currentPoints.toLocaleString()}</span>
            <span className="text-labx-text-muted"> / {milestone.pointsRequired.toLocaleString()}</span>
          </div>
          <p className="text-xs text-labx-text-muted">LABX POINTS</p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between text-xs font-bold text-labx-text-muted mb-2 uppercase tracking-wider">
          <span>{percentage}% Reached</span>
          <span>{isEligible ? 'Unlocked' : `${(milestone.pointsRequired - milestone.currentPoints).toLocaleString()} pts to go`}</span>
        </div>
        <div className="h-3 w-full bg-labx-bg rounded-full overflow-hidden border border-labx-border/50">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className={`h-full rounded-full ${isEligible ? 'bg-gradient-to-r from-[#00FF87] to-amber-400' : 'bg-gradient-to-r from-teal-500 to-emerald-400'}`}
          />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-labx-border/50 relative z-10 flex items-start gap-2">
        <Info className="w-4 h-4 text-labx-text-muted shrink-0 mt-0.5" />
        <p className="text-xs text-labx-text-secondary">
          Reaching {milestone.pointsRequired.toLocaleString()} points unlocks a review for seed funding eligibility. Note: Funding is subject to qualitative review and is not an automatic payout. Keep building proof of work!
        </p>
      </div>

      {isEligible && (
        <div className="mt-6 relative z-10">
          <button className="w-full labx-button-primary py-3 rounded-xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2">
            Initiate Review Process
            <Trophy className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
