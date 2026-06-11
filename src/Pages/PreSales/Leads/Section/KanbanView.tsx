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
  Calendar 
} from 'lucide-react';

type KanbanViewProps = {
  leads: Lead[];
  onLeadClick: (lead: Lead) => void;
  headerStyle?: string;
};

const COLUMNS = [
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
    id: 'campaign', // Ads
    label: 'Ads',
    bgColor: '#FFF1D7',
    borderColor: '#DB9407',
    textColor: '#0D1C2E',
    badgeBg: '#DB9407',
    icon: <Megaphone className="w-4 h-4 text-[#0D1C2E]" />
  },
  {
    id: 'shield', // Referral
    label: 'Referral',
    bgColor: '#ECFCCB',
    borderColor: '#A3E635',
    textColor: '#0D1C2E',
    badgeBg: '#A3E635',
    icon: <Handshake className="w-4 h-4 text-[#0D1C2E]" />
  },
  {
    id: 'external', // Import
    label: 'Import',
    bgColor: '#FEE2E2',
    borderColor: '#FCA5A5',
    textColor: '#0D1C2E',
    badgeBg: '#FCA5A5',
    icon: <Import className="w-4 h-4 text-[#0D1C2E]" />
  }
];

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

const KanbanView: React.FC<KanbanViewProps> = ({ leads, onLeadClick, headerStyle = 'Multi Color' }) => {
  const isMono = headerStyle === 'Mono Color';
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
      {COLUMNS.map((col) => {
        const colLeads = leads.filter(l => l.source === col.id);
        const activeColorSource = isMono ? COLUMNS[0] : col;
        
        return (
          <div 
            key={col.id} 
            className="flex flex-col min-h-[500px]"
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
                color: col.textColor,
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
                      {lead.avatar ? (
                        <img 
                          src={lead.avatar} 
                          alt={lead.name} 
                          className="w-9 h-9 rounded-full object-cover" 
                        />
                      ) : (
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-[11px] ${lead.bgColor} ${lead.textColor}`}>
                          {lead.initials}
                        </div>
                      )}
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
                  No leads in this source
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
