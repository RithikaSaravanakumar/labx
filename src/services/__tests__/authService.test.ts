import { describe, it, expect, beforeEach } from 'vitest';
import { authService, DEMO_PERSONAS, DEMO_PASSWORD } from '../authService';

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('provides 5 official demo personas', async () => {
    const personas = await authService.getDemoPersonas();
    expect(personas).toHaveLength(5);
    expect(personas.map(p => p.role)).toEqual(
      expect.arrayContaining(['student', 'builder', 'founder', 'mentor', 'investor'])
    );
  });

  it('successfully logs in with a demo persona role', async () => {
    const user = await authService.loginWithDemo('builder');
    expect(user).toBeDefined();
    expect(user.role).toBe('builder');
    expect(user.name).toBe('Aarav Sharma');
  });

  it('successfully logs in with demo persona email', async () => {
    const studentPersona = DEMO_PERSONAS.find(p => p.role === 'student');
    expect(studentPersona).toBeDefined();

    const user = await authService.login({
      email: studentPersona!.email,
      password: DEMO_PASSWORD,
    });

    expect(user).toBeDefined();
    expect(user.role).toBe('student');
  });

  it('supports new user signup with custom role and interests', async () => {
    const user = await authService.signup({
      name: 'Maya Lin',
      email: 'maya@innovate.ai',
      password: 'SecurePassword123!',
      role: 'founder',
      interests: ['ai-ml', 'healthcare'],
      lookingFor: ['Co-founders'],
    });

    expect(user).toBeDefined();
    expect(user.name).toBe('Maya Lin');
    expect(user.role).toBe('founder');
    expect(user.labxPoints).toBeGreaterThan(0);
  });

  it('handles logout and clears session', async () => {
    await authService.loginWithDemo('founder');
    await authService.logout();
    const stored = localStorage.getItem('labx_auth_user');
    expect(stored).toBeNull();
  });

  it('handles forgot password simulation', async () => {
    const result = await authService.forgotPassword('test@labx.demo');
    expect(result.success).toBe(true);
    expect(result.message).toContain('test@labx.demo');
  });
});
