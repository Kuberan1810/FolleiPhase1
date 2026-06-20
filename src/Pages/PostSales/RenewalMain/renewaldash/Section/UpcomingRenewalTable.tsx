import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { RenewalRow } from '../RenewalDash';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';
import { ArrowRight } from 'iconsax-react';

interface UpcomingRenewalTableProps {
  rows: RenewalRow[];
}

export default function UpcomingRenewalTable({ rows }: UpcomingRenewalTableProps) {
  const navigate = useNavigate();

  return (
    <div style={{
      backgroundColor: '#FFFFFF',
      borderRadius: '20px',
      border: '1px solid #EDF3FD',
      padding: '24px',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h2 style={{
            margin: 0,
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '28px',
            color: '#0D1C2E'
          }}>Upcoming Renewal</h2>
          <p style={{
            margin: 0,
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#64748B'
          }}>Managing 08 New leads this hour</p>
        </div>
        <BtnComSecondary 
          label="View All" 
          icon={<ArrowRight size={16} />} 
          iconPosition="right" 
          onClick={() => navigate('/postsales/renewals/list')} 
        />
      </div>

      <table style={{ width: '100%', tableLayout: 'fixed', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: '#F6FAFF', height: '52px' }}>
          <tr>
            <th style={{ width: '40%', textAlign: 'left', padding: '0 24px', fontWeight: 700, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#434655' }}>CUSTOMER NAME</th>
            <th style={{ width: '35%', textAlign: 'left', padding: '0 24px', fontWeight: 700, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#434655' }}>STATUS</th>
            <th style={{ width: '25%', textAlign: 'left', padding: '0 24px', fontWeight: 700, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#434655' }}>PLAN</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            let statusColor = '';
            let statusBg = '';
            let scoreColor = '';

            if (row.status === 'Committed') {
              statusColor = '#047857';
              statusBg = '#ECFDF5';
              scoreColor = '#10B981';
            } else if (row.status === 'Risk') {
              statusColor = '#B91C1C';
              statusBg = '#FEE2E2';
              scoreColor = '#FF2121';
            } else if (row.status === 'Negotiating') {
              statusColor = '#B91C1C';
              statusBg = '#FFFBEB';
              scoreColor = '#F59E0B';
            }

            return (
              <tr 
                key={row.id} 
                onClick={() => navigate('/postsales/renewals/list')}
                style={{ height: '72px', borderBottom: '1px solid #F1F5F9', cursor: 'pointer' }}
              >
                <td style={{ width: '40%', padding: '0 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '999px', backgroundColor: row.avatarBg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontWeight: 600, fontSize: '18px', lineHeight: '24px', color: '#222222' }}>{row.initials}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 600, fontSize: '18px', lineHeight: '24px', color: '#0D1C2E' }}>{row.name}</span>
                      <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#434655' }}>{row.email}</span>
                    </div>
                    <div style={{ marginLeft: 'auto' }}>
                      <div style={{ fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#222222', backgroundColor: '#E4EDFF', borderRadius: '6px', padding: '4px 10px', width: 'fit-content' }}>
                        {row.plan}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ width: '35%', padding: '0 24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center' }}>
                    <div style={{ textAlign: 'left' }}>
                      <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#0D1C2E' }}>{row.date}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: '15px', borderRadius: '6px', padding: '4px 10px', width: 'fit-content', color: statusColor, backgroundColor: statusBg }}>
                        {row.status}
                      </div>
                    </div>
                  </div>
                </td>
                <td style={{ width: '25%', padding: '0 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ flex: 1, height: '8px', borderRadius: '999px', backgroundColor: '#EAE7E9' }}>
                      <div style={{ width: `${row.score}%`, height: '100%', borderRadius: '999px', backgroundColor: scoreColor }}></div>
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '12px', lineHeight: '14.4px', letterSpacing: '0.12px', color: scoreColor }}>{row.score}</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}