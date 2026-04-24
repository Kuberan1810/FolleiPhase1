import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Element4, Profile2User, DocumentText1, Setting, HierarchySquare } from "iconsax-react"
import FolleiLogo from "../assets/logo/FolleiLogo.svg"
import ConfirmLogoutModal from "./ConfirmLogoutModal";


const Sidebar: React.FC = () => {

    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Detect current mode from URL prefix
    const isOutbound = location.pathname.startsWith('/outbound');
    const prefix = isOutbound ? '/outbound' : '/inbound';

    const handleLogoutConfirm = () => {
        setShowConfirmLogout(false);
        navigate('/login');
    };

    const navItems = isOutbound
        ? [
            { icon: Element4, label: 'Dashboard', path: `${prefix}/dashboard` },
            { icon: Profile2User, label: 'Flow Builder', path: `${prefix}/flow-builder` },
            { icon: DocumentText1, label: 'Reports', path: `${prefix}/reports` },
            { icon: HierarchySquare, label: 'Orchestrator', path: `${prefix}/orchestrator` },
            { icon: HierarchySquare, label: 'Campaigns', path: `${prefix}/Campaigns` },
        ]
        : [
            { icon: Element4, label: 'Dashboard', path: `${prefix}/dashboard` },
            { icon: Profile2User, label: 'Flow Builder', path: `${prefix}/flow-builder` },
            { icon: DocumentText1, label: 'Reports', path: `${prefix}/reports` },
            { icon: HierarchySquare, label: 'Orchestrator', path: `${prefix}/orchestrator` },
        ];

    const bottomNavItems = [
        { icon: Setting, label: 'Settings', path: '/settings' },
        { icon: LogOut, label: 'Logout', path: '/logout', isDanger: true },
    ];

    const active = "bg-[#E0F2FE]/60 text-[#075985] font-semibold";
    const inactive = "text-[#64748B] hover:bg-[#E0F2FE]/30 hover:text-[#075985]";

    return (
        <>
            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex py-5 items-center justify-between border-t border-[#E2E8F080] bg-white px-4 lg:hidden font-[Manrope]">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1.5 min-w-[64px] transition-colors cursor-pointer 
                        ${isActive ? 'text-[#075985] font-semibold' : 'text-[#64748B]'}`
                        }
                    >
                        <div className='flex flex-col items-center gap-2'>
                            <item.icon color='currentColor' size={30} />
                            {/* <p className='text-sm md:text-base'>{item.label}</p> */}
                        </div>
                    </NavLink>
                ))}
            </nav>

            {/* Desktop Sidebar */}
            <aside className="w-64 flex-col border-r border-[#E2E8F080] bg-white lg:flex items-between hidden h-screen">
                <div className="flex items-center gap-3 px-6 py-8">
                    <div className='w-28'>
                        <img src={FolleiLogo} alt="FolleiLogo" />
                    </div>
                </div>

                <div className='flex flex-col justify-between h-screen gap-5 scrollbar-hide overflow-scroll '>
                    <nav className="flex flex-1 flex-col gap-4 px-4">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer rounded-lg
                            ${isActive ? active : inactive}`
                                }
                            >
                                {({ isActive }: { isActive: boolean }) => (
                                    <>
                                        <item.icon color='currentColor' size={22} />
                                        <span className='text-base font-[Manrope] font-semibold'>{item.label}</span>


                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto flex flex-col gap-6 px-4 font-[inter] pb-8">
                        <div className="rounded-[16px] border border-[#005B9620] bg-[#005B96]/10 p-5">
                            <div className="text-[14px] font-bold text-[#004370] tracking-wider">Upgrade Plan</div>
                            <p className="mt-2 text-[12px] leading-relaxed text-[#414750]">
                                Get advanced analytics and automation tools.
                            </p>
                            <button className="mt-4 w-full rounded-[4px] bg-[#004370] py-[8px] text-center text-[12px] font-semibold text-white cursor-pointer hover:bg-[#004370]/80 transition-all duration-200">
                                Upgrade Now
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {bottomNavItems.map((item, index) => (
                                item.isDanger ? (
                                    <button
                                        key={index}
                                        onClick={() => setShowConfirmLogout(true)}
                                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 w-full cursor-pointer transition-colors duration-200"
                                    >
                                        <item.icon color='currentColor' size={22} />
                                        <span className='text-base font-[Manrope] font-semibold'>{item.label}</span>
                                    </button>
                                ) : (
                                    <NavLink
                                        key={index}
                                        to={item.path}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
  ${isActive ? "bg-[#E0F2FE60] text-[#075985]" : "text-[#64748B] hover:bg-[#E0F2FE]/30"}`
                                        }
                                    >
                                        <item.icon color='currentColor' size={22} />
                                        <span className='text-base font-[Manrope] font-semibold'>{item.label}</span>
                                    </NavLink>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {showConfirmLogout && (
                <ConfirmLogoutModal
                    onConfirm={handleLogoutConfirm}
                    onCancel={() => setShowConfirmLogout(false)}
                />
            )}
        </>
    );
};

export default Sidebar;
