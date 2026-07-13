import React, { useState } from 'react';
import { Download, ChevronDown } from 'lucide-react';
import { CustomerFilterPanel } from './CustomerFilterPanel';

interface CustomerHeaderProps {
  selectedStatuses: string[];
  selectedUsages: string[];
  onApplyFilters: (filters: { statuses: string[]; usages: string[] }) => void;
  sortOption: 'Newest' | 'Name';
  setSortOption: (option: 'Newest' | 'Name') => void;
  onExport: () => void;
}

const CustomerHeader: React.FC<CustomerHeaderProps> = ({
  selectedStatuses,
  selectedUsages,
  onApplyFilters,
  sortOption,
  setSortOption,
  onExport
}) => {
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8 pt-4">
      <div>
        <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">

          Customer
        </h1>
        <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">

          Manage and track 1,284 Customer across your sales pipeline.
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-start lg:justify-end mt-4 lg:mt-0">

        {/* FILTER Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFilterPanel(!showFilterPanel);
              setShowSortDropdown(false);
            }}
            className={`flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50 ${showFilterPanel ? 'border-[#004370] bg-[#EFF4FF]/50' : ''
              }`}
          >
            <span>Filter</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {showFilterPanel && (
            <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] md:hidden" onClick={() => setShowFilterPanel(false)} />
          )}
          <CustomerFilterPanel
            isOpen={showFilterPanel}
            onClose={() => setShowFilterPanel(false)}
            currentStatuses={selectedStatuses}
            currentUsages={selectedUsages}
            onApply={(filters) => {
              onApplyFilters(filters);
              setShowFilterPanel(false);
            }}
          />
        </div>

        {/* SORT Button */}
        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50"
          >
            <span>Sort by: {sortOption}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {showSortDropdown && (
            <div className="absolute left-0 md:left-auto md:right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl z-[100] py-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              {(['Newest', 'Name'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSortOption(opt);
                    setShowSortDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${sortOption === opt
                    ? 'bg-[#E6F2FF] text-[#007BFF] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* <div className="w-px h-6 bg-[#EDF3FD] mx-1" /> */}

        {/* View Toggle Layout */}
        {/* <div className="flex items-center gap-1 bg-white border border-[#EDF3FD] p-1 rounded-xl">
          <button
            className="flex items-center justify-center transition-all rounded-lg p-1.5 bg-[#EFF4FF] text-[#004370]"
          >
            <List className="w-4 h-4 shrink-0" />
          </button>
          <button
            className="flex items-center justify-center transition-all rounded-lg p-1.5 bg-transparent text-[#64748B]"
          >
            <LayoutGrid className="w-4 h-4 shrink-0" />
          </button> 
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          className="flex items-center gap-2 bg-[#004370] hover:bg-[#003152] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  );
};

export default CustomerHeader;
