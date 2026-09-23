import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, XCircle, ArrowUpRight } from 'lucide-react';
import type { ApplicationItem } from '../types';

const INITIAL_APPLICATIONS: ApplicationItem[] = [
  {
    id: 'app-1',
    type: 'project',
    targetId: 'p1',
    title: 'MediVision AI — Frontend Lead & Architecture',
    status: 'accepted',
    appliedDate: '2026-03-12',
    organization: 'MediVision Health Labs',
    feedback: 'Accepted! Welcome to the core building squad. Check Discord #frontend.',
  },
  {
    id: 'app-2',
    type: 'grant',
    targetId: 'opp-2',
    title: 'ZeAI Pioneer Innovation Grant — Stage 1',
    status: 'reviewing',
    appliedDate: '2026-03-18',
    organization: 'ZeAI Foundation',
    feedback: 'Pitch deck under evaluation by technical investment committee.',
  },
  {
    id: 'app-3',
    type: 'mentorship',
    targetId: 'm1',
    title: 'Bi-Weekly Architecture Sync with Dr. Sarah Chen',
    status: 'accepted',
    appliedDate: '2026-03-05',
    organization: 'AI Mentorship Network',
    feedback: 'Approved for 4 bi-weekly technical pairing sessions.',
  },
  {
    id: 'app-4',
    type: 'hackathon',
    targetId: 'h1',
    title: 'Global Climate Innovation Hackathon — Team EcoAI',
    status: 'accepted',
    appliedDate: '2026-02-28',
    organization: 'GreenTech Global',
  },
];

export default function MyApplicationsPage() {
  const [applications] = useState<ApplicationItem[]>(INITIAL_APPLICATIONS);

  const getStatusBadge = (status: ApplicationItem['status']) => {
    switch (status) {
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-labx-success bg-green-500/10 border border-green-500/20 px-2.5 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" /> Accepted
          </span>
        );
      case 'reviewing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-labx-warning bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
            <Clock className="w-3 h-3" /> Under Review
          </span>
        );
      case 'declined':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-400 bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 rounded-full">
            <XCircle className="w-3 h-3" /> Declined
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-labx-text-muted bg-labx-surface px-2.5 py-0.5 rounded-full">
            Pending
          </span>
        );
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-labx-border/80 pb-6">
        <span className="text-xs font-bold text-labx-cyan uppercase tracking-wider">
          Track Progress
        </span>
        <h1 className="text-3xl font-black text-labx-text tracking-tight mt-1">
          My <span className="labx-gradient-text">Applications</span>
        </h1>
        <p className="text-xs sm:text-sm text-labx-text-secondary mt-1">
          Review your project collaboration requests, mentorship applications, and grant submissions.
        </p>
      </div>

      {/* List */}
      <div className="space-y-4">
        {applications.map(app => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-labx-surface border border-labx-border hover:border-labx-violet/30 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div className="space-y-1.5 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-labx-bg border border-labx-border text-labx-text-muted">
                  {app.type}
                </span>
                <span className="text-xs text-labx-text-muted">Applied on {app.appliedDate}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-labx-text truncate">
                {app.title}
              </h2>
              {app.feedback && (
                <p className="text-xs text-labx-text-secondary bg-labx-bg/60 p-2 rounded-lg border border-labx-border/40 inline-block">
                  {app.feedback}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              {getStatusBadge(app.status)}
              <Link
                to={app.type === 'project' ? `/projects/${app.targetId}` : `/opportunities`}
                className="p-2 rounded-xl bg-labx-bg border border-labx-border text-labx-text-secondary hover:text-labx-text hover:border-labx-violet transition-colors"
                aria-label="View application target"
              >
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
