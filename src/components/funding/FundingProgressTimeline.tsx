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
          <p className="text-xs font-medium text-cyan-300 mt-1">
            {remaining.toLocaleString()} points to funding eligibility
          </p>
        ) : (
          <p className="text-xs font-bold text-cyan-300 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Funding eligibility milestone reached
          </p>
        )}
      </div>

      <div className="relative pt-4 pb-4">
        {/* Background Track */}
        <div className="absolute top-[21px] left-0 right-0 h-1.5 bg-white/10 rounded-full" />

        {/* Progress Track */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute top-[21px] left-0 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-[#22D3EE] shadow-[0_0_12px_rgba(34,211,238,0.6)]"
        />

        {/* Breakpoints */}
        <div className="relative flex justify-between">
          {breakpoints.map((bp) => {
            const isReached = currentPoints >= bp.value;
            
            return (
              <div key={bp.value} className="flex flex-col items-center group relative z-10 w-12">
                <div
                  className={`w-4 h-4 rounded-full border-[2.5px] transition-colors duration-500 ${
                    isReached
                      ? 'border-[#22D3EE] bg-[#0A0C0B] shadow-[0_0_8px_rgba(34,211,238,0.5)]'
                      : 'border-white/20 bg-[#141615]'
                  }`}
                />
                <div className={`mt-2 text-[10px] font-bold tracking-wider text-center ${isReached ? 'text-cyan-300' : 'text-zinc-400'}`}>
                  {bp.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0">
            <Target className="w-4 h-4 text-cyan-300" />
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
