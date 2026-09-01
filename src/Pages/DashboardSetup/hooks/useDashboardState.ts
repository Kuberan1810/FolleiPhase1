import { useEffect, useState } from 'react';
import { useSetupFlow } from '../../../hooks/useSetupFlow';
import { useDocuments } from '../../../hooks/useDocuments';
import { useBusinessAnalysis } from '../../../hooks/useBusinessAnalysis';
import type { SetupStep, PromptSuggestion, UserProfile, WorkspaceContextItem } from '../types';
import { INITIAL_SETUP_STEPS, PROMPT_SUGGESTIONS, READY_PROMPT_SUGGESTIONS, STEP_CONFIGS, DEFAULT_USER } from '../data';
import { getStoredUser } from '../../../lib/auth';

export const useDashboardState = () => {
  const [user] = useState<UserProfile>(() => {
    const stored = getStoredUser();
    if (!stored) return DEFAULT_USER;
    const name = stored.full_name || stored.email;
    return {
      name,
      email: stored.email,
      initials: name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase(),
    };
  });
  const [companyName, setCompanyName] = useState<string>(
    () => localStorage.getItem('follei.company_name') || 'My business',
  );
  const [promptText, setPromptText] = useState<string>('');
  const [miniPromptText, setMiniPromptText] = useState<string>('');
  const [steps, setSteps] = useState<SetupStep[]>(INITIAL_SETUP_STEPS);
  const [currentStepId, setCurrentStepId] = useState<string>('business');
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [workspaceItems, setWorkspaceItems] = useState<WorkspaceContextItem[]>([]);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);
  const [isMobileSetupOpen, setIsMobileSetupOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [activeSyncTool, setActiveSyncTool] = useState<string | null>(null);
  const [activeSyncStep, setActiveSyncStep] = useState<string | null>(null);
  const [isUploadBusinessDataModalOpen, setIsUploadBusinessDataModalOpen] = useState<boolean>(false);
  const [isUploadLeadsModalOpen, setIsUploadLeadsModalOpen] = useState<boolean>(false);

  const [isImportingBusinessData, setIsImportingBusinessData] = useState<boolean>(false);
  const [isImportingLeads, setIsImportingLeads] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isWorkspaceReady, setIsWorkspaceReady] = useState<boolean>(false);
  const [isProjectReady, setIsProjectReady] = useState<boolean>(false);

  // Suggestions & Step Configuration
  const suggestions: PromptSuggestion[] = isWorkspaceReady ? READY_PROMPT_SUGGESTIONS : PROMPT_SUGGESTIONS;
  const currentConfig = STEP_CONFIGS[currentStepId] || STEP_CONFIGS['business'];
  const currentStepIndex = steps.findIndex((s) => s.id === currentStepId) + 1 || 1;
  const totalSteps = steps.length;

  const handleSelectSuggestion = (text: string) => {
    setPromptText(text);
  };

  const [businessType, setBusinessType] = useState<string>('');
  const [customerType, setCustomerType] = useState<string>('');
  // Picking "Other" must not advance the step -- the flow asks what the
  // business actually does and stores that free-text answer as the category.
  const [awaitingCustomAnswer, setAwaitingCustomAnswer] = useState<string | null>(null);

  const setup = useSetupFlow(companyName);
  // Live ingestion status, polled from the server rather than faked with a timer.
  const ingestion = useDocuments(setup.workspace?.id);
  // Only ask for the analysis once something has finished ingesting -- before
  // that it would return null and spend a model call for nothing.
  const { analysis, isAnalysing } = useBusinessAnalysis(
    setup.workspace?.id,
    ingestion.processed.length > 0 && !ingestion.isIngesting,
  );

  useEffect(() => {
    if (setup.isBootstrapping) return;
    if (!setup.business || !setup.workspace) {
      setSteps(INITIAL_SETUP_STEPS);
      setCurrentStepId('business');
      setMaxReachedIndex(0);
      setWorkspaceItems([]);
      setIsComplete(false);
      setIsWorkspaceReady(false);
      return;
    }
    // Captured after the guard: the setWorkspaceItems callback runs later,
    // so the narrowing on setup.business does not survive into it.
    const business = setup.business;

    setCompanyName(business.name);
    setBusinessType(business.category);
    setCustomerType(business.customer_type);

    const allDocs = ingestion.documents.length > 0 ? ingestion.documents : setup.documents;
    const hasDocuments = allDocs.length > 0;
    const hasLeads = setup.leadCount > 0;
    const nextIndex = hasLeads ? 5 : hasDocuments ? 4 : 3;
    const nextStepId = INITIAL_SETUP_STEPS[nextIndex].id;
    setMaxReachedIndex(nextIndex);
    setCurrentStepId(nextStepId);
    setIsComplete(hasLeads);
    setSteps((current) => current.map((step, index) => ({
      ...step,
      status: index < nextIndex ? 'completed' : index === nextIndex ? 'active' : 'pending',
    })));
    setWorkspaceItems(() => {
      const isProcessing = allDocs.some((d) => d.status === 'UPLOADED' || d.status === 'PROCESSING');
      const isFailed = allDocs.length > 0 && allDocs.every((d) => d.status === 'FAILED');

      const items: WorkspaceContextItem[] = [
        {
          id: 'business-context',
          type: 'business',
          title: 'BUSINESS CONTEXT',
          status: 'Ready',
          value: `${business.category} · ${business.customer_type}`,
        },
        {
          id: 'crm-context',
          type: 'crm',
          title: 'CRM',
          status: business.crm_provider ? 'Preference saved' : 'None',
          value: business.crm_provider || 'No CRM',
        },
      ];

      // Only show BUSINESS DATA card if documents exist
      if (hasDocuments) {
        items.push({
          id: 'data-context',
          type: 'data',
          title: 'BUSINESS DATA',
          status: isFailed ? 'Needs attention' : isProcessing ? `Reading ${allDocs.length} of ${allDocs.length}` : 'Ready',
          value: `${allDocs.length} ${allDocs.length === 1 ? 'file' : 'files'} uploaded`,
          subtitle: allDocs.map((d) => d.filename).join(', ').slice(0, 80),
          isLoading: isProcessing,
          isEmpty: false,
          actionLabel: 'Add more files',
        });
      }

      // Only show LEADS card if leads exist
      if (hasLeads) {
        items.push({
          id: 'customer-context',
          type: 'customer',
          title: 'LEADS',
          status: 'Ready',
          value: `${setup.leadCount} lead${setup.leadCount === 1 ? '' : 's'} imported`,
          isLoading: false,
          isEmpty: false,
          actionLabel: 'Import more leads',
        });
      }

      return items;
    });
  }, [setup.isBootstrapping, setup.business, setup.workspace, setup.documents.length, setup.leadCount, ingestion.documents.length]);

  // The BUSINESS DATA card mirrors real ingestion state: each file's name and
  // status come from the server, so "Processing" means a task is genuinely
  // running rather than a timer being run down.
  useEffect(() => {
    if (!ingestion.documents.length) return;
    const { processed, failed, processing } = ingestion;
    setWorkspaceItems((prev) => {
      const isProcessing = processing.length > 0;
      const isFailed = failed.length > 0 && processed.length === 0;
      const next: WorkspaceContextItem = {
        id: 'data-context',
        type: 'data',
        title: 'BUSINESS DATA',
        status: isProcessing
          ? `Reading ${processing.length} of ${ingestion.documents.length}`
          : isFailed
            ? 'Needs attention'
            : 'Ready',
        value: `${ingestion.documents.length} ${ingestion.documents.length === 1 ? 'file' : 'files'}`,
        subtitle: isProcessing
          ? processing.map((d) => d.filename).join(', ').slice(0, 80)
          : failed.length
            ? `${failed[0].filename}: ${failed[0].failure_reason || 'failed'}`
            : ingestion.documents.map((d) => d.filename).join(', ').slice(0, 80),
        isLoading: isProcessing,
      };
      const index = prev.findIndex((item) => item.type === 'data');
      if (index >= 0) {
        const copy = [...prev];
        copy[index] = next;
        return copy;
      }
      return [...prev, next];
    });
  }, [ingestion.documents, ingestion.processed.length, ingestion.processing.length, ingestion.failed.length]);


  const [maxReachedIndex, setMaxReachedIndex] = useState<number>(0);

  const advanceStep = (stepValue: string, stepId: string, pendingFiles?: File[]) => {
    // 1. Add / Update Workspace context item based on current step
    let contextTitle = 'BUSINESS CONTEXT';
    let contextType = 'business';
    let statusValue = 'Ready';
    let displayValue = stepValue;
    let subtitleValue: string | undefined = undefined;
    let isItemLoading = false;

    if (stepId === 'business') {
      setBusinessType(stepValue);
      setup.setBusinessCategory(stepValue);
      displayValue = customerType ? `${stepValue} · ${customerType}` : stepValue;
    } else if (stepId === 'customer-type') {
      setCustomerType(stepValue);
      setup.setCustomerType(stepValue);
      contextType = 'business';
      contextTitle = 'BUSINESS CONTEXT';
      displayValue = businessType ? `${businessType} · ${stepValue}` : `Software · ${stepValue}`;
    } else if (stepId === 'crm') {
      // Everything the business record needs is known now, so create it and
      // its workspace -- documents and leads below both upload into it.
      const provider = stepValue === 'No CRM' ? null : stepValue;
      setup.setCrmProvider(provider);
      void setup.ensureWorkspace({ crmProvider: provider });
      contextTitle = 'CRM';
      contextType = 'crm';
      displayValue = stepValue;
      statusValue = stepValue === 'No CRM' ? 'None' : 'Connected';
    } else if (stepId === 'business-data') {
      contextTitle = 'BUSINESS DATA';
      contextType = 'data';
      const isLater = stepValue === "I'll do this later" || stepValue === 'later' || stepValue === 'Skipped';
      if (isLater) {
        setIsImportingBusinessData(false);
      } else {
        statusValue = 'Importing...';
        isItemLoading = true;
        setIsImportingBusinessData(true);
      }
    } else if (stepId === 'leads') {
      contextTitle = 'LEADS';
      contextType = 'customer';
      const isLater = stepValue === "I'll add them later" || stepValue === 'later' || stepValue === 'Skipped';
      if (isLater) {
        setIsImportingLeads(false);
      } else {
        statusValue = 'Importing...';
        isItemLoading = true;
        setIsImportingLeads(true);
      }
    }

    const isSkippedData =
      (stepId === 'business-data' && (stepValue === "I'll do this later" || stepValue === 'later' || stepValue === 'Skipped')) ||
      (stepId === 'leads' && (stepValue === "I'll add them later" || stepValue === 'later' || stepValue === 'Skipped'));

    if (!isSkippedData) {
      setWorkspaceItems((prev) => {
        const existsIndex = prev.findIndex((item) => item.type === contextType);
        const newItem: WorkspaceContextItem = {
          id: `${contextType}-context`,
          type: contextType,
          title: contextTitle,
          status: statusValue,
          value: displayValue,
          subtitle: subtitleValue,
          isLoading: isItemLoading,
        };

        if (existsIndex >= 0) {
          const copy = [...prev];
          copy[existsIndex] = newItem;
          return copy;
        }
        return [...prev, newItem];
      });
    }

    // Handle importing delay for Step 4 ("Business Data")
    if (stepId === 'business-data' && pendingFiles?.length) {
      // Returns as soon as the files are accepted. The panel below reflects
      // real ingestion status from useDocuments, so the step never blocks on
      // embedding -- which can take minutes on a CPU-only host.
      void setup.uploadBusinessData(pendingFiles).then((uploaded) => {
        setIsImportingBusinessData(false);
        if (uploaded && uploaded.length > 0) {
          const isStillProcessing = uploaded.some((d) => d.status === 'UPLOADED' || d.status === 'PROCESSING');
          const isFailed = uploaded.every((d) => d.status === 'FAILED');
          setWorkspaceItems((prev) =>
            prev.map((item) =>
              item.type === 'data'
                ? {
                    ...item,
                    status: isFailed ? 'Needs attention' : isStillProcessing ? `Reading ${uploaded.length} of ${uploaded.length}` : 'Ready',
                    value: `${uploaded.length} ${uploaded.length === 1 ? 'file' : 'files'}`,
                    subtitle: uploaded.map((d) => d.filename).join(', ').slice(0, 80),
                    isLoading: isStillProcessing,
                  }
                : item
            )
          );
        }
      }).catch(() => {
        setIsImportingBusinessData(false);
        setWorkspaceItems((prev) =>
          prev.map((item) =>
            item.type === 'data'
              ? {
                  ...item,
                  status: 'Upload failed',
                  isLoading: false,
                }
              : item
          )
        );
      });
    } else if (stepId === 'business-data') {
      setIsImportingBusinessData(false);
    }

    // Handle importing delay for Step 5 ("Leads")
    if (stepId === 'leads' && pendingFiles?.length) {
      void setup.uploadLeads(pendingFiles).then((imported) => {
        setIsImportingLeads(false);
        setWorkspaceItems((prev) =>
          prev.map((item) =>
            item.type === 'customer'
              ? {
                ...item,
                status: 'Ready',
                value: `${imported ?? 0} lead${imported === 1 ? '' : 's'}`,
                subtitle: undefined,
                isLoading: false,
              }
              : item
          )
        );
        setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
        setIsComplete(true);
      }).catch(() => {
        setIsImportingLeads(false);
        setWorkspaceItems((prev) =>
          prev.map((item) =>
            item.type === 'customer'
              ? {
                  ...item,
                  status: 'Upload failed',
                  isLoading: false,
                }
              : item
          )
        );
      });
    } else if (stepId === 'leads') {
      setIsImportingLeads(false);
      setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
      setIsComplete(true);
    }

    // 2. Mark current step as completed & advance to next step
    const currentIndex = steps.findIndex((s) => s.id === stepId);
    if (currentIndex >= 0 && currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1];
      const newMax = Math.max(maxReachedIndex, currentIndex + 1);
      setMaxReachedIndex(newMax);

      setSteps((prevSteps) =>
        prevSteps.map((step, idx) => {
          if (idx === currentIndex + 1) {
            return { ...step, status: 'active' };
          }
          if (idx <= newMax && idx !== currentIndex + 1) {
            return { ...step, status: step.status === 'skipped' ? 'skipped' : 'completed' };
          }
          return { ...step, status: 'pending' };
        })
      );

      setCurrentStepId(nextStep.id);
      setSelectedOptionId(null);
      setMiniPromptText('');
    } else {
      // Last step completed
      setSteps((prevSteps) =>
        prevSteps.map((step) => ({ ...step, status: step.status === 'skipped' ? 'skipped' : 'completed' }))
      );
      setIsComplete(true);
    }
  };

  const handleSelectOption = (optionId: string) => {
    const option = currentConfig.options.find((o) => o.id === optionId);
    const optionLabel = option ? option.label : optionId;

    // "Other" carries no information. Hold the step open and ask what the
    // business actually does, then store that answer as the real value.
    if (optionId === 'other') {
      setAwaitingCustomAnswer(currentStepId);
      return;
    }

    if (currentStepId === 'crm') {
      if (optionId === 'no-crm') {
        advanceStep('No CRM', 'crm');
        return;
      }
      setActiveSyncTool(optionLabel);
      setActiveSyncStep('crm');
      return;
    }

    if (currentStepId === 'business-data' && optionId === 'upload-business-data') {
      setIsUploadBusinessDataModalOpen(true);
      return;
    }

    if (currentStepId === 'leads') {
      if (optionId === 'import-leads') {
        setIsUploadLeadsModalOpen(true);
        return;
      }
      if (optionId === 'connect-crm') {
        setActiveSyncTool('HubSpot');
        setActiveSyncStep('leads');
        return;
      }
    }

    advanceStep(optionLabel, currentStepId);
  };

  const handleUploadBusinessDataDone = (files: File[]) => {
    const fileCount = files.length;
    const fileLabel = `${fileCount} ${fileCount === 1 ? 'file' : 'files'}`;
    advanceStep(fileLabel, 'business-data', files);
    setIsUploadBusinessDataModalOpen(false);
  };

  const handleUploadLeadsDone = (files: File[]) => {
    const fileCount = files.length;
    const fileLabel = `${fileCount} ${fileCount === 1 ? 'file' : 'files'}`;
    advanceStep(fileLabel, 'leads', files);
    setIsUploadLeadsModalOpen(false);
  };

  const handleCompleteSync = () => {
    if (activeSyncTool) {
      const stepToAdvance = activeSyncStep || currentStepId;
      advanceStep(activeSyncTool, stepToAdvance);
      setActiveSyncTool(null);
      setActiveSyncStep(null);
    }
  };

  const handleCancelSync = () => {
    setActiveSyncTool(null);
    setActiveSyncStep(null);
  };

  const handleStepClick = (stepId: string) => {
    const targetIndex = steps.findIndex((s) => s.id === stepId);
    if (targetIndex < 0) return;

    // CANNOT jump forward to uncompleted / pending steps
    if (targetIndex > maxReachedIndex) {
      return;
    }

    setCurrentStepId(stepId);
    setSelectedOptionId(null);
    setMiniPromptText('');

    setSteps((prevSteps) =>
      prevSteps.map((step, idx) => {
        if (step.id === stepId) {
          return { ...step, status: 'active' };
        }
        if (idx <= maxReachedIndex) {
          return { ...step, status: step.status === 'skipped' ? 'skipped' : 'completed' };
        }
        return { ...step, status: 'pending' };
      })
    );
  };

  const handlePromptSubmit = (e?: React.FormEvent, file?: File | null) => {
    if (e) e.preventDefault();
    const hasText = promptText.trim().length > 0;
    if (!hasText && !file) return;

    if (file) {
      if (file.name.toLowerCase().endsWith('.csv')) {
        handleUploadLeadsDone([file]);
      } else {
        handleUploadBusinessDataDone([file]);
      }
    }

    if (hasText) {
      setIsSubmitting(true);
      const submittedVal = promptText.trim();

      setTimeout(() => {
        setIsSubmitting(false);
        setPromptText('');
        advanceStep(submittedVal, currentStepId);
      }, 300);
    }
  };

  const handleMiniPromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!miniPromptText.trim()) return;

    setIsSubmitting(true);
    const submittedVal = miniPromptText.trim();

    // Typed free text is the answer whether the step was waiting on "Other"
    // or the user simply typed instead of picking a pill.
    setIsSubmitting(false);
    setMiniPromptText('');
    setAwaitingCustomAnswer(null);
    advanceStep(submittedVal, currentStepId);
  };

  const handleSkipStep = () => {
    if (currentStepId === 'customer-type') {
      const currentIndex = steps.findIndex((s) => s.id === 'customer-type');
      if (currentIndex >= 0 && currentIndex < steps.length - 1) {
        const nextStep = steps[currentIndex + 1];
        const newMax = Math.max(maxReachedIndex, currentIndex + 1);
        setMaxReachedIndex(newMax);

        setSteps((prevSteps) =>
          prevSteps.map((step, idx) => {
            if (step.id === 'customer-type') {
              return { ...step, status: 'skipped' };
            }
            if (idx === currentIndex + 1) {
              return { ...step, status: 'active' };
            }
            if (idx <= newMax && idx !== currentIndex + 1) {
              return { ...step, status: step.status === 'skipped' ? 'skipped' : 'completed' };
            }
            return { ...step, status: 'pending' };
          })
        );

        setCurrentStepId(nextStep.id);
        setSelectedOptionId(null);
        setMiniPromptText('');
      }
    } else {
      advanceStep('Skipped', currentStepId);
    }
  };

  const handleStartUsing = () => {
    setIsWorkspaceReady(true);
    setPromptText('');
  };

  return {
    user,
    companyName,
    setCompanyName,
    promptText,
    setPromptText,
    miniPromptText,
    setMiniPromptText,
    steps,
    currentStepId,
    currentStepIndex,
    totalSteps,
    currentConfig,
    selectedOptionId,
    workspaceItems,
    suggestions,
    isMobileSidebarOpen,
    setIsMobileSidebarOpen,
    isMobileSetupOpen,
    setIsMobileSetupOpen,
    isSubmitting,
    activeSyncTool,
    isUploadBusinessDataModalOpen,
    setIsUploadBusinessDataModalOpen,
    handleUploadBusinessDataDone,
    isUploadLeadsModalOpen,
    setIsUploadLeadsModalOpen,
    handleUploadLeadsDone,
    isImportingBusinessData,
    isImportingLeads,
    isComplete,
    isWorkspaceReady,
    isProjectReady,
    setIsProjectReady,
    handleCompleteSync,
    handleCancelSync,
    handleSelectSuggestion,
    handleSelectOption,
    handleStepClick,
    handlePromptSubmit,
    handleMiniPromptSubmit,
    awaitingCustomAnswer,
    customAnswerQuestion:
      awaitingCustomAnswer === 'business'
        ? 'What kind of business do you run?'
        : awaitingCustomAnswer === 'crm'
          ? 'Which CRM do you use?'
          : null,
    workspace: setup.workspace,
    ingestion,
    analysis,
    isAnalysing,
    business: setup.business,
    documents: setup.documents,
    isCreatingWorkspace: setup.isCreatingWorkspace,
    isBootstrapping: setup.isBootstrapping,
    handleSkipStep,
    handleStartUsing,
  };
};

export default useDashboardState;
