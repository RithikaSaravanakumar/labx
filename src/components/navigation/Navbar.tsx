import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X, Zap } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NAV_ITEMS } from '../../constants';

export default function Navbar() {
  const { currentUser, notificationCount, setSearchOpen } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-labx-bg/80 backdrop-blur-xl border-b border-labx-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group" aria-label="LabX Home">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-labx-violet to-labx-cyan flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-labx-text tracking-tight">
                Lab<span className="labx-gradient-text">X</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-labx-violet bg-labx-violet/10'
                      : 'text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-labx-surface border border-labx-border text-labx-text-muted text-sm hover:border-labx-violet/30 transition-colors"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline text-xs bg-labx-bg px-1.5 py-0.5 rounded border border-labx-border ml-2">⌘K</kbd>
              </button>

              {/* Notifications */}
              <Link
                to="/notifications"
                className="relative p-2 rounded-lg text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface transition-colors"
                aria-label={`Notifications (${notificationCount} unread)`}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-labx-violet text-[10px] text-white flex items-center justify-center font-bold">
                    {notificationCount}
                  </span>
                )}
              </Link>

              {/* Profile */}
              {currentUser && (
                <Link to="/dashboard" className="hidden sm:block" aria-label="Dashboard">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full border-2 border-labx-border hover:border-labx-violet transition-colors"
                  />
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-labx-bg-secondary border-b border-labx-border"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'text-labx-violet bg-labx-violet/10'
                      : 'text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <hr className="border-labx-border my-2" />
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 rounded-lg text-sm font-medium text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface"
              >
                Profile
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
