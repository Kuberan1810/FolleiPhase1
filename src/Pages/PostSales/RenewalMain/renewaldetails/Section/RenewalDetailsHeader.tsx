import React from 'react';
import { Send2, Calendar, ArrowLeft } from 'iconsax-react';

import { useNavigate } from 'react-router-dom';

export default function RenewalDetailsHeader() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => navigate(-1)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              border: '1px solid #EDF3FD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <ArrowLeft color="#0D1C2E" size={20} />
          </button>
          <h1 style={{
            margin: 0,
            fontWeight: 800,
            fontSize: '30px',
            lineHeight: '36px',
            color: '#0D1C2E',
          }}>
            Renewal Details
          </h1>
        </div>
        <p style={{
          margin: 0,
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
          <Send2 color="#FFFFFF" style={{ width: '16.17px', height: '16.26px'}} />
          Send2 Renewal Proposal
        </button>
        <button style={{
          backgroundColor: '#FFFFFF',
          color: '#004370',
          border: '1px solid #004370',
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
          <Calendar color="#004370" style={{ width: '16.17px', height: '16.26px'}} />
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}