import React from 'react';
import type { Campaign } from '../types';
import { CampaignRow } from './CampaignRow';
import { initialMockCampaigns } from '../data/mockCampaigns';

interface CampaignsTableProps {
  campaigns?: Campaign[];
}

export const CampaignsTable: React.FC<CampaignsTableProps> = ({
  campaigns = initialMockCampaigns,
}) => {
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
            {campaigns.map((campaign) => (
              <CampaignRow key={campaign.id} campaign={campaign} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;
