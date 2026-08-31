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
        const isSkipped = step.status === 'skipped';

        return (
          <li
            key={step.id}
            onClick={() => {
              onStepClick?.(step.id);
            }}
            className={`flex items-center justify-between gap-2 text-[13px] transition-colors duration-150 py-0.5 cursor-pointer rounded-lg px-1.5 -mx-1.5 hover:bg-black/5 ${
              isActive
                ? 'font-semibold text-[#16171A]'
                : isCompleted
                ? 'text-[#2C2E31]'
                : isSkipped
                ? 'text-amber-800'
                : 'text-[#717378]'
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="flex size-3.5 shrink-0 items-center justify-center">
                {isCompleted ? (
                  <Check className="size-3.5 text-[#0D9488] stroke-[2.5]" aria-hidden="true" />
                ) : isSkipped ? (
                  <span className="size-2 rounded-full bg-amber-500 ring-2 ring-amber-200" />
                ) : isActive ? (
                  <span className="size-2 rounded-full border-[1px] border-dashed border-[#0D9488] bg-transparent" />
                ) : (
                  <span className="size-2 rounded-full border border-[#D7D7D4]" />
                )}
              </span>
              <span className="truncate">{step.label}</span>
            </div>

            {isSkipped && (
              <span className="text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.2 shrink-0">
                Upload
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SetupStepList;
