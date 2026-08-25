export type CampaignStatus = 'Active' | 'Scheduled' | 'Completed' | 'Draft';

export type ChannelType = 'WhatsApp' | 'Call' | 'Email';

export interface Campaign {
  id: string;
  name: string;
  channels: ChannelType[];
  audienceCount: number;
  audienceLabel?: string;
  status: CampaignStatus;
  createdAt?: string;
  scheduledFor?: string;
  description?: string;
}

export type StatusFilterOption = 'ALL' | 'ACTIVE' | 'SCHEDULED' | 'COMPLETED';
