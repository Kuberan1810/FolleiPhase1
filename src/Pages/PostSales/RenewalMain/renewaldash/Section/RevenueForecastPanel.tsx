import React from 'react';
import type { ForecastItem } from '../RenewalDash';

interface RevenueForecastPanelProps {
  forecast: ForecastItem[];
}

export default function RevenueForecastPanel({ forecast }: RevenueForecastPanelProps) {
  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EDF3FD',
      padding: '24px'
    }}>
      <h2 style={{
        margin: '0 0 16px 0',
        fontFamily: 'Urbanist',
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '100%',
        textTransform: 'uppercase',
        color: '#0D1C2E'
      }}>REVENUE FORECAST</h2>
      
      <div style={{ backgroundColor: '#F7F9FB', border: '1px solid #EFECFF', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {forecast.map((item) => {
          return (
            <div key={item.id}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: 'Urbanist',
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    color: item.color
                  }}>{item.label}</span>
                  <span style={{
                    fontFamily: 'Urbanist',
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: item.color
                  }}>{item.value}</span>
                </div>
                <div style={{ width: '100%', height: '8px', borderRadius: '999px', backgroundColor: '#ECEEF0' }}>
                  <div style={{ width: `${item.value}%`, height: '8px', borderRadius: '999px', backgroundColor: item.color }}></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}