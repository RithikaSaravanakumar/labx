import { mockMentors, mockProjects, mockOpportunities } from '../data/mockData';
import type { Mentor, Project, Opportunity } from '../types';

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export interface SkillGapAnalysisResult {
  targetRole: string;
  matchScore: number;
  existingSkills: string[];
  missingSkills: string[];
  recommendedProjects: Project[];
  recommendedMentors: Mentor[];
}

export interface ProjectHealthMetric {
  category: string;
  score: number;
  status: 'optimal' | 'moderate' | 'action_needed';
  observation: string;
  recommendation: string;
}

export interface ProjectHealthReport {
  projectId: string;
  overallScore: number;
  sprintVelocity: string;
  metrics: ProjectHealthMetric[];
  aiSummary: string;
}

export const aiService = {
  async getContextualMentorMatches(_userId: string, context: string): Promise<Mentor[]> {
    await delay(350);
    const query = context.toLowerCase();
    const matches = mockMentors.filter(
      m => m.expertise.some(e => query.includes(e.toLowerCase())) || query.includes(m.name.toLowerCase())
    );
    return matches.length > 0 ? matches : mockMentors.slice(0, 3);
  },

  async getSkillGapAnalysis(currentSkills: string[], targetRole: string): Promise<SkillGapAnalysisResult> {
    await delay(400);
    const standardRoleSkills: Record<string, string[]> = {
      'AI Engineer': ['Python', 'PyTorch', 'TensorFlow', 'LLMs', 'Vector Databases', 'TypeScript'],
      'Full-Stack Lead': ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'System Design'],
      'Climate Tech Founder': ['Product Strategy', 'Data Science', 'Fundraising', 'Carbon Accounting'],
      'Smart Contract Auditor': ['Solidity', 'Rust', 'Security Audits', 'EVM Internals', 'Fuzzing'],
    };

    const targetSkills = standardRoleSkills[targetRole] || ['Architecture', 'TypeScript', 'Testing', 'API Design'];
    const currentLower = new Set(currentSkills.map(s => s.toLowerCase()));

    const existingSkills = targetSkills.filter(s => currentLower.has(s.toLowerCase()));
    const missingSkills = targetSkills.filter(s => !currentLower.has(s.toLowerCase()));
    const matchScore = Math.round((existingSkills.length / targetSkills.length) * 100);

    return {
      targetRole,
      matchScore: Math.max(matchScore, 45),
      existingSkills,
      missingSkills,
      recommendedProjects: mockProjects.slice(0, 2),
      recommendedMentors: mockMentors.slice(0, 2),
    };
  },

  async getProjectHealthAnalysis(projectId: string): Promise<ProjectHealthReport> {
    await delay(350);
    const project = mockProjects.find(p => p.id === projectId) || mockProjects[0];

    return {
      projectId: project.id,
      overallScore: 88,
      sprintVelocity: 'High (3 updates this week)',
      aiSummary: `Project "${project.name}" demonstrates consistent milestone progress with verified contributor proof-of-work.`,
      metrics: [
        {
          category: 'Build Cadence',
          score: 92,
          status: 'optimal',
          observation: 'Frequent build releases and clear sprint documentation.',
          recommendation: 'Maintain continuous deployment updates and changelogs.',
        },
        {
          category: 'Team Diversity',
          score: 84,
          status: 'optimal',
          observation: `${project.teamMembers.length} active builders across frontend and ML.`,
          recommendation: 'Consider onboarding a dedicated technical product reviewer.',
        },
        {
          category: 'Community Engagement',
          score: 79,
          status: 'moderate',
          observation: `${project.contributorCount} external contributors participating.`,
          recommendation: 'Tag open issues with #good-first-issue for student contributors.',
        },
      ],
    };
  },

  async getRecommendedOpportunities(_userId: string): Promise<Opportunity[]> {
    await delay(250);
    return mockOpportunities.slice(0, 4);
  },
};
