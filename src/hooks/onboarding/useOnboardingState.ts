import { useState, useEffect, useRef, useCallback } from 'react';
import { onboardingApi } from '../../api/onboarding/onboardingApi';
import { clearAuthData, isAuthenticated } from '../../lib/auth';
import type { OnboardingStateData } from '../../api/onboarding/types';

interface UseOnboardingStateOptions {
  customEndpoint?: string;
  pollIntervalMs?: number;
  enabled?: boolean;
}

export const useOnboardingState = ({
  customEndpoint,
  pollIntervalMs = 2500,
  enabled = true,
}: UseOnboardingStateOptions = {}) => {
  const [data, setData] = useState<OnboardingStateData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const isFetchingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchState = useCallback(async () => {
    if (isFetchingRef.current || !isAuthenticated()) return;
    isFetchingRef.current = true;

    try {
      const result = await onboardingApi.getOnboardingState(customEndpoint);
      
      if (!result.success) {
        throw new Error('Onboarding state fetch returned success: false');
      }

      setData(result.data);
      setError(null);
      setIsLoading(false);

      // Check if ingestion is still processing based on active runs
      const runsActive = result.data.progress?.runs_active || 0;

      if (runsActive > 0) {
        timerRef.current = setTimeout(fetchState, pollIntervalMs);
      }
    } catch (err: unknown) {
      setIsLoading(false);
      const is401 = (err as { response?: { status?: number } })?.response?.status === 401;

      if (is401) {
        clearAuthData();
        setError(new Error('Session expired. Please sign in again.'));
      } else {
        setError(err instanceof Error ? err : new Error('Failed to load onboarding state'));
        // bounded retry on network errors
        timerRef.current = setTimeout(fetchState, 5000);
      }
    } finally {
      isFetchingRef.current = false;
    }
  }, [customEndpoint, pollIntervalMs]);

  useEffect(() => {
    if (!enabled || !isAuthenticated()) {
      setIsLoading(false);
      return;
    }

    fetchState();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [enabled, fetchState]);

  return {
    data,
    isLoading,
    error,
    refetch: fetchState,
  };
};

export default useOnboardingState;
