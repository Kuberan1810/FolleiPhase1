export interface GoogleAuthStartResponse {
  authorization_url: string;
}

export interface GoogleAuthExchangeRequest {
  exchange_code: string;
}

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  tenant_id?: string;
  roles?: string[];
}

export interface GoogleAuthExchangeResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in?: number;
  user: AuthUser;
}

