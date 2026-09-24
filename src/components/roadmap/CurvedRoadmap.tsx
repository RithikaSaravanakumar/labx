import React from 'react';
import { motion } from 'framer-motion';
import { Check, Play, Lock } from 'lucide-react';
import type { ProjectRoadmap, RoadmapStage } from '../../types/roadmap';

interface CurvedRoadmapProps {
  roadmap: ProjectRoadmap;
  onCompleteStage?: (stageId: string) => void;
}

export default function CurvedRoadmap({ roadmap, onCompleteStage }: CurvedRoadmapProps) {
  const stages = roadmap.stages;
  
  const SVG_WIDTH = 800;
  const NODE_SPACING = 250;
  const SVG_HEIGHT = Math.max(600, stages.length * NODE_SPACING + 200);

  // Dynamic Nodes
  const nodes = stages.map((_, i) => ({
    x: (i % 2 === 0) ? 200 : 600,
    y: 150 + (i * NODE_SPACING),
  }));

  // Dynamic Segments
  const segments = [];
  if (nodes.length > 0) {
    segments.push({ path: `M ${nodes[0].x} 0 L ${nodes[0].x} ${nodes[0].y}`, sourceIdx: -1, targetIdx: 0 });
    
    for (let i = 0; i < stages.length - 1; i++) {
      const n1 = nodes[i];
      const n2 = nodes[i + 1];
      const midY = (n1.y + n2.y) / 2;
      segments.push({ 
        path: `M ${n1.x} ${n1.y} C ${n1.x} ${midY}, ${n2.x} ${midY}, ${n2.x} ${n2.y}`, 
        sourceIdx: i, 
        targetIdx: i + 1 
      });
    }

    const lastNode = nodes[nodes.length - 1];
    segments.push({ path: `M ${lastNode.x} ${lastNode.y} L ${lastNode.x} ${SVG_HEIGHT}`, sourceIdx: stages.length - 1, targetIdx: stages.length });
  }

  const getStageStatus = (idx: number) => {
    if (idx < 0) return 'COMPLETED'; // Entry line is always active
    if (idx >= stages.length) return stages[stages.length - 1].status;
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
    <div className="w-full overflow-x-auto pb-10 scrollbar-hide">
      <div className="min-w-[800px] relative mx-auto" style={{ height: SVG_HEIGHT }}>
        <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="active-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FF87" />
              <stop offset="100%" stopColor="#00FF87" />
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
                  stroke="#00FF87"
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

            // Card positioned next to node
            const cardX = node.x === 200 ? node.x + 50 : node.x - 350;
            const cardY = node.y - 75; // center vertically

            return (
              <g key={stage.id}>
                {/* Node Circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="24"
                  fill={isCompleted ? '#00FF87' : isCurrent ? '#00FF87' : '#0A0C0B'}
                  stroke={isCompleted ? '#00FF87' : isCurrent ? '#00FF87' : '#1A1F24'}
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
                    w-full h-full rounded-2xl p-5 flex flex-col justify-between border backdrop-blur-2xl transition-all duration-300 shadow-xl group hover:-translate-y-1 relative overflow-hidden
                    ${isCompleted ? 'bg-[#002633]/40 border-[#00FF87]/20 hover:border-[#00FF87]/50' : ''}
                    ${isCurrent ? 'bg-[#002633]/60 border-[#00FF87]/60 shadow-[0_0_30px_rgba(0,255,135,0.15)] hover:shadow-[0_0_40px_rgba(0,255,135,0.25)]' : ''}
                    ${isLocked ? 'bg-[#0A0C0B]/90 border-white/5' : ''}
                  `}>
                    {/* Spotlight Hover Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 pointer-events-none transition-opacity duration-300" 
                         style={{ background: isCurrent || isCompleted ? 'radial-gradient(circle at top right, #00FF87, transparent 70%)' : 'radial-gradient(circle at top right, #ffffff, transparent 70%)' }} />
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2 relative z-10">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center
                          ${isCompleted ? 'bg-[#00FF87]/20 text-[#00FF87]' : ''}
                          ${isCurrent ? 'bg-[#00FF87]/20 text-[#00FF87]' : ''}
                          ${isLocked ? 'bg-white/5 text-zinc-500' : ''}
                        `}>
                          <span className="text-[9px] font-black">{stage.order}</span>
                        </div>
                        <span className={`text-[9px] font-black uppercase tracking-wider ${isLocked ? 'text-zinc-600' : 'text-zinc-400'}`}>
                          INITIATOR {stage.order} • M0{stage.order}
                        </span>
                      </div>
                      
                      <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border relative z-10
                        ${isCompleted ? 'bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/30' : ''}
                        ${isCurrent ? 'bg-[#00FF87]/10 text-[#00FF87] border-[#00FF87]/30' : ''}
                        ${isLocked ? 'bg-transparent text-zinc-600 border-white/5' : ''}
                      `}>
                        {isCompleted ? 'CONQUERED ✓' : isCurrent ? 'ACTIVE' : 'LOCKED 🔒'}
                      </div>
                    </div>

                    <div className="relative z-10">
                      <h3 className={`text-sm font-bold mb-1 ${isLocked ? 'text-zinc-400' : 'text-white'}`}>
                        {stage.name} - {stage.tagline?.split(' ').slice(0, 3).join(' ')}
                      </h3>
                      <p className={`text-[10px] line-clamp-2 leading-relaxed ${isLocked ? 'text-zinc-600' : 'text-zinc-400'}`}>
                        {stage.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-2 relative z-10">
                      <button 
                        onClick={() => {
                          if (isCurrent && onCompleteStage) {
                            onCompleteStage(stage.id);
                          }
                        }}
                        disabled={!isCurrent}
                        className={`text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 transition-all
                        ${isCompleted ? 'text-[#00FF87] hover:text-white' : ''}
                        ${isCurrent ? 'text-black bg-[#00FF87] px-3 py-1 rounded-full hover:bg-white active:scale-95 shadow-[0_0_15px_rgba(0,255,135,0.3)]' : ''}
                        ${isLocked ? 'text-zinc-600 cursor-not-allowed' : ''}
                      `}>
                        {isCompleted ? 'REVIEW ✓' : isCurrent ? 'COMPLETE STAGE →' : 'LOCKED 🔒'}
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
