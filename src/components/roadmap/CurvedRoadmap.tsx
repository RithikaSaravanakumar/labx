import React from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Lock } from 'lucide-react';
import type { ProjectRoadmap, RoadmapStage } from '../../types/roadmap';

interface CurvedRoadmapProps {
  roadmap: ProjectRoadmap;
}

export default function CurvedRoadmap({ roadmap }: CurvedRoadmapProps) {
  const stages = roadmap.stages;
  
  // Node coordinates (9 stages)
  const nodes = [
    { x: 200, y: 150 },
    { x: 600, y: 150 },
    { x: 1000, y: 150 },
    { x: 1000, y: 450 },
    { x: 600, y: 450 },
    { x: 200, y: 450 },
    { x: 200, y: 750 },
    { x: 600, y: 750 },
    { x: 1000, y: 750 },
  ];

  // Path segments between nodes
  const segments = [
    { path: `M 100 150 L 200 150`, sourceIdx: -1, targetIdx: 0 },
    { path: `M 200 150 L 600 150`, sourceIdx: 0, targetIdx: 1 },
    { path: `M 600 150 L 1000 150`, sourceIdx: 1, targetIdx: 2 },
    { path: `M 1000 150 C 1200 150, 1200 450, 1000 450`, sourceIdx: 2, targetIdx: 3 },
    { path: `M 1000 450 L 600 450`, sourceIdx: 3, targetIdx: 4 },
    { path: `M 600 450 L 200 450`, sourceIdx: 4, targetIdx: 5 },
    { path: `M 200 450 C 0 450, 0 750, 200 750`, sourceIdx: 5, targetIdx: 6 },
    { path: `M 200 750 L 600 750`, sourceIdx: 6, targetIdx: 7 },
    { path: `M 600 750 L 1000 750`, sourceIdx: 7, targetIdx: 8 },
    { path: `M 1000 750 L 1100 750`, sourceIdx: 8, targetIdx: 9 },
  ];

  const getStageStatus = (idx: number) => {
    if (idx < 0 || idx >= stages.length) return 'LOCKED';
    return stages[idx].status;
  };

  const getSegmentColor = (sourceIdx: number, targetIdx: number) => {
    const sourceStatus = getStageStatus(sourceIdx);
    const targetStatus = getStageStatus(targetIdx);
    
    if (sourceStatus === 'COMPLETED' && targetStatus === 'COMPLETED') return 'completed';
    if (sourceStatus === 'COMPLETED' && targetStatus === 'CURRENT') return 'active';
    if (sourceStatus === 'CURRENT' && targetStatus === 'LOCKED') return 'locked';
    return 'locked'; // default
  };

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide py-10">
      <div className="min-w-[1200px] h-[900px] relative mx-auto">
        <svg viewBox="0 0 1200 900" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00F0FF" />
              <stop offset="100%" stopColor="#00F0FF" />
            </linearGradient>
            <filter id="glow-completed" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-active" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Render Paths */}
          {segments.map((seg, i) => {
            const status = getSegmentColor(seg.sourceIdx, seg.targetIdx);
            
            if (status === 'locked') {
              return (
                <path
                  key={`path-${i}`}
                  d={seg.path}
                  fill="none"
                  stroke="#1A1F24"
                  strokeWidth="10"
                  strokeDasharray="15, 10"
                  strokeLinecap="round"
                />
              );
            }
            
            if (status === 'completed') {
              return (
                <path
                  key={`path-${i}`}
                  d={seg.path}
                  fill="none"
                  stroke="#00F0FF"
                  strokeWidth="12"
                  filter="url(#glow-completed)"
                  strokeLinecap="round"
                />
              );
            }

            // Active segment (partially filled)
            return (
              <g key={`path-${i}`}>
                {/* Background dashed track */}
                <path
                  d={seg.path}
                  fill="none"
                  stroke="#1A1F24"
                  strokeWidth="10"
                  strokeDasharray="15, 10"
                  strokeLinecap="round"
                />
                {/* Active animated stroke */}
                <motion.path
                  d={seg.path}
                  fill="none"
                  stroke="url(#active-gradient)"
                  strokeWidth="12"
                  filter="url(#glow-active)"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.5 }} // Halfway to next node
                  transition={{ duration: 2, ease: "easeOut" }}
                />
              </g>
            );
          })}

          {/* Render HTML Cards inside ForeignObject */}
          {stages.map((stage, i) => {
            const node = nodes[i];
            const isCompleted = stage.status === 'COMPLETED';
            const isCurrent = stage.status === 'CURRENT';
            const isLocked = stage.status === 'LOCKED';

            // Card positioned above the node for top row, below for middle row, above for bottom row
            const isRow2 = i >= 3 && i <= 5;
            const cardY = isRow2 ? node.y + 40 : node.y - 180;
            const cardX = node.x - 150; // Center card (300px width)

            return (
              <g key={stage.id}>
                {/* Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="24"
                  fill={isCompleted ? '#00F0FF' : isCurrent ? '#00F0FF' : '#0A0C0B'}
                  stroke={isCompleted ? '#00F0FF' : isCurrent ? '#00F0FF' : '#1A1F24'}
                  strokeWidth="4"
                  filter={isCompleted ? 'url(#glow-completed)' : isCurrent ? 'url(#glow-active)' : ''}
                />
                
                {/* Node Icon */}
                <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24">
                  <div className="w-full h-full flex items-center justify-center text-black">
                    {isCompleted && <Check className="w-5 h-5 text-black" />}
                    {isCurrent && <Play className="w-5 h-5 ml-1 text-black" />}
                    {isLocked && <Lock className="w-4 h-4 text-zinc-500" />}
                  </div>
                </foreignObject>

                {/* Card */}
                <foreignObject x={cardX} y={cardY} width="300" height="150" className="overflow-visible">
                  <div className={`
                    w-full h-full rounded-xl p-4 flex flex-col justify-between border-2 backdrop-blur-xl transition-all duration-500
                    ${isCompleted ? 'bg-[#002633]/80 border-[#00F0FF]/50' : ''}
                    ${isCurrent ? 'bg-[#002633]/90 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.2)]' : ''}
                    ${isLocked ? 'bg-[#0A0C0B]/90 border-[#1A1F24]' : ''}
                  `}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center
                          ${isCompleted ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : ''}
                          ${isCurrent ? 'bg-[#00F0FF]/20 text-[#00F0FF]' : ''}
                          ${isLocked ? 'bg-zinc-800 text-zinc-500' : ''}
                        `}>
                          <span className="text-[9px] font-black">{stage.order}</span>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider ${isLocked ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          INITIATOR {stage.order} • M0{stage.order}
                        </span>
                      </div>
                      
                      <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border
                        ${isCompleted ? 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30' : ''}
                        ${isCurrent ? 'bg-[#00F0FF]/10 text-[#00F0FF] border-[#00F0FF]/30' : ''}
                        ${isLocked ? 'bg-transparent text-zinc-600 border-zinc-800' : ''}
                      `}>
                        {isCompleted ? 'CONQUERED ✓' : isCurrent ? 'ACTIVE' : 'LOCKED 🔒'}
                      </div>
                    </div>

                    <div>
                      <h3 className={`text-sm font-bold mb-1 ${isLocked ? 'text-zinc-400' : 'text-white'}`}>
                        {stage.name} - {stage.tagline?.split(' ').slice(0, 3).join(' ')}
                      </h3>
                      <p className={`text-[10px] line-clamp-2 leading-relaxed ${isLocked ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {stage.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-2">
                      <button className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-1
                        ${isCompleted ? 'text-[#00F0FF] hover:text-white' : ''}
                        ${isCurrent ? 'text-[#00F0FF] hover:text-white' : ''}
                        ${isLocked ? 'text-zinc-600 cursor-not-allowed' : ''}
                      `}>
                        {isCompleted ? 'REVIEW ✓' : isCurrent ? 'INITIALIZE →' : 'LOCKED 🔒'}
                      </button>
                    </div>
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
