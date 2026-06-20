import React, { useState, useRef, useEffect } from 'react';
import { X, Search, ChevronDown, Check } from 'lucide-react';

type FilterPanelProps = {
  show: boolean;
  onClose: () => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  selectedStatuses: string[];
  onStatusesChange: (vals: string[]) => void;
  selectedScores: string[];
  onScoresChange: (vals: string[]) => void;
  selectedSources: string[];
  onSourcesChange: (vals: string[]) => void;
  onApply: () => void;
  onClear: () => void;
};

const STATUS_OPTIONS = ['NEW INQUIRY', 'CONTACTED', 'DEMO SCHEDULED', 'PROPOSAL'];
const SCORE_OPTIONS = ['Hot', 'Warm', 'Cold'];
const SOURCE_OPTIONS = ['website', 'campaign', 'shield', 'external'];

const formatStatus = (s: string) => {
  if (s === 'NEW INQUIRY') return 'New Inquiry';
  if (s === 'DEMO SCHEDULED') return 'Demo Scheduled';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

const formatSource = (src: string) => {
  if (src === 'website') return 'Website';
  if (src === 'campaign') return 'Campaign';
  if (src === 'shield') return 'Referral';
  if (src === 'external') return 'Import';
  return src.charAt(0).toUpperCase() + src.slice(1).toLowerCase();
};

const FilterPanel: React.FC<FilterPanelProps> = ({
  show,
  onClose,
  searchQuery,
  onSearchChange,
  selectedStatuses,
  onStatusesChange,
  selectedScores,
  onScoresChange,
  selectedSources,
  onSourcesChange,
  onApply,
  onClear
}) => {
  const [openDropdown, setOpenDropdown] = useState<'status' | 'score' | 'source' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        openDropdown === 'status' &&
        statusRef.current &&
        !statusRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (
        openDropdown === 'score' &&
        scoreRef.current &&
        !scoreRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
      if (
        openDropdown === 'source' &&
        sourceRef.current &&
        !sourceRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }

      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        const isFilterBtn = (e.target as HTMLElement).closest('.filter-btn-trigger');
        if (!isFilterBtn) {
          onClose();
        }
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [openDropdown, onClose]);

  if (!show) return null;

  const toggleOption = (list: string[], onChange: (vals: string[]) => void, val: string) => {
    if (list.includes(val)) {
      onChange(list.filter(x => x !== val));
    } else {
      onChange([...list, val]);
    }
  };

  const removeBadge = (e: React.MouseEvent, list: string[], onChange: (vals: string[]) => void, val: string) => {
    e.stopPropagation();
    onChange(list.filter(x => x !== val));
  };

  const totalSelectedCount = selectedStatuses.length + selectedScores.length + selectedSources.length;

  return (
    <div
      ref={containerRef}
      className="fixed md:absolute left-1/2 md:left-auto md:right-0 top-1/2 md:top-auto -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0 mt-0 md:mt-2 w-[340px] max-w-[calc(100vw-32px)] z-[100] bg-white rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col overflow-hidden max-h-[90vh] font-manrope text-left"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
        <h2 className="text-[20px] font-bold text-slate-800">Filters</h2>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-4.5 h-4.5" />
        </button>
      </div>

      {/* Form Fields */}
      <div className="flex-1 overflow-visible px-5 py-4 space-y-5">
        {/* Search Field */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-[13px] text-slate-700 placeholder-slate-400 focus:outline-none focus:border-slate-300 transition-colors font-medium"
          />
        </div>

        {/* Status Dropdown */}
        <div className="relative" ref={statusRef}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[16px] font-semibold text-slate-700">Status</span>
            {selectedStatuses.length > 0 && (
              <span className="text-[12px] font-medium text-[#64748B]">
                {selectedStatuses.length} selected
              </span>
            )}
          </div>
          <div
            onClick={() => setOpenDropdown(openDropdown === 'status' ? null : 'status')}
            className="w-full min-h-[40px] border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between bg-white cursor-pointer hover:border-slate-300 transition-colors select-none"
          >
            <div className="flex flex-wrap gap-1 min-w-0 pr-2">
              {selectedStatuses.length > 0 ? (
                selectedStatuses.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center bg-[#F3F4F6] text-[#000000] text-[13px] font-medium leading-[19.5px] px-2 py-0.5 rounded-[4px]"
                  >
                    {formatStatus(s)}
                    <X
                      onClick={(e) => removeBadge(e, selectedStatuses, onStatusesChange, s)}
                      className="w-2.5 h-2.5 ml-1 text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
                    />
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-[13px] font-medium">Select status</span>
              )}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>

          {openDropdown === 'status' && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
              {STATUS_OPTIONS.map((status) => {
                const isChecked = selectedStatuses.includes(status);
                return (
                  <div
                    key={status}
                    onClick={() => toggleOption(selectedStatuses, onStatusesChange, status)}
                    className="px-3.5 py-2 text-[13px] font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <span>{formatStatus(status)}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-[#004370]" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Score Dropdown */}
        <div className="relative" ref={scoreRef}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[16px] font-semibold text-slate-700">Score</span>
            {selectedScores.length > 0 && (
              <span className="text-[12px] font-medium text-[#64748B]">
                {selectedScores.length} selected
              </span>
            )}
          </div>
          <div
            onClick={() => setOpenDropdown(openDropdown === 'score' ? null : 'score')}
            className="w-full min-h-[40px] border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between bg-white cursor-pointer hover:border-slate-300 transition-colors select-none"
          >
            <div className="flex flex-wrap gap-1 min-w-0 pr-2">
              {selectedScores.length > 0 ? (
                selectedScores.map((score) => (
                  <span
                    key={score}
                    className="inline-flex items-center bg-[#F3F4F6] text-[#000000] text-[13px] font-medium leading-[19.5px] px-2 py-0.5 rounded-[4px]"
                  >
                    {score}
                    <X
                      onClick={(e) => removeBadge(e, selectedScores, onScoresChange, score)}
                      className="w-2.5 h-2.5 ml-1 text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
                    />
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-[13px] font-medium">Select score</span>
              )}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>

          {openDropdown === 'score' && (
            <div className="absolute left-0 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
              {SCORE_OPTIONS.map((score) => {
                const isChecked = selectedScores.includes(score);
                return (
                  <div
                    key={score}
                    onClick={() => toggleOption(selectedScores, onScoresChange, score)}
                    className="px-3.5 py-2 text-[13px] font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <span>{score}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-[#004370]" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Source Dropdown */}
        <div className="relative" ref={sourceRef}>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[16px] font-semibold text-slate-700">Source</span>
            {selectedSources.length > 0 && (
              <span className="text-[12px] font-medium text-[#64748B]">
                {selectedSources.length} selected
              </span>
            )}
          </div>
          <div
            onClick={() => setOpenDropdown(openDropdown === 'source' ? null : 'source')}
            className="w-full min-h-[40px] border border-slate-200 rounded-xl px-3 py-1.5 flex items-center justify-between bg-white cursor-pointer hover:border-slate-300 transition-colors select-none"
          >
            <div className="flex flex-wrap gap-1 min-w-0 pr-2">
              {selectedSources.length > 0 ? (
                selectedSources.map((src) => (
                  <span
                    key={src}
                    className="inline-flex items-center bg-[#F3F4F6] text-[#000000] text-[13px] font-medium leading-[19.5px] px-2 py-0.5 rounded-[4px]"
                  >
                    {formatSource(src)}
                    <X
                      onClick={(e) => removeBadge(e, selectedSources, onSourcesChange, src)}
                      className="w-2.5 h-2.5 ml-1 text-slate-400 hover:text-slate-600 cursor-pointer shrink-0"
                    />
                  </span>
                ))
              ) : (
                <span className="text-slate-400 text-[13px] font-medium">Select source</span>
              )}
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>

          {openDropdown === 'source' && (
            <div className="absolute left-0 bottom-full mb-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
              {SOURCE_OPTIONS.map((src) => {
                const isChecked = selectedSources.includes(src);
                return (
                  <div
                    key={src}
                    onClick={() => toggleOption(selectedSources, onSourcesChange, src)}
                    className="px-3.5 py-2 text-[13px] font-medium text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors flex items-center justify-between"
                  >
                    <span>{formatSource(src)}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-[#004370]" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={onClear}
          className="text-slate-500 hover:text-slate-800 text-[13px] font-bold cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onApply}
          className="bg-[#004370] text-white px-4 py-2 rounded-xl text-[13px] font-bold hover:bg-[#003152] transition-colors cursor-pointer shadow-sm"
        >
          Apply Filter{totalSelectedCount > 0 ? `(${totalSelectedCount})` : ''}
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
