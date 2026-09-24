import { useReducedMotion } from 'framer-motion';

export type LabXCoinSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type LabXCoinVariant = 'default' | 'compact' | 'hero' | 'reward' | 'milestone' | 'leaderboard';

interface LabXCoinProps {
  size?: LabXCoinSize;
  variant?: LabXCoinVariant;
  animated?: boolean;
  className?: string;
  points?: number;
}

const SIZE_MAP: Record<LabXCoinSize, string> = {
  xs: 'w-3.5 h-3.5',
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-16 h-16',
  xl: 'w-28 h-28',
};

export default function LabXCoin({ 
  size = 'md', 
  variant = 'default', 
  animated = true,
  className = ''
}: LabXCoinProps) {
  const shouldReduceMotion = useReducedMotion();
  const isAnimated = animated && !shouldReduceMotion;

  const sizeClass = SIZE_MAP[size];

  // Using SVG + CSS 3D transforms
  return (
    <div 
      className={`relative inline-flex items-center justify-center ${sizeClass} ${className} drop-shadow-[0_4px_12px_rgba(245,197,66,0.3)] perspective-1000 group`}
      aria-hidden="true"
    >
      <div 
        className={`w-full h-full preserve-3d ${isAnimated ? 'animate-spin-slow-y' : ''} group-hover:scale-105 transition-transform duration-300`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Face */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'translateZ(2px)' }}
        >
          {/* Main Body */}
          <circle cx="50" cy="50" r="48" fill="url(#gold-main)" stroke="url(#gold-edge)" strokeWidth="2" />
          {/* Inner Ridge */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="#B7791F" strokeWidth="1" strokeDasharray="3 2" />
          {/* Subtle gradient overlay for reflection */}
          <circle cx="50" cy="50" r="48" fill="url(#gold-reflection)" opacity="0.4" />
          
          {/* LabX Logo Emboss */}
          <path d="M 35 30 L 65 30 L 65 70 L 35 70 Z" fill="url(#gold-emboss)" filter="drop-shadow(1px 2px 2px rgba(107,70,0,0.5))" />
          <text x="50" y="57" fontSize="38" fontFamily="system-ui, sans-serif" fontWeight="900" fill="#FFE08A" textAnchor="middle" filter="drop-shadow(0px 1px 2px rgba(107,70,0,0.8))">
            X
          </text>

          {/* Definitions */}
          <defs>
            <linearGradient id="gold-main" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE08A" />
              <stop offset="30%" stopColor="#F5C542" />
              <stop offset="70%" stopColor="#B7791F" />
              <stop offset="100%" stopColor="#6B4600" />
            </linearGradient>
            <linearGradient id="gold-edge" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B4600" />
              <stop offset="50%" stopColor="#FFE08A" />
              <stop offset="100%" stopColor="#B7791F" />
            </linearGradient>
            <linearGradient id="gold-reflection" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,224,138,0.8)" />
              <stop offset="30%" stopColor="transparent" />
              <stop offset="100%" stopColor="rgba(255,224,138,0.3)" />
            </linearGradient>
            <linearGradient id="gold-emboss" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B7791F" />
              <stop offset="100%" stopColor="#F5C542" />
            </linearGradient>
          </defs>
        </svg>

        {/* Back Face */}
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg) translateZ(2px)' }}
        >
          {/* Main Body */}
          <circle cx="50" cy="50" r="48" fill="url(#gold-main)" stroke="url(#gold-edge)" strokeWidth="2" />
          {/* Inner Ridge */}
          <circle cx="50" cy="50" r="42" fill="none" stroke="#B7791F" strokeWidth="1" strokeDasharray="3 2" />
          {/* Geometric Circuit Pattern */}
          <path d="M50 20 L50 80 M20 50 L80 50 M35 35 L65 65 M35 65 L65 35" stroke="#B7791F" strokeWidth="1" opacity="0.3" />
          
          {/* LabX Logo Emboss */}
          <path d="M 35 30 L 65 30 L 65 70 L 35 70 Z" fill="url(#gold-emboss)" filter="drop-shadow(1px 2px 2px rgba(107,70,0,0.5))" />
          <text x="50" y="57" fontSize="38" fontFamily="system-ui, sans-serif" fontWeight="900" fill="#FFE08A" textAnchor="middle" filter="drop-shadow(0px 1px 2px rgba(107,70,0,0.8))">
            X
          </text>
        </svg>
        
        {/* Edge Cylinder (CSS approximation) */}
        <div 
          className="absolute inset-0 rounded-full bg-[#B7791F]" 
          style={{ transform: 'translateZ(1px)', width: '100%', height: '100%' }}
        />
        <div 
          className="absolute inset-0 rounded-full bg-[#8A5A00]" 
          style={{ transform: 'translateZ(0px)', width: '100%', height: '100%' }}
        />
        <div 
          className="absolute inset-0 rounded-full bg-[#6B4600]" 
          style={{ transform: 'translateZ(-1px)', width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
