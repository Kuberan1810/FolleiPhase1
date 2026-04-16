import { Mail, MessageSquare, PhoneMissed, UserPlus } from "lucide-react";

const LiveActivity = () => {
  return (
    <div className="w-full xl:flex-1 flex flex-col">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-[#191C1E] text-[20px] font-bold font-manrope mb-0.5 sm:mb-1">Live Activity</h2>
        <p className="text-[#6B7A90] text-[13px] sm:text-[14px] font-medium">Real-time engagement pulse</p>
      </div>

      <div className="bg-[#F2F4F6] border border-[#E2E8F0]/50 rounded-[16px] p-5 sm:p-[24px] flex-1">
        <div className="relative">
          <div className="absolute left-[19px] top-[40px] bottom-[20px] w-px bg-[#E2E8F0]/50"></div>

          {/* Item 1 */}
          <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-10 relative">
            <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] shrink-0 rounded-full bg-[#F0F5FF] flex items-center justify-center text-[#0B3A64] relative z-10 shadow-[0_0_0_4px_#F2F4F6]">
              <Mail size={16} strokeWidth={2} />
            </div>
            <div className="pt-1.5 sm:pt-2 min-w-0">
              <h4 className="text-[13px] sm:text-[14px] font-medium text-gray-900 mb-0.5 tracking-tight">Email sent to <span className="font-bold text-[#0B3A64]">Ravi Sharma</span></h4>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#A6AEB8] mb-2 sm:mb-3">2 mins ago • Marketing Campaign A</p>
              <div className="bg-white border border-[#EEF2F5] rounded-sm p-2.5 sm:p-3 text-[11px] sm:text-[12px] text-[#A6AEB8] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                "Hello Ravi, following up on your inquiry about..."
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-10 relative">
            <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] shrink-0 rounded-full bg-[#EBF7F5] flex items-center justify-center text-[#188573] relative z-10 shadow-[0_0_0_4px_#F2F4F6]">
              <MessageSquare size={16} strokeWidth={2} />
            </div>
            <div className="pt-1.5 sm:pt-2">
              <h4 className="text-[13px] sm:text-[14px] font-medium text-gray-900 mb-0.5 tracking-tight">WhatsApp received from <span className="font-bold text-[#0B3A64]">Priya Mehta</span></h4>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#A6AEB8]">5 mins ago • Priority Support</p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex gap-3 sm:gap-4 mb-8 sm:mb-10 relative">
            <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] shrink-0 rounded-full bg-[#FFF4EC] flex items-center justify-center text-[#B05B15] relative z-10 shadow-[0_0_0_4px_#F2F4F6]">
              <PhoneMissed size={16} strokeWidth={2} />
            </div>
            <div className="pt-1.5 sm:pt-2">
              <h4 className="text-[13px] sm:text-[14px] font-medium text-gray-900 mb-0.5 tracking-tight">Missed call from <span className="font-bold text-[#0B3A64]">Unknown Lead</span></h4>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#A6AEB8] mb-2 sm:mb-3">12 mins ago • +91 77221 XXXX</p>
              <button className="text-[#B05B15] border border-[#FDECDD] bg-white font-bold text-[10px] px-3 py-1.5 rounded hover:bg-[#FFF4EC] transition-colors shadow-sm cursor-pointer">
                Call Back Now
              </button>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex gap-3 sm:gap-4 relative">
            <div className="w-[38px] h-[38px] sm:w-[40px] sm:h-[40px] shrink-0 rounded-full bg-[#F0F5FF] flex items-center justify-center text-[#0B3A64] relative z-10 shadow-[0_0_0_4px_#F2F4F6]">
              <UserPlus size={16} strokeWidth={2} />
            </div>
            <div className="pt-1.5 sm:pt-2">
              <h4 className="text-[13px] sm:text-[14px] font-medium text-gray-900 mb-0.5 tracking-tight">New Prospect synced via <span className="font-bold text-[#0B3A64]">Webform</span></h4>
              <p className="text-[10px] sm:text-[11px] font-semibold text-[#A6AEB8]">45 mins ago • Source: CRM Import</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LiveActivity;