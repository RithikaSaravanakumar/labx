import type { Post, PaginatedResponse } from '../types';
import { mockPosts } from '../data/mockSocial';

class FeedService {
  private async delay(ms: number = 600) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getPosts(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Post>> {
    await this.delay();
    return {
      data: mockPosts,
      page,
      limit,
      total: mockPosts.length,
      hasNextPage: false
    };
  }

  async createPost(postData: Partial<Post>): Promise<Post> {
    await this.delay(800);
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      authorId: 'u1',
      authorName: 'Aarav Sharma',
      authorAvatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aarav',
      authorRole: 'builder',
      authorHeadline: 'Full-stack developer',
      type: postData.type || 'text',
      content: postData.content || '',
      projectId: postData.projectId,
      projectName: postData.projectName,
      tags: postData.tags || [],
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLikedByMe: false,
      isSavedByMe: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...postData
    };
    // Prepend to mock for session state (in memory)
    mockPosts.unshift(newPost);
    return newPost;
  }

  async likePost(postId: string): Promise<boolean> {
    await this.delay(200);
    return true;
  }

  async commentPost(postId: string, content: string): Promise<boolean> {
    await this.delay(400);
    return true;
  }
}

export const feedService = new FeedService();
