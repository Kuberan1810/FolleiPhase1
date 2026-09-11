/**
 * Coirei GTM API module.
 *
 * Requests carry the account's access token as a bearer header. When a call
 * comes back 401 the module refreshes once and retries, so a 30-minute token
 * expiring mid-task is invisible to the user.
 *
 * The frontend and backend are separate services. In development Vite proxies
 * `/api` to the backend so the browser stays same-origin; in deployment set
 * VITE_API_BASE_URL to the backend origin and FRONTEND_BASE_URL on the backend
 * so CORS allows it.
 */
import { clearSession, getAccessToken, getRefreshToken, storeSession, storeTokens,
         type AuthUser, type TokenPair } from '../lib/auth';

export type Data = Record<string, any>;
export type { AuthUser, TokenPair };

export interface HttpError extends Error {
  status: number;
}

/** Backend origin. Empty in dev, where Vite proxies /api same-origin. */
export const API_BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export const apiUrl = (path: string) => `${API_BASE}/api${path}`;

async function request<T>(path: string, body?: unknown, method?: string, retry = true): Promise<T> {
  const form = body instanceof FormData;
  const token = getAccessToken();
  const response = await fetch(apiUrl(path), {
    method: method || (body === undefined ? 'GET' : 'POST'),
    // Cookies still carry the legacy operator session; the bearer token is the
    // account credential and takes precedence server-side.
    credentials: 'include',
    headers: {
      ...(form ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body === undefined ? undefined : form ? body : JSON.stringify(body),
  });

  // One silent refresh per call: an access token expires every 30 minutes and
  // the user should not be signed out mid-task for it.
  if (response.status === 401 && retry && !path.startsWith('/auth/')) {
    if (await refreshSession()) return request<T>(path, body, method, false);
  }
  return finish<T>(response);
}

export async function api<T = Data>(path: string, body?: unknown, method?: string): Promise<T> {
  return request<T>(path, body, method);
}

async function finish<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message =
      typeof payload.detail === 'string'
        ? payload.detail
        : Array.isArray(payload.detail) && payload.detail[0]?.msg
          ? `${payload.detail[0].loc?.slice(-1)[0] ?? 'field'}: ${payload.detail[0].msg}`
          : `Request failed (${response.status}). Check the fields and retry.`;
    const error = new Error(message) as HttpError;
    error.status = response.status;
    throw error;
  }
  if (response.status === 204) return undefined as T;
  return response.json();
}

/** One workflow snapshot: `GET /api/workflows/{id}` returns the whole project. */
export interface Snapshot {
  company: Data;
  flow: { stage?: string; job_id?: string; message?: string };
  profiles: Data[];
  icps: Data[];
  competitors: Data[];
  jobs: Data[];
  sources: Data[];
  sheet: { rows: Data[]; columns: Data[]; cells: Data[]; contacts: Data[] };
  campaigns: Data[];
}

export type Stage =
  | 'intake' | 'company' | 'company_review'
  | 'competitors' | 'competitors_review'
  | 'icp' | 'icp_review'
  | 'leads' | 'leads_ready' | 'cancelled';

/** Human labels for the workflow stages, used by progress and empty states. */
export const STAGE_LABEL: Record<string, string> = {
  intake: 'Ready to start',
  company: 'Researching your business',
  company_review: 'Review your business profile',
  competitors: 'Finding competitors',
  competitors_review: 'Review competitors',
  icp: 'Building your ideal customer profile',
  icp_review: 'Review your ICP',
  leads: 'Finding matching accounts',
  leads_ready: 'Leads ready',
  cancelled: 'Stopped',
};

/**
 * Exchange the refresh token for a new pair. Concurrent 401s share one attempt
 * so four parallel requests do not rotate the token four times, which would
 * invalidate three of them.
 */
let refreshing: Promise<boolean> | null = null;

export function refreshSession(): Promise<boolean> {
  refreshing = refreshing ?? (async () => {
    const refresh_token = getRefreshToken();
    if (!refresh_token) return false;
    try {
      const response = await fetch(apiUrl('/auth/refresh'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token }),
      });
      if (!response.ok) {
        clearSession();
        return false;
      }
      const tokens = (await response.json()) as TokenPair;
      storeSession(tokens);
      return true;
    } catch {
      return false;  // Network failure: keep the session and let the caller retry.
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

export const coirei = {
  // accounts
  register: (email: string, password: string, full_name: string) =>
    api<TokenPair>('/auth/register', { email, password, full_name }),
  signIn: (email: string, password: string) => api<TokenPair>('/auth/login', { email, password }),
  me: () => api<AuthUser>('/auth/me'),
  googleSignInUrl: () => api<{ authorization_url: string }>('/auth/google/start'),
  signOut: async () => {
    const refresh_token = getRefreshToken();
    try {
      await api('/auth/logout', refresh_token ? { refresh_token } : {});
    } finally {
      clearSession();
    }
  },
  adoptTokens: (access: string, refresh: string) => storeTokens(access, refresh),

  // projects
  projects: () => api<Data[]>('/companies'),
  project: (id: string) => api(`/companies/${id}`),
  renameProject: (id: string, name: string) => api(`/companies/${id}`, { name }, 'PATCH'),
  deleteProject: (id: string) => api(`/companies/${id}`, undefined, 'DELETE'),

  // workflow
  snapshot: (id: string) => api<Snapshot>(`/workflows/${id}`),
  intake: (message: string) => api<{ company_id?: string; question?: string }>('/workflows/intake', { message }),
  command: (id: string, message: string) =>
    api<{ reply: string; ran?: string | null; job_id?: string; stage?: string; column?: Data }>(
      `/workflows/${id}/command`, { message }),
  act: (id: string, action: string, extra: Data = {}) => api(`/workflows/${id}/actions`, { action, ...extra }),
  uploadDocument: (id: string, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api(`/companies/${id}/documents`, form);
  },

  // profile / competitors / icp
  editProfile: (id: string, body: Data) => api(`/companies/${id}/profiles`, body),
  editIcp: (id: string, body: Data) => api(`/companies/${id}/icp`, body),
  reviewCandidate: (candidateId: string, decision: string) =>
    api(`/candidates/${candidateId}`, { decision }, 'PATCH'),
  source: (id: string, sourceId: string) => api(`/companies/${id}/sources/${sourceId}`),
  discover: (id: string, kind: 'competitors' | 'leads', body: Data) =>
    api(`/companies/${id}/${kind}/discover`, body),

  // leads spreadsheet
  addColumn: (id: string, body: Data) => api(`/companies/${id}/columns`, body),
  addColumnFromPrompt: (id: string, prompt: string, kind: 'lead' | 'competitor' = 'lead') =>
    api<{ column: Data; job: Data | null }>(`/companies/${id}/columns/from-prompt`, { prompt, run: true, kind }),
  deleteColumn: (columnId: string) => api(`/columns/${columnId}`, undefined, 'DELETE'),
  runCells: (id: string, candidateIds: string[], columnIds: string[], rerun = false) =>
    api(`/companies/${id}/research-cells`, { candidate_ids: candidateIds, column_ids: columnIds, rerun }),
  exportUrl: (id: string) => apiUrl(`/companies/${id}/export.csv`),

  // contacts
  importContacts: (id: string, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api<{ imported: Data[]; skipped: Data[] }>(`/companies/${id}/contacts/import`, form);
  },
  addContact: (id: string, body: Data) => api(`/companies/${id}/contacts`, body),
  confirmContact: (contactId: string, email: string, note: string) =>
    api(`/contacts/${contactId}/confirm`, { email, status: 'user-confirmed', verification_note: note }),

  // jobs
  cancelJob: (jobId: string) => api(`/jobs/${jobId}/cancel`, {}),
  retryJob: (jobId: string) => api(`/jobs/${jobId}/retry`, {}),

  // gmail + campaigns
  gmailConnections: () => api<Data[]>('/oauth/google/connections'),
  gmailStart: () => api<{ authorization_url: string }>('/oauth/google/start'),
  gmailDisconnect: (connectionId: string) => api(`/oauth/google/connections/${connectionId}`, undefined, 'DELETE'),
  createCampaign: (id: string, body: Data) => api(`/companies/${id}/campaigns`, body),
  campaign: (campaignId: string) => api(`/campaigns/${campaignId}`),
  editMessage: (messageId: string, body: Data) => api(`/messages/${messageId}`, body, 'PUT'),
  approveCampaign: (campaignId: string, previewHash: string) =>
    api(`/campaigns/${campaignId}/approve`, { preview_hash: previewHash }),
  sendCampaign: (campaignId: string, previewHash: string) =>
    api(`/campaigns/${campaignId}/send`, { preview_hash: previewHash }),
  cancelCampaign: (campaignId: string) => api(`/campaigns/${campaignId}/cancel`, {}),
};

/** The project name shown everywhere: the operator's rename wins over intake. */
export const projectName = (company: Data | undefined) =>
  company?.context?.project_name || company?.name || 'Untitled project';

/** True while any research job on the project is queued or running. */
export const activeJob = (snapshot: Snapshot | undefined) =>
  snapshot?.jobs.find((job) => job.status === 'queued' || job.status === 'running');

export const currentJob = (snapshot: Snapshot | undefined) =>
  snapshot?.jobs.find((job) => job.id === snapshot?.flow.job_id);
