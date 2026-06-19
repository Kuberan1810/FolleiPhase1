import React, { useState } from "react";
import { Play, X } from "lucide-react";
import BtnComSecondary from "../../../../Component/BtnComSecondary";
import { useNavigate } from "react-router-dom";
// import { Play } from "iconsax-react";

interface HandleItem {
  id: string;
  name: string;
  type: string;
}

interface MessageItem {
  sender: 'handle' | 'follei';
  text?: string;
  time: string;
  isAudio?: boolean;
  duration?: string;
}

const CHAT_HISTORY: Record<string, MessageItem[]> = {
  "1": [
    { sender: 'handle', text: 'Hi, I saw your website and wanted to know more about your AI-powered sales assistant.', time: '10:20 AM' },
    { sender: 'follei', text: 'Sure! Follei helps businesses automate lead qualification, follow-ups, and customer engagement through AI conversations.', time: '10:20 AM' },
    { sender: 'handle', text: 'Sounds good. Does it integrate with WhatsApp?', time: '10:20 AM' },
    { sender: 'follei', text: 'Yes, it integrates directly with WhatsApp and can handle customer inquiries automatically while escalating important conversations to your team.', time: '10:20 AM' },
    { sender: 'handle', text: "That's exactly what we're looking for. Can you explain the pricing?", time: '10:20 AM' },
    { sender: 'handle', isAudio: true, duration: '02:45', time: '10:20 AM' }
  ],
  "2": [
    { sender: 'handle', text: 'Is there a free trial for the premium features?', time: '11:15 AM' },
    { sender: 'follei', text: 'Yes! We offer a 14-day free trial with full access to all AI intelligence features. No credit card is required to sign up.', time: '11:16 AM' }
  ],
  "3": [
    { sender: 'handle', text: 'Hey, I wanted to set up a custom integration with our CRM. How can we do that?', time: '02:30 PM' },
    { sender: 'follei', text: 'We support custom CRM integrations via our REST API and pre-built connectors for Salesforce, HubSpot, and Zoho.', time: '02:32 PM' }
  ],
  "4": [
    { sender: 'handle', text: 'What is the pricing model for enterprise users?', time: '04:45 PM' },
    { sender: 'follei', text: 'Enterprise pricing is custom-tailored based on volume, custom model training needs, and dedicated support requirements. I can schedule a demo with our sales executive to discuss details.', time: '04:47 PM' }
  ]
};

const HandlesSection: React.FC = () => {
  const [adminHandles] = useState<HandleItem[]>([
    { id: "1", name: "Raleni", type: "Enquiry" },
    { id: "2", name: "Venilax", type: "Enquiry" },
    { id: "3", name: "roxaze", type: "Enquiry" },
    { id: "4", name: "Kineemay", type: "Enquiry" },
  ]);

  const navigate = useNavigate();
  // const [expanded, setExpanded] = useState(false);
  const [selectedHandle, setSelectedHandle] = useState<HandleItem | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenHistory = (handle: HandleItem) => {
    setSelectedHandle(handle);
    setIsDrawerOpen(true);
  };

  const handleCloseHistory = () => {
    setIsDrawerOpen(false);
  };

  const radius = 80;
  const strokeWidth = 25;
  const circumference = Math.PI * radius;
  const percentage = 92;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 w-full relative">
      <div
        className="BoxStyle shadow-xs border border-[#EEF2F5] flex flex-col items-center justify-between min-h-[400px]"
        style={{ backgroundColor: '#F6FBFF' }}
      >
        <div className="w-full text-left">
          <h3 className=" font-semibold text-[24px] text-[#191C1E]">
            Follei Handles
          </h3>
        </div>

        <div className="relative flex flex-col items-center justify-center mt-6 select-none w-full">
          <svg className="w-full max-w-[406px] h-auto" viewBox="0 0 200 115">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#004370"
              strokeWidth={strokeWidth}
              strokeDasharray={`0, ${(percentage / 100) * circumference}, ${((100 - percentage) / 100) * circumference}, ${circumference}`}
              strokeDashoffset={0}
            />
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#DFF2FE"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute bottom-[10px] sm:bottom-[15px] flex flex-col items-center justify-center">
            <span className="text-[46px] font-bold  text-[#191C1E] tracking-tight leading-none">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-2 w-full text-[14px] font-semibold tracking-wider ">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E0F2FE] shadow-[0_1px_1.8px_rgba(0,0,0,0.25)] flex-shrink-0"></div>
            <span className="text-[#64748B]">Follei handles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#004370] shadow-[0_1px_1.8px_rgba(0,0,0,0.25)] flex-shrink-0"></div>
            <span className="text-[#64748B]">Admin handles</span>
          </div>
        </div>
      </div>

      <div
        className="BoxStyle shadow-xs border border-[#EEF2F5] flex flex-col justify-between min-h-[400px]"
        style={{ backgroundColor: '#F6FBFF' }}
      >
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className=" font-semibold text-[24px] text-[#191C1E]">
              Admin Handles
            </h3>
            {/* <button
              onClick={() => navigate('/presales/inbox/admin-handles')}
              className="flex items-center gap-1 text-[#64748B]  text-[14px] font-semibold cursor-pointer transition-colors hover:text-slate-800 border-none bg-transparent"
            >
              view all
              <ChevronDown size={18} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
            </button> */}

            <BtnComSecondary
              label="View All"
              onClick={() => navigate('/presales/inbox/admin-handles')}
            />
          </div>

          <div className="flex flex-col ">
            {adminHandles.map((handle) => (
              <div
                key={handle.id}
                className="grid grid-cols-3 items-center py-4 px-2 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="font-semibold text-[18px] text-[#0D1C2E] text-left capitalize">
                  {handle.name}
                </span>

                <span className="text-[18px] font-medium text-[#434655] text-center">
                  {handle.type}
                </span>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleOpenHistory(handle)}
                    className="relative text-[#23669C] hover:text-[#194E73] text-[18px] font-medium cursor-pointer border-none bg-transparent active:scale-95 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:bg-[#194E73]"
                  >
                    History
                  </button>
                </div>
              </div>




            ))}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black/40 z-[9998] transition-opacity duration-300 ${isDrawerOpen && selectedHandle ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={handleCloseHistory}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[9999] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isDrawerOpen && selectedHandle ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {selectedHandle && (
          <>
            <div className="p-6 bg-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-linear-to-t from-[#6C86C9] to-[#0B4984] flex items-center justify-center text-white text-[20px] font-bold shrink-0">
                {selectedHandle.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className=" font-semibold md:text-[20px] text-lg text-[#0F172A] leading-snug capitalize">
                  {selectedHandle.name}
                </h3>
                <p className=" text-[14px] font-medium text-[#64748B] leading-none mt-1">
                  {selectedHandle.name === 'Raleni' ? 'Pricing enquiry' : `${selectedHandle.type} enquiry`}
                </p>
              </div>
              <div className="ml-auto">
                <button
                  onClick={handleCloseHistory}
                  className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-[#64748B] hover:text-[#0F172A]"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="w-full shadow-xs">
              <hr className="border border-[#EDF3FD] m-0" />
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-3 space-y-6 bg-slate-50/20">
              {CHAT_HISTORY[selectedHandle.id]?.map((msg, idx) => {
                const isMe = msg.sender === 'follei';
                return (
                  <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    {msg.isAudio ? (
                      <>
                        <div className="border border-[#EDF3FD] rounded-[10px] p-2.5 pl-3 pr-5 flex items-center gap-4 bg-[#F8FAFC] mt-2 select-none shadow-xs">
                          <button className="w-9 h-9 rounded-[12px] bg-[#059669] flex items-center justify-center text-white cursor-pointer hover:bg-[#059669] transition-colors border-none shrink-0 flex items-center justify-center">
                            <Play size={18} color="#fff" fill="#fff " />
                          </button>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-end gap-[3px] h-[22px] px-1">
                              {[4, 6, 3, 4, 7, 10, 8, 6, 5, 8, 11, 9, 7, 6, 4, 5, 7, 9, 6, , 5, 9, 11, 7, 9, 6, 5, 8].map((height, i) => (
                                <div
                                  key={i}
                                  className="w-[4px] rounded-full"
                                  style={{
                                    height: `${height * 1.8}px`,
                                    backgroundColor: i % 3 === 0 ? "#34D399" : i % 3 === 1 ? "#10B981" : "#6EE7B7"
                                  }}
                                />
                              ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-[#64748B] font-normal px-1">
                              <span>00:00</span>
                              <span>{msg.duration}</span>
                            </div>
                          </div>
                          <button className="text-slate-400 hover:text-slate-600 transition-colors bg-transparent border-none cursor-pointer p-1 ml-auto flex items-center justify-center">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                          </button>
                        </div>

                      </>
                    ) : (
                      <div
                        className={`shadow-sm rounded-[16px] p-[16px] text-[14px] leading-relaxed max-w-[85%] flex flex-col gap-1 
                          ${isMe
                            ? 'bg-[#004370] text-white'
                            : 'bg-[#DFF2FE] text-[#004370]'
                          }`}
                      >
                        <span>{msg.text}</span>
                        <span className={`text-[12px] font-medium font-manrope mt-1 px-1 ${isMe ? 'text-blue-100/80 self-end' : 'text-[#94A3B8] self-start'
                          }`}>
                          {msg.time}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HandlesSection;
