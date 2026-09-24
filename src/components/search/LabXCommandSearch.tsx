import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  Folder,
  Rocket,
  Award,
  CornerDownLeft,
  Sparkles,
  Compass,
  UserCheck,
  LayoutDashboard,
  PlusCircle,
} from 'lucide-react';
import { mockProjects, mockStartups, mockMentors } from '../../data/mockData';

interface LabXCommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRAND_SHORTCUTS = [
  {
    label: "WHAT'S BEING BUILT",
    description: "Browse 1,200+ active student, researcher & builder projects",
    path: '/projects',
    icon: Folder,
  },
  {
    label: 'TURN YOUR IDEA INTO REALITY',
    description: 'Submit your project, assemble a team & log proof of work',
    path: '/projects/new',
    icon: PlusCircle,
  },
  {
    label: "LEARN FROM THOSE WHO'VE BUILT BEFORE",
    description: 'Connect with seasoned technical mentors & startup founders',
    path: '/mentors',
    icon: Award,
  },
  {
    label: 'DISCOVER WHAT’S NEXT',
    description: 'Explore hackathons, micro-grants, capital & research roles',
    path: '/opportunities',
    icon: Sparkles,
  },
  {
    label: 'YOUR PROOF OF WORK',
    description: 'View your decentralized reputation, skills & verified badges',
    path: '/profile',
    icon: UserCheck,
  },
  {
    label: 'YOUR INNOVATION HUB',
    description: 'Live mission control for your projects, requests & metrics',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
];

export default function LabXCommandSearch({ isOpen, onClose }: LabXCommandSearchProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = query
    ? mockProjects.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.domain.includes(query.toLowerCase()))
    : mockProjects.slice(0, 3);

  const filteredStartups = query
    ? mockStartups.filter(s => s.name.toLowerCase().includes(query.toLowerCase()))
    : mockStartups.slice(0, 2);

  const filteredMentors = query
    ? mockMentors.filter(m => m.name.toLowerCase().includes(query.toLowerCase()) || m.expertise.some(e => e.toLowerCase().includes(query.toLowerCase())))
    : mockMentors.slice(0, 2);

  const filteredShortcuts = query
    ? BRAND_SHORTCUTS.filter(s => s.label.toLowerCase().includes(query.toLowerCase()) || s.description.toLowerCase().includes(query.toLowerCase()))
    : BRAND_SHORTCUTS;

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-2xl bg-[#070D09] border border-labx-green/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,135,0.15)] overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Command Center"
        >
          {/* Search bar */}
          <div className="flex items-center px-4 sm:px-5 py-4 border-b border-labx-border/80 gap-3 bg-[#0B140E]/80">
            <Search className="w-5 h-5 text-labx-green shrink-0 animate-pulse" />
            <input
              type="text"
              autoFocus
              placeholder="Search projects, startups, mentors, or type a command..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-labx-text placeholder-labx-text-muted text-sm sm:text-base focus:outline-none"
              role="combobox"
              aria-expanded="true"
              aria-controls="search-results"
              aria-autocomplete="list"
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-labx-surface text-labx-green/80 border border-labx-border">ESC</span>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-labx-surface text-labx-text-muted hover:text-labx-text transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results container */}
          <div id="search-results" role="listbox" className="max-h-[65vh] overflow-y-auto p-4 sm:p-5 space-y-6">
            {/* Quick Ecosystem Brand Actions */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-labx-green uppercase tracking-wider mb-2.5 px-2">
                <Compass className="w-3.5 h-3.5 text-labx-green" />
                <span>Ecosystem Quick Jump</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                {filteredShortcuts.slice(0, 4).map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.path}
                      onClick={() => handleSelect(s.path)}
                      className="p-3 rounded-xl bg-labx-surface/50 border border-labx-border/80 hover:border-labx-green/40 hover:bg-labx-green/5 transition-all text-left group flex items-start gap-3"
                      role="option"
                      aria-selected="false"
                    >
                      <div className="w-8 h-8 rounded-lg bg-labx-green/10 border border-labx-green/20 flex items-center justify-center shrink-0 group-hover:bg-labx-green group-hover:text-black transition-colors text-labx-green">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold text-labx-text group-hover:text-labx-green transition-colors truncate">
                          {s.label}
                        </div>
                        <div className="text-[11px] text-labx-text-muted line-clamp-1">
                          {s.description}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-labx-green uppercase tracking-wider mb-2 px-2">
                  <Folder className="w-3.5 h-3.5 text-labx-green" />
                  <span>Projects</span>
                </div>
                <div className="space-y-1">
                  {filteredProjects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(`/projects/${p.id}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-labx-surface/80 hover:border hover:border-labx-green/30 transition-all text-left group"
                    >
                      <div>
                        <div className="font-semibold text-sm text-labx-text group-hover:text-labx-green flex items-center gap-2">
                          {p.name}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-labx-green/10 text-labx-green font-mono border border-labx-green/20">{p.domain}</span>
                        </div>
                        <div className="text-xs text-labx-text-muted line-clamp-1">{p.tagline}</div>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-labx-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Startups */}
            {filteredStartups.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 px-2">
                  <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Startups</span>
                </div>
                <div className="space-y-1">
                  {filteredStartups.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleSelect(`/startups/${s.id}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-labx-surface/80 hover:border hover:border-emerald-400/30 transition-all text-left group"
                    >
                      <div>
                        <div className="font-semibold text-sm text-labx-text group-hover:text-emerald-400 flex items-center gap-2">
                          {s.name}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-400/10 text-emerald-400 font-mono border border-emerald-400/20">{s.stage}</span>
                        </div>
                        <div className="text-xs text-labx-text-muted line-clamp-1">{s.tagline}</div>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mentors */}
            {filteredMentors.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-labx-green uppercase tracking-wider mb-2 px-2">
                  <Award className="w-3.5 h-3.5 text-labx-green" />
                  <span>Mentors</span>
                </div>
                <div className="space-y-1">
                  {filteredMentors.map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleSelect(`/mentors/${m.id}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-labx-surface/80 hover:border hover:border-labx-green/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover border border-labx-green/30" />
                        <div>
                          <div className="font-semibold text-sm text-labx-text group-hover:text-labx-green">{m.name}</div>
                          <div className="text-xs text-labx-text-muted">{m.title}</div>
                        </div>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-labx-green opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-5 py-3 bg-[#0B140E] border-t border-labx-border/80 flex items-center justify-between text-xs text-labx-text-muted">
            <span className="flex items-center gap-1.5">
              <span>Press</span>
              <kbd className="font-mono bg-labx-surface px-1.5 py-0.5 rounded text-labx-green border border-labx-border text-[11px]">Ctrl+K</kbd>
              <span>to trigger search anywhere</span>
            </span>
            <span className="font-semibold text-labx-green/80 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-labx-green animate-ping inline-block" />
              ZeAI LabX Ecosystem
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
