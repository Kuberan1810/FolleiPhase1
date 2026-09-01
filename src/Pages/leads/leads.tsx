import React from 'react';
import {
  LeadsHeader,
  LeadsTable,
  useLeads,
} from './section';

export const LeadsPage: React.FC = () => {
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
    <div className="flex-1 px-4 sm:px-8 py-6 lg:py-8 w-full flex flex-col min-h-0 overflow-hidden">
      {/* Header (Title, Subtitle, Search, Filter Dropdown, Add Lead) */}
      <div className="shrink-0">
        <LeadsHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filters={filters}
          onApplyFilters={handleApplyFilters}
          onResetFilters={handleResetFilters}
          activeFilterCount={activeFilterCount}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
      </div>

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
  );
};

export default LeadsPage;
