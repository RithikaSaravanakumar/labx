import { describe, it, expect } from 'vitest';
import { aiService } from '../aiService';

describe('aiService', () => {
  it('matches mentors based on project context query', async () => {
    const matches = await aiService.getContextualMentorMatches('u1', 'Machine Learning healthcare vision');
    expect(matches).toBeDefined();
    expect(matches.length).toBeGreaterThan(0);
    // At least one mentor should have relevant expertise
    const hasMlExpert = matches.some(m =>
      m.expertise.some(e => e.toLowerCase().includes('machine learning') || e.toLowerCase().includes('ai'))
    );
    expect(hasMlExpert).toBe(true);
  });

  it('performs skill gap analysis against target role', async () => {
    const userSkills = ['Python', 'TypeScript'];
    const analysis = await aiService.getSkillGapAnalysis(userSkills, 'AI Engineer');

    expect(analysis.targetRole).toBe('AI Engineer');
    expect(analysis.existingSkills).toContain('Python');
    expect(analysis.existingSkills).toContain('TypeScript');
    expect(analysis.missingSkills.length).toBeGreaterThan(0);
    expect(analysis.matchScore).toBeGreaterThanOrEqual(45);
    expect(analysis.recommendedProjects.length).toBeGreaterThan(0);
    expect(analysis.recommendedMentors.length).toBeGreaterThan(0);
  });

  it('evaluates project health with categorized metrics and action items', async () => {
    const report = await aiService.getProjectHealthAnalysis('p1');

    expect(report.projectId).toBe('p1');
    expect(report.overallScore).toBeGreaterThan(0);
    expect(report.metrics.length).toBe(3);

    const categories = report.metrics.map(m => m.category);
    expect(categories).toContain('Build Cadence');
    expect(categories).toContain('Team Diversity');
    expect(categories).toContain('Community Engagement');

    report.metrics.forEach(metric => {
      expect(metric.score).toBeGreaterThan(0);
      expect(['optimal', 'moderate', 'action_needed']).toContain(metric.status);
      expect(metric.observation).toBeTruthy();
      expect(metric.recommendation).toBeTruthy();
    });
  });

  it('returns recommended opportunities for user exploration', async () => {
    const opportunities = await aiService.getRecommendedOpportunities('u1');
    expect(opportunities).toBeDefined();
    expect(opportunities.length).toBeGreaterThan(0);
    expect(opportunities[0]).toHaveProperty('title');
    expect(opportunities[0]).toHaveProperty('type');
  });
});
