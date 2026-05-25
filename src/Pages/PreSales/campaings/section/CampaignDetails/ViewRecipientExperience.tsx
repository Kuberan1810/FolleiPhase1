import React from 'react';
import { Mail } from 'lucide-react';
import { Whatsapp } from 'iconsax-react';

interface ViewRecipientExperienceProps {
  onSelectView?: (view: 'email' | 'whatsapp') => void;
}

const ViewRecipientExperience: React.FC<ViewRecipientExperienceProps> = ({ onSelectView }) => {
  return (
    <div className="bg-white rounded-[8px] border border-[#F1F5F9] p-[10px] flex items-center justify-between">
      <span className="text-[12px] font-bold text-[#004370] uppercase tracking-[1.5px] select-none font-manrope">
        View Recipient Experience
      </span>
      
      <div className="flex items-center gap-4">
        {/* Email Option */}
        <button 
          onClick={() => onSelectView?.('email')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div className="w-[32px] h-[32px] rounded-[8px] bg-[#E5EEFF] text-[#3525CD] flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:bg-[#E0E7FF] shadow-sm">
            <Mail size={16} strokeWidth={2.2} color="#3525CD" />
          </div>
          <span className="text-[10px] font-bold text-[#0B1C30] tracking-wide font-manrope">
            Email
          </span>
        </button>

        {/* WhatsApp Option */}
        <button 
          onClick={() => onSelectView?.('whatsapp')}
          className="flex flex-col items-center gap-1 group cursor-pointer"
        >
          <div className="w-[32px] h-[32px] rounded-[8px] bg-[#E5EEFF] text-[#3525CD] flex items-center justify-center transition-all duration-200 group-hover:scale-105 group-hover:bg-[#CCFBF1] shadow-sm">
            <Whatsapp size={16} strokeWidth={2.5} color="#3525CD" />
          </div>
          <span className="text-[10px] font-bold text-[#0B1C30] group-hover:text-[#0D9488] transition-colors tracking-wide font-manrope">
            WhatsApp
          </span>
        </button>
      </div>
    </div>
  );
};

export default ViewRecipientExperience;

