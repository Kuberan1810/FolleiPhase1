export interface EmailConnection {
  provider: string;
  email_address: string;
  sender_name: string;
  api_key: string;
  app_password: string;
  auto_reply_enabled: boolean;
  allow_inbound_lead_creation: boolean;
  campaign_enabled: boolean;
}

export interface RegisterPayload {
  email: string;
  password: string;
  full_name: string;
  tenant_name: string;
  business_email: string;
  connect_gmail?: boolean;
  gmail_auto_reply_enabled?: boolean;
  gmail_campaign_enabled?: boolean;
  email_connections?: EmailConnection[];
}

export interface RegisterResponse {
  user_id: string;
  tenant_id: string;
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}

export interface ApiValidationErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
  input?: unknown;
  ctx?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  detail?: string | ApiValidationErrorDetail[];
}
