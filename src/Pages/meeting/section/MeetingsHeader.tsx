import React from 'react';
import { Plus } from 'lucide-react';

interface MeetingsHeaderProps {
  onScheduleMeeting?: () => void;
}

export const MeetingsHeader: React.FC<MeetingsHeaderProps> = ({ onScheduleMeeting }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2 pb-1">
      <div>
        <h1 className="text-[48px] tracking-tight text-[#111827]">
          Meetings
        </h1>
        <p className="text-[16px] text-[#6B7280] mt-1">
          Stay on top of your upcoming sales conversations.
        </p>
      </div>

      <button
        type="button"
        onClick={onScheduleMeeting}
        className="inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#7A9601] hover:bg-[#597818] active:bg-[#4E6914] px-4 py-2 text-[14px] text-white shadow-xs transition-colors cursor-pointer shrink-0"
      >
        <Plus className="size-4 stroke-[2.2]" />
        <span>Schedule Meeting</span>
      </button>
    </div>
  );
};

export default MeetingsHeader;
