
import Leadslayout from "./section/leadslayout"

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  initials?: string;
  bgColor?: string;
  textColor?: string;
  score: number; // 0-100
  temperature: 'Hot' | 'Warm' | 'Cold';
  source: 'website' | 'campaign' | 'shield' | 'external';
  status: 'NEW INQUIRY' | 'CONTACTED' | 'QUALIFIED' | 'DEMO SCHEDULED';
  addedTime: string; // e.g. "12 Jan, 2026"
  activityTime: string; // e.g. "2 mins ago"
  activityType: 'WHATSAPP' | 'CALL LOGGED' | 'MEETING SETUP';
  company?: string;
  notes?: string;
};

const Leads = () => {
  return (
    <Leadslayout />

  )
}

export default Leads