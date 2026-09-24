import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { X, CheckCircle, BellRing, ChevronRight } from 'lucide-react';
import { notificationService } from '../../services';
import type { Notification } from '../../types';
import { formatRelativeTime } from '../../utils';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      notificationService.getNotifications().then(data => {
        setNotifications(data);
        setIsLoading(false);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] xl:bg-transparent bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-20 right-4 sm:right-6 lg:right-8 w-full max-w-[380px] bg-[#0A0C0B]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-[101] flex flex-col max-h-[80vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Notifications</h3>
                {notifications.some(n => !n.isRead) && (
                  <span className="w-2 h-2 rounded-full bg-cyan-300" />
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleMarkAllRead}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  title="Mark all as read"
                >
                  <CheckCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-cyan-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
                  <div className="w-5 h-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mb-3" />
                  <span className="text-xs font-medium">Loading notifications...</span>
                </div>
              ) : notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-zinc-500 text-center px-4">
                  <BellRing className="w-8 h-8 mb-3 opacity-20" />
                  <p className="text-sm font-medium text-white mb-1">You're all caught up</p>
                  <p className="text-xs">No new notifications in the ecosystem.</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map(notification => (
                    <Link
                      key={notification.id}
                      to={notification.actionUrl || '#'}
                      onClick={onClose}
                      className={`block p-3 rounded-xl transition-all duration-200 ${
                        notification.isRead
                          ? 'hover:bg-white/[0.03] opacity-70'
                          : 'bg-cyan-400/[0.03] hover:bg-cyan-400/[0.06]'
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className="relative shrink-0">
                          {notification.senderAvatar ? (
                            <img src={notification.senderAvatar} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                              <BellRing className="w-4 h-4 text-cyan-300" />
                            </div>
                          )}
                          {!notification.isRead && (
                            <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-cyan-400 border-2 border-[#0A0C0B] rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-zinc-300 leading-snug">
                            <span className="font-bold text-white">{notification.title} </span>
                            {notification.message}
                          </p>
                          <p className="text-[11px] text-zinc-500 mt-1 font-medium">
                            {formatRelativeTime(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-white/10 bg-[#05060A]">
              <Link
                to="/notifications"
                onClick={onClose}
                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <span>View all notifications</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
