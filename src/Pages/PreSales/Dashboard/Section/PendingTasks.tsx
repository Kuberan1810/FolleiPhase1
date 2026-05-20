import { PhoneCall, Mail } from "lucide-react";

const PendingTasks = () => {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <h2 className="font-manrope font-bold text-[18px] text-[#191C1E] mb-6">Pending Tasks</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between py-3">
          <div className="flex items-start gap-3">
            <div className="bg-[#EFF4FF] border border-[#E0E8FF] rounded-[10px] p-2.5 flex items-center justify-center shrink-0">
              <PhoneCall size={18} color="#004370" />
            </div>
            <div>
              <div className="font-inter font-semibold text-[14px] text-[#191C1E]">Call Sarah Jenkins</div>
              <div className="text-[#BA1A1A] font-semibold text-[12px] mt-1">Due Today, 2:00 PM</div>
            </div>
          </div>
          <span className="bg-[#F1F5F9] text-[#64748B] rounded-full px-2 py-0.5 text-[11px] tracking-widest uppercase">
            PENDING
          </span>
        </div>

        <div className="flex items-start justify-between py-3">
          <div className="flex items-start gap-3">
            <div className="bg-[#EFF4FF] border border-[#E0E8FF] rounded-[10px] p-2.5 flex items-center justify-center shrink-0">
              <Mail size={18} color="#004370" />
            </div>
            <div>
              <div className="font-inter font-semibold text-[14px] text-[#191C1E]">Follow up with Acme Corp</div>
              <div className="text-[#64748B] text-[12px] mt-1">Tomorrow, 11:30 AM</div>
            </div>
          </div>
          <span className="bg-[#F1F5F9] text-[#64748B] rounded-full px-2 py-0.5 text-[11px] tracking-widest uppercase">
            PENDING
          </span>
        </div>
      </div>
    </div>
  );
};

export default PendingTasks;
