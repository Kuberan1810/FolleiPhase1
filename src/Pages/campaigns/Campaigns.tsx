import React from 'react';
import {
  CampaignsHeader,
  CampaignsTable,
} from './section';

export const CampaignsPage: React.FC = () => {
  return (
    <div className="flex-1 px-4 sm:px-8 pb-12 py-6 lg:py-8 max-w-7xl w-full">
      {/* Header */}
      <CampaignsHeader />

      {/* Campaigns Table */}
      <CampaignsTable />
    </div>
  );
};

export default CampaignsPage;
