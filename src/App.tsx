import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import './index.css';

// Lazy-loaded pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const StartupsPage = lazy(() => import('./pages/StartupsPage'));
const StartupDetailPage = lazy(() => import('./pages/StartupDetailPage'));
const MentorsPage = lazy(() => import('./pages/MentorsPage'));
const MentorDetailPage = lazy(() => import('./pages/MentorDetailPage'));
const HackathonsPage = lazy(() => import('./pages/HackathonsPage'));
const HackathonDetailPage = lazy(() => import('./pages/HackathonDetailPage'));
const OpportunitiesPage = lazy(() => import('./pages/OpportunitiesPage'));
const IdeasPage = lazy(() => import('./pages/IdeasPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const BuildPage = lazy(() => import('./pages/BuildPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-labx-violet border-t-transparent animate-spin" />
        <p className="text-sm text-labx-text-muted">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/startups" element={<StartupsPage />} />
              <Route path="/startups/:id" element={<StartupDetailPage />} />
              <Route path="/mentors" element={<MentorsPage />} />
              <Route path="/mentors/:id" element={<MentorDetailPage />} />
              <Route path="/hackathons" element={<HackathonsPage />} />
              <Route path="/hackathons/:id" element={<HackathonDetailPage />} />
              <Route path="/opportunities" element={<OpportunitiesPage />} />
              <Route path="/ideas" element={<IdeasPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/build" element={<BuildPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </Suspense>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
