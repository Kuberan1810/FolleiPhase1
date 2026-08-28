/**
 * The single axios instance every API module uses, with two interceptors:
 *
 *  request  -> attaches the bearer token
 *  response -> unwraps FastAPI errors, and transparently refreshes an expired
 *              access token once before giving up
 */

import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';
import { clearSession, getAccessToken, getRefreshToken, storeSession, type TokenPair } from './auth';

// Empty in dev: vite proxies /api to FastAPI, so requests stay same-origin.
// A trailing slash here would produce '//api/...' against the backend.
const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  // Long enough for the LLM-backed endpoints (requirements and sales-package
  // generation run several model calls); short enough to surface a hung
  // backend rather than spinning forever.
  timeout: 120_000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/** FastAPI puts the message in `detail`, which is a string for HTTPException
 *  and an array of field errors for a 422. Both need flattening before any UI
 *  can render them. */
export const errorMessage = (error: unknown, fallback = 'Something went wrong'): string => {
  if (!axios.isAxiosError(error)) return error instanceof Error ? error.message : fallback;
  const detail = error.response?.data?.detail;
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    const first = detail[0];
    if (first?.msg) {
      const field = Array.isArray(first.loc) ? first.loc[first.loc.length - 1] : undefined;
      return field ? `${field}: ${first.msg}` : first.msg;
    }
  }
  const message = error.response?.data?.message;
  if (typeof message === 'string') return message;

  const status = error.response?.status;
  if (status === 502 || status === 503) {
    return 'Backend server is unreachable (502 Bad Gateway). Please make sure the backend server is running.';
  }
  if (status === 504) {
    return 'Server gateway timed out (504). Please try again in a moment.';
  }
  if (status === 500) {
    return 'Internal server error (500). Please try again later.';
  }
  if (status === 401) {
    return 'Invalid email or password. Please check your credentials.';
  }
  if (status === 403) {
    return 'Access forbidden. You do not have permission.';
  }
  if (status === 409) {
    return 'An account with this email already exists.';
  }

  if (error.code === 'ECONNABORTED') return 'The request timed out. The server may still be working.';
  if (!error.response) return 'Could not reach the server. Is the backend running?';
  return error.message || fallback;
};

// A single in-flight refresh shared by every request that 401s at the same
// time. Without this, a page issuing four parallel calls would fire four
// refreshes and three of them would rotate a token already replaced.
let refreshInFlight: Promise<string> | null = null;

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) throw new Error('No refresh token');
  // A bare axios call, not `api` -- going through the instance would re-enter
  // this interceptor and recurse if the refresh itself 401s.
  const { data } = await axios.post<TokenPair>(`${BASE_URL}/api/auth/refresh`, {
    refresh_token: refreshToken,
  });
  storeSession(data);
  return data.access_token;
};

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as (AxiosRequestConfig & { _retried?: boolean }) | undefined;

    const isAuthCall = original?.url?.includes('/api/auth/');
    if (error.response?.status !== 401 || !original || original._retried || isAuthCall) {
      return Promise.reject(error);
    }

    original._retried = true;
    try {
      refreshInFlight = refreshInFlight ?? refreshAccessToken();
      const token = await refreshInFlight;
      original.headers = { ...original.headers, Authorization: `Bearer ${token}` };
      return api.request(original);
    } catch (refreshError) {
      // The refresh token is gone or rejected: this session is over.
      clearSession();
      if (window.location.pathname !== '/signin') window.location.assign('/signin');
      return Promise.reject(refreshError);
    } finally {
      refreshInFlight = null;
    }
  },
);

export default api;
