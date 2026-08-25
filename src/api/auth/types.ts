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
}

export interface RegisterResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  user: { id: string; email: string; full_name: string };
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

