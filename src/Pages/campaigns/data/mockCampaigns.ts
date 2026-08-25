import type { Campaign } from '../types';

export const initialMockCampaigns: Campaign[] = [
  {
    id: 'camp-1',
    name: 'New Lead Follow-up',
    channels: ['WhatsApp', 'Call'],
    audienceCount: 124,
    audienceLabel: '124 leads',
    status: 'Active',
    createdAt: '2026-08-20',
  },
  {
    id: 'camp-2',
    name: 'Course Enquiry',
    channels: ['WhatsApp'],
    audienceCount: 86,
    audienceLabel: '86 leads',
    status: 'Scheduled',
    createdAt: '2026-08-22',
    scheduledFor: '2026-08-28 10:00 AM',
  },
  {
    id: 'camp-3',
    name: 'Re-engagement',
    channels: ['Call'],
    audienceCount: 52,
    audienceLabel: '52 leads',
    status: 'Completed',
    createdAt: '2026-08-15',
  },
];
