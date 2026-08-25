import React from 'react';
import type { LeadProfileDetail } from '../../types';

interface ContactInfoSectionProps {
  lead: LeadProfileDetail;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({ lead }) => {
  return (
    <div className="rounded-[15px] bg-white p-5 sm:p-6">
      <h3 className="text-[16px] font-bold uppercase tracking-wider text-[#464555]">
        Contact Information
      </h3>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
        {/* Email */}
        <div>
          <span className="text-[14px] text-[#4B5563] block">Email</span>
          <span className="text-[14px] font-medium text-[#222222] mt-0.5 block break-all">
            {lead.email || 'sophia.m@gmail.com'}
          </span>
        </div>

        {/* Phone number */}
        <div>
          <span className="text-[14px] text-[#4B5563] block">Phone number</span>
          <span className="text-[14px] font-medium text-[#222222] mt-0.5 block break-all">
            {lead.phoneNumber || '+91 2222 88888'}
          </span>
        </div>

        {/* Last Interaction */}
        <div className="sm:col-span-2">
          <span className="text-[14px] text-[#4B5563] block">Last Interaction</span>
          <span className="text-[14px] font-medium text-[#222222] mt-0.5 block break-all">
            {lead.lastInteraction?.includes('at')
              ? lead.lastInteraction
              : '12, Jun 2026 at 02:00 pm'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
