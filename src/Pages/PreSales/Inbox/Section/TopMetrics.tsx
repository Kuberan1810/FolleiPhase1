import React from "react";
import { ChevronDown } from "lucide-react";

const TopMetrics = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center gap-6 lg:gap-8 mb-8 w-full">
      <div className="BoxStyle shadow-[0_1px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center text-center w-full md:w-[263px] h-[160px]">
        <div className="flex items-center gap-[10px] text-black font-semibold text-[24px]">
          <span>Total Chats</span>
          <ChevronDown size={18} className="text-black stroke-[2.5]" />
        </div>
        <div className="text-[48px] font-semibold text-black leading-none tracking-tight">
          568
        </div>
        <div className="h-1" />
      </div>

      <div className="bg-black text-white rounded-[10px] pt-[20px] pr-[23px] pb-[34px] pl-[19px] shadow-[0_1px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between items-start text-left w-full md:w-[570px] h-[160px]">
        <div className="w-full">
          <h3 className="font-semibold text-[32px] tracking-tight leading-tight">
            customer conversion conversation
          </h3>
          <p className="text-[20px] font-semibold text-white/95 mt-1">
            83% of total chat
          </p>
        </div>
        <div className="h-[42px] w-full rounded-[4px] overflow-hidden flex p-[1px] mt-2">
          <div className="h-full bg-[#F6FBFF]" style={{ width: "83%" }}></div>
          <div className="h-full bg-[#23669C]" style={{ width: "17%" }}></div>
        </div>
      </div>

      <div className="BoxStyle shadow-[0_1px_4px_rgba(0,0,0,0.25)] flex flex-col justify-between items-center text-center w-full md:w-[263px] h-[160px]">
        <span className="font-semibold text-[24px] text-[#000000]">
          Admin Needs
        </span>
        <div className="text-[48px] font-semibold text-black leading-none tracking-tight">
          10
        </div>
        <button
          className="bg-[#23669C] text-white px-10 py-2 rounded-[4px] text-[13px] font-semibold cursor-pointer shadow-sm active:scale-95 uppercase tracking-wider"
        >
          View
        </button>
      </div>
    </div >
  );
};

export default TopMetrics;
