import React from 'react';
import { TrendingUp } from 'lucide-react';

const MetricBox = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-[#f8fafc] p-4 rounded-xl flex flex-col justify-center">
    <p className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-tight mb-1">{label}</p>
    <p className="text-[18px] font-bold text-[#0B1C30]">{value}</p>
  </div>
);

const RevenueFollowUp = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 font-[Inter]">
      {/* Left Card: Follow-up Completion */}
      <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-50 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[#767686] text-[11px]  font-bold tracking-wider uppercase">
            Follow-up Completion %
          </p>
          <span className="flex items-center gap-1 text-[12px] font-bold text-emerald-500 bg-[#ECFDF5] px-2 py-1 rounded-md">
            <TrendingUp size={12} /> +2.1%
          </span>
        </div>

        <h2 className="text-[36px] font-bold text-[#0B1C30] mb-8">94.2%</h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <MetricBox label="Phone" value="98%" />
          <MetricBox label="Email" value="91%" />
        </div>

        <p className="text-xs font-medium text-slate-400 mt-auto">
          Average response time: <span className="text-[#94A3B8]">4.2 hours</span> 
          <span className="ml-1 opacity-70">(v. 5.8 last month)</span>
        </p>
      </div>

      {/* Right Card: Upsell Conversion */}
      <div className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-50 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <p className="text-[#767686] text-[11px] font-bold tracking-wider uppercase">
            Upsell Conversion
          </p>
          <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-md">
            <TrendingUp size={12} /> +25%
          </span>
        </div>

        <h2 className="text-[36px] font-bold text-[#0B1C30] mb-8">26.2%</h2>

        <div className="grid grid-cols-2 gap-4">
          <MetricBox label="Converted" value="125" />
          <MetricBox label="Pending" value="20" />
        </div>
        
        {/* Placeholder for alignment balance */}
        <div className="mt-auto h-4"></div>
      </div>
    </div>
  );
};

export default RevenueFollowUp;