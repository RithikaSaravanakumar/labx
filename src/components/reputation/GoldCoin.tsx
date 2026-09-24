import { motion } from 'framer-motion';

interface GoldCoinProps {
  className?: string;
}

export default function GoldCoin({ className = "w-4 h-4" }: GoldCoinProps) {
  return (
    <motion.div 
      className={`inline-block ${className}`}
      animate={{ rotateY: 360 }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
        <circle cx="50" cy="50" r="48" fill="url(#gold-gradient)" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="50" cy="50" r="40" fill="transparent" stroke="#B8860B" strokeWidth="1" strokeDasharray="4 2" />
        <path d="M 40 30 L 60 30 L 60 70 L 40 70 Z" fill="#DAA520" />
        <text x="50" y="58" fontSize="40" fontFamily="sans-serif" fontWeight="900" fill="#FFF8DC" textAnchor="middle" filter="drop-shadow(1px 1px 1px rgba(0,0,0,0.3))">L</text>
        <defs>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDF00" />
            <stop offset="50%" stopColor="#DAA520" />
            <stop offset="100%" stopColor="#B8860B" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
}
