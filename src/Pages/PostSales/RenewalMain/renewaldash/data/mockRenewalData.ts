import type { RenewalStat, PredictionDataPoint, RenewalRow, AiInsight, ForecastItem, UpsellItem } from '../RenewalDash';

export const mockStats: RenewalStat[] = [
  { id: '1', label: 'Toatal Renewals Due', value: '245', subLabel: '+12.4%', subType: 'success' },
  { id: '2', label: 'Due To This Week', value: '12', subLabel: 'Urjent', subType: 'urgent' },
  { id: '3', label: 'Renewal Revenue', value: '$4.2M', subLabel: 'Target', subType: 'success' },
  { id: '4', label: 'Churn Risk', value: '8', subLabel: 'Risk', subType: 'risk' },
];

export const mockPredictionData: PredictionDataPoint[] = [
  { month: 'Jan', follei: 90, actual: 60 },
  { month: 'Feb', follei: 55, actual: 35 },
  { month: 'Mar', follei: 80, actual: 55 },
  { month: 'Apr', follei: 100, actual: 70 },
  { month: 'May', follei: 70, actual: 45 },
  { month: 'Jun', follei: 85, actual: 58 },
  { month: 'Jul', follei: 75, actual: 50 },
];

export const mockRenewalRows: RenewalRow[] = [
  { id: '1', name: 'Jeevan lin', email: 'sophia.m@gmail.com', initials: 'JL', avatarBg: '#E7D2D2', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Committed', score: 92 },
  { id: '2', name: 'Sealfa Que', email: 'sophia.m@gmail.com', initials: 'SQ', avatarBg: '#C4EAC7', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Risk', score: 32 },
  { id: '3', name: 'Hasunla', email: 'sophia.m@gmail.com', initials: 'HS', avatarBg: '#E8E7AD', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Negotiating', score: 56 },
  { id: '4', name: 'Willemkon', email: 'sophia.m@gmail.com', initials: 'WM', avatarBg: '#D2DAE7', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Risk', score: 32 },
  { id: '5', name: 'Andro pea', email: 'sophia.m@gmail.com', initials: 'AP', avatarBg: '#E7C16A', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Risk', score: 32 },
];

export const mockAiInsights: AiInsight[] = [
  { id: '1', title: 'High-Risk Alert', caption: 'Global Logistics usage dropped 40%. Recommend scheduling a QBR by Friday.', ctaText: 'Schedule Now' },
  { id: '2', title: 'Upsell Opportunity', caption: 'TechCorp reached user limits. Best follow-up: Tuesday 10:00 AM.', ctaText: 'Draft Proposal' },
];

export const mockForecast: ForecastItem[] = [
  { id: '1', label: 'Confirmed', value: 64, color: '#10B981' },
  { id: '2', label: 'Expected', value: 28, color: '#FFB347' },
  { id: '3', label: 'At Risk', value: 12, color: '#BA1A1A' },
];

export const mockUpsells: UpsellItem[] = [
  { 
    id: '1', 
    name: 'Jeevan lin', 
    email: 'jeevan.l@gmail.com', 
    avatar: '',
    initials: 'JL',
    avatarBg: '#E7D2D2',
    amount: '$4.2M', 
    percentage: '+10.4%', 
    note: 'Expansion proposal v2 delivered to Jane Doe (VP Procurement). Includes the 15% multi-year discount package.' 
  },
  { 
    id: '2', 
    name: 'Sealfa Que', 
    email: 'sealfa.q@gmail.com', 
    avatar: '',
    initials: 'SQ',
    avatarBg: '#C4EAC7',
    amount: '$4.2M', 
    percentage: '+10.4%', 
    note: 'Expansion proposal v2 delivered to Jane Doe (VP Procurement). Includes the 15% multi-year discount package.' 
  },
  { 
    id: '3', 
    name: 'Hasunla', 
    email: 'hasunla@gmail.com', 
    avatar: '',
    initials: 'HS',
    avatarBg: '#E8E7AD',
    amount: '$4.2M', 
    percentage: '+10.4%', 
    note: 'Expansion proposal v2 delivered to Jane Doe (VP Procurement). Includes the 15% multi-year discount package.' 
  },
];
