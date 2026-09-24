import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface HolographicCube3DProps {
  size?: number;
  className?: string;
}

export default function HolographicCube3D({ size = 320, className = '' }: HolographicCube3DProps) {
  const [rotate, setRotate] = useState({ x: -15, y: 25 });
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotate({
      x: -y * 0.12 - 15,
      y: x * 0.12 + 25,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: -15, y: 25 });
  };

  const half = size / 3.8;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
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
        transition={{ type: 'spring', stiffness: 120, damping: 18, mass: 0.8 }}
      >
        {/* Outer 3D Gyro Ring (Z-Axis Orbital) */}
        <div
          className="absolute rounded-full border-2 border-cyan-400/35 shadow-[0_0_25px_rgba(0,255,135,0.25)] preserve-3d animate-spin-slow pointer-events-none"
          style={{
            width: size * 0.9,
            height: size * 0.9,
            transform: 'rotateX(70deg) rotateY(15deg)',
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#22D3EE] shadow-[0_0_12px_#22D3EE]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-teal-400" />
        </div>

        {/* Secondary 3D Orbit Ring (X-Axis) */}
        <div
          className="absolute rounded-full border border-cyan-300/25 shadow-[0_0_20px_rgba(16,185,129,0.15)] preserve-3d pointer-events-none"
          style={{
            width: size * 0.78,
            height: size * 0.78,
            transform: 'rotateX(25deg) rotateY(65deg)',
          }}
        >
          <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-200 shadow-[0_0_10px_#22D3EE]" />
        </div>

        {/* Central Isometric 3D Obsidian Cube */}
        <div
          className="relative preserve-3d"
          style={{ width: half * 2, height: half * 2 }}
        >
          {/* Front Face */}
          <div
            className="absolute inset-0 bg-[#070E09]/85 backdrop-blur-md border border-cyan-400/40 rounded-xl flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,255,135,0.18)]"
            style={{ transform: `translateZ(${half}px)` }}
          >
            <div className="w-8 h-8 rounded-lg border border-cyan-300/35 flex items-center justify-center">
              <span className="text-[10px] font-mono font-black text-[#22D3EE]">01</span>
            </div>
          </div>

          {/* Back Face */}
          <div
            className="absolute inset-0 bg-[#070E09]/85 backdrop-blur-md border border-cyan-400/30 rounded-xl flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,255,135,0.1)]"
            style={{ transform: `rotateY(180deg) translateZ(${half}px)` }}
          >
            <span className="text-[10px] font-mono text-cyan-300 font-bold">LABX</span>
          </div>

          {/* Right Face */}
          <div
            className="absolute inset-0 bg-[#0A160E]/85 backdrop-blur-md border border-teal-500/35 rounded-xl flex items-center justify-center"
            style={{ transform: `rotateY(90deg) translateZ(${half}px)` }}
          >
            <span className="text-[9px] font-mono text-[#22D3EE] uppercase tracking-wider">Proof</span>
          </div>

          {/* Left Face */}
          <div
            className="absolute inset-0 bg-[#0A160E]/85 backdrop-blur-md border border-cyan-400/35 rounded-xl flex items-center justify-center"
            style={{ transform: `rotateY(-90deg) translateZ(${half}px)` }}
          >
            <span className="text-[9px] font-mono text-sky-200 uppercase tracking-wider">Scale</span>
          </div>

          {/* Top Face */}
          <div
            className="absolute inset-0 bg-[#0D2214]/90 backdrop-blur-md border border-cyan-300/50 rounded-xl flex items-center justify-center shadow-[0_0_25px_rgba(0,255,135,0.25)]"
            style={{ transform: `rotateX(90deg) translateZ(${half}px)` }}
          >
            <div className="w-3 h-3 rounded-full bg-[#22D3EE] animate-ping" />
          </div>

          {/* Bottom Face */}
          <div
            className="absolute inset-0 bg-[#040805]/95 border border-cyan-400/20 rounded-xl"
            style={{ transform: `rotateX(-90deg) translateZ(${half}px)` }}
          />
        </div>

        {/* Luminous Pulsing Emerald Core Glow */}
        <div
          className="absolute w-20 h-20 rounded-full bg-cyan-400/30 blur-xl pointer-events-none animate-pulse-glow"
          style={{ transform: 'translateZ(0px)' }}
        />

        {/* Floating 3D Telemetry Badges in Spatial Depth */}
        <div
          className="absolute -top-6 -right-6 px-3 py-1 rounded-full bg-[#070E09]/95 border border-cyan-400/40 text-[10px] font-mono font-bold text-[#22D3EE] shadow-[0_0_15px_rgba(0,255,135,0.3)] flex items-center gap-1.5 pointer-events-none"
          style={{ transform: 'translateZ(40px)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-pulse" />
          <span>SYS::ACTIVE</span>
        </div>

        <div
          className="absolute -bottom-6 -left-6 px-3 py-1 rounded-full bg-[#070E09]/95 border border-cyan-400/30 text-[10px] font-mono text-sky-200 shadow-md flex items-center gap-1.5 pointer-events-none"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className="text-[#22D3EE]"></span>
          <span>POW_ENGINE</span>
        </div>
      </motion.div>
    </div>
  );
}
