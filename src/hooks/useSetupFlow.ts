/**
 * The Phase 1 setup flow, backed by the real API.
 *
 * Order matters: a workspace cannot exist without a business, and documents
 * and leads cannot be uploaded without a workspace. So the business and its
 * first workspace are created once category + customer type + CRM are known
 * (after the CRM step), and every later step uploads into that workspace.
 */

import { useCallback, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { errorMessage } from '../lib/axios';
import {
  createBusiness,
  createWorkspace,
  type Business,
  type Workspace,
} from '../api/dashboard/dashboard.api';
import { uploadDocument, type WorkspaceDocument } from '../api/setup/setup.api';
import { importLeadsCsv } from '../api/leads/leads.api';

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
  const [state, setState] = useState<SetupFlowState>(INITIAL);
  const [isCreatingWorkspace, setIsCreatingWorkspace] = useState(false);
  const [isUploadingDocuments, setIsUploadingDocuments] = useState(false);
  const [isImportingLeads, setIsImportingLeads] = useState(false);

  // The steps run from a state machine that can fire twice on a fast double
  // click. A ref guards creation because state updates are async and would
  // let a second call through before `business` is set.
  const creatingRef = useRef(false);

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
    [ensureWorkspace],
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
        toast.success(`Imported ${imported} lead${imported === 1 ? '' : 's'}`);
        return imported;
      } catch (error) {
        toast.error(errorMessage(error, 'Could not import your leads'));
        return null;
      } finally {
        setIsImportingLeads(false);
      }
    },
    [ensureWorkspace],
  );

  return {
    ...state,
    isCreatingWorkspace,
    isUploadingDocuments,
    isImportingLeads,
    setBusinessCategory,
    setCustomerType,
    setCrmProvider,
    ensureWorkspace,
    uploadBusinessData,
    uploadLeads,
  };
};
