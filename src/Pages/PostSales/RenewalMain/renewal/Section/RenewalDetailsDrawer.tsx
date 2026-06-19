import React from 'react';
import { X, Sparkles, Calendar, TrendingUp, Ticket, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { RenewalDetail } from '../Renewal';

interface RenewalDetailsDrawerProps {
  isOpen: boolean;
  detail: RenewalDetail | null;
  onClose: () => void;
}

export default function RenewalDetailsDrawer({ isOpen, detail, onClose }: RenewalDetailsDrawerProps) {
  const navigate = useNavigate();

  return (
    <>
      <div 
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          zIndex: 999,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms ease'
        }}
      />

      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: '420px',
        backgroundColor: '#FFFFFF',
        zIndex: 1000,
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 300ms ease',
        overflowY: 'auto',
        boxShadow: '-4px 0px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {detail && (
          <>
            <div style={{ flex: 1 }}>
              {/* 1. HEADER SECTION */}
              <div style={{ padding: '24px', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img 
                      src={detail.avatar} 
                      alt={detail.name} 
                      style={{ width: '48px', height: '48px', borderRadius: '999px', objectFit: 'cover' }} 
                    />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '18px', lineHeight: '24px', color: '#0D1C2E' }}>
                        {detail.name}
                      </span>
                      <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#434655' }}>
                        {detail.email}
                      </span>
                    </div>
                  </div>
                  <X 
                    style={{ width: '14px', height: '14px', color: '#464555', cursor: 'pointer' }} 
                    onClick={onClose} 
                  />
                </div>
              </div>
              <div style={{ borderBottom: '1px solid #C7C4D87D' }} />

              {/* 2. PLAN + SEATS CARDS */}
              <div style={{ padding: '20px 24px', display: 'flex', gap: '12px' }}>
                <div className="BoxStyle flex-1" style={{ backgroundColor: '#F1F6FF', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: '11px', lineHeight: '16.5px', color: '#464555' }}>PLAN</span>
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px', lineHeight: '16.5px', color: '#0B1C30' }}>{detail.plan}</span>
                  <span style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: '10px', lineHeight: '20px', color: '#0B1C30' }}>{detail.planUpgradeNote}</span>
                </div>
                <div className="BoxStyle flex-1" style={{ backgroundColor: '#F1F6FF', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'Manrope', fontWeight: 400, fontSize: '11px', lineHeight: '16.5px', color: '#464555' }}>SEATS</span>
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '20px', lineHeight: '28px', color: '#0B1C30' }}>{detail.seatsUsed} / {detail.seatsTotal}</span>
                  <div style={{ width: '100%', height: '6px', borderRadius: '999px', backgroundColor: '#E2E8F0', marginTop: '4px' }}>
                    <div style={{ width: `${(detail.seatsUsed / detail.seatsTotal) * 100}%`, height: '6px', borderRadius: '999px', backgroundColor: '#000000' }} />
                  </div>
                </div>
              </div>

              {/* 3. AI RENEWAL INSIGHTS SECTION */}
              <div style={{ padding: '0 24px 20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Sparkles style={{ width: '22px', height: '22px', color: '#004370' }} />
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', lineHeight: '16.8px', letterSpacing: '1.4px', textTransform: 'uppercase', color: '#45464D' }}>
                    AI RENEWAL INSIGHTS
                  </span>
                </div>
                <div style={{ 
                  borderRadius: '16px', 
                  padding: '20px', 
                  background: 'radial-gradient(120% 120% at 100% 0%, rgba(0, 81, 213, 0.15) 0%, rgba(0, 81, 213, 0) 60%)',
                  backgroundColor: '#F8FAFF'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', lineHeight: '21px', color: '#0051D5' }}>Renewal Chance</span>
                      <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '48px', lineHeight: '57.6px', letterSpacing: '-0.96px', color: '#0051D5' }}>{detail.renewalChance}%</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                      <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', lineHeight: '21px', color: '#059669' }}>Churn Risk</span>
                      <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '24px', lineHeight: '33.6px', color: '#059669' }}>{detail.churnRisk}</span>
                    </div>
                  </div>
                  <div className="BoxStyle" style={{ marginTop: '16px', display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px', lineHeight: '14.4px', letterSpacing: '0.12px', color: '#45464D' }}>
                      BEST NEXT ACTION
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                      <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px', lineHeight: '25.6px', color: '#0D1C2E' }}>
                        {detail.bestAction.title}
                      </span>
                      <Calendar style={{ width: '13.5px', height: '15px' }} />
                    </div>
                    <span style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '22.75px', color: '#45464D', marginTop: '8px' }}>
                      {detail.bestAction.caption}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. PRODUCT USAGE SECTION */}
              <div style={{ padding: '0 24px 20px 24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', lineHeight: '16.8px', letterSpacing: '1.4px', textTransform: 'uppercase', color: '#45464D' }}>
                    PRODUCT USAGE
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <TrendingUp style={{ width: '14px', height: '14px', color: '#059669' }} />
                    <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '12px', lineHeight: '18px', color: '#059669' }}>
                      {detail.usageTrend}
                    </span>
                  </div>
                </div>
                <div style={{ backgroundColor: '#F7F9FB', borderRadius: '16px', padding: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px' }}>
                    {detail.usageBars.map((bar) => (
                      <div key={bar.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', height: '100%' }}>
                        {bar.highlight && (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#0D1C2E', marginBottom: '4px' }}>{bar.month}</span>
                        )}
                        <div style={{ 
                          width: '100%', 
                          height: `${bar.value}%`, 
                          borderRadius: '6px 6px 0 0', 
                          backgroundColor: bar.highlight ? '#004370' : '#E6EDF1' 
                        }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. TICKETS + CSAT CARDS */}
              <div style={{ padding: '0 24px 20px 24px', display: 'flex', gap: '12px' }}>
                <div className="BoxStyle flex-1" style={{ backgroundColor: '#F1F6FF', display: 'flex', alignItems: 'center', gap: '14px', padding: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: 'rgba(255,218,214,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Ticket style={{ width: '20px', height: '20px', color: '#BA1A1A' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px', lineHeight: '14.4px', letterSpacing: '0.12px', color: '#45464D' }}>Tickets</span>
                    <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#0D1C2E' }}>{detail.tickets} Open</span>
                  </div>
                </div>
                <div className="BoxStyle flex-1" style={{ backgroundColor: '#F1F6FF', display: 'flex', alignItems: 'center', gap: '14px', padding: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Smile style={{ width: '20px', height: '20px', color: '#059669' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px', lineHeight: '14.4px', letterSpacing: '0.12px', color: '#45464D' }}>CSAT</span>
                    <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '16px', lineHeight: '22px', color: '#0D1C2E' }}>{detail.csat} / 5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. STICKY BOTTOM CTA */}
            <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#FFFFFF', padding: '16px 24px', borderTop: '1px solid #C7C4D87D' }}>
              <button 
                onClick={() => navigate('/postsales/renewal/details')}
                style={{ width: '100%', backgroundColor: '#004370', color: '#FFFFFF', fontFamily: 'Inter', fontWeight: 700, fontSize: '12px', lineHeight: '16px', textAlign: 'center', borderRadius: '999px', padding: '14px', border: 'none', cursor: 'pointer' }}
              >
                View Renewal details
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}