import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const leads = [
  { id: 1, initials: 'SM', name: 'Sophia Miller', action: 'Opened Email', cta: 'Purchased', ctaType: 'green', rightLabel: 'REVENUE', rightValue: '₹48K' },
  { id: 2, initials: 'EC', name: 'Ethan Carter', action: 'Read WhatsApp', cta: 'Requested Demo', ctaType: 'blue', rightLabel: 'POTENTIAL VALUE', rightValue: '₹38K' },
  { id: 3, initials: 'ND', name: 'Noah Davis', action: 'Clicked Button', cta: null, ctaType: 'brochure', rightLabel: null, rightValue: null },
  { id: 4, initials: 'AJ', name: 'Ava Johnson', action: 'Read WhatsApp', cta: 'Requested Demo', ctaType: 'blue', rightLabel: 'POTENTIAL VALUE', rightValue: '₹38K' },
  { id: 5, initials: 'AK', name: 'Arjun Kumar', action: 'Clicked Button', cta: null, ctaType: 'brochure', rightLabel: null, rightValue: null },
];

export default function RecentEngagement() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="BoxStyle w-full" style={{ fontFamily: 'Manrope, sans-serif', height: '100%' }}>
      {/* Heading row */}
      <div className="flex items-center justify-between mb-4">
        <span style={{ fontFamily:'Manrope', fontWeight:600, fontSize:'20px', lineHeight:'28px', color:'#0F172A' }}>
          Recent Engagement Activity
        </span>
        <span
          className="cursor-pointer"
          onClick={() => navigate(`/presales/campaigns/${id}/engagement`)}
          style={{ fontFamily:'Manrope', fontWeight:700, fontSize:'14px', lineHeight:'20px', color:'#004370' }}
        >
          View All ›
        </span>
      </div>

      {/* Rows */}
      {leads.map((lead, index) => (
        <div
          key={lead.id}
          className="flex items-center justify-between py-3"
          style={{ borderBottom: index < leads.length - 1 ? '1px solid #F8FAFF' : 'none' }}
        >
          {/* Left: avatar + name + action */}
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#F4F3FF' }}>
              <span style={{ fontFamily:'Manrope', fontWeight:600, fontSize:'13px', letterSpacing:'1px', color:'#07006C' }}>
                {lead.initials}
              </span>
            </div>

            {/* Name + action */}
            <div className="flex flex-col">
              <span style={{ fontFamily:'Manrope', fontWeight:600, fontSize:'16px', lineHeight:'24px', color:'#131B2E' }}>
                {lead.name}
              </span>
              <div className="flex items-center gap-1">
                <span style={{ fontFamily:'Manrope', fontWeight:400, fontSize:'16px', lineHeight:'24px', color:'#464555' }}>
                  {lead.action}
                </span>
                {lead.cta && lead.ctaType !== 'brochure' && (
                  <>
                    <span style={{ color:'#464555' }}> • </span>
                    <span style={{
                      fontFamily:'Manrope', fontWeight:700, fontSize:'16px', lineHeight:'24px',
                      color: lead.ctaType === 'green' ? '#10B981' : '#2618F7'
                    }}>
                      {lead.cta}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right: brochure pill OR revenue/value */}
          <div className="flex flex-col items-end gap-0.5">
            {lead.ctaType === 'brochure' ? (
              <span className="px-2 py-1 rounded" style={{
                fontFamily:'Manrope', fontWeight:700, fontSize:'10px',
                lineHeight:'100%', color:'#9A4600', backgroundColor:'#FFF8F5',
                textTransform:'uppercase', letterSpacing:'0px'
              }}>
                DOWNLOADED BROCHURE
              </span>
            ) : (
              <>
                <span style={{
                  fontFamily:'Manrope', fontWeight:500, fontSize:'12px',
                  lineHeight:'24px', letterSpacing:'0.6px', color:'#464555',
                  textTransform:'uppercase'
                }}>
                  {lead.rightLabel}
                </span>
                <span style={{
                  fontFamily:'Manrope', fontWeight:600, fontSize:'16px',
                  lineHeight:'24px', color:'#131B2E'
                }}>
                  {lead.rightValue}
                </span>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
