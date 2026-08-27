import { useQuery } from '@tanstack/react-query';
import { getDashboardStats, type DashboardStats } from '../api/dashboard/stats.api';
import { useActiveWorkspace } from './useWorkspace';

export const useDashboardStats = () => {
  const { workspaceId } = useActiveWorkspace();
  const query = useQuery({
    queryKey: ['dashboard-stats', workspaceId ?? ''],
    queryFn: () => getDashboardStats(workspaceId!),
    enabled: Boolean(workspaceId),
  });
  return {
    stats: (query.data ?? null) as DashboardStats | null,
    isLoading: query.isLoading,
  };
};
