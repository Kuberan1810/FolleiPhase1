import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { getAccessToken, getUserInfo, clearAuthData, type AuthTokens } from '../lib/auth';

interface AuthSessionContextType {
  isAuthenticated: boolean;
  user: any | null;
  login: (data: AuthTokens) => void;
  logout: () => void;
}

const AuthSessionContext = createContext<AuthSessionContextType | undefined>(undefined);

export const AuthSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getAccessToken());
  const [user, setUser] = useState<any | null>(getUserInfo());

  const login = (data: AuthTokens) => {
    setIsAuthenticated(true);
    setUser(data.user || null);
  };

  const logout = () => {
    clearAuthData();
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('follei:unauthorized', handleUnauthorized);
    
    return () => {
      window.removeEventListener('follei:unauthorized', handleUnauthorized);
    };
  }, []);

  return (
    <AuthSessionContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthSessionContext.Provider>
  );
};

export const useAuthSession = (): AuthSessionContextType => {
  const context = useContext(AuthSessionContext);
  if (context === undefined) {
    throw new Error('useAuthSession must be used within an AuthSessionProvider');
  }
  return context;
};

