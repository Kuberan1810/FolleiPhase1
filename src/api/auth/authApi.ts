import { apiClient } from '../client';
import { API_ENDPOINTS } from '../endpoints';
import type { RegisterPayload, RegisterResponse } from './types';
import type { GoogleAuthStartResponse, GoogleAuthExchangeResponse } from './googleTypes';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const authApi = {
  /**
   * Register a new user & tenant
   * POST /api/auth/register
   */
  register: async (payload: RegisterPayload): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload
    );
    return response.data;
  },

  /**
   * Public Google Auth Start flow (unauthenticated)
   * GET /api/auth/google/start
   */
  startGoogleAuth: async (): Promise<GoogleAuthStartResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/api/auth/google/start`,
      {
        method: "GET",
        cache: "no-store",
        credentials: "omit"
      }
    );

    let payload: unknown;

    try {
      payload = await response.json();
    } catch {
      throw new Error(`Google authentication returned HTTP ${response.status}`);
    }

    if (!response.ok) {
      const detail =
        typeof payload === "object" &&
        payload !== null &&
        "detail" in payload &&
        typeof payload.detail === "string"
          ? payload.detail
          : "Could not start Google authentication";

      throw new Error(detail);
    }

    return payload as GoogleAuthStartResponse;
  },

  /**
   * Exchange Google one-time code for Follei JWT (unauthenticated)
   * POST /api/auth/google/exchange
   */
  exchangeGoogleCode: async (exchangeCode: string): Promise<GoogleAuthExchangeResponse> => {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.AUTH.GOOGLE_EXCHANGE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({ exchange_code: exchangeCode }),
      cache: 'no-store',
    });

    const payload = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(payload?.detail || payload?.message || 'Failed to exchange authentication code');
    }

    return payload;
  },
};

export default authApi;

