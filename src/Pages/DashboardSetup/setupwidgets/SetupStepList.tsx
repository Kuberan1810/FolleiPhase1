import React from 'react';
import { Check } from 'lucide-react';
import type { SetupStep } from '../types';

interface SetupStepListProps {
  steps: SetupStep[];
  currentStepId?: string;
  onStepClick?: (stepId: string) => void;
}

export const SetupStepList: React.FC<SetupStepListProps> = ({
  steps,
  currentStepId,
  onStepClick,
}) => {
  return (
    <ul className="flex flex-col gap-1.5">
      {steps.map((step) => {
        const isActive = currentStepId ? step.id === currentStepId : step.status === 'active';
        const isCompleted = step.status === 'completed';
        const isClickable = isCompleted || isActive;

        return (
          <li
            key={step.id}
            onClick={() => {
              if (isClickable) {
                onStepClick?.(step.id);
              }
            }}
            className={`flex items-center gap-2 text-[13px] transition-colors duration-150 ${
              isClickable ? 'cursor-pointer hover:text-[#16171A]' : 'cursor-default'
            } ${
              isActive
                ? 'font-medium text-[#16171A]'
                : isCompleted
                ? 'text-[#2C2E31]'
                : 'text-[#717378]'
            }`}
          >
            <span className="flex size-3.5 items-center justify-center">
              {isCompleted ? (
                <Check className="size-3.5 text-[#0D9488] stroke-[2.5]" aria-hidden="true" />
              ) : isActive ? (
                <span className="size-2 rounded-full bg-[#0D9488]" />
              ) : (
                <span className="size-2 rounded-full border border-[#D7D7D4]" />
              )}
            </span>
            {step.label}
          </li>
        );
      })}
    </ul>
  );
};

export default SetupStepList;
