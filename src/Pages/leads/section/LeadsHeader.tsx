import React, { useState } from 'react';
import { Search, Plus, ChevronDown, SortDesc } from 'lucide-react';
import { LeadsFilterModal } from './LeadsFilterModal';
import type { LeadFilterState } from '../types';

interface LeadsHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: LeadFilterState;
  onApplyFilters: (filters: LeadFilterState) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
  onOpenAddModal: () => void;
}

export const LeadsHeader: React.FC<LeadsHeaderProps> = ({
  searchQuery,
  onSearchChange,
  filters,
  onApplyFilters,
  onResetFilters,
  activeFilterCount,
  onOpenAddModal,
}) => {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between pt-2 pb-1">
      {/* Title & Subtitle */}
      <div>
        <h1 className="font-['Manrope'] font-medium text-[28px] leading-[35px] tracking-[0px] text-[#1E293B]">
          Leads
        </h1>
        <p className="font-['Manrope'] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#64748B] mt-1">
          Manage and follow up with your sales leads.
        </p>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-3 relative">
        {/* Search Bar */}
        <div className="relative w-48 sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search leads..."
            className="w-full rounded-[8px] border border-[#E5E7EB] bg-white pl-10 pr-4 py-2 text-[13.5px] text-[#111827] placeholder-[#9CA3AF] outline-none transition focus:border-[#6B7280] focus:ring-1 focus:ring-[#6B7280]/20"
          />
        </div>

        {/* Filter Trigger Button */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFilterModalOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 rounded-[8px] border px-3.5 py-2 text-[13px] font-medium transition-colors cursor-pointer ${activeFilterCount > 0
              ? 'border-[#111827] bg-[#111827] text-white shadow-2xs'
              : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9FAFB]'
              }`}
          >
            <SortDesc className="size-3.5" />
            <span>Filter</span>
            {activeFilterCount > 0 && (
              <span className="flex size-4.5 items-center justify-center rounded-full bg-[#7A9601] text-[10.5px] font-bold text-white">
                {activeFilterCount}
              </span>
            )}
            <ChevronDown className="size-3.5 opacity-70" />
          </button>

          {/* Leads Filter Dropdown / Modal */}
          <LeadsFilterModal
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
            filters={filters}
            onApplyFilters={onApplyFilters}
            onResetFilters={onResetFilters}
            activeFilterCount={activeFilterCount}
          />
        </div>

        {/* Add Lead Button */}
        <button
          type="button"
          onClick={onOpenAddModal}
          className="inline-flex items-center justify-center gap-1.5 rounded-[8px] bg-[#7A9601] hover:bg-[#597818] active:bg-[#4E6914] px-4 py-2 text-[13.5px] font-medium text-white shadow-xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="size-4 stroke-[2.4]" />
          <span>Add Lead</span>
        </button>
      </div>
    </div>
  );
};
export default LeadsHeader;
