export type LeadStatus =
  | 'New Inquiry'
  | 'Contacted'
  | 'Qualified'
  | 'Demo Scheduled'
  | 'Proposal'
  | 'Negotiation'
  | 'Converted'
  | 'Not Converted';

export type LeadScore = 'Hot' | 'Warm' | 'Cold';

export type LeadSource = 'Website' | 'Import' | 'Ads' | 'Referral';

export type DatePreset = 'Today' | 'Last 7 days' | 'Last 30 days' | 'No communication';

export interface Lead {
  id: string;
  leadNumber: number;
  name: string;
  email: string;
  initials: string;
  avatarBg?: string;
  avatarText?: string;
  date: string;
  status: LeadStatus;
  score?: LeadScore;
  source?: LeadSource;
  lastInteraction?: string;
  createdDate?: string;
}

export interface LeadFilterState {
  aiSearch: string;
  statuses: LeadStatus[];
  score: LeadScore | null;
  sources: LeadSource[];
  lastInteraction: DatePreset | null;
  createdDate: DatePreset | null;
}
