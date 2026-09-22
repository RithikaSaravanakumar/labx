import { Outlet } from 'react-router-dom';
import Navbar from '../components/navigation/Navbar';
import Footer from '../components/navigation/Footer';
import LabXCommandSearch from '../components/search/LabXCommandSearch';
import { useApp } from '../context/AppContext';

export default function MainLayout() {
  const { searchOpen, setSearchOpen } = useApp();

  return (
    <div className="min-h-screen bg-labx-bg flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <Footer />
      <LabXCommandSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
