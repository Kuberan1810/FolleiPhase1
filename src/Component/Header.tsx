import React from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Bell, HelpCircle, Settings, NetworkIcon } from 'lucide-react';
import profileImg from '../assets/image.png';

const Header: React.FC = () => {
    const location = useLocation();
    const isSettingsPage = location.pathname.startsWith('/settings');

    return (
        <header className="flex h-16 items-center justify-between 
        px-4 md:px-6 lg:px-8 font-['Inter'] relative">
            {/* Left Section: Mobile Logo */}
            <div className="flex items-center gap-3 md:gap-4 flex-none lg:w-48">
                <div className="flex items-center gap-2.5 lg:hidden">
                    <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#0C4A6E] text-white shrink-0">
                        <NetworkIcon size={14} />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-[13px] md:text-[14px] font-bold text-[#0C4A6E] leading-none truncate">LiveTracker</span>
                        <span className="text-[7px] md:text-[8px] font-bold text-[#94A3B8] uppercase tracking-wider mt-0.5 truncate hidden xs:block">Precision Orchestrator</span>
                    </div>
                </div>
            </div>

            {/* Center Section: Search Bar */}
            <div className={`flex-1 flex justify-center items-center px-2 md:px-4 transition-all duration-300`}>
                <div className={`flex max-w-md w-full items-center gap-3 rounded-[12px] bg-[#F2F4F6] px-3 md:px-4 py-2 hidden sm:flex transition-all duration-300 ${!isSettingsPage ? 'lg:translate-x-[-100px]' : ''}`}>
                    <Search size={18} className="text-[#94A3B8] shrink-0" />
                    <input
                        type="text"
                        placeholder="Search customer, activity or tasks..."
                        className="w-full bg-transparent text-[13px] md:text-[14px] text-[#6B7280] outline-none placeholder:text-[#6B7280]"
                    />
                </div>
            </div>

            {/* Right Section: Actions & Profile */}
            <div className="flex items-center gap-2 md:gap-4 lg:gap-6 flex-none lg:w-auto justify-end">
                <div className="flex items-center gap-3 md:gap-5 lg:gap-8 border-r border-[#E2E8F0] pr-3 md:pr-4 lg:pr-6">
                    <button className="relative p-1 text-[#64748B] sm:hidden hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <Search size={18} />
                    </button>

                    <button className="relative p-1 text-[#64748B] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <Bell size={18} />
                        <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-red-500 border border-white"></span>
                    </button>

                    <button className="p-1 text-[#64748B] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                        <HelpCircle size={18} />
                    </button>

                    <button className={`p-1 transition-all rounded-lg cursor-pointer ${isSettingsPage ? 'text-[#0C4A6E] ' : 'text-[#64748B] '}`}>
                        <Settings size={18} />
                    </button>
                </div>

                <div className="flex items-center gap-2 cursor-pointer shrink-0">
                    <div className="h-[32px] w-[32px] md:h-[36px] md:w-[36px] overflow-hidden rounded-[10px] md:rounded-[12px] border border-[#E2E8F0] bg-slate-100">
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
