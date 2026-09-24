/* oxlint-disable react/only-export-components */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, OnboardingData } from '../types';
import { useAuth } from './AuthContext';
import { notificationService } from '../services';

interface AppContextType {
  currentUser: User | null;
  isLoading: boolean;
  onboardingData: OnboardingData;
  setOnboardingData: (data: OnboardingData) => void;
  isOnboarded: boolean;
  setIsOnboarded: (v: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  notificationCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const { user, isLoading: authLoading } = useAuth();
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({ role: null, interests: [] });
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (user) {
      notificationService.getUnreadCount().then(setNotificationCount);
    }
  }, [user]);

  // Global keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser: user,
        isLoading: authLoading,
        onboardingData,
        setOnboardingData,
        isOnboarded,
        setIsOnboarded,
        searchOpen,
        setSearchOpen,
        notificationCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
