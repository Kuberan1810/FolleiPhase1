import React from 'react';
import type { Lead } from '../Leads';
import {
  Globe,
  Megaphone,
  Handshake,
  Import,
  MessageSquare,
  Phone,
  Flame,
  Sun,
  Snowflake,
  AlertCircle,
  CheckCircle2,
  Calendar
} from 'lucide-react';

type KanbanColumn = {
  id: string;
  label: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  icon?: React.ReactNode;
};

type KanbanViewProps = {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  headerStyle?: string;
  categorizeBy?: string;
};

const getColumnsForCategorization = (categorizeBy: string): KanbanColumn[] => {
  switch (categorizeBy) {
    case 'Lead Status':
      return [
        {
          id: 'NEW INQUIRY',
          label: 'NEW INQUIRY',
          bgColor: '#EFEFFF',
          borderColor: '#1D4ED8',
          textColor: '#0D1C2E',
          badgeBg: '#1D4ED8',
          icon: <AlertCircle className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'CONTACTED',
          label: 'CONTACTED',
          bgColor: '#FFFBEB',
          borderColor: '#D97706',
          textColor: '#0D1C2E',
          badgeBg: '#D97706',
          icon: <Megaphone className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'QUALIFIED',
          label: 'QUALIFIED',
          bgColor: '#F0FDF4',
          borderColor: '#16A34A',
          textColor: '#0D1C2E',
          badgeBg: '#16A34A',
          icon: <CheckCircle2 className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'DEMO SCHEDULED',
          label: 'DEMO SCHEDULED',
          bgColor: '#FEF2F2',
          borderColor: '#EF4444',
          textColor: '#0D1C2E',
          badgeBg: '#EF4444',
          icon: <Calendar className="w-[18px] h-[18px] text-[#0D1C2E]" />
        }
      ];
    case 'Lead Score':
      return [
        {
          id: 'Hot',
          label: 'Hot',
          bgColor: '#FEF2F2',
          borderColor: '#DC2626',
          textColor: '#0D1C2E',
          badgeBg: '#DC2626',
          icon: <Flame className="w-[18px] h-[18px] text-[#0D1C2E] fill-current" />
        },
        {
          id: 'Warm',
          label: 'Warm',
          bgColor: '#FFFBEB',
          borderColor: '#D97706',
          textColor: '#0D1C2E',
          badgeBg: '#D97706',
          icon: <Sun className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'Cold',
          label: 'Cold',
          bgColor: '#EFEFFF',
          borderColor: '#1D4ED8',
          textColor: '#0D1C2E',
          badgeBg: '#1D4ED8',
          icon: <Snowflake className="w-[18px] h-[18px] text-[#0D1C2E]" />
        }
      ];
    case 'Campaign':
      return [
        {
          id: 'GROWTH X',
          label: 'GROWTH X',
          bgColor: '#EFEFFF',
          borderColor: '#1D4ED8',
          textColor: '#0D1C2E',
          badgeBg: '#1D4ED8',
          icon: <Globe className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'CUSTOMER RE-ENGAGEMENT PROGRAM',
          label: 'CUSTOMER RE-ENGAGEMENT PROGRAM',
          bgColor: '#FFFBEB',
          borderColor: '#D97706',
          textColor: '#0D1C2E',
          badgeBg: '#D97706',
          icon: <Megaphone className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'PRODUCT AWARENESS',
          label: 'PRODUCT AWARENESS',
          bgColor: '#F0FDF4',
          borderColor: '#16A34A',
          textColor: '#0D1C2E',
          badgeBg: '#16A34A',
          icon: <Handshake className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'INTELLIGENT OUTREACH',
          label: 'INTELLIGENT OUTREACH',
          bgColor: '#FEF2F2',
          borderColor: '#EF4444',
          textColor: '#0D1C2E',
          badgeBg: '#EF4444',
          icon: <Import className="w-[18px] h-[18px] text-[#0D1C2E]" />
        }
      ];
    case 'Lead Source':
    default:
      return [
        {
          id: 'website',
          label: 'Website',
          bgColor: '#EFEFFF',
          borderColor: '#1D4ED8',
          textColor: '#0D1C2E',
          badgeBg: '#1D4ED8',
          icon: <Globe className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'campaign',
          label: 'Ads',
          bgColor: '#FFFFF0',
          borderColor: '#C7CD25',
          textColor: '#0D1C2E',
          badgeBg: '#C7CD25',
          icon: <Megaphone className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'shield',
          label: 'Referral',
          bgColor: '#EEFFF5',
          borderColor: '#04612D',
          textColor: '#0D1C2E',
          badgeBg: '#04612D',
          icon: <Handshake className="w-[18px] h-[18px] text-[#0D1C2E]" />
        },
        {
          id: 'external',
          label: 'Import',
          bgColor: '#FFF7F0',
          borderColor: '#CD6E25',
          textColor: '#0D1C2E',
          badgeBg: '#CD6E25',
          icon: <Import className="w-[18px] h-[18px] text-[#0D1C2E]" />
        }
      ];
  }
};

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.trim().charAt(0).toUpperCase();
};

const getDealValue = (lead: Lead): number => {
  // Map lead score to realistic deal value (e.g. score 90 -> 90k)
  const val = lead.score > 0 ? lead.score : 10;
  return val * 1000;
};

const formatTotalDealValue = (leads: Lead[]): string => {
  const total = leads.reduce((sum, l) => sum + getDealValue(l), 0);
  const lakhs = total / 100000;
  if (total === 0) return '₹0L';
  return `₹${lakhs.toFixed(1)}L`;
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
    <div className={`grid grid-cols-1 md:grid-cols-2 ${
      columns.length === 3 ? 'xl:grid-cols-3' : 'xl:grid-cols-4'
    } gap-6 items-start `}>
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
          return l.source === col.id;
        });

        const activeColorSource = isMono ? {
          bgColor: '#EFEFFF',
          borderColor: '#1D4ED8',
          textColor: '#0D1C2E',
          badgeBg: '#1D4ED8'
        } : col;

        return (
          <div
            key={col.id}
            className="flex flex-col min-h-0 md:min-h-[500px]"
          >
            <div
              className="flex justify-between items-center"
              style={{
                height: '48px',
                boxSizing: 'border-box',
                padding: '12px',
                borderTop: `2px solid ${activeColorSource.borderColor}`,
                backgroundColor: activeColorSource.bgColor,
                color: activeColorSource.textColor,
                fontFamily: 'Inter, sans-serif'
              }}
            >
              <div className="flex items-center gap-2">
                {col.icon}
                <span
                  className="font-bold text-[14px]"
                  style={{
                    color: '#0D1C2E',
                    letterSpacing: '-0.2px'
                  }}
                >
                  {col.label}
                </span>
                <span
                  className="inline-flex items-center justify-center font-semibold text-[10px] w-[22px] h-[22px] rounded-full leading-[16px] tracking-normal"
                  style={{
                    backgroundColor: '#FFFFFF',
                    color: activeColorSource.borderColor,
                    border: `1px solid ${activeColorSource.borderColor}33`
                  }}
                >
                  {colLeads.length.toString().padStart(2, '0')}
                </span>
              </div>
              <span
                className="font-bold text-[14px]"
                style={{
                  color: '#0D1C2E'
                }}
              >
                {formatTotalDealValue(colLeads)}
              </span>
            </div>

            {/* Column Body / Cards List */}
            <div className="py-4 px-0 flex-1 space-y-3">
              {colLeads.map(lead => (
                <div
                  key={lead.id}
                  onClick={() => onLeadClick(lead)}
                  className="BoxStyle p-4 cursor-pointer hover:shadow-md transition-all flex flex-col justify-between"
                >
                  {/* Lead Info */}
                  <div>
                    <div className="flex items-start gap-2.5">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${lead.bgColor || 'bg-[#EEF2FF]'} ${lead.textColor || 'text-[#004370]'}`}>
                        {getInitials(lead.name)}
                      </div>
                      <div>
                        <h4 className="text-[15px] font-bold text-[#0D1C2E] leading-snug">
                          {lead.name}
                        </h4>
                        <p className="text-[12px] text-slate-400 font-normal mt-0.5">
                          Mail Id
                        </p>
                      </div>
                    </div>

                    {/* Description Notes */}
                    {lead.notes && (
                      <p className="text-[13px] text-[#475569] font-medium leading-relaxed mt-3.5">
                        {lead.notes}
                      </p>
                    )}
                  </div>

                  {/* Footer actions and value */}
                  <div>
                    <div className="border-t border-slate-100 my-3.5" />
                    <div className="flex justify-between items-center text-slate-500">
                      <div className="flex items-center gap-3">
                        <Phone className="w-[15px] h-[15px] hover:text-[#004370] transition-colors cursor-pointer text-[#464555]" />
                        <MessageSquare className="w-[15px] h-[15px] hover:text-[#004370] transition-colors cursor-pointer text-[#464555]" />
                      </div>
                      <span className="text-[13px] font-medium text-[#464555] leading-none tracking-normal">
                        Deal Value : {getDealValue(lead) / 1000}k
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {colLeads.length === 0 && (
                <div className="h-32 border-2 border-dashed border-slate-200/60 rounded-[16px] flex items-center justify-center text-slate-400 text-xs font-semibold">
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
