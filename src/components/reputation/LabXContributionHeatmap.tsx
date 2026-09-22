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
      // Simulate higher activity towards the right
      const randomVal = Math.random();
      let level = 0;
      if (i > 40 && randomVal > 0.4) level = 1;
      if (i > 60 && randomVal > 0.3) level = 2;
      if (i > 70 && randomVal > 0.2) level = 3;
      if (i >= count - streak) level = 3; // ensure current streak days are bright
      grid.push({ id: i, level });
    }
    return grid;
  }, [streak]);

  const getColorClass = (level: number) => {
    switch (level) {
      case 1: return 'bg-labx-violet/30 border-labx-violet/40';
      case 2: return 'bg-labx-violet/60 border-labx-violet/70';
      case 3: return 'bg-labx-violet border-labx-cyan shadow-sm shadow-labx-violet/50';
      default: return 'bg-labx-surface/80 border-labx-border/40';
    }
  };

  return (
    <div className="labx-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-labx-text flex items-center gap-2">
            <span>Proof-of-Work Activity</span>
            <span className="text-xs font-mono font-normal text-labx-violet px-2 py-0.5 rounded bg-labx-violet/10">
              🔥 {streak} Day Streak
            </span>
          </h3>
          <p className="text-xs text-labx-text-muted mt-0.5">Verified public commits, updates, & code contributions</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-labx-text-muted">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-labx-surface/80" />
          <div className="w-2.5 h-2.5 rounded-sm bg-labx-violet/30" />
          <div className="w-2.5 h-2.5 rounded-sm bg-labx-violet/60" />
          <div className="w-2.5 h-2.5 rounded-sm bg-labx-violet" />
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
