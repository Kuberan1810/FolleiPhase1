import axiosInstance from '../../lib/axios';
import { getTenantId } from '../../lib/auth';
import { API_ENDPOINTS } from '../endpoints';
import type {
  CategoryItem,
  CategoryItemsResponse,
  CategorySummary,
  OnboardingStateResponse,
} from './types';

interface BackendOnboardingStatus {
  tenant_id: string;
  profile_exists: boolean;
  complete: boolean;
  missing_fields: string[];
  documents: Array<{
    id?: string;
    document_id?: string;
    filename?: string;
    name?: string;
    status?: string;
  }>;
}

interface BackendFact {
  id: string;
  fact_type: string;
  payload: Record<string, unknown>;
  citation?: Record<string, unknown>;
  extraction_confidence?: number | null;
  approval_status: string;
  reviewer?: string | null;
  review_reason?: string | null;
  created_at?: string;
  reviewed_at?: string | null;
}

type BackendExtractionGroups = Record<string, BackendFact[]>;

const tenantId = (): string => {
  const value = getTenantId();
  if (!value) throw new Error('Tenant session is missing. Please sign in again.');
  return value;
};

const factToItem = (fact: BackendFact): CategoryItem => ({
  id: fact.id,
  fact_type: fact.fact_type,
  payload: fact.payload,
  citation: fact.citation as CategoryItem['citation'],
  confidence: fact.extraction_confidence || 0,
  review_status:
    fact.approval_status === 'draft' ? 'pending' : fact.approval_status,
  approval_status: fact.approval_status,
  reviewer: fact.reviewer || null,
  review_reason: fact.review_reason || null,
  created_at: fact.created_at || '',
  reviewed_at: fact.reviewed_at || null,
});

const getStatus = async (): Promise<BackendOnboardingStatus> =>
  (await axiosInstance.get(API_ENDPOINTS.ONBOARDING.STATUS)).data;

const getExtractionGroups = async (): Promise<BackendExtractionGroups> => {
  const response = await axiosInstance.get(API_ENDPOINTS.ONBOARDING.EXTRACTIONS, {
    params: { review_status: 'draft' },
  });
  return response.data?.categories || {};
};

export const onboardingApi = {
  getStatus,

  /** Adapts the backend's status + extraction endpoints to the existing UI model. */
  getOnboardingState: async (): Promise<OnboardingStateResponse> => {
    const [status, groups] = await Promise.all([getStatus(), getExtractionGroups()]);
    const entries = Object.entries(groups);
    const categorySummaries: CategorySummary[] = entries.map(([key, facts]) => ({
      key,
      label: key.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
      category_group: 'Company knowledge',
      status: facts.length ? 'found' : 'pending',
      count: facts.length,
      summary: facts.length ? `${facts.length} extracted facts need review` : 'No facts found',
      confidence:
        facts.length
          ? facts.reduce((total, fact) => total + (fact.extraction_confidence || 0), 0) / facts.length
          : 0,
      needs_review: facts.some((fact) => fact.approval_status === 'draft'),
      display: {
        mode: 'enumerable',
        review_progress: {
          reviewed: facts.filter((fact) => fact.approval_status !== 'draft').length,
          total: facts.length,
        },
      },
    }));
    const activeDocuments = status.documents.filter((document) =>
      ['queued', 'processing', 'parsing', 'extracting'].includes(document.status || ''),
    );

    return {
      success: true,
      data: {
        step: !status.profile_exists ? 'profile' : categorySummaries.some((item) => item.needs_review) ? 'knowledge_review' : 'ready',
        progress: {
          profile_complete: status.complete,
          sources_connected: status.documents.length,
          runs_active: activeDocuments.length,
          categories_found: categorySummaries.filter((item) => item.count > 0).length,
          categories_total: categorySummaries.length,
        },
        sources: status.documents.map((document) => ({
          id: document.document_id || document.id || document.filename || 'document',
          name: document.filename || document.name || 'Company document',
          type: 'document',
          status: document.status || 'unknown',
        })),
        runs: [],
        category_summaries: categorySummaries,
        missing_data: { profile: status.missing_fields, optional: [] },
        important_missing_data: status.missing_fields,
        confirmations_needed: [],
        confirmations: [],
        can_continue: status.complete,
        ready_for_autonomous_actions: status.complete && activeDocuments.length === 0,
      },
      meta: {
        request_id: '',
        generated_at: new Date().toISOString(),
      },
      errors: [],
    };
  },

  getCategoryItems: async (
    categoryKey: string,
    page = 1,
    pageSize = 25,
  ): Promise<CategoryItemsResponse> => {
    const groups = await getExtractionGroups();
    const allItems = (groups[categoryKey] || []).map(factToItem);
    const start = (page - 1) * pageSize;
    return {
      success: true,
      data: {
        category: categoryKey,
        items: allItems.slice(start, start + pageSize),
        pagination: {
          page,
          page_size: pageSize,
          total: allItems.length,
          pages: Math.max(1, Math.ceil(allItems.length / pageSize)),
        },
      },
    };
  },

  updateUserProfile: async (data: Record<string, unknown>) =>
    (await axiosInstance.patch(API_ENDPOINTS.ONBOARDING.USER_PROFILE, data)).data,

  saveCompanyProfile: async (data: Record<string, unknown>) => {
    const status = await getStatus();
    const method = status.profile_exists ? axiosInstance.patch : axiosInstance.post;
    return (await method(API_ENDPOINTS.ONBOARDING.PROFILE, data)).data;
  },

  createCompanyProfile: async (data: Record<string, unknown>) =>
    onboardingApi.saveCompanyProfile(data),

  reviewCategoryItem: async (itemId: string) =>
    (
      await axiosInstance.post(`${API_ENDPOINTS.KNOWLEDGE.FACTS}/${itemId}/approve`, {
        tenant_id: tenantId(),
        reviewer: 'tenant_admin',
        reason: 'Approved during onboarding review',
      })
    ).data,

  rejectCategoryItem: async (itemId: string, data: { reason?: string }) =>
    (
      await axiosInstance.post(`${API_ENDPOINTS.KNOWLEDGE.FACTS}/${itemId}/reject`, {
        tenant_id: tenantId(),
        reviewer: 'tenant_admin',
        reason: data.reason || 'Rejected during onboarding review',
      })
    ).data,

  complete: async () =>
    (await axiosInstance.post(API_ENDPOINTS.ONBOARDING.COMPLETE)).data,
};

export default onboardingApi;
