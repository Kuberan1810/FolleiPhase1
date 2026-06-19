import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['customerOverview'];
}

export default function CustomerOverviewCard({ data }: Props) {
  const rowStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: '1px solid #EDF3FD' };

  return (
    <div className="BoxStyle" style={{ backgroundColor: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '20px', lineHeight: '24px', color: '#0D1C2E', margin: 0 }}>
        Customer Overview
      </h2>
      <div style={{ borderBottom: '1px solid #EDF3FD', marginTop: '12px' }} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Company</span>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.company}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Industry</span>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.industry}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Company Size</span>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.companySize}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Region</span>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.region}</span>
        </div>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Customer Since</span>
          <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.customerSince}</span>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 400, fontSize: '12px', lineHeight: '16px', color: '#6B7280' }}>{data.yearsTotal}</span>
          </div>
        </div>
        <div style={rowStyle}>
          <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#6B7280' }}>Tier</span>
          <div style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: '12px', lineHeight: '16px', color: '#0051D5', backgroundColor: 'rgba(0,81,213,0.1)', borderRadius: '6px', padding: '4px 10px', width: 'fit-content' }}>
            {data.tier}
          </div>
        </div>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ marginTop: '16px' }}>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '14px', lineHeight: '24px', textTransform: 'uppercase', color: '#6B7280' }}>
          PRIMARY CONTACT
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '999px', backgroundColor: 'rgba(0,81,213,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 700, fontSize: '16px', lineHeight: '24px', textAlign: 'center', color: '#0051D5' }}>
              {data.primaryContact.initials}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: '16px', lineHeight: '120%', color: '#1B1B1D' }}>{data.primaryContact.name}</span>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 400, fontSize: '14px', lineHeight: '120%', color: '#6B7280' }}>{data.primaryContact.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}