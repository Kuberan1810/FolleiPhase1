import type { LogItem } from './types';

export const mockLogs: LogItem[] = [
  {
    id: '1',
    type: 'call',
    title: 'Call Completed',
    time: '4 hours ago',
    duration: '20 minutes'
  },
  {
    id: '2',
    type: 'email',
    title: 'Opened email',
    time: '4 hours ago',
    badge: '1 CLICK',
    details: 'File:CloudScale_Proposal_V2.pdf (1.2MB)'
  },
  {
    id: '3',
    type: 'email',
    title: 'Email Sent',
    time: '4 hours ago',
    details: 'Hi Alex, as promised, attached is the revised proposal reflecting the 20% growth margin we discussed yesterday. Let me know if you have any questions before our sync on Friday.',
    attachedFile: {
      name: 'CloudScale_Proposal_V2.pdf',
      size: '1.2MB'
    }
  },
  {
    id: '4',
    type: 'note',
    title: 'Message Sent',
    time: '4 hours ago',
    details: "Congratulated Alex on their recent 'Tech Innovator' award. They responded within 10 minutes t..."
  },
  {
    id: '5',
    type: 'note',
    title: 'Submitted contact form',
    time: '2 days ago',
    details: 'Initial inquiry regarding CRM automation.'
  },
  {
    id: '6',
    type: 'web',
    title: 'Visited homepage',
    time: '2 days ago',
    details: 'Source: Organic Google Search'
  }
];