import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import {
  DashboardGreeting,
  DashboardPromptSection,
  DashboardEmptyState,
  DashboardWorkspaceSection,
} from './section';
import { SetupWidget, FolleiPhoneSetupWidget } from './setupwidgets';
import { useDashboardState } from './hooks';
import { OutlookSyncModal } from './modal/ToolConnectModal';
import { UploadBusinessDataModal, UploadLeadsModal } from './modal/UploadBusinessDataModal';
import type { WorkspaceContextItem } from './types';
import telecrmLogo from '../../assets/icons/telecrm.png';
import hubspotLogo from '../../assets/icons/hubspot.png';
import salesforceLogo from '../../assets/icons/salesforce.png';
import zohoLogo from '../../assets/icons/zoho.png';
import googleLogo from '../../assets/icons/google.png';
import outlookLogo from '../../assets/icons/outlook.png';

const getToolLogo = (toolName: string) => {
  const name = toolName.toLowerCase();
  if (name.includes('telecrm')) return <img src={telecrmLogo} alt="TeleCRM" className="h-10 w-10 object-contain" />;
  if (name.includes('hubspot')) return <img src={hubspotLogo} alt="HubSpot" className="h-10 w-10 object-contain" />;
  if (name.includes('salesforce')) return <img src={salesforceLogo} alt="Salesforce" className="h-10 w-10 object-contain" />;
  if (name.includes('zoho')) return <img src={zohoLogo} alt="Zoho" className="h-10 w-10 object-contain" />;
  if (name.includes('google')) return <img src={googleLogo} alt="Google" className="h-10 w-10 object-contain" />;
  if (name.includes('microsoft') || name.includes('outlook') || name.includes('365')) return <img src={outlookLogo} alt="Outlook" className="h-10 w-10 object-contain" />;
  return null;
};

import { setupMemoryStore } from './data/setupMemoryStore';

export const DashboardSetup: React.FC = () => {
  const navigate = useNavigate();
  const [showPhoneSetup, setShowPhoneSetup] = useState<boolean>(() => {
    return setupMemoryStore.showPhoneSetup || sessionStorage.getItem('follei.phone_setup_active') === 'true';
  });

  const {
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
    handleCompleteSync,
    handleCancelSync,
    handleSelectSuggestion,
    handleSelectOption,
    handleStepClick,
    handlePromptSubmit,
    handleMiniPromptSubmit,
    handleSkipStep,
    awaitingCustomAnswer,
    customAnswerQuestion,
    ingestion,
    analysis,
    isAnalysing,
    isBootstrapping,
    business,
    handleStartUsing,
  } = useDashboardState();

  useEffect(() => {
    setupMemoryStore.showPhoneSetup = showPhoneSetup;
  }, [showPhoneSetup]);

  useEffect(() => {
    if (!isBootstrapping && !business) {
      setShowPhoneSetup(false);
      sessionStorage.removeItem('follei.phone_setup_active');
    }
  }, [isBootstrapping, business]);

  const isImporting = isImportingBusinessData || isImportingLeads;
  const loadingText = isImportingBusinessData ? 'Importing business data...' : 'Importing leads...';

  const onStartUsingFollei = () => {
    setShowPhoneSetup(true);
    sessionStorage.setItem('follei.phone_setup_active', 'true');
    handleStartUsing();
  };

  const onCompletePhoneSetup = () => {
    sessionStorage.removeItem('follei.phone_setup_active');
    navigate('/home');
  };

  // Use real live workspace context items directly from setup hooks
  const configuredWorkspaceItems: WorkspaceContextItem[] = workspaceItems;

  return (
    <div className="min-w-0 flex-1">
      {/* Mobile Follei setup launcher button */}
      <div className="flex items-center justify-between border-b border-[#E6E6E4] bg-white px-4 py-2.5 lg:hidden sticky top-0 z-20">
        <span className="text-[13px] font-medium text-[#717378]">Project Setup</span>
        <button
          type="button"
          aria-label="Open Follei setup"
          onClick={() => setIsMobileSetupOpen(true)}
          className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1 text-[12px] font-medium text-[#0D9488] shadow-2xs cursor-pointer"
        >
          <Sparkles className="size-3 text-[#0D9488]" aria-hidden="true" />
          <span>Setup Assistant</span>
        </button>
      </div>

        {/* 6-Step Setup Screen / Follei Setup Phone Numbers Screen */}
        <div className="flex justify-center gap-8 pb-28 xl:pb-0">
          {/* Central Prompt & Greeting Area */}
          <div className="min-w-0 flex-1">
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-12 md:py-16">
              {/* Header Greeting */}
              <DashboardGreeting userName={user.name} isWorkspaceReady={false} />

              {/* Prompt Section */}
              <DashboardPromptSection
                title="What are you working on?"
                inputValue={promptText}
                onInputChange={setPromptText}
                onSubmit={handlePromptSubmit}
                suggestions={suggestions}
                onSelectSuggestion={handleSelectSuggestion}
                isSubmitting={isSubmitting}
                isWorkspaceReady={false}
                placeholder="Tell Follei about your business..."
              />

              {/* Workspace Context Cards or Empty State / Skeleton Loading */}
              {isBootstrapping ? (
                <div className="flex flex-col gap-3 animate-fade-slide">
                  <div className="h-3.5 w-24 rounded-full skeleton-silver-shimmer" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="h-[96px] rounded-[20px] skeleton-silver-shimmer p-4 flex flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-3.5 rounded-full bg-[#DFE2E6]" />
                        <div className="h-3 w-20 rounded bg-[#DFE2E6]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <div className="h-3.5 w-28 rounded bg-[#DFE2E6]" />
                        <div className="h-3 w-40 rounded bg-[#E8EAEF]" />
                      </div>
                    </div>
                    <div className="h-[96px] rounded-[20px] skeleton-silver-shimmer p-4 flex flex-col justify-between">
                      <div className="flex items-center gap-2">
                        <div className="size-3.5 rounded-full bg-[#DFE2E6]" />
                        <div className="h-3 w-20 rounded bg-[#DFE2E6]" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <div className="h-3.5 w-24 rounded bg-[#DFE2E6]" />
                        <div className="h-3 w-36 rounded bg-[#E8EAEF]" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : configuredWorkspaceItems.length > 0 ? (
                <DashboardWorkspaceSection
                  items={configuredWorkspaceItems}
                  onItemAction={(type) => {
                    if (type === 'data') {
                      setIsUploadBusinessDataModalOpen(true);
                    } else if (type === 'customer') {
                      setIsUploadLeadsModalOpen(true);
                    } else if (type === 'crm') {
                      handleStepClick('crm');
                    } else if (type === 'business') {
                      handleStepClick('business');
                    }
                  }}
                />
              ) : (
                <DashboardEmptyState />
              )}
            </div>
          </div>

          {/* Right Setup Assistant Card (Sticky on Large Screens) */}
          <div className="hidden lg:block shrink-0 py-12 pr-8">
            <div className="sticky top-12 w-[340px]">
              {showPhoneSetup ? (
                <FolleiPhoneSetupWidget onComplete={onCompletePhoneSetup} />
              ) : (
                <SetupWidget
                  currentStepIndex={currentStepIndex}
                  totalSteps={totalSteps}
                  bannerTitle={currentConfig.bannerTitle}
                  bannerSubtitle={currentConfig.bannerSubtitle}
                  companyName={companyName}
                  onCompanyNameChange={setCompanyName}
                  steps={steps}
                  currentStepId={currentStepId}
                  onStepClick={handleStepClick}
                  question={customAnswerQuestion || currentConfig.question}
                  description={currentConfig.description}
                  options={awaitingCustomAnswer ? [] : currentConfig.options}
                  selectedOptionId={selectedOptionId}
                  onSelectOption={handleSelectOption}
                  miniInputValue={miniPromptText}
                  onMiniInputChange={setMiniPromptText}
                  onMiniInputSubmit={handleMiniPromptSubmit}
                  placeholder={currentConfig.inputPlaceholder}
                  isLoading={isImporting}
                  loadingText={loadingText}
                  analysis={analysis}
                  isAnalysing={isAnalysing}
                  documentsProcessed={ingestion.processed.length}
                  documentsTotal={ingestion.documents.length}
                  isComplete={isComplete}
                  isWorkspaceReady={false}
                  onStartUsing={onStartUsingFollei}
                  onSkip={currentStepId === 'customer-type' ? handleSkipStep : undefined}
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile Setup Assistant Drawer */}
        {isMobileSetupOpen && (
          <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
              onClick={() => setIsMobileSetupOpen(false)}
            />
            <div className="relative z-10 w-full max-w-sm bg-white p-4 h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-200">
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-gray-100">
                <span className="font-semibold text-sm text-[#16171A]">Setup Assistant</span>
                <button
                  type="button"
                  onClick={() => setIsMobileSetupOpen(false)}
                  className="flex size-7 items-center justify-center rounded-lg text-[#717378] hover:bg-gray-100 hover:text-gray-700"
                >
                  <X className="size-4" />
                </button>
              </div>
              {showPhoneSetup ? (
                <FolleiPhoneSetupWidget onComplete={onCompletePhoneSetup} />
              ) : (
                <SetupWidget
                  currentStepIndex={currentStepIndex}
                  totalSteps={totalSteps}
                  bannerTitle={currentConfig.bannerTitle}
                  bannerSubtitle={currentConfig.bannerSubtitle}
                  companyName={companyName}
                  onCompanyNameChange={setCompanyName}
                  steps={steps}
                  currentStepId={currentStepId}
                  onStepClick={handleStepClick}
                  question={customAnswerQuestion || currentConfig.question}
                  description={currentConfig.description}
                  options={awaitingCustomAnswer ? [] : currentConfig.options}
                  selectedOptionId={selectedOptionId}
                  onSelectOption={handleSelectOption}
                  miniInputValue={miniPromptText}
                  onMiniInputChange={setMiniPromptText}
                  onMiniInputSubmit={handleMiniPromptSubmit}
                  placeholder={currentConfig.inputPlaceholder}
                  isLoading={isImporting}
                  loadingText={loadingText}
                  analysis={analysis}
                  isAnalysing={isAnalysing}
                  documentsProcessed={ingestion.processed.length}
                  documentsTotal={ingestion.documents.length}
                  isComplete={isComplete}
                  isWorkspaceReady={false}
                  onStartUsing={onStartUsingFollei}
                  onSkip={currentStepId === 'customer-type' ? handleSkipStep : undefined}
                />
              )}
            </div>
          </div>
        )}

        {/* Data Sync Flow Modal */}
        {activeSyncTool && (
          <OutlookSyncModal
            toolName={activeSyncTool}
            toolLogo={getToolLogo(activeSyncTool)}
            onContinue={handleCompleteSync}
            onDisconnect={handleCancelSync}
          />
        )}

        {/* Upload Business Data Modal */}
        <UploadBusinessDataModal
          isOpen={isUploadBusinessDataModalOpen}
          onClose={() => setIsUploadBusinessDataModalOpen(false)}
          onDone={handleUploadBusinessDataDone}
        />

        {/* Upload Leads Modal */}
        <UploadLeadsModal
          isOpen={isUploadLeadsModalOpen}
          onClose={() => setIsUploadLeadsModalOpen(false)}
          onDone={handleUploadLeadsDone}
        />
    </div>
  );
};

export default DashboardSetup;
