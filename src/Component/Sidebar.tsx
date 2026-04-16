import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, NetworkIcon } from 'lucide-react';
import { Element4, Profile2User, DocumentText1,Setting } from "iconsax-react"

const Sidebar: React.FC = () => {
    const navItems = [
        { icon: Element4, label: 'Dashboard', path: '/dashboard' },
        { icon: Profile2User, label: 'Customer Insights', path: '/customer-insights' },
        { icon: DocumentText1, label: 'Reports', path: '/reports' },
    ];

    const bottomNavItems = [
        { icon: Setting, label: 'Settings', path: '/settings' },
        { icon: LogOut, label: 'Logout', path: '/logout', isDanger: true },
    ];
    const active = "bg-[#E0F2FE]/60 text-[#075985] font-semibold";
    const inactive = "text-[#64748B] hover:bg-[#E0F2FE]/30 hover:text-[#075985]";

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-50  flex py-2.5 items-center justify-between border-t border-[#E2E8F080] bg-white px-4 lg:hidden font-[Manrope]">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1.5 min-w-[64px] transition-colors 
                        ${isActive
                                ? 'text-[#075985] font-semibold'

                                : 'text-[#64748B]'
                            }`
                        }
                    >
                        <div className='flex  flex-col items-center gap-2'>
                            <item.icon color='currentColor' size={30} />
                            <p className='text-sm md:text-base'>{item.label}</p>
                        </div>
                    </NavLink>
                ))}
            </nav>

            <aside className=" w-64 flex-col border-r border-[#E2E8F080] bg-white   lg:flex items-between hidden h-screen " >
                <div className=" flex items-center gap-3 px-6 py-8">
                    <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#004370] text-white">
                        <NetworkIcon size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[18px] font-bold leading-none text-[#0C4A6E]">LiveTracker</span>
                        <span className=" text-[10px] font-normal tracking-[0.05em] text-[#94A3B8] uppercase">
                            Precision Orchestrator
                        </span>
                    </div>
                </div>

                <div className='flex flex-col justify-between h-screen'>

                    <nav className="flex flex-1 flex-col gap-4 px-4 ">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer rounded-lg
                            ${isActive
                                        ? active
                                        : inactive
                                    }`
                                }
                            >



                                <item.icon color='currentColor' size={22} />
                                <span className='text-base font-[Manrope] font-semibold'>{item.label}</span>


                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto flex flex-col gap-6 px-4 font-[inter] pb-8">
                        <div className="rounded-[16px] border border-[#005B9620] bg-[#005B96]/10 p-5">
                            <div className="text-[14px] font-bold text-[#004370]  tracking-wider">Upgrade Plan</div>
                            <p className="mt-2 text-[12px] leading-relaxed text-[#414750]">
                                Get advanced analytics and automation tools.
                            </p>
                            <button className="mt-4 w-full  rounded-[4px] bg-[#004370] py-[8px] text-center text-[12px] font-semibold text-white cursor-pointer hover:bg-[#004370]/80 transition-all duration-200">
                                Upgrade Now
                            </button>
                        </div>

                        <div className="flex flex-col gap-4">
                            {bottomNavItems.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-3 px-4 py-3 rounded-lg
  ${item.isDanger
                                            ? "text-red-500 hover:bg-red-50"
                                            : isActive
                                                ? "bg-[#E0F2FE60] text-[#075985]"
                                                : "text-[#64748B] hover:bg-[#E0F2FE]/30"
                                        }`
                                    }
                                >
                                    <item.icon color='currentColor' size={22} />
                                    <span className='text-base font-[Manrope] font-semibold'>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
