import React from 'react';
import type { Lead } from '../Leads';
import {
  Globe,
  Megaphone,
  Handshake,
  Import,
  MoreVertical,
  MessageSquare,
  PhoneCall,
  Calendar,
  Flame,
  Sun,
  Snowflake,
} from 'lucide-react';

type KanbanViewProps = {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  headerStyle?: string;
  categorizeBy?: string;
};

const getColumnsForCategorization = (categorizeBy: string) => {
  switch (categorizeBy) {
    case 'Lead Status':
      return [
        {
          id: 'NEW INQUIRY',
          label: 'NEW INQUIRY',
          bgColor: '#DBEAFE',
          borderColor: '#70ADFF',
          textColor: '#0D1C2E',
          badgeBg: '#70ADFF',
        },
        {
          id: 'CONTACTED',
          label: 'CONTACTED',
          bgColor: '#FFF1D7',
          borderColor: '#DB9407',
          textColor: '#0D1C2E',
          badgeBg: '#DB9407',
        },
        {
          id: 'QUALIFIED',
          label: 'QUALIFIED',
          bgColor: '#ECFCCB',
          borderColor: '#A3E635',
          textColor: '#0D1C2E',
          badgeBg: '#A3E635',
        },
        {
          id: 'DEMO SCHEDULED',
          label: 'DEMO SCHEDULED',
          bgColor: '#FEE2E2',
          borderColor: '#FCA5A5',
          textColor: '#0D1C2E',
          badgeBg: '#FCA5A5',
        }
      ];
    case 'Lead Score':
      return [
        {
          id: 'Hot',
          label: 'Hot',
          bgColor: '#FEE2E2',
          borderColor: '#B91C1C',
          textColor: '#222222',
          badgeBg: '#B91C1C',
          icon: <Flame className="w-4 h-4 text-[#222222]" />
        },
        {
          id: 'Warm',
          label: 'Warm',
          bgColor: '#FFEDD5',
          borderColor: '#C2410C',
          textColor: '#222222',
          badgeBg: '#C2410C',
          icon: <Sun className="w-4 h-4 text-[#222222]" />
        },
        {
          id: 'Cold',
          label: 'Cold',
          bgColor: '#DBEAFE',
          borderColor: '#1D4ED8',
          textColor: '#222222',
          badgeBg: '#1D4ED8',
          icon: <Snowflake className="w-4 h-4 text-[#222222]" />
        }
      ];
    case 'Campaign':
      return [
        {
          id: 'GROWTH X',
          label: 'GROWTH X',
          bgColor: '#DBEAFE',
          borderColor: '#70ADFF',
          textColor: '#0D1C2E',
          badgeBg: '#70ADFF',
        },
        {
          id: 'CUSTOMER RE-ENGAGEMENT PROGRAM',
          label: 'CUSTOMER RE-ENGAGEMENT PROGRAM',
          bgColor: '#FFF1D7',
          borderColor: '#DB9407',
          textColor: '#0D1C2E',
          badgeBg: '#DB9407',
        },
        {
          id: 'PRODUCT AWARENESS',
          label: 'PRODUCT AWARENESS',
          bgColor: '#ECFCCB',
          borderColor: '#A3E635',
          textColor: '#0D1C2E',
          badgeBg: '#A3E635',
        },
        {
          id: 'INTELLIGENT OUTREACH',
          label: 'INTELLIGENT OUTREACH',
          bgColor: '#FEE2E2',
          borderColor: '#FCA5A5',
          textColor: '#0D1C2E',
          badgeBg: '#FCA5A5',
        }
      ];
    case 'Lead Source':
    default:
      return [
        {
          id: 'website',
          label: 'Website',
          bgColor: '#DBEAFE',
          borderColor: '#70ADFF',
          textColor: '#0D1C2E',
          badgeBg: '#70ADFF',
          icon: <Globe className="w-4 h-4 text-[#0D1C2E]" />
        },
        {
          id: 'campaign',
          label: 'Ads',
          bgColor: '#FFF1D7',
          borderColor: '#DB9407',
          textColor: '#0D1C2E',
          badgeBg: '#DB9407',
          icon: <Megaphone className="w-4 h-4 text-[#0D1C2E]" />
        },
        {
          id: 'shield',
          label: 'Referral',
          bgColor: '#ECFCCB',
          borderColor: '#A3E635',
          textColor: '#0D1C2E',
          badgeBg: '#A3E635',
          icon: <Handshake className="w-4 h-4 text-[#0D1C2E]" />
        },
        {
          id: 'external',
          label: 'Import',
          bgColor: '#FEE2E2',
          borderColor: '#FCA5A5',
          textColor: '#0D1C2E',
          badgeBg: '#FCA5A5',
          icon: <Import className="w-4 h-4 text-[#0D1C2E]" />
        }
      ];
  }
};

const getActivityIcon = (type: string) => {
  const t = type.toUpperCase();
  if (t.includes('CHAT') || t.includes('WHATSAPP') || t.includes('MESSAGE')) {
    return <MessageSquare className="w-3.5 h-3.5 text-[#3B82F6]" />;
  }
  if (t.includes('CALL')) {
    return <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />;
  }
  return <Calendar className="w-3.5 h-3.5 text-amber-500" />;
};

const formatActivityText = (type: string, time: string) => {
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  return `${formattedType} ${time}`;
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.trim().charAt(0).toUpperCase();
};

const KanbanView: React.FC<KanbanViewProps> = ({
  leads,
  onLeadClick,
  headerStyle = 'Mono Color',
  categorizeBy = 'Lead Source'
}) => {
  const isMono = headerStyle === 'Mono Color';
  const columns = getColumnsForCategorization(categorizeBy);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 ${columns.length === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
      } gap-6 items-start`}>
      {columns.map((col) => {
        const colLeads = leads.filter(l => {
          if (categorizeBy === 'Lead Status') {
            return l.status === col.id;
          }
          if (categorizeBy === 'Lead Score') {
            return l.temperature === col.id;
          }
          if (categorizeBy === 'Campaign') {
            const index = parseInt(l.id) % 4;
            const campaignNames = [
              'GROWTH X',
              'CUSTOMER RE-ENGAGEMENT PROGRAM',
              'PRODUCT AWARENESS',
              'INTELLIGENT OUTREACH'
            ];
            return campaignNames[index] === col.id;
          }
          // Default: Lead Source
          return l.source === col.id;
        });
        const activeColorSource = isMono ? {
          bgColor: '#DBEAFE',
          borderColor: '#70ADFF',
          textColor: '#0D1C2E',
          badgeBg: '#70ADFF'
        } : col;

        return (
          <div
            key={col.id}
            className="flex flex-col min-h-0 md:min-h-[500px]"
          >
            {/* Column Header */}
            <div
              className="flex justify-between items-center"
              style={{
                height: '44px',
                boxSizing: 'border-box',
                padding: '14px 20px',
                borderTop: `3px solid ${activeColorSource.borderColor}`,
                backgroundColor: activeColorSource.bgColor,
                color: activeColorSource.textColor,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <div className="flex items-center" style={{ gap: '16px' }}>
                {col.icon}
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: '12px',
                    lineHeight: '16px',
                    letterSpacing: '0.6px',
                    textTransform: 'uppercase',
                  }}
                >
                  {col.label}
                </span>
              </div>
              <span
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '10px',
                  backgroundColor: activeColorSource.badgeBg,
                  color: '#FFFFFF',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '20px'
                }}
              >
                {colLeads.length}
              </span>
            </div>

            {/* Column Body / Cards List */}
            <div className="py-4 px-0 flex-1 space-y-3">
              {colLeads.map(lead => (
                <div
                  key={lead.id}
                  onClick={() => onLeadClick(lead)}
                  className="bg-white border border-slate-100 rounded-2xl p-4 cursor-pointer hover:shadow-md transition-all"
                >
                  {/* Lead Info */}
                  <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${lead.bgColor || 'bg-[#EEF2FF]'} ${lead.textColor || 'text-[#004370]'}`}>
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <h4 className="text-[14px] font-semibold text-[#0D1C2E] group-hover:text-[#004370] transition-colors leading-snug">
                          {lead.name}
                        </h4>
                        <p className="text-[12px] text-slate-400 font-normal">
                          {lead.email}
                        </p>
                      </div>
                    </div>

                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Activity Details Bar */}
                  <div className="bg-[#F8FAFC] rounded-xl py-2 px-3 flex items-center gap-2 mt-3 text-[12px] text-slate-600 font-medium">
                    {getActivityIcon(lead.activityType)}
                    <span>
                      {formatActivityText(lead.activityType, lead.activityTime)}
                    </span>
                  </div>
                </div>
              ))}

              {colLeads.length === 0 && (
                <div className="h-32 border-2 border-dashed border-slate-200/60 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-semibold">
                  No leads in this group
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanView;
