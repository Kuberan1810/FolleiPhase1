import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['contractDetails'];
}

export default function ContractDetailsCard({ data }: Props) {
  const rowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #EDF3FD' };

  return (
    <div className="BoxStyle" style={{ backgroundColor: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#0D1C2E', margin: 0 }}>
        Contract Details
      </h2>
      <div style={{ borderBottom: '1px solid #EDF3FD', marginTop: '12px' }} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Contract ID</span>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.contractId}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Start Date</span>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.startDate}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Expiry Date</span>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#DC2626' }}>{data.expiryDate}</span>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ marginTop: '16px' }}>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '14px', lineHeight: '24px', textTransform: 'uppercase', color: '#6B7280' }}>
          ACCOUNT MANAGER
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '999px', backgroundColor: 'rgba(220,38,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 700, fontSize: '16px', lineHeight: '24px', textAlign: 'center', color: '#DC2626' }}>
              {data.accountManager.initials}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.accountManager.name}</span>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 400, fontSize: '14px', lineHeight: '120%', color: '#6B7280' }}>{data.accountManager.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}