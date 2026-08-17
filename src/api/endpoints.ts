export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/v1/auth/register',
    LOGIN: '/api/v1/auth/login',
    REFRESH: '/api/v1/auth/refresh',
    ME: '/api/v1/auth/me',
  },
  ONBOARDING: {
    PROFILE: '/api/v1/onboarding/profile',
    USER_PROFILE: '/api/v1/onboarding/user-profile',
    STATUS: '/api/v1/onboarding/status',
    EXTRACTIONS: '/api/v1/onboarding/extractions',
    COMPLETE: '/api/v1/onboarding/complete',
  },
  KNOWLEDGE: {
    UPLOAD: '/upload/',
    WEBSITE_INGEST: '/knowledge/websites/ingest',
    JOBS: '/upload/jobs',
    FACTS: '/knowledge/review/facts',
  },
  EMAIL: {
    CONNECTIONS: '/api/email-connections',
    GMAIL_OAUTH_START: '/api/email-connections/gmail/oauth/start',
  },
  CRM: {
    CONNECTIONS: '/api/v1/crm/connections',
    HUBSPOT_CONNECTION: '/api/v1/crm/hubspot/connections',
    HUBSPOT_SYNC: '/api/v1/crm/hubspot/sync',
    RECORDS: '/api/v1/crm/records',
    SYNC_RUNS: '/api/v1/crm/sync-runs',
  },
  LEADS: {
    IMPORT_UPLOAD: '/api/leads/import/upload',
    IMPORT: '/api/leads/import',
  },
} as const;

export default API_ENDPOINTS;
