export type CampaignStepId =
  | 'basics'
  | 'audience'
  | 'whatsapp'
  | 'message'
  | 'schedule'
  | 'review';

export interface CampaignStepItem {
  id: CampaignStepId;
  label: string;
  number: number;
}

export interface CampaignFormState {
  // Step 1: Basics
  campaignName: string;
  objective: string;
  customObjective: string;

  // Step 2: Audience
  audienceType: 'all' | 'custom';
  selectedStatuses: string[];
  selectedSources: string[];
  leadsCount: number;

  // Step 3: WhatsApp Number
  selectedNumber: string;

  // Step 4: Message
  messageText: string;
  mediaUrl?: string;
  mediaName?: string;
  mediaSize?: string;

  // Step 5: Schedule
  scheduleOption: 'now' | 'later';
  scheduledDate: string;
  scheduledTime: string;

  // Step Tracker
  currentStepIndex: number; // 0 to 5
  isCompleted: boolean;
}

export const CAMPAIGN_STEPS: CampaignStepItem[] = [
  { id: 'basics', label: 'Campaign Basics', number: 1 },
  { id: 'audience', label: 'Audience', number: 2 },
  { id: 'whatsapp', label: 'WhatsApp', number: 3 },
  { id: 'message', label: 'Message', number: 4 },
  { id: 'schedule', label: 'Schedule', number: 5 },
  { id: 'review', label: 'Review & Launch', number: 6 },
];

export const OBJECTIVE_OPTIONS = [
  'Generate Leads',
  'Follow Up',
  'Product Promotion',
  'Service Promotion',
  'Event',
  'Other',
];

export const AUDIENCE_STATUSES = ['New', 'Contacted', 'Qualified', 'Converted'];
export const AUDIENCE_SOURCES = ['Website', 'Referral', 'Social Media', 'Email Campaign', 'Cold Outreach'];

export const FOLLEI_NUMBERS = [
  {
    id: '+91 98765 43210',
    title: 'Follei Number 1',
    phone: '+91 98765 43210',
    badge: 'Follei',
  },
  {
    id: '+91 91234 56780',
    title: 'Follei Number 2',
    phone: '+91 91234 56780',
    badge: 'Follei',
  },
];
