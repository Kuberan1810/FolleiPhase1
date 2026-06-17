import React from 'react';

const LeadNotesCard = () => {
    return (
        <div className="BoxStyle">
            <h2 className="text-[20px] font-bold text-[#191C1E] mb-7">Lead Notes</h2>

            <div className="flex flex-col gap-5">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Add a note ........."
                        className="w-full bg-[#FCFDFE] border border-[#EDF3FD] rounded-[16px] py-5 pl-5 pr-28 text-[13px] font-medium text-[#191C1E] placeholder:text-[#94A3B8] placeholder:text-base placeholder:font-medium focus:outline-none focus:ring-2 focus:ring-[#004370]"
                    />
                    <button className="absolute right-2 top-2 bottom-2 bg-[#004370] text-white px-6 py-2 rounded-[12px] text-[14px] font-medium hover:bg-[#003152] transition-colors shadow-xs cursor-pointer">
                        Add Note
                    </button>
                </div>

                <div className="bg-[#EFF6FF] rounded-[16px] p-5">
                    <p className="text-[16px] text-[#475569] font-medium leading-relaxed mb-4">
                        "Interested in enterprise pricing and custom API volume discounts. Highlight the scalability features in the next call."
                    </p>
                    <div className="flex items-center gap-2 text-[14px] font-medium text-[#94A3B8]">
                        <span > Sarah Wilson</span>
                        <span className="w-1 h-1 rounded-full bg-[#94A3B8]" />
                        <span>14 Jan 2026, 10:15 AM</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LeadNotesCard;
