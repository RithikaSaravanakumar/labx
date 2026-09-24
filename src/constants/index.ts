import type { Domain, UserRole } from '../types';

export const DOMAIN_LABELS: Record<Domain, string> = {
  'ai-ml': 'AI / ML',
  'healthcare': 'Healthcare',
  'climate': 'Climate',
  'deep-tech': 'Deep Tech',
  'fintech': 'FinTech',
  'edtech': 'EdTech',
  'robotics': 'Robotics',
  'cybersecurity': 'Cybersecurity',
  'saas': 'SaaS',
  'web-development': 'Web Development',
  'research': 'Research',
  'automation': 'Automation',
};

export const DOMAIN_COLORS: Record<Domain, string> = {
  'ai-ml': '#22D3EE',           // cyan — AI is LabX core
  'healthcare': '#A855F7',      // purple
  'climate': '#06B6D4',         // cyan-mid
  'deep-tech': '#7C3AED',       // violet
  'fintech': '#F59E0B',         // gold/amber
  'edtech': '#0EA5E9',          // blue
  'robotics': '#8B5CF6',        // violet-light
  'cybersecurity': '#EF4444',   // red (semantic)
  'saas': '#22D3EE',            // cyan
  'web-development': '#0EA5E9', // blue
  'research': '#C4B5FD',        // lavender
  'automation': '#06B6D4',      // cyan-mid
};

export const ROLE_LABELS: Record<UserRole, string> = {
  student: 'Student',
  builder: 'Builder',
  founder: 'Founder',
  mentor: 'Mentor',
  investor: 'Investor',
  researcher: 'Researcher',
  creator: 'Creator',
};

export const STAGE_LABELS: Record<string, string> = {
  'idea': 'Idea',
  'prototype': 'Prototype',
  'mvp': 'MVP',
  'beta': 'Beta',
  'launch': 'Launch',
  'growth': 'Growth',
  'pre-seed': 'Pre-seed',
  'seed': 'Seed',
  'raw': 'Raw',
  'refined': 'Refined',
  'seeking-team': 'Seeking Team',
  'building': 'Building',
};

export const STAGE_COLORS: Record<string, string> = {
  'idea': '#64748B',
  'prototype': '#F59E0B',
  'mvp': '#22D3EE',
  'beta': '#0EA5E9',
  'launch': '#7C3AED',
  'growth': '#A855F7',
};

export const NAV_ITEMS = [
  { label: 'Discover', path: '/discover' },
  { label: 'Feed', path: '/feed' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Projects', path: '/projects' },
  { label: 'Startups', path: '/startups' },
  { label: 'Mentors', path: '/mentors' },
  { label: 'Opportunities', path: '/opportunities' },
  { label: 'Community', path: '/community' },
];

export const CONTRIBUTION_TYPE_LABELS: Record<string, string> = {
  project: 'Project contribution',
  community: 'Community contribution',
  hackathon: 'Hackathon',
  mentorship: 'Mentorship',
  collaboration: 'Collaboration',
  knowledge: 'Knowledge sharing',
};

export const CONTRIBUTION_TYPE_COLORS: Record<string, string> = {
  project: '#22D3EE',
  community: '#0EA5E9',
  hackathon: '#F59E0B',
  mentorship: '#A855F7',
  collaboration: '#7C3AED',
  knowledge: '#C4B5FD',
};

export * from './navigation';
export * from './roadmap';
