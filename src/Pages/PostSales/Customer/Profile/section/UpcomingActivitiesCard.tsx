import { Phone } from 'lucide-react';

const activities = [
  {
    id: 1,
    title: 'Renewal Discussion',
    time: 'Today • 4:00 PM',
    icon: Phone,
    iconBg: 'bg-[#EAF2FF]',
    iconColor: 'text-[#004370]',
    iconFill: '#004370',
    badge: { text: 'High Priority', bg: 'bg-[#22C55E10]', color: 'text-[#22C55E]' }
  },

];

const UpcomingActivitiesCard = () => {
  return (
    <div className="BoxStyle">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-[20px] font-bold text-[#1E293B]">Upcoming Activities</h2>
        <button className="text-[16px] font-semibold text-[#004370] hover:underline duration-300 cursor-pointer">+ Add Activity</button>
      </div>
      <div className="flex flex-col gap-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-center justify-between bg-[#F8FAFC] rounded-[16px] p-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[16px] font-bold text-[#1E293B] mb-0.5">{activity.title}</span>
                  <span className="text-[14px] font-medium text-[#64748B]">{activity.time}</span>
                </div>
              </div>
              {activity.badge && (
                <span className={`${activity.badge.bg} ${activity.badge.color} text-[12px] font-medium px-2.5 py-1 rounded-md`}>
                  {activity.badge.text}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default UpcomingActivitiesCard;
