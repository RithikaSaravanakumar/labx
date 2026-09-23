export type RoadmapStageKey =
  | 'IDEA'
  | 'VALIDATE'
  | 'PLAN'
  | 'BUILD'
  | 'MVP'
  | 'LAUNCH'
  | 'GROW'
  | 'SCALE'
  | 'IMPACT';

export type RoadmapStageStatus = 'LOCKED' | 'ACTIVE' | 'COMPLETED';

export interface RoadmapStage {
  id: RoadmapStageKey;
  label: string;
  description: string;
  pointsReward: number;
  status: RoadmapStageStatus;
  completedAt?: string;
  milestones: string[];
}

export interface ProjectRoadmap {
  projectId: string;
  currentStage: RoadmapStageKey;
  stages: RoadmapStage[];
}

export type PointTransactionType =
  | 'ROADMAP_STAGE'
  | 'PROJECT_CONTRIBUTION'
  | 'BUILD_IN_PUBLIC'
  | 'MENTORSHIP'
  | 'HACKATHON'
  | 'COMMUNITY'
  | 'ACHIEVEMENT';

export interface PointTransaction {
  id: string;
  userId: string;
  projectId?: string;
  type: PointTransactionType;
  points: number;
  description: string;
  createdAt: string;
}

export type FundingMilestoneStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'MILESTONE_REACHED'
  | 'ELIGIBILITY_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'FUNDED';

export interface FundingMilestone {
  id: string;
  projectId?: string;
  startupId?: string;
  pointsRequired: number;
  currentPoints: number;
  status: FundingMilestoneStatus;
  fundingAmountTarget: string; // e.g., 'UP TO ₹1,00,000'
  createdAt: string;
  updatedAt: string;
}
