import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, Users, Zap, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';
import { projectService } from '../services';
import { pageTransition } from '../animations';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ideaService } from '../services';

const DOMAINS = ['ai-ml', 'healthcare', 'climate', 'deep-tech', 'fintech', 'edtech', 'robotics', 'cybersecurity', 'saas'];

export default function CreateProjectPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    tagline: '',
    domain: '',
    description: '',
    problem: '',
    solution: '',
    techStack: '',
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    const sourceIdeaId = searchParams.get('sourceIdeaId');
    if (sourceIdeaId) {
      ideaService.getIdeas().then(ideas => {
        const idea = ideas.find(i => i.id === sourceIdeaId);
        if (idea) {
          setFormData(prev => ({
            ...prev,
            name: idea.title,
            domain: idea.domain,
            problem: idea.problem,
            solution: idea.solution,
            techStack: idea.requiredSkills?.join(', ') || ''
          }));
        }
      });
    }
  }, [searchParams]);

  const handleNext = () => setStep(s => Math.min(3, s + 1));
  const handlePrev = () => setStep(s => Math.max(1, s - 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Save as draft and publish
    const projectData = {
      ...formData,
      domain: formData.domain as any,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(Boolean)
    };
    
    const draft = await projectService.createDraft(projectData);
    await projectService.publishProject(draft.id);
    
    navigate(`/projects/${draft.id}`);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-3xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-labx-text uppercase tracking-tight mb-2">Turn Idea Into Reality</h1>
        <p className="text-labx-text-secondary">Draft your project, gather your team, and start building in public.</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-labx-border/50 -z-10" />
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-labx-cyan transition-all duration-500 -z-10"
          style={{ width: `${((step - 1) / 2) * 100}%` }}
        />
        
        {[
          { num: 1, label: 'The Core Idea', icon: Target },
          { num: 2, label: 'Problem & Solution', icon: Zap },
          { num: 3, label: 'Tech & Launch', icon: Rocket },
        ].map(s => {
          const Icon = s.icon;
          const isActive = step >= s.num;
          return (
            <div key={s.num} className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'bg-labx-surface border-labx-cyan text-labx-cyan shadow-[0_0_15px_rgba(34, 211, 238,0.2)]' : 'bg-labx-bg border-labx-border text-labx-text-muted'}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:block ${isActive ? 'text-labx-text' : 'text-labx-text-muted'}`}>
                {s.label}
              </span>
            </div>
          )
        })}
      </div>

      <form onSubmit={step === 3 ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }} className="labx-card p-6 sm:p-10">
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-labx-text mb-6">What are you building?</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-labx-text-muted uppercase tracking-wider">Project Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-labx-bg border border-labx-border rounded-xl px-4 py-3 text-labx-text focus:outline-none focus:border-labx-cyan transition-colors"
                placeholder="e.g. MediVision AI"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-labx-text-muted uppercase tracking-wider">Catchy Tagline</label>
              <input
                required
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full bg-labx-bg border border-labx-border rounded-xl px-4 py-3 text-labx-text focus:outline-none focus:border-labx-cyan transition-colors"
                placeholder="e.g. AI-powered diagnostic imaging"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-labx-text-muted uppercase tracking-wider">Domain</label>
              <select
                required
                value={formData.domain}
                onChange={e => setFormData({ ...formData, domain: e.target.value })}
                className="w-full bg-labx-bg border border-labx-border rounded-xl px-4 py-3 text-labx-text focus:outline-none focus:border-labx-cyan transition-colors appearance-none"
              >
                <option value="" disabled>Select a domain</option>
                {DOMAINS.map(d => <option key={d} value={d}>{d.toUpperCase().replace('-', ' ')}</option>)}
              </select>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-labx-text mb-6">Why does it matter?</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-labx-text-muted uppercase tracking-wider">The Problem</label>
              <textarea
                required
                value={formData.problem}
                onChange={e => setFormData({ ...formData, problem: e.target.value })}
                className="w-full bg-labx-bg border border-labx-border rounded-xl px-4 py-3 text-labx-text focus:outline-none focus:border-labx-cyan transition-colors min-h-[120px] resize-none"
                placeholder="What problem are you solving?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-labx-text-muted uppercase tracking-wider">The Solution</label>
              <textarea
                required
                value={formData.solution}
                onChange={e => setFormData({ ...formData, solution: e.target.value })}
                className="w-full bg-labx-bg border border-labx-border rounded-xl px-4 py-3 text-labx-text focus:outline-none focus:border-labx-cyan transition-colors min-h-[120px] resize-none"
                placeholder="How does your project solve this problem?"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <h2 className="text-xl font-bold text-labx-text mb-6">Technical Details</h2>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-labx-text-muted uppercase tracking-wider">Tech Stack (comma separated)</label>
              <input
                required
                type="text"
                value={formData.techStack}
                onChange={e => setFormData({ ...formData, techStack: e.target.value })}
                className="w-full bg-labx-bg border border-labx-border rounded-xl px-4 py-3 text-labx-text focus:outline-none focus:border-labx-cyan transition-colors"
                placeholder="e.g. React, Node.js, Python, PostgreSQL"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-labx-text-muted uppercase tracking-wider">Brief Description</label>
              <textarea
                required
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-labx-bg border border-labx-border rounded-xl px-4 py-3 text-labx-text focus:outline-none focus:border-labx-cyan transition-colors min-h-[120px] resize-none"
                placeholder="A short description for the discovery page"
              />
            </div>
          </motion.div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-labx-border/60">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1 || isSubmitting}
            className="flex items-center gap-2 text-sm font-bold text-labx-text-muted hover:text-labx-text disabled:opacity-0 transition-opacity"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="labx-button-primary px-8 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : step === 3 ? (
              <>
                <CheckCircle2 className="w-4 h-4" /> Publish Project
              </>
            ) : (
              <>
                Continue <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
