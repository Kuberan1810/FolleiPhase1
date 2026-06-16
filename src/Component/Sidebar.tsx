import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { LogOut, Megaphone } from 'lucide-react';

import { Element4, Profile2User, Stickynote, HierarchySquare, Setting, DocumentUpload, DirectInbox, Diagram } from "iconsax-react"
import FolleiCircle from "../assets/logo/FolleiCircle.svg"

import ConfirmLogoutModal from "./ConfirmLogoutModal";
import { Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import BtnCom from './BtnCom';


import { useSalesContext } from '../Context/SalesContext';

const Sidebar: React.FC = () => {
  const { salesMode } = useSalesContext();
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
      { icon: Megaphone, label: 'Campaign', path: `${prefix}/campaigns` },
      { icon: Layers, label: 'Cadences', path: `${prefix}/cadences` },
      { icon: Diagram, label: 'Analytics', path: `${prefix}/analytics` },
      { icon: DocumentUpload, label: 'Data Import', path: `${prefix}/data-import` },
      { icon: Stickynote, label: 'Organization Setup', path: `${prefix}/organization-setup` },


    ];
  } else {
    navItems = [
      { icon: Element4, label: 'Dashboard', path: `${prefix}/dashboard` },
      { icon: DirectInbox, label: 'Inbox', path: `${prefix}/inbox` },
      { icon: Profile2User, label: 'Leads', path: `${prefix}/leads` },
      { icon: Megaphone, label: 'Campaign', path: `${prefix}/campaigns` },
      { icon: HierarchySquare, label: 'Flow Builder', path: `${prefix}/flow-builder` },
      // { icon: Diagram, label: 'Analytics', path: `${prefix}/analytics` },
      { icon: DocumentUpload, label: 'Data Import', path: `${prefix}/data-import` },
      { icon: Stickynote, label: 'Organization Setup', path: `${prefix}/organization-setup` },

    ];
  }

  const bottomNavItems = [
    { icon: Setting, label: 'Settings', path: '/settings' },
    { icon: LogOut, label: 'Logout', path: '/logout', isDanger: true },
  ];



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
              const isActive = item.label === 'Dashboard'
                ? (location.pathname === item.path || location.pathname.startsWith('/dashboard'))
                : location.pathname === item.path;

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




      {/* Desktop Sidebar Wrapper */}
      <div className="hidden lg:flex flex-col ml-3 my-3 h-[calc(100vh-24px)] w-[72px] shrink-0">

        {/* Logo - sits above sidebar */}
        <div className="flex justify-center pb-2 shrink-0">
          <img
            src={FolleiCircle}
            alt="Follei"
            className="w-11 h-11 rounded-full object-cover"
          />
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col bg-[#014370] rounded-2xl flex-1 relative w-full overflow-visible">

          {/* Active white pill — single element animated with layoutId */}
          {(() => {
            const ITEM_HEIGHT = 50;
            const GAP = 12;
            const TOP_PADDING = 12;
            const CORNER = 20;

            const activeNavIndex = navItems.findIndex(item =>
              location.pathname === item.path ||
              (item.label === 'Dashboard' && location.pathname.startsWith(`/${salesMode}/dashboard`))
            );
            const settingsActive = location.pathname.startsWith('/settings');

            const activeTop = activeNavIndex >= 0
              ? TOP_PADDING + activeNavIndex * (ITEM_HEIGHT + GAP)
              : null;

            const showPill = activeNavIndex >= 0 || settingsActive;

            return showPill ? (
              <motion.div
                layoutId="active-pill"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="absolute right-0 z-0 pointer-events-none"
                style={{
                  left: '10px',
                  top: activeTop !== null ? activeTop : undefined,
                  bottom: settingsActive && activeNavIndex < 0 ? '20px' : undefined,
                  height: settingsActive && activeNavIndex < 0 ? undefined : `${ITEM_HEIGHT}px`,
                  backgroundColor: 'white',
                  borderRadius: '14px 0 0 14px',
                }}
              />
            ) : null;
          })()}

          {/* Top concave corner */}
          {(() => {
            const ITEM_HEIGHT = 50;
            const GAP = 12;
            const TOP_PADDING = 12;
            const CORNER = 20;

            const activeNavIndex = navItems.findIndex(item =>
              location.pathname === item.path ||
              (item.label === 'Dashboard' && location.pathname.startsWith(`/${salesMode}/dashboard`))
            );
            const settingsActive = location.pathname.startsWith('/settings');
            const activeTop = activeNavIndex >= 0
              ? TOP_PADDING + activeNavIndex * (ITEM_HEIGHT + GAP)
              : null;

            if (!activeNavIndex && activeNavIndex !== 0 && !settingsActive) return null;
            if (activeNavIndex < 0 && !settingsActive) return null;

            return (
              <motion.div
                layoutId="active-corner-top"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="absolute right-0 z-10 pointer-events-none"
                style={{
                  width: `${CORNER}px`,
                  height: `${CORNER}px`,
                  top: activeTop !== null ? activeTop - CORNER : undefined,
                  bottom: settingsActive && activeNavIndex < 0 ? `${20 + ITEM_HEIGHT}px` : undefined,
                  backgroundColor: '#014370',
                  borderBottomRightRadius: '14px',
                  boxShadow: `${CORNER / 2}px ${CORNER / 2}px 0 ${CORNER / 2}px white`,
                }}
              />
            );
          })()}

          {/* Bottom concave corner */}
          {(() => {
            const ITEM_HEIGHT = 50;
            const GAP = 12;
            const TOP_PADDING = 12;
            const CORNER = 20;

            const activeNavIndex = navItems.findIndex(item =>
              location.pathname === item.path ||
              (item.label === 'Dashboard' && location.pathname.startsWith(`/${salesMode}/dashboard`))
            );
            const settingsActive = location.pathname.startsWith('/settings');
            const activeTop = activeNavIndex >= 0
              ? TOP_PADDING + activeNavIndex * (ITEM_HEIGHT + GAP)
              : null;

            if (activeNavIndex < 0 && !settingsActive) return null;

            return (
              <motion.div
                layoutId="active-corner-bottom"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                className="absolute right-0 z-10 pointer-events-none"
                style={{
                  width: `${CORNER}px`,
                  height: `${CORNER}px`,
                  top: activeTop !== null ? activeTop + ITEM_HEIGHT : undefined,
                  bottom: settingsActive && activeNavIndex < 0 ? `${20 - CORNER}px` : undefined,
                  backgroundColor: '#014370',
                  borderTopRightRadius: '14px',
                  boxShadow: `${CORNER / 2}px -${CORNER / 2}px 0 ${CORNER / 2}px white`,
                }}
              />
            );
          })()}

          {/* Nav items */}
          <nav className="flex flex-1 flex-col items-center w-full overflow-visible pt-3 gap-3">
            {navItems.map((item, index) => {
              const isActive = location.pathname === item.path ||
                (item.label === 'Dashboard' && location.pathname.startsWith(`/${salesMode}/dashboard`));

              return (
                <div key={index} className="relative w-full group overflow-visible">
                  <NavLink
                    to={item.path}
                    className="relative z-20 flex items-center justify-center py-3.5 w-full cursor-pointer transition-colors duration-200"
                  >
                    <item.icon
                      color={isActive ? '#014370' : 'rgba(255,255,255,0.5)'}
                      size={22}
                    />
                  </NavLink>
                  {/* Tooltip */}
                  <span className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#014370] text-white text-sm font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[999] shadow-lg">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </nav>

          {/* Settings */}
          <div className="pb-5 w-full overflow-visible">
            <div className="relative w-full group overflow-visible">
              <NavLink
                to="/settings"
                className="relative z-20 flex items-center justify-center py-3.5 w-full cursor-pointer transition-colors duration-200"
              >
                {(() => {
                  const isActive = location.pathname.startsWith('/settings');
                  return <Setting color={isActive ? '#014370' : 'rgba(255,255,255,0.5)'} size={22} />;
                })()}
              </NavLink>
              <span className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#014370] text-white text-sm font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[999] shadow-lg">
                Settings
              </span>
            </div>
          </div>

        </aside>
      </div>

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