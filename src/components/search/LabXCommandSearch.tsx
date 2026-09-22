import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Folder, Rocket, Award, CornerDownLeft } from 'lucide-react';
import { mockProjects, mockStartups, mockMentors } from '../../data/mockData';

interface LabXCommandSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LabXCommandSearch({ isOpen, onClose }: LabXCommandSearchProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (isOpen) onClose();
      }
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

  const handleSelect = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="w-full max-w-2xl bg-labx-card border border-labx-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search bar */}
          <div className="flex items-center px-4 py-3.5 border-b border-labx-border gap-3">
            <Search className="w-5 h-5 text-labx-violet" />
            <input
              type="text"
              autoFocus
              placeholder="Search projects, startups, mentors, or type a command..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-labx-text placeholder-labx-text-muted text-base focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-labx-surface text-labx-text-muted border border-labx-border">ESC to exit</span>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-labx-surface text-labx-text-muted hover:text-labx-text">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Results container */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {/* Projects */}
            {filteredProjects.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-labx-text-muted uppercase tracking-wider mb-2 px-2">
                  <Folder className="w-3.5 h-3.5 text-labx-violet" />
                  <span>Projects</span>
                </div>
                <div className="space-y-1">
                  {filteredProjects.map(p => (
                    <button
                      key={p.id}
                      onClick={() => handleSelect(`/projects/${p.id}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-labx-surface/80 transition-colors text-left group"
                    >
                      <div>
                        <div className="font-semibold text-sm text-labx-text group-hover:text-labx-violet flex items-center gap-2">
                          {p.name}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-labx-violet/10 text-labx-violet font-mono">{p.domain}</span>
                        </div>
                        <div className="text-xs text-labx-text-muted line-clamp-1">{p.tagline}</div>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-labx-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Startups */}
            {filteredStartups.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-labx-text-muted uppercase tracking-wider mb-2 px-2">
                  <Rocket className="w-3.5 h-3.5 text-labx-cyan" />
                  <span>Startups</span>
                </div>
                <div className="space-y-1">
                  {filteredStartups.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleSelect(`/startups/${s.id}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-labx-surface/80 transition-colors text-left group"
                    >
                      <div>
                        <div className="font-semibold text-sm text-labx-text group-hover:text-labx-cyan flex items-center gap-2">
                          {s.name}
                          <span className="text-[10px] px-2 py-0.5 rounded bg-labx-cyan/10 text-labx-cyan font-mono">{s.stage}</span>
                        </div>
                        <div className="text-xs text-labx-text-muted line-clamp-1">{s.tagline}</div>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-labx-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mentors */}
            {filteredMentors.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-labx-text-muted uppercase tracking-wider mb-2 px-2">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Mentors</span>
                </div>
                <div className="space-y-1">
                  {filteredMentors.map(m => (
                    <button
                      key={m.id}
                      onClick={() => handleSelect(`/mentors/${m.id}`)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-labx-surface/80 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <div className="font-semibold text-sm text-labx-text group-hover:text-amber-400">{m.name}</div>
                          <div className="text-xs text-labx-text-muted">{m.title}</div>
                        </div>
                      </div>
                      <CornerDownLeft className="w-4 h-4 text-labx-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="px-4 py-2.5 bg-labx-surface/40 border-t border-labx-border flex items-center justify-between text-xs text-labx-text-muted">
            <span>Pro tip: Press <kbd className="font-mono bg-labx-surface px-1.5 py-0.5 rounded text-labx-text">Ctrl+K</kbd> anywhere in LabX</span>
            <span>ZeAI LabX Ecosystem Search</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
