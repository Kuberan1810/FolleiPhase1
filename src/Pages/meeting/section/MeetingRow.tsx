import React from 'react';
import { type Meeting } from '../types';

interface MeetingRowProps {
  meeting: Meeting;
}

export const MeetingRow: React.FC<MeetingRowProps> = ({ meeting }) => {
  const { date, time, lead, status } = meeting;

  const renderAvatar = () => {
    const initials =
      lead.initials ||
      lead.name
        .trim()
        .split(/\s+/)
        .map((part) => part[0])
        .filter(Boolean)
        .slice(0, 2)
        .join('')
        .toUpperCase() ||
      '';

    return (
      <div
        className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11.5px] font-semibold tracking-wider"
        style={{
          backgroundColor: lead.bgColor || '#E2E8F0',
          color: lead.textColor || '#475569',
        }}
      >
        {initials}
      </div>
    );
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'Upcoming':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#DCE2F7] px-2.5 py-1 text-[12px] font-medium text-[#141B2B] tracking-tight">
            Upcoming
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#10B981]/10 px-2.5 py-1 text-[12px] font-medium text-[#10B981] tracking-tight">
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3.5 py-1 text-[12px] font-medium text-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <tr className="border-b border-[#F0F0EC] last:border-b-0 hover:bg-[#FAFAF9] transition-colors">
      {/* Date & Time */}
      <td className="px-6 py-3.5 whitespace-nowrap">
        <div className="flex flex-col">
          <span className="text-[16px] text-[#111827]">
            {date}
          </span>
          <span className="text-[14px] text-[#6B7280] mt-0.5 font-normal">
            {time}
          </span>
        </div>
      </td>

      {/* Lead */}
      <td className="px-6 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-3">
          {renderAvatar()}
          <span className="text-[16px] text-[#111827]">
            {lead.name}
          </span>
        </div>
      </td>

      {/* Status */}
      <td className="px-6 py-3.5 whitespace-nowrap text-left">
        {getStatusBadge()}
      </td>
    </tr>
  );
};

export default MeetingRow;
