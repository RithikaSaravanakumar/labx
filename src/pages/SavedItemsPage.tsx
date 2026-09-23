import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, ArrowUpRight, Trash2, Folder, Rocket, Award, Lightbulb, Users } from 'lucide-react';
import type { SavedItem } from '../types';
import { mockSavedItems } from '../data/mockData';

export default function SavedItemsPage() {
  const [items, setItems] = useState<SavedItem[]>(mockSavedItems);

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const getIcon = (type: SavedItem['type']) => {
    switch (type) {
      case 'project': return <Folder className="w-4 h-4 text-labx-violet" />;
      case 'startup': return <Rocket className="w-4 h-4 text-labx-cyan" />;
      case 'mentor': return <Users className="w-4 h-4 text-labx-success" />;
      case 'opportunity': return <Award className="w-4 h-4 text-labx-warning" />;
      case 'idea': return <Lightbulb className="w-4 h-4 text-emerald-400" />;
      default: return <Bookmark className="w-4 h-4 text-labx-violet" />;
    }
  };

  const getLink = (item: SavedItem) => {
    switch (item.type) {
      case 'project': return `/projects/${item.targetId}`;
      case 'startup': return `/startups/${item.targetId}`;
      case 'mentor': return `/mentors/${item.targetId}`;
      case 'opportunity': return `/opportunities`;
      case 'idea': return `/ideas`;
      default: return '/discover';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-labx-border/80 pb-6">
        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
          Bookmarks
        </span>
        <h1 className="text-3xl font-black text-labx-text tracking-tight mt-1">
          Saved <span className="labx-gradient-text">Ecosystem Artifacts</span>
        </h1>
        <p className="text-xs sm:text-sm text-labx-text-secondary mt-1">
          Quickly access bookmarked projects, founders, mentors, and innovation opportunities.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16 bg-labx-surface/50 border border-labx-border/60 rounded-2xl">
          <Bookmark className="w-10 h-10 text-labx-text-muted mx-auto mb-3" />
          <p className="text-sm text-labx-text font-bold">No saved artifacts yet.</p>
          <p className="text-xs text-labx-text-muted mt-1">
            Browse projects, mentors, or opportunities and click the bookmark icon to save.
          </p>
          <Link
            to="/discover"
            className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 rounded-xl text-xs font-bold text-white bg-labx-violet hover:bg-labx-violet-light transition-colors"
          >
            <span>Explore Innovation Ecosystem</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map(item => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-labx-surface border border-labx-border hover:border-labx-violet/30 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-labx-text">
                    {getIcon(item.type)}
                    <span className="capitalize">{item.type}</span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-labx-text-muted hover:text-red-400 p-1 transition-colors"
                    aria-label="Remove saved item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h2 className="text-sm sm:text-base font-bold text-labx-text group-hover:text-labx-violet transition-colors">
                  {item.title}
                </h2>
                <p className="text-xs text-labx-text-secondary mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-labx-border/60 flex items-center justify-between">
                <span className="text-[11px] text-labx-text-muted">Saved on {item.savedDate}</span>
                <Link
                  to={getLink(item)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-labx-cyan hover:underline"
                >
                  <span>Open</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
