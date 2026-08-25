/** Leads. Mirrors app/domains/leads/router.py.
 *
 *  The backend speaks snake_case enums (NEW_INQUIRY, HOT); the UI types in
 *  src/Pages/leads/types.ts speak display strings ('New Inquiry', 'Hot').
 *  The mapping lives here so pages never deal with wire format.
 */

import api from '../../lib/axios';
import type { Lead as UiLead, LeadScore, LeadSource, LeadStatus } from '../../Pages/leads/types';

export type ApiLeadStatus =
  | 'NEW_INQUIRY'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'DEMO_SCHEDULED'
  | 'PROPOSAL'
  | 'NEGOTIATION'
  | 'CONVERTED'
  | 'NOT_CONVERTED';

export type ApiLeadTemperature = 'HOT' | 'WARM' | 'COLD';

export interface ApiLead {
  id: string;
  reference_number: string;
  row_index: number;
  name: string | null;
  phone: string | null;
  email: string | null;
  source: string | null;
  status: ApiLeadStatus;
  temperature: ApiLeadTemperature | null;
  last_interaction_at: string | null;
  created_at: string;
}

export interface ApiLeadDetail extends ApiLead {
  /** Everything the CSV carried beyond the core columns. */
  fields: Record<string, string>;
}

const STATUS_TO_UI: Record<ApiLeadStatus, LeadStatus> = {
  NEW_INQUIRY: 'New Inquiry',
  CONTACTED: 'Contacted',
  QUALIFIED: 'Qualified',
  DEMO_SCHEDULED: 'Demo Scheduled',
  PROPOSAL: 'Proposal',
  NEGOTIATION: 'Negotiation',
  CONVERTED: 'Converted',
  NOT_CONVERTED: 'Not Converted',
};

const STATUS_TO_API = Object.fromEntries(
  Object.entries(STATUS_TO_UI).map(([apiValue, uiValue]) => [uiValue, apiValue]),
) as Record<LeadStatus, ApiLeadStatus>;

const SCORE_TO_UI: Record<ApiLeadTemperature, LeadScore> = { HOT: 'Hot', WARM: 'Warm', COLD: 'Cold' };
const SCORE_TO_API: Record<LeadScore, ApiLeadTemperature> = { Hot: 'HOT', Warm: 'WARM', Cold: 'COLD' };

/** 'Aditya Rao' -> 'AR'. Falls back to the email so a nameless lead still
 *  renders an avatar instead of an empty circle. */
const initialsOf = (name: string | null, email: string | null): string => {
  const source = (name || email || '?').trim();
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return source.slice(0, 2).toUpperCase();
};

const formatDate = (iso: string | null): string =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    : '';

/** Known UI sources; anything else (a CSV's own wording) passes through as
 *  undefined rather than rendering a broken filter chip. */
const KNOWN_SOURCES: LeadSource[] = ['Website', 'Import', 'Ads', 'Referral'];
const toUiSource = (source: string | null): LeadSource | undefined =>
  KNOWN_SOURCES.find((known) => known.toLowerCase() === (source || '').toLowerCase());

export const toUiLead = (lead: ApiLead): UiLead => ({
  id: lead.id,
  leadNumber: lead.row_index + 1,
  name: lead.name || lead.email || 'Unnamed lead',
  email: lead.email || '',
  initials: initialsOf(lead.name, lead.email),
  date: formatDate(lead.created_at),
  status: STATUS_TO_UI[lead.status] ?? 'New Inquiry',
  score: lead.temperature ? SCORE_TO_UI[lead.temperature] : undefined,
  source: toUiSource(lead.source),
  lastInteraction: lead.last_interaction_at ? formatDate(lead.last_interaction_at) : undefined,
  createdDate: formatDate(lead.created_at),
});

export interface LeadWritePayload {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  source?: string | null;
  status?: LeadStatus;
  score?: LeadScore | null;
  fields?: Record<string, string>;
}

const toApiPayload = (payload: LeadWritePayload) => ({
  ...(payload.name !== undefined && { name: payload.name }),
  ...(payload.phone !== undefined && { phone: payload.phone }),
  ...(payload.email !== undefined && { email: payload.email }),
  ...(payload.source !== undefined && { source: payload.source }),
  ...(payload.status !== undefined && { status: STATUS_TO_API[payload.status] }),
  ...(payload.score !== undefined && {
    temperature: payload.score ? SCORE_TO_API[payload.score] : null,
  }),
  ...(payload.fields !== undefined && { fields: payload.fields }),
});

export const listLeads = async (workspaceId: string): Promise<UiLead[]> => {
  const { data } = await api.get<ApiLead[]>(`/api/workspaces/${workspaceId}/leads`);
  return data.map(toUiLead);
};

export const getLead = async (workspaceId: string, leadId: string): Promise<ApiLeadDetail> => {
  const { data } = await api.get<ApiLeadDetail>(`/api/workspaces/${workspaceId}/leads/${leadId}`);
  return data;
};

export const createLead = async (
  workspaceId: string,
  payload: LeadWritePayload,
): Promise<ApiLeadDetail> => {
  const { data } = await api.post<ApiLeadDetail>(
    `/api/workspaces/${workspaceId}/leads`,
    toApiPayload(payload),
  );
  return data;
};

export const updateLead = async (
  workspaceId: string,
  leadId: string,
  payload: LeadWritePayload,
): Promise<ApiLeadDetail> => {
  const { data } = await api.patch<ApiLeadDetail>(
    `/api/workspaces/${workspaceId}/leads/${leadId}`,
    toApiPayload(payload),
  );
  return data;
};

export const deleteLead = async (workspaceId: string, leadId: string): Promise<void> => {
  await api.delete(`/api/workspaces/${workspaceId}/leads/${leadId}`);
};

/** Leads needing follow-up, hottest and longest-silent first. Backs the
 *  Attention page. */
export const listAttentionLeads = async (workspaceId: string, limit = 50): Promise<ApiLead[]> => {
  const { data } = await api.get<ApiLead[]>(`/api/workspaces/${workspaceId}/leads/attention`, {
    params: { limit },
  });
  return data;
};

/** CSV import. Sends multipart -- the JSON default Content-Type would make
 *  FastAPI reject the upload. */
export const importLeadsCsv = async (
  workspaceId: string,
  file: File,
): Promise<{ imported: number; reference_numbers: string[] }> => {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post(`/api/workspaces/${workspaceId}/leads/csv`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
