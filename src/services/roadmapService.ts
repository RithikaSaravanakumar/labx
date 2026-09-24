import { MOCK_PROJECT_ROADMAPS } from '../data/mockRoadmap';
import type { ProjectRoadmap, RoadmapMilestone, RoadmapStage } from '../types/roadmap';

export const roadmapService = {
  /**
   * Get roadmaps for all projects owned by a user
   */
  async getUserRoadmaps(userId: string): Promise<ProjectRoadmap[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PROJECT_ROADMAPS.filter(r => r.userId === userId);
  },

  /**
   * Get the primary roadmap for a user (typically their most active project)
   */
  async getPrimaryRoadmap(userId: string): Promise<ProjectRoadmap | null> {
    const roadmaps = await this.getUserRoadmaps(userId);
    if (!roadmaps.length) return null;
    // For mock purposes, just return the one furthest along, or the first one
    return roadmaps.sort((a, b) => b.overallProgress - a.overallProgress)[0];
  },

  /**
   * Get the roadmap for a specific project
   */
  async getProjectRoadmap(projectId: string): Promise<ProjectRoadmap | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PROJECT_ROADMAPS.find(r => r.projectId === projectId) || null;
  },

  /**
   * Complete a milestone (mock)
   */
  async completeMilestone(projectId: string, milestoneId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 500));
    // In a real app, this would update the backend, award points, and recalculate stage progress
    return true;
  },

  /**
   * Complete a stage (mock)
   */
  async completeStage(projectId: string, stageId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300));
    const roadmap = MOCK_PROJECT_ROADMAPS.find(r => r.projectId === projectId);
    if (!roadmap) return false;
    
    const stageIndex = roadmap.stages.findIndex(s => s.id === stageId);
    if (stageIndex === -1) return false;
    
    // Complete current stage
    roadmap.stages[stageIndex].status = 'COMPLETED';
    roadmap.stages[stageIndex].progress = 100;
    
    // Unlock next stage
    if (stageIndex + 1 < roadmap.stages.length) {
      roadmap.stages[stageIndex + 1].status = 'CURRENT';
    }
    
    return true;
  },
  
  /**
   * Helper to find the next available milestone
   */
  getNextMilestone(roadmap: ProjectRoadmap): RoadmapMilestone | null {
    const currentStage = roadmap.stages.find(s => s.status === 'CURRENT');
    if (!currentStage) return null;
    
    return currentStage.milestones.find(m => m.status === 'AVAILABLE' || m.status === 'IN_PROGRESS') || null;
  }
};
