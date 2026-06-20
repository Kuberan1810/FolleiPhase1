import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronDown, Check } from 'lucide-react';

interface CustomerFilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatuses: string[];
  currentUsages: string[];
  onApply: (filters: { statuses: string[]; usages: string[] }) => void;
}

const STATUS_OPTIONS = ['Active', 'At Risk', 'Onboarding', 'Renewal Due'];
const USAGE_OPTIONS = ['High', 'Medium', 'Low'];

export const CustomerFilterPanel: React.FC<CustomerFilterPanelProps> = ({
  isOpen,
  onClose,
  currentStatuses,
  currentUsages,
  onApply
}) => {
  const [draftStatuses, setDraftStatuses] = useState<string[]>(currentStatuses);
  const [draftUsages, setDraftUsages] = useState<string[]>(currentUsages);

  // Dropdown open states
  const [statusOpen, setStatusOpen] = useState(false);
  const [usageOpen, setUsageOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const usageRef = useRef<HTMLDivElement>(null);

  // Sync draft states when panel opens or filters change
  useEffect(() => {
    if (isOpen) {
      setDraftStatuses(currentStatuses);
      setDraftUsages(currentUsages);
      setStatusOpen(false);
      setUsageOpen(false);
    }
  }, [isOpen, currentStatuses, currentUsages]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (statusRef.current && !statusRef.current.contains(target)) {
        setStatusOpen(false);
      }
      if (usageRef.current && !usageRef.current.contains(target)) {
        setUsageOpen(false);
      }
      if (containerRef.current && !containerRef.current.contains(target)) {
        onClose();
      }
    };

    if (isOpen) {
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleToggleStatus = (status: string) => {
    if (draftStatuses.includes(status)) {
      setDraftStatuses(draftStatuses.filter(s => s !== status));
    } else {
      setDraftStatuses([...draftStatuses, status]);
    }
  };

  const handleToggleUsage = (usage: string) => {
    if (draftUsages.includes(usage)) {
      setDraftUsages(draftUsages.filter(u => u !== usage));
    } else {
      setDraftUsages([...draftUsages, usage]);
    }
  };

  const handleRemoveStatus = (status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftStatuses(draftStatuses.filter(s => s !== status));
  };

  const handleRemoveUsage = (usage: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftUsages(draftUsages.filter(u => u !== usage));
  };

  const totalSelectedCount = draftStatuses.length + draftUsages.length;

  const handleApply = () => {
    onApply({
      statuses: draftStatuses,
      usages: draftUsages
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute right-0 mt-2 w-[380px] bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-xl z-[150] animate-in fade-in zoom-in-95 duration-200 origin-top-right flex flex-col gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB]">
        <span className="font-bold text-[#0F172A] text-[20px]">Filters</span>
        <button
          onClick={onClose}
          className="p-1 text-[#94A3B8] hover:text-slate-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Status Field */}
      <div className="flex flex-col gap-1.5" ref={statusRef}>
        <div className="flex justify-between items-center text-[14px] font-semibold">
          <span className="text-[#1E293B]">Status</span>
          {draftStatuses.length > 0 && (
            <span className="text-[#64748B] font-medium">{draftStatuses.length} selected</span>
          )}
        </div>
        <div className="relative">
          <div
            onClick={() => {
              setStatusOpen(!statusOpen);
              setUsageOpen(false);
            }}
            className="flex items-center justify-between border border-[#E5E7EB] hover:border-slate-300 rounded-xl px-3 py-2 min-h-[42px] cursor-pointer bg-white transition-colors"
          >
            <div className="flex flex-wrap gap-1.5 max-w-[280px]">
              {draftStatuses.length === 0 ? (
                <span className="text-slate-400 text-sm font-medium">Select</span>
              ) : (
                draftStatuses.map(status => (
                  <span
                    key={status}
                    className="flex items-center gap-1 bg-[#F1F5F9] text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md hover:bg-slate-200 transition-colors"
                  >
                    {status}
                    <X
                      className="w-3 h-3 hover:text-red-500 cursor-pointer shrink-0"
                      onClick={(e) => handleRemoveStatus(status, e)}
                    />
                  </span>
                ))
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          </div>

          {statusOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl py-1 shadow-lg z-[200] max-h-48 overflow-y-auto">
              {STATUS_OPTIONS.map(status => {
                const isSelected = draftStatuses.includes(status);
                return (
                  <div
                    key={status}
                    onClick={() => handleToggleStatus(status)}
                    className="flex items-center justify-between px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <span className={isSelected ? 'font-semibold text-[#004370]' : 'font-medium'}>
                      {status}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#004370] shrink-0" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Usage Field */}
      <div className="flex flex-col gap-1.5" ref={usageRef}>
        <div className="flex justify-between items-center text-[14px] font-semibold">
          <span className="text-[#1E293B]">Usage</span>
          {draftUsages.length > 0 && (
            <span className="text-[#64748B] font-medium">{draftUsages.length} selected</span>
          )}
        </div>
        <div className="relative">
          <div
            onClick={() => {
              setUsageOpen(!usageOpen);
              setStatusOpen(false);
            }}
            className="flex items-center justify-between border border-[#E5E7EB] hover:border-slate-300 rounded-xl px-3 py-2 min-h-[42px] cursor-pointer bg-white transition-colors"
          >
            <div className="flex flex-wrap gap-1.5 max-w-[280px]">
              {draftUsages.length === 0 ? (
                <span className="text-slate-400 text-sm font-medium">Select</span>
              ) : (
                draftUsages.map(usage => (
                  <span
                    key={usage}
                    className="flex items-center gap-1 bg-[#F1F5F9] text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md hover:bg-slate-200 transition-colors"
                  >
                    {usage}
                    <X
                      className="w-3 h-3 hover:text-red-500 cursor-pointer shrink-0"
                      onClick={(e) => handleRemoveUsage(usage, e)}
                    />
                  </span>
                ))
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          </div>

          {usageOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl py-1 shadow-lg z-[200] max-h-48 overflow-y-auto">
              {USAGE_OPTIONS.map(usage => {
                const isSelected = draftUsages.includes(usage);
                return (
                  <div
                    key={usage}
                    onClick={() => handleToggleUsage(usage)}
                    className="flex items-center justify-between px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <span className={isSelected ? 'font-semibold text-[#004370]' : 'font-medium'}>
                      {usage}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#004370] shrink-0" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 pt-2 mt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer hover:bg-slate-50 rounded-xl"
        >
          Cancel
        </button>
        <button
          onClick={handleApply}
          className="bg-[#004370] hover:bg-[#003152] text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer shadow-[0_2px_8px_rgba(0,67,112,0.15)] flex items-center"
        >
          Apply Filter{totalSelectedCount > 0 ? `(${totalSelectedCount})` : ''}
        </button>
      </div>
    </div>
  );
};
