import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { OnboardingStateResponse } from './types';

export const onboardingApi = {
  /**
   * Fetch onboarding state (authenticated)
   * GET /api/v1/onboarding/state
   */
  getOnboardingState: async (customEndpoint?: string): Promise<OnboardingStateResponse> => {
    const endpoint = customEndpoint || API_ENDPOINTS.ONBOARDING.STATE;
    const response = await apiClient.get<OnboardingStateResponse>(endpoint);
    return response.data;
  },
};

export default onboardingApi;
