import type { Quest, PointsTransaction, QuestStatus } from '../types';

const delay = (ms: number = 250) => new Promise(resolve => setTimeout(resolve, ms));

const QUEST_STORAGE_KEY = 'labx_quests_';
const POINTS_TX_STORAGE_KEY = 'labx_points_tx_';

// ===== Default Quest Templates =====
const DEFAULT_QUESTS: Quest[] = [
  {
    id: 'q-complete-profile',
    title: 'Complete Your Profile',
    description: 'Add your bio, skills, location, and social links to establish your builder identity.',
    icon: 'User',
    category: 'identity',
    rewardPoints: 100,
    progress: 0,
    target: 1,
    status: 'ACTIVE',
    requirements: ['Add bio', 'Add skills', 'Add location'],
  },
  {
    id: 'q-first-project',
    title: 'Create First Project',
    description: 'Launch your first project on LabX and start building in public.',
    icon: 'FolderKanban',
    category: 'builder',
    rewardPoints: 250,
    progress: 0,
    target: 1,
    status: 'ACTIVE',
    requirements: ['Create a project with name, description, and domain'],
  },
  {
    id: 'q-first-milestone',
    title: 'Complete First Milestone',
    description: 'Ship a milestone in one of your projects and prove your momentum.',
    icon: 'Target',
    category: 'milestone',
    rewardPoints: 150,
    progress: 0,
    target: 1,
    status: 'LOCKED',
    requirements: ['Must have an active project first'],
  },
  {
    id: 'q-first-contribution',
    title: 'Make First Contribution',
    description: 'Contribute to any project by submitting a build update or code change.',
    icon: 'GitCommit',
    category: 'builder',
    rewardPoints: 75,
    progress: 0,
    target: 1,
    status: 'ACTIVE',
  },
  {
    id: 'q-join-project',
    title: 'Join a Project',
    description: 'Apply to join an open collaboration project and become part of a team.',
    icon: 'UserPlus',
    category: 'collaboration',
    rewardPoints: 100,
    progress: 0,
    target: 1,
    status: 'ACTIVE',
  },
  {
    id: 'q-follow-builder',
    title: 'Follow a Builder',
    description: 'Follow another builder and grow your professional network.',
    icon: 'Users',
    category: 'community',
    rewardPoints: 25,
    progress: 0,
    target: 1,
    status: 'ACTIVE',
  },
  {
    id: 'q-connect-mentor',
    title: 'Connect With a Mentor',
    description: 'Reach out to a mentor in your domain and request guidance.',
    icon: 'Award',
    category: 'community',
    rewardPoints: 200,
    progress: 0,
    target: 1,
    status: 'ACTIVE',
  },
  {
    id: 'q-publish-update',
    title: 'Publish Build Update',
    description: 'Post a build update to share your progress with the LabX community.',
    icon: 'Megaphone',
    category: 'builder',
    rewardPoints: 50,
    progress: 0,
    target: 1,
    status: 'ACTIVE',
  },
  {
    id: 'q-complete-roadmap',
    title: 'Complete a Roadmap Stage',
    description: 'Progress through all milestones in one stage of your innovation roadmap.',
    icon: 'Map',
    category: 'milestone',
    rewardPoints: 300,
    progress: 0,
    target: 1,
    status: 'LOCKED',
    requirements: ['Must have an active roadmap'],
  },
  {
    id: 'q-hackathon',
    title: 'Participate in Hackathon',
    description: 'Register and actively participate in a LabX hackathon.',
    icon: 'Trophy',
    category: 'achievement',
    rewardPoints: 500,
    progress: 0,
    target: 1,
    status: 'ACTIVE',
  },
  {
    id: 'q-help-builder',
    title: 'Help Another Builder',
    description: 'Leave meaningful feedback or review on another builder\'s project.',
    icon: 'MessageCircle',
    category: 'community',
    rewardPoints: 75,
    progress: 0,
    target: 3,
    status: 'ACTIVE',
  },
  {
    id: 'q-five-projects',
    title: 'Active Builder',
    description: 'Contribute to 5 different projects on LabX.',
    icon: 'Layers',
    category: 'builder',
    rewardPoints: 400,
    progress: 0,
    target: 5,
    status: 'LOCKED',
    requirements: ['Must have joined or created at least 2 projects'],
  },
];

// ===== Quest Service =====
export const questService = {
  /**
   * Get all quests for a user. Initializes with defaults if first time.
   */
  async getQuests(userId: string): Promise<Quest[]> {
    await delay();
    try {
      const stored = localStorage.getItem(`${QUEST_STORAGE_KEY}${userId}`);
      if (stored) {
        return JSON.parse(stored) as Quest[];
      }
      // Initialize with defaults
      const initialQuests = DEFAULT_QUESTS.map(q => ({ ...q }));
      localStorage.setItem(`${QUEST_STORAGE_KEY}${userId}`, JSON.stringify(initialQuests));
      return initialQuests;
    } catch {
      return DEFAULT_QUESTS.map(q => ({ ...q }));
    }
  },

  /**
   * Get quests filtered by status
   */
  async getQuestsByStatus(userId: string, status: QuestStatus): Promise<Quest[]> {
    const quests = await this.getQuests(userId);
    return quests.filter(q => q.status === status);
  },

  /**
   * Simulate quest progress update (e.g., user performed an action)
   */
  async updateQuestProgress(userId: string, questId: string, progress: number): Promise<Quest | null> {
    await delay(100);
    try {
      const quests = await this.getQuests(userId);
      const questIdx = quests.findIndex(q => q.id === questId);
      if (questIdx === -1) return null;

      const quest = quests[questIdx];
      const newProgress = Math.min(progress, quest.target);
      const isComplete = newProgress >= quest.target;

      quests[questIdx] = {
        ...quest,
        progress: newProgress,
        status: isComplete && quest.status !== 'CLAIMED'
          ? 'COMPLETED'
          : quest.status === 'ACTIVE' && newProgress > 0
          ? 'IN_PROGRESS'
          : quest.status,
        completedAt: isComplete && !quest.completedAt
          ? new Date().toISOString()
          : quest.completedAt,
      };

      localStorage.setItem(`${QUEST_STORAGE_KEY}${userId}`, JSON.stringify(quests));
      return quests[questIdx];
    } catch {
      return null;
    }
  },

  /**
   * Claim a completed quest reward. Returns awarded points or throws if invalid.
   */
  async claimReward(userId: string, questId: string): Promise<{
    success: boolean;
    pointsAwarded: number;
    quest: Quest;
    transaction: PointsTransaction;
    message: string;
  }> {
    await delay(400);

    const quests = await this.getQuests(userId);
    const questIdx = quests.findIndex(q => q.id === questId);

    if (questIdx === -1) {
      throw new Error('Quest not found');
    }

    const quest = quests[questIdx];

    // Prevent duplicate claims
    if (quest.status === 'CLAIMED') {
      throw new Error('This reward has already been claimed');
    }

    if (quest.status !== 'COMPLETED' && quest.progress < quest.target) {
      throw new Error('Quest is not yet completed');
    }

    // Mark as claimed
    const now = new Date().toISOString();
    const updatedQuest: Quest = {
      ...quest,
      status: 'CLAIMED',
      claimedAt: now,
      completedAt: quest.completedAt || now,
    };

    quests[questIdx] = updatedQuest;

    try {
      localStorage.setItem(`${QUEST_STORAGE_KEY}${userId}`, JSON.stringify(quests));
    } catch { /* ignore */ }

    // Create points transaction
    const transaction: PointsTransaction = {
      id: `tx-${Date.now()}-${questId}`,
      userId,
      type: 'quest_reward',
      amount: quest.rewardPoints,
      description: `Quest Reward: ${quest.title}`,
      questId: quest.id,
      createdAt: now,
    };

    // Store transaction
    try {
      const txKey = `${POINTS_TX_STORAGE_KEY}${userId}`;
      const existing = localStorage.getItem(txKey);
      const transactions: PointsTransaction[] = existing ? JSON.parse(existing) : [];
      transactions.unshift(transaction);
      localStorage.setItem(txKey, JSON.stringify(transactions));
    } catch { /* ignore */ }

    return {
      success: true,
      pointsAwarded: quest.rewardPoints,
      quest: updatedQuest,
      transaction,
      message: `+${quest.rewardPoints} LabX Points awarded!`,
    };
  },

  /**
   * Get all points transactions for a user
   */
  async getPointsTransactions(userId: string): Promise<PointsTransaction[]> {
    await delay(150);
    try {
      const stored = localStorage.getItem(`${POINTS_TX_STORAGE_KEY}${userId}`);
      return stored ? (JSON.parse(stored) as PointsTransaction[]) : [];
    } catch {
      return [];
    }
  },

  /**
   * Get total points earned from quests
   */
  async getQuestPointsTotal(userId: string): Promise<number> {
    const transactions = await this.getPointsTransactions(userId);
    return transactions
      .filter(tx => tx.type === 'quest_reward')
      .reduce((sum, tx) => sum + tx.amount, 0);
  },

  /**
   * Simulate completing a quest for demo purposes
   */
  async simulateQuestCompletion(userId: string, questId: string): Promise<Quest | null> {
    const quests = await this.getQuests(userId);
    const quest = quests.find(q => q.id === questId);
    if (!quest) return null;
    return this.updateQuestProgress(userId, questId, quest.target);
  },

  /**
   * Clear all quest state (used on logout)
   */
  clearQuestState(userId: string) {
    try {
      localStorage.removeItem(`${QUEST_STORAGE_KEY}${userId}`);
      localStorage.removeItem(`${POINTS_TX_STORAGE_KEY}${userId}`);
    } catch { /* ignore */ }
  },
};
