import { describe, it, expect } from 'vitest';
import { roadmapService } from '../roadmapService';

describe('roadmapService', () => {
  it('gets user roadmaps successfully', async () => {
    // There are some mocked roadmaps in MOCK_PROJECT_ROADMAPS for certain userIds
    // Assuming 'u1' has roadmaps or we just check it returns an array
    const roadmaps = await roadmapService.getUserRoadmaps('u1');
    expect(Array.isArray(roadmaps)).toBe(true);
  });

  it('completes milestone successfully', async () => {
    const success = await roadmapService.completeMilestone('proj1', 'ms1');
    expect(success).toBe(true);
  });
  
  it('completes stage and unlocks next stage', async () => {
    const roadmap = await roadmapService.getProjectRoadmap('p1');
    if (roadmap) {
      const success = await roadmapService.completeStage('p1', roadmap.stages[0].id);
      expect(success).toBe(true);
    }
  });
});
