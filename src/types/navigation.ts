import type { LucideIcon } from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  path: string;
  description?: string;
  authRequired?: boolean;
  publicOnly?: boolean;
  badge?: string;
  shortcut?: string;
  featureFlag?: string;
}

export interface NavigationGroup {
  id: string;
  title: string;
  items: NavigationItem[];
  authRequired?: boolean;
}
