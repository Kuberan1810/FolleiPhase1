import React from 'react';
import { Phone, Plus } from 'lucide-react';

interface Activity {
  title: string;
  time: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconBg: string;
  priority: string;
  priorityColor: string;
  priorityBg: string;
}

const UpcomingActivitiesCard: React.FC = () => {
  const activities: Activity[] = [
    {
      title: 'Renewal Discussion',
      time: 'Today • 4:00 PM',
      icon: Phone,
      iconColor: 'text-[#004370]',
      iconBg: 'bg-[#DBEAFE]',
      priority: 'high priority',
      priorityColor: 'text-[#22C55E]',
      priorityBg: 'bg-[#22C55E]/10'
    }
  ];

  return (
    <div className="bg-white border border-[#EDF3FD] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(237,243,253,0.25)] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[14px] font-bold text-[#0D1C2E] uppercase tracking-wider">Upcoming Activities</h3>
        <button className="flex items-center gap-1 text-[12px] font-bold text-[#004370] cursor-pointer">
          <Plus className="w-3.5 h-3.5" />
          <span>Add Activity</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {activities.map((activity, index) => {
          const IconComponent = activity.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-[12px]"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full ${activity.iconBg} ${activity.iconColor} flex items-center justify-center shrink-0`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-[#1E293B]">{activity.title}</span>
                  <span className="text-[11px] text-[#64748B] mt-0.5">{activity.time}</span>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 rounded-[6px] text-[10px] font-bold ${activity.priorityBg} ${activity.priorityColor} uppercase tracking-wider shrink-0`}>
                {activity.priority}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingActivitiesCard;
