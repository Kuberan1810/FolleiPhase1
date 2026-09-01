import React from 'react';
import { Megaphone } from 'lucide-react';
import type { Campaign } from '../types';
import { CampaignRow } from './CampaignRow';
import { useCampaigns } from '../useCampaigns';

interface CampaignsTableProps {
  campaigns?: Campaign[];
}

export const CampaignsTable: React.FC<CampaignsTableProps> = ({
  campaigns: propsCampaigns,
}) => {
  const { campaigns } = useCampaigns();
  const activeCampaigns = propsCampaigns ?? campaigns;

  if (activeCampaigns.length === 0) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center rounded-[16px] border border-[#E5E7EB] bg-white p-12 text-center shadow-xs">
        <div className="flex size-12 items-center justify-center rounded-full bg-[#F1F3F5] text-[#717378] mb-3.5">
          <Megaphone className="size-6 text-[#717378]" />
        </div>
        <h3 className="text-[15px] font-semibold text-[#16171A]">No campaigns launched yet</h3>
        <p className="text-[13.5px] text-[#717378] max-w-sm mt-1">
          Complete your sales package and click "Start Follei" or create a campaign to start outreach.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-[12px] border border-[#E5E7EB] bg-white shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#F0F0EC] bg-transparent">
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Campaign
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Channel
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Audience
              </th>
              <th
                scope="col"
                className="px-6 py-3.5 text-[12px] uppercase tracking-wider text-[#6B7280]"
              >
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {activeCampaigns.map((campaign) => (
              <CampaignRow key={campaign.id} campaign={campaign} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;
