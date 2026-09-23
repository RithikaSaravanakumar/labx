export type PostType =
  | 'text'
  | 'project_update'
  | 'milestone'
  | 'achievement'
  | 'question'
  | 'poll'
  | 'build_in_public';

export interface Post {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  authorRole: string;
  authorHeadline: string;
  type: PostType;
  content: string;
  projectId?: string;
  projectName?: string;
  startupId?: string;
  media?: string[];
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLikedByMe: boolean;
  isSavedByMe: boolean;
  labxPointsEarned?: number;
  milestoneTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Follow {
  id: string;
  followerId: string;
  followingId: string;
  createdAt: string;
}

export type ConnectionStatus = 'pending' | 'connected' | 'declined';

export interface Connection {
  id: string;
  senderId: string;
  receiverId: string;
  status: ConnectionStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileStats {
  followers: number;
  following: number;
  connections: number;
  projects: number;
  contributions: number;
  labxPoints: number;
}
