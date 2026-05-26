import React, { useState, useRef, useEffect } from 'react';
import { Flame, ArrowUpDown } from 'lucide-react';
import { type LeadActivity } from './RecentEngagementActivity';
import avatarImg from '../../../../../assets/avatar.png';
import { Sort } from 'iconsax-react';

interface AllEngagementActivitiesProps {
  campaign: {
    id: number;
    name: string;
    date: string;
    status: string;
    statusColor: string;
  };
  activities: LeadActivity[];
  onBack: () => void;
  setExportCallback?: (cb: (() => void) | null) => void;
}

const AllEngagementActivities: React.FC<AllEngagementActivitiesProps> = ({
  campaign,
  activities,
  setExportCallback
}) => {
  const [activeStatuses, setActiveStatuses] = useState<string[]>([]);
  const [activeScores, setActiveScores] = useState<string[]>([]);
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [showAZPopup, setShowAZPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setShowAZPopup(false);
      }
    };
    if (showAZPopup) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showAZPopup]);
  const [tempStatuses, setTempStatuses] = useState<string[]>([]);
  const [tempScores, setTempScores] = useState<string[]>([]);

  const [isStatusExpanded, setIsStatusExpanded] = useState(true);
  const [isScoreExpanded, setIsScoreExpanded] = useState(true);

  const [sortField, setSortField] = useState<'name' | 'time' | 'budget'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [tempSortField, setTempSortField] = useState<'name' | 'time' | 'budget' | null>('time');
  const [tempSortOrder, setTempSortOrder] = useState<'asc' | 'desc' | null>('desc');

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const openFilterPopover = () => {
    setTempStatuses([...activeStatuses]);
    setTempScores([...activeScores]);
    setIsFilterOpen(true);
    setIsSortOpen(false);
  };

  // const openSortPopover = () => {
  //   setTempSortField(sortField);
  //   setTempSortOrder(sortOrder);
  //   setIsSortOpen(true);
  //   setIsFilterOpen(false);
  // };

  const handleToggleTempStatus = (status: string) => {
    const upperStatus = status.toUpperCase();
    if (tempStatuses.includes(upperStatus)) {
      setTempStatuses(tempStatuses.filter(s => s !== upperStatus));
    } else {
      setTempStatuses([...tempStatuses, upperStatus]);
    }
  };

  const handleToggleTempScore = (score: string) => {
    if (tempScores.includes(score)) {
      setTempScores(tempScores.filter(s => s !== score));
    } else {
      setTempScores([...tempScores, score]);
    }
  };

  const handleApplyFilter = () => {
    setActiveStatuses([...tempStatuses]);
    setActiveScores([...tempScores]);
    setIsFilterOpen(false);
  };

  const handleApplySort = () => {
    if (tempSortField && tempSortOrder) {
      setSortField(tempSortField);
      setSortOrder(tempSortOrder);
    }
    setIsSortOpen(false);
  };

  const statusOptions = [
    'Opened',
    'Clicked Link',
    'Replied',
    'Demo scheduled',
    'Proposal',
    'Negotiation',
    'Converted',
    'Not Converted'
  ];

  const scoreOptions = ['Hot', 'Warm', 'Cold'];

  const filteredActivities = activities.filter(act => {
    const matchesStatus =
      activeStatuses.length === 0 ||
      activeStatuses.includes(act.status.toUpperCase());

    const matchesScore =
      activeScores.length === 0 ||
      activeScores.includes(act.score);

    const matchesLetter = selectedLetter === 'All' || act.name.trim().toUpperCase().startsWith(selectedLetter);

    return matchesStatus && matchesScore && matchesLetter;
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    let valA: any = 0;
    let valB: any = 0;

    if (sortField === 'name') {
      valA = a.name.toLowerCase();
      valB = b.name.toLowerCase();
    } else if (sortField === 'budget') {
      valA = a.budget || 0;
      valB = b.budget || 0;
    } else {
      valA = a.timestamp || 0;
      valB = b.timestamp || 0;
    }

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Company', 'Status', 'Score', 'Time', 'Channel'];

    const rows = sortedActivities.map(act => [
      act.name,
      act.email,
      act.company,
      act.status,
      act.score,
      act.time,
      act.channel
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${campaign.name.replace(/\s+/g, '_')}_leads_export.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (setExportCallback) {
      setExportCallback(() => handleExportCSV);
    }
    return () => {
      if (setExportCallback) {
        setExportCallback(null);
      }
    };
  }, [sortedActivities, setExportCallback]);

  return (
    <div className="font-manrope animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
      <div className="flex items-center gap-6 mb-6 px-1 relative">

        <div className="relative" ref={filterRef}>
          <button
            onClick={isFilterOpen ? () => setIsFilterOpen(false) : openFilterPopover}
            className="flex items-center gap-2 text-[#464555] hover:text-[#004370] font-manrope font-bold text-[12px] uppercase tracking-[1px] cursor-pointer transition-colors"
          >
            <Sort size={14} className="stroke-[2.5]" color="#464555" />
            Filters
            {(activeStatuses.length > 0 || activeScores.length > 0)}
          </button>

          {isFilterOpen && (
            <div className="absolute left-0 mt-3.5 w-[200px] bg-white z-50 font-manrope animate-in fade-in slide-in-from-top-2 duration-200">

              <div className="mb-4 ">
                <div
                  onClick={() => setIsStatusExpanded(!isStatusExpanded)}
                  className="flex items-center gap-1.5 mb-2.5 bg-[#F6FAFF] p-3 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <span className="text-[#3525CD] text-[9px] select-none">
                    {isStatusExpanded ? '▼' : '▶'}
                  </span>
                  <span className="text-[12px] font-bold text-[#004370] uppercase tracking-[1px]">
                    Status
                  </span>
                </div>
                {isStatusExpanded && (
                  <div className="space-y-1.5 pl-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {statusOptions.map(status => (
                      <label key={status} className="flex items-center gap-2.5 py-1 px-1 cursor-pointer select-none text-[14px] font-medium text-[#0B1C30]">
                        <input
                          type="checkbox"
                          checked={tempStatuses.includes(status.toUpperCase())}
                          onChange={() => handleToggleTempStatus(status)}
                          className="accent-[#3525CD] rounded border-[#626262] w-4 h-4 cursor-pointer"
                        />
                        {status}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div
                  onClick={() => setIsScoreExpanded(!isScoreExpanded)}
                  className="flex items-center gap-1.5 mb-2.5 bg-[#F6FAFF] p-3 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                >
                  <span className="text-[#3525CD] text-[9px] select-none">
                    {isScoreExpanded ? '▼' : '▶'}
                  </span>
                  <span className="text-[12px] font-bold text-[#004370] uppercase tracking-[1px]">
                    Score
                  </span>
                </div>
                {isScoreExpanded && (
                  <div className="space-y-1.5 pl-1 animate-in fade-in slide-in-from-top-1 duration-150">
                    {scoreOptions.map(score => (
                      <label key={score} className="flex items-center gap-2.5 py-1 px-1 cursor-pointer select-none text-[14px] font-medium text-[#0B1C30]">
                        <input
                          type="checkbox"
                          checked={tempScores.includes(score)}
                          onChange={() => handleToggleTempScore(score)}
                          className="accent-[#3525CD] rounded border-[#626262] w-4 h-4 cursor-pointer"
                        />
                        {score}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 mt-3">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="py-2 text-[12px] font-bold text-[#999999] hover:text-[#004370] transition-colors cursor-pointer text-left pl-1"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyFilter}
                  className="py-2 px-4 text-[12px] font-bold text-white bg-[#004370] rounded-[10px] hover:bg-[#003356] transition-colors cursor-pointer text-center"
                >
                  Apply Filter
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={sortRef}>
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-1.5 bg-transparent border-none text-[11px] font-bold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            SORT
          </button>

          {isSortOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsSortOpen(false)}
              />
              
              <div className="absolute left-0 mt-2 w-[220px] bg-white border border-slate-200 rounded-2xl z-50 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
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
                {tempSortField && (
                  <div 
                    className="px-4 py-2.5 flex items-center gap-2 text-slate-700 cursor-pointer hover:bg-slate-50 border-b border-slate-100/50"
                    onClick={() => {
                      setTempSortField(null);
                      setTempSortOrder(null);
                    }}
                  >
                    <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="text-[13px] font-medium font-manrope">
                      {tempSortField === 'name' && 'Lead Name'}
                      {tempSortField === 'time' && 'Last Activity Time'}
                      {tempSortField === 'budget' && 'Budget Value'}
                    </span>
                  </div>
                )}

                {tempSortField && tempSortOrder && (
                  <div 
                    className="px-4 py-2.5 flex items-center gap-2 text-slate-700 cursor-pointer hover:bg-slate-50 border-b border-slate-100/50"
                    onClick={() => {
                      setTempSortOrder(null);
                    }}
                  >
                    <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span className="text-[13px] font-medium font-manrope">
                      {tempSortOrder === 'asc' ? 'Ascending' : 'Descending'}
                    </span>
                  </div>
                )}

                {/* Accordion Selector / Options list */}
                {(!tempSortField || !tempSortOrder) && (
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
                      {!tempSortField ? (
                        <>
                          <div 
                            className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => setTempSortField('name')}
                          >
                            Lead Name
                          </div>
                          <div 
                            className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => setTempSortField('time')}
                          >
                            Last Activity Time
                          </div>
                          <div 
                            className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => setTempSortField('budget')}
                          >
                            Budget Value
                          </div>
                        </>
                      ) : (
                        <>
                          <div 
                            className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => setTempSortOrder('asc')}
                          >
                            Ascending
                          </div>
                          <div 
                            className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                            onClick={() => setTempSortOrder('desc')}
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
                      setTempSortField(sortField);
                      setTempSortOrder(sortOrder);
                      setIsSortOpen(false);
                    }}
                    className="px-3 py-1.5 text-[12px] font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer bg-transparent border-none"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleApplySort}
                    className="px-4 py-1.5 bg-[#004370] text-white rounded-lg text-[12px] font-semibold hover:bg-[#002D4C] transition-colors cursor-pointer border-none"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0 bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden">
          <div className={`overflow-x-auto min-h-[320px] transition-all duration-200 ${showAZPopup ? 'pb-28' : ''}`}>
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="h-12 py-0 pl-6 bg-[#F6FAFF] relative">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowAZPopup(!showAZPopup);
                      }}
                      className="flex items-center gap-1 cursor-pointer select-none group/hdr"
                    >
                      <span className="text-[12px] font-semibold text-[#434655] uppercase tracking-[1.5px] group-hover/hdr:text-[#004370] transition-colors">Lead</span>
                      <div className="flex items-center gap-0.5 text-[#434655] hover:text-[#004370] transition-colors font-bold text-[11px] tracking-normal ml-2 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">
                        <span>A-Z</span>
                        <span className="text-[8px] leading-none select-none">
                          {sortField === 'name' && sortOrder === 'asc' ? '▲' : sortField === 'name' && sortOrder === 'desc' ? '▼' : '▼'}
                        </span>
                      </div>
                    </div>

                    {showAZPopup && (
                      <div
                        ref={popupRef}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-[42px] left-6 mt-1 z-50 bg-white border border-[#E2E8F0] rounded-[16px] p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent w-14 flex flex-col items-center gap-0.5"
                      >
                        {['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map((letter) => (
                          <button
                            key={letter}
                            onClick={() => {
                              setSelectedLetter(letter);
                              setShowAZPopup(false);
                            }}
                            className={`w-10 h-8 shrink-0 flex items-center justify-center text-[13px] font-bold transition-all duration-150 cursor-pointer ${selectedLetter === letter
                                ? 'text-[#004370]'
                                : 'text-[#434655] hover:bg-slate-50 hover:text-[#004370]'
                              }`}
                          >
                            {letter}
                          </button>
                        ))}
                      </div>
                    )}
                  </th>
                  <th className="h-12 py-0 px-4 text-[12px] font-semibold text-[#434655] bg-[#F6FAFF] uppercase tracking-[1.5px]">Status</th>
                  <th className="h-12 py-0 px-4 text-[12px] font-semibold text-[#434655] bg-[#F6FAFF] uppercase tracking-[1.5px]">Score</th>
                  <th className="h-12 py-0 pr-6 text-[12px] font-semibold text-[#434655] bg-[#F6FAFF] uppercase tracking-[1.5px] text-right">Activity</th>
                </tr>
              </thead>
              <tbody>
                {sortedActivities.length > 0 ? (
                  sortedActivities.map((act) => (
                    <tr
                      key={act.id}
                      className="hover:bg-slate-50/80 transition-all duration-200 cursor-pointer group"
                    >
                      <td className="py-4 pl-6 pr-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={act.avatar || avatarImg}
                            alt={act.name}
                            className="w-10 h-10 rounded-full object-cover border-[1px] border-[#C3C6D7] group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <div className="text-[18px] font-bold text-[#0D1C2E] leading-snug">{act.name}</div>
                            <div className="text-[14px] text-[#434655] font-medium leading-none mt-1">{act.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 align-middle">
                        <span className={`px-2.5 py-1 rounded-[10px] text-[12px] font-semibold uppercase tracking-wider ${act.statusColor}`}>
                          {act.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 align-middle">
                        <div className="flex items-center gap-1 bg-[#FEE2E2] text-[#B91C1C] px-2 py-0.5 rounded-[10px] text-[14px] font-bold w-max">
                          <Flame size={10} className="fill-[#B91C1C] text-[#B91C1C]" />
                          <span>Hot</span>
                        </div>
                      </td>
                      <td className="py-4 pr-6 text-right font-medium align-middle">
                        <div className="text-[14px] text-[#0D1C2E] font-normal">{act.time}</div>
                        <div className={`text-[11px] font-semibold text-[#0A4268] uppercase tracking-wider mt-1 ${act.channel === 'EMAIL' ? 'text-[#004370]' : 'text-[#006A6A]'
                          }`}>
                          {act.channel}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                        <span className="text-[16px] font-semibold text-slate-500">No leads found</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEngagementActivities;
