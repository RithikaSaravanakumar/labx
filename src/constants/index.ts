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
  'ai-ml': '#00FF87',
  'healthcare': '#22C55E',
  'climate': '#2DD4BF',
  'deep-tech': '#10B981',
  'fintech': '#F59E0B',
  'edtech': '#3B82F6',
  'robotics': '#10B981',
  'cybersecurity': '#EF4444',
  'saas': '#05DF72',
  'web-development': '#34D399',
  'research': '#6EE7B7',
  'automation': '#14B8A6',
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
  'mvp': '#7C3AED',
  'beta': '#22D3EE',
  'launch': '#22C55E',
  'growth': '#A855F7',
};

export const NAV_ITEMS = [
  { label: 'Discover', path: '/discover' },
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
  project: '#7C3AED',
  community: '#22D3EE',
  hackathon: '#F59E0B',
  mentorship: '#22C55E',
  collaboration: '#A855F7',
  knowledge: '#C4B5FD',
};
