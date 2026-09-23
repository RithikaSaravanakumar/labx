import { Link } from 'react-router-dom';
import { Handshake } from 'lucide-react';

interface LabXLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  linkToHome?: boolean;
  animated?: boolean;
}

const sizeConfig: Record<string, { labClass: string; xClass: string; iconSize: number }> = {
  xs: { labClass: 'text-sm font-black', xClass: 'text-base font-black', iconSize: 10 },
  sm: { labClass: 'text-base font-black', xClass: 'text-lg font-black', iconSize: 11 },
  md: { labClass: 'text-xl font-black', xClass: 'text-2xl font-black', iconSize: 13 },
  lg: { labClass: 'text-3xl font-black', xClass: 'text-4xl font-black', iconSize: 18 },
  xl: { labClass: 'text-4xl font-black', xClass: 'text-5xl font-black', iconSize: 22 },
};

export default function LabXLogo({
  size = 'md',
  className = '',
  linkToHome = false,
  animated = false,
}: LabXLogoProps) {
  const config = typeof size === 'number'
    ? { labClass: 'text-xl font-black', xClass: 'text-2xl font-black', iconSize: 13 }
    : sizeConfig[size] || sizeConfig.md;

  const content = (
    <div
      className={`inline-flex items-center gap-0.5 select-none transition-transform duration-200 ${
        animated ? 'hover:scale-105' : ''
      } ${className}`}
      aria-label="LabX Innovation Ecosystem"
    >
      {/* "Lab" Wordmark */}
      <span className={`text-labx-text tracking-tight font-black font-sans leading-none ${config.labClass}`}>
        Lab
      </span>

      {/* "X" with centered Handshake Partnership Icon */}
      <span className="relative inline-flex items-center justify-center leading-none">
        <span
          className={`font-black tracking-tight leading-none text-[#8B5CF6] font-sans ${config.xClass}`}
          style={{ textShadow: '0 0 12px rgba(139, 92, 246, 0.4)' }}
        >
          X
        </span>
        <span
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          title="Where builders collaborate"
        >
          <span className="bg-[#10131D]/90 p-0.5 rounded-full border border-[#8B5CF6]/50 shadow-sm flex items-center justify-center">
            <Handshake
              size={config.iconSize}
              className="text-[#C4B5FD]"
              strokeWidth={2.4}
            />
          </span>
        </span>
      </span>
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-labx-violet rounded-lg group"
        aria-label="LabX Home — Return to ecosystem start"
      >
        {content}
      </Link>
    );
  }

  return content;
}
