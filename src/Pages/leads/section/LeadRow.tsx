import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Lead } from '../types';

interface LeadRowProps {
  lead: Lead;
}

export const LeadRow: React.FC<LeadRowProps> = ({ lead }) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/leads/${lead.id}`);
  };

  const getStatusBadge = () => {
    switch (lead.status) {
      case 'New Inquiry':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#DCE2F7] px-3.5 py-1 text-[12px] text-[#141B2B] tracking-tight">
            New Inquiry
          </span>
        );
      case 'Contacted':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#F9DEBF] px-3.5 py-1 text-[12px] text-[#261906] tracking-tight">
            Contacted
          </span>
        );
      case 'Qualified':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#DCFCE7] px-3.5 py-1 text-[12px] font-medium text-[#15803D] tracking-tight">
            Qualified
          </span>
        );
      case 'Demo Scheduled':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#F3E8FF] px-3.5 py-1 text-[12px] font-medium text-[#7E22CE] tracking-tight">
            Demo Scheduled
          </span>
        );
      case 'Proposal':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#E0E7FF] px-3.5 py-1 text-[12px] font-medium text-[#4338CA] tracking-tight">
            Proposal
          </span>
        );
      case 'Negotiation':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#FEF9C3] px-3.5 py-1 text-[12px] font-medium text-[#854D0E] tracking-tight">
            Negotiation
          </span>
        );
      case 'Converted':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#D1FAE5] px-3.5 py-1 text-[12px] font-medium text-[#047857] tracking-tight">
            Converted
          </span>
        );
      case 'Not Converted':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#FEE2E2] px-3.5 py-1 text-[12px] font-medium text-[#B91C1C] tracking-tight">
            Not Converted
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-3.5 py-1 text-[12px] font-medium text-gray-700">
            {lead.status}
          </span>
        );
    }
  };

  const initials =
    lead.initials ||
    lead.name
      .trim()
      .split(/\s+/)
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase();

  const isPeachAvatar = lead.status === 'Contacted' || lead.name.includes('Mia');

  return (
    <tr
      onClick={handleRowClick}
      className="border-b border-[#F0F0EC] last:border-b-0 hover:bg-[#F9FAFB] cursor-pointer transition-colors"
    >
      {/* Index # */}
      <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#45464C]">
        {lead.leadNumber}
      </td>

      {/* Lead Info (Avatar + Name + Email) */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3.5">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold tracking-wider transition-transform group-hover:scale-105"
            style={{
              backgroundColor:
                lead.avatarBg || (isPeachAvatar ? '#F9DEBF' : '#DCE2F3'),
              color:
                lead.avatarText || (isPeachAvatar ? '#261906' : '#404754'),
            }}
          >
            {initials}
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-medium text-[#111827] hover:text-[#6B8323] transition-colors">
              {lead.name}
            </span>
            <span className="text-[13px] text-[#6B7280] mt-0.5">
              {lead.email}
            </span>
          </div>
        </div>
      </td>

      {/* Date */}
      <td className="px-6 py-4 whitespace-nowrap text-[14px] text-[#45464C]">
        {lead.date}
      </td>

      {/* Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap text-left">
        {getStatusBadge()}
      </td>
    </tr>
  );
};
export default LeadRow;

