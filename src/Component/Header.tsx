import { Search, NetworkIcon } from 'lucide-react';
import { NotificationBing, InfoCircle, Setting } from "iconsax-react"
import profileImg from '../assets/image.png';
import SaasSearch from './Search';
import { useLocation, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isOutbound = location.pathname.startsWith('/outbound');

    // Get the current page segment (dashboard, flow-builder, reports, orchestrator)
    // so toggling preserves the current page
    const segments = location.pathname.split('/').filter(Boolean);
    const currentPage = segments[1] ?? 'dashboard'; // e.g. "flow-builder"

    const handleToggle = (mode: 'inbound' | 'outbound') => {
        navigate(`/${mode}/${currentPage}`);
    };

    return (
        <header className="flex items-center justify-between border-b border-[#E2E8F080] bg-white px-4 lg:px-6 font-['Manrope'] py-5">
            <div className="flex items-center gap-4 flex-1">

                <div className="flex items-center gap-2.5 lg:hidden">
                    <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#0C4A6E] text-white">
                        <NetworkIcon size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#0C4A6E] leading-none">LiveTracker</span>
                        <span className="text-[8px] font-bold text-[#94A3B8] uppercase tracking-wider mt-1">Precision Orchestrator</span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-[400px] hidden md:block">
                    <SaasSearch />
                </div>
            </div>

            <div className='flex gap-20'>
                {/* Inbound / Outbound Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleToggle('inbound')}
                        className={`h-[38px] sm:h-[44px] px-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                            !isOutbound
                            ? 'bg-[#014370] text-white hover:bg-[#013254]'
                            : 'bg-[#E5ECF1] text-gray-800 border border-gray-200/50 hover:bg-gray-200 shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]'
                        }`}
                    >
                        In Bound
                    </button>
                    <button
                        onClick={() => handleToggle('outbound')}
                        className={`h-[38px] sm:h-[44px] px-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                            isOutbound
                            ? 'bg-[#014370] text-white hover:bg-[#013254]'
                            : 'bg-[#E5ECF1] text-gray-800 border border-gray-200/50 hover:bg-gray-200 shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]'
                        }`}
                    >
                        Out Bound
                    </button>
                </div>

                <div className="flex items-center gap-3 lg:gap-6">
                    <div className="flex items-center gap-4 lg:gap-5 border-r border-[#E2E8F0] pr-3 lg:pr-6">
                        <button className="p-2.5 text-[#64748B] hover:bg-[#F2F4F6] rounded-full cursor-pointer duration-300 sm:hidden block">
                            <Search size={24} />
                        </button>

                        <button className="relative p-2.5 text-[#64748B] hover:bg-[#F2F4F6] rounded-full cursor-pointer duration-300">
                            <NotificationBing color='currentColor' size={24} />
                            <span className="absolute top-2 h-3 w-3 rounded-full bg-red-500 border-2 border-white duration-300"></span>
                        </button>

                        <button className="p-2.5 text-[#64748B] hover:bg-[#F2F4F6] rounded-full cursor-pointer duration-300 hidden sm:block">
                            <InfoCircle color='currentColor' size={24} />
                        </button>

                        <button className="p-2.5 text-[#64748B] hover:bg-[#F2F4F6] rounded-full cursor-pointer duration-300 sm:hidden block">
                            <Setting color='currentColor' size={24} />
                        </button>
                    </div>

                    <div className="flex items-center gap-2 cursor-pointer shrink-0">
                        <div className="h-[36px] w-[36px] overflow-hidden rounded-full border border-[#E2E8F0] bg-slate-100">
                            <img
                                src={profileImg}
                                alt="User profile"
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
