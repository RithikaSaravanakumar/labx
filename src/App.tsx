import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LabXLogo from './components/brand/LabXLogo';
import { useAuth } from './context/AuthContext';
import ScrollToTop from './components/navigation/ScrollToTop';
import './index.css';

// Lazy-loaded public pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const CreateProjectPage = lazy(() => import('./pages/CreateProjectPage'));
const StartupsPage = lazy(() => import('./pages/StartupsPage'));
const StartupDetailPage = lazy(() => import('./pages/StartupDetailPage'));
const MentorsPage = lazy(() => import('./pages/MentorsPage'));
const MentorDetailPage = lazy(() => import('./pages/MentorDetailPage'));
const HackathonsPage = lazy(() => import('./pages/HackathonsPage'));
const HackathonDetailPage = lazy(() => import('./pages/HackathonDetailPage'));
const OpportunitiesPage = lazy(() => import('./pages/OpportunitiesPage'));
const IdeasPage = lazy(() => import('./pages/IdeasPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NetworkPage = lazy(() => import('./pages/NetworkPage'));
const FeedPage = lazy(() => import('./pages/FeedPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));

// Lazy-loaded auth pages
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));

// Lazy-loaded protected pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const BuildPage = lazy(() => import('./pages/BuildPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const MyProjectsPage = lazy(() => import('./pages/MyProjectsPage'));
const MyApplicationsPage = lazy(() => import('./pages/MyApplicationsPage'));
const SavedItemsPage = lazy(() => import('./pages/SavedItemsPage'));
const QuestsPage = lazy(() => import('./pages/QuestsPage'));

function PageLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#05060A] z-[999]">
      {/* Ambient glow orbs — cyan/violet */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-[#22D3EE]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-[#7C3AED]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="flex flex-col items-center gap-6 relative z-10">
        {/* Official LabX logo */}
        <LabXLogo size="2xl" animate showGlow />

        {/* Loading indicator */}
        <div className="flex items-center gap-2.5 mt-2">
          <div className="w-4 h-4 rounded-full border-2 border-[#22D3EE] border-t-transparent animate-spin" />
          <p className="text-xs font-mono text-labx-text-muted tracking-widest uppercase">
            Initializing Innovation Ecosystem...
          </p>
        </div>

        {/* Loading bar — cyan */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#22D3EE] to-[#7C3AED] rounded-full"
            style={{ width: '60%', animation: 'labx-load 1.4s ease-in-out infinite' }}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * SmartHome — redirects authenticated users to /dashboard, keeps guests on /
 */
function SmartHome() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <PageLoader />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <LandingPage />;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <AppProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<SmartHome />} />
                <Route path="/about" element={<AboutPage />} />
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
                {/* Public profile — /profile/:username */}
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/network" element={<NetworkPage />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Protected Workspace Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/build" element={<BuildPage />} />
                  <Route path="/feed" element={<FeedPage />} />
                  <Route path="/roadmap" element={<RoadmapPage />} />
                  {/* Own profile — /profile → authenticated user */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/my-projects" element={<MyProjectsPage />} />
                  <Route path="/my-applications" element={<MyApplicationsPage />} />
                  <Route path="/saved" element={<SavedItemsPage />} />
                  <Route path="/projects/new" element={<CreateProjectPage />} />
                  {/* Quest System */}
                  <Route path="/quests" element={<QuestsPage />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
