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
    <div style={{ paddingBottom: '40px' }}>
      <RenewalDetailsHeader />
      
      <div style={{ marginTop: '24px', marginBottom: '24px' }}>
        <RenewalDetailsStatCards cards={data.statCards} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '24px' }}>
        {/* Left 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <CustomerOverviewCard data={data.customerOverview} />
          <ContractDetailsCard data={data.contractDetails} />
          
          <SubscriptionFinancialsCard data={data.subscriptionFinancials} />
          <ProductUsageCard data={data.productUsage} />
        </div>
        
        {/* Right 1 column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ flex: 1 }}>
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