/**
 * Projects (one backend Company per project) and the live workflow snapshot.
 *
 * A project's whole state — profile, competitors, ICP, lead sheet, contacts and
 * campaigns — arrives in one `GET /api/workflows/{id}` payload, so every page
 * reads the same cached snapshot and only one poll runs per project.
 */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { coirei, projectName, activeJob, type Data, type Snapshot } from '../api/coirei';
import { getStoredUser, isSignedIn } from '../lib/auth';

export const keys = {
  session: ['session'] as const,
  projects: ['projects'] as const,
  snapshot: (id: string) => ['workflow', id] as const,
  gmail: ['gmail'] as const,
};

export interface Project {
  id: string;
  name: string;
  website: string;
  state: string;
}

/** The signed-in account. Seeded from the cached user so a reload renders the
 *  shell immediately instead of flashing the sign-in screen. */
export function useSession() {
  return useQuery({
    queryKey: keys.session,
    queryFn: coirei.me,
    enabled: isSignedIn(),
    initialData: getStoredUser() ?? undefined,
    retry: false,
    staleTime: 60_000,
  });
}

export function useProjects(enabled = true) {
  const cache = useQueryClient();
  const query = useQuery({
    queryKey: keys.projects,
    queryFn: async (): Promise<Project[]> =>
      (await coirei.projects()).map((row) => ({
        id: row.id, name: projectName(row), website: row.website, state: row.state,
      })),
    enabled,
  });

  const invalidate = () => cache.invalidateQueries({ queryKey: keys.projects });

  const rename = useMutation({
    mutationFn: ({ workspaceId, name }: { workspaceId: string; name: string }) =>
      coirei.renameProject(workspaceId, name),
    onSuccess: () => { invalidate(); toast.success('Project renamed'); },
    onError: (error: Error) => toast.error(error.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => coirei.deleteProject(id),
    onSuccess: (_result, id) => {
      cache.removeQueries({ queryKey: keys.snapshot(id) });
      invalidate();
      toast.success('Project deleted');
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return { projects: query.data, isLoading: query.isPending, error: query.error, rename, remove, refetch: query.refetch };
}

/**
 * The project snapshot. Polls only while research is in flight so an idle
 * project costs nothing; the interval is deliberately slow because each stage
 * takes minutes, not seconds.
 */
export function useSnapshot(projectId: string | undefined) {
  return useQuery({
    queryKey: keys.snapshot(projectId ?? 'none'),
    queryFn: () => coirei.snapshot(projectId as string),
    enabled: Boolean(projectId),
    refetchInterval: (query) => (activeJob(query.state.data as Snapshot | undefined) ? 4000 : false),
  });
}

export function useGmail(enabled = true) {
  return useQuery({ queryKey: keys.gmail, queryFn: coirei.gmailConnections, enabled, refetchInterval: 20_000 });
}

/** Run a backend call, surface failures as a toast, then refresh the project. */
export function useAction(projectId: string | undefined) {
  const cache = useQueryClient();
  return useMutation({
    mutationFn: (work: () => Promise<unknown>) => work(),
    onSuccess: () => {
      if (projectId) cache.invalidateQueries({ queryKey: keys.snapshot(projectId) });
      cache.invalidateQueries({ queryKey: keys.projects });
    },
    onError: (error: Error) => toast.error(error.message),
  });
}

export type { Data, Snapshot };
