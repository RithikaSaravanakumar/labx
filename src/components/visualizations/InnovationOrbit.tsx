import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface OrbitNode {
  id: string;
  label: string;
  description: string;
  color: string;
  path: string;
}

const nodes: OrbitNode[] = [
  { id: 'student', label: 'Student', description: 'Discover projects, find mentors, build your portfolio', color: '#34D399', path: '/discover' },
  { id: 'builder', label: 'Builder', description: 'Find projects, collaborate, showcase your work', color: '#00FF87', path: '/projects' },
  { id: 'founder', label: 'Founder', description: 'Build your startup, find co-founders and mentors', color: '#10B981', path: '/startups' },
  { id: 'mentor', label: 'Mentor', description: 'Guide builders, share expertise, grow reputation', color: '#05DF72', path: '/mentors' },
  { id: 'investor', label: 'Investor', description: 'Discover startups, track progress, find founders', color: '#F59E0B', path: '/startups' },
  { id: 'researcher', label: 'Researcher', description: 'Collaborate on research, publish findings', color: '#2DD4BF', path: '/discover' },
  { id: 'startup', label: 'Startup', description: 'Showcase your product, find talent and mentors', color: '#10B981', path: '/startups' },
  { id: 'project', label: 'Project', description: 'Open source and collaborative innovation', color: '#6EE7B7', path: '/projects' },
];

export default function InnovationOrbit() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const radius = 180;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-square" role="region" aria-label="Innovation Orbit — Interactive ecosystem visualization">
      <svg viewBox="0 0 500 500" className="w-full h-full pointer-events-none">
        {/* Orbit rings in Green Cyber Styling */}
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(0, 255, 135, 0.16)" strokeWidth="1.5" strokeDasharray="5 5" />
        <circle cx={centerX} cy={centerY} r={radius * 0.6} fill="none" stroke="rgba(52, 211, 153, 0.12)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Connection lines */}
        {nodes.map((node, i) => {
          const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          return (
            <line
              key={`line-${node.id}`}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke={hoveredNode === node.id ? '#00FF87' : 'rgba(16, 185, 129, 0.12)'}
              strokeWidth={hoveredNode === node.id ? 2 : 1}
              style={{ transition: 'all 0.3s ease' }}
            />
          );
        })}
      </svg>

      {/* Center 3D Obsidian Core */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-22 h-22 rounded-full bg-gradient-to-br from-[#070E09] via-[#0D1911] to-[#122A1A] border-2 border-emerald-400/60 flex items-center justify-center z-10 select-none shadow-xl"
        animate={{
          boxShadow: [
            '0 0 20px rgba(0,255,135,0.3)',
            '0 0 45px rgba(0,255,135,0.6)',
            '0 0 20px rgba(0,255,135,0.3)',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-center">
          <span className="text-[#00FF87] font-black text-sm tracking-widest drop-shadow-[0_0_10px_rgba(0,255,135,0.8)]">LABX</span>
          <span className="block text-[8px] font-mono text-emerald-400/80 uppercase tracking-wider">CORE</span>
        </div>
      </motion.div>

      {/* Orbit nodes */}
      {nodes.map((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const isHovered = hoveredNode === node.id;

        return (
          <Link
            key={node.id}
            to={node.path}
            className="absolute flex flex-col items-center cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-full"
            style={{
              left: `${(x / 500) * 100}%`,
              top: `${(y / 500) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            onFocus={() => setHoveredNode(node.id)}
            onBlur={() => setHoveredNode(null)}
            aria-label={`${node.label} persona: ${node.description}`}
          >
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 z-10 transition-transform group-hover:scale-115"
              style={{
                backgroundColor: `${node.color}15`,
                borderColor: isHovered ? node.color : `${node.color}40`,
                boxShadow: isHovered ? `0 0 24px ${node.color}70` : 'none',
              }}
            >
              <span style={{ color: node.color }} className="font-black text-sm">{node.label[0]}</span>
            </motion.div>
            <span className={`mt-1.5 text-[11px] font-semibold tracking-wide transition-colors ${isHovered ? 'text-white' : 'text-emerald-300/70'}`}>
              {node.label}
            </span>

            {/* Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 px-3.5 py-1.5 rounded-xl bg-[#070E09]/95 border border-emerald-500/40 text-xs text-emerald-100 whitespace-nowrap z-20 shadow-2xl backdrop-blur-md"
              >
                {node.description}
              </motion.div>
            )}
          </Link>
        );
      })}
    </div>
  );
}
