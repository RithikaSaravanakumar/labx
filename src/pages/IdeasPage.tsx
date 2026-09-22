import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ThumbsUp, Users, Plus, Send, X, CheckCircle2 } from 'lucide-react';
import { ideaService } from '../services';
import type { Idea, Domain } from '../types';
import { DOMAIN_LABELS, DOMAIN_COLORS } from '../constants';
import { pageTransition, staggerContainer, staggerItem } from '../animations';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upvotes, setUpvotes] = useState<Record<string, number>>({});

  // Form
  const [title, setTitle] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [domain, setDomain] = useState<Domain>('ai-ml');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ideaService.getIdeas().then(res => {
      setIdeas(res);
      const initial: Record<string, number> = {};
      res.forEach(i => { initial[i.id] = i.supporters; });
      setUpvotes(initial);
      setIsLoading(false);
    });
  }, []);

  const handleUpvote = (id: string) => {
    setUpvotes(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const handleCreateIdea = (e: React.FormEvent) => {
    e.preventDefault();
    const newIdea: Idea = {
      id: `idea-${Date.now()}`,
      title,
      problem,
      solution,
      domain,
      stage: 'seeking-team',
      requiredSkills: ['React', 'TypeScript', 'Python'],
      authorId: 'user-1',
      authorName: 'Aarav Sharma',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      supporters: 1,
      interestedBuilders: 1,
      createdAt: new Date().toISOString(),
      tags: ['labx', domain],
    };

    setIdeas([newIdea, ...ideas]);
    setUpvotes(prev => ({ ...prev, [newIdea.id]: 1 }));
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setTitle('');
      setProblem('');
      setSolution('');
    }, 1200);
  };

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
              <Lightbulb className="w-3.5 h-3.5 fill-amber-400" />
              <span>Early Stage Ideation Vault</span>
            </span>
            <span className="text-xs text-labx-text-muted">{ideas.length} Unbuilt Concepts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-labx-text">Idea Vault</h1>
          <p className="text-labx-text-secondary text-sm sm:text-base mt-1">
            Browse raw and refined startup concepts looking for co-founders, feedback, and technical teams.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="labx-button-primary flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Pitch Idea</span>
        </button>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
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
          {ideas.map(idea => {
            const domainColor = DOMAIN_COLORS[idea.domain] || '#8B5CF6';
            const count = upvotes[idea.id] || idea.supporters;

            return (
              <motion.div key={idea.id} variants={staggerItem} className="labx-card p-6 flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: `${domainColor}20`, color: domainColor }}
                    >
                      {DOMAIN_LABELS[idea.domain]}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-labx-surface text-labx-text-muted">
                      {idea.stage}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-labx-text mb-2 group-hover:text-labx-violet transition-colors">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-labx-text-muted mb-2 font-semibold">Problem: {idea.problem}</p>
                  <p className="text-sm text-labx-text-secondary mb-4 line-clamp-3 leading-relaxed">{idea.solution}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-4 p-2 rounded-xl bg-labx-surface/60 border border-labx-border/40">
                    <img src={idea.authorAvatar} alt={idea.authorName} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-xs text-labx-text-muted">Pitched by <strong className="text-labx-text">{idea.authorName}</strong></span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-labx-border/60 text-xs">
                    <button
                      onClick={() => handleUpvote(idea.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-labx-surface border border-labx-border hover:border-amber-400 transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono font-bold text-labx-text">{count} Supporters</span>
                    </button>

                    <div className="flex items-center gap-1 text-labx-text-muted font-mono">
                      <Users className="w-3.5 h-3.5" />
                      <span>{idea.interestedBuilders} builders interested</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-labx-card border border-labx-border max-w-md w-full p-6 rounded-2xl shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute right-4 top-4 p-1 rounded-lg text-labx-text-muted hover:text-labx-text">
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-labx-text">Idea Pitched!</h3>
                <p className="text-xs text-labx-text-muted">Your concept is now live in the LabX Vault.</p>
              </div>
            ) : (
              <form onSubmit={handleCreateIdea} className="space-y-4">
                <h3 className="text-xl font-bold text-labx-text">Pitch a Concept</h3>
                <p className="text-xs text-labx-text-secondary">Share early unbuilt ideas to gather feedback and recruit co-founders.</p>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Concept Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Autonomous Satellite Thermal Imaging Pipeline"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Domain</label>
                  <select
                    value={domain}
                    onChange={(e) => setDomain(e.target.value as Domain)}
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                  >
                    {Object.entries(DOMAIN_LABELS).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Problem Statement</label>
                  <input
                    type="text"
                    placeholder="What core problem are you solving?"
                    value={problem}
                    onChange={(e) => setProblem(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Proposed Solution</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your technical or product solution..."
                    value={solution}
                    onChange={(e) => setSolution(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-semibold bg-labx-surface text-labx-text-muted">
                    Cancel
                  </button>
                  <button type="submit" className="labx-button-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Concept</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
