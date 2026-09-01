/**
 * The Phase 1 setup flow, backed by the real API.
 *
 * Order matters: a workspace cannot exist without a business, and documents
 * and leads cannot be uploaded without a workspace. So the business and its
 * first workspace are created once category + customer type + CRM are known
 * (after the CRM step), and every later step uploads into that workspace.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { errorMessage } from '../lib/axios';
import { queryKeys } from '../lib/queryClient';
import {
  createBusiness,
  createWorkspace,
  listBusinesses,
  listWorkspaces,
  type Business,
  type Workspace,
} from '../api/dashboard/dashboard.api';
import { listDocuments, uploadDocument, type WorkspaceDocument } from '../api/setup/setup.api';
import { importLeadsCsv, listLeads } from '../api/leads/leads.api';
import { getActiveWorkspaceId, setActiveWorkspaceId } from './useWorkspace';

export interface SetupFlowState {
  businessCategory: string;
  customerType: string;
  crmProvider: string | null;
  business: Business | null;
  workspace: Workspace | null;
  documents: WorkspaceDocument[];
  leadCount: number;
}

const INITIAL: SetupFlowState = {
  businessCategory: '',
  customerType: '',
  crmProvider: null,
  business: null,
  workspace: null,
  documents: [],
  leadCount: 0,
};

export const useSetupFlow = (companyName: string) => {
  const queryClient = useQueryClient();
  const [state, setState] = useState<SetupFlowState>(INITIAL);
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [isUploadingDocuments, setIsUploadingDocuments] = useState(false);
  const [isImportingLeads, setIsImportingLeads] = useState(false);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  // The steps run from a state machine that can fire twice on a fast double
  // click. A ref guards creation because state updates are async and would
  // let a second call through before `business` is set.
  const creatingRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    const restore = async () => {
      try {
        const businesses = await listBusinesses();
        const business = businesses[0];
        if (!business) {
          if (!cancelled) setState(INITIAL);
          return;
        }
        const workspaces = await listWorkspaces();
        // Honour the active workspace first. Creating a second project and
        // landing on setup would otherwise restore the first workspace and
        // silently configure the wrong project.
        const activeId = getActiveWorkspaceId();
        const workspace =
          workspaces.find((row) => row.id === activeId) ??
          workspaces.find((row) => row.business_id === business.id) ??
          workspaces[0];
        if (!workspace) {
          if (!cancelled) setState(INITIAL);
          return;
        }
        const [documents, leads] = await Promise.all([
          listDocuments(workspace.id),
          listLeads(workspace.id),
        ]);
        if (cancelled) return;
        setActiveWorkspaceId(workspace.id);
        queryClient.setQueryData(queryKeys.documents(workspace.id), documents);
        queryClient.setQueryData(queryKeys.leads(workspace.id), leads);
        setState({
          businessCategory: business.category,
          customerType: business.customer_type,
          crmProvider: business.crm_provider,
          business,
          workspace,
          documents,
          leadCount: leads.length,
        });
      } catch (error) {
        if (!cancelled) toast.error(errorMessage(error, 'Could not restore your setup progress'));
      } finally {
        if (!cancelled) setIsBootstrapping(false);
      }
    };
    void restore();
    return () => { cancelled = true; };
  }, [queryClient]);

  const setBusinessCategory = useCallback(
    (category: string) => setState((s) => ({ ...s, businessCategory: category })),
    [],
  );
  const setCustomerType = useCallback(
    (customerType: string) => setState((s) => ({ ...s, customerType })),
    [],
  );
  const setCrmProvider = useCallback(
    (crmProvider: string | null) => setState((s) => ({ ...s, crmProvider })),
    [],
  );

  /**
   * Creates the business and its first workspace. Safe to call more than
   * once -- it returns the existing workspace instead of creating a second.
   */
  const ensureWorkspace = useCallback(
    async (overrides?: { businessCategory?: string; customerType?: string; crmProvider?: string | null }) => {
      if (state.workspace) return state.workspace;
      if (creatingRef.current) return null;
      creatingRef.current = true;
      setIsCreatingWorkspace(true);
      try {
        const category = overrides?.businessCategory ?? state.businessCategory;
        const customerType = overrides?.customerType ?? state.customerType;
        const crmProvider = overrides?.crmProvider ?? state.crmProvider;

        const business = await createBusiness({
          name: companyName || 'My business',
          category: category || 'Other',
          // Required by the backend; the flow always asks for it, but a
          // skipped step must not fail the whole request.
          customer_type: customerType || 'Unspecified',
          crm_provider: crmProvider,
        });
        const workspace = await createWorkspace({
          business_id: business.id,
          name: companyName || 'My workspace',
        });
        setState((s) => ({ ...s, business, workspace }));
        setActiveWorkspaceId(workspace.id);
        return workspace;
      } catch (error) {
        toast.error(errorMessage(error, 'Could not create your workspace'));
        return null;
      } finally {
        creatingRef.current = false;
        setIsCreatingWorkspace(false);
      }
    },
    [companyName, state.business, state.businessCategory, state.crmProvider, state.customerType, state.workspace],
  );

  /**
   * Uploads business documents and waits for the ingestion pipeline to
   * finish parsing, chunking, and embedding them.
   */
  const uploadBusinessData = useCallback(
    async (files: File[]) => {
      const workspace = await ensureWorkspace();
      if (!workspace) return null;
      setIsUploadingDocuments(true);
      try {
        // Sequentially, not Promise.all: each upload starts a background
        // ingestion task, and this backend embeds on the same machine.
        // Firing them at once would multiply an already slow step.
        const uploaded: WorkspaceDocument[] = [];
        for (const file of files) {
          uploaded.push(await uploadDocument(workspace.id, file));
        }
        setState((s) => ({ ...s, documents: uploaded }));
        queryClient.setQueryData(queryKeys.documents(workspace.id), uploaded);
        queryClient.invalidateQueries({ queryKey: queryKeys.documents(workspace.id) });
        toast.success(
          `Uploaded ${uploaded.length} document${uploaded.length === 1 ? '' : 's'} -- Follei is reading them`,
        );
        // Deliberately NOT waiting for ingestion here. Embedding can take
        // minutes on a CPU-only host, and blocking the setup step behind it
        // strands the user on a spinner. useDocuments polls the real status
        // and the panel shows each file as it lands.
        return uploaded;
      } catch (error) {
        toast.error(errorMessage(error, 'Could not upload your business data'));
        return null;
      } finally {
        setIsUploadingDocuments(false);
      }
    },
    [ensureWorkspace, queryClient],
  );

  const uploadLeads = useCallback(
    async (files: File[]) => {
      const workspace = await ensureWorkspace();
      if (!workspace || !files.length) return null;
      setIsImportingLeads(true);
      try {
        let imported = 0;
        for (const file of files) {
          const result = await importLeadsCsv(workspace.id, file);
          imported += result.imported;
        }
        setState((s) => ({ ...s, leadCount: s.leadCount + imported }));
        queryClient.invalidateQueries({ queryKey: queryKeys.leads(workspace.id) });
        toast.success(`Imported ${imported} lead${imported === 1 ? '' : 's'}`);
        return imported;
      } catch (error) {
        toast.error(errorMessage(error, 'Could not import your leads'));
        return null;
      } finally {
        setIsImportingLeads(false);
      }
    },
    [ensureWorkspace, queryClient],
  );

  return {
    ...state,
    isCreatingWorkspace,
    isUploadingDocuments,
    isImportingLeads,
    isBootstrapping,
    setBusinessCategory,
    setCustomerType,
    setCrmProvider,
    ensureWorkspace,
    uploadBusinessData,
    uploadLeads,
  };
};
