
import { useNavigate } from 'react-router-dom';
import type { RenewalRow } from '../RenewalDash';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';


interface UpcomingRenewalTableProps {
  rows: RenewalRow[];
}

export default function UpcomingRenewalTable({ rows }: UpcomingRenewalTableProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-[20px] border border-[#EDF3FD] p-6 h-full flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="m-0 font-semibold text-[20px] leading-[28px] text-[#0D1C2E]">Upcoming Renewal</h2>
          <p className="m-0 font-normal text-[14px] leading-[20px] text-[#64748B]">Managing 08 New leads this hour</p>
        </div>
        <BtnComSecondary 
          label="View All" 
          onClick={() => navigate('/postsales/renewals/list')} 
        />
      </div>

      <div className="flex-1 overflow-x-auto pb-2">
        <table className="w-full table-fixed border-collapse flex-1 min-w-[700px]">
          <thead>
            <tr className="bg-[#F6FAFF] border-b border-[#EDF3FD] h-[52px]">
              <th className="w-[40%] text-left px-6 py-3 font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655]">CUSTOMER NAME</th>
              <th className="w-[35%] text-left px-6 py-3 font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655]">STATUS</th>
              <th className="w-[25%] text-left px-6 py-3 font-bold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#434655]">PLAN</th>
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
                  className="h-[88px] border-b border-[#F1F5F9] transition-colors"
                >
                  <td className="w-[40%] px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: row.avatarBg }}>
                        <span className="font-semibold text-[18px] leading-[24px] text-[#222222]">{row.initials}</span>
                      </div>
                      <div className="flex flex-col overflow-hidden">
                        <span className="font-semibold text-[18px] leading-[24px] text-[#0D1C2E] truncate">{row.name}</span>
                        <span className="font-normal text-[14px] leading-[20px] text-[#434655] truncate">{row.email}</span>
                      </div>
                      <div className="ml-auto shrink-0 hidden sm:block">
                        <div className="font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#222222] bg-[#E4EDFF] rounded-md px-2.5 py-1 w-fit">
                          {row.plan}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="w-[35%] px-6">
                    <div className="grid grid-cols-2 items-center gap-2">
                      <div className="text-left">
                        <span className="font-medium text-[16px] leading-[24px] text-[#0D1C2E]">{row.date}</span>
                      </div>
                      <div className="flex justify-center">
                        <div className={`font-medium text-[14px] leading-[15px] rounded-md px-2.5 py-1 w-fit ${statusColor} ${statusBg}`}>
                          {row.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="w-[25%] px-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 rounded-full bg-[#EAE7E9]">
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
