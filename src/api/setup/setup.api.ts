/** Onboarding: documents (which trigger the real ingestion pipeline), the
 *  goal conversation, requirements, gap questions, and the sales package.
 *  Mirrors app/domains/{documents,goals,requirements}. */

import api from '../../lib/axios';

export type DocumentStatus = 'PENDING' | 'PROCESSING' | 'PROCESSED' | 'FAILED';

export interface WorkspaceDocument {
  id: string;
  workspace_id: string;
  filename: string;
  mime_type: string;
  status: DocumentStatus;
  failure_reason: string | null;
  uploaded_at: string;
}

/**
 * Upload one business document. The backend stores it, then kicks off
 * parsing + chunking + embedding as a background task -- so a 201 here means
 * "accepted", NOT "ingested". The returned status will be PENDING/PROCESSING;
 * poll listDocuments to see it reach PROCESSED or FAILED.
 */
export const uploadDocument = async (
  workspaceId: string,
  file: File,
): Promise<WorkspaceDocument> => {
  const form = new FormData();
  form.append('file', file);
  const { data } = await api.post<WorkspaceDocument>(
    `/api/workspaces/${workspaceId}/documents`,
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } },
  );
  return data;
};

export const listDocuments = async (workspaceId: string): Promise<WorkspaceDocument[]> => {
  const { data } = await api.get<WorkspaceDocument[]>(`/api/workspaces/${workspaceId}/documents`);
  return data;
};

/** Ingestion runs in the background, so the UI has to poll. Resolves once
 *  every document has left PENDING/PROCESSING, or when the deadline passes --
 *  on a slow machine ingestion can take minutes, and a hung poll is worse
 *  than a stale answer. */
export const waitForIngestion = async (
  workspaceId: string,
  { timeoutMs = 300_000, intervalMs = 3_000 } = {},
): Promise<WorkspaceDocument[]> => {
  const deadline = Date.now() + timeoutMs;
  let documents = await listDocuments(workspaceId);
  while (Date.now() < deadline) {
    const pending = documents.filter((d) => d.status === 'PENDING' || d.status === 'PROCESSING');
    if (pending.length === 0) return documents;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    documents = await listDocuments(workspaceId);
  }
  return documents;
};

export interface GoalSuggestions {
  suggestions: string[];
}

export const getGoalSuggestions = async (workspaceId: string): Promise<GoalSuggestions> => {
  const { data } = await api.get<GoalSuggestions>(`/api/workspaces/${workspaceId}/goal/suggestions`);
  return data;
};

export const sendGoalMessage = async (workspaceId: string, message: string) => {
  const { data } = await api.post(`/api/workspaces/${workspaceId}/goal/messages`, { message });
  return data;
};

export const listGoalMessages = async (workspaceId: string) => {
  const { data } = await api.get(`/api/workspaces/${workspaceId}/goal/messages`);
  return data;
};

export const generateRequirements = async (workspaceId: string) => {
  const { data } = await api.post(`/api/workspaces/${workspaceId}/requirements/generate`);
  return data;
};

export const getRequirements = async (workspaceId: string) => {
  const { data } = await api.get(`/api/workspaces/${workspaceId}/requirements`);
  return data;
};

export const generateGapQuestions = async (workspaceId: string) => {
  const { data } = await api.post(`/api/workspaces/${workspaceId}/gap-questions/generate`);
  return data;
};

export const listGapQuestions = async (workspaceId: string) => {
  const { data } = await api.get(`/api/workspaces/${workspaceId}/gap-questions`);
  return data;
};

export const answerGapQuestion = async (workspaceId: string, questionId: string, answer: string) => {
  const { data } = await api.post(
    `/api/workspaces/${workspaceId}/gap-questions/${questionId}/answer`,
    { answer },
  );
  return data;
};

export const generateSalesPackage = async (workspaceId: string) => {
  const { data } = await api.post(`/api/workspaces/${workspaceId}/sales-package/generate`);
  return data;
};

export const getSalesPackage = async (workspaceId: string) => {
  const { data } = await api.get(`/api/workspaces/${workspaceId}/sales-package`);
  return data;
};
