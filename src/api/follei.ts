import axiosInstance from '../lib/axios';

export type Language = 'TAMIL' | 'HINDI' | 'ENGLISH';
export type WorkspaceStage =
  | 'DRAFT'
  | 'GOAL_SET'
  | 'REQUIREMENTS_DRAFTED'
  | 'GAP_FILLING'
  | 'PACKAGE_GENERATED'
  | 'VERIFIED';

export interface Business {
  id: string;
  name: string;
  category: string;
  customer_type: string;
  crm_connected: boolean;
  crm_provider: string | null;
}

export interface Workspace {
  id: string;
  business_id: string;
  name: string;
  stage: WorkspaceStage;
  language: Language;
  goal_text: string | null;
}

export interface DocumentRecord {
  id: string;
  workspace_id: string;
  filename: string;
  mime_type: string;
  status: 'UPLOADED' | 'PROCESSING' | 'PROCESSED' | 'FAILED';
  failure_reason: string | null;
  uploaded_at: string;
}

export interface Lead {
  id: string;
  reference_number: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  source: string | null;
  created_at: string;
}

export interface GoalTurn { role: 'USER' | 'ASSISTANT'; message: string }
export interface GoalReply { reply: string; goal_finalized: boolean; goal_text: string | null }
export interface RequirementsDraft {
  id: string;
  success_definition: string;
  target_segment: string;
  offer_summary: string;
  created_at: string;
}
export interface GapQuestion {
  id: string;
  question_text: string;
  status: 'PENDING' | 'ANSWERED';
  answer_text: string | null;
}
export interface SalesPackage {
  id: string;
  sales_requirement: string;
  sales_pitch: string;
  sales_strategy: {
    segments?: Array<{ name: string; angle: string }>;
    objections?: Array<{ objection: string; response: string }>;
    sequencing?: string;
  };
  call_script: {
    opening?: string;
    key_points?: string[];
    discovery_questions?: string[];
    if_interested?: string;
    if_hesitant?: string;
    if_not_interested?: string;
    closing?: string;
  };
  verified: boolean;
  created_at: string;
}

export type CallConnectionState = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'ended' | 'error';
export type LeadTemperature = 'HOT' | 'WARM' | 'COLD';

export interface VoiceOption {
  id: string;
  name: string;
  description: string;
  language: string;
  accent: string;
}

export interface CallLabConfig {
  available: boolean;
  voices: VoiceOption[];
  default_voice_id: string | null;
  stt_model: string;
  tts_model: string;
  output_format: string;
  stability: number;
  similarity: number;
  style: number;
  speed: number;
  speaker_boost: boolean;
  input_sample_rate: number;
  output_sample_rate: number;
  reason: string | null;
}

export interface CallSession {
  id: string;
  workspace_id: string;
  lead_id: string | null;
  status: 'READY' | 'ACTIVE' | 'ENDED' | 'FAILED';
  language: Language;
  voice_id: string;
  voice_name: string;
  disposition: string;
  lead_temperature: LeadTemperature | null;
  temperature_evidence: Array<{ type: string; evidence: string }>;
}

export interface RealtimeTicket {
  ticket: string;
  websocket_path: string;
  expires_in: number;
}

export const folleiApi = {
  listBusinesses: async () => (await axiosInstance.get<Business[]>('/api/businesses')).data,
  createBusiness: async (payload: {
    name: string;
    category: string;
    customer_type: string;
    crm_provider: string | null;
  }) => (await axiosInstance.post<Business>('/api/businesses', payload)).data,
  listWorkspaces: async (businessId: string) =>
    (await axiosInstance.get<Workspace[]>('/api/workspaces', { params: { business_id: businessId } })).data,
  createWorkspace: async (businessId: string) =>
    (await axiosInstance.post<Workspace>('/api/workspaces', {
      business_id: businessId,
      name: 'Project 1',
      language: 'TAMIL',
    })).data,
  getWorkspace: async (workspaceId: string) =>
    (await axiosInstance.get<Workspace>(`/api/workspaces/${workspaceId}`)).data,
  updateLanguage: async (workspaceId: string, language: Language) =>
    (await axiosInstance.patch<Workspace>(`/api/workspaces/${workspaceId}/language`, { language })).data,
  listDocuments: async (workspaceId: string) =>
    (await axiosInstance.get<DocumentRecord[]>(`/api/workspaces/${workspaceId}/documents`)).data,
  uploadDocument: async (workspaceId: string, file: File, onProgress?: (percent: number) => void) => {
    const body = new FormData();
    body.append('file', file);
    return (await axiosInstance.post<DocumentRecord>(`/api/workspaces/${workspaceId}/documents`, body, {
      onUploadProgress: (event) => {
        if (event.total) onProgress?.(Math.round((event.loaded / event.total) * 100));
      },
    })).data;
  },
  listLeads: async (workspaceId: string) =>
    (await axiosInstance.get<Lead[]>(`/api/workspaces/${workspaceId}/leads`)).data,
  uploadLeads: async (workspaceId: string, file: File, onProgress?: (percent: number) => void) => {
    const body = new FormData();
    body.append('file', file);
    return (await axiosInstance.post<{ imported: number; reference_numbers: string[] }>(
      `/api/workspaces/${workspaceId}/leads/csv`, body, {
        onUploadProgress: (event) => {
          if (event.total) onProgress?.(Math.round((event.loaded / event.total) * 100));
        },
      },
    )).data;
  },
  getGoalHistory: async (workspaceId: string) =>
    (await axiosInstance.get<GoalTurn[]>(`/api/workspaces/${workspaceId}/goal/messages`)).data,
  getGoalSuggestions: async (workspaceId: string) =>
    (await axiosInstance.get<{ suggestions: string[] }>(`/api/workspaces/${workspaceId}/goal/suggestions`)).data,
  sendGoalMessage: async (workspaceId: string, message: string) =>
    (await axiosInstance.post<GoalReply>(`/api/workspaces/${workspaceId}/goal/messages`, { message })).data,
  generateRequirements: async (workspaceId: string) =>
    (await axiosInstance.post<RequirementsDraft>(`/api/workspaces/${workspaceId}/requirements/generate`)).data,
  getRequirements: async (workspaceId: string) =>
    (await axiosInstance.get<RequirementsDraft | null>(`/api/workspaces/${workspaceId}/requirements`)).data,
  generateGapQuestions: async (workspaceId: string) =>
    (await axiosInstance.post<GapQuestion[]>(`/api/workspaces/${workspaceId}/gap-questions/generate`)).data,
  listGapQuestions: async (workspaceId: string) =>
    (await axiosInstance.get<GapQuestion[]>(`/api/workspaces/${workspaceId}/gap-questions`)).data,
  answerGapQuestion: async (workspaceId: string, questionId: string, answerText: string) =>
    (await axiosInstance.post<GapQuestion>(
      `/api/workspaces/${workspaceId}/gap-questions/${questionId}/answer`,
      { answer_text: answerText },
    )).data,
  getSalesPackage: async (workspaceId: string) =>
    (await axiosInstance.get<SalesPackage | null>(`/api/workspaces/${workspaceId}/sales-package`)).data,
  generateSalesPackage: async (workspaceId: string) =>
    (await axiosInstance.post<SalesPackage>(`/api/workspaces/${workspaceId}/sales-package/generate`)).data,
  reviseSalesPackage: async (workspaceId: string, packageId: string, feedback: string) =>
    (await axiosInstance.post<SalesPackage>(
      `/api/workspaces/${workspaceId}/sales-package/${packageId}/revise`,
      { feedback },
    )).data,
  verifySalesPackage: async (workspaceId: string, packageId: string) =>
    (await axiosInstance.post<SalesPackage>(
      `/api/workspaces/${workspaceId}/sales-package/${packageId}/verify`,
    )).data,
  getCallLabConfig: async (workspaceId: string) =>
    (await axiosInstance.get<CallLabConfig>(`/api/workspaces/${workspaceId}/call-lab/config`)).data,
  createCallSession: async (
    workspaceId: string,
    leadId: string | null,
    language: Language,
    voiceId: string,
  ) =>
    (await axiosInstance.post<CallSession>(`/api/workspaces/${workspaceId}/call-sessions`, {
      lead_id: leadId,
      language,
      voice_id: voiceId,
    })).data,
  createRealtimeTicket: async (workspaceId: string, sessionId: string) =>
    (await axiosInstance.post<RealtimeTicket>(
      `/api/workspaces/${workspaceId}/call-sessions/${sessionId}/ticket`,
    )).data,
};
