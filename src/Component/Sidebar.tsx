import React, { useState } from 'react';
import {
  Home,
  ChevronDown,
  ChevronRight,
  Folder,
  LayoutDashboard,
  Users,
  Phone,
  X
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { UserProfile } from '../Pages/DashboardSetup/types';

interface SidebarProps {
  user?: UserProfile;
  projects?: string[];
  isOpen?: boolean;
  onClose?: () => void;
  activeItem?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user = {
    name: 'Aditya',
    email: 'Free plan',
    initials: 'A',
  },
  projects = ['Project 1'],
  isOpen = false,
  onClose,
  activeItem,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isProject1Open, setIsProject1Open] = useState(true);

  const displayProjects = projects.length > 0 ? projects : ['Project 1'];

  const currentPath = location.pathname;

  
  const getActiveNav = () => {
    if (activeItem) return activeItem;
    if (currentPath === '/dashboard' || currentPath === '/main-dashboard') return 'dashboard';
    if (currentPath.startsWith('/lead')) return 'leads';
    if (currentPath.startsWith('/call-lab')) return 'call-lab';
    if (currentPath === '/home' || currentPath === '/dashboard-setup' || currentPath === '/') return 'home';
    return 'home';
  };


  const activeNav = getActiveNav();

  const navTo = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  const content = (
    <div className="flex h-full w-60 flex-col justify-between border-r border-[#EBEBE8] bg-[#F9F9F7] px-3.5 py-4 font-sans select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col gap-4">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between px-2 pt-1 pb-1">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navTo('/dashboard')}>
            <div className="flex size-7 items-center justify-center rounded-full bg-[#16171A] text-white font-bold text-[13px] tracking-wider shadow-xs">
              F
            </div>
            <span className="text-[15px] font-semibold tracking-tight text-[#16171A]">
              Follei
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden flex size-7 items-center justify-center rounded-lg text-[#717378] hover:bg-black/5 hover:text-gray-900"
              aria-label="Close sidebar"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col gap-1">
          {/* Home Link */}
          <button
            type="button"

            onClick={() => navTo('/dashboard')}
            className={`flex w-full items-center gap-2.5 rounded-[12px] px-3 py-2 text-[13.5px] transition-colors cursor-pointer ${
              activeNav === 'dashboard'

                ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                : 'text-[#5C5E62] hover:bg-black/5 hover:text-[#16171A] font-normal'
            }`}
          >
            <Home className={`size-4 ${activeNav === 'dashboard' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
            <span>Home</span>
          </button>

          {/* Projects Section */}
          <div className="flex flex-col gap-0.5 pt-1">
            <button
              type="button"
              onClick={() => setIsProjectsOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 text-[13.5px] font-medium text-[#16171A] hover:bg-black/5 rounded-xl transition-colors cursor-pointer text-left"
            >
              <Folder className="size-4 text-[#717378]" />
              <span>Projects</span>
            </button>

            {isProjectsOpen && (
              <div className="flex flex-col gap-0.5 pl-4 pr-1 mt-0.5">
                {/* Project 1 Collapsible */}
                <div className="flex flex-col">
                  <button
                    type="button"
                    onClick={() => setIsProject1Open((prev) => !prev)}
                    className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-medium text-[#16171A] hover:bg-black/5 rounded-lg transition-colors cursor-pointer"
                  >
                    {isProject1Open ? (
                      <ChevronDown className="size-3 text-[#717378]" />
                    ) : (
                      <ChevronRight className="size-3 text-[#717378]" />
                    )}
                    <span>{displayProjects[0] || 'Project 1'}</span>
                  </button>

                  {isProject1Open && (
                    <div className="flex flex-col gap-0.5 pl-5 pr-1 py-0.5">
                      <button
                        type="button"
                        onClick={() => navTo('/dashboard')}

                        className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                          activeNav === 'dashboard'

                            ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                            : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                          }`}
                      >
                        <LayoutDashboard className={`size-3.5 ${activeNav === 'dashboard' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                        <span>Dashboard</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navTo('/leads')}

                        className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                          activeNav === 'leads'

                            ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                            : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                          }`}
                      >
                        <Users className={`size-3.5 ${activeNav === 'leads' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                        <span>Leads</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => navTo('/call-lab')}
                        className={`flex items-center gap-2.5 px-2.5 py-1.5 text-[12.5px] rounded-lg transition-colors cursor-pointer ${
                          activeNav === 'call-lab'
                            ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                            : 'text-[#717378] hover:text-[#16171A] hover:bg-black/5 font-normal'
                          }`}
                      >
                        <Phone className={`size-3.5 ${activeNav === 'call-lab' ? 'text-[#16171A]' : 'text-[#717378]'}`} />
                        <span>Call Lab</span>
                      </button>

                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

        </div>
      </div>

      {/* Bottom Settings & User Profile */}
      <div className="flex flex-col gap-2">
        {/* User Card Pill */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#EBEBE8] bg-[#F4F4F0]/60 p-2.5 hover:bg-[#EFEFEA] transition-colors cursor-pointer">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#E5E5DE] text-[12px] font-semibold text-[#16171A]">
            {user.initials || user.name.charAt(0) || 'A'}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[13px] font-semibold text-[#16171A] leading-tight">
              {user.name}
            </span>
            <span className="truncate text-[11px] text-[#717378] leading-tight mt-0.5">
              {user.email === 'Free plan' ? 'Free plan' : (user.email || 'Free plan')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex h-screen shrink-0 sticky top-0">
        {content}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={onClose}
          />
          <div className="relative z-10 h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
