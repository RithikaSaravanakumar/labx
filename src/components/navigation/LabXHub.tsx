import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, ChevronRight, Plus } from 'lucide-react';
import { LABX_NAVIGATION } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import LabXPointRing from '../reputation/LabXPointRing';

interface LabXHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LabXHub({ isOpen, onClose }: LabXHubProps) {
  const { user, isAuthenticated } = useAuth();
  const hubRef = useRef<HTMLDivElement>(null);

  // Filter navigation based on auth state
  const visibleGroups = LABX_NAVIGATION.map(group => ({
    ...group,
    items: group.items.filter(item => {
      if (item.authRequired && !isAuthenticated) return false;
      if (item.publicOnly && isAuthenticated) return false;
      return true;
    })
  })).filter(group => {
    if (group.authRequired && !isAuthenticated) return false;
    return group.items.length > 0;
  });

  // Focus trap & Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#040705]/80 backdrop-blur-sm z-[100]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            ref={hubRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-[440px] bg-[#0A0C0B] border-l border-white/5 shadow-2xl z-[101] flex flex-col"
            role="dialog"
            aria-label="LabX Hub Navigation"
            aria-modal="true"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5">
              <div>
                <h2 className="text-lg font-black text-white uppercase tracking-wider">LabX Hub</h2>
                <p className="text-xs text-zinc-400">Explore the ecosystem</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-white/5 text-zinc-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label="Close LabX Hub"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
              {visibleGroups.map((group, groupIdx) => (
                <motion.div
                  key={group.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + groupIdx * 0.05 }}
                  className="space-y-3"
                >
                  <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.15em] px-2">
                    {group.title}
                  </h3>
                  <div className="flex flex-col gap-1">
                    {group.items.map(item => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.id}
                          to={item.path}
                          onClick={handleLinkClick}
                          className="group flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04] text-zinc-300 hover:text-white transition-all duration-200"
                        >
                          <div className="flex items-center gap-3">
                            {Icon && (
                              <div className="w-8 h-8 rounded-lg bg-white/[0.02] flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:text-[#00FF87] transition-colors">
                                <Icon className="w-4 h-4" />
                              </div>
                            )}
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-emerald-400 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer / User Ecosystem Summary */}
            <div className="p-6 border-t border-white/5 bg-[#040705]">
              {isAuthenticated && user ? (
                <div className="mb-6 flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-3">
                    <LabXPointRing points={user.labxPoints} level={user.level} size={44} strokeWidth={3} />
                    <div>
                      <div className="text-sm font-bold text-white">{user.name}</div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] font-mono text-[#00FF87] uppercase tracking-wider">{user.labxPoints.toLocaleString()} PTS</span>
                        {user.rank && (
                          <span className="text-[10px] text-zinc-500">#{user.rank} GLOBAL</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/profile/${user.username}`}
                    onClick={handleLinkClick}
                    className="text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    View →
                  </Link>
                </div>
              ) : (
                <div className="mb-6">
                  <p className="text-sm text-zinc-400 text-center">Join the ecosystem to build, connect, and earn reputation.</p>
                </div>
              )}

              <Link
                to={isAuthenticated ? "/projects/new" : "/signup"}
                onClick={handleLinkClick}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#34D399] text-black font-black text-sm uppercase tracking-wide hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
              >
                <Plus className="w-4 h-4" />
                <span>{isAuthenticated ? 'Start Building' : 'Join LabX'}</span>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
