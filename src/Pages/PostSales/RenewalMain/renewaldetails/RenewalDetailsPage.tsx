import React from 'react';
import RenewalDetailsLayout from './Section/RenewalDetailsLayout';

export type RenewalDetailsStatCard = {
  id: string;
  title: string;
  value: string;
  pillText: string;
  iconColor: string;
  iconBg: string;
  unit?: string;
};

export type RenewalDetailsData = {
  statCards: RenewalDetailsStatCard[];
  customerOverview: {
    company: string;
    industry: string;
    companySize: string;
    region: string;
    customerSince: string;
    yearsTotal: string;
    tier: string;
    primaryContact: {
      initials: string;
      name: string;
      role: string;
    };
  };
  contractDetails: {
    contractId: string;
    startDate: string;
    expiryDate: string;
    accountManager: {
      initials: string;
      name: string;
      role: string;
    };
  };
  activityTimeline: {
    id: string;
    timestamp: string;
    title: string;
    description: string;
    file?: {
      name: string;
      url: string;
    };
  }[];
  subscriptionFinancials: {
    arr: string;
    mrr: string;
    lastInvoiceDate: string;
    currentValue: string;
    renewalValue: string;
    increase: string;
    autoRenewal: boolean;
  };
  productUsage: {
    seatUtilization: number;
    storageUsage: number;
    apiUsage: number;
  };
  expansionOpportunities: {
    id: string;
    label: string;
    value: string;
    iconName: 'harddrive' | 'bot';
  }[];
};

export default function RenewalDetailsPage() {
  return <RenewalDetailsLayout />;
}
