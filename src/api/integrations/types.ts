export interface EmailConnection {
  id: string;
  provider: 'gmail' | 'brevo' | string;
  email_address: string;
  sender_name: string | null;
  enabled: boolean;
  verified: boolean;
  status: string;
  auth_type: string;
  oauth_connected: boolean;
  inbound_ready: boolean;
  last_error: string | null;
}

export interface CrmConnection {
  id: string;
  provider: string;
  status: string;
  external_account_id: string | null;
  scopes: string[];
  last_synced_at: string | null;
  last_error: string | null;
}

export interface HubSpotSyncResult {
  id: string;
  provider: string;
  status: string;
  object_counts: Record<string, number>;
  projection_event_count: number;
  error: string | null;
}
