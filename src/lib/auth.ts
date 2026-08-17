export interface AuthUser {
  id?: string;
  email?: string;
  full_name?: string;
  tenant_id?: string;
  roles?: string[];
}

export interface AuthTokens {
  access_token: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  user_id?: string;
  tenant_id?: string;
  user?: AuthUser;
}

const ACCESS_TOKEN_KEY = 'follei_access_token';
const REFRESH_TOKEN_KEY = 'follei_refresh_token';
const USER_ID_KEY = 'follei_user_id';
const TENANT_ID_KEY = 'follei_tenant_id';
const USER_INFO_KEY = 'follei_user_info';
const TOKEN_EXPIRY_KEY = 'follei_token_expiry';

export const getAccessToken = (): string | null => {
  return sessionStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return sessionStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getUserId = (): string | null => {
  return sessionStorage.getItem(USER_ID_KEY);
};

export const getTenantId = (): string | null => {
  return sessionStorage.getItem(TENANT_ID_KEY);
};

export const getUserInfo = (): AuthUser | null => {
  const info = sessionStorage.getItem(USER_INFO_KEY);
  return info ? JSON.parse(info) : null;
};

export const getTokenExpiry = (): number | null => {
  const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
  return expiry ? parseInt(expiry, 10) : null;
};

export const setAuthData = (data: AuthTokens): void => {
  if (data.access_token) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  }
  if (data.refresh_token) {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
  }
  if (data.expires_in) {
    // Calculate exact timestamp for expiry
    const expiryTimestamp = Date.now() + data.expires_in * 1000;
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, expiryTimestamp.toString());
  }

  const userId = data.user_id || data.user?.id;
  if (userId) {
    sessionStorage.setItem(USER_ID_KEY, userId);
  }
  const tenantId = data.tenant_id || data.user?.tenant_id;
  if (tenantId) {
    sessionStorage.setItem(TENANT_ID_KEY, tenantId);
  }
  
  if (data.user) {
    sessionStorage.setItem(USER_INFO_KEY, JSON.stringify(data.user));
  }
};

export const clearAuthData = (): void => {
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_ID_KEY);
  sessionStorage.removeItem(TENANT_ID_KEY);
  sessionStorage.removeItem(USER_INFO_KEY);
  sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
};

export const isAuthenticated = (): boolean => {
  const token = getAccessToken();
  const expiry = getTokenExpiry();
  
  if (!token) return false;
  
  // If we have an expiry and it has passed, we are no longer authenticated
  if (expiry && Date.now() > expiry) {
    return false;
  }
  
  return true;
};
