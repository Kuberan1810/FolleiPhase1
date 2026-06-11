import React from 'react';
import {
  Clock,
  Sparkles,
  FileText,
  TrendingUp,
  CircleCheck,
  CircleX,
  PhoneCall,
  Smile
} from 'lucide-react';
import { VideoCircle } from 'iconsax-react';

export const CallsDetailedActivity: React.FC = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-[20px] border border-slate-200/60 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <h2 className="text-[20px] font-bold text-slate-800 font-inter mb-6">Detailed Activity</h2>

      <div className="relative ml-2 py-2">
        <div className="relative pl-14 pb-8">
          {/* Timeline Connection Stick */}
          <div className="absolute left-[19px] top-[20px] bottom-[-20px] w-[2px] bg-[#E2E8F0]" />

          <div className='w-5 h-5 rounded-full flex items-center justify-center absolute left-[10px] top-0 text-green-800'>
            <CircleCheck className="w-4 h-4 stroke-[3]" />
          </div>

          {/*Details Container */}
          <div className="flex flex-col border-[1px] border-[#C9DFFF] p-6 rounded-[12px]">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center flex-wrap gap-2.5">
                <span className="font-bold text-[16px] text-slate-800 font-inter">Call Completed</span>

                <span className="inline-flex items-center bg-[#DCFCE7] py-[2px] px-[8px] rounded-[10px] h-[22px] box-border">
                  <span className="font-manrope font-bold text-[10px] text-[#15803D] leading-none uppercase tracking-[0.05em]">
                    INTERESTED
                  </span>
                </span>

                <span className="inline-flex items-center gap-[4px] bg-[#EDF6FF] py-[2px] px-[8px] rounded-[10px] h-[22px] box-border">
                  <Sparkles className="w-3 h-3 text-[#1E40AF]" />
                  <span className="font-manrope font-bold text-[10px] text-[#004370] leading-none">
                    94% Positive
                  </span>
                </span>
              </div>
            </div>
            <span className="text-[12px] text-[#464554] font-manrope mt-3">20 mins • 4 hours ago</span>

            <div className="w-full rounded-[12px] bg-gradient-to-r from-[#4F46E5] via-[#EC4899] to-[#F97316] p-[1.5px] mt-4 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
              <div className="bg-white rounded-[10px] p-5">
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

              <button className="font-manrope font-semibold text-[14px] text-[#004370] border-none bg-transparent flex items-center gap-[6px] cursor-pointer p-0 hover:underline">
                <VideoCircle className="w-4 h-4 " color="#004370" />
                Listen Recording
              </button>
              <button className="font-manrope font-semibold text-[14px] text-[#464554] border-none bg-transparent flex items-center gap-[6px] cursor-pointer p-0 hover:underline">
                <FileText className="w-4 h-4" />
                View Transcript
              </button>
            </div>
            </div>
          </div>

        <div className="relative pl-14">

          <div className='w-5 h-5 rounded-full flex items-center justify-center absolute left-[10px] top-0 text-red-800'>
            <CircleX className="w-4 h-4 stroke-[3]" />
          </div>

          <div className="flex flex-col border-[1px] border-[#C9DFFF] p-6 rounded-[12px]">
            <div className="flex-1 flex flex-col items-start justify-between">
              <span className="font-bold text-[16px] text-[#0B1C30] font-manrope">Missed Call</span>
              <span className="text-[12px] text-[#464554] font-manrope">Incoming • 1 day ago</span>
            </div>
            <p className="font-manrope font-normal text-[16px] leading-[18px] text-[#464554] mt-[6px]">
              Second missed attempt this week. Lead typically active in mornings between 9-11 AM.
            </p>
          </div>
        </div>
      </div>

  );
};

export const CallsInteractionAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200/60 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] h-fit">
      <h2 className="text-[20px] font-bold text-slate-800 font-inter mb-6">Interaction Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#F8FAFC] rounded-[12px] p-5 border border-slate-100/50 flex flex-col justify-between min-h-[128px]">
          <div>
            <div className="flex items-center gap-[6px] font-manrope font-normal text-[12px] leading-none text-[#464555] uppercase">
              <Clock className="w-4 h-4 text-[#004370]" />
              <span>Avg Duration</span>
            </div>
            <div className="text-[28px] font-semibold text-[#0B1C30] font-inter mt-3 leading-none">10m 12s</div>
          </div>
          <div className="inline-flex items-center gap-[4px] font-manrope font-normal text-[10px] leading-[15px] text-[#16A34A] mt-[8px]">
            <TrendingUp className="w-[14px] h-[14px] text-[#16A34A]" />
            <span>+12% vs last week</span>
          </div>
        </div>

        <div className="bg-[#F8FAFC] rounded-[12px] p-5 border border-slate-100/50 flex flex-col justify-between min-h-[128px]">
          <div>
            <div className="flex items-center gap-[6px] font-manrope font-normal text-[12px] leading-none text-[#464555] uppercase">
              <PhoneCall className="w-4 h-4 text-[#004370]" />
              <span>Connect Rate</span>
            </div>
            <div className="text-[28px] font-semibold text-[#0B1C30] font-inter mt-3 leading-none">68 %</div>
          </div>
          <div className="font-manrope font-normal text-[10px] leading-[15px] text-[#464555] mt-[8px]">
            Stable engagement
          </div>
        </div>

        <div className="bg-[#1E1E1E] text-white rounded-[12px] p-5 w-full sm:col-span-2 relative overflow-hidden flex flex-col justify-center shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <div
            className="absolute right-[-15px] top-[-8px] w-[90px] h-[40px] rounded-full opacity-80 pointer-events-none bg-gradient-to-br from-[#4F46E5] via-[#FC4899] to-[#F97316] blur-[20px]"
          />
          <div
            className="absolute bottom-[-80px] w-[150px] h-[90px] rounded-[20px] opacity-80 pointer-events-none bg-gradient-to-br from-[#4F46E5] via-[#FC4899] to-[#F97316] blur-[20px]"
          />
          <div className="relative z-10 flex flex-col justify-between h-full">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-white tracking-wider uppercase font-manrope">
              <Smile className="w-3.5 h-3.5 text-white" />
              Sentiment Analysis
            </div>
            <div className="text-[24px] font-bold text-white leading-none font-inter mt-4">
              Positive
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
