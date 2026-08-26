/**
 * Projects (workspaces) in the sidebar.
 *
 * A project is a workspace: its own leads, goal, documents and pitch. The
 * sidebar needs to list them, start a new one, and rename it -- the name is
 * generated from the goal, so the user must be able to override it.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorMessage } from '../lib/axios';
import { queryKeys } from '../lib/queryClient';
import {
  createWorkspace,
  listBusinesses,
  listWorkspaces,
  renameWorkspace,
  type Workspace,
} from '../api/dashboard/dashboard.api';
import { isAuthenticated } from '../lib/auth';
import { setActiveWorkspaceId } from './useWorkspace';

export const useProjects = () => {
  const client = useQueryClient();

  const query = useQuery({
    queryKey: queryKeys.workspaces,
    queryFn: listWorkspaces,
    enabled: isAuthenticated(),
  });

  const create = useMutation({
    mutationFn: async (name?: string) => {
      // A workspace needs a business. Setup created one; reuse it rather than
      // making a second business per project.
      const businesses = await listBusinesses();
      const business = businesses[0];
      if (!business) throw new Error('Finish business setup before adding a project');
      return createWorkspace({
        business_id: business.id,
        // Deliberately a placeholder: the backend replaces it with a name
        // generated from the goal once the goal is captured.
        name: name?.trim() || 'My workspace',
      });
    },
    onSuccess: (workspace) => {
      setActiveWorkspaceId(workspace.id);
      client.invalidateQueries({ queryKey: queryKeys.workspaces });
    },
    onError: (error) => toast.error(errorMessage(error, 'Could not create the project')),
  });

  const rename = useMutation({
    mutationFn: ({ workspaceId, name }: { workspaceId: string; name: string }) =>
      renameWorkspace(workspaceId, name),
    onSuccess: () => client.invalidateQueries({ queryKey: queryKeys.workspaces }),
    onError: (error) => toast.error(errorMessage(error, 'Could not rename the project')),
  });

  const projects: Workspace[] = query.data ?? [];
  return { projects, isLoading: query.isLoading, create, rename };
};
