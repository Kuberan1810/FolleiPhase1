import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Activity, AlertCircleIcon } from 'lucide-react';

const SupportTicketsPage: React.FC = () => {
  const navigate = useNavigate();

  const tickets = [
    {
      id: 'TK-8890',
      title: 'Integration Setup Issue',
      time: 'New • 2h ago',
      priority: 'Critical',
      color: 'text-[#B91C1C]',
      bg: 'bg-[#FEF2F2]',
      icon: AlertCircleIcon,
      iconColor: 'text-[#131B2E]',
    },
    {
      id: 'TK-8891',
      title: 'Reporting Config Request',
      time: 'In progress • 1d ago',
      priority: 'Low',
      color: 'text-[#02882C]',
      bg: 'bg-[#F0FFF5]',
      icon: FileText,
      iconColor: 'text-[#767587]',
    },
    {
      id: 'TK-8892',
      title: 'API Support Query',
      time: 'In progress • 3d ago',
      priority: 'Low',
      color: 'text-[#02882C]',
      bg: 'bg-[#F0FFF5]',
      icon: Activity,
      iconColor: 'text-[#767587]',
    },
    {
      id: 'TK-1042',
      title: 'Reporting Config Request',
      time: 'Ticket #1042 • 10 d ago',
      priority: 'Resolved',
      color: 'text-[#767587]',
      bg: 'bg-[#F8FAFC]',
      icon: FileText,
      iconColor: 'text-[#767587]',
    },
    {
      id: 'TK-0842',
      title: 'API Support Query',
      time: 'Ticket #0842 • 30d ago',
      priority: 'Resolved',
      color: 'text-[#767587]',
      bg: 'bg-[#F8FAFC]',
      icon: Activity,
      iconColor: 'text-[#767587]',
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full font-manrope">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1.5 hover:bg-[#F1F5F9] rounded-full text-[#464555] transition-colors cursor-pointer"
            aria-label="Go Back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[24px] font-bold text-[#0D1C2E]">Support & Tickets</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-[#464555] font-semibold">
            <span className="font-extrabold text-[#131B2E]">3</span> Open
          </span>
          <span className="text-[14px] text-[#464555] font-semibold">
            <span className="font-extrabold text-[#131B2E]">2</span> Resolved
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {tickets.map((t, i) => {
          const IconComponent = t.icon;
          return (
            <div
              key={i}
              onClick={() => {
                const { icon, ...serializableTicket } = t;
                navigate(`/postsales/customers/profile/support-tickets/${t.id}`, { state: { ticket: serializableTicket } });
              }}
              className="flex items-center justify-between p-4 bg-transparent border border-[#F3F4FC] rounded-[12px] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${t.iconColor} flex items-center justify-center shrink-0`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0 gap-0.5">
                  <span className="text-[15px] font-bold text-[#131B2E] truncate">{t.title}</span>
                  <span className="text-[13px] text-[#767587] font-medium truncate">
                    {t.time}
                  </span>
                </div>
              </div>

              <span className={`px-3 py-1 font-bold rounded-[8px] text-[13px] ${t.bg} ${t.color} shrink-0`}>
                {t.priority}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SupportTicketsPage;
