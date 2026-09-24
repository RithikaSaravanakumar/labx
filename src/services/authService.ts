import { mockUsers } from '../data/mockData';
import type { User, UserRole, AuthCredentials, SignupFormData, DemoPersona } from '../types';

const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));
const STORAGE_KEY = 'labx_auth_user';

export const DEMO_PASSWORD = 'LabX@Demo123';

export const DEMO_PERSONAS: DemoPersona[] = [
  {
    id: 'demo-student',
    role: 'student',
    name: 'Rahul Krishnan',
    title: 'Computer Science Student & Aspiring AI Builder',
    email: 'student@labx.demo',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Rahul',
    description: 'Looking to join projects, find mentors, and turn college projects into proof-of-work.',
  },
  {
    id: 'demo-builder',
    role: 'builder',
    name: 'Aarav Sharma',
    title: 'Full-Stack Developer & AI Innovator',
    email: 'builder@labx.demo',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aarav',
    description: 'Active contributor building open-source AI health products. Looking for cross-domain collaborators.',
  },
  {
    id: 'demo-founder',
    role: 'founder',
    name: 'Priya Nair',
    title: 'Founder @ EcoTrack (Climate Tech)',
    email: 'founder@labx.demo',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Priya',
    description: 'Building in public, assembling a high-caliber technical team, and tracking milestone traction.',
  },
  {
    id: 'demo-mentor',
    role: 'mentor',
    name: 'Dr. Sarah Chen',
    title: 'Principal AI Scientist & Mentor',
    email: 'mentor@labx.demo',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah',
    description: 'Guiding builders on AI architectures, model optimization, and research commercialization.',
  },
  {
    id: 'demo-investor',
    role: 'investor',
    name: 'Marcus Sterling',
    title: 'Early Stage Partner @ Horizon Ventures',
    email: 'investor@labx.demo',
    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Marcus',
    description: 'Scouting student-led startups and high-traction builders backed by verified proof-of-work.',
  },
];

export const authService = {
  async getDemoPersonas(): Promise<DemoPersona[]> {
    return DEMO_PERSONAS;
  },

  async getCurrentUser(): Promise<User | null> {
    await delay(150);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored) as User;
      }
    } catch {
      // Ignore storage error
    }
    return null;
  },

  async login(credentials: AuthCredentials): Promise<User> {
    await delay(350);
    const emailLower = credentials.email.toLowerCase().trim();

    const demo = DEMO_PERSONAS.find(d => d.email.toLowerCase() === emailLower);
    if (demo) {
      return this.loginWithDemo(demo.role);
    }

    const existing = mockUsers.find(u => u.username.toLowerCase() === emailLower.split('@')[0] || u.id === emailLower);
    if (existing) {
      const userToStore = { ...existing };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
      } catch {
        // Ignore storage error
      }
      return userToStore;
    }

    const newUser: User = {
      id: `u-${Date.now()}`,
      username: emailLower.split('@')[0] || 'builder',
      name: (emailLower.split('@')[0] || 'Builder').replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${emailLower}`,
      role: 'builder',
      roles: ['builder'],
      bio: 'Innovator and builder on LabX.',
      location: 'Global',
      skills: ['React', 'TypeScript', 'Innovation'],
      interests: ['ai-ml', 'saas'],
      labxPoints: 250,
      level: 2,
      joinedDate: new Date().toISOString().split('T')[0],
      isVerified: false, followersCount: 0, followingCount: 0, connectionsCount: 0,
      projectIds: [],
      achievements: [
        { id: 'a-welcome', name: 'Ecosystem Citizen', description: 'Joined LabX Innovation Ecosystem', icon: '', earnedDate: new Date().toISOString().split('T')[0], rarity: 'common' }
      ],
      contributionStreak: 1,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore storage error
    }
    return newUser;
  },

  async loginWithDemo(role: UserRole): Promise<User> {
    await delay(200);
    let matchedUser = mockUsers.find(u => u.role === role);

    if (!matchedUser) {
      const demo = DEMO_PERSONAS.find(d => d.role === role);
      matchedUser = {
        id: `demo-${role}`,
        username: demo ? demo.email.split('@')[0] : `demo_${role}`,
        name: demo ? demo.name : `${role.charAt(0).toUpperCase() + role.slice(1)} Demo`,
        avatar: demo ? demo.avatar : `https://api.dicebear.com/9.x/avataaars/svg?seed=${role}`,
        role,
        roles: [role],
        bio: demo ? demo.description : `Demo profile for ${role}`,
        location: 'Bengaluru / Global',
        skills: ['TypeScript', 'Architecture', 'Innovation'],
        interests: ['ai-ml', 'saas', 'climate'],
        labxPoints: role === 'mentor' ? 4200 : role === 'founder' ? 3100 : 1500,
        level: role === 'mentor' ? 12 : 6,
        joinedDate: '2024-01-01',
        isVerified: false, followersCount: 0, followingCount: 0, connectionsCount: 0,
        projectIds: ['p1'],
        achievements: [
          { id: 'demo-ach', name: 'Verified Persona', description: 'LabX verified demo account', icon: '', earnedDate: '2024-01-01', rarity: 'epic' }
        ],
        contributionStreak: 15,
      };
    }

    const userToStore: User = {
      ...matchedUser,
      roles: matchedUser.roles || [matchedUser.role],
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userToStore));
    } catch {
      // Ignore storage error
    }
    return userToStore;
  },

  async signup(formData: SignupFormData): Promise<User> {
    await delay(350);
    const newUser: User = {
      id: `u-${Date.now()}`,
      username: formData.email.split('@')[0] || `user_${Date.now().toString().slice(-4)}`,
      name: formData.name,
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(formData.name)}`,
      role: formData.role,
      roles: [formData.role],
      bio: `Passionate ${formData.role} building in ${formData.interests.slice(0, 2).join(' & ') || 'technology'}.`,
      location: 'Remote',
      skills: formData.interests.length > 0 ? formData.interests : ['Innovation', 'Development'],
      interests: (formData.interests.length > 0 ? formData.interests : ['ai-ml']) as any,
      labxPoints: 100,
      level: 1,
      joinedDate: new Date().toISOString().split('T')[0],
      isVerified: false, followersCount: 0, followingCount: 0, connectionsCount: 0,
      projectIds: [],
      achievements: [
        { id: 'a1', name: 'First Step', description: 'Created your LabX proof-of-work identity', icon: '', earnedDate: new Date().toISOString().split('T')[0], rarity: 'common' },
      ],
      contributionStreak: 1,
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // Ignore storage error
    }
    return newUser;
  },

  async logout(): Promise<void> {
    await delay(150);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage error
    }
  },

  async refreshSession(): Promise<User | null> {
    return this.getCurrentUser();
  },

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    await delay(300);
    return {
      success: true,
      message: `Password reset instructions have been sent to ${email} (Demo simulation: check your email).`,
    };
  },

  async resetPassword(_token: string, _newPass: string): Promise<{ success: boolean; message: string }> {
    await delay(300);
    return {
      success: true,
      message: 'Your password has been successfully reset. You can now log in with your new credentials.',
    };
  },
};
