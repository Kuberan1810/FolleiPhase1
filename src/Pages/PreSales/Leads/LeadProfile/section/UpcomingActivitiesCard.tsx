import React from 'react';
import { Phone, Presentation } from 'lucide-react';

const UpcomingActivitiesCard = () => {
  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#EDF3FD]">
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-[16px] font-extrabold text-[#191C1E]">Upcoming Activities</h2>
        <button className="text-[12px] font-bold text-[#004370] hover:underline">+ Add Activity</button>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between bg-[#F7F9FB] rounded-[16px] p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#EAF2FF] flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#004370]" fill="#004370" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#191C1E] mb-0.5">Follow-up Call</span>
              <span className="text-[12px] font-medium text-[#64748B]">Today • 4:00 PM</span>
            </div>
          </div>
          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-md">High Priority</span>
        </div>

        <div className="flex items-center justify-between bg-[#F7F9FB] rounded-[16px] p-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
              <Presentation className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#191C1E] mb-0.5">Product Demo</span>
              <span className="text-[12px] font-medium text-[#64748B]">Tomorrow • 11:00 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UpcomingActivitiesCard;
