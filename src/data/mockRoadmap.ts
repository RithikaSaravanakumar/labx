import { DEFAULT_ROADMAP_STAGES } from '../constants';
import type { ProjectRoadmap, RoadmapStage, RoadmapMilestone, RoadmapStageStatus, MilestoneStatus } from '../types/roadmap';

const generateMockMilestones = (stageId: string, activities: string[], stageStatus: RoadmapStageStatus): RoadmapMilestone[] => {
  return activities.map((goal, idx) => {
    let status: MilestoneStatus = 'LOCKED';
    if (stageStatus === 'COMPLETED') {
      status = 'COMPLETED';
    } else if (stageStatus === 'CURRENT') {
      // In current stage, make the first half completed, one in progress, rest available
      if (idx < Math.floor(activities.length / 2)) status = 'COMPLETED';
      else if (idx === Math.floor(activities.length / 2)) status = 'IN_PROGRESS';
      else status = 'AVAILABLE';
    }

    return {
      id: `${stageId}-m-${idx}`,
      stageId: stageId as any,
      title: goal,
      description: `Description for ${goal}`,
      status,
      pointsReward: 100,
      completedAt: status === 'COMPLETED' ? new Date().toISOString() : undefined,
    };
  });
};

const buildMockRoadmap = (projectId: string, userId: string, currentStageIndex: number): ProjectRoadmap => {
  const stages: RoadmapStage[] = DEFAULT_ROADMAP_STAGES.map((stage, idx) => {
    let status: RoadmapStageStatus = 'LOCKED';
    let progress = 0;
    
    if (idx < currentStageIndex) {
      status = 'COMPLETED';
      progress = 100;
    } else if (idx === currentStageIndex) {
      status = 'CURRENT';
      progress = 67;
    }

    const milestones = generateMockMilestones(stage.id, stage.activities, status);

    return {
      ...stage,
      status,
      progress,
      milestones,
      completedAt: status === 'COMPLETED' ? new Date().toISOString() : undefined,
    };
  });

  return {
    projectId,
    userId,
    currentStage: DEFAULT_ROADMAP_STAGES[currentStageIndex].id as any,
    overallProgress: Math.round((currentStageIndex / DEFAULT_ROADMAP_STAGES.length) * 100),
    stages,
  };
};

export const MOCK_PROJECT_ROADMAPS: ProjectRoadmap[] = [
  buildMockRoadmap('proj-1', 'u1', 3), // BUILD stage (Index 3)
  buildMockRoadmap('proj-2', 'u1', 1), // VALIDATE stage
  buildMockRoadmap('proj-3', 'u2', 5), // LAUNCH stage
];
