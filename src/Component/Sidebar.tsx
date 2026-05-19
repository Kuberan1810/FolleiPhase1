import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { LogOut, Megaphone } from 'lucide-react';
import { Element4, Profile2User, DocumentText1, Setting, HierarchySquare, DirectInbox, Diagram } from "iconsax-react"
import FolleiLogo from "../assets/logo/FolleiLogo.svg"
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import ModeBottomSheet from './ModeBottomSheet';
import { Radio, Send, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BtnCom from './BtnCom';
import { Sparkles } from 'lucide-react';


import { useSalesContext } from '../Context/SalesContext';

const Sidebar: React.FC = () => {
    const { salesMode } = useSalesContext();
    const [showConfirmLogout, setShowConfirmLogout] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const [showModeSheet, setShowModeSheet] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = (e: any) => {
            const target = e.target;
            if (!target.scrollTop && target !== document.documentElement) return;

            const currentScrollY = target.scrollTop || window.scrollY;
            const deltaY = currentScrollY - lastScrollY;

            if (deltaY > 20 && currentScrollY > 50) {
                setIsVisible(false); // Hide on scroll down
            } else if (deltaY < -10) {
                setIsVisible(true); // Show on light scroll up
            }
            setLastScrollY(currentScrollY);
        };

        document.addEventListener('scroll', handleScroll, { capture: true, passive: true });
        return () => document.removeEventListener('scroll', handleScroll, { capture: true });
    }, [lastScrollY]);

    // Detect current type from URL
    const segments = location.pathname.split('/').filter(Boolean);
    const currentPage = segments[1] ?? 'dashboard';

    const handleModeToggle = (mode: 'presales' | 'postsales') => {
        let targetPage = currentPage;

        if (mode === 'presales') {
            const forbiddenInbound = ['campaigns', 'customer', 'cadences'];
            if (forbiddenInbound.includes(targetPage.toLowerCase())) {
                targetPage = 'dashboard';
            }
            navigate(`/presales/${targetPage}`);
        } else {
            navigate(`/postsales/${targetPage}`);
        }
    };

    const prefix = `/${salesMode}`;

    const handleLogoutConfirm = () => {
        setShowConfirmLogout(false);
        navigate('/login');
    };

    let navItems: any[] = [];

    if (salesMode === 'postsales') {
        navItems = [
            { icon: Element4, label: 'Dashboard', path: `${prefix}/dashboard` },
            { icon: DirectInbox, label: 'Inbox', path: `${prefix}/inbox` },
            { icon: Profile2User, label: 'Leads', path: `${prefix}/leads` },
            { icon: Megaphone, label: 'Campaign', path: `${prefix}/campaign` },
            { icon: Layers, label: 'Cadences', path: `${prefix}/cadences` },
            { icon: Diagram, label: 'Analytics', path: `${prefix}/analytics` },
        ];
    } else {
        navItems = [
            { icon: Element4, label: 'Dashboard', path: `${prefix}/dashboard` },
            { icon: DirectInbox, label: 'Inbox', path: `${prefix}/inbox` },
            { icon: Profile2User, label: 'Leads', path: `${prefix}/leads` },
            { icon: Megaphone, label: 'Campaign', path: `${prefix}/campaign` },
            { icon: Layers, label: 'Cadences', path: `${prefix}/cadences` },
            { icon: Diagram, label: 'Analytics', path: `${prefix}/analytics` },
        ];
    }

    const bottomNavItems = [
        { icon: Setting, label: 'Settings', path: '/settings' },
        { icon: LogOut, label: 'Logout', path: '/logout', isDanger: true },
    ];

    const active = "bg-[#E0F2FE]/60 text-[#075985] font-semibold border border-[#B6DDF7] shadow-sm shadow-[#ECF6FD]";
    const inactive = "text-[#64748B] hover:bg-[#E0F2FE]/30 hover:text-[#075985] border border-[#fff]";

    return (
        <>
            {/* Advanced Mobile Bottom Nav - Floating Pill Design */}
            <AnimatePresence>
                {isVisible && (
                    <motion.nav
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        className="flex justify-between items-center fixed bottom-2 left-2 right-2 z-100 bg-[#014370] backdrop-blur-xl py-2 px-2 lg:hidden font-[Manrope] rounded-full border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
                    >
                        {navItems.map((item, index) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <React.Fragment key={index}>
                                    <NavLink
                                        to={item.path}
                                        className={`relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300
                                            ${isActive ? 'bg-white/95 backdrop-blur-xl text-[#014370] shadow-lg scale-105' : 'text-white/60 hover:text-white'}`}
                                    >
                                        <item.icon
                                            color='currentColor'
                                            size={isActive ? 26 : 24}
                                            variant={isActive ? "Bold" : "Outline"}
                                        />
                                    </NavLink>
                                </React.Fragment>
                            );
                        })}
                    </motion.nav>
                )}
            </AnimatePresence>

            {/* Mobile Center Mode Orb - Draggable & Always Visible Design */}
            <AnimatePresence>
                {!showModeSheet && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                        drag
                        dragElastic={0.15}
                        dragMomentum={false}
                        whileDrag={{ scale: 1.1, zIndex: 120 }}
                        className="lg:hidden fixed bottom-15 left-1/2 -translate-x-1/2 z-[110]"
                    >
                        <button
                            onClick={() => setShowModeSheet(true)}
                            className="relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-all duration-300"
                        >
                            {/* Background with Clean Gradient & Crisp Border */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#014370] to-[#002D4C] border-[2.5px] border-white shadow-xl" />

                            {/* Inner Gloss */}
                            <div className="absolute inset-[2.5px] rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/10" />

                            {/* Icon */}
                            <div className="relative z-10 text-white">
                                {salesMode === 'postsales' ? <Send size={24} strokeWidth={2.5} /> : <Radio size={24} strokeWidth={2.5} />}
                            </div>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <ModeBottomSheet
                isOpen={showModeSheet}
                onClose={() => setShowModeSheet(false)}
                currentMode={salesMode}
                onSelect={handleModeToggle}
            />

            {/* Desktop Sidebar */}
            <aside className="w-64 flex-col border-r border-[#E2E8F080] bg-white lg:flex items-between hidden h-screen">
                <div className="flex flex-col items-start justify-center gap-3 px-6 py-8">
                    <Link to={`${prefix}/dashboard`} className='w-28 cursor-pointer'>
                        <img src={FolleiLogo} alt="FolleiLogo" />
                    </Link>
                    {/* <p className=" text-[#4286C4] text-[12px] font-semibold font-[Manrope] ">AI-POWERED SALES</p> */}
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
                                        <item.icon strokeWidth={1.5} color='currentColor' size={22} />
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
                            <BtnCom
                                title="Upgrade Now"
                                onClick={() => { navigate('/settings/payment') }}
                                variant="primary"
                                // icon={Sparkles}
                                className="mt-4 w-full text-[14px]! py-2.5! "
                            />
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
