/** Onboarding: documents (which trigger the real ingestion pipeline), the
 *  goal conversation, requirements, gap questions, and the sales package.
 *  Mirrors app/domains/{documents,goals,requirements}. */

import api from '../../lib/axios';

export type DocumentStatus = 'UPLOADED' | 'PROCESSING' | 'PROCESSED' | 'FAILED';

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
 * "accepted", NOT "ingested". The returned status will be UPLOADED/PROCESSING;
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
    const pending = documents.filter((d) => d.status === 'UPLOADED' || d.status === 'PROCESSING');
    if (pending.length === 0) return documents;
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    documents = await listDocuments(workspaceId);
  }
  return documents;
};

/** Re-run ingestion from the file already stored on the server. Needed after
 *  an embedding-model change (existing vectors stop being comparable) and to
 *  retry a document that failed for a transient reason. */
export const reingestDocument = async (
  workspaceId: string,
  documentId: string,
): Promise<WorkspaceDocument> => {
  const { data } = await api.post<WorkspaceDocument>(
    `/api/workspaces/${workspaceId}/documents/${documentId}/reingest`,
  );
  return data;
};

/** Re-ingest every document holding no usable chunks. */
export const reingestAllDocuments = async (workspaceId: string): Promise<WorkspaceDocument[]> => {
  const { data } = await api.post<WorkspaceDocument[]>(
    `/api/workspaces/${workspaceId}/documents/reingest`,
  );
  return data;
};

export interface GoalSuggestions {
  suggestions: string[];
}

export const getGoalSuggestions = async (workspaceId: string): Promise<GoalSuggestions> => {
  const { data } = await api.get<GoalSuggestions>(`/api/workspaces/${workspaceId}/goal/suggestions`);
  return data;
};

export interface GoalMessageResult {
  reply: string;
  goal_finalized: boolean;
  goal_text: string | null;
}

export const sendGoalMessage = async (
  workspaceId: string,
  message: string,
): Promise<GoalMessageResult> => {
  const { data } = await api.post<GoalMessageResult>(
    `/api/workspaces/${workspaceId}/goal/messages`,
    { message },
  );
  return data;
};

export interface GoalTurn {
  role: 'USER' | 'ASSISTANT';
  message: string;
}

export const listGoalMessages = async (workspaceId: string): Promise<GoalTurn[]> => {
  const { data } = await api.get<GoalTurn[]>(`/api/workspaces/${workspaceId}/goal/messages`);
  return data;
};

export interface RequirementsDraft {
  id: string;
  success_definition: string;
  target_segment: string;
  offer_summary: string;
  created_at: string;
}

export const generateRequirements = async (workspaceId: string): Promise<RequirementsDraft> => {
  const { data } = await api.post<RequirementsDraft>(`/api/workspaces/${workspaceId}/requirements/generate`);
  return data;
};

export const getRequirements = async (workspaceId: string): Promise<RequirementsDraft | null> => {
  const { data } = await api.get<RequirementsDraft | null>(`/api/workspaces/${workspaceId}/requirements`);
  return data;
};

export interface GapQuestion {
  id: string;
  question_text: string;
  status: 'PENDING' | 'ANSWERED';
  answer_text: string | null;
}

export const generateGapQuestions = async (workspaceId: string): Promise<GapQuestion[]> => {
  const { data } = await api.post<GapQuestion[]>(`/api/workspaces/${workspaceId}/gap-questions/generate`);
  return data;
};

export const listGapQuestions = async (workspaceId: string): Promise<GapQuestion[]> => {
  const { data } = await api.get<GapQuestion[]>(`/api/workspaces/${workspaceId}/gap-questions`);
  return data;
};

export const answerGapQuestion = async (
  workspaceId: string,
  questionId: string,
  answer: string,
): Promise<GapQuestion> => {
  const { data } = await api.post<GapQuestion>(
    `/api/workspaces/${workspaceId}/gap-questions/${questionId}/answer`,
    { answer_text: answer },
  );
  return data;
};

export interface SalesStrategy {
  segments?: Array<{ name: string; angle: string }>;
  objections?: Array<{ objection: string; response: string }>;
  sequencing?: string;
}

export interface CallScript {
  opening?: string;
  key_points?: string[];
  discovery_questions?: string[];
  if_interested?: string;
  if_hesitant?: string;
  if_not_interested?: string;
  closing?: string;
}

export interface SalesPackage {
  id: string;
  sales_requirement: string;
  sales_pitch: string;
  sales_strategy: SalesStrategy;
  call_script: CallScript;
  verified: boolean;
  created_at: string;
}

export const generateSalesPackage = async (workspaceId: string): Promise<SalesPackage> => {
  const { data } = await api.post<SalesPackage>(`/api/workspaces/${workspaceId}/sales-package/generate`);
  return data;
};

export const getSalesPackage = async (workspaceId: string): Promise<SalesPackage | null> => {
  const { data } = await api.get<SalesPackage | null>(`/api/workspaces/${workspaceId}/sales-package`);
  return data;
};

export const reviseSalesPackage = async (
  workspaceId: string,
  packageId: string,
  feedback: string,
): Promise<SalesPackage> => {
  const { data } = await api.post<SalesPackage>(
    `/api/workspaces/${workspaceId}/sales-package/${packageId}/revise`,
    { feedback },
  );
  return data;
};

export const verifySalesPackage = async (
  workspaceId: string,
  packageId: string,
): Promise<SalesPackage> => {
  const { data } = await api.post<SalesPackage>(
    `/api/workspaces/${workspaceId}/sales-package/${packageId}/verify`,
  );
  return data;
};
