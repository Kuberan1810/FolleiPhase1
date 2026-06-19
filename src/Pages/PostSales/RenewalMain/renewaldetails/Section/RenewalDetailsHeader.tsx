import React from 'react';
import { Send, Calendar } from 'lucide-react';

export default function RenewalDetailsHeader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{
          margin: 0,
          fontFamily: 'Urbanist',
          fontWeight: 800,
          fontSize: '30px',
          lineHeight: '36px',
          color: '#0D1C2E',
        }}>
          Renewal Details
        </h1>
        <p style={{
          margin: 0,
          fontFamily: 'Urbanist',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '36px',
          color: '#6B7280',
        }}>
          Review and manage upcoming contract expirations across your accounts.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={{
          backgroundColor: '#004370',
          color: '#FFFFFF',
          border: 'none',
          fontFamily: 'Urbanist',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          textAlign: 'center',
          borderRadius: '8px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <Send style={{ width: '16.17px', height: '16.26px', color: '#FFFFFF' }} />
          Send Renewal Proposal
        </button>
        <button style={{
          backgroundColor: '#FFFFFF',
          color: '#004370',
          border: '1px solid #004370',
          fontFamily: 'Urbanist',
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '24px',
          textAlign: 'center',
          borderRadius: '8px',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}>
          <Calendar style={{ width: '16.17px', height: '16.26px', color: '#004370' }} />
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}