
import React, { useState } from 'react';
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
      <main className="min-w-0 flex-1 flex flex-col min-h-screen bg-[#FDFDFC] ">
     


        {/* Leads Content Section */}
        <div className="flex-1 px-4 sm:px-8 pb-12 py-6 lg:py-8 w-full">
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

