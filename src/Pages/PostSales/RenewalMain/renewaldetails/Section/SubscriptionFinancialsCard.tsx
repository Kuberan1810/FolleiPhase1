import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['subscriptionFinancials'];
}

export default function SubscriptionFinancialsCard({ data }: Props) {
  const rowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #EDF3FD' };
  const lastRowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0' };

  return (
    <div className="BoxStyle" style={{ backgroundColor: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#0D1C2E', margin: 0 }}>
        Subscription Financials
      </h2>
      <div style={{ borderBottom: '1px solid #EDF3FD', marginTop: '12px' }} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={rowStyle}>
          <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Annual Recurring Revenue</span>
          <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.arr}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Monthly Recurring Revenue</span>
          <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.mrr}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Last Invoice Date</span>
          <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.lastInvoiceDate}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Current Value</span>
          <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.currentValue}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Renewal Value</span>
          <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#0051D5' }}>{data.renewalValue}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Increase</span>
          <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#16A34A' }}>{data.increase}</span>
        </div>
        <div style={lastRowStyle}>
          <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Auto-Renewal</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {data.autoRenewal && <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16A34A' }} />}
            <span style={{ fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>
              {data.autoRenewal ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1 }} />
    </div>
  );
}