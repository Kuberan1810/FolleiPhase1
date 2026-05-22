import React from 'react';
import { Sparkles, Clock, User } from 'lucide-react';
import { Whatsapp } from 'iconsax-react';

interface WhatsAppViewProps {
  onBack: () => void;
}

const WhatsAppView: React.FC<WhatsAppViewProps> = () => {
  const renderToken = (text: string) => (
    <span className="inline-flex items-center px-1 py-0.5 font-normal text-[#004370] select-none">
      {`{{${text}}}`}
    </span>
  );

  return (
    <div className="w-full mx-auto bg-white rounded-[12px] p-4 animate-in fade-in slide-in-from-bottom-4 duration-300">

      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-[#3525CD] flex items-center justify-center">
            <Whatsapp size={20} strokeWidth={3} color="#004370" />
          </div>
          <h2 className="text-[20px] font-semibold text-[#0B1C30]">
            WhatsApp
          </h2>
        </div>

      </div>

      <div className="mt-4 bg-[#ECF6FD] rounded-t-[8px] p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-[34px] h-[34px] rounded-full border border-[#004370] text-[#2563EB] flex items-center justify-center">
            <User size={20} className="text-[#004370]" />
          </div>
          <div>
            <div className="text-[14px] font-bold text-[#0B1C30] flex items-center">
              {renderToken("RECIPIENT_FULL_NAME")}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">

              <span className="text-[10px] text-[#16A34A] font-bold tracking-wide">Online</span>
            </div>
          </div>
        </div>
      </div>
      <div className='p-[32px]'>
        <div className="bg-[#F7F9FB] rounded-b-[8px] p-5 space-y-4 shadow-[0px_1px_2px_0px_#0000000D]">
          <div className="text-[#0B1C30] text-[16px] leading-[1.65] space-y-3 font-normal max-w-[680px]">
            <p>
              Hi {renderToken("first_name")}, noticed {renderToken("COMPANY_NAME")}'s expansion in {renderToken("INDUSTRY_VERTICAL")}. Impressive!
            </p>
            <p>
              We help companies like {renderToken("COMPETITOR_REFERENCE")} speed up lead response by 80%. Worth a 10min chat this {renderToken("AI_FREE_SLOT_DAY")}?
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-100">
            <button className="bg-white border border-[#C7C4D8] text-[#004370] font-bold text-[14px] py-1.5 px-3 rounded-[12px] flex items-center justify-center gap-1 shadow-[0px_1px_2px_0px_#0000000D] transition-all duration-150 cursor-pointer">
              <span>Book Meeting</span>
            </button>
            <button className="bg-white border border-[#C7C4D8] text-[#464555] font-bold text-[14px] py-1.5 px-3 rounded-[12px] flex items-center justify-center shadow-[0px_1px_2px_0px_#0000000D] transition-all duration-150 cursor-pointer">
              Not interested
            </button>
          </div>

          <div className="text-right text-[10px] text-slate-400 font-medium">
            <span>10:30 AM</span>
          </div>
        </div>
      </div>


      <div className="bg-[#ECF6FD] rounded-b-[12px] px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 mt-2 ">
        <div className="flex flex-wrap items-center gap-4 text-[#004370] text-[12px] font-bold">
          <div className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#004370]" />
            <span> AI Message Optimizer</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} color='#004370' />
            <span>Smart Scheduling</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[#464555] text-[10px] font-bold tracking-wider">
          <span>AVG. READ TIME: 45 SEC</span>
        </div>
      </div>

    </div>


  );
};

export default WhatsAppView;
