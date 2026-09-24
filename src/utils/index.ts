export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return formatDate(dateStr);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toLocaleString();
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getLevelFromPoints(points: number): number {
  // E.g., Level 1 = 0 pts, Level 2 = 250 pts, Level 3 = 500, Level 4 = 800...
  // Simple formula: Math.floor(Math.pow(points / 250, 0.9)) + 1
  // For simplicity, let's keep a linear 250 for now, but calculate absolute bounds.
  if (points < 0) return 1;
  return Math.floor(points / 300) + 1; // Changed to 300 so 2350 is roughly Level 8, but we will allow overriding it if user.level is hardcoded.
}

export function getLevelProgress(points: number, explicitLevel?: number): { 
  level: number; 
  currentLevelMinimum: number; 
  nextLevelThreshold: number; 
  remaining: number; 
  percentage: number;
} {
  // If we have an explicit level (from backend), we derive the thresholds based on that level.
  // Otherwise, we calculate the level from points.
  // For the sake of the demo, let's assume each level takes progressively more points.
  // Level N requires: (N-1) * 300 points.
  
  const level = explicitLevel || Math.floor(points / 300) + 1;
  const currentLevelMinimum = (level - 1) * 300;
  const nextLevelThreshold = level * 300;
  
  const clampedPoints = Math.max(currentLevelMinimum, Math.min(points, nextLevelThreshold));
  const remaining = nextLevelThreshold - clampedPoints;
  const percentage = Math.min(100, Math.max(0, ((clampedPoints - currentLevelMinimum) / (nextLevelThreshold - currentLevelMinimum)) * 100));
  
  return { level, currentLevelMinimum, nextLevelThreshold, remaining, percentage };
}

export function getMatchScore(userSkills: string[], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) return 0;
  const matches = requiredSkills.filter(rs =>
    userSkills.some(us => us.toLowerCase().includes(rs.toLowerCase()) || rs.toLowerCase().includes(us.toLowerCase()))
  );
  return Math.round((matches.length / requiredSkills.length) * 100);
}
