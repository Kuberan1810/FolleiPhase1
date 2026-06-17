import React from 'react';
import { Shield, ArrowUpRight, Heart } from 'lucide-react';

const CampaignParticipationCard = () => {
  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#EDF3FD]">
      <h2 className="text-[16px] font-extrabold text-[#191C1E] mb-7">Campaign Participation</h2>
      <div className="flex flex-col gap-6">
        {/* Item 1 */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-[12px] bg-[#EFF6FF] flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-[#3B82F6]" strokeWidth={2} />
          </div>
          <div className="flex flex-col pt-0.5">
            <span className="text-[13px] font-extrabold text-[#191C1E] mb-2">Summer Win-Back</span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-[#3B82F6] bg-[#EFF6FF] px-2 py-0.5 rounded-md">Opened</span>
              <span className="text-[10px] font-bold text-[#3B82F6] bg-[#EFF6FF] px-2 py-0.5 rounded-md">Clicked</span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Replied</span>
            </div>
          </div>
        </div>
        {/* Item 2 */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-[12px] bg-green-50 flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-5 h-5 text-green-500" strokeWidth={2} />
          </div>
          <div className="flex flex-col pt-0.5">
            <span className="text-[13px] font-extrabold text-[#191C1E] mb-2">Product Launch</span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-[#3B82F6] bg-[#EFF6FF] px-2 py-0.5 rounded-md">WhatsApp Replied</span>
              <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">Purchased</span>
            </div>
          </div>
        </div>
        {/* Item 3 */}
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-[12px] bg-red-50 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 text-red-500" strokeWidth={2} />
          </div>
          <div className="flex flex-col pt-0.5">
            <span className="text-[13px] font-extrabold text-[#191C1E] mb-2">Referral Program</span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-md">No Engagement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default CampaignParticipationCard;
