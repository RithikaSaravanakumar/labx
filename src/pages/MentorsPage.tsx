import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import ContextualMentorMatch from '../components/mentors/ContextualMentorMatch';
import { mentorService } from '../services';
import type { Mentor, Domain } from '../types';
import { DOMAIN_LABELS } from '../constants';
import { pageTransition, staggerContainer, staggerItem } from '../animations';

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mentorService.getMentors({
      search,
      domain: selectedDomain === 'all' ? undefined : selectedDomain,
    }).then(res => {
      setMentors(res);
      setIsLoading(false);
    });
  }, [search, selectedDomain]);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
              <span>AI Contextual Matching</span>
            </span>
            <span className="text-xs text-labx-text-muted">{mentors.length} Verified Mentors</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-labx-text">Ecosystem Mentors</h1>
          <p className="text-labx-text-secondary text-sm sm:text-base mt-1">
            Connect with seasoned founders, researchers, and technical leaders for office hours & guidance.
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="labx-card p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-labx-text-muted" />
          <input
            type="text"
            placeholder="Search by mentor name, skill, company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-labx-surface border border-labx-border text-sm text-labx-text placeholder-labx-text-muted focus:outline-none focus:border-labx-violet/50"
          />
        </div>

        <select
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value as Domain | 'all')}
          className="px-3.5 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50 w-full md:w-auto"
        >
          <option value="all">All Domains</option>
          {Object.entries(DOMAIN_LABELS).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="labx-card p-6 h-64 animate-pulse">
              <div className="h-12 bg-labx-surface rounded-full w-12 mb-4" />
              <div className="h-6 bg-labx-surface rounded w-2/3 mb-2" />
              <div className="h-12 bg-labx-surface rounded w-full" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {mentors.map(mentor => (
            <motion.div key={mentor.id} variants={staggerItem}>
              <ContextualMentorMatch mentor={mentor} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
