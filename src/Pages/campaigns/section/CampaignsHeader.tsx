import React from 'react';
import { Plus } from 'lucide-react';

export const CampaignsHeader: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 pt-2 pb-1">
      {/* Top row: Title/Subtitle & + Create campaign button */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-medium text-[28px] leading-[35px] tracking-[0px] text-[#1E293B]">
            Campaigns
          </h1>
          <p className="font-normal text-[14px] leading-[20px] tracking-[0px] text-[#64748B] mt-1">
            Create and manage automated lead follow-ups.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#7A9601] hover:bg-[#597818] active:bg-[#4E6914] px-4 py-2 text-[14px] text-white shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="size-4 stroke-[2.2]" />
          <span>Create campaign</span>
        </button>
      </div>

      {/* Status Indicators Bar */}
      <div className="flex items-center gap-6 text-[12px] font-medium tracking-wide flex-wrap pt-1">
        {/* Active */}
        <div className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#10B981] inline-block" />
          <span className="text-[#64748B] uppercase tracking-[0.05em]">
            ACTIVE: <span className="font-semibold text-[#16171A]">1</span>
          </span>
        </div>

        {/* Scheduled */}
        <div className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#94A3B8] inline-block" />
          <span className="text-[#64748B] uppercase tracking-[0.05em]">
            SCHEDULED: <span className="font-semibold text-[#16171A]">1</span>
          </span>
        </div>

        {/* Completed */}
        <div className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#CBD5E1] inline-block" />
          <span className="text-[#64748B] uppercase tracking-[0.05em]">
            COMPLETED: <span className="font-semibold text-[#16171A]">1</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CampaignsHeader;
