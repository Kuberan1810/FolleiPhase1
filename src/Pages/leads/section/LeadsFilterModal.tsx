import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Check } from 'lucide-react';
import type {
  LeadFilterState,
  LeadStatus,
  LeadScore,
  LeadSource,
  DatePreset,
} from '../types';

interface LeadsFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: LeadFilterState;
  onApplyFilters: (filters: LeadFilterState) => void;
  onResetFilters: () => void;
  activeFilterCount: number;
}

const ALL_STATUSES: LeadStatus[] = [
  'New Inquiry',
  'Contacted',
  'Qualified',
  'Demo Scheduled',
  'Proposal',
  'Negotiation',
  'Converted',
  'Not Converted',
];

const ALL_SCORES: { label: LeadScore; dotColor: string }[] = [
  { label: 'Hot', dotColor: '#EF4444' },
  { label: 'Warm', dotColor: '#F59E0B' },
  { label: 'Cold', dotColor: '#3B82F6' },
];

const ALL_SOURCES: LeadSource[] = ['Website', 'Import', 'Ads', 'Referral'];

const LAST_INTERACTION_OPTIONS: DatePreset[] = [
  'Today',
  'Last 7 days',
  'Last 30 days',
  'No communication',
];

const CREATED_DATE_OPTIONS: DatePreset[] = [
  'Today',
  'Last 7 days',
  'Last 30 days',
];

export const LeadsFilterModal: React.FC<LeadsFilterModalProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<LeadFilterState>(filters);

  // Section collapse states
  const [isStatusOpen, setIsStatusOpen] = useState(true);
  const [isScoreOpen, setIsScoreOpen] = useState(true);
  const [isSourceOpen, setIsSourceOpen] = useState(true);
  const [isInteractionOpen, setIsInteractionOpen] = useState(true);
  const [isCreatedDateOpen, setIsCreatedDateOpen] = useState(true);

  if (!isOpen) return null;

  // Toggle status checkbox
  const toggleStatus = (status: LeadStatus) => {
    setLocalFilters((prev) => {
      const exists = prev.statuses.includes(status);
      return {
        ...prev,
        statuses: exists
          ? prev.statuses.filter((s) => s !== status)
          : [...prev.statuses, status],
      };
    });
  };

  // Toggle score
  const toggleScore = (score: LeadScore) => {
    setLocalFilters((prev) => ({
      ...prev,
      score: prev.score === score ? null : score,
    }));
  };

  // Toggle source checkbox
  const toggleSource = (source: LeadSource) => {
    setLocalFilters((prev) => {
      const exists = prev.sources.includes(source);
      return {
        ...prev,
        sources: exists
          ? prev.sources.filter((s) => s !== source)
          : [...prev.sources, source],
      };
    });
  };

  // Toggle last interaction
  const toggleInteraction = (preset: DatePreset) => {
    setLocalFilters((prev) => ({
      ...prev,
      lastInteraction: prev.lastInteraction === preset ? null : preset,
    }));
  };

  // Toggle created date
  const toggleCreatedDate = (preset: DatePreset) => {
    setLocalFilters((prev) => ({
      ...prev,
      createdDate: prev.createdDate === preset ? null : preset,
    }));
  };

  // Calculate total selected filters for badge count
  const calcTotalCount = () => {
    let count = 0;
    count += localFilters.statuses.length;
    if (localFilters.score) count += 1;
    count += localFilters.sources.length;
    if (localFilters.lastInteraction) count += 1;
    if (localFilters.createdDate) count += 1;
    if (localFilters.aiSearch.trim()) count += 1;
    return count;
  };

  const currentCount = calcTotalCount();

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleClear = () => {
    const emptyState: LeadFilterState = {
      aiSearch: '',
      statuses: [],
      score: null,
      sources: [],
      lastInteraction: null,
      createdDate: null,
    };
    setLocalFilters(emptyState);
    onResetFilters();
  };

  return (
    <>
      {/* Invisible backdrop to dismiss when clicking outside */}
      <div
        className="fixed inset-0 z-40 bg-transparent"
        onClick={onClose}
      />

      <div
        className="absolute right-0 top-12 z-50 w-[350px] sm:w-[370px] rounded-[16px] border border-[#E5E7EB] bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150 text-[#111827] max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="relative mb-5 flex items-center rounded-[11px] border border-[#E5E7EB] bg-white px-3 py-2 shadow-2xs focus-within:border-[#9CA3AF] focus-within:ring-1 focus-within:ring-[#9CA3AF]/20">
          <Sparkles className="size-4 shrink-0 text-[#3B82F6] mr-2" />
          <input
            type="text"
            placeholder="e.g. Show me hot leads from website not..."
            value={localFilters.aiSearch}
            onChange={(e) =>
              setLocalFilters((prev) => ({ ...prev, aiSearch: e.target.value }))
            }
            className="w-full bg-transparent text-[14px] text-[#111827] placeholder-[#94A3B8] outline-none"
          />
        </div>

        {/* Status Section */}
        <div className="pb-4 mb-4">
          <button
            type="button"
            onClick={() => setIsStatusOpen((prev) => !prev)}
            className="flex w-full items-center justify-between py-1 text-left cursor-pointer"
          >
            <span className="text-[14px] font-semibold text-[#94A3B8]">Status</span>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
              {localFilters.statuses.length > 0 && (
                <span>{localFilters.statuses.length} selected</span>
              )}
              {isStatusOpen ? (
                <ChevronUp className="size-4 text-[#6B7280]" />
              ) : (
                <ChevronDown className="size-4 text-[#6B7280]" />
              )}
            </div>
          </button>

          {isStatusOpen && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 pt-3">
              {ALL_STATUSES.map((status) => {
                const isChecked = localFilters.statuses.includes(status);
                return (
                  <label
                    key={status}
                    onClick={() => toggleStatus(status)}
                    className="flex items-center gap-2 text-[13px] text-[#374151] cursor-pointer hover:text-[#111827] select-none"
                  >
                    <div
                      className={`flex size-4.5 items-center justify-center rounded-[4px] border-[1.5px] transition-colors ${isChecked
                        ? 'border-[#688A1F] bg-[#7A9601] text-white'
                        : 'border-[#C6C6CD] bg-white hover:border-[#9CA3AF]'
                        }`}
                    >
                      {isChecked && <Check className="size-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{status}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Score Section */}
        <div className="pb-4 mb-4">
          <button
            type="button"
            onClick={() => setIsScoreOpen((prev) => !prev)}
            className="flex w-full items-center justify-between py-1 text-left cursor-pointer"
          >
            <span className="text-[14px] font-semibold text-[#1E293B]">Score</span>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
              {localFilters.score && <span>1 selected</span>}
              {isScoreOpen ? (
                <ChevronUp className="size-4 text-[#6B7280]" />
              ) : (
                <ChevronDown className="size-4 text-[#6B7280]" />
              )}
            </div>
          </button>

          {isScoreOpen && (
            <div className="flex flex-wrap gap-2.5 pt-3">
              {ALL_SCORES.map(({ label, dotColor }) => {
                const isSelected = localFilters.score === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleScore(label)}
                    className={`flex items-center gap-2 rounded-[8px] border px-3.5 py-1.5 text-[13px] font-medium transition-colors cursor-pointer ${isSelected
                      ? 'border-[#004370] bg-[#EFF4FF] text-[#0B1C30] ring-1 ring-[#1E293B]'
                      : 'border-[#E9E9EF] bg-white text-[#0B1C30] hover:bg-[#F9FAFB]'
                      }`}
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: dotColor }}
                    />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Source Section */}
        <div className="pb-4 mb-4">
          <button
            type="button"
            onClick={() => setIsSourceOpen((prev) => !prev)}
            className="flex w-full items-center justify-between py-1 text-left cursor-pointer"
          >
            <span className="text-[14px] font-semibold text-[#1E293B]">Source</span>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
              {localFilters.sources.length > 0 && (
                <span>{localFilters.sources.length} selected</span>
              )}
              {isSourceOpen ? (
                <ChevronUp className="size-4 text-[#6B7280]" />
              ) : (
                <ChevronDown className="size-4 text-[#6B7280]" />
              )}
            </div>
          </button>

          {isSourceOpen && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-2.5 pt-3">
              {ALL_SOURCES.map((source) => {
                const isChecked = localFilters.sources.includes(source);
                return (
                  <label
                    key={source}
                    onClick={() => toggleSource(source)}
                    className="flex items-center gap-2 text-[13px] text-[#374151] cursor-pointer hover:text-[#111827] select-none"
                  >
                    <div
                      className={`flex size-4.5 items-center justify-center rounded-[4px] border-[1.5px] transition-colors ${isChecked
                        ? 'border-[#688A1F] bg-[#7A9601] text-white'
                        : 'border-[#C6C6CD] bg-white hover:border-[#9CA3AF]'
                        }`}
                    >
                      {isChecked && <Check className="size-3 stroke-[3]" />}
                    </div>
                    <span className="truncate">{source}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>

        {/* Last Interaction Section */}
        <div className="pb-4 mb-4">
          <button
            type="button"
            onClick={() => setIsInteractionOpen((prev) => !prev)}
            className="flex w-full items-center justify-between py-1 text-left cursor-pointer"
          >
            <span className="text-[14px] font-semibold text-[#1E293B]">
              Last Interaction
            </span>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
              {isInteractionOpen ? (
                <ChevronUp className="size-4 text-[#6B7280]" />
              ) : (
                <ChevronDown className="size-4 text-[#6B7280]" />
              )}
            </div>
          </button>

          {isInteractionOpen && (
            <div className="flex flex-wrap gap-2 pt-3">
              {LAST_INTERACTION_OPTIONS.map((preset) => {
                const isSelected = localFilters.lastInteraction === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => toggleInteraction(preset)}
                    className={`rounded-full border px-3.5 py-1.5 text-[13px] transition-colors cursor-pointer ${isSelected
                      ? 'border-[#111827] bg-[#111827] text-white font-medium'
                      : 'border-[#C6C6CD] bg-white text-[#0B1C30] hover:bg-[#F9FAFB]'
                      }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Created Date Section */}
        <div className="pb-2 mb-4">
          <button
            type="button"
            onClick={() => setIsCreatedDateOpen((prev) => !prev)}
            className="flex w-full items-center justify-between py-1 text-left cursor-pointer"
          >
            <span className="text-[14px] font-semibold text-[#1E293B]">
              Created Date
            </span>
            <div className="flex items-center gap-1.5 text-[12px] text-[#64748B]">
              {isCreatedDateOpen ? (
                <ChevronUp className="size-4 text-[#6B7280]" />
              ) : (
                <ChevronDown className="size-4 text-[#6B7280]" />
              )}
            </div>
          </button>

          {isCreatedDateOpen && (
            <div className="flex flex-wrap gap-2 pt-3">
              {CREATED_DATE_OPTIONS.map((preset) => {
                const isSelected = localFilters.createdDate === preset;
                return (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => toggleCreatedDate(preset)}
                    className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition-colors cursor-pointer ${isSelected
                      ? 'border-[#111827] bg-[#111827] text-white font-medium'
                      : 'border-[#C6C6CD] bg-white text-[#0B1C30] hover:bg-[#F9FAFB]'
                      }`}
                  >
                    {preset}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
          <button
            type="button"
            onClick={handleClear}
            className="text-[12px] font-bold text-[#999999] hover:text-[#111827] cursor-pointer"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="rounded-[8px] bg-[#7A9601] hover:bg-[#597818] px-4 py-2 text-[12px] font-bold text-white shadow-xs transition-colors cursor-pointer"
          >
            Apply Filter{currentCount > 0 ? `(${currentCount})` : ''}
          </button>
        </div>
      </div>
    </>
  );
};
export default LeadsFilterModal;
