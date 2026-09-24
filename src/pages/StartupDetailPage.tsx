import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Globe } from 'lucide-react';
import { startupService } from '../services';
import type { Startup } from '../types';
import { DOMAIN_LABELS, DOMAIN_COLORS, STAGE_LABELS } from '../constants';
import { pageTransition } from '../animations';

export default function StartupDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    startupService.getStartupById(id).then(s => {
      if (s) setStartup(s);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-labx-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-labx-text-muted">Loading startup metrics...</p>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-labx-text mb-2">Startup Not Found</h2>
        <Link to="/startups" className="labx-button-primary px-4 py-2 rounded-xl text-xs">Return to Directory</Link>
      </div>
    );
  }

  const domainColor = DOMAIN_COLORS[startup.domain] || '#22D3EE';

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <Link to="/startups" className="inline-flex items-center gap-2 text-xs font-semibold text-labx-text-muted hover:text-labx-cyan mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Directory</span>
      </Link>

      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: `${domainColor}20`, color: domainColor }}>
                {DOMAIN_LABELS[startup.domain]}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-labx-surface text-labx-text-muted uppercase">
                {STAGE_LABELS[startup.stage as keyof typeof STAGE_LABELS] || startup.stage}
              </span>
              {startup.fundingStage && (
                <span className="text-xs font-mono font-bold text-labx-cyan bg-labx-cyan/10 px-2.5 py-1 rounded-full border border-labx-cyan/20">
                  {startup.fundingStage}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-labx-text flex items-center gap-3">
              {startup.name}
              {startup.isVerified && <CheckCircle2 className="w-6 h-6 text-labx-cyan fill-labx-cyan/20" />}
            </h1>

            <p className="text-lg text-labx-text-secondary leading-relaxed">
              {startup.tagline || startup.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {startup.techStack.map(t => (
                <span key={t} className="px-3 py-1 rounded-lg text-xs font-mono bg-labx-bg border border-labx-border text-labx-text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 justify-center min-w-[200px]">
            {startup.website && (
              <a href={startup.website} target="_blank" rel="noreferrer" className="labx-button-primary flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold">
                <Globe className="w-4 h-4" />
                <span>Visit Website</span>
              </a>
            )}
          </div>
        </div>

        {/* Traction grid banner */}
        {startup.traction && startup.traction.length > 0 && (
          <div className="mt-8 pt-6 border-t border-labx-border/60 grid sm:grid-cols-3 gap-4">
            {startup.traction.map(tr => (
              <div key={tr.label} className="p-4 rounded-xl bg-labx-surface border border-labx-border/60 text-center">
                <div className="text-2xl font-extrabold text-labx-text font-mono">{tr.value}</div>
                <div className="text-xs text-labx-text-muted uppercase tracking-wider mt-1">{tr.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Problem & Solution Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="labx-card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-labx-text mb-3">The Problem</h2>
          <p className="text-sm text-labx-text-secondary leading-relaxed">{startup.problem}</p>
        </div>

        <div className="labx-card p-6 sm:p-8">
          <h2 className="text-xl font-bold text-labx-text mb-3">The Solution</h2>
          <p className="text-sm text-labx-text-secondary leading-relaxed">{startup.solution}</p>
        </div>
      </div>
    </motion.div>
  );
}
