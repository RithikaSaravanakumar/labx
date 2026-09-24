import { motion } from 'framer-motion';
import { Check, Lock, ChevronRight, Zap } from 'lucide-react';
import type { RoadmapStage, RoadmapStageKey } from '../../types';

interface ProjectRoadmapProps {
  stages: RoadmapStage[];
  currentStageId: RoadmapStageKey;
  onStageClick?: (stage: RoadmapStage) => void;
}

export default function ProjectRoadmap({ stages, currentStageId, onStageClick }: ProjectRoadmapProps) {
  const currentIndex = stages.findIndex(s => s.id === currentStageId);

  return (
    <div className="labx-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-labx-text flex items-center gap-2">
          <Zap className="w-5 h-5 text-labx-green" />
          Innovation Roadmap
        </h3>
        <span className="text-xs font-mono font-bold text-labx-green bg-labx-green/10 px-3 py-1 rounded-full border border-labx-green/20">
          STAGE {currentIndex + 1} OF {stages.length}
        </span>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-labx-border/50" />
        <div 
          className="absolute left-[19px] top-4 w-0.5 bg-gradient-to-b from-labx-green to-emerald-400"
          style={{ height: `${Math.max(0, (currentIndex / (stages.length - 1)) * 100 - 5)}%` }}
        />

        <div className="space-y-6">
          {stages.map((stage, index) => {
            const isCompleted = index < currentIndex;
            const isActive = index === currentIndex;
            const isLocked = index > currentIndex;

            return (
              <motion.button
                key={stage.id}
                onClick={() => onStageClick?.(stage)}
                disabled={isLocked}
                className={`relative w-full flex items-start gap-4 p-4 rounded-2xl transition-all text-left ${
                  isActive 
                    ? 'bg-labx-surface border-2 border-labx-green/50 shadow-[0_0_20px_rgba(0,255,135,0.1)]' 
                    : isCompleted 
                      ? 'hover:bg-labx-surface group' 
                      : 'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                  isCompleted 
                    ? 'bg-labx-green/20 border-labx-green text-labx-green' 
                    : isActive 
                      ? 'bg-labx-green border-labx-green text-black shadow-[0_0_15px_rgba(0,255,135,0.4)]'
                      : 'bg-labx-bg border-labx-border text-labx-text-muted'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : isLocked ? <Lock className="w-4 h-4" /> : <span className="font-bold">{index + 1}</span>}
                </div>

                <div className="flex-1 pt-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={`font-bold uppercase tracking-wider ${isActive ? 'text-labx-green' : 'text-labx-text'}`}>
                      {stage.name}
                    </h4>
                    {stage.rewardPoints > 0 && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                        isCompleted ? 'bg-labx-green/10 text-labx-green' : 'bg-labx-surface border border-labx-border text-labx-text-muted'
                      }`}>
                        +{stage.rewardPoints} PTS
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-labx-text-secondary">{stage.description}</p>
                </div>
                
                {isActive && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 md:opacity-100">
                    <ChevronRight className="w-5 h-5 text-labx-green" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
