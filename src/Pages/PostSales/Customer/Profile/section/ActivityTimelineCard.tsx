import React from 'react';
import { Eye, Download } from 'lucide-react';
import { Whatsapp } from 'iconsax-react';

interface Activity {
  type: string;
  title: string;
  subtext: string;
  time: string;
  icon: any;
  iconColor: string;
  iconBg: string;
}

const ActivityTimelineCard: React.FC = () => {
  const activities: Activity[] = [
    {
      type: 'whatsapp',
      title: 'WhatsApp replied',
      subtext: '"Yes, I\'d like to know more about the enterprise plan."',
      time: '2 mins ago',
      icon: Whatsapp,
      iconColor: '#18b247ff',
      iconBg: 'bg-[#EAF8EE]'
    },
    {
      type: 'pageview',
      title: 'Pricing page viewed',
      subtext: 'Enterprise Pricing',
      time: '1 hour ago',
      icon: Eye,
      iconColor: 'text-[#8B5CF6]',
      iconBg: 'bg-[#F5F3FF]'
    },
    {
      type: 'download',
      title: 'Proposal downloaded',
      subtext: 'Enterprise_Proposal.pdf',
      time: 'Yesterday',
      icon: Download,
      iconColor: 'text-[#3B82F6]',
      iconBg: 'bg-[#EFF6FF]'
    }
  ];

  return (
    <div className="bg-white border border-[#EEF0FF] rounded-[20px] p-6 shadow-[0_4px_20px_rgba(237,243,253,0.25)] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[16px] font-bold text-[#0D1C2E]">Activity Timeline</h3>
        <button className="text-[12px] font-bold text-[#004370] cursor-pointer hover:underline">
          View All
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {activities.map((act, i) => {
          const IconComponent = act.icon;
          return (
            <div
              key={i}
              className="flex items-start justify-between p-3 w-full"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 rounded-full ${act.iconBg} flex items-center justify-center shrink-0`}
                >

                  <IconComponent className={`w-4.5 h-4.5 ${act.iconColor}`} color="currentcolor" />

                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-bold text-[#1E293B]">
                    {act.title}
                  </span>
                  <span className="text-[12px] text-[#64748B] mt-0.5">
                    {act.subtext}
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#94A3B8] shrink-0 self-start mt-1">
                {act.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimelineCard;
