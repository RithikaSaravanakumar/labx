import { useState } from 'react';
import { motion } from 'framer-motion';

interface OrbitNode {
  id: string;
  label: string;
  description: string;
  color: string;
  path: string;
}

const nodes: OrbitNode[] = [
  { id: 'student', label: 'Student', description: 'Discover projects, find mentors, build your portfolio', color: '#3B82F6', path: '/discover' },
  { id: 'builder', label: 'Builder', description: 'Find projects, collaborate, showcase your work', color: '#7C3AED', path: '/projects' },
  { id: 'founder', label: 'Founder', description: 'Build your startup, find co-founders and mentors', color: '#A855F7', path: '/startups' },
  { id: 'mentor', label: 'Mentor', description: 'Guide builders, share expertise, grow reputation', color: '#22C55E', path: '/mentors' },
  { id: 'investor', label: 'Investor', description: 'Discover startups, track progress, find founders', color: '#F59E0B', path: '/startups' },
  { id: 'researcher', label: 'Researcher', description: 'Collaborate on research, publish findings', color: '#22D3EE', path: '/discover' },
  { id: 'startup', label: 'Startup', description: 'Showcase your product, find talent and mentors', color: '#EC4899', path: '/startups' },
  { id: 'project', label: 'Project', description: 'Open source and collaborative innovation', color: '#14B8A6', path: '/projects' },
];

export default function InnovationOrbit() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const radius = 180;
  const centerX = 250;
  const centerY = 250;

  return (
    <div className="relative w-full max-w-[500px] mx-auto aspect-square" role="img" aria-label="Innovation Orbit — LabX ecosystem visualization">
      <svg viewBox="0 0 500 500" className="w-full h-full">
        {/* Orbit rings */}
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="rgba(124, 58, 237, 0.1)" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx={centerX} cy={centerY} r={radius * 0.6} fill="none" stroke="rgba(34, 211, 238, 0.08)" strokeWidth="1" strokeDasharray="4 4" />

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
              stroke={hoveredNode === node.id ? node.color : 'rgba(124, 58, 237, 0.12)'}
              strokeWidth={hoveredNode === node.id ? 2 : 1}
              style={{ transition: 'all 0.3s ease' }}
            />
          );
        })}
      </svg>

      {/* Center node */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-labx-violet to-labx-cyan flex items-center justify-center z-10"
        animate={{ boxShadow: ['0 0 20px rgba(124,58,237,0.3)', '0 0 40px rgba(124,58,237,0.5)', '0 0 20px rgba(124,58,237,0.3)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-white font-bold text-sm tracking-wider">LABX</span>
      </motion.div>

      {/* Orbit nodes */}
      {nodes.map((node, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const isHovered = hoveredNode === node.id;

        return (
          <motion.a
            key={node.id}
            href={node.path}
            className="absolute flex flex-col items-center cursor-pointer group"
            style={{
              left: `${(x / 500) * 100}%`,
              top: `${(y / 500) * 100}%`,
              transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={() => setHoveredNode(node.id)}
            onMouseLeave={() => setHoveredNode(null)}
            whileHover={{ scale: 1.15 }}
            aria-label={`${node.label}: ${node.description}`}
          >
            <motion.div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-semibold border-2 z-10"
              style={{
                backgroundColor: `${node.color}20`,
                borderColor: isHovered ? node.color : `${node.color}40`,
                boxShadow: isHovered ? `0 0 20px ${node.color}40` : 'none',
              }}
              animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <span style={{ color: node.color }}>{node.label[0]}</span>
            </motion.div>
            <span className={`mt-1 text-[11px] font-medium transition-colors ${isHovered ? 'text-labx-text' : 'text-labx-text-muted'}`}>
              {node.label}
            </span>

            {/* Tooltip */}
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 px-3 py-2 rounded-lg bg-labx-surface border border-labx-border text-xs text-labx-text-secondary whitespace-nowrap z-20"
              >
                {node.description}
              </motion.div>
            )}
          </motion.a>
        );
      })}
    </div>
  );
}
