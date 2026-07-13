
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { UpsellItem } from '../RenewalDash';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';

interface UpsellOpportunityListProps {
  upsells: UpsellItem[];
}

export default function UpsellOpportunityList({ upsells }: UpsellOpportunityListProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[20px] border border-[#EDF3FD] p-4 sm:p-6">
      <div className="flex justify-between items-center mb-5 gap-3">
        <div className="min-w-0">
          <h2 className="m-0 font-semibold text-[16px] sm:text-[20px] leading-[28px] text-[#0D1C2E] whitespace-nowrap">
            Upsell Opportunities
          </h2>
          <p className="m-0 font-normal text-[12px] sm:text-[14px] leading-[20px] text-[#64748B] truncate">
            AI-recommended plan upgrades and add-ons
          </p>
        </div>
        <BtnComSecondary
          label="View All"
          onClick={() => navigate('/postsales/renewals/upsell')}
          className="px-2 py-1 text-xs whitespace-nowrap shrink-0"
        />
      </div>

      <div>
        {upsells.map((upsell, index) => (
          <div
            key={upsell.id}
            className="border border-[rgba(1,67,112,0.2)] rounded-2xl overflow-hidden"
            style={{ marginBottom: index === upsells.length - 1 ? 0 : '16px' }}
          >
            {/* Top row: avatar + name/email + amount */}
            <div className="p-3 sm:p-4 px-3 sm:px-5 flex justify-between items-start gap-2">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <div
                  className="w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: upsell.avatarBg }}
                >
                  <span className="font-semibold text-[14px] sm:text-[18px] leading-[24px] text-[#222222]">
                    {upsell.initials}
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-semibold text-[15px] sm:text-[18px] leading-[24px] text-[#0D1C2E] truncate">
                    {upsell.name}
                  </span>
                  <span className="font-normal text-[12px] sm:text-[14px] leading-[20px] text-[#434655] truncate">
                    {upsell.email}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="font-bold text-[16px] sm:text-[18px] leading-[1.4] text-[#0D1C2E]">
                  {upsell.amount}
                </span>
                <span className="font-semibold text-[12px] leading-4 text-[#006A6A] bg-[rgba(0,106,106,0.05)] rounded-md px-2 py-0.5 w-fit">
                  {upsell.percentage}
                </span>
              </div>
            </div>

            {/* AI note row */}
            <div className="bg-[#F7F9FB] rounded-xl mx-3 sm:mx-4 mb-3 sm:mb-4 p-3 flex items-start gap-2">
              <Sparkles className="w-[18px] h-[18px] sm:w-[22px] sm:h-[22px] text-[#636365] shrink-0 mt-0.5" />
              <span className="font-normal text-[12px] sm:text-[13px] leading-[1.6] text-[#595C5E]">
                {upsell.note}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
