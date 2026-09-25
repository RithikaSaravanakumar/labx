import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap,
  Code2,
  Rocket,
  Compass,
  TrendingUp,
  Microscope,
  Building2,
  Layers,
  Sparkles,
  Coins,
  X,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import officialLogo from '../../assets/branding/labx-logo.png';

interface OrbitNode {
  id: string;
  orbit: 'inner' | 'middle' | 'outer';
  label: string;
  roleTitle: string;
  tagline: string;
  description: string;
  benefits: string[];
  ctaText: string;
  path: string;
  icon: LucideIcon;
  color: string;
  glowColor: string;
  radius: number;
  angle: number; // in radians
}

const ORBIT_NODES: OrbitNode[] = [
  // --- INNER ORBIT: PEOPLE (Radius: 135px) ---
  {
    id: 'student',
    orbit: 'inner',
    label: 'Student',
    roleTitle: 'Student Innovator',
    tagline: 'Learn by shipping real products alongside industry mentors',
    description: 'Transform classroom knowledge into verified proof of work. Connect with visionary teams, contribute to active projects, and earn credentials recognized by top tech leaders.',
    benefits: [
      'Access university-backed incubators and student grant bounties',
      'Direct 1-on-1 mentorship from senior tech founders',
      'Algorithmic skill-gap analysis tailored to target tech roles',
    ],
    ctaText: 'EXPLORE STUDENT PATHS',
    path: '/discover',
    icon: GraduationCap,
    color: '#38BDF8', // Sky Cyan
    glowColor: 'rgba(56, 189, 248, 0.45)',
    radius: 135,
    angle: -Math.PI / 2, // Top (12 o'clock)
  },
  {
    id: 'builder',
    orbit: 'inner',
    label: 'Builder',
    roleTitle: 'Core Builder & Engineer',
    tagline: 'Ship ambitious software and collaborate on cutting-edge stacks',
    description: 'Find verified open-source and venture projects. Pair with visionary designers and engineers, commit code, and accumulate verifiable reputation scores on the LabX graph.',
    benefits: [
      'AI-driven project recommendation engine matching your tech stack',
      'Earn LabX reputation points for merged contributions',
      'Collaborative team workspaces with live roadmap tracking',
    ],
    ctaText: 'EXPLORE BUILDERS',
    path: '/projects',
    icon: Code2,
    color: '#22D3EE', // LabX Cyber Cyan
    glowColor: 'rgba(34, 211, 238, 0.5)',
    radius: 135,
    angle: 0, // Right (3 o'clock)
  },
  {
    id: 'founder',
    orbit: 'inner',
    label: 'Founder',
    roleTitle: 'Venture Founder',
    tagline: 'From zero-to-one: assemble your founding team and launch',
    description: 'Recruit vetted co-founders, post startup milestones, and present your venture directly to curated angel syndicates and tier-one venture funds.',
    benefits: [
      'Founding team matchmaking powered by complementary skill metrics',
      'Verified startup showcase index accessible to angel syndicates',
      'Integrated roadmap milestone & milestone sprint management',
    ],
    ctaText: 'LAUNCH YOUR STARTUP',
    path: '/startups',
    icon: Rocket,
    color: '#06B6D4', // Cyan Mid
    glowColor: 'rgba(6, 182, 212, 0.5)',
    radius: 135,
    angle: Math.PI / 2, // Bottom (6 o'clock)
  },
  {
    id: 'mentor',
    orbit: 'inner',
    label: 'Mentor',
    roleTitle: 'Ecosystem Mentor & Guide',
    tagline: 'Guide the next generation of builders and share hard-earned wisdom',
    description: 'Offer tactical guidance, conduct project architecture reviews, and build influential advisory relationships with the highest-potential ventures in the ecosystem.',
    benefits: [
      'Curated mentee matching filtered by domain interest and project stage',
      'Verified advisory credentials and high-impact ecosystem recognition',
      'Exclusive access to early-stage demo days and portfolio rounds',
    ],
    ctaText: 'CONNECT WITH MENTORS',
    path: '/mentors',
    icon: Compass,
    color: '#67E8F9', // Pale Cyan
    glowColor: 'rgba(103, 232, 249, 0.45)',
    radius: 135,
    angle: Math.PI, // Left (9 o'clock)
  },

  // --- MIDDLE ORBIT: ARTIFACTS & VENTURES (Radius: 210px) ---
  {
    id: 'startup',
    orbit: 'middle',
    label: 'Startup',
    roleTitle: 'Venture Entity',
    tagline: 'High-growth teams scaling disruptive software and hardware',
    description: 'Registered startup ventures on LabX tracking traction metrics, funding stages, and hiring needs with transparent proof-of-progress.',
    benefits: [
      'Public venture profile with verified GitHub commits and milestones',
      'Talent recruitment portal for passionate engineers & designers',
      'Direct investor engagement pipeline with deal-room capabilities',
    ],
    ctaText: 'BROWSE ACTIVE STARTUPS',
    path: '/startups',
    icon: Building2,
    color: '#0EA5E9', // Electric Sky
    glowColor: 'rgba(14, 165, 233, 0.45)',
    radius: 210,
    angle: -Math.PI / 4, // Top-Right (1:30)
  },
  {
    id: 'project',
    orbit: 'middle',
    label: 'Project',
    roleTitle: 'Innovation Project',
    tagline: 'Collaborative open-source and moonshot technical initiatives',
    description: 'Community-led technical repositories seeking contributors, code reviewers, and design partners to turn innovative hypotheses into working code.',
    benefits: [
      'Open collaboration boards with transparent issue bounties',
      'Automated health metrics and architecture benchmark diagnostics',
      'Direct conversion path from open project to incorporated startup',
    ],
    ctaText: 'DISCOVER WHAT’S BEING BUILT',
    path: '/projects',
    icon: Layers,
    color: '#38BDF8', // Cyan Blue
    glowColor: 'rgba(56, 189, 248, 0.4)',
    radius: 210,
    angle: (3 * Math.PI) / 4, // Bottom-Left (7:30)
  },
  {
    id: 'researcher',
    orbit: 'middle',
    label: 'Researcher',
    roleTitle: 'Research Fellow',
    tagline: 'Pushing scientific frontiers in AI, quantum, and distributed systems',
    description: 'Bridge foundational laboratory research with real-world technical execution. Publish whitepapers, find technical co-authors, and deploy proof-of-concept models.',
    benefits: [
      'Research-to-commercialization transition pipelines',
      'Cross-institution collaboration on computational datasets',
      'Sponsored academic grants and compute resource allocation',
    ],
    ctaText: 'EXPLORE RESEARCH LABS',
    path: '/discover',
    icon: Microscope,
    color: '#22D3EE', // Cyber Cyan
    glowColor: 'rgba(34, 211, 238, 0.4)',
    radius: 210,
    angle: (5 * Math.PI) / 4, // Top-Left (10:30)
  },

  // --- OUTER ORBIT: OPPORTUNITIES & CAPITAL (Radius: 280px) ---
  {
    id: 'investor',
    orbit: 'outer',
    label: 'Investor',
    roleTitle: 'Angel & VC Partner',
    tagline: 'Source verified high-conviction dealflow before anyone else',
    description: 'Gain quantitative visibility into project velocity, team commit frequency, and community traction. Back the most relentless founders at the seed stage.',
    benefits: [
      'Real-time data feeds on ecosystem builder velocity and code growth',
      'Private syndicate syndication tools and deal sharing',
      'Pre-seed investment opportunities backed by verified proof of work',
    ],
    ctaText: 'EXPLORE INVESTOR PORTAL',
    path: '/startups',
    icon: TrendingUp,
    color: '#A855F7', // Violet
    glowColor: 'rgba(168, 85, 247, 0.4)',
    radius: 280,
    angle: Math.PI / 4, // Bottom-Right (4:30)
  },
  {
    id: 'bounties',
    orbit: 'outer',
    label: 'Bounties',
    roleTitle: 'Grants & Bounties',
    tagline: 'Earn capital and reputation for solving critical ecosystem challenges',
    description: 'Funded technical milestones posted by corporate sponsors, foundation grants, and high-growth protocols looking for specialized domain talent.',
    benefits: [
      'Escrowed bounty payouts in fiat and digital assets upon verified PR merge',
      'Proof-of-work badges issued permanently to your LabX profile',
      'Fast-track interview invitations from sponsor organizations',
    ],
    ctaText: 'EXPLORE BOUNTIES & GRANTS',
    path: '/projects',
    icon: Coins,
    color: '#06B6D4', // Deep Cyan
    glowColor: 'rgba(6, 182, 212, 0.45)',
    radius: 280,
    angle: -Math.PI / 6, // 1 o'clock
  },
  {
    id: 'opportunities',
    orbit: 'outer',
    label: 'Opportunities',
    roleTitle: 'Career & Fellowships',
    tagline: 'Access exclusive high-impact engineering and fellowship openings',
    description: 'Skip standard resumes. Get matched to forward-thinking venture teams based on real verified project contributions, skill matrices, and peer reviews.',
    benefits: [
      'Direct intros to founders without recruiting gatekeepers',
      'Transparent equity and compensation benchmarks across all stages',
      'Verified credentials instantly shareable across the web',
    ],
    ctaText: 'DISCOVER WHAT’S NEXT',
    path: '/discover',
    icon: Sparkles,
    color: '#22D3EE', // Cyber Neon Cyan
    glowColor: 'rgba(34, 211, 238, 0.5)',
    radius: 280,
    angle: (7 * Math.PI) / 6, // 8 o'clock
  },
];

export default function InnovationOrbit() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<OrbitNode | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG coordinate dimensions
  const viewBoxSize = 640;
  const center = viewBoxSize / 2;
  const coreRadius = 52; // Inner core exclusion radius

  // Accessibility: detect prefers-reduced-motion
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Keyboard accessibility: listen for Escape to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedNode) {
        setSelectedNode(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedNode]);

  // Subtle 3D mouse parallax calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredNode(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[680px] mx-auto aspect-square select-none perspective-1000"
      role="region"
      aria-label="LabX Innovation Orbit — Interactive 3D Multi-Layered Ecosystem Visualization"
    >
      {/* 3D Motion Container */}
      <motion.div
        className="relative w-full h-full preserve-3d"
        style={{
          transform: prefersReducedMotion
            ? 'none'
            : `rotateX(${mouseOffset.y * -10}deg) rotateY(${mouseOffset.x * 10}deg)`,
          transition: 'transform 0.25s ease-out',
        }}
      >
        {/* Ambient ecosystem glow in background (Obsidian Cyan Aura) */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none opacity-40 blur-3xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.22) 0%, rgba(14, 165, 233, 0.1) 45%, transparent 75%)',
          }}
        />

        {/* =========================================================================
            SVG LAYER: Curved Connection Bezier Paths & Multi-Orbital Concentric Rings
           ========================================================================= */}
        <svg
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          className="w-full h-full pointer-events-none"
        >
          <defs>
            {/* Core radial gradient (Cyber Cyan on Obsidian) */}
            <radialGradient id="orbitCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#0EA5E9" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#05060A" stopOpacity="0" />
            </radialGradient>

            {/* Glowing filter for active paths */}
            <filter id="neonPathGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Core ambient energy aura */}
          <circle cx={center} cy={center} r={coreRadius + 30} fill="url(#orbitCoreGlow)" />

          {/* --- ORBIT RING 1: INNER (PEOPLE) --- */}
          <circle
            cx={center}
            cy={center}
            r={135}
            fill="none"
            stroke="rgba(34, 211, 238, 0.26)"
            strokeWidth="1.5"
            strokeDasharray="4 6"
          />

          {/* --- ORBIT RING 2: MIDDLE (STARTUPS & PROJECTS) --- */}
          <circle
            cx={center}
            cy={center}
            r={210}
            fill="none"
            stroke="rgba(6, 182, 212, 0.2)"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />

          {/* --- ORBIT RING 3: OUTER (OPPORTUNITIES & CAPITAL) --- */}
          <circle
            cx={center}
            cy={center}
            r={280}
            fill="none"
            stroke="rgba(14, 165, 233, 0.16)"
            strokeWidth="1"
            strokeDasharray="8 10"
          />

          {/* --- CURVED CONNECTION PATHS & ANIMATED DATA FLOW PARTICLES --- */}
          {ORBIT_NODES.map((node) => {
            const isHovered = hoveredNode === node.id || selectedNode?.id === node.id;
            const targetX = center + Math.cos(node.angle) * node.radius;
            const targetY = center + Math.sin(node.angle) * node.radius;

            // Compute connection start point outside core (radius 58)
            const startX = center + Math.cos(node.angle) * 58;
            const startY = center + Math.sin(node.angle) * 58;

            // Compute quadratic bezier control point with subtle tangential curve
            const controlDist = (58 + node.radius) / 2;
            const curveOffsetAngle = node.angle + 0.18; // 10 degrees curve
            const controlX = center + Math.cos(curveOffsetAngle) * controlDist;
            const controlY = center + Math.sin(curveOffsetAngle) * controlDist;

            const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${targetX} ${targetY}`;
            const pathId = `path-${node.id}`;

            return (
              <g key={`connection-${node.id}`}>
                {/* Background path line */}
                <path
                  id={pathId}
                  d={pathD}
                  fill="none"
                  stroke={isHovered ? node.color : 'rgba(34, 211, 238, 0.1)'}
                  strokeWidth={isHovered ? 2.5 : 1}
                  strokeDasharray={isHovered ? 'none' : '3 5'}
                  filter={isHovered ? 'url(#neonPathGlow)' : undefined}
                  style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                />

                {/* Animated data particle traveling from core to node */}
                {!prefersReducedMotion && (
                  <circle
                    r={isHovered ? 3.5 : 2}
                    fill={node.color}
                    opacity={isHovered ? 1 : 0.65}
                  >
                    <animateMotion
                      dur={`${3 + (node.radius / 100)}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                    >
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* =========================================================================
            CENTER 3D LABX CORE: Multi-Layered Glass Sphere with Official Logo
           ========================================================================= */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-20 pointer-events-auto"
          style={{ width: `${coreRadius * 2}px`, height: `${coreRadius * 2}px` }}
        >
          {/* Outer rotating pulse energy ring (Cyber Cyan) */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute -inset-3 rounded-full border border-cyan-300/40 border-dashed"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* Secondary counter-rotating ring */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute -inset-1.5 rounded-full border border-cyan-400/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            />
          )}

          {/* 3D Core Sphere Container */}
          <motion.div
            className="relative w-full h-full rounded-full bg-gradient-to-br from-[#0B1528] via-[#070D1A] to-[#05060A] border-2 border-cyan-300/40 p-2 flex flex-col items-center justify-center shadow-2xl backdrop-blur-xl group cursor-pointer"
            whileHover={{ scale: 1.08, z: 20 }}
            transition={{ duration: 0.25 }}
            style={{
              boxShadow:
                '0 0 35px rgba(34, 211, 238, 0.45), inset 0 0 15px rgba(34, 211, 238, 0.25)',
              transform: prefersReducedMotion 
                ? 'none' 
                : `rotateX(${mouseOffset.y * 10}deg) rotateY(${mouseOffset.x * -10}deg)`,
            }}
            aria-label="LabX Innovation Core"
          >
            {/* Official LabX Logo badge centered in core */}
            <div className="bg-white/95 px-2 py-0.5 rounded-md shadow-md flex items-center justify-center border border-cyan-300/30">
              <img
                src={officialLogo}
                alt="LabX Core"
                className="h-6 w-auto object-contain"
              />
            </div>
            <div className="mt-1 flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22D3EE] animate-ping" />
              <span className="text-[9px] font-mono font-bold tracking-widest text-[#22D3EE] uppercase drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
                CORE
              </span>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            ORBITAL NODES: Floating 3D Dark Glass Objects with Lucide Icons
           ========================================================================= */}
        {ORBIT_NODES.map((node) => {
          const NodeIcon = node.icon;
          const isHovered = hoveredNode === node.id;
          const isSelected = selectedNode?.id === node.id;

          // Convert angle and radius to percentage coordinates for responsive positioning
          const posX = center + Math.cos(node.angle) * node.radius;
          const posY = center + Math.sin(node.angle) * node.radius;
          const leftPercent = (posX / viewBoxSize) * 100;
          const topPercent = (posY / viewBoxSize) * 100;

          return (
            <div
              key={node.id}
              className="absolute z-20"
              style={{
                left: `${leftPercent}%`,
                top: `${topPercent}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <button
                type="button"
                onClick={() => setSelectedNode(node)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onFocus={() => setHoveredNode(node.id)}
                onBlur={() => setHoveredNode(null)}
                className="flex flex-col items-center group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE] rounded-2xl p-1"
                style={{
                  transform: prefersReducedMotion 
                    ? 'none' 
                    : `rotateX(${mouseOffset.y * 10}deg) rotateY(${mouseOffset.x * -10}deg)`,
                  transition: 'transform 0.25s ease-out'
                }}
                aria-haspopup="dialog"
                aria-expanded={isSelected}
                aria-label={`${node.label} persona: ${node.roleTitle}. Click to explore details.`}
              >
                {/* Floating 3D Dark Glass Node with Subtle Lighting */}
                <motion.div
                  className="relative w-12 h-12 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center border transition-all duration-300 backdrop-blur-md"
                  style={{
                    backgroundColor: isHovered || isSelected ? 'rgba(13, 20, 36, 0.95)' : 'rgba(8, 12, 22, 0.88)',
                    borderColor: isHovered || isSelected ? node.color : 'rgba(34, 211, 238, 0.2)',
                    boxShadow:
                      isHovered || isSelected
                        ? `0 0 25px ${node.glowColor}, inset 0 0 10px ${node.glowColor}`
                        : '0 8px 24px rgba(0, 0, 0, 0.65)',
                  }}
                  whileHover={{ scale: 1.15, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NodeIcon
                    size={22}
                    className="transition-colors duration-300"
                    style={{ color: node.color }}
                  />

                  {/* Corner indicator badge for active orbit tier */}
                  <span
                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-black"
                    style={{ backgroundColor: node.color }}
                  />
                </motion.div>

                {/* Node Label Below */}
                <span
                  className={`mt-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 ${
                    isHovered || isSelected ? 'text-[#22D3EE]' : 'text-zinc-400 group-hover:text-sky-200'
                  }`}
                >
                  {node.label}
                </span>
              </button>
            </div>
          );
        })}
      </motion.div>

      {/* =========================================================================
          CONTEXTUAL ROLE CARD MODAL: Active selection breakdown with direct CTA
         ========================================================================= */}
      <AnimatePresence>
        {selectedNode && (
          <>
            {/* Modal backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm z-30 rounded-3xl"
              aria-hidden="true"
            />

            {/* Modal Card with Cyan & Dark Halo Styling */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute inset-x-4 top-1/2 -translate-y-1/2 sm:inset-x-12 z-40 bg-[#080A12]/98 border border-cyan-400/35 rounded-2xl p-6 sm:p-7 shadow-[0_0_50px_rgba(34,211,238,0.2)] backdrop-blur-xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="orbit-modal-title"
            >
              {/* Header: Icon, Titles & Dismiss Button */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border"
                    style={{
                      backgroundColor: `${selectedNode.color}18`,
                      borderColor: selectedNode.color,
                      boxShadow: `0 0 20px ${selectedNode.glowColor}`,
                    }}
                  >
                    <selectedNode.icon size={24} style={{ color: selectedNode.color }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-wider text-cyan-300/80">
                        {selectedNode.orbit.toUpperCase()} ORBIT
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-sky-200 font-medium">
                        {selectedNode.label}
                      </span>
                    </div>
                    <h3 id="orbit-modal-title" className="text-lg sm:text-xl font-bold text-white mt-0.5">
                      {selectedNode.roleTitle}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-cyan-400/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                  aria-label="Close dialog (Escape)"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tagline & Description */}
              <p className="mt-3.5 text-sm font-semibold text-[#22D3EE]">
                {selectedNode.tagline}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {selectedNode.description}
              </p>

              {/* Key Benefits List */}
              <div className="mt-4 pt-3.5 border-t border-cyan-400/20">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Zap size={14} className="text-[#22D3EE]" />
                  Key Ecosystem Advantages
                </h4>
                <ul className="space-y-1.5">
                  {selectedNode.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                      <ShieldCheck size={14} className="text-[#22D3EE] mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer CTA Button */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-cyan-400/20">
                <span className="text-[11px] text-zinc-400 font-mono">
                  Press ESC to dismiss
                </span>
                <Link
                  to={selectedNode.path}
                  onClick={() => setSelectedNode(null)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs tracking-wider uppercase text-black bg-gradient-to-r from-[#22D3EE] via-[#0EA5E9] to-[#7C3AED] hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-cyan-400/30 hover:shadow-cyan-400/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22D3EE]"
                >
                  <span>{selectedNode.ctaText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
