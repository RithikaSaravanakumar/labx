import { LABX_FUNDING_PROGRAM } from '../constants/roadmap';
import type { FundingProgress, FundingMilestoneStatus } from '../types/roadmap';
import { userService } from './index';

export const fundingService = {
  /**
   * Get the current funding progress for a user based on their LABX points
   */
  async getFundingProgress(userId: string): Promise<FundingProgress | null> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In a real app, this would query a dedicated FundingProgress table.
    // For mock purposes, we'll calculate it on the fly using the user's current points.
    
    const user = await userService.getCurrentUser();
    if (!user) return null;

    const currentPoints = user.labxPoints;
    const target = LABX_FUNDING_PROGRAM.pointsThreshold;
    
    const remaining = Math.max(target - currentPoints, 0);
    const percentage = Math.min((currentPoints / target) * 100, 100);
    
    let status: FundingMilestoneStatus = 'NOT_STARTED';
    if (currentPoints === 0) {
      status = 'NOT_STARTED';
    } else if (currentPoints < target) {
      status = 'IN_PROGRESS';
    } else {
      // Mock logic: if they reached the milestone, assume they are under review for this demo
      status = 'ELIGIBILITY_REVIEW';
    }

    return {
      userId,
      programId: LABX_FUNDING_PROGRAM.id,
      progress: {
        current: currentPoints,
        target,
        percentage,
        remaining,
      },
      status,
      lastUpdated: new Date().toISOString(),
    };
  }
};
