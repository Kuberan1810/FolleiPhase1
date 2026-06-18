import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { LogOut, Megaphone } from 'lucide-react';

import { Home, Profile2User, People, HierarchySquare, Setting2, DocumentUpload, ChartSquare, Ticket, EmptyWalletChange } from "iconsax-react"
import FolleiCircle from "../assets/logo/FolleiCircle.svg"

import ConfirmLogoutModal from "./ConfirmLogoutModal";
import { motion, AnimatePresence } from 'framer-motion';
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
      { icon: Home, label: 'Dashboard', path: `${prefix}/dashboard` },
      { icon: People, label: 'Customers', path: `${prefix}/customers` },
      { icon: Profile2User, label: 'Onboarding', path: `${prefix}/onboarding` },
      { icon: Ticket, label: 'Tickets', path: `${prefix}/tickets` },
      { icon: EmptyWalletChange, label: 'Renewals', path: `${prefix}/renewals` },
      { icon: ChartSquare, label: 'Analytics', path: `${prefix}/analytics` },
      
      { icon: Setting2, label: 'Settings', path: '/settings' }
    ];
  } else {
    navItems = [
      { icon: Home, label: 'Dashboard', path: `${prefix}/dashboard` },
      { icon: People, label: 'Inbox', path: `${prefix}/inbox` },
      { icon: Profile2User, label: 'Leads', path: `${prefix}/leads` },
      { icon: Megaphone, label: 'Campaign', path: `${prefix}/campaigns` },
      { icon: HierarchySquare, label: 'Flow Builder', path: `${prefix}/flow-builder` },
      // { icon: Diagram, label: 'Analytics', path: `${prefix}/analytics` },
      { icon: DocumentUpload, label: 'Data Import', path: `${prefix}/data-import` },
      { icon: Setting2, label: 'Settings', path: '/settings' }
    ];
  }

  const bottomNavItems = [
    { icon: Setting2, label: 'Settings', path: '/settings' },
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
            className="flex justify-between items-center fixed bottom-2 left-2 right-2 z-100 bg-[#014370] backdrop-blur-xl py-2 px-2 lg:hidden rounded-full border border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
          >
            {navItems.map((item, index) => {
              const isActive = location.pathname.startsWith(item.path) || 
                (item.label === 'Dashboard' && location.pathname.startsWith('/dashboard'));

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
      <div className="hidden lg:flex flex-col ml-7.5 py-5 h-[calc(100vh-24px)] w-[72px] shrink-0">

        {/* Logo - sits above sidebar */}
        <div className="flex justify-center pb-2 shrink-0">
          <Link to={`/presales/dashboard`}>
            <img
              src={FolleiCircle}
              alt="Follei"
              className="w-11 h-11 rounded-full object-cover"
            />
          </Link>
        </div>

        {/* Sidebar */}
        <aside className="flex flex-col bg-[#014370] rounded-2xl flex-1 relative w-full overflow-visible">

          {/* Nav items */}
          <nav className="flex flex-1 flex-col items-center w-full overflow-visible pt-7 gap-3">
            {navItems.map((item, index) => {
              const isActive = location.pathname.startsWith(item.path) ||
                (item.label === 'Dashboard' && location.pathname.startsWith(`/${salesMode}/dashboard`));

              return (
                <div key={index} className={`relative w-full group overflow-visible ${index === navItems.length - 1 ? 'mt-auto mb-5' : ''}`}>
                  {isActive && (
                    <motion.div
                      layoutId="active-pill"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      className="absolute inset-y-0 right-0 z-0 bg-[#F7F9FB]"
                      style={{
                        left: '12px',
                        borderTopLeftRadius: '14px',
                        borderBottomLeftRadius: '14px',
                        borderTopRightRadius: '0px',
                        borderBottomRightRadius: '0px'
                      }}
                    >
                      {/* Top Corner SVG */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute pointer-events-none"
                        style={{ top: '-13.5px', right: '-1px' }}
                      >
                        <path d="M0 14C7.732 14 14 7.732 14 0V14H0Z" fill="#F7F9FB" />
                      </svg>
                      {/* Bottom Corner SVG */}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute pointer-events-none"
                        style={{ bottom: '-13.5px', right: '-1px' }}
                      >
                        <path d="M0 0C7.732 0 14 6.268 14 14V0H0Z" fill="#F7F9FB" />
                      </svg>
                    </motion.div>
                  )}
                  <NavLink
                    to={item.path}
                    className="relative z-20 flex items-center justify-center py-5 w-full cursor-pointer transition-colors duration-200"
                  >
                    <item.icon
                      color={
                        item.label === 'Settings'
                          ? (isActive ? '#014370' : '#fff')
                          : (isActive ? '#014370' : '#fff')
                      }
                      size={32}
                      variant={
                        item.label === 'Settings'
                          ? (isActive ? 'Bold' : 'Bulk')
                          : 'Bold'
                      }
                    />
                  </NavLink>
                  {/* Tooltip */}
                  <div className="absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-[999]">
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-[#014370]" />
                    <span className="whitespace-nowrap bg-[#014370] text-white text-[11px] tracking-widest px-3 py-1.5 rounded-md shadow-md">
                      {item.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </nav>



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