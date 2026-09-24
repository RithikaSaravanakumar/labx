import { useState, useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HolographicCube3DProps {
  size?: number;
  className?: string;
}

export default function HolographicCube3D({ size = 320, className = '' }: HolographicCube3DProps) {
  const [rotate, setRotate] = useState({ x: -15, y: 35 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Auto rotation when not hovered
  useEffect(() => {
    if (isHovered || shouldReduceMotion) return;
    let animationFrameId: number;
    let angle = 35;
    const animate = () => {
      angle += 0.2;
      setRotate({ x: -15, y: angle });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered, shouldReduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -y * 0.15 - 15,
      y: x * 0.15 + 35,
    });
  };

  const half = size / 3.8;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: -15, y: 35 });
      }}
      className={`relative flex items-center justify-center select-none perspective-1000 ${className}`}
      style={{ width: size, height: size }}
      aria-label="3D Holographic Innovation Engine"
    >
      {/* 3D Scene Root */}
      <motion.div
        className="relative w-full h-full flex items-center justify-center preserve-3d"
        animate={{
          rotateX: rotate.x,
          rotateY: rotate.y,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 0.8 }}
      >
        {/* Outer 3D Gyro Ring (Cyan) */}
        <div
          className="absolute rounded-full border border-[#22D3EE]/30 shadow-[0_0_30px_rgba(34,211,238,0.2)] preserve-3d animate-spin-slow pointer-events-none"
          style={{
            width: size * 0.95,
            height: size * 0.95,
            transform: 'rotateX(75deg) rotateY(20deg)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#22D3EE] shadow-[0_0_15px_#22D3EE]" />
        </div>

        {/* Secondary 3D Orbit Ring (Violet) */}
        <div
          className="absolute rounded-full border border-[#7C3AED]/30 shadow-[0_0_20px_rgba(124,58,237,0.2)] preserve-3d pointer-events-none"
          style={{
            width: size * 0.82,
            height: size * 0.82,
            animation: 'spin 15s linear infinite reverse',
            transform: 'rotateX(35deg) rotateY(55deg)',
          }}
        >
          <div className="absolute bottom-1/4 right-0 translate-x-1/2 w-2 h-2 rounded-full bg-[#A855F7] shadow-[0_0_12px_#A855F7]" />
        </div>

        {/* Central Isometric 3D Glass Cube */}
        <div
          className="relative preserve-3d transition-transform duration-500"
          style={{ width: half * 2, height: half * 2, transform: isHovered ? 'scale3d(1.1, 1.1, 1.1)' : 'scale3d(1, 1, 1)' }}
        >
          {/* Front Face - LabX Logo */}
          <div
            className="absolute inset-0 bg-[#05060A]/60 backdrop-blur-md border border-[#22D3EE]/40 rounded-xl flex items-center justify-center shadow-[inset_0_0_30px_rgba(34,211,238,0.15)] group overflow-hidden"
            style={{ transform: `translateZ(${half}px)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#22D3EE]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="text-4xl font-black italic tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-[#22D3EE] via-[#0EA5E9] to-[#7C3AED] drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">
              X
            </span>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 bg-[#05060A]/60 backdrop-blur-md border border-[#7C3AED]/40 rounded-xl flex items-center justify-center shadow-[inset_0_0_30px_rgba(124,58,237,0.15)]"
            style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
          >
            <span className="text-xl font-black text-white tracking-widest drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">LABX</span>
          </div>

          {/* Right Face - Telemetry */}
          <div
            className="absolute inset-0 bg-[#05060A]/60 backdrop-blur-md border border-[#22D3EE]/20 rounded-xl flex flex-col items-center justify-center gap-2"
            style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
          >
            <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Reputation</div>
            <div className="text-xs font-black text-[#22D3EE]">POW // 99</div>
          </div>

          {/* Left Face - Telemetry */}
          <div
            className="absolute inset-0 bg-[#05060A]/60 backdrop-blur-md border border-[#7C3AED]/20 rounded-xl flex flex-col items-center justify-center gap-2"
            style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
          >
            <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest">Network</div>
            <div className="text-xs font-black text-[#A855F7]">SYNCED</div>
          </div>

          {/* Top Face */}
          <div
            className="absolute inset-0 bg-[#05060A]/80 backdrop-blur-md border border-[#22D3EE]/30 rounded-xl flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.2)]"
            style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
          >
            <div className="w-8 h-8 rounded-full border border-[#22D3EE]/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#22D3EE] animate-ping" />
            </div>
          </div>

          {/* Bottom Face */}
          <div
            className="absolute inset-0 bg-[#05060A]/90 border border-[#7C3AED]/30 rounded-xl shadow-[0_0_40px_rgba(124,58,237,0.2)]"
            style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#7C3AED]/20 to-transparent rounded-xl" />
          </div>
        </div>

        {/* Luminous Pulsing Core Glow */}
        <div
          className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#22D3EE]/30 to-[#7C3AED]/30 blur-2xl pointer-events-none animate-pulse"
          style={{ transform: 'translateZ(0px)' }}
        />

        {/* Floating 3D Telemetry Badges in Spatial Depth */}
        <div
          className="absolute -top-10 -right-10 px-4 py-1.5 rounded-full bg-[#05060A]/90 border border-[#22D3EE]/40 text-[10px] font-mono font-bold text-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-2 pointer-events-none backdrop-blur-md"
          style={{ transform: 'translateZ(60px)' }}
        >
          <span className="w-2 h-2 rounded-full bg-[#22D3EE] animate-pulse" />
          <span>LABX_CORE_ACTIVE</span>
        </div>

        <div
          className="absolute -bottom-10 -left-10 px-4 py-1.5 rounded-full bg-[#05060A]/90 border border-[#7C3AED]/40 text-[10px] font-mono text-[#A855F7] shadow-[0_0_20px_rgba(124,58,237,0.25)] flex items-center gap-2 pointer-events-none backdrop-blur-md"
          style={{ transform: 'translateZ(50px)' }}
        >
          <svg className="w-3 h-3 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>INNOVATION_SYNC</span>
        </div>
      </motion.div>
    </div>
  );
}
