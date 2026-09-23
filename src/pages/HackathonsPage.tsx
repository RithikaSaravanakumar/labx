import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Calendar, Users, ArrowRight } from 'lucide-react';
import { hackathonService } from '../services';
import type { Hackathon } from '../types';
import { pageTransition, staggerContainer, staggerItem } from '../animations';

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    hackathonService.getHackathons().then(res => {
      setHackathons(res);
      setIsLoading(false);
    });
  }, []);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 fill-amber-400" />
              <span>Sprint Sprints & Competitions</span>
            </span>
            <span className="text-xs text-labx-text-muted">{hackathons.length} Live & Upcoming</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-labx-text">Innovation Hackathons</h1>
          <p className="text-labx-text-secondary text-sm sm:text-base mt-1">
            Build rapid prototypes in 48-hour challenge sprints. Win cash bounties and accelerator spots.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="labx-card p-6 h-64 animate-pulse">
              <div className="h-6 bg-labx-surface rounded w-1/3 mb-4" />
              <div className="h-8 bg-labx-surface rounded w-2/3 mb-2" />
              <div className="h-16 bg-labx-surface rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {hackathons.map(hackathon => (
            <motion.div key={hackathon.id} variants={staggerItem}>
              <Link to={`/hackathons/${hackathon.id}`} className="labx-card p-6 block h-full group relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                    hackathon.status === 'live' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse' :
                    hackathon.status === 'upcoming' ? 'bg-labx-violet/20 text-labx-violet border border-labx-violet/30' :
                    'bg-labx-surface text-labx-text-muted'
                  }`}>
                    {hackathon.status === 'live' ? '🔴 Live Sprint' : hackathon.status}
                  </span>
                  <span className="text-sm font-extrabold text-amber-400 font-mono">🏆 {hackathon.prize}</span>
                </div>

                <h3 className="text-xl font-bold text-labx-text group-hover:text-labx-violet transition-colors mb-2 flex items-center justify-between">
                  <span>{hackathon.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-labx-violet" />
                </h3>
                <p className="text-xs font-semibold text-labx-text-muted mb-3">Organized by {hackathon.organizer}</p>
                <p className="text-sm text-labx-text-secondary mb-6 line-clamp-2 leading-relaxed">{hackathon.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-labx-border/60 text-xs text-labx-text-muted">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      <span>{hackathon.participants} registered</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Starts {new Date(hackathon.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
