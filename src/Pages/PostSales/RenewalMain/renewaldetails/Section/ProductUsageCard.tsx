import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['productUsage'];
}

export default function ProductUsageCard({ data }: Props) {
  return (
    <div className="BoxStyle" style={{ backgroundColor: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#0D1C2E', margin: 0 }}>
        Product Usage
      </h2>
      <div style={{ borderBottom: '1px solid #EDF3FD', marginTop: '12px', marginBottom: '20px' }} />

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 500, fontSize: '16px', color: '#1B1B1D' }}>Seat Utilization</span>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#2563EB' }}>{data.seatUtilization}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', borderRadius: '999px', backgroundColor: '#EAE7E9' }}>
          <div style={{ height: '8px', borderRadius: '999px', width: `${data.seatUtilization}%`, backgroundColor: '#2563EB' }} />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 500, fontSize: '16px', color: '#1B1B1D' }}>Storage Usage</span>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#DC2626' }}>{data.storageUsage}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', borderRadius: '999px', backgroundColor: '#EAE7E9' }}>
          <div style={{ height: '8px', borderRadius: '999px', width: `${data.storageUsage}%`, backgroundColor: '#DC2626' }} />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: 500, fontSize: '16px', color: '#1B1B1D' }}>API Usage</span>
          <span style={{ fontWeight: 600, fontSize: '16px', color: '#16A34A' }}>{data.apiUsage}%</span>
        </div>
        <div style={{ width: '100%', height: '8px', borderRadius: '999px', backgroundColor: '#EAE7E9' }}>
          <div style={{ height: '8px', borderRadius: '999px', width: `${data.apiUsage}%`, backgroundColor: '#16A34A' }} />
        </div>
      </div>

      <div style={{ flex: 1 }} />
    </div>
  );
}