import React from 'react';
import type { Lead } from '../Leads';
import ContactInformation from './ContactInformation';
import CompanyDetails from './CompanyDetails';
import CampaignCard from './CampaignCard';
import CompletedActivities from './CompletedActivities';
import ScheduledActivities from './ScheduledActivities';

interface LeadActivitiesProps {
  lead: Lead;
}

const LeadActivities: React.FC<LeadActivitiesProps> = ({ lead }) => {
  return (
    <div className="space-y-6">
      <ContactInformation lead={lead} />
      <CompanyDetails lead={lead} />
      <CompletedActivities />
      <ScheduledActivities />
      <CampaignCard />
    </div>
  );
};

export default LeadActivities;
