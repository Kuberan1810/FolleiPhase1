import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import PersistentSetupPanel from './PersistentSetupPanel';
import { getStoredUser } from '../lib/auth';

/** The signed-in user, from the session the auth flow stored. */
const currentUser = () => {
  const stored = getStoredUser();
  const name = stored?.full_name?.trim() || stored?.email?.split('@')[0] || 'there';
  const parts = name.split(/\s+/).filter(Boolean);
  return {
    name: parts[0] || name,
    email: stored?.email || 'Free plan',
    initials: (parts.length >= 2 ? parts[0][0] + parts[1][0] : name.slice(0, 2)).toUpperCase(),
  };
};

export const SidebarLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [user] = useState(currentUser);

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased font-sans">
      {/* Reusable Sidebar Component */}
      <Sidebar
        user={user}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Outlet Container */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#FDFDFC]">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E6E6E4] bg-white px-4 py-3 lg:hidden sticky top-0 z-30 shrink-0">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
          <span className="text-[13.5px] font-semibold tracking-tight text-[#16171A]">
            Follei
          </span>
          <div className="size-8" />
        </div>

        {/* Child Pages Outlet */}
        <Outlet context={{ isMobileSidebarOpen, setIsMobileSidebarOpen }} />
      </main>

      {/* Persistent setup panel across pages */}
      <PersistentSetupPanel />
    </div>
  );
};

export default SidebarLayout;
