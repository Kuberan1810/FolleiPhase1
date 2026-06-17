import React, { useState, useEffect, useRef } from 'react';
import {
  Globe,
  Megaphone,
  Handshake,
  Import,
  Flame,
  Snowflake,
  Sun
} from 'lucide-react';
import type { Lead } from '../Leads';

type LeadsTableProps = {
  leads: Lead[];
  sortField: 'name' | 'activity' | 'budget' | 'assigned';
  sortDirection: 'asc' | 'desc';
  onSortChange: (field: 'name' | 'activity' | 'budget' | 'assigned', direction: 'asc' | 'desc') => void;
  onLeadClick: (lead: Lead) => void;
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
};

export const getSourceIcon = (source: string) => {
  switch (source.toLowerCase()) {
    case 'website':
      return <Globe className="w-[18px] h-[18px] text-[#0A4268]" />;
    case 'campaign':
      return <Megaphone className="w-[18px] h-[18px] text-[#0A4268]" />;
    case 'shield':
      return <Handshake className="w-[18px] h-[18px] text-[#0A4268]" />;
    case 'external':
      return <Import className="w-[18px] h-[18px] text-[#0A4268]" />;
    default:
      return <Globe className="w-[18px] h-[18px] text-[#0A4268]" />;
  }
};

export const getSourceName = (source: string): string => {
  switch (source.toLowerCase()) {
    case 'website':
      return 'Website';
    case 'campaign':
      return 'Ads';
    case 'shield':
      return 'Referral';
    case 'external':
      return 'Import';
    default:
      return source.charAt(0).toUpperCase() + source.slice(1);
  }
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.trim().charAt(0).toUpperCase();
};

const formatStatus = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'NEW INQUIRY':
      return 'New Inquiry';
    case 'CONTACTED':
      return 'Contacted';
    case 'QUALIFIED':
      return 'Qualified';
    case 'DEMO SCHEDULED':
      return 'Demo Scheduled';
    default:
      return status;
  }
};

const STATUS_STYLES: Record<string, { padding: string; borderRadius: string; bg: string; text: string }> = {
  'NEW INQUIRY': { padding: '1px 8px', borderRadius: '6px', bg: '#EFF6FF', text: '#2563EB' },
  'CONTACTED': { padding: '1px 8px', borderRadius: '6px', bg: '#FFF7ED', text: '#EA580C' },
  'DEMO SCHEDULED': { padding: '3.5px 8px', borderRadius: '9px', bg: '#FAF5FF', text: '#9333EA' },
  'QUALIFIED': { padding: '1px 8px', borderRadius: '6px', bg: '#ECFDF5', text: '#047857' }
};

const getStatusBadgeStyle = (status: string) => {
  const style = STATUS_STYLES[status.toUpperCase()] || STATUS_STYLES['NEW INQUIRY'];
  return {
    padding: style.padding,
    borderRadius: style.borderRadius,
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 700,
    backgroundColor: style.bg,
    color: style.text,
  };
};

const getTempStyle = (temp: string) => {
  switch (temp) {
    case 'Hot':
      return {
        color: '#B91C1C',
        icon: <Flame className="w-4 h-4 shrink-0 text-[#DC2626]" />
      };
    case 'Warm':
      return {
        color: '#C2410C',
        icon: <Sun className="w-4 h-4 shrink-0 text-[#EA580C]" />
      };
    case 'Cold':
    default:
      return {
        color: '#2563EB',
        icon: <Snowflake className="w-4 h-4 shrink-0 text-[#2563EB]" />
      };
  }
};

const LeadsTable: React.FC<LeadsTableProps> = ({
  leads,
  sortField,
  sortDirection,
  onSortChange,
  onLeadClick,
  selectedLetter,
  onSelectLetter
}) => {
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
  return (
    <div className="bg-white rounded-[24px] overflow-visible border border-slate-100/80 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
      <div className={`overflow-x-auto ${showAZPopup ? 'pb-48' : ''} transition-all duration-200`}>
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-[#FAFBFF] border-b border-[#EDF3FD] h-[52px]">
              <th className="px-6 py-3 text-[12px] font-bold text-[#434655] uppercase tracking-[0.5px] font-manrope whitespace-nowrap">DATE</th>
              <th className="px-6 py-3 text-[12px] font-bold text-[#434655] uppercase tracking-[0.5px] font-manrope whitespace-nowrap relative">
                <div className="flex items-center gap-1.5 select-none">
                  <span>LEAD</span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAZPopup(!showAZPopup);
                    }}
                    className="inline-flex items-center gap-[2px] cursor-pointer hover:bg-slate-50 transition-colors"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(234, 243, 255, 0.97)',
                      borderRadius: '5px',
                      padding: '0 5px',
                      height: '18px',
                      fontWeight: 600,
                      fontSize: '10px',
                      lineHeight: '18px',
                      letterSpacing: '0px',
                      textTransform: 'uppercase',
                      color: '#004370',
                    }}
                  >
                    <span>A-Z</span>
                    <span className="text-[8px] leading-none select-none ml-0.5">
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
                          onSelectLetter(letter);
                          setShowAZPopup(false);
                        }}
                        className={`w-10 h-8 shrink-0 flex items-center justify-center text-[13px] font-bold transition-all duration-150 scrollbar-hide no-scrollbar cursor-pointer ${selectedLetter === letter
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
              <th className="px-6 py-3 text-[12px] font-bold text-[#434655] uppercase tracking-[0.5px] font-manrope whitespace-nowrap">SOURCE</th>
              <th className="px-6 py-3 text-[12px] font-bold text-[#434655] uppercase tracking-[0.5px] font-manrope whitespace-nowrap">STATUS</th>
              <th className="px-6 py-3 text-[12px] font-bold text-[#434655] uppercase tracking-[0.5px] font-manrope whitespace-nowrap">SCORE</th>
              <th className="px-6 py-3 text-[12px] font-bold text-[#434655] uppercase tracking-[0.5px] font-manrope whitespace-nowrap">LAST ACTIVITY</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF3FD]">
            {leads.length > 0 ? (
              leads.map((lead) => {
                const tempStyle = getTempStyle(lead.temperature);
                return (
                  <tr
                    key={lead.id}
                    onClick={() => onLeadClick(lead)}
                    className="hover:bg-slate-50/60 transition-colors group cursor-pointer h-[72px]"
                  >
                    {/* Date */}
                    <td className="px-6 py-3 whitespace-nowrap text-[14px] font-regular text-[#00000] ">
                      {lead.addedTime}
                    </td>

                    {/* Lead Avatar + Name + Email */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-[38px] h-[38px] rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${lead.bgColor || 'bg-[#EEF2FF]'} ${lead.textColor || 'text-[#004370]'}`}>
                          {getInitials(lead.name)}
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <h4 className="font-sans font-semibold text-[14px] text-black leading-tight">
                            {lead.name}
                          </h4>
                          <span className="font-sans font-bold text-[12px] text-[#6B7280] leading-tight">
                            {lead.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="px-6 py-3 whitespace-nowrap text-[14px] font-regular text-[#000000] font-sans">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(lead.source)}
                        <span>{getSourceName(lead.source)}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span
                        className="inline-flex items-center justify-center font-bold whitespace-nowrap font-urbanist"
                        style={getStatusBadgeStyle(lead.status)}
                      >
                        {formatStatus(lead.status)}
                      </span>
                    </td>

                    {/* Score */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div
                        className="inline-flex items-center gap-1.5  font-bold text-[14px]"
                        style={{ color: tempStyle.color }}
                      >
                        {tempStyle.icon}
                        <span>{lead.temperature}</span>
                      </div>
                    </td>

                    {/* Last Activity */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex flex-col justify-center font-sans">
                        <span className="text-[14px] font-medium text-[#222222] leading-tight">
                          {lead.activityType === 'WHATSAPP' ? 'Whatsapp' :
                            lead.activityType === 'CALL LOGGED' ? 'Call Logged' : 'Meeting Setup'}
                        </span>
                        <span className="text-[12px] text-[#94A3B8] leading-tight mt-0.5">
                          {lead.activityTime}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                  No leads matching current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;