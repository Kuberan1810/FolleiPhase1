import type { RenewalDetailsData } from '../RenewalDetailsPage';

export const mockRenewalDetailsData: RenewalDetailsData = {
  statCards: [
    { id: '1', title: 'Days to Renewal', value: '42', pillText: '20% Remaining', iconColor: '#014370', iconBg: 'rgba(0,69,112,0.1)', unit: 'Days' },
    { id: '2', title: 'Annual Contract Value (ACV)', value: '$45,000', pillText: '', iconColor: '#004AC6', iconBg: 'rgba(0,74,198,0.1)', unit: '/years' },
    { id: '3', title: 'Renewal Probability', value: '86', pillText: '+4% vs last quarter', iconColor: '#0D9488', iconBg: 'rgba(13,148,136,0.1)', unit: '%' },
    { id: '4', title: 'Customer Health Score', value: '92', pillText: 'Excellent', iconColor: '#16A34A', iconBg: 'rgba(22,163,74,0.1)', unit: '/100' },
  ],
  customerOverview: {
    company: 'Acme Corporation',
    industry: 'Technology',
    companySize: '500 Employees',
    region: 'Bangalore',
    customerSince: 'Jan 15, 2021',
    yearsTotal: '3.5 Years Total',
    tier: 'Enterprise',
    primaryContact: {
      initials: 'JH',
      name: 'Jane Harrison',
      role: 'Director of IT'
    }
  },
  contractDetails: {
    contractId: 'CTR-2025-001',
    startDate: 'Jan 15, 2024',
    expiryDate: 'Jan 15, 2025',
    accountManager: {
      initials: 'SM',
      name: 'Sarah Miller',
      role: 'Senior CS Lead'
    }
  },
  activityTimeline: [
    {
      id: '1',
      timestamp: 'Today, 10:45 AM',
      title: 'Renewal Negotiation Started',
      description: 'Initial contact made regarding 2024 renewal terms. User suggested interest in upgrading storage capacity.',
      file: {
        name: 'Draft_Proposal_v1.pdf',
        url: '#'
      }
    },
    {
      id: '2',
      timestamp: 'Oct 24, 2023',
      title: 'QBR Completed',
      description: 'Quarterly Business Review held with stakeholders. Positive sentiment reported across IT and Finance teams.'
    },
    {
      id: '3',
      timestamp: 'Sep 15, 2023',
      title: 'Usage Threshold Alert',
      description: 'Account reached 85% seat utilization. Automated notification sent to Sarah Connor.'
    }
  ],
  subscriptionFinancials: {
    arr: '$45,000',
    mrr: '$3,750',
    lastInvoiceDate: 'Oct 15, 2024',
    currentValue: '$45,000',
    renewalValue: '$48,500',
    increase: '+7.8%',
    autoRenewal: true
  },
  productUsage: {
    seatUtilization: 78,
    storageUsage: 92,
    apiUsage: 64
  },
  expansionOpportunities: [
    {
      id: '1',
      label: 'Storage Upgrade',
      value: '+$12k',
      iconName: 'harddrive'
    },
    {
      id: '2',
      label: 'AI Add-on',
      value: '+$15k',
      iconName: 'bot'
    }
  ]
};
