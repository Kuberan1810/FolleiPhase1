import React from 'react';
import { ArrowDown2, Add } from 'iconsax-react';
import StatCards from './StatCards';
import CampaignTable from './CampaignTable';

export default function CampaignDash() {
  const [sortBy, setSortBy] = React.useState('Newest');
  const [sortOpen, setSortOpen] = React.useState(false);

  return (
    <div className="w-full" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {/* Section 1 — Page header row */}
      <div className="flex items-start justify-between mb-6 w-full">
        {/* Left side */}
        <div className="flex flex-col gap-1">
          <h1 style={{ fontWeight: 600, fontSize: '36px', lineHeight: '44px', color: '#0F172A', fontFamily: 'Manrope' }}>
            Campaign Intelligence
          </h1>
          <p style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: '#64748B', fontFamily: 'Manrope' }}>
            Manage and track <span style={{ fontWeight: 700, color: '#64748B' }}>08</span> active Campaign
          </p>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Sort by dropdown */}
          <div className="relative">
            <div
              className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[8px] px-3 h-[32px] flex items-center justify-between cursor-pointer w-[159px]"
              onClick={() => setSortOpen(!sortOpen)}
            >
              <div className="flex items-center gap-1">
                <span style={{ color: '#94A3B8', fontSize: '14px', fontFamily: 'Manrope' }}>Sort by:</span>
                <span style={{ color: '#0F172A', fontSize: '14px', fontWeight: 500, fontFamily: 'Manrope' }}>{sortBy}</span>
              </div>
              <ArrowDown2 size="14" color="#0F172A" variant="Linear" />
            </div>
            {sortOpen && (
              <div className="absolute top-[36px] left-0 z-50 bg-white border border-[#E2E8F0] rounded-[8px] w-[159px] shadow-md overflow-hidden">
                {['Newest', 'Oldest', 'Most Sent', 'Most Replies'].map((option) => (
                  <div
                    key={option}
                    className="px-3 py-2 cursor-pointer hover:bg-[#F8FBFF]"
                    style={{ fontSize: '14px', fontFamily: 'Manrope', color: sortBy === option ? '#004370' : '#0F172A', fontWeight: sortBy === option ? 600 : 400 }}
                    onClick={() => { setSortBy(option); setSortOpen(false); }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export button */}
          <button className="shrink-0 bg-[#004370] text-white flex items-center justify-center gap-2 rounded-[8px] transition-colors duration-200 hover:bg-[#003560] cursor-pointer" style={{ width: '114px', height: '32px', paddingTop: '8px', paddingBottom: '8px', paddingLeft: '16px', paddingRight: '16px' }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1v8M5 6l3 3 3-3M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span style={{ fontWeight: 700, fontSize: '13px', lineHeight: '16px', fontFamily: 'Manrope' }}>Export</span>
          </button>

          {/* Plus button */}
          <button className="shrink-0 bg-[#004370] text-white flex items-center justify-center rounded-[18px] transition-colors duration-200 hover:bg-[#003560] cursor-pointer" style={{ width: '32px', height: '32px', padding: '6px' }}>
            <Add size="18" color="white" variant="Linear" />
          </button>
        </div>
      </div>

      {/* Section 2 — Stat Cards */}
      <StatCards />
      
      <CampaignTable />
    </div>
  );
}
