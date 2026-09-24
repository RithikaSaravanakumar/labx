import { describe, it, expect } from 'vitest';
import { pointsService } from '../pointsService';

describe('pointsService', () => {
  it('returns user points successfully', async () => {
    const points = await pointsService.getUserPoints('u1');
    expect(points).toBeGreaterThan(0);
  });

  it('returns point history successfully', async () => {
    const history = await pointsService.getPointHistory('u1');
    expect(history.length).toBeGreaterThan(0);
    expect(history[0].type).toBeDefined();
    expect(history[0].points).toBeDefined();
  });
});
