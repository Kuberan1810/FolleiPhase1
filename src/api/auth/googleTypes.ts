export interface GoogleAuthStartData {
  flow: string;
  requires_bearer: boolean;
  authorization_url: string;
  resources: string[];
  scopes?: string[];
  gmail_communication?: {
    requested: boolean;
    capabilities: string[];
  };
}

export interface GoogleAuthStartResponse {
  data: GoogleAuthStartData;
  meta?: {
    request_id?: string;
    generated_at?: string;
  };
  errors?: string[];
}

export interface GoogleAuthExchangeRequest {
  exchange_code: string;
}

export interface AuthUser {
  id: string;
  email: string;
  full_name: string;
  tenant_id: string;
  roles?: string[];
}

export interface AccountInfo {
  is_new_user: boolean;
  action: string;
}

export interface GoogleWorkspaceInfo {
  connection_id: string;
  email_address?: string;
  status: string;
  resources: string[];
}

export interface GmailCommunicationInfo {
  connection_id: string;
  status: string;
  capabilities: string[];
}

export interface IngestionInfo {
  run_id: string;
  status: string;
  state_endpoint: string;
}

export interface GoogleAuthExchangeResponse {
  access_token: string;
  refresh_token?: string;
  token_type: string;
  expires_in?: number;
  user: AuthUser;
  account: AccountInfo;
  google_workspace?: GoogleWorkspaceInfo;
  gmail_communication?: GmailCommunicationInfo;
  ingestion?: IngestionInfo;
}
