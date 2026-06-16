import { useEffect } from "react";
import { Send, X, UserCircle } from "lucide-react";


const AiLiveChat = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const popup = document.getElementById('ai-live-chat-popup');
      if (popup && !popup.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div id="ai-live-chat-popup" className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[380px] max-w-[calc(100vw-32px)] overflow-hidden flex flex-col h-[400px]">
      <div className="px-4 py-3 shrink-0 rounded-t-[20px]" style={{ background: 'linear-gradient(90deg, #003659, #0A4268, #007ACD)' }}>
        <div className="flex justify-between items-center">
          <div className="font-inter font-bold text-[14px] text-white">AI Live</div>
          <button onClick={onClose} className="text-white hover:opacity-70 transition-opacity">
            <X size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-[#F8FAFC]">
        <div className="bg-[#F0FDF4] rounded-[14px] p-3 mb-3">
          <div className="flex justify-between items-center mb-2">
            <span className="font-inter font-bold text-[10px] text-[#3525CD]">WhatsApp SENT</span>
            <span className="font-inter font-bold text-[10px] text-[#16A34A] bg-[#D1FAE5] px-2 py-0.5 rounded-full">DONE</span>
          </div>
          <div className="font-inter font-semibold text-[14px] text-[#191C1E]">Sarah Jenkins</div>
          <div className="text-[12px] text-[#64748B]">Asked about pricing plans</div>
        </div>

        <div className="p-[1px] rounded-[14px] mb-4" style={{ background: 'linear-gradient(90deg, #003659, #0A4268, #007ACD)' }}>
          <div className="bg-[#F8F8FF] rounded-[13px] p-3" style={{ backgroundColor: '#F8F8FF' }}>
            <div className="flex justify-between items-center mb-2">
              <span className="font-inter font-bold text-[10px] text-[#4648D4]">FOLLOW-UP</span>
              <span className="font-inter font-bold text-[10px] text-[#4648D4] bg-[#EEF2FF] px-2 py-0.5 rounded-full">ACTIVE</span>
            </div>
            <div className="font-inter font-semibold text-[14px] text-[#191C1E]">Michael Chen</div>
            <div className="text-[12px] text-[#64748B]">Currently asking about API integration</div>
          </div>
        </div>

        <div className="flex items-end justify-end gap-2 mb-2">
          <div className="bg-[#004370] text-white rounded-[14px] rounded-br-none p-3 text-[13px] max-w-[85%] shadow-md">
            I've sent Michael the API documentation link. Should I offer a technical call?
          </div>
          <div className="w-9 h-9 rounded-full bg-[#004370] flex items-center justify-center shrink-0">
            <UserCircle size={20} color="white" />
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 pt-1 bg-white shrink-0">
        <div className="bg-[#FBFAFF] border border-[#C7C4D833] rounded-[14px] px-4 py-3 flex items-center gap-2">
          <input 
            type="text" 
            placeholder="Ask AI about your leads..." 
            className="bg-transparent flex-1 text-[13px] outline-none text-[#191C1E] placeholder:text-[#94A3B8]"
          />
          <button className="text-[#11629D] p-1 rounded-full hover:bg-[#F1F5F9] transition-colors">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiLiveChat;
