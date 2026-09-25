import { useMemo } from 'react';

interface LabXContributionHeatmapProps {
  streak: number;
}

export default function LabXContributionHeatmap({ streak }: LabXContributionHeatmapProps) {
  // Generate 12 weeks x 7 days mock grid
  const days = useMemo(() => {
    const grid = [];
    const count = 84; // 12 weeks
    for (let i = 0; i < count; i++) {
      // Deterministic distribution based on day index for render purity
      const pseudoVal = ((i * 17 + 23) % 100) / 100;
      let level = 0;
      if (i > 40 && pseudoVal > 0.4) level = 1;
      if (i > 60 && pseudoVal > 0.3) level = 2;
      if (i > 70 && pseudoVal > 0.2) level = 3;
      if (i >= count - streak) level = 3; // ensure current streak days are bright
      grid.push({ id: i, level });
    }
    return grid;
  }, [streak]);

  const getColorClass = (level: number) => {
    switch (level) {
      case 1: return 'bg-labx-cyan/20 border-labx-cyan/30';
      case 2: return 'bg-labx-cyan/50 border-labx-cyan/60';
      case 3: return 'bg-labx-cyan border-cyan-300 shadow-sm shadow-labx-cyan/50';
      default: return 'bg-labx-surface/80 border-labx-border/40';
    }
  };

  return (
    <div className="labx-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-labx-text flex items-center gap-2">
            <span>Proof-of-Work Activity</span>
            <span className="text-xs font-mono font-bold text-labx-cyan px-2 py-0.5 rounded bg-labx-cyan/10 border border-labx-cyan/20">
               {streak} Day Streak
            </span>
          </h3>
          <p className="text-xs text-labx-text-muted mt-0.5">Verified public commits, updates, & code contributions</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-labx-text-muted">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-labx-surface/80" />
          <div className="w-2.5 h-2.5 rounded-sm bg-labx-cyan/20" />
          <div className="w-2.5 h-2.5 rounded-sm bg-labx-cyan/50" />
          <div className="w-2.5 h-2.5 rounded-sm bg-labx-cyan shadow-[0_0_8px_rgba(34, 211, 238,0.7)]" />
          <span>More</span>
        </div>
      </div>

      <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto pb-2">
        {days.map(d => (
          <div
            key={d.id}
            title={`Activity level: ${d.level}`}
            className={`w-3.5 h-3.5 rounded-sm border transition-colors ${getColorClass(d.level)}`}
          />
        ))}
      </div>
    </div>
  );
}
