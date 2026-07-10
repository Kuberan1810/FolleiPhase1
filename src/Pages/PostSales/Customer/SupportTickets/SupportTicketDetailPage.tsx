import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';
import FolleiCircle from '../../../../assets/logo/follei-new.png';
import avatarImg from '../../../../assets/avatar.png'; // Fallback avatar

const SupportTicketDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // Default fallback if directly navigated
  const ticket = location.state?.ticket || {
    id: id || '#TK-8892',
    title: 'API connectivity issue',
    priority: 'Resolved',
    color: 'text-[#767587]',
    bg: 'bg-[#F8FAFC]',
  };

  return (
    <div className="flex flex-col gap-6 w-full font-manrope">
      {/* Global Header */}
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

      {/* Main Container */}
      <div className="bg-white border border-[#EDF3FD] rounded-[16px] shadow-[0_2px_12px_rgba(237,243,253,0.3)] flex flex-col overflow-hidden pb-10">

        {/* Ticket Title Bar */}
        <div className="bg-[#F8FAFC] px-6 py-4 flex items-center gap-3 border-b border-[#EDF3FD]">
          <span className="text-[15px] font-semibold text-[#767587]">#{ticket.id}</span>
          <h2 className="text-[16px] font-bold text-[#131B2E]">{ticket.title}</h2>
          <span className={`px-2.5 py-0.5 font-bold rounded-[8px] text-[13px] ml-1 ${ticket.bg} ${ticket.color}`}>
            {ticket.priority}
          </span>
        </div>

        {/* Chat Feed */}
        <div className="flex flex-col px-10 pt-8 gap-8">

          {/* Section Divider */}
          <div className="text-center w-full">
            <span className="text-[15px] font-bold text-[#464555]">Payment Gateway</span>
          </div>

          {/* Left Message (Customer) */}
          <div className="flex flex-col items-start gap-1 max-w-[80%]">
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-[#F3F0FF] text-[#6B21A8] flex items-center justify-center font-bold text-[13px] shrink-0 border border-[#E9D5FF] mt-1">
                JM
              </div>
              <div className="flex flex-col">
                <div className="bg-white border border-[#EDF3FD] shadow-sm rounded-tr-[16px] rounded-b-[16px] p-5 flex flex-col gap-4 max-w-[600px]">
                  <p className="text-[14px] text-[#131B2E] leading-relaxed">
                    We are seeing constant 503 errors when attempting to authorize payments via the API. This started about 15 minutes ago. Logs attached.
                  </p>

                  {/* Attachment Card */}
                  <div className="flex items-center gap-3 p-3 bg-[#FAFBFF] border border-[#EDF3FD] rounded-[8px] w-fit pr-8">
                    <div className="w-10 h-10 bg-[#FEF2F2] rounded-[8px] flex items-center justify-center text-[#DC2626]">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-bold text-[#131B2E]">error_log_04-20.pdf</span>
                      <span className="text-[11px] text-[#767587]">1.2 MB • PDF Document</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-[#767587] mt-1.5 self-end px-1">11:02 AM</span>
              </div>
            </div>
          </div>

          {/* Right Message 1 (System / Agent 1) */}
          <div className="flex flex-col items-end gap-1 w-full mt-2">
            <div className="flex items-start justify-end gap-4 max-w-[85%]">
              <div className="flex flex-col">
                <div className="bg-[#004370] rounded-tl-[16px] rounded-b-[16px] p-5 flex flex-col gap-4 shadow-sm w-[750px]">
                  <p className="text-[14px] text-white leading-relaxed font-light">
                    Hello James, I've completed the initial analysis of your logs and identified a cache synchronization delay. To ensure the most accurate resolution, I've handed your case over to one of our senior specialists while I continue monitoring the progress. I'll keep you updated every step of the way.
                  </p>

                  {/* Code block */}
                  <div className="bg-white rounded-[8px] p-4 text-[13px] font-mono leading-relaxed overflow-x-auto">
                    <div className="text-[#131B2E]">POST /api/v2/auth HTTP/1.1</div>
                    <div className="text-[#131B2E]">Host: api.resolutionos.io</div>
                    <div className="text-[#DC2626]">HTTP/1.1 503 Service Unavailable</div>
                    <div className="text-[#131B2E]">X-Cache-Status: EXPIRED_STALE</div>
                  </div>
                </div>
                <span className="text-[11px] text-[#767587] mt-1.5 self-end px-1">11:04 AM</span>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 bg-[#F8FAFC] border border-[#EDF3FD] flex items-center justify-center p-1.5 mt-1">
                <img src={FolleiCircle} alt="System" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Right Message 2 (Agent 2) */}
          <div className="flex flex-col items-end gap-1 w-full mt-4">
            <div className="flex items-start justify-end gap-4 max-w-[85%]">
              <div className="flex flex-col">
                <div className="bg-[#004370] rounded-tl-[16px] rounded-b-[16px] p-5 flex flex-col gap-4 shadow-sm w-[750px]">
                  <p className="text-[14px] text-white leading-relaxed font-light">
                    Hi James, I'm David, and I'll be assisting you from here. I'm currently investigating the cache nodes in the AP-South region and will provide you with an update within the next 5 minutes.
                  </p>
                </div>
                <span className="text-[11px] text-[#767587] mt-1.5 self-end px-1">11:06 AM</span>
              </div>
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 mt-1">
                <img src={avatarImg} alt="Agent" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SupportTicketDetailPage;
