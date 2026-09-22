import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import type { Startup } from '../../types';
import { DOMAIN_LABELS, DOMAIN_COLORS, STAGE_LABELS } from '../../constants';

interface StartupPulseProps {
  startup: Startup;
}

export default function StartupPulse({ startup }: StartupPulseProps) {
  const domainColor = DOMAIN_COLORS[startup.domain] || '#06B6D4';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="labx-card p-6 flex flex-col justify-between h-full group relative overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
              style={{ backgroundColor: `${domainColor}20`, color: domainColor }}
            >
              {DOMAIN_LABELS[startup.domain]}
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-labx-surface text-labx-text-muted uppercase">
              {STAGE_LABELS[startup.stage as keyof typeof STAGE_LABELS] || startup.stage}
            </span>
          </div>
          {startup.fundingStage && (
            <span className="text-[10px] font-mono font-bold text-labx-cyan bg-labx-cyan/10 px-2 py-0.5 rounded-full border border-labx-cyan/20">
              {startup.fundingStage}
            </span>
          )}
        </div>

        <Link to={`/startups/${startup.id}`}>
          <h3 className="text-xl font-bold text-labx-text group-hover:text-labx-cyan transition-colors mb-1.5 flex items-center gap-2">
            {startup.name}
            {startup.isVerified && <CheckCircle2 className="w-4 h-4 text-labx-cyan fill-labx-cyan/20" />}
            <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-labx-cyan" />
          </h3>
        </Link>
        <p className="text-sm text-labx-text-secondary line-clamp-2 mb-4 leading-relaxed">
          {startup.tagline || startup.description}
        </p>

        {/* Founder Row */}
        <div className="flex items-center gap-2.5 mb-4 p-2 rounded-xl bg-labx-surface/60 border border-labx-border/40">
          <img src={startup.founderAvatar} alt={startup.founderName} className="w-6 h-6 rounded-full object-cover" />
          <div className="text-xs text-labx-text-muted">
            Founded by <span className="font-semibold text-labx-text">{startup.founderName}</span>
          </div>
        </div>

        {/* Traction Grid */}
        {startup.traction && startup.traction.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {startup.traction.slice(0, 2).map(t => (
              <div key={t.label} className="p-2.5 rounded-xl bg-labx-bg border border-labx-border/50 text-center">
                <div className="text-sm font-extrabold text-labx-text font-mono">{t.value}</div>
                <div className="text-[10px] text-labx-text-muted uppercase tracking-wider">{t.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-labx-border/60 text-xs text-labx-text-muted">
        <span>📍 {startup.location}</span>
        <div className="flex gap-1">
          {startup.techStack.slice(0, 3).map(tech => (
            <span key={tech} className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-labx-bg border border-labx-border/40">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
