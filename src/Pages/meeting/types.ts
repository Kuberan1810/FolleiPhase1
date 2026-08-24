export type MeetingStatus = 'Upcoming' | 'Completed' | 'Cancelled';

export interface MeetingLead {
  name: string;
  email?: string;
  avatarUrl?: string;
  initials?: string;
  bgColor?: string;
  textColor?: string;
}

export interface Meeting {
  id: string;
  date: string; // e.g. '24 Aug, 2026'
  time: string; // e.g. '10:30 AM'
  lead: MeetingLead;
  status: MeetingStatus;
  notes?: string;
}

export type DateFilterOption = 'all' | 'upcoming' | 'completed' | 'today';
