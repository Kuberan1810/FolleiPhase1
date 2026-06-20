import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Send2, Calendar } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';

export default function RenewalDetailsHeader() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-0">
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white border border-[#EDF3FD] flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors shrink-0"
          >
            <ArrowLeft className="text-[#0D1C2E] w-5 h-5" />
          </button>
          <h1 className="m-0 font-extrabold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
            Renewal Details
          </h1>
        </div>
        <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
          Review and manage upcoming contract expirations across your accounts.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto mt-2 lg:mt-0">
        <button className="w-full sm:w-auto justify-center bg-[#004370] text-white border-none font-medium text-base leading-6 rounded-lg px-5 py-2.5 flex items-center gap-2 cursor-pointer hover:bg-[#00365A] transition-colors">
          <Send2 size="16" color="#FFFFFF" variant="Linear" />
          Send Renewal Proposal
        </button>
        <button className="w-full sm:w-auto justify-center bg-white text-[#004370] border border-[#004370] font-medium text-base leading-6 rounded-lg px-5 py-2.5 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
          <Calendar size="16" color="#004370" variant="Linear" />
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}