import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import { clearAuthData, isAuthenticated } from '../lib/auth';

interface SessionContextType {
  isAuth: boolean;
  logout: () => void;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(isAuthenticated());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    clearAuthData();
    setIsAuth(false);
    navigate('/auth/signIn');
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('follei:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('follei:unauthorized', handleUnauthorized);
    };
  }, [navigate]);

  useEffect(() => {
    // Re-check auth status on mount and route change
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);
    setIsLoading(false);
  }, [location.pathname]);

  return (
    <SessionContext.Provider value={{ isAuth, logout, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

// Route Guard Component
export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuth, isLoading } = useSession();
  const location = useLocation();

  if (isLoading) {
    return null; // Or a loading spinner
  }

  if (!isAuth) {
    // Redirect them to the login page, but save the current location they were trying to go to
    return <Navigate to="/auth/signIn" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
