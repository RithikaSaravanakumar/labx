import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LabXLogo from './components/brand/LabXLogo';
import './index.css';

// Lazy-loaded public pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
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
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

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

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <LabXLogo size="lg" animated />
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full border-2 border-labx-violet border-t-transparent animate-spin" />
          <p className="text-xs text-labx-text-muted font-medium">Entering Innovation Ecosystem...</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route element={<MainLayout />}>
                {/* Public Discovery Routes */}
                <Route path="/" element={<LandingPage />} />
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
                <Route path="/profile/:username" element={<ProfilePage />} />

                {/* Authentication Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Protected Workspace Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/build" element={<BuildPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/notifications" element={<NotificationsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/my-projects" element={<MyProjectsPage />} />
                  <Route path="/my-applications" element={<MyApplicationsPage />} />
                  <Route path="/saved" element={<SavedItemsPage />} />
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
