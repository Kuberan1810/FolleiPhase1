import React from 'react';
import type { Lead } from '../Leads';

interface ContactInformationProps {
  lead: Lead;
}

const ContactInformation: React.FC<ContactInformationProps> = ({ lead }) => {
  return (
    <div className="bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <h3 
        className="font-inter uppercase tracking-wide mb-5"
        style={{
          fontWeight: 700,
          fontSize: '18px',
          lineHeight: '18px',
          color: '#464555'
        }}
      >
        CONTACT INFORMATION
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <span className="font-manrope text-[14px] text-[#888888] font-medium block mb-1">Email</span>
          <span 
            className="font-manrope block"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              color: '#222222'
            }}
          >
            {lead.email}
          </span>
        </div>
        <div>
          <span className="font-manrope text-[14px] text-[#888888] font-medium block mb-1">Phone</span>
          <span 
            className="font-manrope block"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              color: '#222222'
            }}
          >
            {lead.phone}
          </span>
        </div>
        <div>
          <span className="font-manrope text-[14px] text-[#888888] font-medium block mb-1">Lead Captured</span>
          <span 
            className="font-manrope block"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              color: '#222222'
            }}
          >
            12, Jan 2026 11:20am
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
