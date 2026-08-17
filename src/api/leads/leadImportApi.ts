import axiosInstance from '../../lib/axios';
import { getTenantId } from '../../lib/auth';
import { API_ENDPOINTS } from '../endpoints';

export interface LeadImportJob {
  id: string;
  job_id?: string;
  public_id: string;
  filename: string;
  file_type: string;
  status: string;
  total_rows?: number | null;
  valid_rows?: number | null;
  duplicate_rows?: number | null;
  invalid_rows?: number | null;
  error_message?: string | null;
}

export interface LeadImportPreview {
  job_id: string;
  status: string;
  total_rows: number;
  new_rows: unknown[];
  update_rows: unknown[];
  duplicate_rows: unknown[];
  conflict_rows: unknown[];
  invalid_rows: unknown[];
  needs_review_rows: unknown[];
}

export interface LeadImportCommit {
  status: string;
  total_imported: number;
  total_new: number;
  total_updated: number;
  total_duplicates: number;
  total_conflicts: number;
  total_invalid: number;
  message: string;
  flow_enrollment?: Record<string, unknown> | null;
}

export const leadImportApi = {
  upload: async (file: File): Promise<LeadImportJob> => {
    const tenantId = getTenantId();
    if (!tenantId) throw new Error('Tenant session is missing. Please sign in again.');
    const form = new FormData();
    form.append('tenant_id', tenantId);
    form.append('file', file);
    const response = await axiosInstance.post(API_ENDPOINTS.LEADS.IMPORT_UPLOAD, form, {
      timeout: 120000,
    });
    return response.data;
  },

  getJob: async (jobId: string): Promise<LeadImportJob> =>
    (await axiosInstance.get(`${API_ENDPOINTS.LEADS.IMPORT}/${jobId}`)).data,

  preview: async (jobId: string): Promise<LeadImportPreview> =>
    (await axiosInstance.get(`${API_ENDPOINTS.LEADS.IMPORT}/${jobId}/preview`)).data,

  commit: async (jobId: string): Promise<LeadImportCommit> =>
    (await axiosInstance.post(`${API_ENDPOINTS.LEADS.IMPORT}/${jobId}/commit`)).data,
};
