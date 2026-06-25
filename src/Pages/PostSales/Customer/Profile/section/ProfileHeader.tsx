import React from 'react';
import Email from "../../../../../assets/socialMediaIcons/Gmail.svg";
import Whatsapp from "../../../../../assets/socialMediaIcons/WhatsApp.svg";
import Messenger from "../../../../../assets/socialMediaIcons/Messenger.svg";
import Calls from "../../../../../assets/socialMediaIcons/Calls.svg";

interface ProfileHeaderProps {
  customer: {
    name: string;
    initials: string;
    title: string;
    company: string;
    id: string;
    status: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ customer }) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between BoxStyle gap-4 sm:gap-6 shadow-[0_4px_20px_rgba(237,243,253,0.3)]">
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 w-full sm:w-auto min-w-0">
        {/* Avatar */}
        <div className="w-16 h-16 sm:w-[100px] sm:h-[100px] rounded-[16px] sm:rounded-[20px] bg-[#E1EDFE] flex items-center justify-center shrink-0">
          <span className="text-[#01539D] text-[22px] sm:text-[32px] font-semibold tracking-wide">{customer.initials}</span>
        </div>

        {/* Customer Info */}
        <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-[20px] sm:text-[24px] md:text-[32px] font-semibold text-[#131B2E] leading-tight truncate">
              {customer.name}
            </h1>
            <div className="bg-[#DCFCE7] px-2 py-0.5 rounded-[9px] text-[#10B981] text-[10px] sm:text-[12px] font-bold uppercase tracking-wider whitespace-nowrap">
              {customer.status}
            </div>
          </div>

          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-[#464555] font-semibold truncate">
            {customer.title} @ {customer.company}
          </p>

          <div className="text-[12px] sm:text-[14px] text-[#464555] font-semibold">
            ID: {customer.id}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-2 sm:mt-0 w-full sm:w-auto justify-start sm:justify-end">
        <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shrink-0">
          <img src={Calls} alt="Messenger" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shrink-0">
          <img src={Email} alt="Email" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shrink-0">
          <img src={Whatsapp} alt="Whatsapp" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer shrink-0">
          <img src={Messenger} alt="Phone-calls" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
