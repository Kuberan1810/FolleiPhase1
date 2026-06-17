import React from 'react';
import { ArrowUpDown } from 'lucide-react';

type SortDropdownProps = {
  sortField: 'name' | 'activity' | 'budget' | 'assigned';
  sortDirection: 'asc' | 'desc';
  draftSortField: 'name' | 'activity' | 'budget' | 'assigned' | null;
  draftSortDirection: 'asc' | 'desc' | null;
  setDraftSortField: (field: 'name' | 'activity' | 'budget' | 'assigned' | null) => void;
  setDraftSortDirection: (dir: 'asc' | 'desc' | null) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  setSortField: (field: 'name' | 'activity' | 'budget' | 'assigned') => void;
  setSortDirection: (dir: 'asc' | 'desc') => void;
};

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortField,
  sortDirection,
  draftSortField,
  draftSortDirection,
  setDraftSortField,
  setDraftSortDirection,
  showSortDropdown,
  setShowSortDropdown,
  setSortField,
  setSortDirection
}) => {
  return (
    <div className="relative">
      <button
        onClick={() => setShowSortDropdown(!showSortDropdown)}
        className="flex items-center gap-1.5 bg-transparent border-none text-[11px] font-bold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
        SORT
      </button>

      {showSortDropdown && (
        <>
          {/* Backdrop overlay to close when clicking outside */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowSortDropdown(false)}
          />
          
          <div className="absolute left-0 mt-2 w-[220px] bg-white border border-slate-200 rounded-2xl z-50 overflow-hidden">
            {/* Dropdown Header */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-[#F8FAFC]">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#004370]" />
              <span 
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: '11px',
                  lineHeight: '16px',
                  letterSpacing: '0.6px',
                  textTransform: 'uppercase',
                  color: '#004370'
                }}
              >
                SORT
              </span>
            </div>

            {/* Section 1: Chosen Field */}
            {draftSortField && (
              <div 
                className="px-4 py-2.5 flex items-center gap-2 text-slate-700 cursor-pointer hover:bg-slate-50 border-b border-slate-100/50"
                onClick={() => {
                  setDraftSortField(null);
                  setDraftSortDirection(null);
                }}
              >
                <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-[13px] font-medium font-manrope">
                  {draftSortField === 'name' && 'Lead Name'}
                  {draftSortField === 'activity' && 'Last Activity Time'}
                  {draftSortField === 'budget' && 'Budget Value'}
                  {draftSortField === 'assigned' && 'Assigned To'}
                </span>
              </div>
            )}

            {/* Section 2: Chosen Direction */}
            {draftSortField && draftSortDirection && (
              <div 
                className="px-4 py-2.5 flex items-center gap-2 text-slate-700 cursor-pointer hover:bg-slate-50 border-b border-slate-100/50"
                onClick={() => {
                  setDraftSortDirection(null);
                }}
              >
                <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span className="text-[13px] font-medium font-manrope">
                  {draftSortDirection === 'asc' ? 'Ascending' : 'Descending'}
                </span>
              </div>
            )}

            {/* Accordion Selector / Options list */}
            {(!draftSortField || !draftSortDirection) && (
              <div>
                <div className="bg-[#EFF6FF]/40 px-4 py-2 flex items-center gap-2 border-b border-slate-100">
                  <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
                    <path d="M5 8h14l-7 11z" />
                  </svg>
                  <span 
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      fontSize: '11px',
                      lineHeight: '16px',
                      letterSpacing: '0.6px',
                      textTransform: 'uppercase',
                      color: '#004370'
                    }}
                  >
                    CHOOSE
                  </span>
                </div>
                
                <div className="py-1">
                  {!draftSortField ? (
                    <>
                      <div 
                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => setDraftSortField('name')}
                      >
                        Lead Name
                      </div>
                      <div 
                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => setDraftSortField('activity')}
                      >
                        Last Activity Time
                      </div>
                      <div 
                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => setDraftSortField('budget')}
                      >
                        Budget Value
                      </div>
                      <div 
                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => setDraftSortField('assigned')}
                      >
                        Assigned To
                      </div>
                    </>
                  ) : (
                    <>
                      <div 
                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => setDraftSortDirection('asc')}
                      >
                        Ascending
                      </div>
                      <div 
                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                        onClick={() => setDraftSortDirection('desc')}
                      >
                        Descending
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Actions buttons */}
            <div className="p-3 border-t border-slate-100 flex justify-end gap-2 bg-[#F8FAFC]">
              <button 
                onClick={() => {
                  setDraftSortField(sortField);
                  setDraftSortDirection(sortDirection);
                  setShowSortDropdown(false);
                }}
                className="px-3 py-1.5 text-[12px] font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer bg-transparent border-none"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  if (draftSortField && draftSortDirection) {
                    setSortField(draftSortField);
                    setSortDirection(draftSortDirection);
                  }
                  setShowSortDropdown(false);
                }}
                className="px-4 py-1.5 bg-[#004370] text-white rounded-lg text-[12px] font-semibold hover:bg-[#002D4C] transition-colors cursor-pointer border-none"
              >
                Apply
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SortDropdown;
