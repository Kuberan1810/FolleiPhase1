import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Settings, LogOut, NetworkIcon } from 'lucide-react';

const Sidebar: React.FC = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Users, label: 'Customer Insights', path: '/customer-insights' },
        { icon: FileText, label: 'Reports', path: '/reports' },
    ];

    const bottomNavItems = [
        { icon: Settings, label: 'Settings', path: '/settings' },
        { icon: LogOut, label: 'Logout', path: '/logout' },
    ];

    const active = "bg-[#E0F2FE]/50 text-[#075985]";
    const inactive = "text-[#64748B] hover:bg-[#E0F2FE]/50 hover:text-[#075985]";

    return (
        <>
            <nav className="fixed bottom-0 left-0 right-0 z-50  flex py-2.5 items-center justify-between border-t border-[#E2E8F0] bg-white px-4 lg:hidden ">
                {navItems.map((item, index) => (
                    <NavLink
                        key={index}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex flex-col items-center justify-center gap-1.5 min-w-[64px] transition-colors 
                        ${isActive
                                ? 'text-[#075985]'

                                : 'text-[#64748B]'
                            }`
                        }
                    >
                        <div className='flex  flex-col items-center gap-2.5'>
                            <item.icon size={22} />
                            <p className='text-sm md:text-base'>{item.label}</p>
                        </div>
                    </NavLink>
                ))}
            </nav>

            <aside className=" w-64 flex-col border-r border-[#F8FAFC] bg-white  font-['Inter'] lg:flex items-between hidden h-screen py-5" >
                <div className="mb-10 flex items-center gap-3 px-6">
                    <div className="flex h-[32px] w-[32px] items-center justify-center rounded-[4px] bg-[#004370] text-white">
                        <NetworkIcon size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[18px] font-bold leading-none text-[#0C4A6E]">LiveTracker</span>
                        <span className="mt-[10px] text-[10px] font-bold tracking-[0.05em] text-[#94A3B8] uppercase">
                            Precision Orchestrator
                        </span>
                    </div>
                </div>

                <div className='flex flex-col justify-between h-screen'>

                    <nav className="flex flex-1 flex-col gap-1 px-3 ">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                to={item.path}
                                className={({ isActive }) =>
                                    `group relative flex items-center gap-3 px-4 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer 
                            ${isActive
                                        ? active
                                        : inactive
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        {isActive && <div className="absolute left-0 top-1/2 h-10.5 w-[3px] -translate-y-1/2 bg-[#0284C7]"></div>}
                                        <item.icon size={18} className="transition-colors" />
                                        <span>{item.label}</span>
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="mt-auto flex flex-col gap-6 px-4">
                        <div className="rounded-[20px] border border-[#E2E8F0] bg-[#005B96]/10 p-5">
                            <div className="text-[11px] font-bold text-[#004370] uppercase tracking-wider">Upgrade Plan</div>
                            <p className="mt-2 text-[11px] leading-relaxed text-[#64748B]">
                                Get advanced analytics and automation tools.
                            </p>
                            <button className="mt-4 w-full h-[32px] rounded-[2px] bg-[#004370] py-[8px] text-center text-[12px] font-bold text-white">
                                Upgrade Now
                            </button>
                        </div>

                        <div className="flex flex-col gap-[4px] px-2 mb-2">
                            {bottomNavItems.map((item, index) => (
                                <NavLink
                                    key={index}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex cursor-pointer items-center gap-3 px-2 py-2.5 text-[14px] font-medium 
                                ${isActive
                                            ? 'bg-[#F1F5F9] text-[#0F172A]'
                                            : 'text-[#64748B]'
                                        }`
                                    }
                                >
                                    <item.icon size={18} />
                                    <span>{item.label}</span>
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
