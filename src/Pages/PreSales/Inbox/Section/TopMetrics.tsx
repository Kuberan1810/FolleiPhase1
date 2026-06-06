import { ChevronDown } from "lucide-react";

const TopMetrics = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-8 mb-8 w-full">
      <div 
        className="BoxStyle shadow-[0_1px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between items-start text-left flex-1 w-full font-urbanist h-[160px]"
        style={{ backgroundColor: '#F6FBFF' }}
      >
        <div className="flex items-center gap-[10px] font-urbanist font-bold text-[18px] text-[#191C1E]">
          <span>Total Chats</span>
          <ChevronDown size={18} className="text-[#191C1E] stroke-[2.5]" />
        </div>
        <div className="w-full text-center">
          <span className="font-urbanist font-bold text-[48px] text-[#191C1E] leading-none tracking-tight">
            568
          </span>
        </div>
        <div className="h-1" />
      </div>

      <div className="BoxStyle text-white shadow-[0_1px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center w-full md:w-[549px] shrink-0 h-[160px]"
        style={{ backgroundColor: '#000000' }}>
        <div className="w-full">
          <h3 className="font-urbanist font-bold text-[18px] tracking-tight leading-tight">
            customer conversion conversation
          </h3>
        </div>
        <p className="font-urbanist text-[13px] font-semibold text-[#DFF2FE] text-left w-full">
          83% of total chat
        </p>
        <div className="h-[42px] w-full rounded-[4px] overflow-hidden flex p-[1px] mt-2">
          <div className="h-full bg-[#F6FBFF]" style={{ width: "83%" }}></div>
          <div className="h-full bg-[#004370]" style={{ width: "17%" }}></div>
        </div>
      </div>

      <div 
        className="BoxStyle shadow-[0_1px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between items-start text-left flex-1 w-full font-urbanist h-[160px]"
        style={{ backgroundColor: '#F6FBFF' }}
      >
        <span className="font-urbanist font-bold text-[18px] text-[#191C1E]">
          Admin Needs
        </span>
        <div className="w-full text-center">
          <span className="text-[48px] font-urbanist font-bold text-[#191C1E] leading-none tracking-tight">
            10
          </span>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="bg-[#004370] text-white px-10 py-2 rounded-[8px] font-inter font-bold text-[12px] cursor-pointer shadow-sm active:scale-95 uppercase tracking-wider"
          >
            View
          </button>
        </div>
      </div>
    </div >
  );
};

export default TopMetrics;
