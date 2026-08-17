/**
 * Onboarding State & Verification Models
 */

export interface OnboardingProgress {
  profile_complete: boolean;
  sources_connected: number;
  runs_active: number;
  categories_found: number;
  categories_total: number;
}

export interface OnboardingSource {
  id: string;
  name: string;
  type: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | string;
  config?: Record<string, unknown>;
  error?: string | null;
}

export interface OnboardingRun {
  id: string;
  source_id: string;
  status: 'queued' | 'processing' | 'completed' | 'failed' | string;
  page_count: number;
  document_count: number;
  error: string | null;
}

export interface CategoryReviewProgress {
  reviewed: number;
  total: number;
}

export interface CategoryDisplay {
  mode: 'aggregate' | 'enumerable' | string;
  items_endpoint?: string;
  review_progress?: CategoryReviewProgress;
}

export interface CategorySummary {
  key: string;
  label: string;
  category_group: string;
  mandatory_group?: string;
  status: 'pending' | 'in_progress' | 'found' | 'completed' | 'failed' | string;
  count: number;
  summary: string;
  confidence: number;
  needs_review: boolean;
  display: CategoryDisplay;
  breakdown?: Record<string, number>;
  sample_items?: Record<string, unknown>[];
}

export interface MissingData {
  profile?: string[];
  optional?: string[];
}

export interface OnboardingStateData {
  step: string;
  progress: OnboardingProgress;
  sources: OnboardingSource[];
  runs: OnboardingRun[];
  category_summaries: CategorySummary[];
  missing_data: MissingData;
  important_missing_data: string[];
  confirmations_needed: string[];
  confirmations: string[];
  can_continue: boolean;
  ready_for_autonomous_actions: boolean;
}

export interface StandardEnvelopeMeta {
  request_id: string;
  generated_at: string;
  accepted?: boolean;
}

export interface OnboardingStateResponse {
  success: boolean;
  data: OnboardingStateData;
  meta: StandardEnvelopeMeta;
  errors: unknown[];
}

/**
 * Paginated Category Items Fetch Response
 */
export interface CategoryItemPayload {
  name?: string;
  description?: string;
  price?: number;
  [key: string]: unknown;
}

export interface CategoryItemCitation {
  source: string;
  heading_path?: string[];
  [key: string]: unknown;
}

export interface CategoryItem {
  id: string;
  fact_type: string;
  payload: CategoryItemPayload;
  citation?: CategoryItemCitation;
  confidence: number;
  review_status: 'pending' | 'approved' | 'rejected' | string;
  approval_status: 'draft' | 'published' | string;
  reviewer: string | null;
  review_reason: string | null;
  created_at: string;
  reviewed_at: string | null;
}

export interface CategoryItemsPagination {
  page: number;
  page_size: number;
  total: number;
  pages: number;
}

export interface CategoryItemsData {
  category: string;
  items: CategoryItem[];
  pagination: CategoryItemsPagination;
}

export interface CategoryItemsResponse {
  success: boolean;
  data: CategoryItemsData;
}
