import React from 'react';
import { Sparkles } from 'lucide-react';
import type { UpsellItem } from '../RenewalDash';

interface UpsellOpportunityListProps {
  upsells: UpsellItem[];
}

export default function UpsellOpportunityList({ upsells }: UpsellOpportunityListProps) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EDF3FD',
      padding: '24px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h2 style={{
            margin: 0,
            fontFamily: 'Urbanist',
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '36px',
            color: '#0D1C2E'
          }}>Upsell Opportunities</h2>
          <p style={{
            margin: 0,
            fontFamily: 'Urbanist',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#64748B'
          }}>AI-recommended plan upgrades and add-ons</p>
        </div>
        <div style={{
          fontFamily: 'Urbanist',
          fontWeight: 700,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#004370',
          textAlign: 'center',
          cursor: 'pointer'
        }}>
          View All
        </div>
      </div>

      <div>
        {upsells.map((upsell, index) => (
          <div key={upsell.id} style={{
            border: '1px solid rgba(1, 67, 112, 0.2)',
            borderRadius: '16px',
            marginBottom: index === upsells.length - 1 ? 0 : '16px'
          }}>
            <div style={{
              padding: '16px 20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={upsell.avatar} 
                  alt={upsell.name} 
                  style={{ width: '44px', height: '44px', borderRadius: '999px', objectFit: 'cover' }} 
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{
                    fontFamily: 'Urbanist',
                    fontWeight: 600,
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#0D1C2E'
                  }}>{upsell.name}</span>
                  <span style={{
                    fontFamily: 'Urbanist',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: '#434655'
                  }}>{upsell.email}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                <span style={{
                  fontFamily: 'Urbanist',
                  fontWeight: 700,
                  fontSize: '18px',
                  lineHeight: '33.6px',
                  color: '#0D1C2E'
                }}>{upsell.amount}</span>
                <span style={{
                  fontFamily: 'Urbanist',
                  fontWeight: 600,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: '#006A6A',
                  backgroundColor: 'rgba(0, 106, 106, 0.05)',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  width: 'fit-content'
                }}>{upsell.percentage}</span>
              </div>
            </div>

            <div style={{
              backgroundColor: '#F7F9FB',
              borderRadius: '12px',
              margin: '0 16px 16px 16px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px'
            }}>
              <Sparkles style={{ width: '22px', height: '22px', color: '#636365', flexShrink: 0, marginTop: '2px' }} />
              <span style={{
                fontFamily: 'Urbanist',
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '21.13px',
                color: '#595C5E'
              }}>{upsell.note}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}