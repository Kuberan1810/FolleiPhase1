import React from 'react';
import type { Lead } from '../Leads';

interface CompanyDetailsProps {
  lead: Lead;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ lead: _lead }) => {
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
        COMPANY DETAILS
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-8">
        <div>
          <span className="font-manrope text-[14px] text-[#888888] font-medium block mb-1">Industry</span>
          <span 
            className="font-manrope block"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              color: '#222222'
            }}
          >
            Enterprise Software
          </span>
        </div>
        <div>
          <span className="font-manrope text-[14px] text-[#888888] font-medium block mb-1">Role</span>
          <span 
            className="font-manrope block"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              color: '#222222'
            }}
          >
            Marketing
          </span>
        </div>
        <div>
          <span className="font-manrope text-[14px] text-[#888888] font-medium block mb-1">Website</span>
          <a 
            href="http://www.CloudTech.com" 
            target="_blank" 
            rel="noreferrer" 
            className="font-manrope hover:underline font-medium block"
            style={{
              fontSize: '16px',
              lineHeight: '20px',
              color: '#0A71B7'
            }}
          >
            http://www.CloudTech.com
          </a>
        </div>
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
            sales@zentrotech.com
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
            040 4567 8900
          </span>
        </div>
        <div>
          <span className="font-manrope text-[14px] text-[#888888] font-medium block mb-1">Location</span>
          <span 
            className="font-manrope block leading-relaxed max-w-sm"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '20px',
              color: '#222222'
            }}
          >
            5th Floor, Cyber Towers, HITEC City Madhapur, Hyderabad, Telangana 500081 India
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
