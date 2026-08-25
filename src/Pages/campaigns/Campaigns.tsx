import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import {
  CampaignsHeader,
  CampaignsTable,
} from './section';

export const CampaignsPage: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased">
      {/* Left Sidebar */}
      <Sidebar
        activeItem="campaigns"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Center Area */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#FDFDFC]">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-[#E6E6E4] bg-white px-4 py-3 lg:hidden sticky top-0 z-30">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <Menu className="size-4" aria-hidden="true" />
          </button>
          <span className="text-[14px] font-semibold tracking-tight text-[#16171A]">
            Follei
          </span>
          <div className="size-8" />
        </div>

        {/* Content Section */}
        <div className="flex-1 px-4 sm:px-8 pb-12 py-6 lg:py-8 max-w-7xl w-full">
          {/* Header */}
          <CampaignsHeader />

          {/* Campaigns Table */}
          <CampaignsTable />
        </div>
      </main>
    </div>
  );
};

export default CampaignsPage;
