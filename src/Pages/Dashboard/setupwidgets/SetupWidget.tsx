import React from 'react';
import { Sparkles } from 'lucide-react';
import SetupStepList from './SetupStepList';
import SetupStepContent from './SetupStepContent';
import type { SetupStep, BusinessCategoryOption } from '../types';

interface SetupWidgetProps {
  title?: string;
  currentStepIndex?: number;
  totalSteps?: number;
  bannerTitle?: string;
  bannerSubtitle?: string;
  steps: SetupStep[];
  currentStepId?: string;
  onStepClick?: (stepId: string) => void;
  options: BusinessCategoryOption[];
  selectedOptionId?: string | null;
  onSelectOption?: (optionId: string) => void;
  miniInputValue: string;
  onMiniInputChange: (val: string) => void;
  onMiniInputSubmit: (e?: React.FormEvent) => void;
  question?: string;
  description?: string;
  placeholder?: string;
  isLoading?: boolean;
  loadingText?: string;
  isComplete?: boolean;
  isWorkspaceReady?: boolean;
  onStartUsing?: () => void;
}

export const SetupWidget: React.FC<SetupWidgetProps> = ({
  title = 'Follei Setup',
  currentStepIndex = 1,
  totalSteps = 6,
  bannerTitle = "Your workspace isn't set up yet.",
  bannerSubtitle = "Let's get it ready together.",
  steps,
  currentStepId,
  onStepClick,
  options,
  selectedOptionId,
  onSelectOption,
  miniInputValue,
  onMiniInputChange,
  onMiniInputSubmit,
  question = 'What do you do?',
  description,
  placeholder = 'Tell Follei about your business...',
  isLoading = false,
  loadingText = 'Importing business data...',
  isComplete = false,
  isWorkspaceReady = false,
  onStartUsing,
}) => {
  return (
    <aside className="rounded-[22px] border border-[#E6E6E4] bg-white shadow-lg">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-100 px-4 h-[50px]">
        <div className="flex items-center gap-2">
          <Sparkles className="size-4 text-[#0D9488]" aria-hidden="true" />
          <span className="text-[14px] font-semibold tracking-tight text-[#16171A]">
            {title}
          </span>
        </div>
        <span className="text-[12px] font-medium text-[#717378]">
          {isComplete ? 'Complete' : `${currentStepIndex} of ${totalSteps}`}
        </span>
      </header>

      {/* Body */}
      <div className="flex flex-col gap-4 px-4 py-4">
        {/* Banner */}
        <div
          key={bannerTitle}
          className="animate-fade-slide rounded-[18px] bg-[#F8F8F6] px-3.5 py-3 text-[13px] leading-relaxed text-[#2C2E31] transition-all duration-200"
        >
          <p className="font-normal">{bannerTitle}</p>
          {bannerSubtitle ? <p className="mt-1 text-[#717378]">{bannerSubtitle}</p> : null}
        </div>

        {/* Step Checklist */}
        <SetupStepList
          steps={steps}
          currentStepId={currentStepId}
          onStepClick={onStepClick}
        />

        {/* Completed Action Button (only shown before clicking 'Start using Follei') */}
        {isComplete ? (
          !isWorkspaceReady && (
            <button
              type="button"
              onClick={onStartUsing}
              className="w-full h-11 bg-[#1D1E21] hover:bg-black text-white font-medium rounded-full text-[13.5px] transition-colors cursor-pointer shadow-sm flex items-center justify-center animate-fade-slide mt-1"
            >
              Start using Follei
            </button>
          )
        ) : (
          /* Active Step Question & Quick Options + Mini Input OR Loader */
          <SetupStepContent
            question={question}
            description={description}
            options={options}
            selectedOptionId={selectedOptionId}
            onSelectOption={onSelectOption}
            miniInputValue={miniInputValue}
            onMiniInputChange={onMiniInputChange}
            onMiniInputSubmit={onMiniInputSubmit}
            placeholder={placeholder}
            isLoading={isLoading}
            loadingText={loadingText}
          />
        )}
      </div>
    </aside>
  );
};

export default SetupWidget;
