import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Search, Bell, Menu } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import LabXLogo from '../brand/LabXLogo';
import LabXHub from './LabXHub';
import NotificationDrawer from './NotificationDrawer';

/**
 * Magnetic Navigation Link Component (Desktop)
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
        className={`relative inline-flex items-center px-3.5 py-2 rounded-xl text-[14px] xl:text-[15px] font-semibold tracking-wider uppercase transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
          isActive
            ? 'text-white drop-shadow-[0_0_12px_rgba(0,255,135,0.7)]'
            : 'text-zinc-400 hover:text-[#00FF87] hover:-translate-y-0.5'
        }`}
      >
        <span className="absolute inset-0 rounded-xl bg-white/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
        <span className="relative z-10 transition-colors duration-200">{children}</span>
        {isActive && (
          <motion.div
            layoutId="navbar-active-indicator"
            className="absolute -bottom-1 left-2.5 right-2.5 h-[2.5px] rounded-full bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#34D399] shadow-[0_0_14px_rgba(0,255,135,0.95)]"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const { notificationCount, setSearchOpen } = useApp();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const navRef = useRef<HTMLElement>(null);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Drawers State
  const [hubOpen, setHubOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setHubOpen(false);
    setNotificationsOpen(false);
  }

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

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        ref={navRef}
        onMouseMove={handleNavMouseMove}
        onMouseLeave={handleNavMouseLeave}
        className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${
          isScrolled
            ? 'h-[64px] md:h-[68px] bg-[#040705]/94 backdrop-blur-[24px] border-b border-emerald-500/10 shadow-[0_12px_32px_-12px_rgba(0,0,0,0.9)]'
            : 'h-16 md:h-[76px] bg-[#040705]/70 backdrop-blur-[16px] border-b border-transparent'
        }`}
      >
        {/* Subtle Interactive Ambient Light Follow (Green) */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-60 hidden md:block"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 255, 135, 0.08), transparent 80%)`,
          }}
        />

        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between relative z-10">
          
          {/* LEFT: Logo */}
          <div className="flex items-center gap-8">
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <LabXLogo size="md" linkToHome showGlow />
            </motion.div>

            {/* CENTER: Minimal Primary Navigation (Desktop Only) */}
            <motion.nav
              initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.05, ease: 'easeOut' }}
              className="hidden lg:flex items-center gap-2"
              aria-label="Main navigation"
            >
              <MagneticNavLink to="/discover" isActive={isActive('/discover')}>
                Discover
              </MagneticNavLink>
              <MagneticNavLink to="/feed" isActive={isActive('/feed')}>
                Feed
              </MagneticNavLink>
            </motion.nav>
          </div>

          {/* RIGHT: Ecosystem Controls */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: 'easeOut' }}
            className="flex items-center gap-2 sm:gap-3"
          >
            {/* Command Center Shortcut Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-emerald-400/40 text-zinc-400 hover:text-white transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Open Command Center (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-zinc-400 group-hover:text-[#00FF87] transition-colors" />
              <span className="hidden xl:inline text-[13px] font-medium">Search</span>
              <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono font-semibold bg-black/40 text-zinc-400 group-hover:text-[#00FF87] px-1.5 py-0.5 rounded border border-white/5 group-hover:border-emerald-400/30 transition-colors">
                <span>⌘</span>
                <span>K</span>
              </kbd>
            </button>

            {/* Notifications Button (Authenticated) */}
            {isAuthenticated && (
              <button
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-label={`Open notifications (${notificationCount} unread)`}
                aria-expanded={notificationsOpen}
              >
                <Bell className="w-5 h-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]" />
                  </span>
                )}
              </button>
            )}

            {/* Hamburger: LabX Hub */}
            <button
              onClick={() => setHubOpen(true)}
              className="p-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              aria-label="Open LabX Hub"
              aria-expanded={hubOpen}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Auth / Build CTA (Desktop Only) */}
            <div className="hidden lg:flex items-center ml-2 pl-4 border-l border-white/10 gap-3">
              {!isAuthenticated && (
                <div className="flex items-center gap-3 mr-2">
                  <Link
                    to="/login"
                    className="text-sm font-bold text-zinc-300 hover:text-white transition-colors whitespace-nowrap"
                  >
                    Sign In
                  </Link>
                </div>
              )}
              <Link
                to={isAuthenticated ? "/projects/new" : "/signup"}
                className="inline-flex items-center justify-center px-5 py-2 rounded-xl bg-gradient-to-r from-[#00FF87] via-[#10B981] to-[#34D399] text-black font-black text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,255,135,0.3)] hover:shadow-[0_0_20px_rgba(0,255,135,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#040705] whitespace-nowrap"
              >
                {isAuthenticated ? "Build" : "Sign Up"}
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      {/* LabX Hub Drawer */}
      <LabXHub isOpen={hubOpen} onClose={() => setHubOpen(false)} />

      {/* Notification Drawer */}
      <NotificationDrawer isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
    </>
  );
}
