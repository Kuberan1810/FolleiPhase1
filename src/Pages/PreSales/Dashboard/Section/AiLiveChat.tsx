import { Send } from "lucide-react";

const AiLiveChat = () => {
  return (
    <div className="bg-white rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] w-[340px] fixed bottom-[90px] right-6 z-[60] overflow-hidden flex flex-col h-[400px]">
      <div className="bg-[#004370] px-4 py-3 shrink-0 rounded-t-[20px]">
        <div className="font-manrope font-bold text-white text-[16px]">AI Live</div>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-[#F8FAFC]">
        <div className="bg-white border border-[#F1F5F9] rounded-[14px] p-3 mb-3 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#64748B]">Website Chat</span>
            <span className="text-[10px] font-bold text-[#10B981] bg-[#D1FAE5] px-2 py-0.5 rounded-full">DONE</span>
          </div>
          <div className="font-manrope font-semibold text-[14px] text-[#191C1E]">Sarah Jenkins</div>
          <div className="text-[12px] text-[#64748B]">Asked about pricing plans</div>
        </div>

        <div className="bg-white border border-[#F1F5F9] rounded-[14px] p-3 mb-4 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[10px] uppercase tracking-widest text-[#64748B]">WhatsApp</span>
            <span className="text-[10px] font-bold text-[#3B82F6] bg-[#DBEAFE] px-2 py-0.5 rounded-full">ACTIVE</span>
          </div>
          <div className="font-manrope font-semibold text-[14px] text-[#191C1E]">Michael Chen</div>
          <div className="text-[12px] text-[#64748B]">Currently asking about API integration</div>
        </div>

        <div className="flex justify-end mb-2">
          <div className="bg-gradient-to-r from-[#11629D] to-[#5595D3] text-white rounded-[14px] rounded-br-none p-3 text-[13px] max-w-[85%] shadow-md">
            I've sent Michael the API documentation link. Should I offer a technical call?
          </div>
        </div>
      </div>

      <div className="border-t border-[#F1F5F9] px-4 py-3 flex items-center gap-2 bg-white shrink-0">
        <input 
          type="text" 
          placeholder="Ask AI about your leads..." 
          className="flex-1 text-[13px] outline-none text-[#191C1E] placeholder:text-[#94A3B8]"
        />
        <button className="text-[#11629D] p-1 rounded-full hover:bg-[#F1F5F9] transition-colors">
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AiLiveChat;
