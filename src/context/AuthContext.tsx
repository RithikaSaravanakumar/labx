/* oxlint-disable react/only-export-components */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, UserRole, AuthCredentials, SignupFormData, DemoPersona } from '../types';
import { authService, DEMO_PERSONAS } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<User>;
  loginWithDemo: (role: UserRole) => Promise<User>;
  signup: (data: SignupFormData) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  demoPersonas: DemoPersona[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const current = await authService.getCurrentUser();
      setUser(current);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    authService.getCurrentUser().then((current) => {
      if (isMounted) {
        setUser(current);
        setIsLoading(false);
      }
    }).catch(() => {
      if (isMounted) {
        setUser(null);
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (credentials: AuthCredentials): Promise<User> => {
    setIsLoading(true);
    try {
      const loggedIn = await authService.login(credentials);
      setUser(loggedIn);
      return loggedIn;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithDemo = async (role: UserRole): Promise<User> => {
    setIsLoading(true);
    try {
      const demoUser = await authService.loginWithDemo(role);
      setUser(demoUser);
      return demoUser;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupFormData): Promise<User> => {
    setIsLoading(true);
    try {
      const newUser = await authService.signup(data);
      setUser(newUser);
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithDemo,
        signup,
        logout,
        refreshUser,
        demoPersonas: DEMO_PERSONAS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
