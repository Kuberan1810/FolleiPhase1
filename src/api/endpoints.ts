export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/auth/register',
    LOGIN: '/api/auth/login',
    REFRESH: '/api/auth/refresh',
    ME: '/api/auth/me',
    GOOGLE_START: '/api/auth/google/start',
    GOOGLE_EXCHANGE: '/api/auth/google/exchange',
  },
} as const;

export default API_ENDPOINTS;

