import React, { useState } from 'react';
import { Clock, Paperclip, Send, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { type Ticket } from './TicketTable';
import FolleiCircle from '../../../../assets/logo/FolleiCircle.svg';

interface TicketDetailProps {
  ticket: Ticket;
  onBack: () => void;
}

export const TicketDetail: React.FC<TicketDetailProps> = ({ ticket, onBack }) => {
  const firstName = ticket.customerName.split(' ')[0];

  const [messages, setMessages] = useState<any[]>([
    {
      id: 1,
      sender: 'customer',
      senderName: ticket.customerName,
      senderInitials: ticket.customerInitials,
      text: 'We are seeing constant 503 errors when attempting to authorize payments via the API. This started about 15 minutes ago. Logs attached.',
      time: '11:02 AM',
      attachment: {
        name: 'error_log_04-20.pdf',
        size: '1.2 MB • PDF Document'
      }
    },
    {
      id: 2,
      sender: 'agent',
      senderName: 'David (Agent)',
      senderInitials: 'D',
      text: `Hello ${firstName}, I've completed the initial analysis of your logs and identified a cache synchronization delay. To ensure the most accurate resolution, I've handed your case over to one of our senior specialists while I continue monitoring the progress. I'll keep you updated every step of the way.`,
      time: '11:04 AM',
      codeSnippet: `POST /api/v2/auth HTTP/1.1
Host: api.resolutions.io
HTTP/1.1 503 Service Unavailable
X-Cache-Status: EXPIRED_STALE`
    },
    {
      id: 3,
      sender: 'specialist',
      senderName: 'David (Specialist)',
      senderInitials: 'DS',
      text: `Hi ${firstName}, I'm David, and I'll be assisting you from here. I'm currently investigating the cache nodes in the AP-South region and will provide you with an update within the next 5 minutes.`,
      time: '11:06 AM'
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const timeString = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    setMessages([
      ...messages,
      {
        id: Date.now(),
        sender: 'specialist',
        senderName: 'David (Specialist)',
        senderInitials: 'DS',
        text: inputMessage,
        time: timeString
      }
    ]);
    setInputMessage('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-140px)]">
      <div className="flex justify-between items-center bg-transparent py-4 mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
          >
            <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
          </button>

          <div
            className="w-[45px] h-[45px] rounded-full flex items-center justify-center font-medium text-[17px] shrink-0 bg-[#F4F3FF] text-[#07006C]"
          >
            {ticket.customerInitials}
          </div>

          <div className="flex flex-col">
            <span className="font-semibold text-[20px] text-[#111827] leading-tight">
              {ticket.customerName}
            </span>
            <span className="text-[12px] text-[#6B7280] font-bold ">
              Company name <span className="text-[#4648D4] font-semibold pl-1">Enterprise Plus</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-[32px] h-[32px] rounded-full bg-[#2E3192] flex items-center justify-center text-white font-semibold text-[10px]">
            AI
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#F3F4FC] rounded-[20px] p-[4px] shadow-[0_4px_20px_rgba(237,243,253,0.25)] flex flex-col flex-1 overflow-hidden">
        <div className="px-6 py-4 flex flex-col rounded-[15px] sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#F7F8FF]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-[14px] font-medium text-[#464555]">#{ticket.id}</span>
              <h2 className="text-[18px] font-semibold text-[#111827]">{ticket.subject}</h2>
              <span
                className="text-[14px] font-bold px-2 py-0.5 rounded-[6px] bg-[#FFF6F6] text-[#B91C1C]"
              >
                {ticket.priority}
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="text-[14px] font-semibold text-[#F6810C]">
                {ticket.status}
              </span>
              {ticket.status === 'In Progress' && (
                <div className="flex items-center gap-1 text-[#BA1A1A]">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[12px] text-[#000000] ">Breach Risk 12m remaining</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-1.5">
            <span className="text-[10px] font-bold text-[#777683] uppercase tracking-wide">
              Open Tickets
            </span>
            <div className="flex items-center gap-3.5">
              <button className="w-7 h-7 flex items-center justify-center text-[#767587] bg-white rounded-full cursor-pointer transition-colors">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-[14px] font-bold text-[#111827]">2</span>
              <button className="w-7 h-7 flex items-center justify-center text-[#767587] bg-white rounded-full cursor-pointer transition-colors">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center my-5 text-[#464555] font-semibold text-[16px]">
          Payment Gateway
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-24 flex flex-col gap-6 max-h-[500px]">
          {messages.map((msg) => {
            const isCustomer = msg.sender === 'customer';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[70%] ${isCustomer ? 'self-start items-start' : 'self-end flex-row-reverse items-start'
                  }`}
              >
                <div className="w-[32px] h-[32px] rounded-full overflow-hidden flex items-center justify-center font-bold text-[12px] shrink-0 bg-white">
                  {isCustomer ? (
                    <div className="w-full h-full bg-[#F4F3FF] text-[#07006C] flex items-center justify-center font-medium">
                      {msg.senderInitials}
                    </div>
                  ) : msg.sender === 'agent' ? (
                    <img src={FolleiCircle} alt="Agent" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-[#F4F3FF] text-[#07006C] flex items-center justify-center font-bold">
                      {msg.senderInitials}
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1 max-w-[85%]">
                  <div
                    className={`rounded-[24px] p-4 text-[14px] leading-relaxed  ${isCustomer
                      ? 'bg-[#FCFCFC] text-[#191C1E] border border-[#E2EBF8] rounded-tl-none'
                      : msg.sender === 'agent'
                        ? 'bg-[#004370] text-white rounded-tr-none'
                        : 'bg-[#004370] text-white rounded-tr-none'
                      }`}
                  >
                    {msg.text}

                    {msg.attachment && (
                      <div className="mt-3 flex items-center gap-3 border border-[#F3F4FC] bg-white p-3 rounded-[16px] cursor-pointer">
                        <div className="w-10 h-10 bg-[#FEF2F2] text-[#EF4444] rounded-[10px] flex items-center justify-center shrink-0">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#191C1E] text-[12px]">
                            {msg.attachment.name}
                          </span>
                          <span className="text-[10px] text-[#777683] mt-0.5">
                            {msg.attachment.size}
                          </span>
                        </div>
                      </div>
                    )}

                    {msg.codeSnippet && (
                      <pre className="mt-3 bg-white text-[#0B1C30] text-[12px] font-mono p-4 rounded-[16px]  leading-normal ">
                        <div>POST /api/v2/auth HTTP/1.1</div>
                        <div>Host: api.resolutions.io</div>
                        <div className="text-[#BA1A1A]">HTTP/1.1 503 Service Unavailable</div>
                        <div>X-Cache-Status: EXPIRED_STALE</div>
                      </pre>
                    )}
                  </div>

                  <span className="text-[10px] text-[#777683] font-medium self-end mt-1 pr-1">
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white px-6 py-4 flex items-center gap-3">
          <button className="p-3 rounded-[8px] text-[#333333] bg-[#F1F6FF] cursor-pointer shrink-0">
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative flex items-center">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full bg-white border border-[#F3F4FC] rounded-[12px] px-4 py-2.5 text-[14px] placeholder:text-slate-400 focus:outline-none focus:border-[#F3F4FC] transition-colors"
            />
            <button
              onClick={handleSendMessage}
              className="absolute right-2 p-1.5 bg-[#004370] text-white rounded-[12px] transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
