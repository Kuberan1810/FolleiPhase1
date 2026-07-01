import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Smile,
  FileText,
  Check,
  AlarmClock,
  PhoneCall
} from 'lucide-react';
import { VideoCircle } from 'iconsax-react';


const MeetingsDetailedActivity = () => {
  return (
    <div className="lg:col-span-2 bg-white rounded-[20px] border border-slate-200/60 p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
      <h2 className="text-[20px] font-bold text-slate-800 mb-4 sm:mb-6">Detailed Activity</h2>

      <div className="relative ml-2 py-2">
        <div className="relative pl-10 sm:pl-14 pb-6 sm:pb-8">

          <div className='w-5 h-5 rounded-full flex items-center justify-center absolute left-[6px] sm:left-[10px] top-[8px] bg-[#15803D] text-white border-2 border-[#E2E8F0] z-10'>
            <Check className="w-3 h-3 stroke-[2]" />
          </div>

          {/* Details Container */}
          <div className="flex flex-col border-[1px] border-[#C9DFFF] p-4 sm:p-6 rounded-[16px] sm:rounded-[24px]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center flex-wrap gap-2.5">
                <span className="font-bold text-[15px] sm:text-[18px] text-[#0B1C30] font-manrope">Meeting name</span>

                <span className="inline-flex items-center bg-[#DCFCE7] py-[2px] px-[8px] rounded-[10px] h-[22px] box-border">
                  <span className="font-manrope font-bold text-[10px] text-[#15803D] leading-none uppercase tracking-[0.05em]">
                    INTERESTED
                  </span>
                </span>
              </div>

              <span className="inline-flex items-center gap-[4px] bg-[#EDF6FF] py-[2px] px-[8px] rounded-[10px] h-[22px] box-border w-fit">
                <Sparkles className="w-3 h-3 text-[#004370]" />
                <span className="font-manrope font-bold text-[10px] sm:text-[12px] text-[#004370] leading-none">
                  94% Positive
                </span>
              </span>
            </div>
            <span className="text-[12px] text-[#464554] font-manrope mt-2">42 mins • 4 hours ago</span>

            <div className="w-full rounded-[16px] bg-gradient-to-r from-[#4F46E5] via-[#EC4899] to-[#F97316] p-[1.5px] mt-4 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
              <div className="bg-white rounded-[14px] sm:rounded-[16px] p-4 sm:p-5">
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-[11px] sm:text-[12px] font-bold text-[#004370] tracking-wider uppercase font-manrope">
                    AI SUMMARY
                  </span>
                </div>
                <ul className="list-disc pl-6 font-manrope font-normal text-[14px] sm:text-[16px] leading-[20px] sm:leading-[22px] text-[#0B1C30] text-justify space-y-1">
                  <li>Customer showed strong interest in Enterprise Plan.</li>
                  <li>Asked about pricing and onboarding timeline.</li>
                  <li>Requested custom integrations.</li>
                </ul>
              </div>
            </div>
            <div className="flex items-center flex-wrap gap-4 sm:gap-6 mt-4 sm:mt-5">
              <button className="font-manrope font-semibold text-[13px] sm:text-[14px] text-[#004370] border-none bg-transparent flex items-center gap-[6px] cursor-pointer p-0 hover:underline">
                <VideoCircle className="w-4 h-4 " color="#004370" />
                Listen Recording
              </button>
              <button className="font-manrope font-semibold text-[13px] sm:text-[14px] text-[#464554] border-none bg-transparent flex items-center gap-[6px] cursor-pointer p-0 hover:underline">
                <FileText className="w-4 h-4" />
                View Transcript
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const MeetingsInteractionAnalytics: React.FC = () => {
  return (
    <div className="bg-white rounded-[20px] border border-slate-200/60 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.01)] h-fit">
      <h2 className="text-[20px] font-bold text-slate-800 mb-6">Interaction Analytics</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#F7F9FB] rounded-[8px] p-4 flex flex-col justify-between min-h-[128px]">
          <div>
            <div className="flex items-center gap-[6px] font-manrope font-normal text-[12px] text-[#464555] uppercase">
              <AlarmClock className='w-4 h-4 ' color='#003470' />
              <span>AVG DURATION</span>
            </div>
            <div className="text-[24px] font-semibold text-[#0B1C30] mt-3 leading-none">46 min</div>
          </div>
          <div className="inline-flex items-center gap-[4px] font-normal text-[10px] text-[#16A34A]">
            <TrendingUp className="w-[14px] h-[14px] text-[#16A34A]" />
            <span>12% vs last </span>
          </div>
        </div>

        <div className="bg-[#F7F9FB] rounded-[8px] p-4 flex flex-col justify-between min-h-[128px]">
          <div>
            <div className="flex items-center gap-[6px] text-[12px] text-[#464555] uppercase">
              <PhoneCall className='w-4 h-4 ' color='#003470' />
              <span>Connect Rate</span>
            </div>
            <div className="text-[24px] font-semibold text-[#0B1C30] mt-3 leading-none">68%</div>
          </div>
          <div className="font-normal text-[10px] text-[#464555]">
            Stable Engagement
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

export { MeetingsDetailedActivity, MeetingsInteractionAnalytics };