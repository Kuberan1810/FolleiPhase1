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

export interface LeadAttachment {
  id: string;
  title: string;
  sentBy: string;
  fileSize?: string;
  fileType?: string;
}

export interface LeadActivity {
  id: string;
  type?: 'whatsapp_received' | 'whatsapp_sent' | 'file_shared' | 'ai_insight' | 'call' | 'email';
  title: string;
  description: string;
  time: string;
}

export interface UpcomingMeetingInfo {
  title: string;
  time: string;
  status: string;
}

export interface CourseInterestInfo {
  mode: string;
  batch: string;
  courseName: string;
  preferredStart: string;
  courseFee: string;
}

export interface AiInsightInfo {
  summary: string;
  recommendedAction: string;
  why: string;
}

export interface LeadProfileDetail extends Lead {
  phoneNumber?: string;
  interestedCourse?: string;
  courseInterest?: CourseInterestInfo;
  aiInsight?: AiInsightInfo;
  upcomingMeeting?: UpcomingMeetingInfo;
  attachments?: LeadAttachment[];
  recentActivities?: LeadActivity[];
}

export interface LeadFilterState {
  aiSearch: string;
  statuses: LeadStatus[];
  score: LeadScore | null;
  sources: LeadSource[];
  lastInteraction: DatePreset | null;
  createdDate: DatePreset | null;
}

