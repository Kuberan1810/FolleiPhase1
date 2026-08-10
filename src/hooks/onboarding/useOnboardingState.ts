import { useState, useEffect, useRef, useCallback } from 'react';
import { onboardingApi } from '../../api/onboarding/onboardingApi';
import { clearAuthData, isAuthenticated } from '../../lib/auth';
import type { OnboardingStateResponse } from '../../api/onboarding/types';

interface UseOnboardingStateOptions {
  customEndpoint?: string;
  initialPollIntervalMs?: number;
  maxPollIntervalMs?: number;
  enabled?: boolean;
}

export const useOnboardingState = ({
  customEndpoint,
  initialPollIntervalMs = 2000,
  maxPollIntervalMs = 5000,
  enabled = true,
}: UseOnboardingStateOptions = {}) => {
  const [data, setData] = useState<OnboardingStateResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const isFetchingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentIntervalRef = useRef(initialPollIntervalMs);

  const fetchState = useCallback(async () => {
    if (isFetchingRef.current || !isAuthenticated()) return;
    isFetchingRef.current = true;

    try {
      const result = await onboardingApi.getOnboardingState(customEndpoint);
      setData(result);
      setError(null);
      setIsLoading(false);

      // Check if ingestion is still processing
      const isInProgress =
        result.ingestion_status === 'queued' ||
        result.ingestion_status === 'processing' ||
        result.sources?.some((s) => s.status === 'queued' || s.status === 'processing');

      if (isInProgress) {
        // Backoff interval up to maxPollIntervalMs
        currentIntervalRef.current = Math.min(
          currentIntervalRef.current + 1000,
          maxPollIntervalMs
        );
        timerRef.current = setTimeout(fetchState, currentIntervalRef.current);
      }
    } catch (err: unknown) {
      setIsLoading(false);
      const is401 = (err as { response?: { status?: number } })?.response?.status === 401;

      if (is401) {
        clearAuthData();
        setError(new Error('Session expired. Please sign in again.'));
      } else {
        setError(err instanceof Error ? err : new Error('Failed to load onboarding state'));
        // Bounded retry on network errors
        currentIntervalRef.current = maxPollIntervalMs;
        timerRef.current = setTimeout(fetchState, currentIntervalRef.current);
      }
    } finally {
      isFetchingRef.current = false;
    }
  }, [customEndpoint, maxPollIntervalMs]);

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
