import { motion } from 'framer-motion';

interface LabXPointRingProps {
  points: number;
  level: number;
  size?: number;
  strokeWidth?: number;
}

export default function LabXPointRing({ points, level, size = 140, strokeWidth = 10 }: LabXPointRingProps) {
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  
  // Calculate level progress (each level is 500 points)
  const levelProgressPoints = points % 500;
  const progressPercent = Math.min((levelProgressPoints / 500) * 100, 100);
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Track Circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress Arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#gradient-ring)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="gradient-ring" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FF87" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>

      {/* Inner Label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] uppercase font-mono tracking-wider text-labx-text-muted">Level</span>
        <span className="text-2xl font-extrabold text-labx-text font-mono">{level}</span>
        <span className="text-[11px] font-bold text-[#00FF87]">{points} pts</span>
      </div>
    </div>
  );
}
