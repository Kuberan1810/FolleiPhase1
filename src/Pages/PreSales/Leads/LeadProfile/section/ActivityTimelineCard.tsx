import React from 'react';
import { MessageCircle, Eye, Download } from 'lucide-react';

const ActivityTimelineCard = () => {
  const activities = [
    { 
      icon: MessageCircle, 
      iconColor: 'text-green-500', 
      iconBg: 'bg-green-50',
      title: 'WhatsApp replied',
      time: '2 mins ago',
      desc: '"Yes, I\'d like to know more about the enterprise plan."'
    },
    { 
      icon: Eye, 
      iconColor: 'text-purple-500', 
      iconBg: 'bg-purple-50',
      title: 'Pricing page viewed',
      time: '1 hour ago',
      desc: 'Enterprise Pricing'
    },
    { 
      icon: Download, 
      iconColor: 'text-blue-500', 
      iconBg: 'bg-blue-50',
      title: 'Proposal downloaded',
      time: 'Yesterday',
      desc: 'Enterprise_Proposal.pdf'
    }
  ];

  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#EDF3FD]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[16px] font-extrabold text-[#191C1E]">Activity Timeline</h2>
        <button className="text-[12px] font-bold text-[#004370] hover:underline">View All</button>
      </div>
      
      <div className="relative pl-3">
        <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-[#EDF3FD]" />
        
        <div className="flex flex-col gap-8">
          {activities.map((act, i) => (
            <div key={i} className="flex gap-4 relative z-10">
              <div className={`w-10 h-10 rounded-full ${act.iconBg} flex items-center justify-center shrink-0`}>
                <act.icon className={`w-4 h-4 ${act.iconColor}`} />
              </div>
              <div className="flex flex-col pt-0.5 w-full">
                <div className="flex justify-between items-start mb-1">
                  <span className="text-[13px] font-bold text-[#191C1E]">{act.title}</span>
                  <span className="text-[11px] font-semibold text-[#A0B0C0]">{act.time}</span>
                </div>
                <span className="text-[13px] font-medium text-[#64748B]">{act.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default ActivityTimelineCard;
