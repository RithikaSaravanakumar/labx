import type { PointTransaction } from '../types';

class PointsService {
  private async delay(ms: number = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getUserPoints(userId: string): Promise<number> {
    await this.delay();
    return 18450;
  }

  async getPointHistory(userId: string): Promise<PointTransaction[]> {
    await this.delay();
    return [
      {
        id: 'pt1',
        userId,
        type: 'ROADMAP_STAGE',
        points: 500,
        description: 'Completed Idea stage',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString()
      },
      {
        id: 'pt2',
        userId,
        type: 'PROJECT_CONTRIBUTION',
        points: 250,
        description: 'Implemented authentication',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString()
      }
    ];
  }


}

export const pointsService = new PointsService();
