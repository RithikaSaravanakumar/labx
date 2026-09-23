import { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Rocket, Heart, MessageSquare, ExternalLink, Share2, Plus } from 'lucide-react';
import type { BuildUpdate } from '../../types';
import { formatRelativeTime } from '../../utils';

interface BuildJourneyTimelineProps {
  updates: BuildUpdate[];
  onNewUpdateClick?: () => void;
}

export default function BuildJourneyTimeline({ updates, onNewUpdateClick }: BuildJourneyTimelineProps) {
  const [reactions, setReactions] = useState<Record<string, { fire: number; rocket: number; heart: number }>>(() => {
    const initial: Record<string, { fire: number; rocket: number; heart: number }> = {};
    updates.forEach(u => {
      initial[u.id] = {
        fire: u.reactions?.fire || 5,
        rocket: u.reactions?.rocket || 3,
        heart: u.reactions?.heart || 8,
      };
    });
    return initial;
  });

  const handleReact = (updateId: string, type: 'fire' | 'rocket' | 'heart') => {
    setReactions(prev => ({
      ...prev,
      [updateId]: {
        ...prev[updateId],
        [type]: (prev[updateId]?.[type] || 0) + 1,
      },
    }));
  };

  return (
    <div className="space-y-6">
      {onNewUpdateClick && (
        <div className="labx-card p-4 flex items-center justify-between bg-gradient-to-r from-emerald-500/15 via-teal-500/5 to-emerald-500/10 border-emerald-500/30">
          <div>
            <h4 className="text-sm font-bold text-labx-text">Building something today?</h4>
            <p className="text-xs text-labx-text-muted">Share your progress log to earn LabX points and level up.</p>
          </div>
          <button
            onClick={onNewUpdateClick}
            className="labx-button-primary px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Post Build Log</span>
          </button>
        </div>
      )}

      <div className="space-y-6">
        {updates.map(update => {
          const currentReactions = reactions[update.id] || { fire: 5, rocket: 3, heart: 8 };

          return (
            <motion.div
              key={update.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="labx-card p-6 relative group"
            >
              {/* Header */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={update.authorAvatar}
                    alt={update.authorName}
                    className="w-10 h-10 rounded-full border border-labx-violet object-cover"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-labx-text">{update.authorName}</span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-labx-violet/10 text-labx-violet font-semibold">
                        Day {update.day}
                      </span>
                    </div>
                    <div className="text-xs text-labx-text-muted font-mono">{update.projectName} · {formatRelativeTime(update.createdAt)}</div>
                  </div>
                </div>

                <button className="text-labx-text-muted hover:text-labx-text p-1.5 rounded-lg hover:bg-labx-surface transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Content */}
              <h3 className="text-lg font-bold text-labx-text mb-2">{update.title}</h3>
              <p className="text-sm text-labx-text-secondary leading-relaxed mb-4 whitespace-pre-line">
                {update.content}
              </p>

              {/* Proof link if available */}
              {update.proofUrl && (
                <div className="mb-4">
                  <a
                    href={update.proofUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-labx-cyan bg-labx-cyan/10 border border-labx-cyan/30 px-3 py-1.5 rounded-lg hover:bg-labx-cyan/20 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verified Proof: {update.proofUrl}</span>
                  </a>
                </div>
              )}

              {/* Tags */}
              {update.tags && update.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {update.tags.map(tag => (
                    <span key={tag} className="text-[11px] font-mono text-labx-text-muted bg-labx-bg px-2 py-0.5 rounded border border-labx-border/40">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Reaction bar */}
              <div className="flex items-center justify-between pt-4 border-t border-labx-border/60 text-xs">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReact(update.id, 'fire')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-labx-surface border border-labx-border/60 hover:border-amber-500/50 transition-colors"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="font-mono text-labx-text">{currentReactions.fire}</span>
                  </button>

                  <button
                    onClick={() => handleReact(update.id, 'rocket')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-labx-surface border border-labx-border/60 hover:border-labx-cyan/50 transition-colors"
                  >
                    <Rocket className="w-3.5 h-3.5 text-labx-cyan" />
                    <span className="font-mono text-labx-text">{currentReactions.rocket}</span>
                  </button>

                  <button
                    onClick={() => handleReact(update.id, 'heart')}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-labx-surface border border-labx-border/60 hover:border-rose-500/50 transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    <span className="font-mono text-labx-text">{currentReactions.heart}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-labx-text-muted">
                  <MessageSquare className="w-4 h-4" />
                  <span className="font-mono">{update.commentCount || 0} comments</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
