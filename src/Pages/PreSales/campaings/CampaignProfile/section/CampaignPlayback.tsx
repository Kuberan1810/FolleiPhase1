import React from 'react';
import GmailIcon from "../../../../../assets/socialMediaIcons/Gmail.svg"
import WhatsAppIcon from "../../../../../assets/socialMediaIcons/WhatsApp.svg"
import FolleiLogo from '../../../../../assets/logo/FolleiLogo.svg';

export default function CampaignPlayback() {
  const [activeChannel, setActiveChannel] = React.useState<'gmail' | 'whatsapp'>('gmail');

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EDF3FD',
      overflow: 'hidden',
      height: '100%',
      minHeight: '520px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>{`
        .wa-chat-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── HEADER SECTION ── */}
      <div className="p-4">
        <div className="flex items-center justify-between px-4 py-3 rounded-[16px]"
          style={{ backgroundColor: '#F7F7FE' }}>
          {/* Title + tagline */}
          <div className="flex flex-col gap-0.5">
            <span style={{ fontWeight:600, fontSize:'18px', lineHeight:'24px', color:'#131B2E' }}>
              Campaign Playback
            </span>
            <span style={{ fontWeight:400, fontSize:'14px', lineHeight:'20px', color:'#464555' }}>
              Live performance at a glance.
            </span>
          </div>

          {/* Right section: Toggle bar + Expand icon */}
          <div className="flex items-center gap-3">
            {/* Toggle bar */}
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-[12px]" style={{ backgroundColor: '#E9ECF1' }}>
              {/* Gmail */}
            <div
              className="flex items-center justify-center w-9 h-9 rounded-[10px] cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: activeChannel === 'gmail' ? '#FDFEFF' : 'transparent',
                boxShadow: activeChannel === 'gmail' ? '0px 0px 4px 0px #00000040' : 'none'
              }}
              onClick={() => setActiveChannel('gmail')}
            >
              <img src={GmailIcon} alt="Gmail" width={22} height={22} />
            </div>
            {/* WhatsApp */}
            <div
              className="flex items-center justify-center w-9 h-9 rounded-[10px] cursor-pointer transition-all duration-300"
              style={{
                backgroundColor: activeChannel === 'whatsapp' ? '#FDFEFF' : 'transparent',
                boxShadow: activeChannel === 'whatsapp' ? '0px 0px 4px 0px #00000040' : 'none'
              }}
              onClick={() => setActiveChannel('whatsapp')}
            >
              <img src={WhatsAppIcon} alt="WhatsApp" width={22} height={22} />
            </div>
          </div>

          {/* Expand Icon */}
          <div className="flex items-center justify-center w-9 h-9 rounded-[10px] cursor-pointer transition-colors hover:bg-gray-50"
            style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', boxShadow: '0px 1px 3px rgba(0,0,0,0.05)' }}>
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 1.5H10.5M10.5 1.5V4.5M10.5 1.5L6.5 5.5M4.5 10.5H1.5M1.5 10.5V7.5M1.5 10.5L5.5 6.5"
                stroke="#464555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        </div>
      </div>

      {/* ── CONDITIONAL PREVIEW CARD ── */}
      {activeChannel === 'gmail' ? (
        /* ── GMAIL PREVIEW ── */
        <div className="px-6 pb-4 flex justify-center mt-auto">
          <div className="w-full" style={{ maxWidth: '400px' }}>
            <div className="rounded-[12px] overflow-hidden" style={{
              border: '1px solid #E2E8F0',
              boxShadow: '0px 2px 15px 0px #00437024'
            }}>
              <div className="p-4 flex flex-col gap-3" style={{ backgroundColor: '#FFFFFF' }}>
                <div className="flex flex-col gap-1">
                  <span style={{ fontWeight:500, fontSize:'10px', lineHeight:'15px', letterSpacing:'1px', color:'#767587', textTransform:'uppercase' }}>
                    Subject
                  </span>
                  <span style={{ fontWeight:600, fontSize:'14px', lineHeight:'20px', color:'#131B2E' }}>
                    Exclusive Access: The Summer Minimalist Collection
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span style={{ fontWeight:500, fontSize:'10px', lineHeight:'15px', letterSpacing:'1px', color:'#767587', textTransform:'uppercase' }}>
                    Preheader
                  </span>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span style={{ fontWeight:400, fontSize:'12px', lineHeight:'16px', color:'#464555' }}>
                      Don't miss out on the season's most anticipated drop.
                    </span>
                    <span className="px-1.5 py-0.5 rounded-[4px]" style={{
                      fontWeight:500, fontSize:'10.2px',
                      lineHeight:'16px', color:'#004370', backgroundColor:'#E1DFFF'
                    }}>
                      {'{{First Name}}'}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ borderBottom: '1px solid #E2E8F0' }} />
              <img
                src="https://placehold.co/400x120/e2f0e8/94a3b8?text=Campaign+Image"
                alt="Campaign visual"
                className="w-full object-cover"
                style={{ height: '120px', display: 'block' }}
              />
            </div>
          </div>
        </div>
      ) : (
        /* ── WHATSAPP PREVIEW ── */
        <div className="px-6 pb-4 flex justify-center mt-auto">
          <div className="w-full" style={{ maxWidth: '400px' }}>
            <div className="relative w-full rounded-[24px] overflow-hidden"
              style={{ border: '6px solid #222222', boxShadow: '0px 2px 15px 0px #00437024' }}>

              {/* WA Header bar */}
              <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{ backgroundColor: '#075E54' }}>
                {/* Back arrow */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ cursor: 'pointer', marginRight: '4px' }}>
                  <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                {/* Avatar */}
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center shrink-0 bg-white">
                  <img src={FolleiLogo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left' }} />
                </div>

                {/* Name + status */}
                <div className="flex flex-col flex-1">
                  <span style={{ fontWeight:700, fontSize:'13px', lineHeight:'18px', color:'#FFFFFF' }}>
                    Follie ✓
                  </span>
                  <span style={{ fontWeight:400, fontSize:'11px', lineHeight:'14px', color:'#B2DFDB' }}>
                    Online
                  </span>
                </div>

                {/* Right icons */}
                <div className="flex items-center gap-3">
                  {/* Video icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M15 10l4.553-2.277A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* Call icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L8.5 10.5S10 13 13.5 15.5l1.113-1.724a1 1 0 011.21-.502l4.493 1.498A1 1 0 0121 15.72V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {/* Three dots */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
                  </svg>
                </div>
              </div>

              {/* Chat body — scrollable */}
              <div
                className="flex flex-col px-3 py-3 gap-3 overflow-y-auto wa-chat-scroll"
                style={{
                  backgroundColor: '#E5DDD5',
                  height: '220px',
                  overflowY: 'auto',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {/* TODAY pill */}
                <div className="flex justify-center">
                  <span className="px-3 py-0.5 rounded-full"
                    style={{ backgroundColor: '#D1F0E8', fontSize: '11px', color: '#4A4A4A' }}>
                    TODAY
                  </span>
                </div>

                {/* Message bubble */}
                <div className="rounded-[12px] p-3 max-w-[85%]"
                  style={{ backgroundColor: '#FFFFFF', boxShadow: '0px 1px 2px #00000020' }}>
                  <p style={{ fontWeight:400, fontSize:'13px', lineHeight:'20px', color:'#131B2E', margin: 0 }}>
                    Hey{' '}
                    <span className="px-1.5 py-0.5 rounded-[4px]" style={{
                      fontWeight:500, fontSize:'10.2px',
                      lineHeight:'16px', color:'#004370', backgroundColor:'#E1DFFF'
                    }}>
                      {'{{First Name}}'}
                    </span>
                    ! 👋 Summer is officially here. We've missed you! Use code{' '}
                    <span style={{ fontWeight: 700 }}>SUMMER20</span>
                    {' '}for 20% off your next purchase. 🎉
                  </p>
                  {/* Partial image preview */}
                  <div className="mt-2 rounded-[8px] overflow-hidden" style={{ height: '60px' }}>
                    <img
                      src="https://placehold.co/300x60/e2f0e8/94a3b8?text=+"
                      alt="preview"
                      className="w-full object-cover"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── METRICS ROW ── */}
      <div className="flex items-center justify-between gap-3 mx-6 mb-6">
        {[
          { label: 'OPEN', value: '24.2%' },
          { label: 'CTR', value: '8.1%' },
          { label: 'Conversion', value: '2.4%' },
        ].map((metric) => (
          <div key={metric.label}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1 rounded-[12px]"
            style={{ backgroundColor: '#F8FBFF', border: '1px solid #E6EFFF' }}>
            <span style={{ fontWeight:500, fontSize:'12px', lineHeight:'15px', color:'#464555', textAlign:'center' }}>
              {metric.label}
            </span>
            <span style={{ fontWeight:600, fontSize:'18px', lineHeight:'24px', color:'#131B2E', textAlign:'center' }}>
              {metric.value}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
