import React from 'react';

const LeadNotesCard = () => {
  return (
    <div className="bg-white rounded-[20px] p-6 sm:p-8 border border-[#EDF3FD]">
      <h2 className="text-[16px] font-extrabold text-[#191C1E] mb-7">Lead Notes</h2>
      
      <div className="flex flex-col gap-5">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Add a note ........." 
            className="w-full bg-[#F7F9FB] border border-[#EDF3FD] rounded-[16px] py-4 pl-5 pr-28 text-[13px] font-medium text-[#191C1E] placeholder:text-[#A0B0C0] focus:outline-none focus:ring-1 focus:ring-[#004370]"
          />
          <button className="absolute right-2 top-2 bottom-2 bg-[#004370] text-white px-5 rounded-[12px] text-[12px] font-bold hover:bg-[#003152] transition-colors shadow-sm cursor-pointer">
            Add Note
          </button>
        </div>

        <div className="bg-[#F7F9FB] rounded-[16px] p-5">
          <p className="text-[13px] text-[#434655] font-medium leading-relaxed mb-4">
            "Interested in enterprise pricing and custom API volume discounts. Highlight the scalability features in the next call."
          </p>
          <div className="flex items-center gap-2 text-[11px] font-bold text-[#64748B]">
            <span className="text-[#004370]">Sarah Wilson</span>
            <span className="w-1 h-1 rounded-full bg-[#A0B0C0]" />
            <span>14 Jan 2026, 10:15 AM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LeadNotesCard;
