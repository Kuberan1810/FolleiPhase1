import { useState } from 'react';
import { BrainCircuit, RefreshCw } from 'lucide-react';

const IntelligenceAlerts = () => {
    const [autoOn, setAutoOn] = useState(true);


    return (
        <div className=" BoxStyle md:p-8! flex flex-col gap-5">

            {/* Header */}
            <div className="flex items-center gap-2">
                <div className=" rounded-full flex items-center justify-center shrink-0">
                    <BrainCircuit size={24} className='text-[#005B96]' />
                </div>
                <span className="text-[18px] font-bold text-[#191C1E]">AI Override &amp; Intelligence Alerts</span>
            </div>

            {/* Two cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Left – Auto-Schedule with Checkbox */}
                <div className="BoxStyle bg-[#F1F5F940]! border-[#E2E8F0]!  flex flex-col gap-3">

                    {/* Checkbox row */}
                    <button
                        onClick={() => setAutoOn(p => !p)}
                        className="flex items-center gap-3 cursor-pointer group w-full text-left"
                    >
                        {/* Custom checkbox */}
                        <div
                            className={`w-6 h-6 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                ${autoOn
                                    ? 'bg-[#005B96] border-[#005B96]'
                                    : 'bg-white border-[#CBD5E1] group-hover:border-[#005B96]'
                                }`}
                        >
                            {autoOn && (
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                                    <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                        <span className="text-[14px] font-bold text-[#0F172A] uppercase tracking-wider leading-tight">
                            Auto-Schedule Follow-Up
                        </span>
                    </button>

                    <p className="text-[14px] text-[#64748B] leading-relaxed ">
                        Automatically assigns a 48hr re-engagement task if appointment is missed or cancelled without rescheduling.
                    </p>
                </div>

                {/* Right – NLP Alert */}
                <div className="BoxStyle bg-[#F1F5F940]! border-[#E2E8F0]! flex flex-col gap-3">
                    <span className="text-[12px] font-bold text-[#64748B] uppercase tracking-widest">
                        Alert Rule &amp; Logic (Natural Language)
                    </span>
                    <div className='flex lg:flex-row flex-col justify-between gap-6 items-end'>
                        <div className='px-4 py-3 bg-white border border-[#E2E8F0] rounded-lg'>
                            <p className="flex-1 text-[16px] font-medium text-[#005B96] bg-transparent resize-none focus:outline-none leading-relaxed "> Notify admin if lead response exceeds 4 hours</p>
                        </div>
                        <div className="w-full md:w-fit flex text-center items-center">
                            <button className="flex  flex-nowrap items-center justify-center h-[40px] gap-1.5 border border-[#005B96] bg-white hover:bg-[#F2F4F6] text-[#005B96] text-[12px] font-bold  lg:py-3 lg:px-8 py-2 px-6  rounded-lg cursor-pointer transition-colors tracking-wide w-full whitespace-nowrap text-center">
                                <RefreshCw strokeWidth={3} size={14} />
                                SYNC CALENDAR
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IntelligenceAlerts;
