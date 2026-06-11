import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Smile,
} from 'lucide-react';

export const EmailsDetailedActivity: React.FC = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-[20px] border border-slate-200/60 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <h2 className="text-[20px] font-bold text-slate-800 font-manrope mb-6">Detailed Activity</h2>

      <div className="relative ml-2 py-2">
        <div className="relative pl-14 pb-8">
          {/* Timeline Connection Stick */}
          <div className="absolute left-[19px] top-[10px] bottom-[-20px] w-[2px] bg-[#E2E8F0]" />

          <div className='w-5 h-5 rounded-full flex items-center justify-center absolute left-[10px] top-[8px] bg-[#15803D] text-white border-2 border-[#E2E8F0] z-10'>
          </div>

          {/* Details Container */}
          <div className="flex flex-col border-[1px] border-[#C9DFFF] p-6 rounded-[24px]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center flex-wrap gap-2.5">
                <span className="font-bold text-[18px] text-[#0B1C30] font-manrope">Email Opened</span>

                <span className="inline-flex items-center bg-[#DCFCE7] py-[2px] px-[8px] rounded-[10px] h-[22px] box-border">
                  <span className="font-manrope font-bold text-[10px] text-[#15803D] leading-none uppercase tracking-[0.05em]">
                    INTERESTED
                  </span>
                </span>
              </div>

              <span className="inline-flex items-center gap-[4px] bg-[#EDF6FF] py-[2px] px-[8px] rounded-[10px] h-[22px] box-border">
                <Sparkles className="w-3 h-3 text-[#004370]" />
                <span className="font-manrope font-bold text-[12px] text-[#004370] leading-none">
                  94% Positive
                </span>
              </span>
            </div>
            <span className="text-[12px] text-[#464554] font-manrope mt-2">20 mins • 4 hours ago</span>

            <div className="w-full rounded-[16px] bg-gradient-to-r from-[#4F46E5] via-[#EC4899] to-[#F97316] p-[1.5px] mt-4 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
              <div className="bg-white rounded-[14px] p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[12px] font-bold text-[#004370] tracking-wider uppercase font-manrope">
                    AI SUMMARY
                  </span>
                </div>
                <p className="font-manrope font-normal text-[16px] leading-[20px] text-[#0B1C30] text-justify">
                  Lead expressed strong interest in Enterprise scaling features. Concerned about integration support for legacy systems.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative pl-14">
          <div className="w-5 h-5 rounded-full bg-[#1a46bc] border-2 border-[#E2E8F0] z-10 flex items-center justify-center absolute left-[10px] top-[10px]" />

          <div className="flex flex-col border-[1px] border-[#C9DFFF] p-6 rounded-[24px]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center flex-wrap gap-2.5">
                <span className="font-bold text-[18px] text-[#0B1C30] font-manrope">Email Opened</span>

                <span className="inline-flex items-center bg-[#2C2ABC]/10 py-[2px] px-[8px] rounded-[10px] h-[22px] box-border">
                  <span className="font-manrope font-bold text-[10px] text-[#2C2ABC] leading-none uppercase tracking-[0.05em]">
                    ENGAGED
                  </span>
                </span>
              </div>
            </div>
            <span className="text-[12px] text-[#464554] font-manrope mt-2">20 mins • 4 hours ago</span>

            <div className="w-full rounded-[16px] bg-gradient-to-r from-[#4F46E5] via-[#EC4899] to-[#F97316] p-[1.5px] mt-4 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
              <div className="bg-white rounded-[16px] p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[12px] font-bold text-[#004370] tracking-wider uppercase font-manrope">
                    AI SUMMARY
                  </span>
                </div>
                <p className="font-manrope font-normal text-[16px] leading-[20px] text-[#0B1C30] text-justify">
                  Lead expressed strong interest in Enterprise scaling features. Concerned about integration support for legacy systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EmailsInteractionAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200/60 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] h-fit">
      <h2 className="text-[20px] font-bold text-slate-800 font-manrope mb-6">Interaction Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#F7F9FB] rounded-[8px] p-4 flex flex-col justify-between min-h-[128px]">
          <div>
            <div className="flex items-center gap-[6px] font-manrope font-normal text-[12px] text-[#464555] uppercase">
              <span>Open Rate</span>
            </div>
            <div className="text-[24px] font-semibold text-[#0B1C30] mt-3 leading-none">84 %</div>
          </div>
          <div className="inline-flex items-center gap-[4px] font-manrope font-normal text-[10px] text-[#16A34A]">
            <TrendingUp className="w-[14px] h-[14px] text-[#16A34A]" />
            <span>12%</span>
          </div>
        </div>

        <div className="bg-[#F7F9FB] rounded-[8px] p-4 flex flex-col justify-between min-h-[128px]">
          <div>
            <div className="flex items-center gap-[6px] font-manrope font-normal text-[12px] text-[#464555] uppercase">
              <span>Reply Rate</span>
            </div>
            <div className="text-[24px] font-semibold text-[#0B1C30] mt-3 leading-none">75 %</div>
          </div>
          <div className="font-manrope font-normal text-[10px] text-[#16A34A] mt-[8px]">
            Strong
          </div>
        </div>

        <div className="bg-[#1E1E1E] text-white rounded-[12px] p-5 w-full sm:col-span-2 relative overflow-hidden flex flex-col justify-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div
            className="absolute right-[-15px] top-[-8px] w-[90px] h-[40px] rounded-full opacity-80 pointer-events-none bg-gradient-to-br from-[#4F46E5] via-[#FC4899] to-[#F97316] blur-[20px]"
          />

          <div
            className="absolute bottom-[-70px] w-[150px] h-[90px] rounded-[20px] opacity-80 pointer-events-none bg-gradient-to-br from-[#4F46E5] via-[#FC4899] to-[#F97316] blur-[20px]"
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-white tracking-wider uppercase font-manrope">
              <Smile className="w-3.5 h-3.5 text-white" />
              Sentiment Analysis
            </div>
            <div className="text-[24px] font-bold text-white leading-none font-manrope mt-4">
              Positive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
