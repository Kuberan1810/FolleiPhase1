import { useState } from 'react';
import { Phone, Presentation } from 'lucide-react';
import AddActivityModal from './AddActivityModal';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';

const initialActivities = [
  {
    id: 1,
    title: 'Renewal Discussion',
    time: 'Today – 4:00 PM',
    icon: Phone,
    iconBg: 'bg-[#EAF2FF]',
    iconColor: 'text-[#004370]',
    iconFill: '#004370',
    badge: { text: 'High Priority', bg: 'bg-[#22C55E10]', color: 'text-[#22C55E]' }
  },
];

const UpcomingActivitiesCard = () => {
  const [activities, setActivities] = useState(initialActivities);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddActivity = (newAct: {
    title: string;
    date: string;
    time: string;
    priority: "High" | "Medium" | "Low";
  }) => {
    let Icon = Phone;
    let iconBg = 'bg-[#EAF2FF]';
    let iconColor = 'text-[#004370]';
    
    if (
      newAct.title.toLowerCase().includes("demo") ||
      newAct.title.toLowerCase().includes("product") ||
      newAct.title.toLowerCase().includes("presentation")
    ) {
      Icon = Presentation;
      iconBg = 'bg-purple-100';
      iconColor = 'text-purple-600';
    }

    const newActivity = {
      id: activities.length + 1,
      title: newAct.title,
      time: `${newAct.date} • ${newAct.time}`,
      icon: Icon,
      iconBg,
      iconColor,
      iconFill: '#004370',
      badge: newAct.priority === "High" ? { text: 'High Priority', bg: 'bg-[#22C55E10]', color: 'text-[#22C55E]' } : undefined
    };

    setActivities([newActivity, ...activities]);
  };

  return (
    <div className="BoxStyle">
      <div className="flex items-center justify-between gap-2 mb-7">
        <h2 className="text-[13px] sm:text-[20px] font-bold text-[#1E293B] whitespace-nowrap">Upcoming Activities</h2>
        <BtnComSecondary 
          label="+ Add Activity"
          onClick={() => setIsModalOpen(true)}
          className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-[14px] whitespace-nowrap shrink-0"
        />
      </div>
      <div className="flex flex-col gap-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#F8FAFC] rounded-[16px] p-4 gap-3 sm:gap-4">
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${activity.iconColor}`} />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[15px] sm:text-[16px] font-bold text-[#1E293B] mb-0.5">{activity.title}</span>
                  <span className="text-[12px] sm:text-[14px] font-medium text-[#64748B]">{activity.time}</span>
                </div>
              </div>
              {activity.badge && (
                <span className={`${activity.badge.bg} ${activity.badge.color} text-[11px] sm:text-[12px] font-medium px-2.5 py-1 rounded-md self-start sm:self-auto whitespace-nowrap shrink-0`}>
                  {activity.badge.text}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <AddActivityModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleAddActivity} 
      />
    </div>
  )
}

export default UpcomingActivitiesCard;
