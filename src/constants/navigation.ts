import {
  Home as HomeIcon,
  Compass,
  Users,
  FolderGit2,
  Rocket,
  Award,
  Sparkles,
  Trophy,
  Activity,
  Network,
  LayoutDashboard,
  Megaphone,
  GitMerge,
  GitCommit,
  User as UserIcon,
  Bell,
  Settings,
  Info,
  Target,
} from 'lucide-react';
import type { NavigationGroup } from '../types/navigation';

export const LABX_NAVIGATION: NavigationGroup[] = [
  {
    id: 'explore',
    title: 'Explore',
    items: [
      { id: 'home', label: 'Home', icon: HomeIcon, path: '/dashboard', authRequired: true },
      { id: 'home-public', label: 'Home', icon: HomeIcon, path: '/', publicOnly: true },
      { id: 'discover', label: 'Discover', icon: Compass, path: '/discover' },
      { id: 'people', label: 'People', icon: Users, path: '/discover?tab=people' },
      { id: 'projects', label: 'Projects', icon: FolderGit2, path: '/projects' },
      { id: 'startups', label: 'Startups', icon: Rocket, path: '/startups' },
      { id: 'mentors', label: 'Mentors', icon: Award, path: '/mentors' },
    ]
  },
  {
    id: 'opportunities',
    title: 'Opportunities',
    items: [
      { id: 'opportunities', label: 'Opportunities', icon: Sparkles, path: '/opportunities' },
      { id: 'hackathons', label: 'Hackathons', icon: Trophy, path: '/hackathons' },
      { id: 'leaderboard', label: 'Leaderboard', icon: Trophy, path: '/leaderboard' },
    ]
  },
  {
    id: 'community',
    title: 'Community',
    items: [
      { id: 'feed', label: 'Feed', icon: Activity, path: '/feed', authRequired: true },
      { id: 'community', label: 'Community', icon: Users, path: '/community' },
      { id: 'connections', label: 'Connections', icon: Network, path: '/network', authRequired: true },
    ]
  },
  {
    id: 'build',
    title: 'Build',
    authRequired: true,
    items: [
      { id: 'my-projects', label: 'My Projects', icon: LayoutDashboard, path: '/dashboard', authRequired: true },
      { id: 'build-public', label: 'Build in Public', icon: Megaphone, path: '/feed', authRequired: true },
      { id: 'roadmap', label: 'Roadmap', icon: GitMerge, path: '/roadmap', authRequired: true },
      { id: 'contributions', label: 'Contributions', icon: GitCommit, path: '/profile', authRequired: true },
      { id: 'quests', label: 'Quests', icon: Target, path: '/quests', authRequired: true },
    ]
  },
  {
    id: 'account',
    title: 'Account',
    items: [
      { id: 'profile', label: 'My Profile', icon: UserIcon, path: '/profile', authRequired: true },
      { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', authRequired: true },
      { id: 'settings', label: 'Settings', icon: Settings, path: '/settings', authRequired: true },
      { id: 'about', label: 'About LabX', icon: Info, path: '/about' },
    ]
  }
];
