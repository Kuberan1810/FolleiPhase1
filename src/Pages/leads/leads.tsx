
import React, { useRef, useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
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
    importLeadCsv,
    loading,
    error,
    retry,
  } = useLeads();
  const csvInputRef = useRef<HTMLInputElement>(null);

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
        <input
          ref={csvInputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void importLeadCsv(file);
            event.target.value = '';
          }}
        />


        {/* Leads Content Section */}
        <div className="flex-1 px-4 sm:px-8 pb-12 py-6 lg:py-8 w-full font-['Manrope']">
          {/* Header (Title, Subtitle, Search, Filter Dropdown, Add Lead) */}
          <LeadsHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onApplyFilters={handleApplyFilters}
            onResetFilters={handleResetFilters}
            activeFilterCount={activeFilterCount}
            onImportCsv={() => csvInputRef.current?.click()}
          />

          {error && <div className="mt-5 flex items-center justify-between border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"><span>{error}</span><button type="button" onClick={() => void retry()} title="Retry"><RefreshCw className="size-4" /></button></div>}
          {loading && <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#64748B]"><Loader2 className="size-4 animate-spin" />Loading workspace leads…</div>}

          {/* Leads Table */}
          {!loading && <LeadsTable
            leads={leads}
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />}
        </div>
      </main>


    </div>
  );
};

export default LeadsPage;
