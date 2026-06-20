import React from 'react';
import type { RenewalListRow } from '../Renewal';

interface RenewalListTableProps {
  rows: RenewalListRow[];
  onRowClick?: (row: RenewalListRow) => void;
}

export default function RenewalListTable({ rows, onRowClick }: RenewalListTableProps) {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl overflow-hidden mt-6 w-full" style={{ border: '1px solid #DDEBFF' }}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#FAFBFF]">
            <th className="px-6 py-3 text-left" style={{ fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>CUSTOMER NAME</th>
            <th className="px-6 py-3 text-center" style={{ fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>PLAN BADGE</th>
            <th className="px-6 py-3 text-center" style={{ fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>DATE</th>
            <th className="px-6 py-3 text-center" style={{ fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>STATUS</th>
            <th className="px-6 py-3 text-center" style={{ fontWeight: 600, fontSize: '12px', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px', lineHeight: '20px' }}>SCORE</th>
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
                onClick={() => onRowClick && onRowClick(row)}
                className="hover:bg-[#F8FBFF] transition-colors duration-150 cursor-pointer" 
                style={{ height: '76px', borderTop: '1px solid #F3F4F6' }}
              >
                <td className="px-6 py-0" style={{ verticalAlign: 'middle' }}>
                  <div className="flex items-center gap-3">
                    <img 
                      src={row.avatar} 
                      alt={row.name} 
                      style={{ width: '40px', height: '40px', borderRadius: '999px', objectFit: 'cover' }} 
                    />
                    <div className="flex flex-col">
                      <span style={{ fontWeight: 600, fontSize: '18px', lineHeight: '24px', color: '#0D1C2E' }}>{row.name}</span>
                      <span style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: '#434655' }}>{row.email}</span>
                    </div>
                  </div>
                </td>
                
                <td className="px-[10px] py-0 text-center" style={{ verticalAlign: 'middle' }}>
                  <div className="flex justify-center">
                    <div style={{ fontWeight: 600, fontSize: '12px', lineHeight: '16px', letterSpacing: '0.6px', textTransform: 'uppercase', color: '#222222', backgroundColor: '#E4EDFF', borderRadius: '6px', padding: '4px 10px', width: 'fit-content' }}>
                      {row.plan}
                    </div>
                  </div>
                </td>

                <td className="px-[10px] py-0 text-center" style={{ verticalAlign: 'middle' }}>
                  <div className="flex justify-center">
                    <span style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: '#0D1C2E' }}>{row.date}</span>
                  </div>
                </td>

                <td className="px-[10px] py-0 text-center" style={{ verticalAlign: 'middle' }}>
                  <div className="flex justify-center">
                    <div style={{ fontWeight: 700, fontSize: '14px', lineHeight: '15px', borderRadius: '6px', padding: '4px 10px', width: 'fit-content', color: statusColor, backgroundColor: statusBg }}>
                      {row.status}
                    </div>
                  </div>
                </td>

                <td className="px-[10px] py-0 text-center" style={{ verticalAlign: 'middle' }}>
                  <div className="flex justify-center items-center gap-3">
                    <div style={{ width: '100px', height: '8px', borderRadius: '999px', backgroundColor: '#EAE7E9' }}>
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