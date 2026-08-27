/** Phase 8: start Follei calling this workspace's leads. */

import api from '../../lib/axios';

export interface CampaignPreviewLead {
  id: string;
  name: string | null;
  phone: string | null;
}

export interface CampaignPreview {
  dry_run: true;
  would_call: number;
  capped_at: number;
  telephony_ready: boolean;
  reason: string | null;
  leads: CampaignPreviewLead[];
}

export interface CampaignResult {
  dry_run: false;
  placed: number;
  failed: Array<{ lead_id: string; error: string }>;
}

/**
 * Preview who would be called. Places no calls.
 *
 * Always shown before starting: a campaign dials real people and spends real
 * telephony credit, and neither can be undone.
 */
export const previewCampaign = async (workspaceId: string): Promise<CampaignPreview> => {
  const { data } = await api.post<CampaignPreview>(`/api/workspaces/${workspaceId}/campaign/start`);
  return data;
};

/** Actually start calling. */
export const startCampaign = async (workspaceId: string): Promise<CampaignResult> => {
  const { data } = await api.post<CampaignResult>(
    `/api/workspaces/${workspaceId}/campaign/start`,
    undefined,
    { params: { confirm: true } },
  );
  return data;
};
