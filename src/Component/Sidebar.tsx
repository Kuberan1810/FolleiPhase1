import React, { useState } from 'react';
import { Home, ChevronDown, ChevronRight, Plus, Sparkles, Settings, SquareDashed, X } from 'lucide-react';
import type { UserProfile } from '../Pages/Dashboard/types';

interface SidebarProps {
  user?: UserProfile;
  projects?: string[];
  isOpen?: boolean;
  onClose?: () => void;
  onNewProject?: () => void;
  onAskFollei?: () => void;
  onOpenSettings?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user = {
    name: 'Aditya Rao',
    email: 'aditya@northwind.io',
    initials: 'AR',
  },
  projects = [],
  isOpen = false,
  onClose,
  onNewProject,
  onAskFollei,
  onOpenSettings,
}) => {
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [activeNav, setActiveNav] = useState<'home' | 'ask-follei' | 'settings'>('home');

  const content = (
    <div className="flex h-full w-60 flex-col justify-between border-r border-[#EBEBE8] bg-[#F9F9F7] px-3.5 py-4 font-sans select-none">
      {/* Top Header & Navigation */}
      <div className="flex flex-col gap-5">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between px-2 pt-1 pb-1">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-full bg-[#16171A] text-white font-bold text-[12px] tracking-wider shadow-xs">
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
        <div className="flex flex-col gap-1.5">
          {/* Home Link */}
          <button
            type="button"
            onClick={() => setActiveNav('home')}
            className={`flex w-full items-center gap-2.5 rounded-[14px] px-3 py-2 text-[13.5px] transition-colors cursor-pointer ${
              activeNav === 'home'
                ? 'bg-[#EFEFE9] font-medium text-[#16171A]'
                : 'text-[#5C5E62] hover:bg-black/5 hover:text-[#16171A] font-normal'
            }`}
          >
            <Home className="size-4 text-[#2C2E31]" />
            <span>Home</span>
          </button>

          {/* Projects Collapsible Section */}
          <div className="flex flex-col gap-1 pt-1">
            <button
              type="button"
              onClick={() => setIsProjectsOpen((prev) => !prev)}
              className="flex items-center gap-2 px-3 py-1.5 text-[13.5px] font-medium text-[#16171A] hover:bg-black/5 rounded-xl transition-colors cursor-pointer"
            >
              {isProjectsOpen ? (
                <ChevronDown className="size-3.5 text-[#717378]" />
              ) : (
                <ChevronRight className="size-3.5 text-[#717378]" />
              )}
              <span>Projects</span>
            </button>

            {isProjectsOpen && (
              <div className="flex flex-col gap-0.5 pl-6 pr-1">
                {projects.length > 0 ? (
                  projects.map((proj) => (
                    <button
                      key={proj}
                      type="button"
                      className="flex items-center px-2 py-1.5 text-[13px] text-[#717378] hover:text-[#16171A] rounded-lg transition-colors cursor-pointer text-left font-normal"
                    >
                      <span>{proj}</span>
                    </button>
                  ))
                ) : (
                  /* Empty State item */
                  <div className="flex items-center gap-2 px-2 py-1.5 text-[12.5px] text-[#8C8E93]">
                    <SquareDashed className="size-3.5 text-[#B5B6BA] stroke-[1.5]" />
                    <span>No projects yet</span>
                  </div>
                )}

                {/* + New Project Action */}
                <button
                  type="button"
                  onClick={onNewProject}
                  className="flex items-center gap-1.5 px-2 py-1.5 text-[13px] font-normal text-[#717378] transition-colors hover:text-[#16171A] cursor-pointer"
                >
                  <Plus className="size-3.5 text-[#717378]" />
                  <span>New Project</span>
                </button>
              </div>
            )}
          </div>

          {/* Divider line */}
          <div className="border-t border-[#EBEBE8] my-1.5" />

          {/* Ask Follei Action */}
          <button
            type="button"
            onClick={() => {
              setActiveNav('ask-follei');
              onAskFollei?.();
            }}
            className={`flex items-center gap-2.5 rounded-[14px] px-3 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${
              activeNav === 'ask-follei'
                ? 'bg-[#EFEFE9] text-[#16171A]'
                : 'text-[#16171A] hover:bg-black/5'
            }`}
          >
            <Sparkles className="size-4 text-[#0D9488]" />
            <span>Ask Follei</span>
          </button>
        </div>
      </div>

      {/* Bottom Settings & User Profile */}
      <div className="flex flex-col gap-2">
        {/* Divider line */}
        <div className="border-t border-[#EBEBE8] mb-1" />

        {/* Settings button */}
        <button
          type="button"
          onClick={() => {
            setActiveNav('settings');
            onOpenSettings?.();
          }}
          className={`flex items-center gap-2.5 rounded-[14px] px-3 py-2 text-[13.5px] font-medium transition-colors cursor-pointer ${
            activeNav === 'settings'
              ? 'bg-[#EFEFE9] text-[#16171A]'
              : 'text-[#16171A] hover:bg-black/5'
          }`}
        >
          <Settings className="size-4 text-[#717378]" />
          <span>Settings</span>
        </button>

        {/* User Card */}
        <div className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-black/5 transition-colors cursor-pointer">
          <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#CCFBEF] text-[11px] font-semibold text-[#0D9488]">
            {user.initials || 'AR'}
          </div>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-[12.5px] font-semibold text-[#16171A]">
              {user.name}
            </span>
            <span className="truncate text-[11px] text-[#717378]">
              {user.email}
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
