import React, { useState, useMemo } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import {
  AttentionHeader,
  AttentionTable,
} from './section';
import { initialMockAttentionLeads } from './data/mockAttentionLeads';

export const AttentionPage: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLeads = useMemo(() => {
    if (!searchQuery.trim()) return initialMockAttentionLeads;
    const q = searchQuery.toLowerCase();
    return initialMockAttentionLeads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        lead.intent.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#16171A] antialiased">
      {/* Left Sidebar */}
      <Sidebar
        activeItem="dashboard"
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
          <AttentionHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Table */}
          <AttentionTable
            leads={filteredLeads}
            totalCount={1248}
            startRange={1}
            endRange={filteredLeads.length}
          />
        </div>
      </main>
    </div>
  );
};

export default AttentionPage;
