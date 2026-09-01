import React from 'react';
import { Check } from 'lucide-react';
import type { CampaignFormState } from '../../types';

interface CampaignLaunchedSuccessProps {
  formState: CampaignFormState;
  onViewCampaign: () => void;
  onCreateAnother: () => void;
}

export const CampaignLaunchedSuccess: React.FC<CampaignLaunchedSuccessProps> = ({
  formState,
  onViewCampaign,
  onCreateAnother,
}) => {
  const isScheduled = formState.scheduleOption === 'later';
  const statusDisplay = isScheduled ? 'Scheduled' : 'Active';

  return (
    <div className="flex flex-col items-start gap-3 animate-fade-slide py-1">
      {/* Top Green Check Badge */}
      <div className="flex size-9 items-center justify-center rounded-full bg-[#F4F7E6] text-[#7A9601]">
        <Check className="size-4.5 stroke-[2.5]" />
      </div>

      {/* Header: Title & Subtitle */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[15px] font-bold tracking-tight text-[#16171A]">
          Campaign launched
        </h3>
        <p className="text-[12px] text-[#717378]">
          Your campaign is now ready to reach your audience.
        </p>
      </div>

      {/* Summary Recap Table matching screenshot */}
      <div className="w-full rounded-[16px] border border-[#E2E8F0] bg-white overflow-hidden text-[12.5px] my-1">
        {/* Campaign Row */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#F1F5F9]">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748B]">
            CAMPAIGN
          </span>
          <span className="font-medium text-[#1E293B] truncate max-w-[170px]">
            {formState.campaignName || 'Untitled'}
          </span>
        </div>

        {/* Audience Row */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-[#F1F5F9]">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748B]">
            AUDIENCE
          </span>
          <span className="font-medium text-[#1E293B]">
            {formState.leadsCount || 124} leads
          </span>
        </div>

        {/* Status Row */}
        <div className="flex items-center justify-between px-3.5 py-2.5">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#64748B]">
            STATUS
          </span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-[#16171A]">
            <span
              className={`size-2 rounded-full ${
                isScheduled ? 'bg-[#94A3B8]' : 'bg-[#10B981]'
              }`}
            />
            <span>{statusDisplay}</span>
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col items-center gap-1.5 w-full pt-1">
        <button
          type="button"
          onClick={onViewCampaign}
          className="w-full h-9.5 rounded-full bg-[#1E293B] hover:bg-[#0F172A] text-white text-[12.5px] font-semibold transition-all cursor-pointer active:scale-98"
        >
          Launch Campaign
        </button>

        <button
          type="button"
          onClick={onCreateAnother}
          className="text-[12px] font-medium text-[#64748B] hover:text-[#16171A] transition-colors cursor-pointer py-1"
        >
          Create Another
        </button>
      </div>
    </div>
  );
};

export default CampaignLaunchedSuccess;
