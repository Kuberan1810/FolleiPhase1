import React, { useState } from 'react';
import {
  PhoneForwarded,
  ShieldAlert,
  FileText,
  Play,
  SendHorizontal,
  MessageSquare,
  Download,
  Eye,
  MousePointer2,
  Clock
} from 'lucide-react';
import ResolveComplaintModal from './ResolveComplaintModal';

export interface Activity {
  id: number;
  type: string;
  title: string;
  subtitle: string;
  content: string;
  badge?: string;
  badgeColor?: string;
  action?: string;
  icon: React.ReactNode;
  iconBg: string;
  hasAudio?: boolean;
  attachments?: string[];
  stats?: {
    opened: string;
    clicked: string;
  };
}

const CustomerActivity: React.FC<{ activeTab: string }> = ({ activeTab }) => {
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  const activities: Activity[] = [
    {
      id: 1,
      type: 'complaint',
      title: 'Customer Complaint: Billing Discrepancy',
      subtitle: 'Added by Alex • Raised 2 hours ago',
      content: 'Customer reported a double charge for the month of February on their Enterprise subscription. They are requesting an immediate refund and an explanation of the automated billing logic error.',
      badge: 'HIGH PRIORITY',
      badgeColor: 'text-[#BA1A1A] bg-[#BA1A1A1A]',
      action: 'Resolve Now',
      icon: <ShieldAlert className="w-5 h-5 text-[#BA1A1A]" />,
      iconBg: 'bg-[#FFEBEB]'
    },
    {
      id: 2,
      type: 'note',
      title: 'Internal Strategy Note',
      subtitle: 'Added by Alex • 2 hours ago',
      content: '“Alex is very focused on operational efficiency for their APAC expansion. Mention the new automated routing features in our next call. They are comparing us with 2 other vendors but we have the advantage on regional data compliance.”',
      icon: <FileText className="w-5 h-5 text-amber-500" />,
      iconBg: 'bg-amber-50'
    },
    {
      id: 3,
      type: 'call',
      title: 'Outbound Call: Discovery Session',
      subtitle: 'Duration: 12m 45s • Yesterday at 2:15 PM',
      content: 'Discussed current pain points regarding scale. The prospect was highly engaged during the live demo of the automation engine. Scheduled a follow-up with their technical architect.',
      badge: 'CONNECTED',
      badgeColor: 'text-[#15803D] bg-[#DCFCE7]',
      icon: <PhoneForwarded className="w-5 h-5 text-[#15803D]" />,
      iconBg: 'bg-[#F0FDF4]',
      hasAudio: true
    },
    {
      id: 4,
      type: 'email',
      title: 'Email Sent: Enterprise Proposal V2',
      subtitle: 'Feb 21, 2026 at 10:30 AM',
      content: 'Hi Alex, as promised, attached is the revised proposal reflecting the 20% growth margin we discussed yesterday. Let me know if you have any questions before our sync on Friday.',
      icon: <SendHorizontal className="w-5 h-5 text-[#004370]" />,
      iconBg: 'bg-indigo-50',
      stats: { opened: 'OPENED 2X', clicked: '1 CLICK' },
      attachments: ['CloudScale_Proposal_V2.pdf (1.2MB)']
    },
    {
      id: 5,
      type: 'message',
      title: 'Message Sent',
      subtitle: '3 days ago',
      content: 'Congratulated Alex on their recent \'Tech Innovator\' award. They responded within 10 minutes thanking us and mentioning they\'d seen our recent blog post.',
      icon: <MessageSquare className="w-5 h-5 text-[#0284C7]" />,
      iconBg: 'bg-[#F0F9FF]'
    },
    {
      id: 6,
      type: 'cadence-start',
      title: 'Cadence Started: Enterprise Expansion',
      subtitle: '3 days ago',
      content: 'Lead was automatically added to the Enterprise Expansion Q4 cadence by Sales Admin based on \'High Intent\' scoring.',
      icon: <Clock className="w-5 h-5 text-slate-400" />,
      iconBg: 'bg-slate-50'
    }
  ];

  // Simple filter logic for demonstration
  const filteredActivities = activities.filter(act => {
    if (activeTab === 'All Activity') return true;
    if (activeTab === 'Emails') return act.type === 'email';
    if (activeTab === 'Calls') return act.type === 'call';
    if (activeTab === 'Notes') return act.type === 'note';
    return true;
  });

  return (
    <div className="flex flex-col gap-0 relative">
      {/* Vertical Line */}
      <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-100"></div>

      {filteredActivities.map((act) => (
        <div key={act.id} className="flex gap-6 mb-8 group last:mb-0">
          {/* Timeline Icon */}
          <div className={`w-10 h-10 rounded-[12px] ${act.iconBg} flex items-center justify-center shrink-0 border-2 border-white ring-4 ring-[#F8FAFC] relative z-10 transition-transform duration-300`}>
            {act.icon}
          </div>

          {/* Activity Card */}
          <div className={`flex-1 min-w-0 rounded-[18px] p-4 sm:p-5 border transition-all duration-300 ${act.type === 'complaint'
            ? 'bg-[#FFF8F8] border-[#FFC6C6]'
            : 'bg-white border-slate-200'
            }`}>
            <div className="flex flex-wrap justify-between items-start gap-3 mb-4">
              <div className={(act.type === 'message' || act.type === 'cadence-start') ? 'flex flex-wrap items-center gap-x-2 gap-y-1' : ''}>
                <h3 className="text-[14px] font-bold text-[#0F172A] leading-[20px] mb-0.5">{act.title}</h3>
                <p className="text-[12px] font-normal text-[#64748B] leading-[18px]">
                  {(act.type === 'message' || act.type === 'cadence-start') && <span className="mr-1 hidden sm:inline">•</span>}
                  {act.subtitle}
                </p>
              </div>
              <div className="flex gap-2 items-start">
                {act.badge && (
                  <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-[-0.25px] leading-[15px] ${act.badge === 'HIGH PRIORITY' ? 'text-[#E20400] bg-[#E204001A]' : act.badgeColor
                    }`}>
                    {act.badge}
                  </span>
                )}
                {act.stats && (
                  <div className="flex gap-[6px]">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#004370] bg-[#EEF2FF] px-2 py-[2px] rounded-[2px] uppercase tracking-[-0.25px] leading-[15px] whitespace-nowrap">
                      <Eye className="w-4 h-4" /> {act.stats.opened}
                    </span>
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-[#004370] bg-[#EEF2FF] px-2 py-[2px] rounded-[2px] uppercase tracking-[-0.25px] leading-[15px] whitespace-nowrap">
                      <MousePointer2 className="w-4 h-4" /> {act.stats.clicked}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {act.type === 'note' ? (
              <div className="bg-[#FFFBEB]/50 border-l-4 border-[#FBBF24] p-3 rounded-r-[12px] mb-6">
                <p className="text-[13px] leading-[21.13px] text-[#334155] font-normal">{act.content}</p>
              </div>
            ) : (
              <p className="text-[13px] leading-[21.13px] text-[#334155] mb-6 font-normal">{act.content}</p>
            )}

            {act.hasAudio && (
              <div className="bg-slate-50 rounded-xl px-5 py-3 flex items-center gap-4 border border-slate-100 mb-6 overflow-hidden">
                <button className="w-10 h-10 rounded-full bg-[#15803D] flex items-center justify-center text-white shadow-lg transition-transform cursor-pointer hover:scale-105 active:scale-95">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </button>
                <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-hidden">
                  <div className="flex items-end gap-1 h-6 overflow-hidden">
                    {[18, 24, 20, 16, 12, 14, 20, 24, 18, 14, 12, 12, 16, 24, 18, 12, 14, 20, 24, 16, 12, 18, 22, 24, 20, 16, 14, 18, 24, 20, 16, 12, 14, 20, 24, 18, 14, 12, 16, 20, 24, 18, 14, 12, 18, 22, 24, 20, 16, 14, 12, 16, 20, 24, 18, 14, 12, 18, 22, 24, 20, 16, 14, 12, 18, 24, 20, 16, 12, 14, 20, 24, 18, 14, 12, 12, 16, 24, 18, 12, 14, 20, 24, 16, 12, 18, 22, 24, 20, 16, 14, 18, 24, 20, 16, 12, 14, 20, 24, 18, 14, 12, 16, 20, 24, 18, 14, 12, 18, 22, 24, 20, 16, 14, 12, 16, 20, 24, 18, 14, 12, 18, 22, 24, 20, 16, 14, 12].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 shrink-0 rounded-full"
                        style={{
                          height: `${h}px`,
                          backgroundColor: '#10B981',
                          opacity: i % 3 === 0 ? 1 : 0.4
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>00:00</span>
                    <span>02:45</span>
                  </div>
                </div>
                <button className="p-2 text-slate-400 transition-colors cursor-pointer hover:text-slate-600 active:scale-90">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            )}

            {act.attachments && (
              <div className="flex flex-wrap gap-2 mb-4">
                {act.attachments.map(att => (
                  <div key={att} className="text-[12px] font-normal text-[#475569]">
                    Attached: <span className="font-medium text-[13px] text-[#004370] leading-none cursor-pointer hover:underline transition-all">{att}</span>
                  </div>
                ))}
              </div>
            )}

            {act.action && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    if (act.action === 'Resolve Now') {
                      setIsResolveModalOpen(true);
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#BA1A1A] text-white text-[13px] font-bold transition-all cursor-pointer hover:bg-[#A61717] active:scale-95"
                >
                  {act.action}
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <ResolveComplaintModal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
      />
    </div>
  );
};

export default CustomerActivity;
