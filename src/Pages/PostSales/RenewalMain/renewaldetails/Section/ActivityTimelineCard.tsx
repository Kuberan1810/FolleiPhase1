import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';
import { FileText, Download } from 'lucide-react';

interface Props {
  data: RenewalDetailsData['activityTimeline'];
}

export default function ActivityTimelineCard({ data }: Props) {
  return (
    <div className="BoxStyle" style={{ backgroundColor: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#0D1C2E', margin: 0 }}>
        Activity Timeline
      </h2>
      <div style={{ borderBottom: '1px solid #EDF3FD', marginTop: '12px', marginBottom: '24px' }} />

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        {data.map((item, idx) => {
          const isFirst = idx === 0;
          const isLast = idx === data.length - 1;

          return (
            <div key={item.id} style={{ display: 'flex', position: 'relative', flex: 1 }}>
              {/* Timeline graphic */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '20px' }}>
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  borderRadius: '999px', 
                  backgroundColor: isFirst ? '#0051D5' : '#9CA3AF',
                  boxShadow: '0px 0px 0px 4px #DBE1FF',
                  zIndex: 1,
                  marginTop: '6px',
                  flexShrink: 0
                }} />
                {!isLast && (
                  <div style={{ width: '2px', flex: 1, backgroundColor: '#EAE7E9', marginTop: '4px', marginBottom: '-6px' }} />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingBottom: '32px', flex: 1 }}>
                <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '13px', color: '#6B7280', display: 'block', marginBottom: '6px' }}>
                  {item.timestamp}
                </span>
                <span style={{ fontFamily: 'Urbanist', fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: '#0D1C2E', display: 'block', marginBottom: '8px' }}>
                  {item.title}
                </span>
                <span style={{ fontFamily: 'Urbanist', fontWeight: 400, fontSize: '16px', lineHeight: '1.5', color: '#6B7280', display: 'block' }}>
                  {item.description}
                </span>

                {item.file && (
                  <div style={{ 
                    marginTop: '16px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    backgroundColor: '#F7F9FB',
                    borderRadius: '8px',
                    padding: '12px 16px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <FileText style={{ width: '18px', height: '18px', color: '#45464D' }} />
                      <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '14px', color: '#1B1B1D' }}>
                        {item.file.name}
                      </span>
                    </div>
                    <a href={item.file.url} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      textDecoration: 'none', 
                      color: '#004370', 
                      fontFamily: 'Urbanist', 
                      fontWeight: 600, 
                      fontSize: '14px' 
                    }}>
                      Download
                    </a>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}