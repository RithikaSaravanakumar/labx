import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Rocket } from 'lucide-react';
import { hackathonService } from '../services';
import type { Hackathon } from '../types';
import { pageTransition } from '../animations';

export default function HackathonDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [hackathon, setHackathon] = useState<Hackathon | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (!id) return;
    hackathonService.getHackathonById(id).then(h => {
      if (h) setHackathon(h);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-labx-text-muted">Loading hackathon sprint parameters...</p>
      </div>
    );
  }

  if (!hackathon) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-labx-text mb-2">Hackathon Not Found</h2>
        <Link to="/hackathons" className="labx-button-primary px-4 py-2 rounded-xl text-xs">Return to Hackathons</Link>
      </div>
    );
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <Link to="/hackathons" className="inline-flex items-center gap-2 text-xs font-semibold text-labx-text-muted hover:text-amber-400 mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Hackathons</span>
      </Link>

      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                hackathon.status === 'live' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' :
                'bg-labx-cyan/20 text-labx-cyan border border-labx-cyan/30'
              }`}>
                {hackathon.status === 'live' ? ' Live Sprint' : hackathon.status}
              </span>
              <span className="text-xs text-labx-text-muted">Organized by {hackathon.organizer}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-labx-text">{hackathon.name}</h1>
            <p className="text-lg text-labx-text-secondary leading-relaxed">{hackathon.description}</p>
          </div>

          <div className="flex flex-col gap-3 justify-center min-w-[220px]">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-center">
              <div className="text-xs text-amber-400 uppercase font-mono font-bold">Total Prize Pool</div>
              <div className="text-2xl font-extrabold text-amber-300 font-mono mt-1">{hackathon.prize}</div>
            </div>

            {isRegistered ? (
              <div className="flex items-center justify-center gap-2 p-3 rounded-xl bg-cyan-400/20 border border-cyan-400/40 text-sky-200 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Team Registered!</span>
              </div>
            ) : (
              <button
                onClick={() => setIsRegistered(true)}
                className="labx-button-primary flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold"
              >
                <Rocket className="w-4 h-4" />
                <span>Register Team for Sprint</span>
              </button>
            )}
          </div>
        </div>

        {/* Info row */}
        <div className="mt-8 pt-6 border-t border-labx-border/60 grid sm:grid-cols-3 gap-4 text-xs text-labx-text-muted">
          <div>
            <div className="mb-1">Participation Stats</div>
            <div className="text-sm font-bold text-labx-text">{hackathon.participants} Builders Registered</div>
          </div>
          <div>
            <div className="mb-1">Schedule</div>
            <div className="text-sm font-bold text-labx-text font-mono">
              {new Date(hackathon.startDate).toLocaleDateString()} – {new Date(hackathon.endDate).toLocaleDateString()}
            </div>
          </div>
          <div>
            <div className="mb-1">Submission Deadline</div>
            <div className="text-sm font-bold text-amber-400 font-mono">
              {new Date(hackathon.deadline).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      {/* Challenges Section */}
      <div className="labx-card p-6 sm:p-8">
        <h2 className="text-xl font-bold text-labx-text mb-4">Sprint Challenge Tracks</h2>
        <div className="space-y-3">
          {hackathon.challenges.map((ch, idx) => (
            <div key={ch} className="p-4 rounded-xl bg-labx-surface border border-labx-border/60 flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-labx-cyan/20 text-labx-cyan font-mono text-xs font-bold flex items-center justify-center">
                #{idx + 1}
              </span>
              <span className="text-sm font-semibold text-labx-text">{ch}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
