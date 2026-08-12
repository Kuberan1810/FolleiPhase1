import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { OnboardingStateResponse, CategoryItemsResponse } from './types';

export const onboardingApi = {
  /**
   * Fetch onboarding state (authenticated)
   * GET /api/v1/onboarding/state
   */
  getOnboardingState: async (customEndpoint?: string): Promise<OnboardingStateResponse> => {
    const endpoint = customEndpoint || API_ENDPOINTS.ONBOARDING.STATE;
    const response = await apiClient.get<OnboardingStateResponse>(endpoint, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
    return response.data;
  },

  /**
   * Fetch paginated category items (authenticated)
   * GET /api/v1/onboarding/categories/{key}/items
   */
  getCategoryItems: async (endpoint: string, page: number = 1, pageSize: number = 25): Promise<CategoryItemsResponse> => {
    const response = await apiClient.get<CategoryItemsResponse>(endpoint, {
      params: {
        page,
        page_size: pageSize,
      },
      headers: {
        'Cache-Control': 'no-store',
      },
    });
    return response.data;
  },

  /**
   * Update User Profile (authenticated)
   * PATCH /api/v1/onboarding/user-profile
   */
  updateUserProfile: async (data: any): Promise<any> => {
    const response = await apiClient.patch('/api/v1/onboarding/user-profile', data);
    return response.data;
  },

  /**
   * Create Company Profile (authenticated)
   * POST /api/v1/onboarding/profile
   */
  createCompanyProfile: async (data: any): Promise<any> => {
    const response = await apiClient.post('/api/v1/onboarding/profile', data);
    return response.data;
  },

  /**
   * Review Category Item
   * PATCH /api/v1/onboarding/items/{item_id}/review
   */
  reviewCategoryItem: async (itemId: string, data: any): Promise<any> => {
    const response = await apiClient.patch(`/api/v1/onboarding/items/${itemId}/review`, data);
    return response.data;
  },

  /**
   * Reject Category Item
   * POST /api/v1/onboarding/items/{item_id}/reject
   */
  rejectCategoryItem: async (itemId: string, data: any): Promise<any> => {
    const response = await apiClient.post(`/api/v1/onboarding/items/${itemId}/reject`, data);
    return response.data;
  },
};

export default onboardingApi;
