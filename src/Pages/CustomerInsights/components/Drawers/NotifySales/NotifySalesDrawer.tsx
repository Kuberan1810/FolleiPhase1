import React, { useState } from 'react';
import { X, CheckCircle2, Bell, Calendar, CheckCircle, MessageSquare, Mail, Phone, MessageCircle } from 'lucide-react';

interface NotifySalesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotifySalesDrawer: React.FC<NotifySalesDrawerProps> = ({ isOpen, onClose }) => {
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [autoAssign, setAutoAssign] = useState(true);

  const allReplies = [
    { name: 'Ravi Sharma', phone: '+91 98765 43210', initials: 'RS', time: 'Today, 2:30 PM', msg: "I'm interested. Could you explain the pricing and next steps?", avatarBg: '#DBEAFE', avatarText: '#004370' },
    { name: 'John Doe', phone: '+1 555-0199', initials: 'JD', time: 'Today, 1:50 PM', msg: "I'm interested. Could you explain the pricing and next steps?", avatarBg: '#FFEDD5', avatarText: '#9A3412' },
    { name: 'Anita Malik', phone: 'anita@globalops.in', initials: 'AM', time: 'Today, 9:00 AM', msg: "I'm interested. Could you explain the pricing and next steps?", avatarBg: '#FEE2E2', avatarText: '#991B1B' },
  ];

  const visibleReplies = showAllReplies ? allReplies : allReplies.slice(0, 2);

  const channels = [
    { name: 'SMS', icon: MessageSquare },
    { name: 'Email', icon: Mail },
    { name: 'Phone', icon: Phone },
    { name: 'Whatsapp', icon: MessageCircle },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-all duration-300"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="pt-[30px] px-[20px] flex justify-between items-start border-b border-[#E2E8F0] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">Notify Sales Rep</h2>
              <p className="text-[#434655] text-[12px]">View recent replies and assign leads to sales team</p>
            </div>
            <button
              onClick={onClose}
              className="w-[24px] h-[24px] bg-[#004370] rounded-full flex items-center justify-center text-white"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-[20px] no-scrollbar bg-white">
            <div className="mb-8">
              <h3 className="text-[12px] font-[700] text-[#000000] mb-4">Recent Replies</h3>
              <div className="space-y-4">
                {visibleReplies.map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-[12px] flex items-center justify-center text-[12px] font-bold"
                          style={{ backgroundColor: item.avatarBg, color: item.avatarText }}
                        >
                          {item.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-[#191C1E] tracking-tight">{item.name}</span>
                          <span className="text-[11px] text-[#94A3B8] font-medium leading-none">{item.phone}</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-[#191C1E] tracking-tight">{item.time}</span>
                    </div>
                    <div className="bg-[#F4F6F8] p-2 rounded-[5px]">
                      <p className="text-[10px] text-[#434655] italic leading-relaxed whitespace-pre-line">
                        "{item.msg}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            <div className="mb-8">
              <h3 className="text-[12px] font-[700] text-[#000000] mb-4">Assignment & Settings</h3>
              <div className="bg-[#F4F6F8] rounded-[10px] p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[12px] bg-[#F0FFD5] flex items-center justify-center text-[13px] font-bold text-[#0369A1]">
                      AS
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[12px] font-bold text-[#191C1E]">Alex Sterlin</span>
                      <span className="text-[11px] text-[#94A3B8] font-medium">Senior Account Executive</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                  <span className="text-[11px] font-bold text-[#434655]">Auto assign leads</span>
                  <button
                    onClick={() => setAutoAssign(!autoAssign)}
                    className={`w-[36px] h-[20px] rounded-full relative transition-colors duration-200 ${autoAssign ? 'bg-[#0058BC]' : 'bg-[#E2E8F0]'}`}
                  >
                    <div className={`absolute top-1/2 -translate-y-1/2 w-[14px] h-[14px] bg-white rounded-full transition-transform duration-200 ${autoAssign ? 'translate-x-[19px]' : 'translate-x-[3px]'}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[12px] font-[700] text-[#000000] mb-6">Automation Timeline</h3>
              <div className="ml-1 space-y-0 relative">
                <div className="absolute left-[11px] top-[10px] bottom-[10px] w-[1px] bg-[#E2E8F0]" />

                {[
                  { label: 'Leads Replied', icon: CheckCircle2, status: 'completed' },
                  { label: 'Notify Sales', icon: Bell, status: 'active' },
                  { label: 'Schedule Call', icon: Calendar, status: 'pending' },
                  { label: 'Close Deal', icon: CheckCircle, status: 'pending' }
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4 relative pb-8 last:pb-0">
                    <div
                      className={`relative z-10 w-[20px] h-[20px] rounded-[5px] flex items-center justify-center ${step.status === 'completed' ? 'bg-[#E8FEDB] border-[#10B981] text-[#165909]' :
                        step.status === 'active' ? 'bg-[#DBEAFE] text-[#434655]' :
                          'bg-[#434655]/20 text-[#A3A4A8]'
                        }`}
                    >
                      <step.icon size={12} strokeWidth={3} />
                    </div>
                    <span className={`text-[13px] font-bold ${step.status === 'pending' ? 'text-[#94A3B8]' : 'text-[#191C1E]'}`}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-[14px] font-[700] text-[#2C2F31] mb-4">Select Channel</h3>
              <div className="grid grid-cols-4 gap-3">
                {channels.map((channel, i) => (
                  <button
                    key={i}
                    className="flex flex-col items-center gap-2 p-1 bg-[#FFFFFF] w-[69px] h-[48px] border border-[#C1C7D1]/30 rounded-[5px] hover:bg-[#F8FAFC] transition-all group shadow-sm active:scale-95"
                  >
                    <div className="w-[24px] h-[24px] p-1 rounded-[5px] bg-[#DBEAFE] flex items-center justify-center text-[#004370] group-hover:bg-[#004370]/10 group-hover:text-[#004370] transition-colors">
                      <channel.icon size={14} />
                    </div>
                    <span className="text-[8px] font-semibold text-[#595C5E] group-hover:text-[#004370] uppercase tracking-wider">{channel.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <button
                className="w-full h-[40px] rounded-[10px] text-white font-bold text-[15px] shadow-sm hover:shadow-lg transition-all active:scale-[0.98]"
                style={{ background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)' }}
                onClick={onClose}
              >
                Save  Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotifySalesDrawer;
