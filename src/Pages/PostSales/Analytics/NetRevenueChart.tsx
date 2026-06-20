import React, { useState } from 'react';

const netRevenueChartData = [
  { label: 'May 1', cur: 38000, prev: 52000, labelCur: '₹38K', labelPrev: '₹52K' },
  { label: 'May 8', cur: 62000, prev: 94000, labelCur: '₹62K', labelPrev: '₹94K' },
  { label: 'May 15', cur: 88000, prev: 124000, labelCur: '₹88K', labelPrev: '₹124K' },
  { label: 'May 22', cur: 70000, prev: 104000, labelCur: '₹70K', labelPrev: '₹104K' },
  { label: 'May 29', cur: 92000, prev: 138000, labelCur: '₹92K', labelPrev: '₹138K' }
];

const NetRevenueChart: React.FC = () => {
  const [activeHoverBar, setActiveHoverBar] = useState<number | null>(null);

  return (
    <div className="BoxStyle p-6 bg-white border border-[#EDF3FD] rounded-[24px] flex flex-col h-auto lg:h-[440px]">
      <div className="flex flex-col gap-4 mb-16">
        <div>
          <h3
            className="tracking-normal font-semibold text-[#1E293B]"
            style={{
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '20px',
              color: '#1E293B'
            }}
          >
            Net Revenue Over Time
          </h3>
        </div>

        {/* Legends */}
        <div className="flex items-center justify-center gap-7">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#BFDBFE] rounded-sm" />
            <span
              className="text-[#64748B] font-normal"
              style={{
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '15px',
                color: '#64748B'
              }}
            >
              May 1 – May 31, 2026
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-[#004370] rounded-sm" />
            <span
              className="text-[#64748B] font-normal"
              style={{
                fontWeight: 400,
                fontSize: '13px',
                lineHeight: '15px',
                color: '#64748B'
              }}
            >
              Apr 1 – Apr 30, 2026
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Comparative HTML Bar Chart */}
      <div className="relative h-[220px] w-full flex flex-col justify-end">
        {/* Chart Area Row */}
        <div className="relative flex-1 flex items-end ml-[50px] border-b border-slate-100">
          {/* Y Axis Grid Lines & Y-Axis Labels */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
            <div className="w-full relative border-t border-dashed border-slate-100/80">
              <span className="absolute right-full pr-3 text-[13px]  text-slate-400 transform -translate-y-1/2 select-none">
                ₹150K
              </span>
            </div>
            <div className="w-full relative border-t border-dashed border-slate-100/80">
              <span className="absolute right-full pr-3 text-[13px]  text-slate-400 transform -translate-y-1/2 select-none">
                ₹100K
              </span>
            </div>
            <div className="w-full relative border-t border-dashed border-slate-100/80">
              <span className="absolute right-full pr-3 text-[13px]  text-slate-400 transform -translate-y-1/2 select-none">
                ₹50K
              </span>
            </div>
            <div className="w-full relative">
              <span className="absolute right-full pr-3 text-[13px]  text-slate-400 transform -translate-y-1/2 select-none">
                ₹0
              </span>
            </div>
          </div>

          {/* Bars Group */}
          {netRevenueChartData.map((data, index) => {
            const maxVal = 150000;
            const curHeight = `${(data.cur / maxVal) * 100}%`;
            const prevHeight = `${(data.prev / maxVal) * 100}%`;

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end h-full z-10 group relative"
                onMouseEnter={() => setActiveHoverBar(index)}
                onMouseLeave={() => setActiveHoverBar(null)}
              >


                {/* Comparative Bars */}
                <div className="flex items-end justify-center gap-1.5 w-full h-[180px] pb-1">
                  {/* Cur Bar (Light Blue) */}
                  <div
                    className="w-[20px] rounded-t-sm transition-all duration-300 bg-[#BFDBFE] hover:brightness-95 cursor-pointer relative"
                    style={{ height: curHeight }}
                  />
                  {/* Prev Bar (Dark Blue) */}
                  <div
                    className="w-[20px] rounded-t-sm transition-all duration-300 bg-[#004370] hover:brightness-90 cursor-pointer relative"
                    style={{ height: prevHeight }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* X-Axis Labels Row */}
        <div className="flex items-center ml-[50px] mt-2">
          {netRevenueChartData.map((data, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-[12px] font-medium text-slate-400 whitespace-nowrap">
                {data.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetRevenueChart;
