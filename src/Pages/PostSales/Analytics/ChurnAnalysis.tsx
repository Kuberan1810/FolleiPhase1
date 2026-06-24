import React from 'react';

const ChurnAnalysis: React.FC = () => {
  return (
    <div className="BoxStyle p-6 bg-white border border-[#EDF3FD] rounded-[24px] flex flex-col h-auto lg:h-[440px]">
      <div className="mb-6">
        <h3 className="tracking-normal font-semibold text-[20px] leading-[28px] text-[#0F172A]">
          Churn Analysis
        </h3>
        <p className="text-[15px] text-slate-400   mt-1.5">
          Data-driven signals for customer retention management.
        </p>
      </div>

      {/* Sub-cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {/* Accounts at Risk */}
        <div className="p-4 rounded-2xl border border-[#FEF2F2] bg-[#FEF2F2]/30 flex flex-col justify-between min-h-[105px]">
          <span className="text-[13px] tracking-wider uppercase font-semibold text-slate-400">
            Accounts at Risk
          </span>
          <div className="flex items-baseline gap-2 mt-2 flex-col">
            <h4 className="text-[30px] leading-[36px] font-bold text-[#DC2626]">120</h4>
            <span className="text-[12px] font-bold text-emerald-600">▲ 12 vs last month</span>
          </div>
        </div>

        {/* Revenue at Risk */}
        <div className="p-4 rounded-2xl border border-[#EFF6FF] bg-[#EFF6FF] flex flex-col justify-between min-h-[105px]">
          <span className="text-[13px] tracking-wider uppercase font-semibold text-slate-400">
            Revenue at Risk
          </span>
          <div className="flex items-baseline gap-2 flex-col mt-2">
            <h4 className="text-[30px] leading-[36px] font-bold text-[#2563EB]">₹ 4.2L</h4>
            <span className="text-[12px] font-bold text-emerald-600">▲ 8.6% vs last month</span>
          </div>
        </div>
      </div>

      {/* List with Progress Bars */}
      <div className="space-y-4">
        {[
          { label: 'Pricing / Value Gap', value: 42 },
          { label: 'Product Fit Issues', value: 28 },
          { label: 'Poor Adoption Rate', value: 18 }
        ].map((reason, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#0D1C2E] text-[14px] font-semibold">{reason.label}</span>
              <span className="text-[#0D1C2E] text-[14px] font-semibold">{reason.value}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#004370] rounded-full transition-all duration-1000"
                style={{ width: `${reason.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChurnAnalysis;
