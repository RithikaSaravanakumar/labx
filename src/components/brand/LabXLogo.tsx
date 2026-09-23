import { Link } from 'react-router-dom';
import officialLogo from '../../assets/logo.png';

interface LabXLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  imgClassName?: string;
  linkToHome?: boolean;
  animated?: boolean;
}

const heightMap: Record<string, number> = {
  xs: 22,
  sm: 28,
  md: 36,
  lg: 48,
  xl: 60,
};

export default function LabXLogo({
  size = 'md',
  className = '',
  imgClassName = '',
  linkToHome = false,
  animated = false,
}: LabXLogoProps) {
  const heightPx = typeof size === 'number' ? size : heightMap[size] || 36;

  const content = (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={officialLogo}
        alt="LabX — Official Logo"
        style={{ height: `${heightPx}px`, width: 'auto' }}
        className={`object-contain transition-all duration-300 ${
          animated ? 'hover:scale-105 hover:brightness-110' : ''
        } ${imgClassName}`}
      />
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
