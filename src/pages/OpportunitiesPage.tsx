import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Target } from 'lucide-react';
import OpportunityRadar from '../components/opportunities/OpportunityRadar';
import { opportunityService } from '../services';
import type { Opportunity, OpportunityType } from '../types';
import { pageTransition, staggerContainer, staggerItem } from '../animations';

export default function OpportunitiesPage() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<OpportunityType | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    opportunityService.getOpportunities({
      search,
      type: selectedType === 'all' ? undefined : selectedType,
    }).then(res => {
      setOpportunities(res);
      setIsLoading(false);
    });
  }, [search, selectedType]);

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
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#00FF87] border border-emerald-500/30 flex items-center gap-1">
              <Target className="w-3.5 h-3.5" />
              <span>Ecosystem Radar</span>
            </span>
            <span className="text-xs text-labx-text-muted">{opportunities.length} Open Grants & Roles</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-labx-text tracking-tight uppercase">Discover What's Next</h1>
          <p className="text-labx-text-secondary text-sm sm:text-base mt-1">
            Grants, fellowships, research residencies, internships, and accelerator calls curated for builders.
          </p>
        </div>
      </div>

      <div className="labx-card p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-labx-text-muted" />
          <input
            type="text"
            placeholder="Search opportunities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-labx-surface border border-labx-border text-sm text-labx-text placeholder-labx-text-muted focus:outline-none focus:border-emerald-400"
          />
        </div>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value as OpportunityType | 'all')}
          className="px-3.5 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-emerald-400 w-full md:w-auto capitalize"
        >
          <option value="all">All Types</option>
          <option value="grant">Grants & Funding</option>
          <option value="hackathon">Hackathons</option>
          <option value="internship">Internships</option>
          <option value="job">Full-time Jobs</option>
          <option value="accelerator">Accelerators</option>
        </select>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="labx-card p-6 h-60 animate-pulse">
              <div className="h-4 bg-labx-surface rounded w-1/3 mb-4" />
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
          {opportunities.map(opp => (
            <motion.div key={opp.id} variants={staggerItem}>
              <OpportunityRadar opportunity={opp} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
