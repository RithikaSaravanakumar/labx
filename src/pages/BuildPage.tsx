import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Plus, TrendingUp, CheckCircle2, X, Send } from 'lucide-react';
import BuildJourneyTimeline from '../components/build/BuildJourneyTimeline';
import { buildUpdateService, projectService } from '../services';
import type { BuildUpdate, Project } from '../types';
import { pageTransition } from '../animations';

export default function BuildPage() {
  const [updates, setUpdates] = useState<BuildUpdate[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Post modal state
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [logTitle, setLogTitle] = useState('');
  const [logContent, setLogContent] = useState('');
  const [proofUrl, setProofUrl] = useState('');
  const [dayNumber, setDayNumber] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    Promise.all([
      buildUpdateService.getBuildUpdates(),
      projectService.getProjects()
    ]).then(([u, p]) => {
      setUpdates(u);
      setProjects(p);
      if (p.length > 0) setSelectedProjectId(p[0].id);
      setIsLoading(false);
    });
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const proj = projects.find(p => p.id === selectedProjectId) || projects[0];

    const newLog: BuildUpdate = {
      id: `bu-${Date.now()}`,
      projectId: proj.id,
      projectName: proj.name,
      authorId: 'user-1',
      authorName: 'Aarav Sharma',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      day: dayNumber,
      title: logTitle,
      content: logContent,
      proofUrl: proofUrl || undefined,
      type: 'progress',
      reactions: { fire: 1, rocket: 1, heart: 1, clap: 0 },
      commentCount: 0,
      createdAt: new Date().toISOString(),
      tags: ['buildinpublic', proj.domain],
    };

    setUpdates([newLog, ...updates]);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setLogTitle('');
      setLogContent('');
      setProofUrl('');
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-amber-400" />
              <span>Build In Public Engine</span>
            </span>
            <span className="text-xs text-labx-text-muted">Transparent Proof-of-Work Logs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-labx-text">Build Journey Feed</h1>
          <p className="text-labx-text-secondary text-sm sm:text-base mt-1">
            Real-time milestone updates, daily build logs, and proof-of-work commitments from ecosystem founders.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="labx-button-primary flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold"
        >
          <Plus className="w-4 h-4" />
          <span>Log Today's Progress</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="labx-card p-6 h-48 animate-pulse">
                  <div className="h-4 bg-labx-surface rounded w-1/3 mb-4" />
                  <div className="h-6 bg-labx-surface rounded w-2/3 mb-2" />
                  <div className="h-12 bg-labx-surface rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <BuildJourneyTimeline updates={updates} onNewUpdateClick={() => setIsModalOpen(true)} />
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Streak Leaderboard Card */}
          <div className="labx-card p-6">
            <h3 className="text-base font-bold text-labx-text mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-labx-violet" />
              <span>Top Active Builders</span>
            </h3>

            <div className="space-y-3">
              {[
                { name: 'Aarav Sharma', streak: 18, points: 2840, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
                { name: 'Dr. Priya Nair', streak: 14, points: 2150, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
                { name: 'Rahul Verma', streak: 12, points: 1980, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
                { name: 'Ananya Roy', streak: 9, points: 1620, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
              ].map((builder, idx) => (
                <div key={builder.name} className="flex items-center justify-between p-3 rounded-xl bg-labx-surface border border-labx-border/60">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-labx-text-muted w-4">#{idx + 1}</span>
                    <img src={builder.avatar} alt={builder.name} className="w-8 h-8 rounded-full border border-labx-violet object-cover" />
                    <div>
                      <div className="text-xs font-bold text-labx-text">{builder.name}</div>
                      <div className="text-[10px] text-labx-text-muted font-mono">{builder.points} pts</div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-400 font-mono">🔥 {builder.streak}d</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Post Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="bg-labx-card border border-labx-border max-w-lg w-full p-6 rounded-2xl shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 p-1 rounded-lg text-labx-text-muted hover:text-labx-text hover:bg-labx-surface"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-labx-text">Build Log Published!</h3>
                <p className="text-xs text-labx-text-muted">+50 LabX Points credited to your profile streak.</p>
              </div>
            ) : (
              <form onSubmit={handleCreatePost} className="space-y-4">
                <h3 className="text-xl font-bold text-labx-text">Post Build Progress Log</h3>
                <p className="text-xs text-labx-text-secondary">Document your proof of work publicly to build credit in the ecosystem.</p>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Select Project</label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                  >
                    {projects.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-labx-text mb-1">Log Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Integrated Agentic Vision Model v1.2"
                      value={logTitle}
                      onChange={(e) => setLogTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-labx-text mb-1">Build Day</label>
                    <input
                      type="number"
                      min={1}
                      value={dayNumber}
                      onChange={(e) => setDayNumber(Number(e.target.value))}
                      required
                      className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text font-mono focus:outline-none focus:border-labx-violet/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">What did you accomplish today?</label>
                  <textarea
                    rows={4}
                    placeholder="Detail the technical breakthrough, milestone completed, or code shipped..."
                    value={logContent}
                    onChange={(e) => setLogContent(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text focus:outline-none focus:border-labx-violet/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-labx-text mb-1">Proof URL (GitHub commit / demo / PR link)</label>
                  <input
                    type="url"
                    placeholder="https://github.com/org/repo/commit/..."
                    value={proofUrl}
                    onChange={(e) => setProofUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-labx-surface border border-labx-border text-xs text-labx-text font-mono focus:outline-none focus:border-labx-violet/50"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-labx-surface text-labx-text-muted hover:text-labx-text"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="labx-button-primary px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Publish Build Log</span>
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
