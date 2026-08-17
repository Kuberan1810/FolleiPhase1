import axiosInstance from '../../lib/axios';
import { getTenantId } from '../../lib/auth';
import { API_ENDPOINTS } from '../endpoints';

export type KnowledgeCategory =
  | 'products'
  | 'services'
  | 'pricing'
  | 'plans'
  | 'policies'
  | 'faqs'
  | 'competitors'
  | 'customer_segments'
  | 'sales_processes'
  | 'support_processes'
  | 'payment_processes'
  | 'general';

export interface IndexingJob {
  job_id: string;
  document_id: string | null;
  status: string;
  disposition: string;
  last_error?: string | null;
}

export const knowledgeApi = {
  uploadDocument: async (file: File, category: KnowledgeCategory = 'general') => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant session is missing. Please sign in again.');
    const form = new FormData();
    form.append('file', file);
    form.append('tenant_id', tenantId);
    form.append('primary_category', category);
    form.append('uploaded_by', 'tenant_admin');
    return (await axiosInstance.post(API_ENDPOINTS.KNOWLEDGE.UPLOAD, form)).data as IndexingJob;
  },

  getJob: async (jobId: string): Promise<IndexingJob> =>
    (await axiosInstance.get(`${API_ENDPOINTS.KNOWLEDGE.JOBS}/${jobId}`)).data,

  ingestWebsite: async (url: string, maxPages = 10, category: KnowledgeCategory = 'general') =>
    (
      await axiosInstance.post(API_ENDPOINTS.KNOWLEDGE.WEBSITE_INGEST, {
        url,
        max_pages: Math.min(25, Math.max(1, maxPages)),
        category,
        confirm_authorized: true,
      })
    ).data as { job_id: string; asset_job_ids: string[]; status: string },
};
