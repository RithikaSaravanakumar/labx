import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, ArrowLeft, Send, CheckCircle2, Flame, ExternalLink, ShieldCheck } from 'lucide-react';
import { projectService, buildUpdateService } from '../services';
import type { Project, BuildUpdate } from '../types';
import { DOMAIN_LABELS, DOMAIN_COLORS, STAGE_LABELS } from '../constants';
import { pageTransition } from '../animations';
import { formatRelativeTime } from '../utils';

export default function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [buildUpdates, setBuildUpdates] = useState<BuildUpdate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStarred, setHasStarred] = useState(false);
  const [starCount, setStarCount] = useState(0);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinRole, setJoinRole] = useState('');
  const [joinNote, setJoinNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      projectService.getProjectById(id),
      buildUpdateService.getBuildUpdatesByProject(id)
    ]).then(([p, updates]) => {
      if (p) {
        setProject(p);
        setStarCount(p.labxPoints || 24);
      }
      setBuildUpdates(updates);
      setIsLoading(false);
    });
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-labx-violet border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-labx-text-muted">Loading project telemetry...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-labx-text mb-4">Project Not Found</h2>
        <Link to="/projects" className="labx-button-primary px-4 py-2 rounded-xl text-sm">
          Return to Projects
        </Link>
      </div>
    );
  }

  const domainColor = DOMAIN_COLORS[project.domain] || '#8B5CF6';

  const handleStarToggle = () => {
    if (hasStarred) {
      setStarCount(prev => prev - 1);
      setHasStarred(false);
    } else {
      setStarCount(prev => prev + 1);
      setHasStarred(true);
    }
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setJoinModalOpen(false);
      setIsSubmitted(false);
    }, 1500);
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Back button */}
      <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-semibold text-labx-text-muted hover:text-labx-violet mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Ecosystem</span>
      </Link>

      {/* Hero Header */}
      <div className="labx-card p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{ background: `radial-gradient(circle at top right, ${domainColor}, transparent 70%)` }}
        />

        <div className="flex flex-col lg:flex-row justify-between gap-6 relative z-10">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ backgroundColor: `${domainColor}20`, color: domainColor }}
              >
                {DOMAIN_LABELS[project.domain]}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-labx-surface text-labx-text-muted uppercase">
                {STAGE_LABELS[project.stage]}
              </span>
              {project.trendingScore && (
                <span className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{project.trendingScore} LabX Score</span>
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-labx-text leading-tight">
              {project.name}
            </h1>
            <p className="text-lg text-labx-text-secondary leading-relaxed">
              {project.tagline || project.description}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-3 py-1 rounded-lg text-xs font-mono bg-labx-bg border border-labx-border text-labx-text-secondary">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action box */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px] justify-center">
            <button
              onClick={handleStarToggle}
              className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                hasStarred
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-labx-surface border border-labx-border text-labx-text hover:border-amber-400/50'
              }`}
            >
              <Star className={`w-4 h-4 ${hasStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{hasStarred ? 'Starred' : 'Star Project'} ({starCount})</span>
            </button>

            <button
              onClick={() => setJoinModalOpen(true)}
              className="labx-button-primary flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm"
            >
              <Users className="w-4 h-4" />
              <span>Request to Join</span>
            </button>

            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="labx-button-secondary flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold"
              >
                <span>View Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Progress bar banner */}
        <div className="mt-8 pt-6 border-t border-labx-border/60 grid sm:grid-cols-3 gap-6">
          <div>
            <div className="text-xs text-labx-text-muted mb-1">Ecosystem Progress</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-labx-bg rounded-full overflow-hidden border border-labx-border/40">
                <div className="h-full bg-gradient-to-r from-labx-violet to-labx-cyan" style={{ width: `${project.progress}%` }} />
              </div>
              <span className="text-sm font-bold font-mono text-labx-violet">{project.progress}%</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-labx-text-muted mb-1">Active Contributors</div>
            <div className="text-base font-bold text-labx-text flex items-center gap-2">
              <Users className="w-4 h-4 text-labx-cyan" />
              <span>{project.contributorCount} Builders</span>
            </div>
          </div>

          <div>
            <div className="text-xs text-labx-text-muted mb-1">Open Positions</div>
            <div className="text-base font-bold text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>{project.lookingFor?.length || 0} Roles Open</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column (Updates feed & About) */}
        <div className="lg:col-span-2 space-y-8">
          {/* About section */}
          <div className="labx-card p-6 sm:p-8">
            <h2 className="text-xl font-bold text-labx-text mb-4">About {project.name}</h2>
            <p className="text-labx-text-secondary leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Build Updates / Proof of Work Timeline */}
          <div className="labx-card p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-labx-text">Build in Public Timeline</h2>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-labx-surface text-labx-text-muted border border-labx-border">
                {buildUpdates.length} Proof-of-Work Logs
              </span>
            </div>

            {buildUpdates.length === 0 ? (
              <p className="text-sm text-labx-text-muted italic py-4">No build updates recorded yet.</p>
            ) : (
              <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-labx-border">
                {buildUpdates.map(update => (
                  <div key={update.id} className="relative pl-9">
                    <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-labx-violet border-4 border-labx-card shadow" />
                    <div className="bg-labx-surface/60 border border-labx-border/80 rounded-xl p-4">
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold text-labx-violet uppercase font-mono">{update.type || 'build'} update</span>
                        <span className="text-[11px] text-labx-text-muted">{formatRelativeTime(update.createdAt)}</span>
                      </div>
                      <h4 className="text-base font-bold text-labx-text mb-1">{update.title}</h4>
                      <p className="text-xs sm:text-sm text-labx-text-secondary mb-3">{update.content}</p>
                      
                      {update.proofUrl && (
                        <a
                          href={update.proofUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-labx-cyan font-mono hover:underline"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Proof: {update.proofUrl}</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar (Open Roles & Team) */}
        <div className="space-y-8">
          {/* Open Roles */}
          <div className="labx-card p-6">
            <h3 className="text-lg font-bold text-labx-text mb-4 flex items-center justify-between">
              <span>Open Roles</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                {project.lookingFor?.length || 0} Needed
              </span>
            </h3>
            
            {(!project.lookingFor || project.lookingFor.length === 0) ? (
              <p className="text-xs text-labx-text-muted">Not actively recruiting team members currently.</p>
            ) : (
              <div className="space-y-3">
                {project.lookingFor.map((role: string) => (
                  <div key={role} className="p-3 rounded-xl bg-labx-surface border border-labx-border/80 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-labx-text">{role}</div>
                      <div className="text-[11px] text-labx-text-muted">Equity/Points share opportunity</div>
                    </div>
                    <button
                      onClick={() => { setJoinRole(role); setJoinModalOpen(true); }}
                      className="text-xs font-semibold text-labx-violet hover:underline px-2 py-1"
                    >
                      Apply
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Team / Contributor Info */}
          <div className="labx-card p-6">
            <h3 className="text-lg font-bold text-labx-text mb-4">Project Leadership</h3>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-labx-surface border border-labx-border">
              <img src={project.ownerAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} alt={project.ownerName || 'Project Lead'} className="w-10 h-10 rounded-full border border-labx-violet object-cover" />
              <div>
                <div className="text-sm font-bold text-labx-text">{project.ownerName || 'Aarav Sharma'}</div>
                <div className="text-xs text-labx-text-muted">Project Lead & Architect</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Request to Join Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-labx-card border border-labx-border max-w-md w-full p-6 rounded-2xl shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-labx-text">Application Submitted!</h3>
                <p className="text-xs text-labx-text-muted">The project lead will review your LabX proof-of-work profile.</p>
              </div>
            ) : (
              <form onSubmit={handleJoinSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-labx-text">Request to Join {project.name}</h3>
                <p className="text-xs text-labx-text-secondary">Express your interest and state your contribution offer.</p>
                
                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Target Role</label>
                  <input
                    type="text"
                    value={joinRole}
                    onChange={(e) => setJoinRole(e.target.value)}
                    placeholder="e.g. Frontend Engineer, ML Specialist"
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Why do you want to contribute?</label>
                  <textarea
                    rows={3}
                    value={joinNote}
                    onChange={(e) => setJoinNote(e.target.value)}
                    placeholder="Briefly describe your relevant skills and experience..."
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setJoinModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-labx-surface text-labx-text-muted hover:text-labx-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="labx-button-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Application</span>
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
