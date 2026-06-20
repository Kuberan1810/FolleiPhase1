import React from 'react';

const segmentsData = [
  { name: 'Enterprise', customers: '1,245', retention: '92.1%', mrr: '₹645K', health: 78 },
  { name: 'Premium', customers: '2,345', retention: '88.3%', mrr: '₹425K', health: 74 },
  { name: 'Standard', customers: '3,210', retention: '85.7%', mrr: '₹145K', health: 72 },
  { name: 'Basic', customers: '1,542', retention: '80.2%', mrr: '₹35K', health: 68 }
];

const SegmentsComparison: React.FC = () => {
  return (
    <div className="BoxStyle p-6 bg-white border border-[#EDF3FD] rounded-[24px] flex flex-col overflow-hidden h-auto lg:h-[440px]">
      <div className="mb-6">
        <h3
          className="tracking-normal font-semibold text-[#1E293B]"
          style={{
            fontWeight: 600,
            fontSize: '20px',
            lineHeight: '20px',
            color: '#1E293B'
          }}
        >
          Segments Comparison
        </h3>
        <p className="text-[15px] text-slate-400   mt-1.5">
          Compare key metrics across segments
        </p>
      </div>

      {/* Table Container matching the dashboard layout */}
      <div className="w-full bg-white border border-[#EDF3FD] rounded-[10px] overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr className="bg-[#F3F5FF] border-b border-[#EDF3FD] text-[12px] font-semibold tracking-wider text-[#191C1E] uppercase">
                <th className="py-3 px-5 text-left font-semibold text-[#191C1E]">Segment</th>
                <th className="py-3 px-5 text-right font-semibold text-[#191C1E]">Customers</th>
                <th className="py-3 px-5 text-center font-semibold text-[#191C1E]">Retention Rate</th>
                <th className="py-3 px-5 text-right font-semibold text-[#191C1E]">MRR</th>
                <th className="py-3 px-5 text-center font-semibold text-[#191C1E]">Health Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDF3FD] text-[14px]">
              {segmentsData.map((row, idx) => (
                <tr key={idx} className="bg-[#FAFBFF] hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-5 text-[#1E293B] font-medium">{row.name}</td>
                  <td className="py-4 px-5 text-right text-[#1E293B] font-medium">{row.customers}</td>
                  <td className="py-4 px-5 text-center text-[12px] leading-[16px] font-semibold text-[#1E293B]">
                    {row.retention} <span className="text-[14px] leading-[16px] font-bold text-[#22C55E]">↑</span>
                  </td>
                  <td className="py-4 px-5 text-right text-[#0D1C2E] font-medium">{row.mrr}</td>
                  <td className="py-4 px-5 text-center text-slate-600 font-medium">{row.health}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SegmentsComparison;
