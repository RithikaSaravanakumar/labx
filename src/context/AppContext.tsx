import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, OnboardingData } from '../types';
import { userService } from '../services';

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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({ role: null, interests: [] });
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationCount] = useState(3);

  useEffect(() => {
    userService.getCurrentUser().then(user => {
      setCurrentUser(user);
      setIsLoading(false);
    });
  }, []);

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
        currentUser,
        isLoading,
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
