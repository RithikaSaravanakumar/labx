import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { notificationService } from '../services';
import type { Notification } from '../types';
import { pageTransition } from '../animations';
import { formatRelativeTime } from '../utils';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    notificationService.getNotifications().then(res => {
      setNotifications(res);
      setIsLoading(false);
    });
  }, []);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-labx-text">Notifications</h1>
          <p className="text-sm text-labx-text-secondary mt-1">Ecosystem updates, collaboration requests, and build reactions.</p>
        </div>
        <button onClick={markAllRead} className="text-xs font-semibold text-labx-cyan hover:underline">
          Mark All as Read
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="labx-card p-4 h-20 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map(notif => (
            <div
              key={notif.id}
              className={`labx-card p-4 flex items-start justify-between gap-4 transition-colors ${
                !notif.isRead ? 'border-labx-cyan/40 bg-labx-cyan/5' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-labx-surface border border-labx-border/60 text-labx-cyan mt-0.5">
                  <Bell className="w-4 h-4 text-labx-cyan" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-labx-text">{notif.title}</h4>
                  <p className="text-xs text-labx-text-secondary mt-0.5">{notif.message}</p>
                  <span className="text-[10px] text-labx-text-muted font-mono mt-2 block">{formatRelativeTime(notif.createdAt)}</span>
                </div>
              </div>
              {!notif.isRead && (
                <span className="w-2 h-2 rounded-full bg-labx-cyan shadow-[0_0_8px_rgba(0,255,135,0.6)] mt-2 shrink-0" />
              )}
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
