/**
 * LabXLogo — Official Brand Component
 *
 * Uses the authentic "LabX by ZeAI" wordmark from src/assets/branding/labx-logo.png.
 * The logo PNG has a dark navy background that blends naturally into the dark UI.
 * A subtle green glow border and Framer Motion hover effect make it feel premium.
 *
 * Size tiers:
 *  xs  → 28px  (compact / footer)
 *  sm  → 36px  (mobile navbar)
 *  md  → 44px  (tablet navbar)
 *  lg  → 52px  (desktop navbar, auth pages)
 *  xl  → 68px  (hero, large contexts)
 *  2xl → 84px  (loading screen)
 */
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import officialLogo from '../../assets/branding/labx-logo.png';

interface LabXLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number;
  className?: string;
  linkToHome?: boolean;
  /** Explicit URL to link to, overrides linkToHome */
  href?: string;
  /** Page-load entry animation: opacity 0→1, y -8→0, scale 0.97→1 */
  animate?: boolean;
  /** Legacy prop kept for compatibility */
  animated?: boolean;
  /** Green glow border ring */
  showGlow?: boolean;
  /** Legacy variant prop (ignored — glow is always smart) */
  variant?: string;
}

const SIZE_MAP: Record<string, string> = {
  xs:  'h-7',  // 28px
  sm:  'h-9',  // 36px
  md:  'h-11', // 44px
  lg:  'h-14', // 56px
  xl:  'h-16', // 64px
  '2xl': 'h-20', // 80px
};

export default function LabXLogo({
  size = 'md',
  className = '',
  linkToHome = false,
  href,
  animate = false,
  animated = false,
  showGlow = true,
}: LabXLogoProps) {
  const shouldAnimate = animate || animated;

  const heightClass =
    typeof size === 'number' ? '' : (SIZE_MAP[size as string] ?? SIZE_MAP.md);

  const heightStyle: React.CSSProperties =
    typeof size === 'number' ? { height: `${size}px` } : {};

  const glowBase = '0 0 0 1px rgba(0,255,135,0.2), 0 0 18px rgba(0,255,135,0.14)';
  const glowHover = '0 0 0 1.5px rgba(0,255,135,0.5), 0 0 32px rgba(0,255,135,0.32)';

  const logoContent = (
    <motion.div
      initial={shouldAnimate ? { opacity: 0, y: -8, scale: 0.97 } : false}
      animate={shouldAnimate ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={shouldAnimate
        ? { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
        : { type: 'spring', stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.03, filter: 'brightness(1.1)' }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center select-none ${className}`}
      style={{
        borderRadius: '10px',
        boxShadow: showGlow ? glowBase : 'none',
        transition: 'box-shadow 0.28s ease',
      }}
      onMouseEnter={(e) => {
        if (showGlow) (e.currentTarget as HTMLElement).style.boxShadow = glowHover;
      }}
      onMouseLeave={(e) => {
        if (showGlow) (e.currentTarget as HTMLElement).style.boxShadow = glowBase;
      }}
    >
      <img
        src={officialLogo}
        alt="LabX by ZeAI"
        className={`w-auto max-w-none object-contain block ${heightClass}`}
        style={{ ...heightStyle, borderRadius: '10px', imageRendering: 'auto' }}
        draggable={false}
      />
    </motion.div>
  );

  if (href || linkToHome) {
    return (
      <Link
        to={href || "/"}
        className="inline-flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        aria-label="LabX by ZeAI — Go to home"
      >
        {logoContent}
      </Link>
    );
  }

  return logoContent;
}

