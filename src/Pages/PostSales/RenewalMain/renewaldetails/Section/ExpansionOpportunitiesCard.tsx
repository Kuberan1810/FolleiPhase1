import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';
import { HardDrive, Bot } from 'lucide-react';

interface Props {
  data: RenewalDetailsData['expansionOpportunities'];
}

export default function ExpansionOpportunitiesCard({ data }: Props) {
  return (
    <div className="BoxStyle" style={{ backgroundColor: '#FFFFFF' }}>
      <h2 style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#0D1C2E', margin: 0, marginBottom: '20px' }}>
        Expansion Opportunities
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {data.map((item, idx) => {
          const isLast = idx === data.length - 1;
          const IconComponent = item.iconName === 'bot' ? Bot : HardDrive;
          
          let iconColor = '#0051D5';
          let iconBg = 'rgba(0,81,213,0.1)';
          
          if (item.iconName === 'harddrive') {
            iconColor = '#0D9488';
            iconBg = 'rgba(13,148,136,0.1)';
          }

          return (
            <div key={item.id} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              backgroundColor: '#F7F9FB', 
              borderRadius: '12px', 
              padding: '14px 16px', 
              marginBottom: isLast ? '0' : '12px' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComponent style={{ width: '20px', height: '20px', color: iconColor }} />
                </div>
                <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', color: '#1B1B1D' }}>
                  {item.label}
                </span>
              </div>
              <span style={{ fontFamily: 'Urbanist', fontWeight: 700, fontSize: '16px', color: '#16A34A' }}>
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
