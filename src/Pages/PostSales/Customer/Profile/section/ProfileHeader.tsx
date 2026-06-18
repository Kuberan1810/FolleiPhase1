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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white rounded-[10px] p-6 shadow-[0_4px_20px_rgba(237,243,253,0.3)]">
      <div className="flex items-center gap-5">
        {/* Avatar */}
        <div className="w-[100px] h-[100px] rounded-[20px] bg-[#E1EDFE] flex items-center justify-center shrink-0">
          <span className="text-[#01539D] text-[32px] font-semibold tracking-wide">{customer.initials}</span>
        </div>

        {/* Customer Info */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-3">
            <h1 className="text-[32px] font-semibold text-[#131B2E] leading-tight">
              {customer.name}
            </h1>
            <div className="bg-[#DCFCE7] px-2 py-0.5 rounded-[9px] text-[#10B981] text-[12px] font-bold uppercase tracking-wider">
              {customer.status}
            </div>
          </div>

          <p className="text-[18px] text-[#464555] font-semibold">
            {customer.title} @ {customer.company}
          </p>

          <div className="text-[14px] text-[#464555] font-semibold">
            ID: {customer.id}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2.5 mt-4 md:mt-0">
        <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
          <img src={Calls} alt="Messenger" className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
          <img src={Email} alt="Email" className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
          <img src={Whatsapp} alt="Whatsapp" className="w-6 h-6" />
        </button>
        <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer">
          <img src={Messenger} alt="Phone-calls" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
