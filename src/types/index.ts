// ===== Core Entity Types =====

export interface User {
  id: string;
  username: string;
  name: string;
  avatar: string;
  role: UserRole;
  roles?: UserRole[];
  bio: string;
  location: string;
  skills: string[];
  interests: string[];
  labxPoints: number;
  level: number;
  joinedDate: string;
  isVerified: boolean;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  projectIds: string[];
  achievements: Achievement[];
  contributionStreak: number;
}

export type UserRole = 'student' | 'builder' | 'founder' | 'mentor' | 'investor' | 'researcher' | 'creator';

export interface Project {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  problem: string;
  solution: string;
  domain: Domain;
  stage: ProjectStage;
  progress: number;
  teamMembers: TeamMember[];
  techStack: string[];
  mentorId?: string;
  milestones: Milestone[];
  buildUpdates: BuildUpdate[];
  labxPoints: number;
  contributorCount: number;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  tags: string[];
  hackathonIds: string[];
  isOpenForCollaboration: boolean;
  trendingScore?: number;
  lookingFor?: string[];
  ownerName?: string;
  ownerAvatar?: string;
  repoUrl?: string;
}

export type ProjectStage = 'idea' | 'prototype' | 'mvp' | 'beta' | 'launch' | 'growth';
export type Stage = ProjectStage;

export type Domain =
  | 'ai-ml'
  | 'healthcare'
  | 'climate'
  | 'deep-tech'
  | 'fintech'
  | 'edtech'
  | 'robotics'
  | 'cybersecurity'
  | 'saas'
  | 'web-development'
  | 'research'
  | 'automation';

export interface TeamMember {
  userId: string;
  name: string;
  avatar: string;
  role: string;
}

export interface Startup {
  id: string;
  name: string;
  tagline?: string;
  description: string;
  problem: string;
  solution: string;
  domain: Domain;
  stage: StartupStage;
  founderId: string;
  founderName: string;
  founderAvatar: string;
  teamMembers: TeamMember[];
  techStack: string[];
  milestones: Milestone[];
  traction: TractionMetric[];
  progress: number;
  location: string;
  website?: string;
  fundingStage?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  isVerified: boolean;
}

export type StartupStage = 'pre-seed' | 'seed' | 'mvp' | 'growth';

export interface TractionMetric {
  label: string;
  value: string;
  change?: string;
}

export interface Mentor {
  id: string;
  userId: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string[];
  domains: Domain[];
  experience: string;
  company?: string;
  title?: string;
  availability: 'available' | 'limited' | 'unavailable';
  rating: number;
  totalSessions: number;
  skills: string[];
  isVerified: boolean;
  location: string;
}

export interface Idea {
  id: string;
  title: string;
  problem: string;
  solution: string;
  domain: Domain;
  stage: 'raw' | 'refined' | 'seeking-team' | 'building';
  requiredSkills: string[];
  authorId: string;
  authorName: string;
  authorAvatar: string;
  supporters: number;
  interestedBuilders: number;
  createdAt: string;
  tags: string[];
}

export interface BuildUpdate {
  id: string;
  projectId: string;
  projectName: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  day: number;
  title: string;
  content: string;
  type?: string;
  proofUrl?: string;
  milestone?: string;
  progress?: number;
  reactions: Reactions;
  commentCount: number;
  createdAt: string;
  tags: string[];
}

export interface Reactions {
  fire: number;
  rocket: number;
  heart: number;
  clap: number;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  stage: ProjectStage;
  date: string;
  isCompleted: boolean;
  contributors: string[];
}

export interface Hackathon {
  id: string;
  name: string;
  organizer: string;
  theme: string;
  description: string;
  startDate: string;
  endDate: string;
  deadline: string;
  participants: number;
  teams: number;
  prize: string;
  skills: string[];
  status: 'upcoming' | 'live' | 'completed';
  isFeatured: boolean;
  challenges: string[];
  tags: string[];
  coverImage?: string;
}

export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: OpportunityType;
  deadline: string;
  eligibility: string;
  domain: Domain;
  location: string;
  isRemote: boolean;
  description: string;
  tags: string[];
  createdAt: string;
}

export type OpportunityType =
  | 'hackathon'
  | 'internship'
  | 'job'
  | 'grant'
  | 'mentorship'
  | 'challenge'
  | 'accelerator'
  | 'collaboration';

export interface Contribution {
  id: string;
  userId: string;
  type: ContributionType;
  description: string;
  points: number;
  date: string;
  projectId?: string;
  projectName?: string;
}

export type ContributionType =
  | 'project'
  | 'community'
  | 'hackathon'
  | 'mentorship'
  | 'collaboration'
  | 'knowledge';

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
  senderName?: string;
  senderAvatar?: string;
}

export type NotificationType =
  | 'project-invite'
  | 'collaboration-request'
  | 'mentor-recommendation'
  | 'build-reaction'
  | 'milestone'
  | 'opportunity'
  | 'hackathon'
  | 'achievement';

export interface Comment {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  content: string;
  createdAt: string;
  reactions: Reactions;
}

export interface CollaborationRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  projectId: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface Team {
  id: string;
  name: string;
  projectId: string;
  members: TeamMember[];
  openRoles: string[];
}

// ===== UI Types =====

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface TabItem {
  label: string;
  value: string;
  count?: number;
  icon?: string;
}

export interface SearchResult {
  type: 'project' | 'startup' | 'person' | 'mentor' | 'hackathon' | 'opportunity';
  id: string;
  title: string;
  subtitle: string;
  avatar?: string;
}

export interface ContributionDay {
  date: string;
  count: number;
  type: ContributionType;
}

export interface OnboardingData {
  role: UserRole | null;
  interests: Domain[];
}

// ===== Scalability & Pagination Types =====

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasNextPage: boolean;
}

// ===== Authentication & Demo Types =====

export interface AuthCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  interests: string[];
  lookingFor: string[];
}

export interface DemoPersona {
  id: string;
  role: UserRole;
  name: string;
  title: string;
  email: string;
  avatar: string;
  description: string;
}

export interface ApplicationItem {
  id: string;
  type: 'project' | 'grant' | 'mentorship' | 'hackathon' | 'opportunity';
  targetId: string;
  title: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'declined';
  appliedDate: string;
  organization?: string;
  feedback?: string;
}

export interface SavedItem {
  id: string;
  type: 'project' | 'startup' | 'mentor' | 'opportunity' | 'idea';
  targetId: string;
  title: string;
  description: string;
  savedDate: string;
  metadata?: Record<string, unknown>;
}

