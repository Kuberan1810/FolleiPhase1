import React from 'react';
import type { RenewalStat } from '../RenewalDash';

interface RenewalHeaderCardsProps {
  stats: RenewalStat[];
}

export default function RenewalHeaderCards({ stats }: RenewalHeaderCardsProps) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 210px)', gap: '20px' }}>
      {stats.map((stat) => {
        let subBg = '';
        let subText = '';
        if (stat.subType === 'success') {
          subBg = '#006A6A0D';
          subText = '#006A6A';
        } else if (stat.subType === 'urgent') {
          subBg = '#EBF0FF';
          subText = '#316BF3';
        } else if (stat.subType === 'risk') {
          subBg = '#FEE2E2';
          subText = '#DC2626';
        }

        return (
          <div
            key={stat.id}
            style={{
              backgroundColor: '#EFEBEB',
              width: '210px',
              height: '155px',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{
              fontFamily: 'Urbanist',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '16px',
              letterSpacing: '1.2px',
              textTransform: 'uppercase',
              color: '#64748B',
            }}>
              {stat.label}
            </div>

            <div style={{
              fontFamily: 'Urbanist',
              fontWeight: 800,
              fontSize: '36px',
              lineHeight: '40px',
              color: '#0D1C2E',
            }}>
              {stat.value}
            </div>

            <div style={{
              fontFamily: 'Urbanist',
              fontWeight: 700,
              fontSize: '12px',
              lineHeight: '16px',
              borderRadius: '6px',
              padding: '2px 8px',
              width: 'fit-content',
              backgroundColor: subBg,
              color: subText,
            }}>
              {stat.subLabel}
            </div>
          </div>
        );
      })}
    </div>
  );
}
