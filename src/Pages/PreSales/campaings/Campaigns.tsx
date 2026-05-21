import React, { useState } from 'react';
import FloatingButton from "../../../Component/FloatingButton";
import OutboundMetrics from "./section/OutboundMetrics";
import OutboundCampaignList from "./section/OutboundCampaignList";
import CampaignDetails from "./section/CampaignDetails/CampaignDetails";

import { useNavigate } from "react-router-dom";
// Inline SVG used for the plus icon instead of importing from iconsax-react

const Campaigns = () => {
  const navigate = useNavigate();
  const [selectedCampaign, setSelectedCampaign] = useState<any | null>(null);

  if (selectedCampaign) {
    return (
      <CampaignDetails 
        campaign={selectedCampaign} 
        onBack={() => setSelectedCampaign(null)} 
      />
    );
  }

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>

          <h1
            className="text-[#191C1E] font-extrabold text-[24px] sm:text-[30px] leading-[32px] sm:leading-[36px] tracking-[0px] font-manrope"
          >
            Campaign Intelligence
          </h1>
        </div>
         <div className="flex gap-3 sm:gap-4">
         <button
            className="flex items-center gap-2 bg-[#004370] rounded-[10px] px-[16px] py-[8px] text-white hover:text-black transition-colors font-manrope font-bold text-[11px] leading-[16.5px] tracking-[0.55px] uppercase cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            EXPORT
          </button>
          {/* <button
            className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#014370] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#013254] transition-colors cursor-pointer flex items-center justify-center px-4"
          >
            Pre Sales
          </button>*/}
          
          <button
            className="flex-1 sm:flex-none rounded-full bg-[#004370] text-white p-[6px] text-[14px] font-semibold border border-gray-200/50 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center"
            onClick={() => navigate("/presales/campaigns/create")}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div> 
      </div>

      {/* Metrics Section */}
      <OutboundMetrics />

      {/* Bottom Data Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 lg:gap-[32px] w-full items-start">
        <div className="xl:col-span-12">
          <OutboundCampaignList onSelectCampaign={setSelectedCampaign} />
        </div>
        <FloatingButton />
      </div>
    </>
  );
};

export default Campaigns;
