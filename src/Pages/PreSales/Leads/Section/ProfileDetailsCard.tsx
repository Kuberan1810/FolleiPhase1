import React from 'react';
import { Mail, Phone, Calendar, Flame, Sun, Snowflake, Globe, Megaphone, Handshake, Import } from 'lucide-react';
import type { Lead } from '../Leads';

interface ProfileDetailsCardProps {
  lead: Lead;
}

const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({ lead }) => {
  // Helpers for source icons
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'website':
        return <Globe className="w-4 h-4 text-[#004370]" />;
      case 'campaign':
        return <Megaphone className="w-4 h-4 text-[#004370]" />;
      case 'shield':
        return <Handshake className="w-4 h-4 text-[#004370]" />;
      case 'external':
        return <Import className="w-4 h-4 text-[#004370]" />;
      default:
        return <Globe className="w-4 h-4 text-[#004370]" />;
    }
  };

  return (
    <div
      className="w-full lg:flex-1 h-[225px] bg-white rounded-[12px] border border-slate-100 p-6 flex gap-6 font-manrope"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Column 1: Avatar and Temperature Badge */}
      <div className="flex flex-col items-center justify-between h-full w-[128px] shrink-0">
        {/* Avatar image container with highlights */}
        <div className="w-[128px] h-[128px] rounded-[12px] overflow-hidden border-2 border-[#004370] p-[4px] shrink-0">
          {lead.avatar ? (
            <img
              src={lead.avatar}
              alt={lead.name}
              className="w-full h-full rounded-[8px] object-cover"
            />
          ) : (
            <div className={`w-full h-full rounded-[8px] flex items-center justify-center font-bold text-xl ${lead.bgColor || 'bg-[#EEF2FF]'} ${lead.textColor || 'text-[#004370]'}`}>
              {lead.initials || 'U'}
            </div>
          )}
        </div>

        {/* Temperature Tag */}
        <span className={`inline-flex items-center gap-1 py-1 px-3 rounded-full text-xs font-bold shrink-0 ${lead.temperature === 'Hot' ? 'bg-[#FFECEC] text-[#D32F2F]' :
          lead.temperature === 'Warm' ? 'bg-[#FFF8EC] text-[#B7791F]' :
            'bg-[#EFF6FF] text-[#1D4ED8]'
          }`} style={{ height: '24px' }}>
          {lead.temperature === 'Hot' ? <Flame className="w-3 h-3 fill-current" /> :
            lead.temperature === 'Warm' ? <Sun className="w-3 h-3" /> :
              <Snowflake className="w-3 h-3" />}
          {lead.temperature}
        </span>
      </div>

      {/* Column 2: Lead Info details & Action buttons */}
      <div className="flex-1 flex flex-col justify-between h-full min-w-0">
        {/* Row 1: Name and score */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-[#0B1C30] truncate pr-2" style={{ lineHeight: '28px' }}>
            {lead.name}
          </h2>
          <span
            className="px-2 py-0.5 bg-[#E2EFFF] rounded-[4px] tracking-wide shrink-0"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              lineHeight: '16px',
              color: '#004370'
            }}
          >
            SCORE: {lead.score}%
          </span>
        </div>

        {/* Row 2: Budget and Source Grid */}
        <div className="grid grid-cols-2 gap-x-6">
          <div>
            <span
              className="block"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '16px',
                color: '#464555',
                marginBottom: '4px'
              }}
            >
              Budget Value
            </span>
            <span
              className="block"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 800,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#004370'
              }}
            >
              ₹1,00,000
            </span>
          </div>
          <div>
            <span
              className="block"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 500,
                fontSize: '16px',
                lineHeight: '16px',
                color: '#464555',
                marginBottom: '4px'
              }}
            >
              Source
            </span>
            <div className="flex items-center gap-2">
              {getSourceIcon(lead.source)}
              <span
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  color: '#0B1C30'
                }}
              >
                {lead.source === 'campaign' ? 'Ads' : lead.source === 'shield' ? 'Referral' : lead.source === 'external' ? 'Import' : 'Website'}
              </span>
            </div>
          </div>
        </div>

        {/* Row 3: Action Buttons */}
        <div className="flex gap-3">
          <button
            className="flex items-center gap-2 bg-[#6063EE]/10 hover:bg-[#6063EE]/20 transition-all font-bold font-sans cursor-pointer border-none rounded-[8px] py-1 px-4 text-[#004370]"
            style={{ height: '32px', boxSizing: 'border-box' }}
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </button>
          <button
            className="flex items-center gap-2 bg-[#6063EE]/10 hover:bg-[#6063EE]/20 transition-all font-bold font-sans cursor-pointer border-none rounded-[8px] py-1 px-4 text-[#004370]"
            style={{ height: '32px', boxSizing: 'border-box' }}
          >
            <Phone className="w-4 h-4" />
            <span>Call</span>
          </button>
          <button
            className="flex items-center gap-2 bg-[#6063EE]/10 hover:bg-[#6063EE]/20 transition-all font-bold font-sans cursor-pointer border-none rounded-[8px] py-1 px-4 text-[#004370]"
            style={{ height: '32px', boxSizing: 'border-box' }}
          >
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
