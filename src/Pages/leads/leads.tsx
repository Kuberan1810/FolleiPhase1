
import React, { useState } from 'react';
import { Menu, Search, Bell } from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import {
  LeadsHeader,
  LeadsTable,
  useLeads,
} from './section';

export const LeadsPage: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const {
    leads,
    totalCount,
    currentPage,
    totalPages,
    pageSize,
    setCurrentPage,
    searchQuery,
    setSearchQuery,
    filters,
    activeFilterCount,
    handleApplyFilters,
    handleResetFilters,
    setIsAddModalOpen,
  } = useLeads();

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-[#16171A] antialiased">
      {/* Left Sidebar */}
      <Sidebar
        activeItem="leads"
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#F8F9FA]">
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
          <span className="text-[14px] font-bold tracking-tight text-[#16171A]">
            Follei
          </span>
          <button
            type="button"
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 cursor-pointer"
          >
            <Bell className="size-4" />
          </button>
        </div>

        {/* Desktop Top Right Icons Header */}
        <div className="hidden lg:flex items-center justify-end gap-3 px-8 pt-5 pb-2">
          <button
            type="button"
            aria-label="Search"
            className="flex size-9 items-center justify-center rounded-full text-[#717378] hover:bg-[#F3F3F0] hover:text-[#16171A] transition-colors cursor-pointer"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="flex size-9 items-center justify-center rounded-full text-[#717378] hover:bg-[#F3F3F0] hover:text-[#16171A] transition-colors cursor-pointer"
          >
            <Bell className="size-4" />
          </button>
        </div>

        {/* Leads Content Section */}
        <div className="flex-1 px-4 sm:px-8 pb-12">
          {/* Header (Title, Subtitle, Search, Filter Dropdown, Add Lead) */}
          <LeadsHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />

          {/* Leads Table */}
          <LeadsTable
            leads={leads}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        </div>
      </main>


    </div>
  );
};

export default LeadsPage;

