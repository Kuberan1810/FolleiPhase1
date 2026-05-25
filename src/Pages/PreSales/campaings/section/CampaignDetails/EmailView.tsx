import React from 'react';
import { Mail, Sparkles } from 'lucide-react';
import AIContent from '../../../../../assets/icons/ai.svg';
import emailBanner from '../../../../../assets/img/email.jpg';
import mailProduct1 from '../../../../../assets/img/mail.jpg';
import mailProduct2 from '../../../../../assets/img/mail2.jpg';

interface EmailViewProps {
  onBack: () => void;
}

const EmailView: React.FC<EmailViewProps> = () => {
  const renderToken = (text: string) => (
    <span className="inline-flex items-center px-2 py-0.5 rounded-[6px] bg-[#FFFFFF]">
      {`{{${text}}}`}
    </span>
  );

  return (
    <div className="w-full mx-auto bg-white rounded-[12px] p-4 overflow-hidden font-manrope animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      <div className="p-2 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className=" text-[#3525CD] flex items-center justify-center">
            <Mail size={18} strokeWidth={2.2} />
          </div>
          <h2 className="text-[20px] font-bold text-[#0B1C30]">
            Email View
          </h2>
        </div>
        
      </div>

      <div className="bg-[#ECF6FD] border-l border-r border-t border-[#C7C4D8]/15 rounded-t-[12px] p-[16px] flex flex-col gap-[8px] w-full">
        {/* From Field */}
        <div className="flex items-center">
          <span className="w-[70px] text-[12px] font-normal text-[#464555] tracking-wider">From:</span>
          <div className="inline-flex items-center px-2 py-0.5 rounded-[6px] bg-[#FFFFFF] border border-[#C7C4D8] text-[12px] flex items-center">
            <span className="text-[#0B1C30] font-bold mr-1">Nexus AI via</span>
            <span className="text-[#3525CD] font-bold text-[11.5px]">
              alex.rivera@nexus-crm.io
            </span>
          </div>
        </div>

        {/* To Field */}
        <div className="flex items-center">
          <span className="w-[70px] text-[12px] font-normal text-[#464555] tracking-wider ">To:</span>
          <div className="rounded-[6px] bg-[#FFFFFF] border border-[#C7C4D8] text-[12px] font-bold flex items-center">
            {renderToken("RECIPIENT_FULL_NAME")}
          </div>
        </div>

        {/* Subject Field */}
        <div className="flex items-center">
          <span className="w-[70px] text-[12px] font-normal text-[#464555] tracking-wider">Subject:</span>
          <div className="rounded-[6px] px-2 bg-[#FFFFFF] border border-[#C7C4D8] text-[12px]  font-bold flex items-center flex-wrap gap-y-1">
            <span className="mr-1">Scaling
            {renderToken("COMPANY_NAME")}'s Sales Pipeline with AI Automation</span>
          </div>
        </div>
      </div>

      <div className="w-full h-[126px] border-r border-l border-[#C7C4D8]/15 overflow-hidden p-3.5">
        <img 
          src={mailProduct1} 
          alt="WordPress Skincare Banner" 
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="px-[24px] py-[20px] space-y-[16px] border-r border-l border-[#C7C4D8]/15 text-[#191C1E] text-[16px] leading-[1.65] font-normal">
        <div>
          Hi {renderToken("first_name")},
        </div>

        <p className="font-normal text-[#191C1E]">
          Your skin deserves the best care, and we're here to make it simple
        </p>

        <p>
          At Company's name , we create skincare products that are gentle, effective, and designed for real results. From deep hydration to clear, radiant skin, our formulas are made to support your everyday routine.
        </p>

        <p>
          Discover what works best for you and start your glow journey today.
        </p>

        <div className="py-[4px] text-left">
          <button className="bg-[#004370] text-white hover:bg-[#003456] transition-colors rounded-[10px] px-[10px] py-[8px] text-[12px] font-bold tracking-wide cursor-pointer">
            Visit the Website
          </button>
        </div>

        <div className="text-[16px] text-[#191C1E]">
          <p>Best,</p>
          <p className="font-normal text-[#191C1E]">Company's Name Team</p>
        </div>

        <div className="flex items-center gap-[12px] pt-1">
          <img 
            src={emailBanner} 
            alt="Skincare Product 1" 
            className="w-[84px] h-[84px] object-cover"
          />
          <img 
            src={mailProduct2} 
            alt="Skincare Product 2" 
            className="w-[84px] h-[84px] object-cover"
          />
        </div>
      </div>

      <div className="bg-[#ECF6FD] border-r border-l border-b border-[#C7C4D8]/15 rounded-b-[12px] px-[16px] py-[16px] flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex flex-wrap items-center gap-4 text-[#004370] text-[12px] font-bold">
          <div className="flex items-center gap-1.5 text-[#004370]">
            <img src={AIContent} alt="AI Content" className="w-3 h-3" />
            <span className="font-bold">AI Tone Adjustment</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#222222] font-bold">Spam Risk Score : Low</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[#464555] text-[10px] font-bold tracking-wider">
          <span>AVG. READING TIME: 45 SEC</span>
        </div>
      </div>

    </div>
  );
};

export default EmailView;
