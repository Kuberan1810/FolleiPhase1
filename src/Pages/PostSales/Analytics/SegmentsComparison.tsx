import React from 'react';

const segmentsData = [
  { name: 'Enterprise', customers: '1,245', retention: '92.1%', mrr: '₹645K', health: 78 },
  { name: 'Premium', customers: '2,345', retention: '88.3%', mrr: '₹425K', health: 74 },
  { name: 'Standard', customers: '3,210', retention: '85.7%', mrr: '₹145K', health: 72 },
  { name: 'Basic', customers: '1,542', retention: '80.2%', mrr: '₹35K', health: 68 }
];

const SegmentsComparison: React.FC = () => {
  return (
    <div className="BoxStyle p-6 bg-white border border-[#EDF3FD] rounded-[24px] flex flex-col font-[Inter] overflow-hidden">
      <div className="mb-6">
        <h3
          className="tracking-normal font-semibold text-[#1E293B]"
          style={{
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#1E293B'
          }}
        >
          Segments Comparison
        </h3>
        <p className="text-[13px] text-slate-400 font-medium mt-0.5">
          Compare key metrics across segments
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              <th className="pb-3 text-left">Segment</th>
              <th className="pb-3 text-right">Customers</th>
              <th className="pb-3 text-center">Retention Rate</th>
              <th className="pb-3 text-right">MRR</th>
              <th className="pb-3 text-center">Health Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-[13px]">
            {segmentsData.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 text-[#0D1C2E] font-bold">{row.name}</td>
                <td className="py-4 text-right text-slate-500 font-medium">{row.customers}</td>
                <td className="py-4 text-center text-[12px] leading-[16px] font-semibold text-[#1E293B]">
                  {row.retention} <span className="text-[12px] leading-[16px] font-bold text-[#22C55E]">↑</span>
                </td>
                <td className="py-4 text-right text-[#0D1C2E] font-bold">{row.mrr}</td>
                <td className="py-4 text-center text-slate-600 font-bold">{row.health}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SegmentsComparison;
