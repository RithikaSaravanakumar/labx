import type { User, Follow, Connection, ConnectionStatus } from '../types';
import { mockUsers } from '../data/mockData';

class NetworkService {
  private async delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Follow System
  async followUser(userId: string): Promise<boolean> {
    await this.delay();
    return true;
  }

  async unfollowUser(userId: string): Promise<boolean> {
    await this.delay();
    return true;
  }

  async getFollowers(userId: string): Promise<User[]> {
    await this.delay();
    // Return some mock users as followers
    return mockUsers.slice(0, 3);
  }

  async getFollowing(userId: string): Promise<User[]> {
    await this.delay();
    return mockUsers.slice(2, 5);
  }

  async isFollowing(userId: string, targetId: string): Promise<boolean> {
    await this.delay(200);
    return false;
  }

  // Connection System
  async sendConnectionRequest(targetId: string): Promise<Connection> {
    await this.delay();
    return {
      id: Math.random().toString(36).substr(2, 9),
      senderId: 'current-user', // Mock current user
      receiverId: targetId,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  async acceptConnection(connectionId: string): Promise<boolean> {
    await this.delay();
    return true;
  }

  async declineConnection(connectionId: string): Promise<boolean> {
    await this.delay();
    return true;
  }

  async removeConnection(userId: string): Promise<boolean> {
    await this.delay();
    return true;
  }

  async getConnections(userId: string): Promise<User[]> {
    await this.delay();
    return mockUsers.slice(1, 4);
  }

  async getPendingRequests(): Promise<User[]> {
    await this.delay();
    return [mockUsers[0]];
  }

  async getSuggestedConnections(): Promise<User[]> {
    await this.delay();
    return mockUsers.slice(3, 7);
  }
}

export const networkService = new NetworkService();
