import React, { useState } from 'react';
import { Download, List, LayoutGrid, ChevronDown } from 'lucide-react';
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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pt-4">
      <div>
        <h1
          className="tracking-tight"
          style={{
            fontWeight: 700,
            fontSize: '36px',
            lineHeight: '44px',
            letterSpacing: '-0.72px',
            color: '#0D1C2E'
          }}
        >
          Customer
        </h1>
        <p
          className="mt-1"
          style={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '24px',
            color: '#434655'
          }}
        >
          Manage and track{' '}
          <span className="font-bold text-[#004370]">
            1,284 Customer
          </span>{' '}
          across your sales pipeline.
        </p>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-3 self-end md:self-center">

        {/* FILTER Button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowFilterPanel(!showFilterPanel);
              setShowSortDropdown(false);
            }}
            className={`flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50 shadow-[0_2px_8px_rgba(237,243,253,0.3)] ${
              showFilterPanel ? 'border-[#004370] bg-[#EFF4FF]/50' : ''
            }`}
          >
            <span>Filter</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

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
            className="flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50 shadow-[0_2px_8px_rgba(237,243,253,0.3)]"
          >
            <span>Sort by: {sortOption}</span>
            <ChevronDown className="w-4 h-4 text-slate-500" />
          </button>

          {showSortDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl z-[100] py-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-right">
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

        <div className="w-px h-6 bg-slate-200/80 mx-1" />

        {/* View Toggle Layout */}
        <div className="flex items-center gap-1 bg-white border border-[#EDF3FD] p-1 rounded-xl shadow-[0_2px_8px_rgba(237,243,253,0.3)]">
          <button
            className="flex items-center justify-center transition-all rounded-lg p-1.5 bg-[#EFF4FF] text-[#007BFF]"
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
          className="flex items-center gap-2 bg-[#004370] hover:bg-[#003152] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-[0_2px_8px_rgba(237,243,253,0.3)]"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>
    </div>
  );
};

export default CustomerHeader;
