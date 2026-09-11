/**
 * Account session state.
 *
 * Access tokens are short-lived (30 minutes) and refresh tokens rotate on every
 * use, so both live in localStorage: a page reload must not sign the user out,
 * and a stolen refresh token is usable at most once before the server revokes
 * it. Nothing else about the account is cached here.
 */

const ACCESS_KEY = 'coirei.access_token';
const REFRESH_KEY = 'coirei.refresh_token';
const USER_KEY = 'coirei.user';

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  picture?: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
}

/** Storage throws in private windows and when site data is blocked. */
const read = (key: string): string | null => {
  try { return localStorage.getItem(key); } catch { return null; }
};
const write = (key: string, value: string) => {
  try { localStorage.setItem(key, value); } catch { /* storage unavailable */ }
};
const drop = (key: string) => {
  try { localStorage.removeItem(key); } catch { /* storage unavailable */ }
};

export const getAccessToken = () => read(ACCESS_KEY);
export const getRefreshToken = () => read(REFRESH_KEY);

export const getStoredUser = (): AuthUser | null => {
  const raw = read(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    drop(USER_KEY);
    return null;
  }
};

export const storeSession = (tokens: TokenPair): void => {
  write(ACCESS_KEY, tokens.access_token);
  write(REFRESH_KEY, tokens.refresh_token);
  if (tokens.user) write(USER_KEY, JSON.stringify(tokens.user));
};

export const storeTokens = (access: string, refresh: string): void => {
  write(ACCESS_KEY, access);
  write(REFRESH_KEY, refresh);
};

export const clearSession = (): void => {
  [ACCESS_KEY, REFRESH_KEY, USER_KEY].forEach(drop);
};

export const isSignedIn = () => Boolean(getAccessToken());
