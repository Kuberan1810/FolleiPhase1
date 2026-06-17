import React from 'react';

export default function AIInsightBanner() {
  return (
    <div className="flex items-center gap-4 mt-6 rounded-[20px] overflow-hidden"
      style={{
        backgroundColor: '#F9F8FF',
        boxShadow: '0px 1px 14px 0px #00437033',
        fontFamily: 'Manrope, sans-serif',
        padding: '24px'
      }}>

      {/* ── LEFT: narrative text ── */}
      <div className="flex-1" style={{ lineHeight: '29.25px' }}>
        <span style={{ fontFamily:'Manrope', fontWeight:500, fontSize:'18px', lineHeight:'29.25px', letterSpacing:'0.2px', color:'#131B2E' }}>
          Campaign performance is trending{' '}
        </span>
        <span style={{ fontFamily:'Manrope', fontWeight:500, fontSize:'18px', lineHeight:'29.25px', letterSpacing:'0.2px', color:'#10B981' }}>
          14.2% above expectations
        </span>
        <span style={{ fontFamily:'Manrope', fontWeight:500, fontSize:'18px', lineHeight:'29.25px', letterSpacing:'0.2px', color:'#131B2E' }}>
          . WhatsApp has emerged as the highest-converting channel with a{' '}
        </span>
        <span style={{ fontFamily:'Manrope', fontWeight:600, fontSize:'18px', lineHeight:'29.25px', letterSpacing:'0.2px', color:'#004370' }}>
          22% engagement rate
        </span>
        <span style={{ fontFamily:'Manrope', fontWeight:500, fontSize:'18px', lineHeight:'29.25px', letterSpacing:'0.2px', color:'#131B2E' }}>
          . Segment analysis confirms that{' '}
        </span>
        <span style={{ fontFamily:'Manrope', fontWeight:500, fontSize:'18px', lineHeight:'29.25px', letterSpacing:'0.2px', color:'#004370' }}>
          Returning Customers
        </span>
        <span style={{ fontFamily:'Manrope', fontWeight:500, fontSize:'18px', lineHeight:'29.25px', letterSpacing:'0.2px', color:'#131B2E' }}>
          {' '}are demonstrating the strongest purchase intent, particularly for Product name 1 and Product name 2.
        </span>
      </div>

      {/* ── RIGHT: Real-time Pulse card ── */}
      <div className="flex flex-col items-center justify-between rounded-[16px] p-4 shrink-0"
        style={{ backgroundColor: '#004370', width: '380px', minHeight: '140px' }}>

        {/* Heading — centered */}
        <span style={{ fontFamily:'Inter', fontWeight:700, fontSize:'13px', lineHeight:'18px', color:'#FFFFFF', width:'100%' }}>
          Real-time Pulse
        </span>

        {/* Bar chart — centered, wider bars */}
        <div className="flex items-end justify-center gap-2 w-full mt-3" style={{ height: '60px' }}>
          {[20, 35, 30, 50, 40, 28, 45].map((h, i) => (
            <div key={i} style={{
              flex: 1,
              height: `${h}px`,
              backgroundColor: '#FFFFFF33',
              borderTopLeftRadius: '4px',
              borderTopRightRadius: '4px',
            }} />
          ))}
        </div>

        {/* Caption — centered */}
        <span className="mt-2" style={{
          fontFamily:'Inter', fontWeight:400, fontSize:'11px',
          lineHeight:'13.75px', color:'#FFFFFF',
          textAlign:'center', width:'100%'
        }}>
          42 active users Opening your summer collection right now.
        </span>
      </div>
    </div>
  );
}
