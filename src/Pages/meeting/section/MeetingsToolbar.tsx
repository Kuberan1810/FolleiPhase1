import React, { useState, useRef, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { type MeetingStatus } from '../types';

interface MeetingsToolbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  statusFilter?: 'All' | MeetingStatus;
  onStatusFilterChange?: (status: 'All' | MeetingStatus) => void;
  dateFilter?: 'all' | 'today' | 'upcoming' | 'completed';
  onDateFilterChange?: (filter: 'all' | 'today' | 'upcoming' | 'completed') => void;
}

export const MeetingsToolbar: React.FC<MeetingsToolbarProps> = ({
  searchQuery = '',
  onSearchChange,
  statusFilter = 'All',
  onStatusFilterChange,
  dateFilter = 'all',
  onDateFilterChange,
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const dateLabels: Record<string, string> = {
    all: 'All dates',
    today: 'Today',
    upcoming: 'Upcoming only',
    completed: 'Completed only',
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-5">
      {/* Left side */}
      <div className="flex items-center gap-2.5 flex-1 max-w-lg">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#6B7280]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search leads..."
            className="w-full rounded-[8px] border border-[#E5E7EB] bg-white pl-9 pr-3.5 py-2 text-[14px] text-[#9CA3AF] placeholder-[#8E9094] outline-none transition focus:border-[#717378] focus:ring-1 focus:ring-[#717378]/20"
          />
        </div>

        {/* Filter button */}
        <div className="relative" ref={filterRef}>
          <button
            type="button"
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={`flex items-center gap-1.5 rounded-[8px] border px-3.5 py-2 text-[13px] font-medium transition-colors cursor-pointer ${statusFilter !== 'All'
              ? 'border-[#16171A] bg-[#16171A] text-white'
              : 'border-[#E5E7EB] bg-white text-[#111827] hover:bg-[#F9F9F7]'
              }`}
          >
            <SlidersHorizontal className="size-3.5" />
            <span>Filter</span>
            {statusFilter !== 'All' && (
              <span className="ml-1 rounded-full bg-white/20 px-1.5 py-0.2 text-[11px]">
                {statusFilter}
              </span>
            )}
          </button>

          {isFilterOpen && (
            <div className="absolute left-0 mt-1.5 w-44 rounded-[8px] border border-[#E2E2DF] bg-white p-1.5 shadow-lg z-20 animate-in fade-in duration-150">
              <div className="px-2.5 py-1.5 text-[11px] font-semibold text-[#8E9094] uppercase tracking-wider">
                Filter by Status
              </div>
              {(['All', 'Upcoming', 'Completed', 'Cancelled'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => {
                    onStatusFilterChange?.(status);
                    setIsFilterOpen(false);
                  }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] text-left transition-colors cursor-pointer ${statusFilter === status
                    ? 'bg-[#F3F3F0] font-semibold text-[#16171A]'
                    : 'text-[#5C5E62] hover:bg-[#F9F9F7]'
                    }`}
                >
                  <span>{status}</span>
                  {statusFilter === status && <Check className="size-3.5 text-[#16171A]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right side: Date filter dropdown */}
      <div className="relative self-end sm:self-auto" ref={dateRef}>
        <button
          type="button"
          onClick={() => setIsDateOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-[8px] border border-[#E5E7EB] bg-white px-3.5 py-2 text-[13px] font-medium text-[#2C2E31] hover:bg-[#F9F9F7] transition-colors cursor-pointer"
        >
          <span>{dateLabels[dateFilter] || 'All dates'}</span>
          <ChevronDown className="size-3.5 text-[#717378]" />
        </button>

        {isDateOpen && (
          <div className="absolute right-0 mt-1.5 w-44 rounded-xl border border-[#E2E2DF] bg-white p-1.5 shadow-lg z-20 animate-in fade-in duration-150">
            {(
              [
                { key: 'all', label: 'All dates' },
                { key: 'today', label: 'Today' },
                { key: 'upcoming', label: 'Upcoming only' },
                { key: 'completed', label: 'Completed only' },
              ] as const
            ).map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  onDateFilterChange?.(item.key);
                  setIsDateOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-[13px] text-left transition-colors cursor-pointer ${dateFilter === item.key
                  ? 'bg-[#F3F3F0] font-semibold text-[#16171A]'
                  : 'text-[#5C5E62] hover:bg-[#F9F9F7]'
                  }`}
              >
                <span>{item.label}</span>
                {dateFilter === item.key && <Check className="size-3.5 text-[#16171A]" />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeetingsToolbar;
