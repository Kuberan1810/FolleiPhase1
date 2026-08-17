import { useCallback, useEffect, useState } from 'react';
import { onboardingApi } from '../../api/onboarding/onboardingApi';
import { clearAuthData, isAuthenticated } from '../../lib/auth';
import type { OnboardingStateData } from '../../api/onboarding/types';

interface UseOnboardingStateOptions {
  customEndpoint?: string;
  pollIntervalMs?: number;
  enabled?: boolean;
}

export const useOnboardingState = ({
  pollIntervalMs = 2500,
  enabled = true,
}: UseOnboardingStateOptions = {}) => {
  const [data, setData] = useState<OnboardingStateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchState = useCallback(async () => {
    if (!isAuthenticated()) return;
    try {
      const result = await onboardingApi.getOnboardingState();
      if (!result.success) throw new Error('Onboarding state fetch returned success: false');
      setData(result.data);
      setError(null);
    } catch (caught: unknown) {
      const is401 = (caught as { response?: { status?: number } })?.response?.status === 401;
      if (is401) {
        clearAuthData();
        setError(new Error('Session expired. Please sign in again.'));
      } else {
        setError(caught instanceof Error ? caught : new Error('Failed to load onboarding state'));
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled || !isAuthenticated()) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchState();
  }, [enabled, fetchState]);

  useEffect(() => {
    if (!enabled || !data?.progress?.runs_active) return;
    const timer = window.setTimeout(() => void fetchState(), pollIntervalMs);
    return () => window.clearTimeout(timer);
  }, [data?.progress?.runs_active, enabled, fetchState, pollIntervalMs]);

  return { data, isLoading, error, refetch: fetchState };
};

export default useOnboardingState;
