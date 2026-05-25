import React, { useState, useRef, useEffect } from 'react';
import { Flame, Filter, ArrowUpDown } from 'lucide-react';
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
  const [tempStatuses, setTempStatuses] = useState<string[]>([]);
  const [tempScores, setTempScores] = useState<string[]>([]);

  const [isStatusExpanded, setIsStatusExpanded] = useState(true);
  const [isScoreExpanded, setIsScoreExpanded] = useState(true);

  const [sortField, setSortField] = useState<'name' | 'time' | 'budget'>('time');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [tempSortField, setTempSortField] = useState<'name' | 'time' | 'budget'>('time');
  const [tempSortOrder, setTempSortOrder] = useState<'asc' | 'desc'>('desc');
  const [sortStep, setSortStep] = useState<1 | 2 | 3>(3);

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

  const openSortPopover = () => {
    setTempSortField(sortField);
    setTempSortOrder(sortOrder);
    setSortStep(3);
    setIsSortOpen(true);
    setIsFilterOpen(false);
  };

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
    setSortField(tempSortField);
    setSortOrder(tempSortOrder);
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

    return matchesStatus && matchesScore;
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
            onClick={isSortOpen ? () => setIsSortOpen(false) : openSortPopover}
            className="flex items-center gap-2 text-[#464555] hover:text-[#004370] font-bold text-[12px] uppercase tracking-[1px] cursor-pointer transition-colors"
          >
            <ArrowUpDown size={14} className="stroke-[2.5]" />
            Sort
          </button>

          {isSortOpen && (
            <div className="absolute left-0 mt-3.5 w-[240px] bg-white rounded-[13px] shadow-[0_12px_30px_rgba(0,0,0,0.08)] z-50 font-manrope animate-in fade-in slide-in-from-top-2 duration-200">

              <div className="mb-4">
                <span className="text-[12px] font-extrabold text-[#0B1C30] bg-[#F2F5F7] p-3 uppercase tracking-[1px] block mb-3">
                  ↑↓ Sort
                </span>
              </div>

              <div className="space-y-3">

                {sortStep === 1 ? (
                  <div>
                    <div className="flex items-center gap-1.5 p-2 bg-[#F6FAFF] mb-2 select-none">
                      <span className="text-[#3525CD] text-[9px] select-none">▼</span>
                      <span className="text-[11px] font-extrabold text-[#004370] uppercase tracking-[1px]">
                        Choose
                      </span>
                    </div>
                    <div className="space-y-1.5 pl-3">
                      <button
                        onClick={() => {
                          setTempSortField('name');
                          setSortStep(2);
                        }}
                        className={`w-full text-left py-1.5 px-2 text-[14px] font-medium transition-all cursor-pointer ${tempSortField === 'name' ? 'text-[#000000]' : 'text-[#000000] hover:bg-slate-50'
                          }`}
                      >
                        Lead Name
                      </button>
                      <button
                        onClick={() => {
                          setTempSortField('time');
                          setSortStep(2);
                        }}
                        className={`w-full text-left py-1.5 px-2 text-[14px] font-medium transition-all cursor-pointer ${tempSortField === 'time' ? ' text-[#000000]' : 'text-[#000000] hover:bg-slate-50'
                          }`}
                      >
                        Last Activity Time
                      </button>
                      <button
                        onClick={() => {
                          setTempSortField('budget');
                          setSortStep(2);
                        }}
                        className={`w-full text-left py-1.5 px-2 text-[14px] font-medium transition-all cursor-pointer ${tempSortField === 'budget' ? 'text-[#000000]' : 'text-[#000000] hover:bg-slate-50'
                          }`}
                      >
                        Budget Value
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => setSortStep(1)}
                    className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                  >
                    <span className="text-[#94A3B8] text-[8px] select-none">▶</span>
                    <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-[1px]">
                      {tempSortField === 'name' ? 'Lead Name' : tempSortField === 'time' ? 'Last Activity Time' : 'Budget Value'}
                    </span>
                  </div>
                )}

                {sortStep === 2 ? (
                  <div>
                    <div className="flex items-center gap-1.5 p-2 bg-[#F6FAFF] mb-2 select-none">
                      <span className="text-[#434655] text-[9px] select-none">▼</span>
                      <span className="text-[11px] font-bold text-[#004370] uppercase tracking-[1px]">
                        Choose
                      </span>
                    </div>
                    <div className="space-y-1.5 pl-3">
                      <button
                        onClick={() => {
                          setTempSortOrder('asc');
                          setSortStep(3);
                        }}
                        className={`w-full text-left py-1.5 px-2 text-[14px] font-medium transition-all cursor-pointer ${tempSortOrder === 'asc' ? 'text-[#000000]' : 'text-[#000000] hover:bg-slate-50'
                          }`}
                      >
                        Ascending
                      </button>
                      <button
                        onClick={() => {
                          setTempSortOrder('desc');
                          setSortStep(3);
                        }}
                        className={`w-full text-left py-1.5 px-2 text-[14px] font-medium transition-all cursor-pointer ${tempSortOrder === 'desc' ? 'text-[#000000]' : 'text-[#000000] hover:bg-slate-50'
                          }`}
                      >
                        Descending
                      </button>
                    </div>
                  </div>
                ) : (
                  sortStep > 1 && (
                    <div
                      onClick={() => setSortStep(2)}
                      className="flex items-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-slate-50/50 cursor-pointer hover:bg-slate-50 transition-colors select-none"
                    >
                      <span className="text-[#94A3B8] text-[8px] select-none">▶</span>
                      <span className="text-[11px] font-bold text-[#64748B] uppercase tracking-[1px]">
                        {tempSortOrder === 'asc' ? 'Ascending' : 'Descending'}
                      </span>
                    </div>
                  )
                )}
              </div>

              {sortStep === 3 && (
                <div className="flex gap-2.5 mt-4 animate-in fade-in duration-200">
                  <button
                    onClick={handleApplySort}
                    className="flex-1 py-[8px] text-[12px] font-bold text-white bg-[#004370] rounded-[10px] hover:bg-[#003356] transition-colors cursor-pointer text-center"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      <div className="bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="h-12 py-0 pl-6 bg-[#F6FAFF]">
                  <div className="flex items-center gap-1 cursor-pointer select-none">
                    <span className="text-[12px] font-semibold text-[#434655] uppercase tracking-[1.5px]">Lead</span>
                    <div className="flex items-center gap-0.5 text-[#8A9099] hover:text-[#004370] transition-colors font-bold text-[11px] tracking-normal ml-2">
                      <span>A-Z</span>
                      <span className="text-[8px] leading-none select-none">▼</span>
                    </div>
                  </div>
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
  );
};

export default AllEngagementActivities;
