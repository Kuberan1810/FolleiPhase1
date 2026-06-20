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
        fontWeight: 600,
        fontSize: '14px',
        lineHeight: '100%',
        textTransform: 'uppercase',
        color: '#0D1C2E'
      }}>REVENUE FORECAST</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {forecast.map((item) => {
          const textColor = item.label === 'At Risk' ? '#BA1A1A' : '#191C1E';
          return (
            <div key={item.id} style={{
              backgroundColor: '#F7F9FB',
              border: '1px solid #EFECFF',
              borderRadius: '12px',
              padding: '14px 16px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontWeight: 400,
                    fontSize: '14px',
                    lineHeight: '100%',
                    color: textColor
                  }}>{item.label}</span>
                  <span style={{
                    fontWeight: 700,
                    fontSize: '14px',
                    lineHeight: '20px',
                    color: textColor
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
