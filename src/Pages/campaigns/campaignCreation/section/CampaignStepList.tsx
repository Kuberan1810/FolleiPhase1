import React from 'react';
import { Check } from 'lucide-react';
import { CAMPAIGN_STEPS } from '../types';

interface CampaignStepListProps {
  currentStepIndex: number;
  onStepClick?: (stepIndex: number) => void;
}

export const CampaignStepList: React.FC<CampaignStepListProps> = ({
  currentStepIndex,
  onStepClick,
}) => {
  return (
    <div className="flex flex-col gap-2 py-0.5">
      {CAMPAIGN_STEPS.map((step, index) => {
        const isActive = index === currentStepIndex;
        const isCompleted = index < currentStepIndex;
        const isPending = index > currentStepIndex;

        return (
          <button
            key={step.id}
            type="button"
            disabled={isPending}
            onClick={() => onStepClick?.(index)}
            className={`flex items-center gap-2.5 text-left transition-all ${
              isPending ? 'cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            {/* Step Status Circle matching screenshot */}
            <div className="flex size-4.5 items-center justify-center shrink-0">
              {isCompleted ? (
                // Solid #7A9601 with white checkmark
                <div className="flex size-4.5 items-center justify-center rounded-full bg-[#7A9601] text-white">
                  <Check className="size-2.5 stroke-[3]" />
                </div>
              ) : isActive ? (
                // #7A9601 target / radio dot
                <div className="flex size-4.5 items-center justify-center rounded-full border-[1.5px] border-[#7A9601] bg-[#F4F7E6]">
                  <div className="size-1.5 rounded-full bg-[#7A9601]" />
                </div>
              ) : (
                // Light gray hollow circle matching screenshot
                <div className="size-4.5 rounded-full border-[1.5px] border-[#CBD5E1] bg-white" />
              )}
            </div>

            {/* Step Label */}
            <span
              className={`text-[13px] tracking-tight leading-none ${
                isActive
                  ? 'font-semibold text-[#16171A]'
                  : isCompleted
                  ? 'font-medium text-[#475569]'
                  : 'font-normal text-[#64748B]'
              }`}
            >
              {step.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default CampaignStepList;
