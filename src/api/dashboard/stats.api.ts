/** Dashboard figures, from the workspace's own rows. */

import api from '../../lib/axios';

export interface Metric {
  value: number;
  /** null means there is nothing to compare against, not a change of zero. */
  change: number | null;
}

export interface DashboardStats {
  total_leads: Metric;
  hot_leads: Metric;
  converted: Metric;
  /** null means the feature has no backing data yet, not that the count is 0. */
  meetings_booked: Metric | null;
  needs_attention: number;
  calls_made: number;
  leads_called_share: number | null;
  contacted_share: number | null;
}

export const getDashboardStats = async (workspaceId: string): Promise<DashboardStats> => {
  const { data } = await api.get<DashboardStats>(`/api/workspaces/${workspaceId}/dashboard/stats`);
  return data;
};
