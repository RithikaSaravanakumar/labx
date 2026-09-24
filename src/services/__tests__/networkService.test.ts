import { describe, it, expect } from 'vitest';
import { networkService } from '../networkService';

describe('networkService', () => {
  it('follows a user successfully', async () => {
    const success = await networkService.followUser('u2');
    expect(success).toBe(true);
  });

  it('gets followers successfully', async () => {
    const followers = await networkService.getFollowers('u1');
    expect(followers).toBeDefined();
    expect(Array.isArray(followers)).toBe(true);
  });

  it('sends connection request successfully', async () => {
    const request = await networkService.sendConnectionRequest('u2');
    expect(request.status).toBe('pending');
    expect(request.receiverId).toBe('u2');
  });

  it('accepts connection successfully', async () => {
    const success = await networkService.acceptConnection('req1');
    expect(success).toBe(true);
  });
});
