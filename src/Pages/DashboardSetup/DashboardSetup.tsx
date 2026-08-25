import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Sparkles, X } from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import {
  DashboardGreeting,
  DashboardPromptSection,
  DashboardEmptyState,
  DashboardWorkspaceSection,
} from './section';
import { SetupWidget } from './setupwidgets';
import { useDashboardState } from './hooks';
import { OutlookSyncModal } from './modal/ToolConnectModal';
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

export const DashboardSetup: React.FC = () => {
  const navigate = useNavigate();
  const {
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
    handleCompleteSync,
    handleCancelSync,
    handleSelectSuggestion,
    handleSelectOption,
    handleStepClick,
    handlePromptSubmit,
    handleMiniPromptSubmit,
    handleSkipStep,
  } = useDashboardState();

  const isImporting = isImportingBusinessData || isImportingLeads;
  const loadingText = isImportingBusinessData ? 'Importing business data...' : 'Importing leads...';

  const onStartUsingFollei = () => {
    navigate('/home');
  };

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased">
      {/* Reusable Left Sidebar */}
      <Sidebar
        user={user}
        projects={[]}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeItem="home"
      />

      {/* Main Center & Right Content Area */}
      <main className="min-w-0 flex-1">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E6E6E4] bg-white px-4 py-3 lg:hidden sticky top-0 z-30">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
          <span className="text-[13px] font-semibold tracking-tight text-[#16171A]">
            Follei
          </span>
          <button
            type="button"
            aria-label="Open Follei setup"
            onClick={() => setIsMobileSetupOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#0D9488] hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <Sparkles className="size-4 text-[#0D9488]" aria-hidden="true" />
          </button>
        </div>

        {/* 6-Step Setup Screen */}
        <div className="flex justify-center gap-8 pb-28 xl:pb-0">
          {/* Central Prompt & Greeting Area */}
          <div className="min-w-0 flex-1">
            <div className="mx-auto flex w-full max-w-2xl flex-col gap-10 px-6 py-14 md:py-20">
              {/* Header Greeting */}
              <DashboardGreeting userName={user.name} isWorkspaceReady={false} />

              {/* Prompt Section */}
              <DashboardPromptSection
                inputValue={promptText}
                onInputChange={setPromptText}
                onSubmit={handlePromptSubmit}
                suggestions={suggestions}
                onSelectSuggestion={handleSelectSuggestion}
                isSubmitting={isSubmitting}
                isWorkspaceReady={false}
                placeholder="Tell Follei about your business..."
              />

              {/* Workspace Context Cards or Empty State */}
              {workspaceItems.length > 0 ? (
                <DashboardWorkspaceSection items={workspaceItems} />
              ) : (
                <DashboardEmptyState />
              )}
            </div>
          </div>

          {/* Right Setup Assistant Card (Sticky on Large Screens) */}
          <div className="hidden lg:block shrink-0 py-14 pr-8">
            <div className="sticky top-14 w-80">
              <SetupWidget
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
                bannerTitle={currentConfig.bannerTitle}
                bannerSubtitle={currentConfig.bannerSubtitle}
                steps={steps}
                currentStepId={currentStepId}
                onStepClick={handleStepClick}
                question={currentConfig.question}
                description={currentConfig.description}
                options={currentConfig.options}
                selectedOptionId={selectedOptionId}
                onSelectOption={handleSelectOption}
                miniInputValue={miniPromptText}
                onMiniInputChange={setMiniPromptText}
                onMiniInputSubmit={handleMiniPromptSubmit}
                placeholder={currentConfig.inputPlaceholder}
                isLoading={isImporting}
                loadingText={loadingText}
                isComplete={isComplete}
                isWorkspaceReady={false}
                onStartUsing={onStartUsingFollei}
                onSkip={currentStepId === 'customer-type' ? handleSkipStep : undefined}
              />
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
              <SetupWidget
                currentStepIndex={currentStepIndex}
                totalSteps={totalSteps}
                bannerTitle={currentConfig.bannerTitle}
                bannerSubtitle={currentConfig.bannerSubtitle}
                steps={steps}
                currentStepId={currentStepId}
                onStepClick={handleStepClick}
                question={currentConfig.question}
                description={currentConfig.description}
                options={currentConfig.options}
                selectedOptionId={selectedOptionId}
                onSelectOption={handleSelectOption}
                miniInputValue={miniPromptText}
                onMiniInputChange={setMiniPromptText}
                onMiniInputSubmit={handleMiniPromptSubmit}
                placeholder={currentConfig.inputPlaceholder}
                isLoading={isImporting}
                loadingText={loadingText}
                isComplete={isComplete}
                isWorkspaceReady={false}
                onStartUsing={onStartUsingFollei}
                onSkip={currentStepId === 'customer-type' ? handleSkipStep : undefined}
              />
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
      </main>
    </div>
  );
};

export default DashboardSetup;
