import React from 'react';
import { Sparkles } from 'lucide-react';
import type { AiInsightInfo } from '../../types';

interface AiInsightSectionProps {
  aiInsight?: AiInsightInfo;
}

export const AiInsightSection: React.FC<AiInsightSectionProps> = ({
  aiInsight = {
    summary:
      'Lead has viewed the Digital Marketing course page multiple times and recently attended a demo. Follow up recommended regarding batch timings.',
    recommendedAction: 'Follow up on pricing interest',
    why: 'Lead viewed the fee details twice and asked about payment options.',
  },
}) => {
  return (
    <div className="rounded-[19px] border border-[#F0FFBE] bg-[#FEFFF8] p-5 sm:p-6 shadow-2xs">
      {/* Title */}
      <div className="flex items-center gap-2">
        <svg
          className="size-5 text-[#7A9601]"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.5 2C9.5 2 10.5 6.5 13.5 9.5C16.5 12.5 21 13.5 21 13.5C21 13.5 16.5 14.5 13.5 17.5C10.5 20.5 9.5 25 9.5 25C9.5 25 8.5 20.5 5.5 17.5C2.5 14.5 -2 13.5 -2 13.5C-2 13.5 2.5 12.5 5.5 9.5C8.5 6.5 9.5 2 9.5 2Z" transform="scale(0.7) translate(2, 2)" />
          <path d="M19 2C19 2 19.5 4.5 21 6C22.5 7.5 25 8 25 8C25 8 22.5 8.5 21 10C19.5 11.5 19 14 19 14C19 14 18.5 11.5 17 10C15.5 8.5 13 8 13 8C13 8 15.5 7.5 17 6C18.5 4.5 19 2 19 2Z" transform="scale(0.5) translate(18, 0)" />
        </svg>
        <h2 className="text-[20px] text-[#1B1B24] tracking-tight">
          AI Insight
        </h2>
      </div>

      {/* Summary Description */}
      <p className="mt-3 text-[16px] leading-relaxed text-[#464555]">
        {aiInsight.summary}
      </p>

      {/* Dual Insights Cards*/}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {/* Recommended Action */}
        <div className="rounded-[12px] border border-[#EFEFF3] bg-white/80 p-4">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#545F73]">
            Recommended Action
          </span>
          <p className="mt-1.5 text-[14px] text-[#1B1B24]">
            {aiInsight.recommendedAction}
          </p>
        </div>

        {/* Why */}
        <div className="rounded-[12px] border border-[#EFEFF3] bg-white/80 p-4">
          <span className="text-[12px] font-bold uppercase tracking-wider text-[#545F73]">
            Why
          </span>
          <p className="mt-1.5 text-[14px] text-[#1B1B24]">
            {aiInsight.why}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiInsightSection;
