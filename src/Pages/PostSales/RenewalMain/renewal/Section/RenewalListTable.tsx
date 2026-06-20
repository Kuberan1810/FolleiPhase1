import React from 'react';
import type { RenewalListRow } from '../Renewal';

interface RenewalListTableProps {
  rows: RenewalListRow[];
  onRowClick?: (row: RenewalListRow) => void;
}

export default function RenewalListTable({ rows, onRowClick }: RenewalListTableProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden mt-6 w-full border border-[#DDEBFF]">
      <div className="overflow-x-auto w-full">
        <table className="w-full border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#FAFBFF]">
              <th className="px-6 py-3 text-left font-semibold text-xs text-[#64748B] uppercase tracking-[0.5px] leading-5">CUSTOMER NAME</th>
              <th className="px-6 py-3 text-center font-semibold text-xs text-[#64748B] uppercase tracking-[0.5px] leading-5">PLAN BADGE</th>
              <th className="px-6 py-3 text-center font-semibold text-xs text-[#64748B] uppercase tracking-[0.5px] leading-5">DATE</th>
              <th className="px-6 py-3 text-center font-semibold text-xs text-[#64748B] uppercase tracking-[0.5px] leading-5">STATUS</th>
              <th className="px-6 py-3 text-center font-semibold text-xs text-[#64748B] uppercase tracking-[0.5px] leading-5">SCORE</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              let statusColor = '';
              let statusBg = '';
              let scoreColor = '';

              if (row.status === 'Committed') {
                statusColor = 'text-[#047857]';
                statusBg = 'bg-[#ECFDF5]';
                scoreColor = '#10B981';
              } else if (row.status === 'Risk') {
                statusColor = 'text-[#B91C1C]';
                statusBg = 'bg-[#FEE2E2]';
                scoreColor = '#FF2121';
              } else if (row.status === 'Negotiating') {
                statusColor = 'text-[#B91C1C]';
                statusBg = 'bg-[#FFFBEB]';
                scoreColor = '#F59E0B';
              }

              return (
                <tr 
                  key={row.id} 
                  onClick={() => onRowClick && onRowClick(row)}
                  className="hover:bg-[#F8FBFF] transition-colors duration-150 cursor-pointer h-[88px] border-t border-[#F3F4F6]" 
                >
                  <td className="px-6 py-0 align-middle">
                    <div className="flex items-center gap-3">
                      <img 
                        src={row.avatar} 
                        alt={row.name} 
                        className="w-10 h-10 rounded-full object-cover shrink-0" 
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold text-[18px] leading-[24px] text-[#0D1C2E]">{row.name}</span>
                        <span className="font-normal text-[14px] leading-[20px] text-[#434655]">{row.email}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-2.5 py-0 text-center align-middle">
                    <div className="flex justify-center">
                      <div className="font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#222222] bg-[#E4EDFF] rounded-md px-2.5 py-1 w-fit">
                        {row.plan}
                      </div>
                    </div>
                  </td>

                  <td className="px-2.5 py-0 text-center align-middle">
                    <div className="flex justify-center">
                      <span className="font-medium text-[16px] leading-[24px] text-[#0D1C2E]">{row.date}</span>
                    </div>
                  </td>

                  <td className="px-2.5 py-0 text-center align-middle">
                    <div className="flex justify-center">
                      <div className={`font-medium text-[14px] leading-[15px] rounded-md px-2.5 py-1 w-fit ${statusColor} ${statusBg}`}>
                        {row.status}
                      </div>
                    </div>
                  </td>

                  <td className="px-2.5 py-0 text-center align-middle">
                    <div className="flex justify-center items-center gap-3">
                      <div className="w-[100px] h-2 rounded-full bg-[#EAE7E9]">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${row.score}%`, backgroundColor: scoreColor }}></div>
                      </div>
                      <span className="font-bold text-[12px] leading-[14.4px] tracking-[0.12px]" style={{ color: scoreColor }}>{row.score}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}