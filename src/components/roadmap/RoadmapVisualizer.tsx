import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Check, ChevronRight } from 'lucide-react';
import type { ProjectRoadmap } from '../../types/roadmap';

interface RoadmapVisualizerProps {
  roadmap: ProjectRoadmap;
  layout?: 'horizontal' | 'vertical';
  showDetails?: boolean;
}

export default function RoadmapVisualizer({ 
  roadmap, 
  layout = 'horizontal',
  showDetails = true 
}: RoadmapVisualizerProps) {
  const isVertical = layout === 'vertical';

  return (
    <div className={`w-full ${isVertical ? 'flex flex-col' : 'overflow-x-auto pb-4 scrollbar-hide'}`}>
      <div className={`flex ${isVertical ? 'flex-col gap-6' : 'min-w-max items-start'}`}>
        {roadmap.stages.map((stage, index) => {
          const isCompleted = stage.status === 'COMPLETED';
          const isCurrent = stage.status === 'CURRENT';
          const isLocked = stage.status === 'LOCKED';
          const isLast = index === roadmap.stages.length - 1;

          return (
            <div 
              key={stage.id} 
              className={`relative flex ${isVertical ? 'flex-row items-stretch' : 'flex-col items-center'} group`}
            >
              {/* Connector Line */}
              {!isLast && (
                <div 
                  className={`absolute ${
                    isVertical 
                      ? 'left-4 top-10 bottom-[-24px] w-0.5' 
                      : 'top-4 left-10 w-[120px] h-0.5'
                  } ${isCompleted ? 'bg-[#22D3EE]' : 'bg-white/10'}`} 
                />
              )}

              {/* Stage Node */}
              <div className={`relative flex ${isVertical ? 'flex-row items-start gap-4' : 'flex-col items-center'}`}>
                {/* Node Circle */}
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 relative z-10 transition-colors
                  ${isCompleted ? 'bg-[#22D3EE] border-[#22D3EE] text-black shadow-[0_0_15px_rgba(34, 211, 238,0.4)]' : ''}
                  ${isCurrent ? 'bg-[#0A0C0B] border-[#22D3EE] text-[#22D3EE] shadow-[0_0_20px_rgba(34, 211, 238,0.6)]' : ''}
                  ${isLocked ? 'bg-[#0A0C0B] border-white/20 text-zinc-600' : ''}
                `}>
                  {isCompleted && <Check className="w-4 h-4" />}
                  {isCurrent && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="w-2.5 h-2.5 bg-[#22D3EE] rounded-full"
                    />
                  )}
                  {isLocked && <Lock className="w-3.5 h-3.5" />}
                </div>

                {/* Content */}
                <div className={`
                  ${isVertical ? 'flex-1 pt-1 pb-4' : 'mt-4 text-center w-[100px]'}
                `}>
                  <div className={`flex ${isVertical ? 'flex-row items-center gap-2' : 'flex-col items-center gap-1.5'} mb-1`}>
                    <h4 className={`text-xs font-black tracking-widest uppercase ${
                      isCurrent || isCompleted ? 'text-white' : 'text-zinc-500'
                    }`}>
                      {stage.name}
                    </h4>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-cyan-400/20 text-[#22D3EE] uppercase whitespace-nowrap">
                        You Are Here
                      </span>
                    )}
                  </div>
                  
                  {showDetails && (
                    <>
                      <p className={`text-[11px] leading-snug line-clamp-2 ${
                        isLocked ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {stage.description}
                      </p>
                      
                      {isCurrent && (
                        <div className="mt-3 bg-white/5 rounded-xl p-3 border border-cyan-400/20">
                          <div className="flex justify-between text-[10px] font-bold text-zinc-400 mb-1.5 uppercase">
                            <span>Stage Progress</span>
                            <span className="text-[#22D3EE]">{stage.progress}%</span>
                          </div>
                          <div className="h-1 bg-black rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#22D3EE]" 
                              style={{ width: `${stage.progress}%` }}
                            />
                          </div>
                          
                          {/* Next Milestone Hint */}
                          {stage.milestones.find(m => m.status === 'AVAILABLE' || m.status === 'IN_PROGRESS') && (
                            <div className="mt-3 flex items-start gap-2">
                              <ChevronRight className="w-3 h-3 text-[#22D3EE] shrink-0 mt-0.5" />
                              <div>
                                <div className="text-[10px] text-zinc-500 font-medium uppercase">Next Action</div>
                                <div className="text-xs text-white font-medium line-clamp-1">
                                  {stage.milestones.find(m => m.status === 'AVAILABLE' || m.status === 'IN_PROGRESS')?.title}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
