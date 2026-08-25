import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronDown, ArrowLeft } from 'lucide-react';

interface AttentionHeaderProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  onFilterClick?: () => void;
}

export const AttentionHeader: React.FC<AttentionHeaderProps> = ({
  searchQuery = '',
  onSearchChange,
  onFilterClick,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2 pb-1">
      {/* Title & Subtitle with Back Button */}
      <div className="flex items-center gap-3.5">
        <button
          type="button"
          onClick={() => navigate('/dashboard')}
          title="Back to dashboard"
          aria-label="Back to dashboard"
          className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#475569] hover:bg-gray-50 hover:text-[#111827] transition-all cursor-pointer shadow-2xs"
        >
          <ArrowLeft className="size-4 stroke-[2.2]" />
        </button>

        <div>
          <h1 className="font-medium text-[28px] leading-[35px] tracking-[0px] text-[#1E293B]">
            AI Needs Your Attention
          </h1>
          <p className="font-normal text-[14px] leading-[20px] tracking-[0px] text-[#64748B] mt-0.5">
            Follei identified customers that may need your attention.
          </p>
        </div>
      </div>

      {/* Right Controls: Search & Filter */}
      <div className="flex items-center gap-3">
        {/* Search input */}
        <div className="relative flex items-center min-w-[240px] sm:min-w-[260px]">
          <Search className="absolute left-3.5 size-4 text-[#9CA3AF] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search customers..."
            className="w-full h-10 pl-9 pr-3.5 rounded-[8px] border border-[#E5E7EB] bg-white text-[13.5px] text-[#16171A] placeholder-[#9CA3AF] focus:border-[#7A9601] focus:outline-none transition-colors"
          />
        </div>

        {/* Filter button */}
        <button
          type="button"
          onClick={onFilterClick}
          className="inline-flex items-center justify-center gap-2 h-10 px-3.5 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-gray-50 text-[13.5px] font-medium text-[#475569] transition-colors cursor-pointer shrink-0 shadow-2xs"
        >
          <Filter className="size-3.5 text-[#64748B]" />
          <span>Filter</span>
          <ChevronDown className="size-3.5 text-[#64748B]" />
        </button>
      </div>
    </div>
  );
};

export default AttentionHeader;
