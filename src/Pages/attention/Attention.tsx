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
    <div className="flex h-screen w-full bg-[#FDFDFC] text-[#16171A] antialiased overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar
        activeItem="dashboard"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Center Area */}
      <main className="min-w-0 flex-1 flex flex-col h-screen overflow-hidden bg-[#FDFDFC]">
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
          <span className="text-[14px] font-semibold tracking-tight text-[#16171A]">
            Follei
          </span>
          <div className="size-8" />
        </div>

        {/* Content Section */}
        <div className="flex-1 px-4 sm:px-8 py-6 lg:py-8 w-full flex flex-col min-h-0 overflow-hidden">
          {/* Header */}
          <div className="shrink-0">
            <AttentionHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>

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
