import React from 'react';
import { Search, Bell, HelpCircle, Settings, NetworkIcon } from 'lucide-react';
import profileImg from '../assets/image.png';

const Header: React.FC = () => {
    return (
        <header className="flex h-16 items-center justify-between border-b border-[#E2E8F0] bg-white px-4 lg:px-8 font-['Inter'] ">
            <div className="flex items-center gap-4 flex-1">

                <div className="flex items-center gap-2.5 lg:hidden">
                    <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#0C4A6E] text-white ">
                        <NetworkIcon size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#0C4A6E] leading-none">LiveTracker</span>
                        <span className="text-[8px] font-bold text-[#94A3B8] uppercase tracking-wider mt-1">Precision Orchestrator</span>
                    </div>
                </div>

                <div className="flex max-w-md w-[488px] items-center gap-3 rounded-[12px] bg-[#F2F4F6] px-4 py-2 hidden sm:flex lg:ml-0 ml-4">
                    <Search size={18} className="text-[#94A3B8] shrink-0" />
                    <input
                        type="text"
                        placeholder="Search customer documentation..."
                        className="w-full bg-transparent text-[14px] text-[#6B7280] outline-none placeholder:text-[#6B7280]"
                    />
                </div>
            </div>

            <div className="flex items-center gap-3 lg:gap-6">
                <div className="flex items-center gap-[18px] lg:gap-[32px] border-r border-[#E2E8F0] pr-3 lg:pr-6">
                    <button className="relative p-1.5 text-[#64748B] sm:hidden">
                        <Search size={20} />
                    </button>

                    <button className="relative p-1.5 text-[#64748B]">
                        <Bell size={20} />
                        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 border-2 border-white"></span>
                    </button>

                    <button className="p-1.5 text-[#64748B] ">
                        <HelpCircle size={20} />
                    </button>

                    <button className="p-1.5 text-[#64748B] ">
                        <Settings size={20} />
                    </button>
                </div>

                <div className="flex items-center gap-2 cursor-pointer shrink-0">
                    <div className="h-[36px] w-[36px] overflow-hidden rounded-[12px] border border-[#E2E8F0] bg-slate-100">
                        <img
                            src={profileImg}
                            alt="User profile"
                            className="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
