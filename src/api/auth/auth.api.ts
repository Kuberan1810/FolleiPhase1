/** Auth endpoints. Mirrors app/domains/auth/router.py. */

import api from '../../lib/axios';
import { clearSession, storeSession, type AuthUser, type TokenPair } from '../../lib/auth';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
}

export const login = async (payload: LoginPayload): Promise<TokenPair> => {
  const { data } = await api.post<TokenPair>('/api/auth/login', payload);
  storeSession(data);
  return data;
};

export const register = async (payload: RegisterPayload): Promise<TokenPair> => {
  const { data } = await api.post<TokenPair>('/api/auth/register', payload);
  storeSession(data);
  return data;
};

export const getMe = async (): Promise<AuthUser> => {
  const { data } = await api.get<AuthUser>('/api/auth/me');
  return data;
};

/** The backend has no logout endpoint -- tokens are stateless, so signing out
 *  is purely a client-side discard. */
export const logout = (): void => clearSession();

/** Google OAuth is a redirect flow. The backend generates the anti-CSRF state
 *  and hands back the authorize URL; the browser then leaves the SPA entirely,
 *  so this returns the URL rather than navigating itself. */
export const getGoogleAuthorizationUrl = async (): Promise<string> => {
  const { data } = await api.get<{ authorization_url: string }>('/api/auth/google/start');
  return data.authorization_url;
};

/** After Google redirects back, the callback hands over a one-time exchange
 *  code which is traded for the real token pair. */
export const exchangeGoogleCode = async (exchangeCode: string): Promise<TokenPair> => {
  const { data } = await api.post<TokenPair>('/api/auth/google/exchange', {
    exchange_code: exchangeCode,
  });
  storeSession(data);
  return data;
};
