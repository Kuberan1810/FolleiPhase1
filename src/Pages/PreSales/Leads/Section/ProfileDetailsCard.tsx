import React from 'react';
import { Mail, Phone, Calendar, Flame, Sun, Snowflake } from 'lucide-react';
import type { Lead } from '../Leads';
import { useNavigate } from 'react-router-dom';

interface ProfileDetailsCardProps {
  lead: Lead;
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }
  return name.trim().charAt(0).toUpperCase();
};

const ProfileDetailsCard: React.FC<ProfileDetailsCardProps> = ({ lead }) => {
  const navigate = useNavigate();


  return (
    <div
      className="w-full lg:flex-1 h-auto sm:h-[225px] bg-white rounded-[12px] border border-slate-100 p-6 flex flex-col sm:flex-row gap-6 font-manrope"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Column 1: Avatar and Temperature Badge */}
      <div className="flex flex-col items-center justify-between w-full sm:w-[128px] shrink-0 gap-3 sm:gap-0 sm:h-full">
        {/* Avatar image container with highlights */}
        <div className="w-[128px] h-[128px] rounded-full overflow-hidden border-2 border-[#004370] p-[4px] shrink-0">
          <div className={`w-full h-full rounded-[8px] flex items-center justify-center font-bold text-3xl ${lead.bgColor || 'bg-[#EEF2FF]'} ${lead.textColor || 'text-[#004370]'}`}>
            {getInitials(lead.name)}
          </div>
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
      <div className="flex-1 flex flex-col justify-between sm:h-full min-w-0 w-full gap-4 sm:gap-0">
        {/* Row 1: Name and score */}
        <div className="flex items-center justify-between relative">
          <h2 className="text-xl font-extrabold text-[#0B1C30] truncate pr-2" style={{ lineHeight: '28px' }}>
            {lead.name}
          </h2>
          <div className="relative group">
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#E2EFFF] rounded-[4px] tracking-wide shrink-0 cursor-help text-[#004370]"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: '12px',
                lineHeight: '16px'
              }}
            >
              <span>SCORE: {lead.score}%</span>
            </span>

            {/* Hover card */}
            <div className="absolute right-0 top-full mt-2 z-50 w-[280px] sm:w-[300px] bg-white rounded-[16px] border border-slate-200/80 p-5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-1 group-hover:translate-y-0 pointer-events-auto before:content-[''] before:absolute before:w-full before:h-2 before:-top-2 before:left-0">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                <span className="font-semibold text-[12px] text-[#191C1D] font-inter sm:text-[16px]">
                  Lead Score: {lead.score}%
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider whitespace-nowrap ${lead.score >= 90 ? 'text-[#006C49]' :
                  lead.score >= 75 ? 'text-teal-700' :
                    lead.score >= 50 ? ' text-amber-700' :
                      'text-slate-600'
                  }`}>
                  {lead.score >= 90 ? 'EXCEPTIONAL FIT' :
                    lead.score >= 75 ? 'STRONG MATCH' :
                      lead.score >= 50 ? 'GOOD POTENTIAL' :
                        'LOW ENGAGEMENT'}
                </span>
              </div>

              {/* Rows */}
              <div className="flex flex-col gap-2">
                {[
                  { label: 'Emotional Sentiment', val: "22" },
                  { label: 'Response rate', val: "21" },
                  { label: 'Engagement Activity', val: "23" },
                  { label: 'Meeting interest', val: "22" }
                ].map((row, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#FAFAFA] rounded-[10px] py-[10px] px-[15px] border-[1px] border-[#191C1D]/5">
                    <span className="text-[12px] sm:text-[16px] font-normal text-[#464555] font-inter">{row.label}</span>
                    <span className="px-2.5 py-0.5 bg-[#16F629]/10 text-[#191C1D] rounded-[27px] text-[12px] font-normal font-inter">
                      {row.val}/25
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full shrink-0">
          {/* Line 1: Email and Call */}
          <div className="flex gap-2 flex-1 lg:flex-none">
            <button
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#6063EE]/10 hover:bg-[#6063EE]/20 transition-all font-normal font-manrope cursor-pointer border-none rounded-[8px] py-1 px-4 text-[#004370]"
              style={{ height: '32px', boxSizing: 'border-box' }}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#6063EE]/10 hover:bg-[#6063EE]/20 transition-all font-normal font-manrope cursor-pointer border-none rounded-[8px] py-1 px-4 text-[#004370]"
              style={{ height: '32px', boxSizing: 'border-box' }}
            >
              <Phone className="w-4 h-4" />
              <span>Call</span>
            </button>
          </div>

          {/* Line 2: Schedule and View Logs */}
          <div className="flex gap-2 flex-1 lg:flex-none">
            <button
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-[#6063EE]/10 hover:bg-[#6063EE]/20 transition-all font-normal font-manrope cursor-pointer border-none rounded-[8px] py-1 px-4 text-[#004370]"
              style={{ height: '32px', boxSizing: 'border-box' }}
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule</span>
            </button>
            <button
              onClick={() => navigate("/presales/leads/logs")}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white hover:bg-[#EFF6FF] hover:text-[#1E40AF] hover:border-[#BFDBFE] transition-all font-normal font-manrope cursor-pointer border-[1px] border-[#004370]/25 rounded-[8px] py-1 px-3 text-[#0B1C30] whitespace-nowrap"
              style={{ height: '32px', boxSizing: 'border-box' }}
            >
              <span>View Logs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsCard;
