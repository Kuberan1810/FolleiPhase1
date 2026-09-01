import React from 'react';
import { OBJECTIVE_OPTIONS } from '../../types';
import { StepActionButtons } from '../StepActionButtons';
import { CapsuleButton } from '../CapsuleButton';

interface Step1BasicsProps {
  campaignName: string;
  onCampaignNameChange: (val: string) => void;
  objective: string;
  onObjectiveChange: (val: string) => void;
  customObjective: string;
  onCustomObjectiveChange: (val: string) => void;
  onContinue: () => void;
}

export const Step1Basics: React.FC<Step1BasicsProps> = ({
  campaignName,
  onCampaignNameChange,
  objective,
  onObjectiveChange,
  customObjective,
  onCustomObjectiveChange,
  onContinue,
}) => {
  const isOther = objective === 'Other';
  const canContinue = campaignName.trim().length > 0 && (objective.length > 0 && (!isOther || customObjective.trim().length > 0));

  return (
    <div className="flex flex-col gap-3 animate-fade-slide">
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[14.5px] font-semibold text-[#16171A]">
          Campaign Basics
        </h3>
        <p className="text-[12px] text-[#717378]">
          Let's start with the basics of your campaign.
        </p>
      </div>

      {/* Campaign Name Field */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-medium text-[#16171A]">
          Campaign name
        </label>
        <input
          type="text"
          value={campaignName}
          onChange={(e) => onCampaignNameChange(e.target.value)}
          placeholder="Enter campaign name"
          className="w-full rounded-[12px] border border-[#E2E8F0] bg-white px-3 py-2 text-[12.5px] text-[#16171A] placeholder-[#9CA3AF] focus:border-[#7A9601] focus:outline-none transition-colors"
        />
      </div>

      {/* Campaign Objective Pills */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[12px] font-medium text-[#16171A]">
          Campaign objective
        </label>
        <div className="flex flex-wrap gap-1.5">
          {OBJECTIVE_OPTIONS.map((option) => (
            <CapsuleButton
              key={option}
              isSelected={objective === option}
              onClick={() => onObjectiveChange(option)}
            >
              {option}
            </CapsuleButton>
          ))}
        </div>
      </div>

      {/* When "Other" is selected, show custom objective input */}
      {isOther && (
        <div className="flex flex-col gap-1 pl-2.5 border-l-2 border-[#7A9601] animate-fade-slide mt-0.5">
          <label className="text-[12px] font-medium text-[#16171A]">
            Tell us your campaign objective
          </label>
          <input
            type="text"
            value={customObjective}
            onChange={(e) => onCustomObjectiveChange(e.target.value)}
            placeholder="Enter your campaign objective..."
            className="w-full rounded-[10px] border border-[#E2E8F0] bg-white px-3 py-1.5 text-[12.5px] text-[#16171A] placeholder-[#9CA3AF] focus:border-[#7A9601] focus:outline-none transition-colors"
          />
        </div>
      )}

      {/* Reusable Action Buttons */}
      <StepActionButtons
        backDisabled
        canContinue={canContinue}
        onContinue={onContinue}
      />
    </div>
  );
};

export default Step1Basics;
