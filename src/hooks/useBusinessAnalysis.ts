/**
 * Phase 1's analysis of the uploaded documents. Fetched only once ingestion
 * has actually produced something -- asking earlier returns null and burns a
 * model call for nothing.
 */

import { useQuery } from '@tanstack/react-query';
import { getBusinessAnalysis } from '../api/setup/setup.api';

export const useBusinessAnalysis = (workspaceId: string | undefined, ready: boolean) => {
  const query = useQuery({
    queryKey: ['business-analysis', workspaceId ?? ''],
    queryFn: () => getBusinessAnalysis(workspaceId!),
    enabled: Boolean(workspaceId) && ready,
    // The analysis is a model call over the whole document set, so it should
    // not re-run just because a component remounted.
    staleTime: 10 * 60_000,
  });
  return {
    analysis: query.data ?? null,
    isAnalysing: query.isLoading || query.isFetching,
  };
};
