import { Search, NetworkIcon, X } from 'lucide-react';
import { NotificationBing, InfoCircle, Setting } from "iconsax-react"
import profileImg from '../assets/image.png';
import SaasSearch from './Search';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import FolleiLogo from "../assets/follei-tagline.svg"
import { useState } from 'react';
import { useSalesContext } from '../Context/SalesContext';



const Header: React.FC = () => {
    const { salesMode } = useSalesContext();
    const location = useLocation();
    const navigate = useNavigate();
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    // Get the current page segment (dashboard, flow-builder, reports, orchestrator)
    const segments = location.pathname.split('/').filter(Boolean);
    // Path structure: /:salesMode/:page
    const currentPage = segments[1] ?? 'dashboard'; 

    const handleToggle = (type: 'presales' | 'postsales') => {
        let targetPage = currentPage;
        if (type === 'presales') {
            const forbiddenInbound = ['campaigns', 'customer', 'cadences'];
            if (forbiddenInbound.includes(targetPage.toLowerCase())) {
                targetPage = 'dashboard';
            }
            navigate(`/presales/${targetPage}`);
        } else {
            navigate(`/postsales/${targetPage}`);
        }
    };

    return (
        <header className="relative flex items-center gap-5 justify-between bg-[#F7F9FB] px-4 lg:px-6 font-['Manrope'] py-5">
            {/* Mobile Search Overlay */}
            {showMobileSearch && (
                <div className="absolute inset-0 z-50 flex items-center justify-between bg-[#F7F9FB] px-4 md:hidden">
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
                    <Link to={salesMode === 'postsales' ? `/postsales/dashboard` : `/presales/dashboard`} className='lg:w-36 md:w-32 w-28 cursor-pointer'>
                        <img src={FolleiLogo} alt="FolleiLogo" />
                    </Link>
                </div>

                {/* Search */}
                <div className="relative w-full  hidden md:block">
                    <SaasSearch />
                </div>
            </div>

            <div className='flex lg:gap-20 md:gap-16 sm:gap-10 gap-5'>


                <div className="flex items-center gap-3 lg:gap-6">
                    <div className="flex items-center gap-2 lg:gap-3">
                        {/* Mobile search trigger */}
                        <button
                            onClick={() => setShowMobileSearch(true)}
                            className="p-2.5 text-[#64748B] hover:bg-[#EFF4FF] rounded-full cursor-pointer duration-300 md:hidden block"
                        >
                            <Search size={24} />
                        </button>
                        {/* Notification bell */}
                        <button
                            onClick={() => { navigate("/notifications") }}
                            className="relative p-2.5 text-[#64748B] hover:bg-[#EFF4FF] rounded-full cursor-pointer duration-300">
                            <NotificationBing color='currentColor' size={24} />
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-[#F7F9FB] duration-300"></span>
                        </button>
                        {/* Divider */}
                        <div className="h-6 w-px bg-[#E2E8F0] mx-1 hidden sm:block" />
                        {/* Profile avatar */}
                        <button
                            onClick={() => { navigate("/settings/profile") }}
                            className="h-[36px] w-[36px] overflow-hidden rounded-full border border-[#E2E8F0] bg-slate-100 cursor-pointer">
                            <img
                                src={profileImg}
                                alt="User profile"
                                className="h-full w-full object-cover"
                            />
                        </button>
                        {/* Grid dots with gradient — far right */}
                        <button className="p-2.5 rounded-full cursor-pointer duration-300 hover:bg-[#EFF4FF] hidden sm:block">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="2" fill="url(#dotGrad)"/>
                                <circle cx="10" cy="4" r="2" fill="url(#dotGrad)"/>
                                <circle cx="16" cy="4" r="2" fill="url(#dotGrad)"/>
                                <circle cx="4" cy="10" r="2" fill="url(#dotGrad)"/>
                                <circle cx="10" cy="10" r="2" fill="url(#dotGrad)"/>
                                <circle cx="16" cy="10" r="2" fill="url(#dotGrad)"/>
                                <circle cx="4" cy="16" r="2" fill="url(#dotGrad)"/>
                                <circle cx="10" cy="16" r="2" fill="url(#dotGrad)"/>
                                <circle cx="16" cy="16" r="2" fill="url(#dotGrad)"/>
                                <defs>
                                    <linearGradient id="dotGrad" x1="0" y1="0" x2="1" y2="1" gradientUnits="objectBoundingBox">
                                        <stop offset="0%" stopColor="#004370"/>
                                        <stop offset="100%" stopColor="#0080D6"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
