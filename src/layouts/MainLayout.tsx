import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import PageProgressBar from '../components/navigation/PageProgressBar';
import LabXCommandSearch from '../components/search/LabXCommandSearch';
import { useApp } from '../context/AppContext';

export default function MainLayout() {
  const { searchOpen, setSearchOpen } = useApp();

  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  return (
    <div className="min-h-screen bg-labx-bg flex flex-col">
      {/* Strikes across top of viewport on every route change */}
      <PageProgressBar />
      <Navbar />
      <main className="flex-1 pt-20 md:pt-24 relative">
        <AnimatePresence mode="wait">
          <div key={location.pathname} className="h-full w-full">
            <Outlet />
          </div>
        </AnimatePresence>
      </main>
      <Footer />
      <LabXCommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

