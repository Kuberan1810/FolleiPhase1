import React from 'react';
import { Phone } from 'lucide-react';
import type { Campaign } from '../types';

interface CampaignRowProps {
  campaign: Campaign;
}

// Crisp Chat icon matching the screenshot's message bubble
const ChatBubbleIcon: React.FC<{ className?: string }> = ({ className = 'size-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <line x1="8" y1="9" x2="16" y2="9" />
    <line x1="8" y1="13" x2="13" y2="13" />
  </svg>
);

export const CampaignRow: React.FC<CampaignRowProps> = ({ campaign }) => {
  // Channel icons renderer
  const renderChannelIcons = () => {
    return (
      <div className="flex items-center gap-1.5 text-[#64748B]">
        {campaign.channels.includes('WhatsApp') && (
          <ChatBubbleIcon className="size-4 text-[#64748B]" />
        )}
        {campaign.channels.includes('Call') && (
          <Phone className="size-3.5 text-[#64748B] stroke-[1.8]" />
        )}
      </div>
    );
  };

  // Channel formatted string label (e.g. "WhatsApp + Call")
  const channelText = campaign.channels.join(' + ');

  // Status badge styling
  const getStatusBadge = () => {
    switch (campaign.status) {
      case 'Active':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#10B981]/10 px-2.5 py-1 text-[12px] font-medium text-[#10B981] tracking-tight">
            Active
          </span>
        );
      case 'Scheduled':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-[#DCE2F7] px-2.5 py-1 text-[12px] font-medium text-[#141B2B] tracking-tight">
            Scheduled
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-medium text-[#495057] tracking-tight">
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center justify-center rounded-full bg-gray-100 px-2.5 py-1 text-[12px] font-medium text-gray-700">
            {campaign.status}
          </span>
        );
    }
  };

  return (
    <tr className="border-b border-[#F0F0EC] last:border-b-0 hover:bg-[#FAFAF9] transition-colors">
      {/* CAMPAIGN */}
      <td className="px-6 py-3.5 whitespace-nowrap">
        <span className="text-[16px] text-[#111827]">
          {campaign.name}
        </span>
      </td>

      {/* CHANNEL */}
      <td className="px-6 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-2">
          {renderChannelIcons()}
          <span className="text-[14px] text-[#6B7280]">{channelText}</span>
        </div>
      </td>

      {/* AUDIENCE */}
      <td className="px-6 py-3.5 whitespace-nowrap text-[14px] text-[#6B7280]">
        {campaign.audienceLabel || `${campaign.audienceCount} leads`}
      </td>

      {/* STATUS */}
      <td className="px-6 py-3.5 whitespace-nowrap text-left">
        {getStatusBadge()}
      </td>
    </tr>
  );
};

export default CampaignRow;
