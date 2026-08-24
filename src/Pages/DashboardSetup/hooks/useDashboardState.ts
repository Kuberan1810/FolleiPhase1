import { useState } from 'react';
import type { SetupStep, PromptSuggestion, UserProfile, WorkspaceContextItem } from '../types';
import { INITIAL_SETUP_STEPS, PROMPT_SUGGESTIONS, READY_PROMPT_SUGGESTIONS, STEP_CONFIGS, DEFAULT_USER } from '../data';

export const useDashboardState = () => {
  const [user] = useState<UserProfile>(DEFAULT_USER);
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

  const [maxReachedIndex, setMaxReachedIndex] = useState<number>(0);

  const advanceStep = (stepValue: string, stepId: string) => {
    // 1. Add / Update Workspace context item based on current step
    let contextTitle = 'BUSINESS CONTEXT';
    let contextType = 'business';
    let statusValue = 'Ready';
    let displayValue = stepValue;
    const subtitleValue: string | undefined = undefined;
    let isItemLoading = false;

    if (stepId === 'business') {
      setBusinessType(stepValue);
      displayValue = customerType ? `${stepValue} · ${customerType}` : stepValue;
    } else if (stepId === 'customer-type') {
      setCustomerType(stepValue);
      contextType = 'business';
      contextTitle = 'BUSINESS CONTEXT';
      displayValue = businessType ? `${businessType} · ${stepValue}` : `Software · ${stepValue}`;
    } else if (stepId === 'crm') {
      contextTitle = 'CRM';
      contextType = 'crm';
      displayValue = stepValue;
      statusValue = stepValue === 'No CRM' ? 'None' : 'Connected';
    } else if (stepId === 'business-data') {
      contextTitle = 'BUSINESS DATA';
      contextType = 'data';
      statusValue = 'Importing...';
      isItemLoading = true;
      setIsImportingBusinessData(true);
    } else if (stepId === 'leads') {
      contextTitle = 'LEADS';
      contextType = 'customer';
      statusValue = 'Importing...';
      isItemLoading = true;
      setIsImportingLeads(true);
    }

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

    // Handle importing delay for Step 4 ("Business Data")
    if (stepId === 'business-data') {
      setTimeout(() => {
        setIsImportingBusinessData(false);
        setWorkspaceItems((prev) =>
          prev.map((item) =>
            item.type === 'data'
              ? {
                  ...item,
                  status: undefined,
                  value: '24 files',
                  subtitle: '12 products · 8 services · 5 pricing plans',
                  isLoading: false,
                }
              : item
          )
        );
      }, 2500);
    }

    // Handle importing delay for Step 5 ("Leads")
    if (stepId === 'leads') {
      setTimeout(() => {
        setIsImportingLeads(false);
        setWorkspaceItems((prev) =>
          prev.map((item) =>
            item.type === 'customer'
              ? {
                  ...item,
                  status: undefined,
                  value: '248 leads',
                  subtitle: '32 high-intent',
                  isLoading: false,
                }
              : item
          )
        );
        // Mark all steps as complete
        setSteps((prev) => prev.map((s) => ({ ...s, status: 'completed' })));
        setIsComplete(true);
      }, 2500);
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
            return { ...step, status: 'completed' };
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
        prevSteps.map((step) => ({ ...step, status: 'completed' }))
      );
      setIsComplete(true);
    }
  };

  const handleSelectOption = (optionId: string) => {
    const option = currentConfig.options.find((o) => o.id === optionId);
    const optionLabel = option ? option.label : optionId;

    if (currentStepId === 'crm') {
      if (optionId === 'no-crm') {
        advanceStep('No CRM', 'crm');
        return;
      }
      setActiveSyncTool(optionLabel);
      setActiveSyncStep('crm');
      return;
    }

    advanceStep(optionLabel, currentStepId);
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
          return { ...step, status: 'completed' };
        }
        return { ...step, status: 'pending' };
      })
    );
  };

  const handlePromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptText.trim()) return;

    setIsSubmitting(true);
    const submittedVal = promptText.trim();

    setTimeout(() => {
      setIsSubmitting(false);
      setPromptText('');
      advanceStep(submittedVal, currentStepId);
    }, 300);
  };

  const handleMiniPromptSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!miniPromptText.trim()) return;

    setIsSubmitting(true);
    const submittedVal = miniPromptText.trim();

    setTimeout(() => {
      setIsSubmitting(false);
      setMiniPromptText('');
      advanceStep(submittedVal, currentStepId);
    }, 300);
  };

  const handleStartUsing = () => {
    setIsWorkspaceReady(true);
    setPromptText('');
  };

  return {
    user,
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
    handleStartUsing,
  };
};

export default useDashboardState;
