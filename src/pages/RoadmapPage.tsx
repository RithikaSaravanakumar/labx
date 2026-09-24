import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, ChevronRight, Award } from 'lucide-react';
import { roadmapService, fundingService, userService } from '../services';
import type { ProjectRoadmap, FundingProgress, User } from '../types';
import CurvedRoadmap from '../components/roadmap/CurvedRoadmap';
import FundingProgressTimeline from '../components/funding/FundingProgressTimeline';
import LabXPointRing from '../components/reputation/LabXPointRing';
import LabXPoints from '../components/reputation/LabXPoints';
import { pageTransition, staggerContainer, staggerItem } from '../animations';
import { Link } from 'react-router-dom';

export default function RoadmapPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [primaryRoadmap, setPrimaryRoadmap] = useState<ProjectRoadmap | null>(null);
  const [funding, setFunding] = useState<FundingProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const user = await userService.getCurrentUser();
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      const [roadmap, fundProgress] = await Promise.all([
        roadmapService.getPrimaryRoadmap(user.id),
        fundingService.getFundingProgress(user.id)
      ]);
      
      setCurrentUser(user);
      setPrimaryRoadmap(roadmap);
      setFunding(fundProgress);
      setIsLoading(false);
    };
    
    loadData();
  }, []);

  if (isLoading || !currentUser || !primaryRoadmap) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#22D3EE] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const handleCompleteStage = async (stageId: string) => {
    if (!primaryRoadmap) return;
    await roadmapService.completeStage(primaryRoadmap.projectId, stageId);
    
    // Refresh roadmap and user points
    const [updatedRoadmap, updatedUser] = await Promise.all([
      roadmapService.getPrimaryRoadmap(currentUser.id),
      userService.getCurrentUser()
    ]);
    
    if (updatedRoadmap) setPrimaryRoadmap({...updatedRoadmap});
    if (updatedUser) setCurrentUser({...updatedUser});
  };

  const currentStage = primaryRoadmap.stages.find(s => s.status === 'CURRENT');
  const nextMilestone = roadmapService.getNextMilestone(primaryRoadmap);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <motion.div variants={staggerContainer} className="space-y-8">
        
        {/* Hero Section */}
        <motion.div variants={staggerItem} className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 uppercase tracking-tight">
            Your Innovation Journey
          </h1>
          <p className="text-lg text-zinc-400">
            Turn an idea into something real. Track your progress, earn reputation, and unlock funding.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Current Stage Card */}
            {currentStage && (
              <motion.div variants={staggerItem} className="bg-gradient-to-r from-cyan-400/10 to-[#0A0C0B] border border-[#22D3EE]/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#22D3EE]/10 blur-3xl rounded-full" />
                
                <div className="flex flex-col sm:flex-row items-start justify-between gap-6 relative z-10">
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-[#22D3EE] uppercase tracking-widest mb-1">
                      CURRENT STAGE
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-2">
                      {currentStage.name}
                    </h2>
                    <p className="text-sm text-zinc-300 mb-6 max-w-md">
                      {currentStage.description}
                    </p>
                    
                    <div className="flex items-center gap-6 mb-6">
                      <div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Stage Progress</div>
                        <div className="text-xl font-bold text-white">{currentStage.progress}%</div>
                      </div>
                      <div className="w-px h-10 bg-white/10" />
                      <div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Available Points</div>
                        <div className="text-xl font-bold text-[#22D3EE] flex items-center gap-1">
                          <LabXPoints points={currentStage.rewardPoints} showPlus size="sm" hideText />
                          +{currentStage.rewardPoints}
                        </div>
                      </div>
                    </div>

                    {nextMilestone && (
                      <div className="bg-[#0A0C0B] border border-white/5 rounded-xl p-4">
                        <div className="text-[10px] font-bold text-zinc-500 uppercase mb-2">Next Milestone</div>
                        <div className="flex items-start justify-between gap-4">
                          <div className="text-sm font-medium text-white">{nextMilestone.title}</div>
                          <div className="text-xs font-bold shrink-0">
                            <LabXPoints points={nextMilestone.pointsReward} showPlus size="xs" textClassName="text-[#22D3EE]" />
                          </div>
                        </div>
                        <Link to={`/projects/${primaryRoadmap.projectId}/build`} className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-xs font-bold uppercase rounded-lg transition-colors">
                          Continue Building
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                  
                  <div className="shrink-0 flex flex-col items-center justify-center p-4">
                    <LabXPointRing points={currentUser.labxPoints} level={currentUser.level} size={120} strokeWidth={8} />
                    <div className="mt-4 text-center">
                      <div className="text-[10px] text-zinc-500 font-bold uppercase">Total Earned</div>
                      <div className="text-sm font-bold text-white">{currentUser.labxPoints.toLocaleString()} PTS</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* The Visual Roadmap */}
            <motion.div variants={staggerItem} className="bg-[#0A0C0B] border border-white/5 rounded-2xl p-6 md:p-8">
              <h3 className="text-lg font-black text-white uppercase tracking-wider mb-8">
                Ecosystem Roadmap
              </h3>
              
              <div className="w-full">
                <CurvedRoadmap roadmap={primaryRoadmap} onCompleteStage={handleCompleteStage} />
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Funding Timeline Component */}
            {funding && (
              <motion.div variants={staggerItem}>
                <FundingProgressTimeline 
                  currentPoints={funding.progress.current}
                  targetPoints={funding.progress.target}
                />
              </motion.div>
            )}

            <motion.div variants={staggerItem} className="bg-[#0A0C0B] border border-white/5 rounded-2xl p-5">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
                <Award className="w-4 h-4 text-cyan-300" />
                Proof of Work
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-zinc-400">Global Rank</span>
                  <span className="text-sm font-bold text-white">#{currentUser.rank || 124}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-xs text-zinc-400">Active Projects</span>
                  <span className="text-sm font-bold text-white">2</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs text-zinc-400">Total Contributions</span>
                  <span className="text-sm font-bold text-white">37</span>
                </div>
              </div>
            </motion.div>
            
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
