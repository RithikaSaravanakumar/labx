import { describe, it, expect, beforeEach } from 'vitest';
import { questService } from '../questService';

describe('questService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes default quests for a new user', async () => {
    const quests = await questService.getQuests('u1');
    expect(quests.length).toBeGreaterThan(0);
    expect(quests[0].status).toBeDefined();
  });

  it('updates quest progress correctly', async () => {
    const quests = await questService.getQuests('u1');
    const quest = quests[0];
    const updatedQuest = await questService.updateQuestProgress('u1', quest.id, 1);
    
    expect(updatedQuest).toBeDefined();
    expect(updatedQuest?.progress).toBe(1);
    if (updatedQuest?.target === 1) {
      expect(updatedQuest?.status).toBe('COMPLETED');
    }
  });

  it('claims reward and records transaction', async () => {
    // Complete quest
    const quests = await questService.getQuests('u1');
    const questToComplete = quests.find(q => q.status === 'ACTIVE' && q.target === 1)!;
    
    await questService.updateQuestProgress('u1', questToComplete.id, 1);
    
    const result = await questService.claimReward('u1', questToComplete.id);
    
    expect(result.success).toBe(true);
    expect(result.pointsAwarded).toBe(questToComplete.rewardPoints);
    expect(result.quest.status).toBe('CLAIMED');
    
    const transactions = await questService.getPointsTransactions('u1');
    expect(transactions.length).toBe(1);
    expect(transactions[0].amount).toBe(questToComplete.rewardPoints);
  });
});
