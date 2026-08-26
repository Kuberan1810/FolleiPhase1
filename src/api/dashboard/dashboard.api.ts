/** Workspaces and businesses -- the containers every other resource hangs off.
 *  Mirrors app/domains/workspaces and app/domains/tenants. */

import api from '../../lib/axios';

export type WorkspaceStage = string;
export type Language = 'ENGLISH' | 'TAMIL' | 'HINDI';

export interface Workspace {
  id: string;
  business_id: string;
  name: string;
  stage: WorkspaceStage;
  language: Language;
  goal_text: string | null;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  customer_type: string;
  crm_connected: boolean;
  crm_provider: string | null;
}

export interface BusinessCreatePayload {
  name: string;
  category: string;
  /** Required by the backend -- who the business sells to (e.g. 'students'). */
  customer_type: string;
  crm_provider?: string | null;
}

export const listWorkspaces = async (): Promise<Workspace[]> => {
  const { data } = await api.get<Workspace[]>('/api/workspaces');
  return data;
};

export const getWorkspace = async (workspaceId: string): Promise<Workspace> => {
  const { data } = await api.get<Workspace>(`/api/workspaces/${workspaceId}`);
  return data;
};

export const createWorkspace = async (payload: {
  business_id: string;
  name: string;
  language?: Language;
}): Promise<Workspace> => {
  const { data } = await api.post<Workspace>('/api/workspaces', payload);
  return data;
};

/** Rename a workspace. The name is generated from the goal, so the user has
 *  to be able to override one they did not choose. */
export const renameWorkspace = async (workspaceId: string, name: string): Promise<Workspace> => {
  const { data } = await api.patch<Workspace>(`/api/workspaces/${workspaceId}`, { name });
  return data;
};

export const updateWorkspaceLanguage = async (
  workspaceId: string,
  language: Language,
): Promise<Workspace> => {
  const { data } = await api.patch<Workspace>(`/api/workspaces/${workspaceId}/language`, { language });
  return data;
};

export const listBusinesses = async (): Promise<Business[]> => {
  const { data } = await api.get<Business[]>('/api/businesses');
  return data;
};

export const createBusiness = async (payload: BusinessCreatePayload): Promise<Business> => {
  const { data } = await api.post<Business>('/api/businesses', payload);
  return data;
};
