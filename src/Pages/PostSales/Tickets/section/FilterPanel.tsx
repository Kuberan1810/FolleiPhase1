import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronDown, Check } from 'lucide-react';

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  currentSearch: string;
  currentStatuses: string[];
  currentPriorities: string[];
  currentTicketTypes: string[];
  onApply: (filters: {
    search: string;
    statuses: string[];
    priorities: string[];
    ticketTypes: string[];
  }) => void;
}

const STATUS_OPTIONS = ['New', 'In Progress', 'Waiting', 'Resolved', 'Closed'];
const PRIORITY_OPTIONS = ['Critical', 'Medium', 'Low'];
const TICKET_TYPE_OPTIONS = [
  'General Support',
  'Account & Access',
  'Billing & Subscription',
  'Product & Usage',
  'Sale & Customer Success',
  'Security & Compliance',
  'Orders & Delivery',
  'Internal IT'
];

export const FilterPanel: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  currentSearch,
  currentStatuses,
  currentPriorities,
  currentTicketTypes,
  onApply
}) => {
  const [draftSearch, setDraftSearch] = useState(currentSearch);
  const [draftStatuses, setDraftStatuses] = useState<string[]>(currentStatuses);
  const [draftPriorities, setDraftPriorities] = useState<string[]>(currentPriorities);
  const [draftTicketTypes, setDraftTicketTypes] = useState<string[]>(currentTicketTypes);

  // Sub-dropdown open states
  const [statusOpen, setStatusOpen] = useState(false);
  const [priorityOpen, setPriorityOpen] = useState(false);
  const [ticketTypeOpen, setTicketTypeOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const priorityRef = useRef<HTMLDivElement>(null);
  const ticketTypeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setDraftSearch(currentSearch);
      setDraftStatuses(currentStatuses);
      setDraftPriorities(currentPriorities);
      setDraftTicketTypes(currentTicketTypes);
      setStatusOpen(false);
      setPriorityOpen(false);
      setTicketTypeOpen(false);
    }
  }, [isOpen, currentSearch, currentStatuses, currentPriorities, currentTicketTypes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (statusRef.current && !statusRef.current.contains(target)) {
        setStatusOpen(false);
      }
      if (priorityRef.current && !priorityRef.current.contains(target)) {
        setPriorityOpen(false);
      }
      if (ticketTypeRef.current && !ticketTypeRef.current.contains(target)) {
        setTicketTypeOpen(false);
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

  // Toggle multi-select status
  const handleToggleStatus = (status: string) => {
    if (draftStatuses.includes(status)) {
      setDraftStatuses(draftStatuses.filter(s => s !== status));
    } else {
      setDraftStatuses([...draftStatuses, status]);
    }
  };

  // Toggle multi-select priority
  const handleTogglePriority = (priority: string) => {
    if (draftPriorities.includes(priority)) {
      setDraftPriorities(draftPriorities.filter(p => p !== priority));
    } else {
      setDraftPriorities([...draftPriorities, priority]);
    }
  };

  // Toggle multi-select ticket type
  const handleToggleTicketType = (type: string) => {
    if (draftTicketTypes.includes(type)) {
      setDraftTicketTypes(draftTicketTypes.filter(t => t !== type));
    } else {
      setDraftTicketTypes([...draftTicketTypes, type]);
    }
  };

  const handleRemoveStatus = (status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftStatuses(draftStatuses.filter(s => s !== status));
  };

  const handleRemovePriority = (priority: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftPriorities(draftPriorities.filter(p => p !== priority));
  };

  const handleRemoveTicketType = (type: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraftTicketTypes(draftTicketTypes.filter(t => t !== type));
  };

  const totalSelectedCount = draftStatuses.length + draftPriorities.length + draftTicketTypes.length;

  const handleApply = () => {
    onApply({
      search: draftSearch,
      statuses: draftStatuses,
      priorities: draftPriorities,
      ticketTypes: draftTicketTypes
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute right-0 mt-2 w-[380px] bg-white border border-[#E5E7EB] rounded-[20px] p-5 shadow-xl z-[150] animate-in fade-in zoom-in-95 duration-200 origin-top-right flex flex-col gap-4"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex justify-between items-center pb-2 border-b border-[#E5E7EB] ">
        <span className="font-bold text-[#0F172A] text-[20px] ">Filters</span>
        <button
          onClick={onClose}
          className="p-1 text-[#94A3B8] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input */}
      <div className="relative flex items-center bg-white border border-[#E5E7EB] rounded-xl px-3 py-1.5 focus-within:border-[#004370] transition-colors">
        <Search className="w-4 h-4 text-[#94A3B8] mr-2 shrink-0" />
        <input
          type="text"
          value={draftSearch}
          onChange={(e) => setDraftSearch(e.target.value)}
          placeholder="Search"
          className="w-full bg-transparent border-0 outline-none text-slate-800 text-sm font-medium placeholder:text-slate-400 py-1"
        />
        {draftSearch && (
          <button
            onClick={() => setDraftSearch('')}
            className="text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
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
              setPriorityOpen(false);
              setTicketTypeOpen(false);
            }}
            className="flex items-center justify-between border border-[#E5E7EB] hover:border-slate-300 rounded-xl px-3 py-2 min-h-[42px] cursor-pointer bg-white transition-colors"
          >
            <div className="flex flex-wrap gap-1.5 max-w-[260px]">
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

      {/* Priority Field */}
      <div className="flex flex-col gap-1.5" ref={priorityRef}>
        <div className="flex justify-between items-center text-[14px] font-semibold">
          <span className="text-[#1E293B]">Priority</span>
          {draftPriorities.length > 0 && (
            <span className="text-[#64748B] font-medium">{draftPriorities.length} selected</span>
          )}
        </div>
        <div className="relative">
          <div
            onClick={() => {
              setPriorityOpen(!priorityOpen);
              setStatusOpen(false);
              setTicketTypeOpen(false);
            }}
            className="flex items-center justify-between border border-[#E5E7EB] hover:border-slate-300 rounded-xl px-3 py-2 min-h-[42px] cursor-pointer bg-white transition-colors"
          >
            <div className="flex flex-wrap gap-1.5 max-w-[260px]">
              {draftPriorities.length === 0 ? (
                <span className="text-slate-400 text-sm font-medium">Select</span>
              ) : (
                draftPriorities.map(priority => (
                  <span
                    key={priority}
                    className="flex items-center gap-1 bg-[#F1F5F9] text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md hover:bg-slate-200 transition-colors"
                  >
                    {priority}
                    <X
                      className="w-3 h-3 hover:text-red-500 cursor-pointer shrink-0"
                      onClick={(e) => handleRemovePriority(priority, e)}
                    />
                  </span>
                ))
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          </div>

          {priorityOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl py-1 shadow-lg z-[200] max-h-48 overflow-y-auto">
              {PRIORITY_OPTIONS.map(priority => {
                const isSelected = draftPriorities.includes(priority);
                return (
                  <div
                    key={priority}
                    onClick={() => handleTogglePriority(priority)}
                    className="flex items-center justify-between px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <span className={isSelected ? 'font-semibold text-[#004370]' : 'font-medium'}>
                      {priority}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-[#004370] shrink-0" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Ticket Type Field */}
      <div className="flex flex-col gap-1.5" ref={ticketTypeRef}>
        <div className="flex justify-between items-center text-[14px] font-semibold">
          <span className="text-[#1E293B]">Ticket Type</span>
          {draftTicketTypes.length > 0 && (
            <span className="text-[#64748B] font-medium">{draftTicketTypes.length} selected</span>
          )}
        </div>
        <div className="relative">
          <div
            onClick={() => {
              setTicketTypeOpen(!ticketTypeOpen);
              setStatusOpen(false);
              setPriorityOpen(false);
            }}
            className="flex items-center justify-between border border-[#E5E7EB] hover:border-slate-300 rounded-xl px-3 py-2 min-h-[42px] cursor-pointer bg-white transition-colors"
          >
            <div className="flex flex-wrap gap-1.5 max-w-[260px] overflow-hidden truncate">
              {draftTicketTypes.length === 0 ? (
                <span className="text-slate-400 text-sm font-medium">Select</span>
              ) : (
                draftTicketTypes.map(type => (
                  <span
                    key={type}
                    className="flex items-center gap-1 bg-[#F1F5F9] text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-md hover:bg-slate-200 transition-colors shrink-0"
                  >
                    {type}
                    <X
                      className="w-3 h-3 hover:text-red-500 cursor-pointer shrink-0"
                      onClick={(e) => handleRemoveTicketType(type, e)}
                    />
                  </span>
                ))
              )}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
          </div>

          {ticketTypeOpen && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-[#E5E7EB] rounded-xl py-1 shadow-lg z-[200] max-h-48 overflow-y-auto">
              {TICKET_TYPE_OPTIONS.map(type => {
                const isSelected = draftTicketTypes.includes(type);
                return (
                  <div
                    key={type}
                    onClick={() => handleToggleTicketType(type)}
                    className="flex items-center justify-between px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <span className={isSelected ? 'font-semibold text-[#004370]' : 'font-medium'}>
                      {type}
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
      <div className="flex items-center justify-end gap-3 pt-2 mt-2">
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
