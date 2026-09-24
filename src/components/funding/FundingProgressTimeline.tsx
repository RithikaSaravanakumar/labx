import { motion } from 'framer-motion';
import { Target, CheckCircle2 } from 'lucide-react';

interface FundingProgressTimelineProps {
  currentPoints: number;
  targetPoints: number;
}

export default function FundingProgressTimeline({ currentPoints, targetPoints }: FundingProgressTimelineProps) {
  const percentage = Math.min((currentPoints / targetPoints) * 100, 100);
  const remaining = Math.max(targetPoints - currentPoints, 0);

  const breakpoints = [
    { value: 0, label: 'START' },
    { value: 5000, label: '5K' },
    { value: 10000, label: '10K' },
    { value: 15000, label: '15K' },
    { value: 20000, label: '20K' },
    { value: 25000, label: 'ELIGIBILITY' },
  ];

  return (
    <div className="bg-[#0A0C0B] border border-white/5 rounded-2xl p-5">
      <div className="mb-4">
        <h4 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">
          LABX MILESTONE
        </h4>
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-black text-white">
            {currentPoints.toLocaleString()}
          </span>
          <span className="text-xs text-zinc-500 font-medium">
            / {targetPoints.toLocaleString()} PTS
          </span>
        </div>
        {remaining > 0 ? (
          <p className="text-xs font-medium text-emerald-400 mt-1">
            {remaining.toLocaleString()} points to funding eligibility
          </p>
        ) : (
          <p className="text-xs font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Funding eligibility milestone reached
          </p>
        )}
      </div>

      <div className="relative pt-6 pb-2">
        {/* Background Track */}
        <div className="absolute top-8 left-0 right-0 h-1 bg-white/5 rounded-full" />

        {/* Progress Track */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-8 left-0 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-[#00FF87] shadow-[0_0_10px_rgba(0,255,135,0.5)]"
        />

        {/* Breakpoints */}
        <div className="relative flex justify-between">
          {breakpoints.map((bp) => {
            const isReached = currentPoints >= bp.value;
            const isTarget = bp.value === targetPoints;
            
            return (
              <div key={bp.value} className="flex flex-col items-center group relative z-10">
                <div className="mb-1 text-[9px] font-bold text-zinc-500 tracking-wider">
                  {bp.label}
                </div>
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-colors duration-500 ${
                    isReached
                      ? 'border-[#00FF87] bg-[#0A0C0B]'
                      : 'border-white/10 bg-[#0A0C0B]'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h5 className="text-sm font-bold text-white uppercase tracking-wider">
              UP TO ₹1,00,000
            </h5>
            <p className="text-[11px] text-zinc-400 mt-0.5 leading-snug">
              Project / startup funding. Subject to verification, review, and applicable program terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
