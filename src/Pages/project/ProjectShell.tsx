/**
 * Loads one project's snapshot and shares it with the five project pages, so a
 * single poll backs Home, Competitors, Leads, Campaigns and Outreach.
 */
import { createContext, useContext, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { activeJob, currentJob, coirei, type Data, type Snapshot } from '../../api/coirei';
import { keys, useSnapshot } from '../../hooks/useProjects';
import { EvidenceDrawer, ErrorState } from '../../Component/Page';
import ChatSkeletonLoading from '../../Component/ChatSkeletonLoading';

interface ProjectContext {
  projectId: string;
  snapshot: Snapshot;
  /** The job currently queued or running anywhere on this project. */
  active?: Data;
  /** The job the workflow stage is waiting on (may have failed). */
  current?: Data;
  stage: string;
  busy: boolean;
  /** Run a backend call, toast failures, then refresh the snapshot. */
  perform: (work: () => Promise<unknown>) => Promise<void>;
  refresh: () => Promise<void>;
  openEvidence: (data: Data | null) => void;
}

const Context = createContext<ProjectContext | null>(null);

export function useProject() {
  const value = useContext(Context);
  if (!value) throw new Error('useProject must be used inside a project route');
  return value;
}

export default function ProjectShell() {
  const { projectId = '' } = useParams();
  const cache = useQueryClient();
  const query = useSnapshot(projectId);
  const [busy, setBusy] = useState(false);
  const [evidence, setEvidence] = useState<Data | null>(null);

  const refresh = async () => {
    await cache.invalidateQueries({ queryKey: keys.snapshot(projectId) });
  };

  const perform = async (work: () => Promise<unknown>) => {
    setBusy(true);
    try {
      await work();
      await refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setBusy(false);
    }
  };

  if (query.isPending) return <ChatSkeletonLoading />;
  if (query.error || !query.data) {
    return <ErrorState message={(query.error as Error)?.message || 'Project not found'} onRetry={() => void query.refetch()} />;
  }

  const snapshot = query.data;
  const value: ProjectContext = {
    projectId,
    snapshot,
    active: activeJob(snapshot),
    current: currentJob(snapshot),
    stage: snapshot.flow.stage || 'intake',
    busy,
    perform,
    refresh,
    openEvidence: setEvidence,
  };

  return (
    <Context.Provider value={value}>
      <Outlet />
      <EvidenceDrawer
        data={evidence}
        onClose={() => setEvidence(null)}
        onSegment={(key) => setEvidence((current) => ({ label: key, ...(current?.components?.[key] || {}) }))}
      />
    </Context.Provider>
  );
}

/** Stop the project's active research job, whichever kind it is. */
export const stopJob = (job: Data | undefined, projectId: string) =>
  job?.kind === 'workflow' ? coirei.act(projectId, 'cancel') : coirei.cancelJob(job?.id as string);
