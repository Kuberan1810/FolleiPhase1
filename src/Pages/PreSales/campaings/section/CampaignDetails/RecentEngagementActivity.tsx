import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Flame } from 'lucide-react';
import avatarImg from '../../../../../assets/avatar.png';

export interface LeadActivity {
  id: number;
  name: string;
  email: string;
  avatar: string;
  status: string;
  statusColor: string;
  score: 'Hot' | 'Warm' | 'Cold';
  time: string;
  channel: 'WHATSAPP' | 'EMAIL';
  subject: string;
  company: string;
  budget?: number;
  timestamp?: number;
}

interface RecentEngagementActivityProps {
  activities: LeadActivity[];
  selectedLead: LeadActivity | null;
  onSelectLead: (lead: LeadActivity) => void;
  onViewAll: () => void;
}

const RecentEngagementActivity: React.FC<RecentEngagementActivityProps> = ({
  activities,
  selectedLead,
  onSelectLead,
  onViewAll
}) => {
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

  const filteredActivities = activities.filter(act => {
    return selectedLetter === 'All' || act.name.trim().toUpperCase().startsWith(selectedLetter);
  });

  return (
    <div className="bg-white rounded-[24px] border border-[#F1F5F9] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 sm:gap-0">
        <div>
          <h3 className="text-[20px] font-semibold text-[#0B1C30]">Recent Engagement Activity</h3>
          <p className="text-[12px] text-[#464555] font-medium">Top leads reacting to this campaign in real-time</p>
        </div>
        <button 
          onClick={onViewAll}
          className="text-[#3525CD] text-[14px] font-bold flex items-center gap-1 cursor-pointer hover:underline transition-all"
        >
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className={`overflow-x-auto min-h-[320px] transition-all duration-200 ${showAZPopup ? 'pb-28' : ''}`}>
        <table className="w-full text-left min-w-[580px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="h-12 py-0 pl-6 rounded-l-[10px] bg-[#F6FAFF] relative">
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
                      {selectedLetter !== 'All' ? '▲' : '▼'}
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
                        className={`w-10 h-8 shrink-0 flex items-center justify-center text-[13px] font-bold transition-all duration-150 scrollbar-hide no-scrollbar cursor-pointer ${
                          selectedLetter === letter
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
              <th className="h-12 py-0 px-4 bg-[#F6FAFF] text-[12px] font-semibold text-[#434655] uppercase tracking-[1.5px]">Status</th>
              <th className="h-12 py-0 px-4 bg-[#F6FAFF] text-[12px] font-semibold text-[#434655] uppercase tracking-[1.5px]">Score</th>
              <th className="h-12 py-0 pr-6 rounded-r-[10px] bg-[#F6FAFF] text-[12px] font-semibold text-[#434655] uppercase tracking-[1.5px] text-right">Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F8FAFC]">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((act) => (
                <tr 
                  key={act.id} 
                  onClick={() => onSelectLead(act)}
                  className={`hover:bg-slate-50/80 transition-all duration-200 cursor-pointer group ${
                    selectedLead?.id === act.id && selectedLead?.status === act.status
                      ? 'bg-[#F2F7FB]' : ''
                  }`}
                >
                  <td className="py-3.5 pl-6 pr-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={act.avatar || avatarImg} 
                        alt={act.name} 
                        className="w-9 h-9 rounded-full object-cover border border-gray-100 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <div className="text-[18px] font-semibold text-[#0D1C2E]">{act.name}</div>
                        <div className="text-[14px] text-[#434655] font-medium ">{act.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${act.statusColor}`}>
                      {act.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 bg-[#FEE2E2] text-[#B91C1C] px-2 py-0.5 rounded-full text-[10px] font-extrabold w-max">
                      <Flame size={10} className="fill-[#EF4444] text-[#EF4444]" />
                      <span>{act.score}</span>
                    </div>
                  </td>
                  <td className="py-3.5 pr-6 text-right font-medium">
                    <div className="text-[12px] text-[#0D1C2E] font-semibold">{act.time}</div>
                    <div className={`text-[12px] font-semibold uppercase tracking-wider mt-0.5 ${
                      act.channel === 'EMAIL' ? 'text-[#004370]' : 'text-[#006A6A]'
                    }`}>
                      {act.channel}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center">
                  <div className="flex flex-col items-center justify-center text-slate-400 gap-1">
                    <span className="text-[14px] font-semibold text-slate-500">No leads found</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentEngagementActivity;
