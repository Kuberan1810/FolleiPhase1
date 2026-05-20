import { Messages2 } from "iconsax-react";

const ChannelBreakdown = () => {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <h2 className="font-manrope font-bold text-[18px] text-[#191C1E] mb-6">Channel Breakdown</h2>
      
      <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-[14px] p-4 flex items-center gap-4">
        <div className="bg-[#EFF4FF] border border-[#E0E8FF] rounded-[12px] p-3 flex items-center justify-center">
          <Messages2 variant="Bold" size={22} color="#004370" />
        </div>
        <div className="flex-1">
          <div className="font-medium text-[14px] text-[#191C1E] mb-4">WhatsApp Direct</div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="font-inter text-[11px] text-[#64748B] mb-1">Sent</div>
              <div className="font-inter font-bold text-[14px] text-[#191C1E]">8,204</div>
            </div>
            <div>
              <div className="font-inter text-[11px] text-[#64748B] mb-1">Engagement</div>
              <div className="font-inter font-bold text-[14px] text-[#191C1E]">88.2%</div>
            </div>
            <div>
              <div className="font-inter text-[11px] text-[#64748B] mb-1">Conversion rate</div>
              <div className="font-inter font-bold text-[14px] text-[#191C1E]">74.2%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelBreakdown;
