import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import type { LeadProfileDetail } from '../../types';

interface LeadProfileHeaderProps {
  lead: LeadProfileDetail;
  onOpenInbox?: () => void;
}

export const LeadProfileHeader: React.FC<LeadProfileHeaderProps> = ({
  lead,
  onOpenInbox,
}) => {
  const initials =
    lead.initials ||
    (lead.name || '')
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() ||
    'SM';

  const isPeachAvatar = lead.status === 'Contacted' || (lead.name && lead.name.includes('Mia'));
  const avatarBg = lead.avatarBg || (isPeachAvatar ? '#F9DEBF' : '#DCE2F3');
  const avatarTextColor = lead.avatarText || (isPeachAvatar ? '#261906' : '#404754');

  const getStatusBadge = () => {
    switch (lead.status) {
      case 'New Inquiry':
        return 'bg-[#EFF6FF] text-[#1D4ED8]';
      case 'Contacted':
        return 'bg-[#F9DEBF] text-[#261906]';
      case 'Qualified':
        return 'bg-[#DCFCE7] text-[#15803D]';
      case 'Demo Scheduled':
        return 'bg-[#F3E8FF] text-[#7E22CE]';
      case 'Proposal':
        return 'bg-[#E0E7FF] text-[#4338CA]';
      case 'Negotiation':
        return 'bg-[#FEF9C3] text-[#854D0E]';
      case 'Converted':
        return 'bg-[#D1FAE5] text-[#047857]';
      case 'Not Converted':
        return 'bg-[#FEE2E2] text-[#B91C1C]';
      default:
        return 'bg-[#DCE2F7] text-[#1E3A8A]';
    }
  };

  return (
    <header className="w-full flex items-center justify-between gap-4 bg-white px-6 py-6 rounded-[15px] border border-[#E5E7EB] ">
      {/* Left: Avatar + Title info */}
      <div className="flex items-center gap-3.5">
        {/* 2-Letter Light Theme Text Avatar */}
        <div
          className="flex size-11 shrink-0 items-center justify-center rounded-[10px] text-[14px] font-semibold tracking-wider border border-black/5 shadow-2xs select-none"
          style={{
            backgroundColor: avatarBg,
            color: avatarTextColor,
          }}
        >
          {initials}
        </div>

        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[20px] font-bold text-[#111827] tracking-tight leading-none">
              {lead.name || 'Lead name'}
            </h1>
            <span
              className={`inline-flex items-center justify-center rounded-full px-3 py-0.5 text-[12px] font-medium tracking-tight ${getStatusBadge()}`}
            >
              {lead.status || 'New Inquiry'}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-[13px] text-[#6B7280]">
            <span className="inline-flex items-center justify-center rounded bg-[#FFF4E1] px-2 py-0.5 text-[11px] font-bold text-[#F59E0B]">
              {lead.score || 'Warm'}
            </span>
            <span>
              Interested in{' '}
              <strong className="font-semibold text-[#111827]">
                {lead.interestedCourse ||
                  lead.courseInterest?.courseName ||
                  'Digital Marketing'}
              </strong>
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenInbox}
          className="inline-flex items-center justify-center rounded-[8px] bg-[#7A9601] hover:bg-[#5C771E] px-6 py-2 text-[12px] font-medium text-white shadow-xs transition-colors cursor-pointer"
        >
          Inbox
        </button>

        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] hover:bg-[#F9FAFB] hover:text-[#111827] transition-colors cursor-pointer"
          title="More options"
        >
          <MoreHorizontal className="size-4" />
        </button>
      </div>
    </header>
  );
};



export default LeadProfileHeader;
