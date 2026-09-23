import React from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LabXLogo from '../brand/LabXLogo';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4">
        <LabXLogo size="lg" animated />
        <div className="flex items-center gap-2 text-xs text-labx-text-muted mt-2">
          <div className="w-4 h-4 rounded-full border-2 border-labx-violet border-t-transparent animate-spin" />
          <span>Verifying LabX builder credentials...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    const returnUrl = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${returnUrl}`} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
