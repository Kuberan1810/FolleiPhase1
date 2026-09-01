import React from 'react';
import { AUDIENCE_STATUSES, AUDIENCE_SOURCES } from '../../types';
import { StepActionButtons } from '../StepActionButtons';
import { CapsuleButton } from '../CapsuleButton';

interface Step2AudienceProps {
  audienceType: 'all' | 'custom';
  onAudienceTypeChange: (val: 'all' | 'custom') => void;
  selectedStatuses: string[];
  onToggleStatus: (status: string) => void;
  selectedSources: string[];
  onToggleSource: (source: string) => void;
  leadsCount?: number;
  onBack: () => void;
  onContinue: () => void;
}

export const Step2Audience: React.FC<Step2AudienceProps> = ({
  audienceType,
  onAudienceTypeChange,
  selectedStatuses,
  onToggleStatus,
  selectedSources,
  onToggleSource,
  leadsCount = 124,
  onBack,
  onContinue,
}) => {
  const isAllLeads = audienceType === 'all';

  return (
    <div className="flex flex-col gap-3 animate-fade-slide">
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[14.5px] font-semibold text-[#16171A]">
          Select your audience
        </h3>
        <p className="text-[12px] text-[#717378]">
          Choose the leads you want to reach.
        </p>
      </div>

      {/* All Leads Pill */}
      <div>
        <CapsuleButton
          isSelected={isAllLeads}
          onClick={() => onAudienceTypeChange('all')}
        >
          All Leads
        </CapsuleButton>
      </div>

      {/* Status Filter Section */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-[#16171A]">
          Status
        </label>
        <div className="flex flex-wrap gap-1.5">
          {AUDIENCE_STATUSES.map((status) => (
            <CapsuleButton
              key={status}
              isSelected={!isAllLeads && selectedStatuses.includes(status)}
              onClick={() => onToggleStatus(status)}
            >
              {status}
            </CapsuleButton>
          ))}
        </div>
      </div>

      {/* Source Filter Section */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-[#16171A]">
          Source
        </label>
        <div className="flex flex-wrap gap-1.5">
          {AUDIENCE_SOURCES.map((source) => (
            <CapsuleButton
              key={source}
              isSelected={!isAllLeads && selectedSources.includes(source)}
              onClick={() => onToggleSource(source)}
            >
              {source}
            </CapsuleButton>
          ))}
        </div>
      </div>

      {/* Leads Count Summary Container */}
      <div className="flex items-center justify-between rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC30] px-3.5 py-3 text-[12px] mt-0.5">
        <span className="font-semibold text-[#16171A]">
          {leadsCount} leads selected
        </span>
        <button
          type="button"
          className="text-[#7A9601] hover:text-[#5E7401] transition-colors cursor-pointer text-[12px]"
        >
          View selected leads
        </button>
      </div>

      {/* Reusable Action Buttons */}
      <StepActionButtons
        onBack={onBack}
        onContinue={onContinue}
      />
    </div>
  );
};

export default Step2Audience;
