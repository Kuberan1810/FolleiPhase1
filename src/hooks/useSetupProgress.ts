/**
 * Whether onboarding is still in progress, for the whole app.
 *
 * The setup panel used to live only on /dashboard-setup, so navigating away
 * lost it. Setup is a property of the workspace, not of one page: it is
 * finished when the workspace reaches VERIFIED (Phase 7 approved), and until
 * then the panel should follow the user around.
 */

import { useQuery } from '@tanstack/react-query';
import { getWorkspace, type Workspace } from '../api/dashboard/dashboard.api';
import { queryKeys } from '../lib/queryClient';
import { useActiveWorkspace } from './useWorkspace';

/** Phase 7 approved. Everything before this still needs the user. */
const COMPLETE_STAGE = 'VERIFIED';

const STAGE_ORDER = [
  'DRAFT',
  'GOAL_SET',
  'REQUIREMENTS_DRAFTED',
  'GAP_FILLING',
  'PACKAGE_GENERATED',
  'VERIFIED',
];

export const useSetupProgress = () => {
  const { workspaceId, isLoading: workspaceLoading } = useActiveWorkspace();

  const query = useQuery({
    queryKey: queryKeys.workspace(workspaceId ?? ''),
    queryFn: () => getWorkspace(workspaceId!),
    enabled: Boolean(workspaceId),
  });

  const workspace: Workspace | undefined = query.data;
  const stage = workspace?.stage ?? 'DRAFT';
  const isComplete = stage === COMPLETE_STAGE;

  return {
    workspace,
    workspaceId,
    stage,
    stageIndex: Math.max(0, STAGE_ORDER.indexOf(stage)),
    totalStages: STAGE_ORDER.length,
    isComplete,
    // Don't flash the panel while we're still finding out which workspace
    // this is -- it would appear and vanish on every page load.
    shouldShowSetup: Boolean(workspaceId) && !workspaceLoading && !query.isLoading && !isComplete,
  };
};
