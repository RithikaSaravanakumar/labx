import type { Project } from '../types';

class ProjectService {
  private async delay(ms: number = 400) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async createDraft(projectData: Partial<Project>): Promise<Project> {
    await this.delay();
    return {
      id: Math.random().toString(36).substr(2, 9),
      name: projectData.name || 'Untitled Project',
      description: projectData.description || '',
      problem: projectData.problem || '',
      solution: projectData.solution || '',
      domain: projectData.domain || 'ai-ml',
      stage: 'idea',
      progress: 0,
      teamMembers: [],
      techStack: projectData.techStack || [],
      milestones: [],
      buildUpdates: [],
      labxPoints: 0,
      contributorCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: [],
      hackathonIds: [],
      isOpenForCollaboration: true,
      ownerId: 'u1',
      ownerName: 'Current User',
      fundingStatus: 'NOT_STARTED',
      ...projectData
    };
  }

  async updateDraft(_projectId: string, updates: Partial<Project>): Promise<Project> {
    await this.delay();
    // Return updated mock
    return this.createDraft(updates); // Mock implementation
  }

  async publishProject(_projectId: string): Promise<boolean> {
    await this.delay(800);
    return true;
  }
}

export const projectService = new ProjectService();
