/**
 * Token storage. Kept in one place so the axios interceptor, the auth hooks,
 * and the router all agree on where credentials live.
 *
 * localStorage rather than memory: a page refresh must not sign the user out.
 * That does mean tokens are readable by any script on the origin, so the
 * backend keeps access tokens short-lived and rotates them via /auth/refresh.
 */

const ACCESS_TOKEN_KEY = 'follei.access_token';
const REFRESH_TOKEN_KEY = 'follei.refresh_token';
const USER_KEY = 'follei.user';

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: AuthUser;
}

export const getAccessToken = (): string | null => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = (): string | null => localStorage.getItem(REFRESH_TOKEN_KEY);

export const getStoredUser = (): AuthUser | null => {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    // A corrupted entry should sign the user out cleanly rather than crash
    // every render that reads it.
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const storeSession = (tokens: TokenPair): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, tokens.access_token);
  localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refresh_token);
  localStorage.setItem(USER_KEY, JSON.stringify(tokens.user));
};

export const clearSession = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const isAuthenticated = (): boolean => Boolean(getAccessToken());
