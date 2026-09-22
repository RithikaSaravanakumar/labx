import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Rocket, Plus } from 'lucide-react';
import StartupPulse from '../components/startups/StartupPulse';
import { startupService } from '../services';
import type { Startup, Domain } from '../types';
import { DOMAIN_LABELS } from '../constants';
import { pageTransition, staggerContainer, staggerItem } from '../animations';

export default function StartupsPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    startupService.getStartups({
      search,
      domain: selectedDomain === 'all' ? undefined : selectedDomain,
    }).then(res => {
      setStartups(res);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-labx-cyan/10 text-labx-cyan border border-labx-cyan/20 flex items-center gap-1">
              <Rocket className="w-3.5 h-3.5" />
              <span>Venture Ecosystem</span>
            </span>
            <span className="text-xs text-labx-text-muted">{startups.length} Registered Startups</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-labx-text">Startup Directory</h1>
          <p className="text-labx-text-secondary text-sm sm:text-base mt-1">
            Discover venture-backed and bootstrapped deep-tech startups spun out of LabX.
          </p>
        </div>

        <button className="labx-button-primary flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold">
          <Plus className="w-4 h-4" />
          <span>Register Startup</span>
        </button>
      </div>

      <div className="labx-card p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-labx-text-muted" />
          <input
            type="text"
            placeholder="Search startups by name, tech..."
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

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="labx-card p-6 h-64 animate-pulse">
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
          {startups.map(startup => (
            <motion.div key={startup.id} variants={staggerItem}>
              <StartupPulse startup={startup} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
