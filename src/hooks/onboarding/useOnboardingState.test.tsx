import { renderHook, act } from '@testing-library/react';
import { useOnboardingState } from './useOnboardingState';
import { onboardingApi } from '../../api/onboarding/onboardingApi';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';

vi.mock('../../api/onboarding/onboardingApi', () => ({
  onboardingApi: {
    getOnboardingState: vi.fn(),
  },
}));

vi.mock('../../lib/auth', () => ({
  isAuthenticated: vi.fn(() => true),
  clearAuthData: vi.fn(),
}));

describe('useOnboardingState', () => {
  const mockedGetState = vi.mocked(onboardingApi.getOnboardingState);
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('polls exactly every 2.5s when runs_active > 0', async () => {
    // Mock response with runs_active = 1
    mockedGetState.mockResolvedValue({
      success: true,
      data: {
        progress: { runs_active: 1 },
      },
    } as Awaited<ReturnType<typeof onboardingApi.getOnboardingState>>);

    renderHook(() => useOnboardingState({ pollIntervalMs: 2500 }));

    // Wait for initial fetch to complete
    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    expect(onboardingApi.getOnboardingState).toHaveBeenCalledTimes(1);

    // Advance by 2.5 seconds exactly
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    expect(onboardingApi.getOnboardingState).toHaveBeenCalledTimes(2);
  });

  it('stops polling when runs_active reaches 0', async () => {
    mockedGetState.mockResolvedValue({
      success: true,
      data: {
        progress: { runs_active: 0 },
      },
    } as Awaited<ReturnType<typeof onboardingApi.getOnboardingState>>);

    renderHook(() => useOnboardingState({ pollIntervalMs: 2500 }));

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0);
    });

    const callCountAfterInitial = mockedGetState.mock.calls.length;

    // Advance by 2.5 seconds
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2500);
    });

    // Should NOT have been called again (count remains the same)
    expect(onboardingApi.getOnboardingState).toHaveBeenCalledTimes(callCountAfterInitial);
  });
});
