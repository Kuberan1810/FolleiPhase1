import axiosInstance from '../../lib/axios';
import { API_ENDPOINTS } from '../endpoints';
import type { CrmConnection, EmailConnection, HubSpotSyncResult } from './types';

const googleStartPath =
  import.meta.env.VITE_GOOGLE_OAUTH_START_PATH || API_ENDPOINTS.EMAIL.GMAIL_OAUTH_START;
const googleConnectionsPath =
  import.meta.env.VITE_GOOGLE_CONNECTIONS_PATH || API_ENDPOINTS.EMAIL.CONNECTIONS;

const unwrap = <T>(payload: T | { data: T }): T => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
};

export const integrationsApi = {
  startGoogleWorkspace: async (): Promise<string> => {
    const response = await axiosInstance.post(googleStartPath, {
      sender_name: 'Follei',
      auto_reply_enabled: true,
      allow_inbound_lead_creation: true,
      campaign_enabled: true,
      // Accepted by the expanded Workspace endpoint and ignored only when its
      // request model permits extras. The Gmail endpoint receives no resources.
      ...(googleStartPath.includes('google-workspace')
        ? { resources: ['gmail', 'drive', 'calendar', 'contacts'] }
        : {}),
    });
    const payload = unwrap<Record<string, unknown>>(response.data);
    const url = payload.authorization_url || payload.auth_url;
    if (typeof url !== 'string' || !url.startsWith('https://accounts.google.com/')) {
      throw new Error('Google OAuth start did not return a valid authorization URL');
    }
    return url;
  },

  listGoogleConnections: async (): Promise<EmailConnection[]> => {
    const response = await axiosInstance.get(googleConnectionsPath);
    const payload = unwrap<EmailConnection[] | { connections: EmailConnection[] }>(response.data);
    return Array.isArray(payload) ? payload : payload.connections || [];
  },

  listCrmConnections: async (): Promise<CrmConnection[]> =>
    (await axiosInstance.get<CrmConnection[]>(API_ENDPOINTS.CRM.CONNECTIONS)).data,

  connectHubSpot: async (accessToken: string): Promise<CrmConnection> =>
    (
      await axiosInstance.post<CrmConnection>(API_ENDPOINTS.CRM.HUBSPOT_CONNECTION, {
        access_token: accessToken,
        validate_connection: true,
      })
    ).data,

  syncHubSpot: async (): Promise<HubSpotSyncResult> =>
    (
      await axiosInstance.post<HubSpotSyncResult>(API_ENDPOINTS.CRM.HUBSPOT_SYNC, {
        resources: ['contact', 'company', 'deal'],
        page_size: 100,
        max_pages_per_resource: 10,
        project_now: false,
      })
    ).data,

  disconnectHubSpot: async (): Promise<void> => {
    await axiosInstance.delete(API_ENDPOINTS.CRM.HUBSPOT_CONNECTION);
  },
};
