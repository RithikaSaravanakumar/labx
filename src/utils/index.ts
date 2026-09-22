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
  return Math.floor(points / 250) + 1;
}

export function getPointsForNextLevel(points: number): { current: number; required: number; remaining: number } {
  const level = getLevelFromPoints(points);
  const required = level * 250;
  const current = points - (level - 1) * 250;
  return { current, required: 250, remaining: required - points + (level - 1) * 250 };
}

export function getMatchScore(userSkills: string[], requiredSkills: string[]): number {
  if (requiredSkills.length === 0) return 0;
  const matches = requiredSkills.filter(rs =>
    userSkills.some(us => us.toLowerCase().includes(rs.toLowerCase()) || rs.toLowerCase().includes(us.toLowerCase()))
  );
  return Math.round((matches.length / requiredSkills.length) * 100);
}
