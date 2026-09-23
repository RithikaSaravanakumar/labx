import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Menu, X, LogOut, User, FolderGit2, Bookmark, LayoutDashboard, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { NAV_ITEMS } from '../../constants';
import LabXLogo from '../brand/LabXLogo';

export default function Navbar() {
  const { notificationCount, setSearchOpen } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-labx-bg/85 backdrop-blur-xl border-b border-labx-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Official LabX Logo */}
            <LabXLogo size={32} linkToHome animated />

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                    isActive(item.path)
                      ? 'text-labx-violet bg-labx-violet/10'
                      : 'text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/about"
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                  isActive('/about')
                    ? 'text-labx-violet bg-labx-violet/10'
                    : 'text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface'
                }`}
              >
                About
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-labx-surface border border-labx-border text-labx-text-muted text-xs hover:border-labx-violet/40 transition-colors"
                aria-label="Open search palette"
              >
                <Search className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Search</span>
                <kbd className="hidden sm:inline text-[10px] bg-labx-bg px-1.5 py-0.5 rounded border border-labx-border ml-1">⌘K</kbd>
              </button>

              {/* Notifications */}
              {isAuthenticated && (
                <Link
                  to="/notifications"
                  className="relative p-2 rounded-lg text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface transition-colors"
                  aria-label={`Notifications (${notificationCount} unread)`}
                >
                  <Bell className="w-4 h-4" />
                  {notificationCount > 0 && (
                    <span className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-labx-violet text-[9px] text-white flex items-center justify-center font-bold">
                      {notificationCount}
                    </span>
                  )}
                </Link>
              )}

              {/* Auth Controls */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-labx-violet/40 transition-all focus:outline-none"
                    aria-label="User navigation menu"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border border-labx-border object-cover"
                    />
                  </button>

                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-56 rounded-2xl bg-labx-surface border border-labx-border shadow-2xl py-2 z-50"
                      >
                        <div className="px-4 py-2 border-b border-labx-border/60">
                          <p className="text-xs font-bold text-labx-text truncate">{user.name}</p>
                          <p className="text-[11px] text-labx-cyan font-mono truncate">+{user.labxPoints} pts &bull; {user.role}</p>
                        </div>

                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface-hover transition-colors"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-labx-violet" />
                            <span>Your Innovation Hub</span>
                          </Link>
                          <Link
                            to="/profile"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface-hover transition-colors"
                          >
                            <User className="w-3.5 h-3.5 text-labx-cyan" />
                            <span>Your Proof of Work</span>
                          </Link>
                          <Link
                            to="/my-projects"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface-hover transition-colors"
                          >
                            <FolderGit2 className="w-3.5 h-3.5 text-labx-purple" />
                            <span>My Builds &amp; Projects</span>
                          </Link>
                          <Link
                            to="/saved"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface-hover transition-colors"
                          >
                            <Bookmark className="w-3.5 h-3.5 text-labx-warning" />
                            <span>Saved Artifacts</span>
                          </Link>
                          <Link
                            to="/settings"
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 text-xs text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface-hover transition-colors"
                          >
                            <Settings className="w-3.5 h-3.5 text-labx-text-muted" />
                            <span>Settings</span>
                          </Link>
                        </div>

                        <div className="pt-1 border-t border-labx-border/60">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-xs font-semibold text-labx-text-secondary hover:text-labx-text transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-labx-violet to-labx-purple hover:brightness-110 active:scale-[0.98] transition-all shadow-sm shadow-labx-violet/25"
                  >
                    Start Building
                  </Link>
                </div>
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
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-labx-bg-secondary border-b border-labx-border p-4 space-y-2 shadow-2xl"
          >
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-labx-violet bg-labx-violet/10'
                    : 'text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/about"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-xs font-medium text-labx-text-secondary hover:text-labx-text hover:bg-labx-surface"
            >
              About LabX
            </Link>

            <hr className="border-labx-border my-2" />

            {isAuthenticated ? (
              <div className="space-y-1">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-xs font-semibold text-labx-text hover:bg-labx-surface"
                >
                  Your Innovation Hub
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-xs font-semibold text-labx-text hover:bg-labx-surface"
                >
                  Your Proof of Work
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-2 text-xs font-bold text-labx-text bg-labx-surface rounded-xl border border-labx-border"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="text-center py-2 text-xs font-bold text-white bg-labx-violet rounded-xl"
                >
                  Start Building
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
