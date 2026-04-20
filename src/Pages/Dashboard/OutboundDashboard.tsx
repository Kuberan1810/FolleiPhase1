import React from "react";
import FloatingButton from "../../Component/FloatingButton";
import OutboundMetrics from "./Section/OutboundMetrics";
import OutboundCampaignList from "./Section/OutboundCampaignList";

const OutboundDashboard = () => {
  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>
          <p
            className="text-[#004370] mb-1.5 sm:mb-2 uppercase font-bold text-[12px] leading-[16px] tracking-[1.2px] font-manrope"
          >
            INTELLIGENCE HUB
          </p>
          <h1 
            className="text-[#191C1E] font-[800] text-[30px] leading-[36px] tracking-[0px] font-manrope"
          >
            Campaign Intelligence
          </h1>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button 
            className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#014370] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#013254] transition-colors cursor-pointer flex items-center justify-center px-4"
          >
            Pre Sales
          </button>
          <button 
            className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#E5ECF1] text-black rounded-[10px] text-[14px] font-semibold border border-gray-200/50 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center px-4"
            style={{ boxShadow: 'inset 0 3px 4px 0 rgba(0, 0, 0, 0.15)' }}
          >
            Post Sales
          </button>
        </div>
      </div>

      {/* Metrics Section */}
      <OutboundMetrics />

      {/* Bottom Data Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 lg:gap-[32px] w-full items-start">
        <div className="xl:col-span-12">
          <OutboundCampaignList />
        </div>
        <FloatingButton />
      </div>
    </>
  );
};

export default OutboundDashboard;
