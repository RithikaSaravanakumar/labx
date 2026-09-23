import { mockUsers, mockProjects, mockStartups, mockMentors, mockIdeas, mockBuildUpdates, mockHackathons, mockOpportunities, mockContributions, mockNotifications } from '../data/mockData';
import type { User, Project, Startup, Mentor, Idea, BuildUpdate, Hackathon, Opportunity, Contribution, Notification, Domain, ProjectStage, OpportunityType } from '../types';

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

// ===== User Service =====
export const userService = {
  async getUsers(): Promise<User[]> {
    await delay();
    return mockUsers;
  },
  async getUserById(id: string): Promise<User | undefined> {
    await delay();
    return mockUsers.find(u => u.id === id);
  },
  async getUserByUsername(username: string): Promise<User | undefined> {
    await delay();
    return mockUsers.find(u => u.username === username);
  },
  async getCurrentUser(): Promise<User> {
    await delay();
    return mockUsers[0]; // Aarav is the default logged-in user
  },
};

// ===== Project Service =====
export const projectService = {
  async getProjects(filters?: { domain?: Domain; stage?: ProjectStage; search?: string }): Promise<Project[]> {
    await delay();
    let projects = [...mockProjects];
    if (filters?.domain) projects = projects.filter(p => p.domain === filters.domain);
    if (filters?.stage) projects = projects.filter(p => p.stage === filters.stage);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      projects = projects.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return projects;
  },
  async getProjectById(id: string): Promise<Project | undefined> {
    await delay();
    return mockProjects.find(p => p.id === id);
  },
  async getRecommendedProjects(userId: string): Promise<Project[]> {
    await delay();
    const user = mockUsers.find(u => u.id === userId);
    if (!user) return mockProjects.slice(0, 3);
    return mockProjects.filter(p => user.interests.includes(p.domain)).slice(0, 4);
  },
  async getTrendingProjects(): Promise<Project[]> {
    await delay();
    return [...mockProjects].sort((a, b) => b.labxPoints - a.labxPoints).slice(0, 4);
  },
  async createDraft(data: Partial<Project>): Promise<Project> {
    await delay();
    const newProject: Project = {
      id: `proj_${Date.now()}`,
      name: data.name || '',
      description: data.description || '',
      problem: data.problem || '',
      solution: data.solution || '',
      domain: data.domain || 'web-development',
      stage: 'idea',
      progress: 0,
      teamMembers: [],
      techStack: data.techStack || [],
      milestones: [],
      buildUpdates: [],
      labxPoints: 0,
      contributorCount: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      hackathonIds: [],
      isOpenForCollaboration: true,
      ...data
    };
    mockProjects.push(newProject);
    return newProject;
  },
  async publishProject(id: string): Promise<void> {
    await delay();
    const p = mockProjects.find(p => p.id === id);
    if (p) p.stage = 'prototype';
  },
};

// ===== Startup Service =====
export const startupService = {
  async getStartups(filters?: { domain?: Domain; stage?: string; search?: string }): Promise<Startup[]> {
    await delay();
    let startups = [...mockStartups];
    if (filters?.domain) startups = startups.filter(s => s.domain === filters.domain);
    if (filters?.stage) startups = startups.filter(s => s.stage === filters.stage);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      startups = startups.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    return startups;
  },
  async getStartupById(id: string): Promise<Startup | undefined> {
    await delay();
    return mockStartups.find(s => s.id === id);
  },
};

// ===== Mentor Service =====
export const mentorService = {
  async getMentors(filters?: { domain?: Domain; search?: string }): Promise<Mentor[]> {
    await delay();
    let mentors = [...mockMentors];
    if (filters?.domain) mentors = mentors.filter(m => m.domains.includes(filters.domain!));
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      mentors = mentors.filter(m => m.name.toLowerCase().includes(q) || m.expertise.some(e => e.toLowerCase().includes(q)));
    }
    return mentors;
  },
  async getMentorById(id: string): Promise<Mentor | undefined> {
    await delay();
    return mockMentors.find(m => m.id === id);
  },
  async getRecommendedMentors(projectDomain: Domain): Promise<(Mentor & { matchScore: number; matchReasons: string[] })[]> {
    await delay();
    return mockMentors
      .filter(m => m.domains.includes(projectDomain))
      .map(m => ({
        ...m,
        matchScore: Math.floor(Math.random() * 15 + 85),
        matchReasons: m.domains.filter(d => d === projectDomain).map(d => d.replace('-', '/').toUpperCase()),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  },
};

// ===== Hackathon Service =====
export const hackathonService = {
  async getHackathons(status?: string): Promise<Hackathon[]> {
    await delay();
    if (status) return mockHackathons.filter(h => h.status === status);
    return mockHackathons;
  },
  async getHackathonById(id: string): Promise<Hackathon | undefined> {
    await delay();
    return mockHackathons.find(h => h.id === id);
  },
  async getFeaturedHackathons(): Promise<Hackathon[]> {
    await delay();
    return mockHackathons.filter(h => h.isFeatured);
  },
};

// ===== Opportunity Service =====
export const opportunityService = {
  async getOpportunities(filters?: { type?: OpportunityType; domain?: Domain; search?: string }): Promise<Opportunity[]> {
    await delay();
    let opportunities = [...mockOpportunities];
    if (filters?.type) opportunities = opportunities.filter(o => o.type === filters.type);
    if (filters?.domain) opportunities = opportunities.filter(o => o.domain === filters.domain);
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      opportunities = opportunities.filter(o => o.title.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q));
    }
    return opportunities;
  },
  async getOpportunityById(id: string): Promise<Opportunity | undefined> {
    await delay();
    return mockOpportunities.find(o => o.id === id);
  },
};

// ===== Idea Service =====
export const ideaService = {
  async getIdeas(): Promise<Idea[]> {
    await delay();
    return mockIdeas;
  },
  async getIdeaById(id: string): Promise<Idea | undefined> {
    await delay();
    return mockIdeas.find(i => i.id === id);
  },
};

// ===== Build Update Service =====
export const buildUpdateService = {
  async getBuildUpdates(): Promise<BuildUpdate[]> {
    await delay();
    return mockBuildUpdates.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  async getBuildUpdatesByProject(projectId: string): Promise<BuildUpdate[]> {
    await delay();
    return mockBuildUpdates.filter(bu => bu.projectId === projectId);
  },
};

// ===== Contribution Service =====
export const contributionService = {
  async getContributions(userId: string): Promise<Contribution[]> {
    await delay();
    return mockContributions.filter(c => c.userId === userId);
  },
  async getRecentContributions(userId: string, limit: number = 5): Promise<Contribution[]> {
    await delay();
    return mockContributions
      .filter(c => c.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  },
};

// ===== Notification Service =====
export const notificationService = {
  async getNotifications(): Promise<Notification[]> {
    await delay();
    return mockNotifications.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  async getUnreadCount(): Promise<number> {
    await delay();
    return mockNotifications.filter(n => !n.isRead).length;
  },
};

// ===== Search Service =====
export const searchService = {
  async search(query: string) {
    await delay(200);
    const q = query.toLowerCase();
    return {
      projects: mockProjects.filter(p => p.name.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q))),
      startups: mockStartups.filter(s => s.name.toLowerCase().includes(q)),
      people: mockUsers.filter(u => u.name.toLowerCase().includes(q) || u.skills.some(s => s.toLowerCase().includes(q))),
      mentors: mockMentors.filter(m => m.name.toLowerCase().includes(q) || m.expertise.some(e => e.toLowerCase().includes(q))),
      hackathons: mockHackathons.filter(h => h.name.toLowerCase().includes(q) || h.theme.toLowerCase().includes(q)),
      opportunities: mockOpportunities.filter(o => o.title.toLowerCase().includes(q) || o.organization.toLowerCase().includes(q)),
    };
  },
};

// Export specialized auth and AI services
export { authService } from './authService';
export { aiService } from './aiService';
export { networkService } from './networkService';
export { feedService } from './feedService';
export { pointsService } from './pointsService';
