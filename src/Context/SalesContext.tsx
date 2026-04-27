import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type SalesMode = 'presales' | 'postsales';

interface SalesContextType {
  salesMode: SalesMode;
  setSalesMode: (mode: SalesMode) => void;
}

const SalesContext = createContext<SalesContextType | undefined>(undefined);

export const SalesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getModeFromUrl = (path: string): SalesMode => {
    return path.includes('/postsales') ? 'postsales' : 'presales';
  };

  const [salesMode, setSalesModeState] = useState<SalesMode>(getModeFromUrl(location.pathname));

  useEffect(() => {
    const newMode = getModeFromUrl(location.pathname);
    if (newMode !== salesMode) {
      setSalesModeState(newMode);
    }
  }, [location.pathname]);

  const setSalesMode = (mode: SalesMode) => {
    const currentPath = location.pathname;
    const currentMode = getModeFromUrl(currentPath);
    
    if (mode !== currentMode) {
      // Logic to swap the mode segment in the URL
      let newPath;
      if (currentPath.includes(currentMode)) {
        newPath = currentPath.replace(currentMode, mode);
      } else {
        // Fallback if URL doesn't have mode (shouldn't happen with our new routes)
        newPath = `/${mode}${currentPath}`;
      }
      navigate(newPath);
    }
  };

  return (
    <SalesContext.Provider value={{ salesMode, setSalesMode }}>
      {children}
    </SalesContext.Provider>
  );
};

export const useSalesContext = () => {
  const context = useContext(SalesContext);
  if (context === undefined) {
    throw new Error('useSalesContext must be used within a SalesProvider');
  }
  return context;
};
