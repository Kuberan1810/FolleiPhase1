import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Activity, AlertCircleIcon } from 'lucide-react';

const SupportTicketsCard: React.FC = () => {
  const navigate = useNavigate();

  const tickets = [
    {
      title: 'Integration Setup Issue',
      requester: 'John Doe',
      time: '2h ago',
      priority: 'Critical',
      color: 'text-[#B91C1C]',
      bg: 'bg-[#FEF2F2]',
      icon: AlertCircleIcon,
      iconColor: 'text-[#131B2E]',
    },
    {
      title: 'Reporting Config Request',
      requester: 'Sophia Miller',
      time: '1d ago',
      priority: 'Low',
      color: 'text-[#02882C]',
      bg: 'bg-[#F0FFF5]',
      icon: FileText,
      iconColor: 'text-[#767587]',
    },
    {
      title: 'API Support Query',
      requester: 'Dev Team',
      time: '3d ago',
      priority: 'Low',
      color: 'text-[#02882C]',
      bg: 'bg-[#F0FFF5]',
      icon: Activity,
      iconColor: 'text-[#767587]',
    }
  ];

  return (
    <div className="bg-white border border-[#EDF3FD] rounded-[24px] p-6 shadow-[0_4px_20px_rgba(237,243,253,0.25)] flex flex-col gap-4">
      <div className="flex items-center justify-between gap-2 w-full">
        <h3 className="text-[14px] sm:text-[16px] font-bold text-[#0D1C2E] whitespace-nowrap">Support & Tickets</h3>
        <span className="text-[11px] sm:text-[13px] text-[#131B2E] whitespace-nowrap">3 Open • 2 Resolved</span>
      </div>

      <div className="flex flex-col gap-3">
        {tickets.map((t, i) => {
          const IconComponent = t.icon;
          return (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#F8FAFC] border border-[#F3F4FC] rounded-[8px] gap-2.5 sm:gap-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-9 h-9 ${t.iconColor} flex items-center justify-center shrink-0`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[14px] font-bold text-[#131B2E] truncate">{t.title}</span>
                  <span className="text-[12px] sm:text-[13px] text-[#464555] font-medium mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                    Requested by {t.requester} • {t.time}
                  </span>
                </div>
              </div>

              <span className={`px-2.5 py-0.5 font-medium rounded-[8px] text-[12px] sm:text-[14px] ${t.bg} ${t.color} self-start sm:self-auto shrink-0 whitespace-nowrap`}>
                {t.priority}
              </span>
            </div>
          );
        })}
      </div>

      <button 
        onClick={() => navigate('/postsales/customers/profile/support-tickets')}
        className="w-full bg-[#F8FAFC] text-[#464555] py-2 rounded-[8px] text-[13px] hover:bg-[#E2E8F0] hover:text-[#131B2E] transition-all duration-300 cursor-pointer flex items-center justify-center h-10 shadow-[0_2px_8px_rgba(237,243,253,0.15)] mt-1"
      >
        View All Tickets
      </button>
    </div>
  );
};

export default SupportTicketsCard;
