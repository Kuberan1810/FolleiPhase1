import React, { useState } from 'react';
import { mockRenewalDetailsData } from '../data/mockRenewalDetailsPage';
import RenewalDetailsHeader from './RenewalDetailsHeader';
import RenewalDetailsStatCards from './RenewalDetailsStatCards';
import CustomerOverviewCard from './CustomerOverviewCard';
import SubscriptionFinancialsCard from './SubscriptionFinancialsCard';
import ContractDetailsCard from './ContractDetailsCard';
import ProductUsageCard from './ProductUsageCard';
import ActivityTimelineCard from './ActivityTimelineCard';
import ExpansionOpportunitiesCard from './ExpansionOpportunitiesCard';

export default function RenewalDetailsLayout() {
  const [data] = useState(mockRenewalDetailsData);

  return (
    <div className="pb-10">
      <RenewalDetailsHeader />
      
      <div className="my-6">
        <RenewalDetailsStatCards cards={data.statCards} />
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-[2fr_1fr] gap-6 mt-6">
        {/* Left 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomerOverviewCard data={data.customerOverview} />
          <ContractDetailsCard data={data.contractDetails} />
          
          <SubscriptionFinancialsCard data={data.subscriptionFinancials} />
          <ProductUsageCard data={data.productUsage} />
        </div>
        
        {/* Right 1 column */}
        <div className="flex flex-col gap-6">
          <div className="flex-1">
            <ActivityTimelineCard data={data.activityTimeline} />
          </div>
          <div>
            <ExpansionOpportunitiesCard data={data.expansionOpportunities} />
          </div>
        </div>
      </div>
    </div>
  );
}