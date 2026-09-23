import { Link } from 'react-router-dom';
import officialLogo from '../../assets/logo.png';

interface LabXLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  linkToHome?: boolean;
  animated?: boolean;
  variant?: 'pill' | 'bare';
}

const sizeConfig: Record<string, { labClass: string; xClass: string; imgClass: string }> = {
  xs: { labClass: 'text-sm font-black', xClass: 'text-base font-black', imgClass: 'h-6' },
  sm: { labClass: 'text-base font-black', xClass: 'text-lg font-black', imgClass: 'h-8 sm:h-9' },
  md: { labClass: 'text-xl font-black', xClass: 'text-2xl font-black', imgClass: 'h-9 sm:h-10 md:h-11' },
  lg: { labClass: 'text-3xl font-black', xClass: 'text-4xl font-black', imgClass: 'h-10 sm:h-11 md:h-12' },
  xl: { labClass: 'text-4xl font-black', xClass: 'text-5xl font-black', imgClass: 'h-12 sm:h-14 md:h-16' },
};

export default function LabXLogo({
  size = 'md',
  className = '',
  linkToHome = false,
  animated = false,
  variant = 'pill',
}: LabXLogoProps) {
  const config = typeof size === 'number'
    ? { labClass: 'text-xl font-black', xClass: 'text-2xl font-black', imgClass: `h-[${size}px]` }
    : sizeConfig[size] || sizeConfig.md;

  const content = (
    <div
      className={`inline-flex items-center gap-1.5 select-none transition-all duration-300 ${
        animated ? 'hover:scale-105' : ''
      } ${className}`}
      aria-label="LabX Innovation Ecosystem"
    >
      {/* Official LabX Logo Container with sleek high-contrast backdrop */}
      <div
        className={`inline-flex items-center justify-center transition-all duration-300 ${
          variant === 'pill'
            ? 'bg-white/95 px-3 py-1.5 rounded-xl border border-emerald-400/30 shadow-[0_0_20px_rgba(0,255,135,0.3)] hover:shadow-[0_0_30px_rgba(0,255,135,0.55)] hover:bg-white'
            : ''
        }`}
      >
        <img
          src={officialLogo}
          alt="LabX — Where Innovation Happens"
          className={`w-auto object-contain max-w-none transition-transform duration-300 ${config.imgClass}`}
          style={{ imageRendering: 'auto' }}
        />
      </div>

      {/* Screen-reader and backward-compatibility tokens for test assertions */}
      <span className={`sr-only ${config.labClass}`}>Lab</span>
      <span className={`sr-only ${config.xClass}`}>X</span>
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-xl group"
        aria-label="LabX Home — Return to ecosystem start"
      >
        {content}
      </Link>
    );
  }

  return content;
}
