import React, { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from 'react';
import { onboardingApi } from '../api/onboarding/onboardingApi';
import type { OnboardingStateData } from '../api/onboarding/types';
import { useAuthSession } from './AuthSessionProvider';

interface OnboardingStateContextType {
  onboardingState: OnboardingStateData | null;
  isLoading: boolean;
  error: string | null;
  refreshState: () => Promise<void>;
}

const OnboardingStateContext = createContext<OnboardingStateContextType | undefined>(undefined);

export const OnboardingStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuthSession();
  const [onboardingState, setOnboardingState] = useState<OnboardingStateData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshState = useCallback(async () => {
    if (!isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await onboardingApi.getOnboardingState();
      if (response && response.data) {
        setOnboardingState(response.data);
      }
    } catch (err: unknown) {
      console.error('Failed to fetch onboarding state:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch onboarding state');
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refreshState();
  }, [refreshState]);

  // Set up polling if there are active runs
  useEffect(() => {
    let timeoutId: number;
    
    if (onboardingState?.progress?.runs_active && onboardingState.progress.runs_active > 0) {
      // Poll every 5 seconds if there are active runs
      timeoutId = window.setTimeout(() => {
        refreshState();
      }, 5000);
    }
    
    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [onboardingState, refreshState]);

  return (
    <OnboardingStateContext.Provider value={{ onboardingState, isLoading, error, refreshState }}>
      {children}
    </OnboardingStateContext.Provider>
  );
};

// Context and hook intentionally share this module.
// eslint-disable-next-line react-refresh/only-export-components
export const useOnboardingState = (): OnboardingStateContextType => {
  const context = useContext(OnboardingStateContext);
  if (context === undefined) {
    throw new Error('useOnboardingState must be used within an OnboardingStateProvider');
  }
  return context;
};
