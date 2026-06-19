import type { RenewalStatCard, RenewalListRow, RenewalDetail } from '../Renewal';

export const mockStatCards: RenewalStatCard[] = [
  { id: '1', icon: 'users', iconBoxBg: 'bg-[#E6EDF1]', label: 'Total Revenue', value: '25,000', pillText: '+12% from last month', pillColor: '#F73F55', pillBg: 'rgba(247,63,85,0.05)' },
  { id: '2', icon: 'calendar', iconBoxBg: 'bg-[#E6EDF1]', label: 'Retention Forecast', value: '88%', pillText: 'On track for Target', pillColor: '#006A61', pillBg: 'rgba(0,67,112,0.05)' },
  { id: '3', icon: 'userCheck', iconBoxBg: 'bg-[#E6EDF1]', label: 'Pending Signature', value: '10', pillText: 'Avg.4 days to sign', pillColor: '#023CB9', pillBg: 'rgba(0,106,106,0.05)' },
];

export const mockRenewalListRows: RenewalListRow[] = [
  { id: '1', name: 'Sophia Miller', email: 'sophia.m@gmail.com', avatar: 'https://i.pravatar.cc/150?img=5', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Committed', score: 92 },
  { id: '2', name: 'Sophia Miller', email: 'sophia.m@gmail.com', avatar: 'https://i.pravatar.cc/150?img=5', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Risk', score: 32 },
  { id: '3', name: 'Sophia Miller', email: 'sophia.m@gmail.com', avatar: 'https://i.pravatar.cc/150?img=5', plan: 'PRO', date: '12 Jan, 2026', status: 'Negotiating', score: 56 },
  { id: '4', name: 'Sophia Miller', email: 'sophia.m@gmail.com', avatar: 'https://i.pravatar.cc/150?img=5', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Negotiating', score: 56 },
  { id: '5', name: 'Sophia Miller', email: 'sophia.m@gmail.com', avatar: 'https://i.pravatar.cc/150?img=5', plan: 'ENTERPRISE', date: '12 Jan, 2026', status: 'Risk', score: 32 },
];

export const mockRenewalDetail: RenewalDetail = {
  id: '1',
  name: 'Sophia Miller',
  email: 'sophia.m@gmail.com',
  avatar: 'https://i.pravatar.cc/150?img=5',
  plan: 'Platinum',
  planUpgradeNote: 'Next: Diamond upgrade',
  seatsUsed: 842,
  seatsTotal: 1000,
  renewalChance: 85,
  churnRisk: 'Low',
  bestAction: {
    title: 'Schedule check-in',
    caption: 'Usage has spiked by 22% in the Marketing department. A check-in could secure an early expansion.'
  },
  usageTrend: '+12% MoM',
  usageBars: [
    { month: 'Jun', value: 40, highlight: false },
    { month: 'Jul', value: 55, highlight: false },
    { month: 'Aug', value: 35, highlight: false },
    { month: 'Sep', value: 70, highlight: false },
    { month: 'Oct', value: 95, highlight: true },
  ],
  tickets: 3,
  csat: 4.8,
};