export interface AuthTokens {
  access_token: string;
  token_type?: string;
  refresh_token?: string;
  expires_in?: number;
  user_id?: string;
  tenant_id?: string;
  user?: {
    id?: string;
    email?: string;
    full_name?: string;
    tenant_id?: string;
    roles?: string[];
  };
}

const ACCESS_TOKEN_KEY = 'follei_access_token';
const REFRESH_TOKEN_KEY = 'follei_refresh_token';
const USER_ID_KEY = 'follei_user_id';
const TENANT_ID_KEY = 'follei_tenant_id';
const USER_INFO_KEY = 'follei_user_info';

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const getUserId = (): string | null => {
  return localStorage.getItem(USER_ID_KEY);
};

export const getTenantId = (): string | null => {
  return localStorage.getItem(TENANT_ID_KEY);
};

export const setAuthData = (data: AuthTokens): void => {
  if (data.access_token) {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.access_token);
  }
  if (data.refresh_token) {
    localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh_token);
  }
  const userId = data.user_id || data.user?.id;
  if (userId) {
    localStorage.setItem(USER_ID_KEY, userId);
  }
  const tenantId = data.tenant_id || data.user?.tenant_id;
  if (tenantId) {
    localStorage.setItem(TENANT_ID_KEY, tenantId);
  }
  if (data.user) {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(data.user));
  }
};

export const clearAuthData = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  localStorage.removeItem(TENANT_ID_KEY);
  localStorage.removeItem(USER_INFO_KEY);
};

export const isAuthenticated = (): boolean => {
  return Boolean(getAccessToken());
};
