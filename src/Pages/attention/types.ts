export type IntentType = 'HOT' | 'WARM' | 'COLD';

export interface AttentionLead {
  id: string;
  leadNumber: number;
  name: string;
  email: string;
  initials: string;
  phone: string;
  intent: IntentType;
  avatarBg?: string;
  avatarText?: string;
}
