export interface OnboardingSourceStatus {
  source_id?: string;
  source_type?: string;
  name?: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | string;
  resources?: string[];
  error?: string;
}

export interface CategorySummary {
  id: string;
  title: string;
  description?: string;
  is_mandatory: boolean;
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | string;
  display_mode: 'aggregate' | 'enumerable' | string;
  count?: number;
  summary_text?: string;
  breakdown?: Record<string, number>;
  sample_items?: Record<string, unknown>[];
  items_endpoint?: string;
  review_status?: {
    total: number;
    approved: number;
    pending: number;
    rejected: number;
  };
}

export interface OnboardingStateResponse {
  can_continue: boolean;
  ready_for_autonomous_actions: boolean;
  ingestion_status?: 'queued' | 'processing' | 'completed' | 'failed' | string;
  sources?: OnboardingSourceStatus[];
  categories?: CategorySummary[];
  missing_mandatory_groups?: string[];
  next_step?: string;
  [key: string]: unknown; // Preserve unknown future fields safely
}
