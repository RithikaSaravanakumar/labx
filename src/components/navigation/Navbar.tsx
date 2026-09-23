import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import {
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  User as UserIcon,
  FolderGit2,
  Bookmark,
  LayoutDashboard,
  Settings,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { NAV_ITEMS } from '../../constants';
import LabXLogo from '../brand/LabXLogo';

/**
 * Magnetic Navigation Link Component (Desktop)
 * Pulls slightly (2-3px) towards the cursor with spring physics.
 * Disabled on touch and prefers-reduced-motion.
 */
function MagneticNavLink({
  to,
  children,
  isActive,
}: {
  to: string;
  children: React.ReactNode;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const shouldReduceMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const middleX = rect.left + rect.width / 2;
    const middleY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - middleX) * 0.15;
    const offsetY = (e.clientY - middleY) * 0.15;
    setPosition({
      x: Math.max(-3, Math.min(3, offsetX)),
      y: Math.max(-2, Math.min(2, offsetY)),
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.5 }}
      className="relative flex items-center"
    >
      <Link
        to={to}
        aria-current={isActive ? 'page' : undefined}
        className={`relative inline-flex items-center px-3.5 py-2 rounded-xl text-[14px] xl:text-[15px] font-semibold tracking-wider uppercase transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-labx-violet/70 ${
          isActive
            ? 'text-white drop-shadow-[0_0_12px_rgba(124,58,237,0.6)]'
            : 'text-zinc-400 hover:text-white hover:-translate-y-0.5'
        }`}
      >
        {/* Subtle hover background highlight */}
        <span className="absolute inset-0 rounded-xl bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

        {/* Text */}
        <span className="relative z-10 transition-colors duration-200">{children}</span>

        {/* Active Route Indicator (Animated Glide Line) */}
        {isActive && (
          <motion.div
            layoutId="navbar-active-indicator"
            className="absolute -bottom-1 left-2.5 right-2.5 h-[2.5px] rounded-full bg-gradient-to-r from-labx-violet via-pink-500 to-labx-cyan shadow-[0_0_12px_rgba(124,58,237,0.9)]"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const { notificationCount, setSearchOpen } = useApp();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  // Scroll listener for height transformation and scroll progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setScrollProgress(Math.min(100, Math.max(0, (scrollY / docHeight) * 100)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change during render
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setMobileOpen(false);
    setProfileDropdownOpen(false);
  }

  // Subtle mouse tracking for ambient light-follow zone
  const handleNavMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion) return;
    const rect = navRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <>
      <header
        ref={navRef}
        onMouseMove={handleNavMouseMove}
        onMouseLeave={handleNavMouseLeave}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'h-[68px] md:h-[72px] bg-[#05070f]/90 backdrop-blur-[20px] border-b border-white/[0.08] shadow-[0_12px_32px_-12px_rgba(0,0,0,0.7)]'
            : 'h-20 md:h-[84px] bg-[#05070f]/65 backdrop-blur-[16px] border-b border-white/[0.04]'
        }`}
      >
        {/* Subtle Interactive Ambient Light Follow */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-60 hidden md:block"
          style={{
            background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124, 58, 237, 0.09), transparent 80%)`,
          }}
        />

        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-10">
          {/* 1. Official LabX Logo with Ambient Glow Anchor */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="flex items-center gap-3"
          >
            <div className="relative group flex items-center">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-labx-violet/25 via-pink-500/10 to-labx-cyan/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <LabXLogo size={36} linkToHome animated />
            </div>
          </motion.div>

          {/* 2. Desktop Primary Navigation */}
          <motion.nav
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main navigation"
          >
            {NAV_ITEMS.map(item => (
              <MagneticNavLink
                key={item.path}
                to={item.path}
                isActive={isActive(item.path)}
              >
                {item.label}
              </MagneticNavLink>
            ))}
            <MagneticNavLink to="/about" isActive={isActive('/about')}>
              About
            </MagneticNavLink>
          </motion.nav>

          {/* 3. Secondary Actions & Auth Controls */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center gap-2.5 sm:gap-3"
          >
            {/* Command Center Shortcut Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-labx-violet/50 text-zinc-400 hover:text-white transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-labx-violet"
              aria-label="Open Command Center (Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-labx-cyan transition-colors" />
              <span className="hidden xl:inline text-xs font-medium">Command</span>
              <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono font-semibold bg-black/40 text-labx-violet px-1.5 py-0.5 rounded border border-white/10 group-hover:border-labx-violet/40 transition-colors">
                <span>⌘</span>
                <span>K</span>
              </kbd>
            </button>

            {/* Notifications Button (Authenticated) */}
            {isAuthenticated && (
              <Link
                to="/notifications"
                className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] border border-transparent hover:border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-labx-violet"
                aria-label={`Notifications (${notificationCount} unread)`}
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-labx-cyan opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-labx-cyan" />
                  </span>
                )}
              </Link>
            )}

            {/* Authenticated State */}
            {isAuthenticated && user ? (
              <div className="relative flex items-center gap-3">
                {/* Desktop Quick Action */}
                <Link
                  to="/dashboard"
                  className="hidden xl:inline-flex group relative items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-wider uppercase text-white bg-gradient-to-r from-labx-violet/70 to-purple-600/70 hover:from-labx-violet hover:to-purple-600 border border-white/10 hover:border-labx-violet/50 transition-all duration-200 shadow-sm shadow-labx-violet/20"
                >
                  <span>Open Hub</span>
                  <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>

                {/* Profile Avatar Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="relative flex items-center rounded-full p-0.5 ring-2 ring-white/10 hover:ring-labx-violet/60 hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-labx-violet"
                    aria-label="User profile and navigation menu"
                    aria-expanded={profileDropdownOpen}
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-white/10"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#05070f]" />
                  </button>

                  {/* Profile Glass Menu */}
                  <AnimatePresence>
                    {profileDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.18, ease: 'easeOut' }}
                        className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#0b0f19]/95 backdrop-blur-2xl border border-white/10 shadow-2xl py-2 z-50 overflow-hidden"
                      >
                        {/* User Identity Header */}
                        <div className="px-4 py-3 border-b border-white/[0.08] bg-white/[0.02]">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-white truncate">{user.name}</p>
                            <span className="text-[10px] font-bold text-labx-violet bg-labx-violet/10 border border-labx-violet/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              {user.role}
                            </span>
                          </div>
                          <p className="text-[11px] text-labx-cyan font-mono mt-0.5">
                            +{user.labxPoints} pts &bull; Level {user.level}
                          </p>
                        </div>

                        {/* Navigation Links */}
                        <div className="py-1">
                          <Link
                            to="/dashboard"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-labx-violet" />
                            <span>Innovation Hub</span>
                          </Link>
                          <Link
                            to="/profile"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <UserIcon className="w-3.5 h-3.5 text-labx-cyan" />
                            <span>Proof of Work</span>
                          </Link>
                          <Link
                            to="/my-projects"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <FolderGit2 className="w-3.5 h-3.5 text-pink-400" />
                            <span>My Builds &amp; Projects</span>
                          </Link>
                          <Link
                            to="/my-applications"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            <span>My Applications</span>
                          </Link>
                          <Link
                            to="/saved"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <Bookmark className="w-3.5 h-3.5 text-purple-400" />
                            <span>Saved Artifacts</span>
                          </Link>
                          <Link
                            to="/settings"
                            className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                          >
                            <Settings className="w-3.5 h-3.5 text-zinc-400" />
                            <span>Settings</span>
                          </Link>
                        </div>

                        {/* Sign Out Action */}
                        <div className="pt-1 border-t border-white/[0.08]">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              /* Unauthenticated State */
              <div className="flex items-center gap-2 sm:gap-3">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs sm:text-[14px] font-semibold text-zinc-400 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-labx-violet"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="group relative inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-[13px] font-bold tracking-wider uppercase text-white bg-gradient-to-r from-labx-violet via-purple-600 to-indigo-600 hover:brightness-110 active:scale-[0.98] transition-all duration-300 shadow-md shadow-labx-violet/25 hover:shadow-lg hover:shadow-labx-violet/40 border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-labx-violet"
                >
                  <span>Start Building</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-labx-violet"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
            </button>
          </motion.div>
        </div>

        {/* Scroll Progress Indicator Bar */}
        <div
          className="absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-labx-violet via-fuchsia-500 to-labx-cyan transition-all duration-75 pointer-events-none"
          style={{ width: `${scrollProgress}%` }}
        />
      </header>

      {/* Mobile Navigation Interface (Drawer / Command Layer) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="fixed inset-x-0 top-16 md:top-20 z-40 lg:hidden bg-[#070a14]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto p-5 space-y-5"
          >
            {/* Quick Command Trigger */}
            <button
              onClick={() => {
                setMobileOpen(false);
                setSearchOpen(true);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-zinc-300 text-xs font-semibold"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-labx-cyan" />
                <span>Search projects, mentors, startups...</span>
              </div>
              <kbd className="text-[10px] bg-black/40 px-2 py-0.5 rounded border border-white/10">⌘K</kbd>
            </button>

            {/* Primary Section */}
            <div>
              <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase px-1">
                Ecosystem Navigation
              </span>
              <div className="mt-2 space-y-1">
                {NAV_ITEMS.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors ${
                      isActive(item.path)
                        ? 'text-white bg-labx-violet/20 border border-labx-violet/30'
                        : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/about"
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold uppercase tracking-wider transition-colors ${
                    isActive('/about')
                      ? 'text-white bg-labx-violet/20 border border-labx-violet/30'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  About LabX
                </Link>
              </div>
            </div>

            {/* Auth / Workspace Section */}
            <div className="pt-2 border-t border-white/[0.08]">
              {isAuthenticated && user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-2 py-2">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full border border-white/15"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{user.name}</p>
                      <p className="text-[11px] text-labx-cyan font-mono">+{user.labxPoints} pts &bull; {user.role}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      to="/dashboard"
                      className="text-center py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-zinc-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/my-projects"
                      className="text-center py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-zinc-200"
                    >
                      My Builds
                    </Link>
                    <Link
                      to="/my-applications"
                      className="text-center py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-zinc-200"
                    >
                      Applications
                    </Link>
                    <Link
                      to="/saved"
                      className="text-center py-2.5 px-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-semibold text-zinc-200"
                    >
                      Saved
                    </Link>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2.5 rounded-xl text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 mt-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-1">
                  <Link
                    to="/login"
                    className="block text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-white/[0.04] border border-white/10"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-labx-violet via-purple-600 to-indigo-600 shadow-md shadow-labx-violet/30"
                  >
                    Start Building →
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
