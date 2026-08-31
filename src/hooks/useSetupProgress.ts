import { useQuery } from '@tanstack/react-query';
import { getWorkspace, type Workspace } from '../api/dashboard/dashboard.api';
import { listDocuments } from '../api/setup/setup.api';
import { listLeads } from '../api/leads/leads.api';
import { queryKeys } from '../lib/queryClient';
import { useActiveWorkspace } from './useWorkspace';

export const useSetupProgress = () => {
  const { workspaceId, isLoading: workspaceLoading } = useActiveWorkspace();

  const workspaceQuery = useQuery({
    queryKey: queryKeys.workspace(workspaceId ?? ''),
    queryFn: () => getWorkspace(workspaceId!),
    enabled: Boolean(workspaceId),
    staleTime: 0,
  });

  const docsQuery = useQuery({
    queryKey: queryKeys.documents(workspaceId ?? ''),
    queryFn: () => listDocuments(workspaceId!),
    enabled: Boolean(workspaceId),
    staleTime: 5000,
  });

  const leadsQuery = useQuery({
    queryKey: queryKeys.leads(workspaceId ?? ''),
    queryFn: () => listLeads(workspaceId!),
    enabled: Boolean(workspaceId),
    staleTime: 5000,
  });

  const workspace: Workspace | undefined = workspaceQuery.data;
  const docs = docsQuery.data ?? [];
  const leads = leadsQuery.data ?? [];

  // 6 Dashboard Setup steps:
  // 1: Business, 2: Customer Type, 3: CRM, 4: Business Data, 5: Leads, 6: Finish Setup & Goal
  const totalStages = 6;
  let stageIndex = 0;
  let stageLabel = 'Tell Follei about your business';
  let missingItem: string | null = null;
  let targetRoute = '/dashboard-setup';
  let actionLabel = 'Continue setup';

  const hasBusiness = Boolean(workspace?.business_id);
  const hasDocuments = docs.length > 0;
  const hasLeads = leads.length > 0;
  const hasGoal = Boolean(workspace?.goal_text);
  const isVerified = workspace?.stage === 'VERIFIED';

  if (!hasBusiness) {
    stageIndex = 0;
    stageLabel = 'Tell Follei about your business';
    missingItem = 'Business info missing';
    targetRoute = '/dashboard-setup';
    actionLabel = 'Complete business info';
  } else if (!hasDocuments) {
    stageIndex = 3; // Step 4: Business Data
    stageLabel = 'Upload your business data & docs';
    missingItem = 'Business data missing';
    targetRoute = '/dashboard-setup';
    actionLabel = 'Upload business data';
  } else if (!hasLeads) {
    stageIndex = 4; // Step 5: Leads
    stageLabel = 'Import your leads list (CSV)';
    missingItem = 'Leads missing (0 leads)';
    targetRoute = '/dashboard-setup';
    actionLabel = 'Import leads';
  } else if (!hasGoal) {
    stageIndex = 5; // Step 6: Finish Setup & Goal
    stageLabel = 'Define your project goal & sales package';
    missingItem = 'Goal missing';
    targetRoute = '/home';
    actionLabel = 'Set project goal';
  } else if (!isVerified) {
    stageIndex = 5;
    stageLabel = 'Review your sales package & script';
    missingItem = 'Package not approved';
    targetRoute = '/home';
    actionLabel = 'Review sales package';
  } else {
    stageIndex = 6;
    stageLabel = 'Setup complete';
    missingItem = null;
    targetRoute = '/dashboard';
    actionLabel = 'View dashboard';
  }

  // Setup is complete ONLY IF business, documents, leads (lead count > 0), and verification are done
  const isComplete = hasBusiness && hasDocuments && hasLeads && hasGoal && isVerified;

  return {
    workspace,
    workspaceId,
    stage: workspace?.stage ?? 'DRAFT',
    stageLabel,
    missingItem,
    route: targetRoute,
    actionLabel,
    stageIndex: Math.min(stageIndex, totalStages - 1),
    totalStages,
    hasDocuments,
    hasLeads,
    isComplete,
    shouldShowSetup:
      Boolean(workspaceId) &&
      !workspaceLoading &&
      !workspaceQuery.isLoading &&
      !isComplete,
  };
};

export default useSetupProgress;
