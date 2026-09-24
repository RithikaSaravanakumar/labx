import { describe, it, expect } from 'vitest';
import { feedService } from '../feedService';

describe('feedService', () => {
  it('gets posts paginated', async () => {
    const result = await feedService.getPosts(1, 10);
    expect(result.data).toBeDefined();
    expect(result.page).toBe(1);
    expect(result.limit).toBe(10);
    expect(result.total).toBeGreaterThanOrEqual(0);
  });

  it('creates a new post', async () => {
    const newPost = await feedService.createPost({
      content: 'This is a test post',
      type: 'text'
    });
    
    expect(newPost).toBeDefined();
    expect(newPost.content).toBe('This is a test post');
    expect(newPost.authorName).toBe('Aarav Sharma');
  });

  it('likes a post successfully', async () => {
    const success = await feedService.likePost('post1');
    expect(success).toBe(true);
  });

  it('comments on a post successfully', async () => {
    const success = await feedService.commentPost('post1', 'Great work!');
    expect(success).toBe(true);
  });
});
