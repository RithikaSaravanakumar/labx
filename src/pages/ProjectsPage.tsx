import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus } from 'lucide-react';
import ProjectPulseCard from '../components/projects/ProjectPulseCard';
import { projectService } from '../services';
import type { Project, Domain, Stage } from '../types';
import { DOMAIN_LABELS, STAGE_LABELS } from '../constants';
import { pageTransition, staggerContainer, staggerItem } from '../animations';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<Domain | 'all'>('all');
  const [selectedStage, setSelectedStage] = useState<Stage | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    projectService.getProjects({
      search,
      domain: selectedDomain === 'all' ? undefined : selectedDomain,
      stage: selectedStage === 'all' ? undefined : selectedStage,
    }).then(res => {
      setProjects(res);
      setIsLoading(false);
    });
  }, [search, selectedDomain, selectedStage]);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-[#00FF87] border border-emerald-500/30">
              Proof-of-Work Ecosystem
            </span>
            <span className="text-xs text-labx-text-muted">{projects.length} Active Projects</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-labx-text tracking-tight uppercase">What's Being Built</h1>
          <p className="text-labx-text-secondary text-sm sm:text-base mt-1">
            Discover, track, and collaborate on real-world projects built by developers and founders.
          </p>
        </div>
        <a
          href="/build"
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider text-black bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#34D399] hover:brightness-110 shadow-lg shadow-emerald-500/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Turn Idea Into Reality</span>
        </a>
      </div>

      {/* Filter bar */}
      <div className="labx-card p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-labx-text-muted" />
          <input
            type="text"
            placeholder="Search by name, tech stack, domain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-labx-surface border border-labx-border text-sm text-labx-text placeholder-labx-text-muted focus:outline-none focus:border-emerald-400"
          />
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Domain dropdown */}
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value as Domain | 'all')}
            className="px-3.5 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-emerald-400"
          >
            <option value="all">All Domains</option>
            {Object.entries(DOMAIN_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>

          {/* Stage dropdown */}
          <select
            value={selectedStage}
            onChange={(e) => setSelectedStage(e.target.value as Stage | 'all')}
            className="px-3.5 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-emerald-400"
          >
            <option value="all">All Stages</option>
            {Object.entries(STAGE_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="labx-card p-6 h-64 animate-pulse">
              <div className="h-4 bg-labx-surface rounded w-1/3 mb-4" />
              <div className="h-6 bg-labx-surface rounded w-3/4 mb-3" />
              <div className="h-12 bg-labx-surface rounded w-full mb-4" />
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 labx-card p-8">
          <Filter className="w-12 h-12 text-labx-text-muted mx-auto mb-4" />
          <h3 className="text-lg font-bold text-labx-text mb-2">No projects found</h3>
          <p className="text-sm text-labx-text-muted mb-6">Try adjusting your filters or search terms.</p>
          <button onClick={() => { setSearch(''); setSelectedDomain('all'); setSelectedStage('all'); }} className="labx-button-secondary text-xs px-4 py-2 rounded-lg">
            Reset Filters
          </button>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map(project => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectPulseCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
