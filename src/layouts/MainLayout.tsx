import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import PageProgressBar from '../components/navigation/PageProgressBar';
import LabXCommandSearch from '../components/search/LabXCommandSearch';
import { useApp } from '../context/AppContext';

export default function MainLayout() {
  const { searchOpen, setSearchOpen } = useApp();

  return (
    <div className="min-h-screen bg-labx-bg flex flex-col">
      {/* Strikes across top of viewport on every route change */}
      <PageProgressBar />
      <Navbar />
      <main className="flex-1 pt-20 md:pt-24">
        <Outlet />
      </main>
      <Footer />
      <LabXCommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

