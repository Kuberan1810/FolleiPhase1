import { Bot } from 'lucide-react';
import type { AiInsight } from '../RenewalDash';
import { useNavigate } from 'react-router-dom';

interface AiInsightsPanelProps {
  insights: AiInsight[];
}

export default function AiInsightsPanel({ insights }: AiInsightsPanelProps) {
  const navigate = useNavigate();
  return (
    <div style={{
      position: 'relative',
      backgroundColor: '#131B2E',
      borderRadius: '20px',
      padding: '24px',
      boxShadow: '0px 4px 6px -4px #0000001A, 0px 10px 15px -3px #0000001A',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-20px',
        right: '-20px',
        width: '128px',
        height: '128px',
        borderRadius: '12px',
        backgroundColor: '#0051D5',
        opacity: 0.2,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        zIndex: 0
      }}></div>
      
      <div style={{ zIndex: 1, position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <Bot style={{ width: '22px', height: '22px', color: '#004370' }} />
          <h2 style={{
            margin: 0,
            fontWeight: 700,
            fontSize: '14px',
            lineHeight: '16.8px',
            letterSpacing: '0.7px',
            textTransform: 'uppercase',
            color: '#7C839B'
          }}>AI RENEWAL INSIGHTS</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {insights.map((insight) => (
            <div key={insight.id} style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '16px'
            }}>
              <div style={{
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '14.4px',
                letterSpacing: '0.12px',
                color: '#FFFFFF',
                marginBottom: '4px'
              }}>{insight.title}</div>
              <div style={{
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '16.5px',
                color: '#7C839B',
                marginBottom: '8px'
              }}>{insight.caption}</div>
              <div style={{
                fontWeight: 700,
                fontSize: '11px',
                lineHeight: '16.5px',
                color: '#0051D5',
                cursor: 'pointer'
              }} onClick={() => navigate('/postsales/renewals/list')}>{insight.ctaText}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}