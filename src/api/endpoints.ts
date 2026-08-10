export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/v1/auth/register',
    LOGIN: '/api/v1/auth/login',
    REFRESH: '/api/v1/auth/refresh',
    ME: '/api/v1/auth/me',
    GOOGLE_START: '/api/v1/auth/google/start',
    GOOGLE_EXCHANGE: '/api/v1/auth/google/exchange',
  },
  ONBOARDING: {
    WORKSPACE: '/api/v1/onboarding/workspace',
    COMPANY_DETAILS: '/api/v1/onboarding/company-details',
    CONNECT_TOOLS: '/api/v1/onboarding/connect-tools',
    IMPORT_DATA: '/api/v1/onboarding/import-data',
    STATE: '/api/v1/onboarding/state',
  },
} as const;

export default API_ENDPOINTS;
