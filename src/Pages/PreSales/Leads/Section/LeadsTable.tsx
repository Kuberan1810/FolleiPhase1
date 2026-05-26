import React from 'react';
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
};

export const getSourceIcon = (source: string) => {
  switch (source) {
    case 'website':
      return <Globe className="w-4 h-4 text-[#0B3A64]" />;
    case 'campaign':
      return <Megaphone className="w-4 h-4 text-[#0B3A64]" />;
    case 'shield':
      return <Handshake className="w-4 h-4 text-[#0B3A64]" />;
    case 'external':
      return <Import className="w-4 h-4 text-[#0B3A64]" />;
    default:
      return <Globe className="w-4 h-4 text-[#0B3A64]" />;
  }
};

export const getSourceName = (source: string): string => {
  switch (source.toLowerCase()) {
    case 'website':
      return 'WEBSITE';
    case 'campaign':
      return 'ADS';
    case 'shield':
      return 'REFERRAL';
    case 'external':
      return 'IMPORT';
    default:
      return source.toUpperCase();
  }
};


const LeadsTable: React.FC<LeadsTableProps> = ({ 
  leads, 
  sortField, 
  sortDirection,
  onSortChange,
  onLeadClick
}) => {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-[#F6FAFF] h-[48px]">
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.55px] font-manrope rounded-l-[10px]">Date</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.55px] font-manrope">
                <div className="flex items-center gap-1.5 select-none">
                  <span>LEAD</span>
                  <span 
                    onClick={() => {
                      if (sortField === 'name') {
                        onSortChange('name', sortDirection === 'asc' ? 'desc' : 'asc');
                      } else {
                        onSortChange('name', 'asc');
                      }
                    }} 
                    className="inline-flex items-center gap-[2px] cursor-pointer hover:bg-slate-50 transition-colors"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(234, 243, 255, 0.97)',
                      borderRadius: '5px',
                      padding: '0 5px',
                      height: '16px',
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      fontSize: '10px',
                      lineHeight: '16px',
                      letterSpacing: '0px',
                      textTransform: 'uppercase',
                      color: '#004370',
                    }}
                  >
                    A-Z
                    <svg className="w-2.5 h-2.5 text-[#004370]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </div>
              </th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.55px] font-manrope">Source</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.55px] font-manrope text-center">Status</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.55px] font-manrope">Score</th>
              <th className="px-6 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.55px] font-manrope rounded-r-[10px]">Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <tr 
                  key={lead.id} 
                  onClick={() => onLeadClick(lead)}
                  className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
                >
                  {/* Date */}
                  <td 
                    className="px-6 py-5"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#0D1C2E'
                    }}
                  >
                    {lead.addedTime}
                  </td>

                  {/* Lead Avatar + Name + Email */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      {lead.avatar ? (
                        <img 
                          src={lead.avatar} 
                          alt={lead.name} 
                          className="w-9 h-9 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${lead.bgColor} ${lead.textColor}`}>
                          {lead.initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h4 
                          className="transition-colors truncate"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 600,
                            fontSize: '18px',
                            lineHeight: '24px',
                            letterSpacing: '0px',
                            color: '#0D1C2E'
                          }}
                        >
                          {lead.name}
                        </h4>
                        <span 
                          className="truncate block"
                          style={{
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 400,
                            fontSize: '14px',
                            lineHeight: '20px',
                            letterSpacing: '0px',
                            color: '#434655'
                          }}
                        >
                          {lead.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Source */}
                  <td className="px-6 py-5">
                    <div className="relative group/tooltip inline-block">
                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer hover:bg-slate-200 transition-colors">
                        {getSourceIcon(lead.source)}
                      </div>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:flex flex-col items-center z-50">
                        <span className="bg-[#0D1C2E] text-white text-[9px] font-bold px-2 py-1 rounded shadow-md whitespace-nowrap tracking-wider font-manrope">
                          {getSourceName(lead.source)}
                        </span>
                        <div className="w-1.5 h-1.5 bg-[#0D1C2E] rotate-45 -mt-0.5" />
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5 text-center">
                    <span 
                      className="inline-flex items-center justify-center font-bold tracking-wider"
                      style={{
                        padding: '3.5px 12px',
                        borderRadius: '10px',
                        height: '23px',
                        fontSize: '10px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        lineHeight: '16px',
                        backgroundColor: 
                          lead.status === 'NEW INQUIRY' ? '#E4EDFF' :
                          lead.status === 'CONTACTED' ? '#FFE3C6' :
                          '#FFE7FC',
                        color:
                          lead.status === 'NEW INQUIRY' ? '#004370' :
                          lead.status === 'CONTACTED' ? '#78350F' :
                          '#701A75',
                      }}
                    >
                      {lead.status}
                    </span>
                  </td>

                  {/* Score Badge */}
                  <td className="px-6 py-5">
                    <span 
                      className="inline-flex items-center"
                      style={{
                        padding: '5px 8px',
                        borderRadius: '10px',
                        height: '25px',
                        gap: '8px',
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 700,
                        fontSize: '14px',
                        lineHeight: '15px',
                        letterSpacing: '0px',
                        backgroundColor:
                          lead.temperature === 'Hot' ? '#FEE2E2' :
                          lead.temperature === 'Warm' ? '#FFEDD5' :
                          '#DBEAFE',
                        color:
                          lead.temperature === 'Hot' ? '#991B1B' :
                          lead.temperature === 'Warm' ? '#C2410C' :
                          '#1E40AF',
                      }}
                    >
                      {lead.temperature === 'Hot' ? <Flame className="w-3.5 h-3.5 shrink-0" /> :
                       lead.temperature === 'Warm' ? <Sun className="w-3.5 h-3.5 shrink-0" /> :
                       <Snowflake className="w-3.5 h-3.5 shrink-0" />}
                      {lead.temperature}
                    </span>
                  </td>

                  {/* Activity */}
                  <td className="px-6 py-5">
                    <div className="min-w-[120px]">
                      <p 
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 400,
                          fontSize: '14px',
                          lineHeight: '20px',
                          letterSpacing: '0px',
                          color: '#0D1C2E',
                          margin: '0 0 2px 0'
                        }}
                      >
                        {lead.activityTime}
                      </p>
                      <p 
                        style={{
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: 600,
                          fontSize: '12px',
                          lineHeight: '16px',
                          letterSpacing: '0.6px',
                          textTransform: 'uppercase',
                          color: '#0A4268',
                          margin: 0
                        }}
                      >
                        {lead.activityType}
                      </p>
                    </div>
                  </td>
                </tr>
              ))
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