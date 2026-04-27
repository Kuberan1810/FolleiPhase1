import { Mail, MessageSquare, Phone, UserPlus } from "lucide-react";

const LiveActivity = () => {
  return (
    <div className="w-full xl:flex-1 flex flex-col">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-[#191C1E] text-[20px] font-bold font-manrope mb-0.5 sm:mb-1">Live Activity</h2>
        <p className="text-[#6B7A90] text-[13px] sm:text-[14px] font-medium">Real-time engagement pulse</p>
      </div>

      <div className="bg-[#F2F4F6]/0 border-[1px] border-[#E2E8F0]/50 rounded-[16px] p-5 sm:p-[24px] flex-1">
        <div className="relative">
          <div className="absolute left-[19px] top-[40px] bottom-[20px] w-px bg-[#E2E8F0]/50"></div>

          {/* Item 1 */}
          <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-10 relative">
            <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] shrink-0 rounded-[12px] bg-[#E0F2FE] flex items-center justify-center text-[#004370]">
              <Mail size={16} strokeWidth={2.5} />
            </div>
            <div className="pt-1.5 sm:pt-2 min-w-0">
              <h4 className="text-[13px] sm:text-[14px] font-bold text-[#191C1E] mb-0.5 tracking-tight">Email sent <span className="font-normal text-[#191C1E]">to</span> <span className="font-medium text-[#004370]">Julianne Smith</span></h4>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#64748B] mb-2 sm:mb-3">2 mins ago • CRM Campaign A</p>
              <div className="bg-white border border-[#F1F5F9] rounded-sm p-2.5 sm:p-3 text-[10px] sm:text-[12px] text-[#A6AEB8] italic">
                "Hello Julianne, following up on your refund inquiry regarding..."
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-10 relative">
            <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] shrink-0 rounded-[12px] bg-[#DCFCE7] flex items-center justify-center text-[#006A6A]">
              <MessageSquare size={16} strokeWidth={2.5} />
            </div>
            <div className="pt-1.5 sm:pt-2">
              <h4 className="text-[13px] sm:text-[14px] font-bold text-[#191C1E] mb-0.5 tracking-tight">WhatsApp received <span className="font-normal text-[#191C1E]">from</span> <span className="font-medium text-[#004370]">Robert Krause</span></h4>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#64748B]">5 mins ago • Priority Support</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-10 relative">
            <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] shrink-0 rounded-[12px] bg-[#FFEDD5] flex items-center justify-center text-[#663300]">
              <Phone size={16} strokeWidth={2.5} />
            </div>
            <div className="pt-1.5 sm:pt-2">
              <h4 className="text-[13px] sm:text-[14px] font-bold text-[#191C1E] mb-0.5 tracking-tight">Missed call <span className="font-normal text-[#191C1E]">from</span> <span className="font-medium text-[#004370]">Marcus Lee</span></h4>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#64748B] mb-2 sm:mb-3">12 mins ago • +91 77221 XXXX</p>
              <button className="text-[#663300] border border-[#E2E8F0] bg-white font-bold text-[10px] px-3 py-1.5 rounded hover:bg-[#FFF4EC] transition-colors cursor-pointer">
                Call Back Now
              </button>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex gap-3 sm:gap-4 relative">
            <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] shrink-0 rounded-[12px] bg-[#D0E4FF] flex items-center justify-center text-[#00497A]">
              <UserPlus size={16} strokeWidth={2.5} />
            </div>
            <div className="pt-1.5 sm:pt-2">
              <h4 className="text-[13px] sm:text-[14px] font-bold text-[#191C1E] mb-0.5 tracking-tight">New Ticket <span className="font-normal text-[#191C1E]">synced via Webform</span></h4>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#64748B]">45 mins ago • Source: CRM Import</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default LiveActivity;