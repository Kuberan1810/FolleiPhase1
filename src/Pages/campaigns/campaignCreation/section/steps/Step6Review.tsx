import React from 'react';
import type { CampaignFormState } from '../../types';
import { StepActionButtons } from '../StepActionButtons';

interface Step6ReviewProps {
  formState: CampaignFormState;
  onEditStep?: (stepIndex: number) => void;
  onBack: () => void;
  onLaunch: () => void;
  isLaunching?: boolean;
}

export const Step6Review: React.FC<Step6ReviewProps> = ({
  formState,
  onEditStep,
  onBack,
  onLaunch,
  isLaunching = false,
}) => {
  const objectiveDisplay =
    formState.objective === 'Other'
      ? formState.customObjective || 'Other'
      : formState.objective;

  const scheduleDisplay =
    formState.scheduleOption === 'now'
      ? 'Send now'
      : `${formState.scheduledDate || '09/01/2026'} at ${formState.scheduledTime || '10:00 AM'}`;

  const rows = [
    { label: 'CAMPAIGN', value: formState.campaignName || 'xxs', step: 0 },
    { label: 'OBJECTIVE', value: objectiveDisplay || 'Generate Leads', step: 0 },
    { label: 'AUDIENCE', value: `${formState.leadsCount || 124} leads`, step: 1 },
    { label: 'SENDING\nNUMBER', value: formState.selectedNumber || '+91 91234 56780', step: 2 },
    {
      label: 'MESSAGE',
      value: formState.mediaName
        ? `${formState.messageText ? `${formState.messageText} ` : ''}(📎 ${formState.mediaName})`
        : formState.messageText || '{Lead Source}',
      step: 3,
    },
    { label: 'SCHEDULE', value: scheduleDisplay, step: 4 },
  ];

  return (
    <div className="flex flex-col gap-3 animate-fade-slide">
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[14.5px] font-semibold text-[#16171A]">
          Review your campaign
        </h3>
        <p className="text-[12px] text-[#717378]">
          Make sure everything looks right before launching.
        </p>
      </div>

      {/* Review Table Container matching screenshot 2 */}
      <div className="rounded-[16px] border border-[#E2E8F0] bg-white overflow-hidden text-[12.5px]">
        {rows.map((row, idx) => (
          <div
            key={row.label}
            className={`flex items-center justify-between px-3.5 py-2.5 ${
              idx !== rows.length - 1 ? 'border-b border-[#F1F5F9]' : ''
            }`}
          >
            {/* Label (uppercase muted gray) */}
            <span className="w-20 text-[10px] font-medium uppercase tracking-wider text-[#64748B] whitespace-pre-line leading-tight">
              {row.label}
            </span>

            {/* Value */}
            <span className="flex-1 px-2.5 text-[12.5px] font-normal text-[#1E293B] truncate">
              {row.value}
            </span>

            {/* Edit Link */}
            <button
              type="button"
              onClick={() => onEditStep?.(row.step)}
              className="text-[11px] font-normal text-[#7A9601] hover:text-[#5E7401] transition-colors cursor-pointer shrink-0"
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Reusable Action Buttons */}
      <StepActionButtons
        onBack={onBack}
        onContinue={onLaunch}
        continueLabel={isLaunching ? 'Loading...' : 'View Campaign'}
        canContinue={!isLaunching}
      />
    </div>
  );
};

export default Step6Review;
