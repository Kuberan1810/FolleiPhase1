import { useState } from 'react';
import { Phone, Presentation } from 'lucide-react';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';
import AddActivityModal from './AddActivityModal';

interface ActivityItem {
  id: number;
  title: string;
  time: string;
  icon: React.ComponentType<any>;
  iconBg: string;
  iconColor: string;
  badge?: { text: string; bg: string; color: string };
}

const UpcomingActivitiesCard = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: 1,
      title: 'Follow-up Call',
      time: 'Today • 4:00 PM',
      icon: Phone,
      iconBg: 'bg-[#EAF2FF]',
      iconColor: 'text-[#004370]',
      badge: { text: 'High Priority', bg: 'bg-[#22C55E10]', color: 'text-[#22C55E]' }
    },
    {
      id: 2,
      title: 'Product Demo',
      time: 'Tomorrow • 11:00 AM',
      icon: Presentation,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveActivity = (newAct: {
    title: string;
    date: string;
    time: string;
    priority: "High" | "Medium" | "Low";
  }) => {
    // Choose icon based on activity title
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

    setActivities((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title: newAct.title,
        time: `${newAct.date} • ${newAct.time}`,
        icon: Icon,
        iconBg,
        iconColor,
        badge: newAct.priority === "High" ? { text: 'High Priority', bg: 'bg-[#22C55E10]', color: 'text-[#22C55E]' } : undefined
      }
    ]);
  };

  return (
    <div className="BoxStyle">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-[20px] font-bold text-[#1E293B]">Upcoming Activities</h2>
        <BtnComSecondary
          label="+ Add Activity"
          onClick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="flex flex-col gap-3">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-center justify-between bg-[#F8FAFC] rounded-[16px] p-4">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-4 h-4 ${activity.iconColor}`}  />
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

      <AddActivityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveActivity}
      />
    </div>
  );
};

export default UpcomingActivitiesCard;
