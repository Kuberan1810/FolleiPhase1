/**
 * The active workspace. Everything after Phase 1 (leads, goal, documents,
 * pitch) is scoped to one, and a business can have several, so the choice is
 * remembered rather than re-derived on every page.
 */

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { listWorkspaces, type Workspace } from '../api/dashboard/dashboard.api';
import { queryKeys } from '../lib/queryClient';
import { isAuthenticated } from '../lib/auth';

const ACTIVE_WORKSPACE_KEY = 'follei.active_workspace';

export const getActiveWorkspaceId = (): string | null =>
  localStorage.getItem(ACTIVE_WORKSPACE_KEY);

export const setActiveWorkspaceId = (id: string): void =>
  localStorage.setItem(ACTIVE_WORKSPACE_KEY, id);

export const useWorkspaces = () => {
  const query = useQuery({
    queryKey: queryKeys.workspaces,
    queryFn: listWorkspaces,
    // Every workspace endpoint is authenticated; querying while signed out
    // would only produce a 401 and a pointless refresh attempt.
    enabled: isAuthenticated(),
  });
  return {
    workspaces: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};

/**
 * Resolves the workspace to work in: the remembered one if it still exists,
 * otherwise the first available. Returns undefined while loading so callers
 * can distinguish "not yet known" from "none exist".
 */
export const useActiveWorkspace = (): {
  workspace: Workspace | undefined;
  workspaceId: string | undefined;
  workspaces: Workspace[];
  isLoading: boolean;
  hasNoWorkspace: boolean;
} => {
  const { workspaces, isLoading } = useWorkspaces();
  const storedId = getActiveWorkspaceId();
  const workspace = workspaces.find((w) => w.id === storedId) ?? workspaces[0];

  useEffect(() => {
    // Re-pin when the stored id is stale (workspace deleted, different
    // account) so the next page load does not fall back again.
    if (workspace && workspace.id !== storedId) setActiveWorkspaceId(workspace.id);
  }, [workspace, storedId]);

  return {
    workspace,
    workspaceId: workspace?.id,
    workspaces,
    isLoading,
    hasNoWorkspace: !isLoading && workspaces.length === 0,
  };
};
