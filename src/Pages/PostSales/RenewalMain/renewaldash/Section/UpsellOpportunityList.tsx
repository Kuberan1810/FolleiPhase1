import React from 'react';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { UpsellItem } from '../RenewalDash';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';
import { ArrowRight } from 'iconsax-react';

interface UpsellOpportunityListProps {
  upsells: UpsellItem[];
}

export default function UpsellOpportunityList({ upsells }: UpsellOpportunityListProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[20px] border border-[#EDF3FD] p-6">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="m-0 font-semibold text-[20px] leading-[36px] text-[#0D1C2E]">
            Upsell Opportunities
          </h2>
          <p className="m-0 font-normal text-[14px] leading-[20px] text-[#64748B]">
            AI-recommended plan upgrades and add-ons
          </p>
        </div>
        <BtnComSecondary 
          label="View All" 
          icon={<ArrowRight size={16} />} 
          iconPosition="right" 
          onClick={() => navigate('/postsales/renewals/list')} 
        />
      </div>

      <div>
        {upsells.map((upsell, index) => (
          <div key={upsell.id} className="border border-[rgba(1,67,112,0.2)] rounded-2xl" style={{ marginBottom: index === upsells.length - 1 ? 0 : '16px' }}>
            <div className="p-4 px-5 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <img 
                  src={upsell.avatar} 
                  alt={upsell.name} 
                  className="w-11 h-11 rounded-full object-cover" 
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-[18px] leading-[24px] text-[#0D1C2E]">
                    {upsell.name}
                  </span>
                  <span className="font-normal text-[14px] leading-[20px] text-[#434655]">
                    {upsell.email}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-1">
                <span className="font-bold text-[18px] leading-[33.6px] text-[#0D1C2E]">
                  {upsell.amount}
                </span>
                <span className="font-semibold text-[12px] leading-4 text-[#006A6A] bg-[rgba(0,106,106,0.05)] rounded-md px-2 py-0.5 w-fit">
                  {upsell.percentage}
                </span>
              </div>
            </div>

            <div className="bg-[#F7F9FB] rounded-xl mx-4 mb-4 p-3 px-4 flex items-start gap-2">
              <Sparkles className="w-[22px] h-[22px] text-[#636365] shrink-0 mt-0.5" />
              <span className="font-normal text-[13px] leading-[21.13px] text-[#595C5E]">
                {upsell.note}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}