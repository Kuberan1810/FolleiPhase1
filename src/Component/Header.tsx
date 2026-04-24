import { Search, NetworkIcon, X } from 'lucide-react';
import { NotificationBing, InfoCircle, Setting } from "iconsax-react"
import profileImg from '../assets/image.png';
import SaasSearch from './Search';
import { useLocation, useNavigate } from 'react-router-dom';
import FolleiLogo from "../assets/logo/FolleiLogo.svg"
import { useState } from 'react';


const Header: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    const isOutbound = location.pathname.startsWith('/outbound');

    // Get the current page segment (dashboard, flow-builder, reports, orchestrator)
    // so toggling preserves the current page
    const segments = location.pathname.split('/').filter(Boolean);
    const currentPage = segments[1] ?? 'dashboard'; // e.g. "flow-builder"

    const handleToggle = (mode: 'inbound' | 'outbound') => {
        let targetPage = currentPage;
        if (mode === 'inbound' && targetPage.toLowerCase() === 'campaigns') {
            targetPage = 'dashboard';
        }
        navigate(`/${mode}/${targetPage}`);
    };

    return (
        <header className="relative flex items-center gap-5 justify-between border-b border-[#E2E8F080] bg-white px-4 lg:px-6 font-['Manrope'] py-5">
            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <div className="absolute inset-0 z-50 flex items-center justify-between bg-white px-4 md:hidden">
                    <div className="flex-1 w-full">
                        <SaasSearch />
                    </div>
                    <button onClick={() => setShowMobileSearch(false)} className="ml-3 p-2 text-[#64748B] hover:bg-[#F2F4F6] rounded-full duration-300">
                        <X size={24} />
                    </button>
                </div>
            )}

            <div className="flex items-center gap-4 flex-1">

                <div className="flex items-center gap-2.5 lg:hidden">
                    <div className='lg:w-28  md:w-24 w-20'>
                        <img src={FolleiLogo} alt="FolleiLogo" />
                    </div>
                </div>

                {/* Search */}
                <div className="relative w-full  hidden md:block">
                    <SaasSearch />
                </div>
            </div>

            <div className='flex lg:gap-20 md:gap-16 sm:gap-10 gap-5'>
                {/* Inbound / Outbound Toggle */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => handleToggle('inbound')}
                        className={`h-[38px] sm:h-[44px] px-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${!isOutbound
                                ? 'bg-[#014370] text-white hover:bg-[#013254]'
                                : 'bg-[#E5ECF1] text-gray-800 border border-gray-200/50 hover:bg-gray-200 shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]'
                            }`}
                    >
                        In Bound
                    </button>
                    <button
                        onClick={() => handleToggle('outbound')}
                        className={`h-[38px] sm:h-[44px] px-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${isOutbound
                                ? 'bg-[#014370] text-white hover:bg-[#013254]'
                                : 'bg-[#E5ECF1] text-gray-800 border border-gray-200/50 hover:bg-gray-200 shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]'
                            }`}
                    >
                        Out Bound
                    </button>
                </div>

                <div className="flex items-center gap-3 lg:gap-6">
                    <div className="flex items-center gap-4 lg:gap-5 border-r border-[#E2E8F0] pr-3 lg:pr-6">
                        <button 
                            onClick={() => setShowMobileSearch(true)}
                            className="p-2.5 text-[#64748B] hover:bg-[#F2F4F6] rounded-full cursor-pointer duration-300 md:hidden block"
                        >
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
