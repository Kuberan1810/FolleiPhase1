import { MessageSquare, Video } from "iconsax-react";

const PendingTasks = () => {
  return (
    <div className="BoxStyle shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <h2 className="font-manrope font-bold text-[18px] text-[#191C1E] mb-6">Pending Tasks</h2>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between p-3 bg-[#FBFAFF] rounded-[12px]">
          <div className="flex items-center gap-3">
            <MessageSquare variant="Bold" size={18} color="#006A6A" />
            <div>
              <div className="font-inter font-bold text-[14px] text-[#191C1E]">Follow-up Chat: Sarah J.</div>
              <div className="text-[#BA1A1A] font-semibold text-[12px] mt-1">Due Today, 2:00 PM</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-[#FBFAFF] rounded-[12px]">
          <div className="flex items-center gap-3">
            <Video variant="Bold" size={18} color="#3525CD" />
            <div>
              <div className="font-inter font-bold text-[14px] text-[#191C1E]">Demo: TechFlow Inc</div>
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
