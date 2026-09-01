import React from 'react';
import CampaignStepList from './CampaignStepList';
import {
  Step1Basics,
  Step2Audience,
  Step3WhatsApp,
  Step4Message,
  Step5Schedule,
  Step6Review,
  CampaignLaunchedSuccess,
} from './steps';
import type { CampaignFormState } from '../types';

interface CampaignWizardWidgetProps {
  formState: CampaignFormState;
  isLaunched?: boolean;
  onUpdateField: <K extends keyof CampaignFormState>(field: K, value: CampaignFormState[K]) => void;
  onToggleStatus: (status: string) => void;
  onToggleSource: (source: string) => void;
  onNextStep: () => void;
  onPrevStep: () => void;
  onGoToStep: (index: number) => void;
  onLaunchCampaign: () => void;
  onViewCampaign: () => void;
  onCreateAnother: () => void;
  isLaunching?: boolean;
}

export const CampaignWizardWidget: React.FC<CampaignWizardWidgetProps> = ({
  formState,
  isLaunched = false,
  onUpdateField,
  onToggleStatus,
  onToggleSource,
  onNextStep,
  onPrevStep,
  onGoToStep,
  onLaunchCampaign,
  onViewCampaign,
  onCreateAnother,
  isLaunching = false,
}) => {
  const currentStep = formState.currentStepIndex;

  return (
    <aside className="w-full max-w-[370px] rounded-[22px] border border-[#E2E8F0] bg-white shadow-[0_10px_36px_rgba(0,0,0,0.05)] animate-fade-slide overflow-hidden">
      {/* If already launched, show the Success Card */}
      {isLaunched ? (
        <div className="p-5">
          <CampaignLaunchedSuccess
            formState={formState}
            onViewCampaign={onViewCampaign}
            onCreateAnother={onCreateAnother}
          />
        </div>
      ) : (
        <>
          {/* Header: Title + Step Counter matching screenshot */}
          <header className="flex items-center justify-between px-5 py-3.5 border-b border-[#F1F5F9]">
            <h2 className="text-[14px] font-bold text-[#16171A] tracking-tight">
              Create Campaign
            </h2>
            <span className="text-[12px] font-normal text-[#64748B]">
              {currentStep + 1} of 6
            </span>
          </header>

          {/* Body: 6 Steps Progress + Current Step Content */}
          <div className="flex flex-col gap-3 p-4.5">
            {/* 6 Steps Progress Checklist */}
            <CampaignStepList
              currentStepIndex={currentStep}
              onStepClick={onGoToStep}
            />

            {/* Light Divider */}
            <div className="border-t border-gray-100 my-0.5" />

            {/* Active Step Form */}
            {currentStep === 0 && (
              <Step1Basics
                campaignName={formState.campaignName}
                onCampaignNameChange={(val) => onUpdateField('campaignName', val)}
                objective={formState.objective}
                onObjectiveChange={(val) => onUpdateField('objective', val)}
                customObjective={formState.customObjective}
                onCustomObjectiveChange={(val) => onUpdateField('customObjective', val)}
                onContinue={onNextStep}
              />
            )}

            {currentStep === 1 && (
              <Step2Audience
                audienceType={formState.audienceType}
                onAudienceTypeChange={(val) => {
                  if (val === 'all') {
                    onUpdateField('audienceType', 'all');
                    onUpdateField('selectedStatuses', []);
                    onUpdateField('selectedSources', []);
                    onUpdateField('leadsCount', 124);
                  } else {
                    onUpdateField('audienceType', 'custom');
                    onUpdateField('selectedStatuses', ['New', 'Qualified']);
                    onUpdateField('selectedSources', ['Website', 'Referral']);
                    onUpdateField('leadsCount', 57);
                  }
                }}
                selectedStatuses={formState.selectedStatuses}
                onToggleStatus={onToggleStatus}
                selectedSources={formState.selectedSources}
                onToggleSource={onToggleSource}
                leadsCount={formState.leadsCount}
                onBack={onPrevStep}
                onContinue={onNextStep}
              />
            )}

            {currentStep === 2 && (
              <Step3WhatsApp
                selectedNumber={formState.selectedNumber}
                onSelectedNumberChange={(val) => onUpdateField('selectedNumber', val)}
                onBack={onPrevStep}
                onContinue={onNextStep}
              />
            )}

            {currentStep === 3 && (
              <Step4Message
                messageText={formState.messageText}
                onMessageTextChange={(val) => onUpdateField('messageText', val)}
                mediaUrl={formState.mediaUrl}
                mediaName={formState.mediaName}
                mediaSize={formState.mediaSize}
                onMediaChange={(media) => {
                  onUpdateField('mediaUrl', media?.url);
                  onUpdateField('mediaName', media?.name);
                  onUpdateField('mediaSize', media?.size);
                }}
                onBack={onPrevStep}
                onContinue={onNextStep}
              />
            )}

            {currentStep === 4 && (
              <Step5Schedule
                scheduleOption={formState.scheduleOption}
                onScheduleOptionChange={(val) => onUpdateField('scheduleOption', val)}
                scheduledDate={formState.scheduledDate}
                onScheduledDateChange={(val) => onUpdateField('scheduledDate', val)}
                scheduledTime={formState.scheduledTime}
                onScheduledTimeChange={(val) => onUpdateField('scheduledTime', val)}
                onBack={onPrevStep}
                onContinue={onNextStep}
              />
            )}

            {currentStep === 5 && (
              <Step6Review
                formState={formState}
                onEditStep={onGoToStep}
                onBack={onPrevStep}
                onLaunch={onLaunchCampaign}
                isLaunching={isLaunching}
              />
            )}
          </div>
        </>
      )}
    </aside>
  );
};

export default CampaignWizardWidget;
