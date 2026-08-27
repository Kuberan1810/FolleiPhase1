/**
 * Shared react-query client. Defaults are tuned for this backend: several
 * endpoints are LLM-backed and slow, so refetching them casually is wasteful.
 */

import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      // The window regaining focus is not a reason to re-run an expensive
      // generation endpoint.
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const status = error instanceof AxiosError ? error.response?.status : undefined;
        // 4xx means the request itself was wrong -- retrying repeats the same
        // mistake. Only transient failures are worth a second attempt.
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },
    },
    mutations: { retry: false },
  },
});

/** Query keys in one place so invalidation after a mutation cannot silently
 *  miss a cache entry because two files spelled the key differently. */
export const queryKeys = {
  me: ['me'] as const,
  workspaces: ['workspaces'] as const,
  workspace: (id: string) => ['workspace', id] as const,
  leads: (workspaceId: string) => ['leads', workspaceId] as const,
  lead: (workspaceId: string, leadId: string) => ['lead', workspaceId, leadId] as const,
  attention: (workspaceId: string) => ['attention', workspaceId] as const,
  meetings: (workspaceId: string) => ['meetings', workspaceId] as const,
  campaigns: (workspaceId: string) => ['campaigns', workspaceId] as const,
  documents: (workspaceId: string) => ['documents', workspaceId] as const,
  requirements: (workspaceId: string) => ['requirements', workspaceId] as const,
  salesPackage: (workspaceId: string) => ['sales-package', workspaceId] as const,
  gapQuestions: (workspaceId: string) => ['gap-questions', workspaceId] as const,
  goalMessages: (workspaceId: string) => ['goal-messages', workspaceId] as const,
  goalSuggestions: (workspaceId: string) => ['goal-suggestions', workspaceId] as const,
};
