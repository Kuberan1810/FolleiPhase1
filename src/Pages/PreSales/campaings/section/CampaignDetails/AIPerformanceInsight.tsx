import React from 'react';
import { Zap, Users, Clock } from 'lucide-react';
import AiContent from '../../../../../assets/icons/ai.svg'
const AIPerformanceInsight: React.FC = () => {
  return (
    <div className="relative p-[1.5px] rounded-[24px] bg-gradient-to-tr from-[#F43F5E] via-[#8B5CF6] to-[#3B82F6] shadow-[0_4px_20px_rgba(0,0,0,0.015)] animate-in fade-in duration-300">
      <div className="bg-white rounded-[22.5px] p-6 space-y-6">

        <div className="flex items-center gap-2.5">
          <img src={AiContent} alt="AI Content" />
          <h3 className="text-[20px] font-semibold text-[#0B1C30] tracking-[-0.2px]">AI Performance Insight</h3>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-[16px] p-5 w-full flex flex-col items-center space-y-4">
            <div className="text-[18px] font-bold text-[#0B1C30] tracking-[-0.3px] w-full text-left">
              Health Score
            </div>

            <div className="relative w-[220px] h-[120px] flex flex-col items-center justify-end overflow-hidden mb-2">
              <svg className="w-[220px] h-[120px] absolute top-0 left-0" viewBox="0 0 220 120">
                <path
                  d="M 15 110 A 95 95 0 0 1 205 110"
                  fill="none"
                  stroke="#E2EAF8"
                  strokeWidth="30"
                />
                <path
                  d="M 15 110 A 95 95 0 0 1 205 110"
                  fill="none"
                  stroke="#004370"
                  strokeWidth="30"
                  strokeDasharray="298.5"
                  strokeDashoffset={298.5 * (1 - 0.94)}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute bottom-2 flex flex-col items-center justify-center">
                <span className="text-[44px] font-black text-[#0B1C30] tracking-[-1.5px] leading-none font-manrope">94%</span>
              </div>
            </div>

            <p className="text-[14px] font-medium text-center text-[#464555] leading-normal px-2">
              Campaign is performing in the top 5% of similar industry flows.
            </p>
          </div>
        </div>

        <div className="bg-[#ECF6FD] border-l-[3.5px] border-[#004370] p-4 ">
          <p className="text-[16px] font-normal text-[#464555] leading-[19px]">
            "This campaign is performing <span className="decoration-[#004370] decoration-2">above average</span>, driven by strong engagement from high intent leads."
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-[10px] font-extrabold text-[#8492A6] uppercase tracking-[1.5px]">Key Discoveries</h4>

          <div className="space-y-3.5">
            <div className="flex items-start gap-3">
              <Zap size={15} className="text-[#004370] shrink-0 mt-0.5" />
              <div className="text-[14px] text-[#475569] leading-snug">
                <div className="font-normal text-[#0B1C30]">WhatsApp 3.5x faster responses than Email</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users size={15} className="text-[#004370] shrink-0 mt-0.5" />
              <div className="text-[14px] text-[#475569] leading-snug">
                <div className="font-normal text-[#0B1C30]">High Intent Leads 78% of conversions</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={15} className="text-[#004370] shrink-0 mt-0.5" />
              <div className="text-[14px] text-[#475569] leading-snug">
                <div className="font-normal text-[#0B1C30]">Peak engagement window: 10 AM - 12 PM</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="text-[10px] font-extrabold text-[#8492A6] uppercase tracking-[1.5px]">Future Predictions</h4>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#F1F5F9] rounded-[12px] p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:border-blue-100 transition-colors duration-200">
              <span className="text-[14px] font-normal text-[#0B1C30]">Expected Conversions</span>
              <span className="text-[20px] font-bold text-[#004370]">55+</span>
            </div>

            <div className="flex items-center justify-between bg-[#F8FAFC] border border-[#F1F5F9] rounded-[12px] p-3.5 shadow-[0_1px_2px_rgba(0,0,0,0.01)] hover:border-slate-200 transition-colors duration-200">
              <span className="text-[14px] font-normal text-[#0B1C30]">Potential Revenue</span>
              <span className="text-[20px] font-bold text-[#0B1C30]">₹7,65,000</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIPerformanceInsight;
