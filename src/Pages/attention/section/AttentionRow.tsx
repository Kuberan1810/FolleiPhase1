import React from 'react';
import type { AttentionLead } from '../types';

interface AttentionRowProps {
  lead: AttentionLead;
}

export const AttentionRow: React.FC<AttentionRowProps> = ({ lead }) => {
  const renderIntentBadge = () => {
    switch (lead.intent) {
      case 'HOT':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#EFF6FF] px-3.5 py-0.5 text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
            HOT
          </span>
        );
      case 'WARM':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#FFF7ED] px-3.5 py-0.5 text-[11px] font-bold text-[#EA580C] tracking-wider uppercase">
            WARM
          </span>
        );
      case 'COLD':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#EFF6FF] px-3.5 py-0.5 text-[11px] font-bold text-[#2563EB] tracking-wider uppercase">
            COLD
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <tr className="border-b border-[#F0F0EC] last:border-b-0 hover:bg-[#FAFAF9] transition-colors">
      {/* # */}
      <td className="w-16 px-6 py-4 text-[14px] text-[#6B7280] font-normal whitespace-nowrap">
        {lead.leadNumber}
      </td>

      {/* LEAD (Avatar, Name, Email) */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3.5">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold tracking-wide"
            style={{
              backgroundColor: lead.avatarBg || '#DBEAFE',
              color: lead.avatarText || '#2563EB',
            }}
          >
            {lead.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-[15px] font-medium text-[#111827] leading-tight">
              {lead.name}
            </span>
            <span className="text-[13px] text-[#6B7280] leading-tight mt-0.5">
              {lead.email}
            </span>
          </div>
        </div>
      </td>

      {/* CONTACT (Phone) */}
      <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#475569]">
        {lead.phone}
      </td>

      {/* INTENT (Badge) */}
      <td className="px-6 py-4 whitespace-nowrap text-left">
        {renderIntentBadge()}
      </td>
    </tr>
  );
};

export default AttentionRow;
