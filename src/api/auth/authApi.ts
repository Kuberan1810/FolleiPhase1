import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { RegisterPayload, RegisterResponse } from './types';

export interface LoginResponse extends RegisterResponse {
  user: {
    id: string;
    email: string;
    full_name: string;
    tenant_id: string;
    roles: string[];
  };
}

export const authApi = {
  /**
   * Register a new user & tenant
   * POST /api/v1/auth/register
   */
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload
    );
    return response.data;
  },
  login: async (email: string, password: string): Promise<LoginResponse> =>
    (await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, { email, password })).data,
  me: async (): Promise<LoginResponse['user']> =>
    (await apiClient.get<LoginResponse['user']>(API_ENDPOINTS.AUTH.ME)).data,
};

export default authApi;
