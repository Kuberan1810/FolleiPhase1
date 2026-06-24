import React from "react";
import { Play, X } from "lucide-react";
import whatsappLogo from "../../../../assets/icons/whatsapplogoo.svg";
import gmailLogo from "../../../../assets/icons/Gmail - Email by Google.svg";
import starIcon from "../../../../assets/star-icon.svg";

const KLEN_CHAT_HISTORY = [
  { sender: 'lead', text: 'Hi, I saw your website and wanted to know more about your AI-powered sales assistant.', time: '10:20 AM', channel: 'whatsapp' },
  { sender: 'ai', text: 'Sure! Follei helps businesses automate lead qualification, follow-ups, and customer engagement through AI conversations.', time: '10:20 AM', channel: 'whatsapp' },
  { sender: 'lead', text: "I'm interested in the product. Could you arrange a demo sometime this week?", time: '10:20 AM', channel: 'gmail' },
  { sender: 'ai', text: 'Yes, it integrates directly with WhatsApp and can handle customer inquiries automatically while escalating important conversations to your team.', time: '10:20 AM', channel: 'gmail' },
  { sender: 'lead', text: 'Can you share the pricing details and available plans? I\'m looking to make a decision this week', time: '10:20 AM', channel: 'gmail' },
  { sender: 'lead', isAudio: true, duration: '02:45', time: '10:20 AM', channel: 'whatsapp' }
];

interface NeedsAttentionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any | null;
}

const NeedsAttentionDrawer: React.FC<NeedsAttentionDrawerProps> = ({
  isOpen,
  onClose,
  lead
}) => {
  return (
    <>
      {/* Drawer Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 z-[9998] transition-opacity duration-300 ${isOpen && lead ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[9999] shadow-2xl flex flex-col font-manrope transition-transform duration-300 ease-in-out ${isOpen && lead ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {lead && (
          <>
            <div className="p-6 bg-white flex flex-col gap-3.5 border-b border-[#EDF3FD]">
              <div className="flex items-center justify-between w-full">
                <h3 className="font-medium text-[20px] text-[#0F172A] leading-snug">
                  Demo Interest
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-[#64748B] hover:text-[#0F172A] shrink-0"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="bg-[#FAF5FF] p-2 rounded-[10px] w-[85%]">
                <p className="text-[14px] font-medium text-[#000000] leading-relaxed m-0">
                  "I'm interested in the product. Could you arrange a demo sometime this week?"
                </p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 bg-slate-50/20 flex flex-col">
              {KLEN_CHAT_HISTORY.map((msg, idx) => {
                const isMe = msg.sender === 'ai';
                return (
                  <div key={idx} className={`flex flex-col w-full ${isMe ? 'items-end' : 'items-start'}`}>
                    {msg.isAudio ? (
                      <div className="flex items-end gap-2.5 max-w-[85%] self-start">
                        {msg.channel === 'whatsapp' ? (
                          <img src={whatsappLogo} className="w-[18px] h-[18px] object-contain shrink-0 mb-[2px]" alt="WhatsApp" />
                        ) : (
                          <img src={gmailLogo} className="w-[18px] h-[18px] object-contain shrink-0 mb-[2px]" alt="Gmail" />
                        )}
                        <div className="flex flex-col items-start gap-1">
                          <div className="border border-[#EDF3FD] rounded-[6px] rounded-tl-none p-2.5 pl-3 pr-5 flex items-center gap-4 bg-[#F8FAFC] shadow-sm select-none">
                            <button className="w-9 h-9 rounded-[12px] bg-[#059669] flex items-center justify-center text-white cursor-pointer hover:bg-[#047857] transition-colors border-none shrink-0">
                              <Play size={18} fill="#fff" color="#fff" />
                            </button>
                            <div className="flex flex-col gap-1">
                              <div className="flex items-end gap-[3px] h-[22px] px-1">
                                {[4, 6, 3, 4, 7, 10, 8, 6, 5, 8, 11, 9, 7, 6, 4, 5, 7, 9, 6, 5, 8].map((height, i) => (
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
                          <span className="text-[10px] font-medium px-1 text-[#5E5353]/75">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className={`flex items-end gap-2.5 max-w-[85%] ${isMe ? 'self-end flex-row-reverse' : 'self-start'}`}>
                        {msg.channel === 'whatsapp' ? (
                          <img src={whatsappLogo} className="w-[18px] h-[18px] object-contain shrink-0 mb-[2px]" alt="WhatsApp" />
                        ) : (
                          <img src={gmailLogo} className="w-[18px] h-[18px] object-contain shrink-0 mb-[2px]" alt="Gmail" />
                        )}

                        {(() => {
                          return (
                            <div
                              className={`shadow-sm rounded-[10px] p-[10px] text-[12px] leading-relaxed flex flex-col gap-1.5 min-w-[70px]
                                ${isMe
                                  ? 'bg-[#004370] text-white rounded-tr-none'

                                  : 'bg-[#DFF2FE]/70 text-[#004370] rounded-tl-none'
                                }`}
                            >
                              <span>{msg.text}</span>
                              <span className={`text-[10px] font-medium font-manrope ${isMe ? 'text-blue-200/80 self-end' : 'text-[#5E5353]/75 self-start'}`}>
                                {msg.time}
                              </span>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="p-[1.5px] bg-gradient-to-r from-[#4F46E5] via-[#EC4899] to-[#F97316] rounded-[12px] w-[80%]">
                <div className="bg-[#FFFFFF] p-2 rounded-[12px] flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-[14px] font-bold text-[#004370] select-none">
                    <img src={starIcon} className="w-4 h-4 object-contain" alt="Star" />
                    <span>AI summarize</span>
                  </div>
                  <p className="text-[12px] font-medium text-black leading-relaxed m-0">
                    The lead is interested in the product. Could you arrange a demo sometime this week?
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default NeedsAttentionDrawer;
