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

export type RoadmapStageStatus = 'LOCKED' | 'CURRENT' | 'COMPLETED';
export type MilestoneStatus = 'LOCKED' | 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED';

export interface RoadmapMilestone {
  id: string;
  stageId: RoadmapStageKey;
  title: string;
  description: string;
  status: MilestoneStatus;
  pointsReward: number;
  completedAt?: string;
}

export interface RoadmapStage {
  id: RoadmapStageKey;
  order: number;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  objective: string;
  activities: string[];
  deliverables: string[];
  completionCriteria: string;
  requiredPoints: number;
  rewardPoints: number;
  status: RoadmapStageStatus;
  progress: number;
  completedAt?: string;
  milestones: RoadmapMilestone[];
}

export interface ProjectRoadmap {
  projectId: string;
  userId: string;
  currentStage: RoadmapStageKey;
  overallProgress: number; // 0-100
  stages: RoadmapStage[];
}

export interface Progress {
  current: number;
  target: number;
  percentage: number;
  remaining: number;
}

// Funding Eligibility Types
export type FundingMilestoneStatus =
  | 'NOT_STARTED'
  | 'IN_PROGRESS'
  | 'MILESTONE_REACHED'
  | 'ELIGIBILITY_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'FUNDED';

export interface FundingProgram {
  id: string;
  name: string;
  pointsThreshold: number;
  maximumFundingAmount: string; // e.g., 'UP TO ₹1,00,000'
  currency: string;
  eligibilityRules: string[];
  status: 'ACTIVE' | 'UPCOMING' | 'CLOSED';
}

export interface FundingProgress {
  userId: string;
  programId: string;
  progress: Progress;
  status: FundingMilestoneStatus;
  lastUpdated: string;
}

// Points Integration
export type PointTransactionType =
  | 'ROADMAP_STAGE'
  | 'ROADMAP_MILESTONE'
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
