import React, { useState } from 'react';

interface ChartDataItem {
  day: string;
  email: number;
  whatsapp: number;
}

interface CampaignPerformanceChartProps {
  data?: ChartDataItem[];
}

const defaultChartData: ChartDataItem[] = [
  { day: "Oct 12", email: 30, whatsapp: 15 },
  { day: "Oct 13", email: 35, whatsapp: 17 },
  { day: "Oct 14", email: 45, whatsapp: 20 },
  { day: "Oct 15", email: 52, whatsapp: 23 },
  { day: "Oct 16", email: 35, whatsapp: 17 },
  { day: "Oct 17", email: 65, whatsapp: 30 },
  { day: "Oct 18", email: 65, whatsapp: 2 } 
];

const CampaignPerformanceChart: React.FC<CampaignPerformanceChartProps> = ({ data = defaultChartData }) => {
  const [activeTooltipIndex, setActiveTooltipIndex] = useState<number | null>(6);
  const [hoveredTooltipIndex, setHoveredTooltipIndex] = useState<number | null>(null);

  const visibleIndex = hoveredTooltipIndex !== null ? hoveredTooltipIndex : activeTooltipIndex;

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h3 className="text-[11px] font-extrabold text-[#8492A6] uppercase tracking-[1.5px] font-manrope">Campaign Performance</h3>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#004370]" />
            <span className="text-[12px] font-bold text-[#8492A6]">Email</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#006A6A]" />
            <span className="text-[12px] font-bold text-[#8492A6]">Whatsapp</span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="h-[240px] flex items-end justify-between gap-4 pt-4 px-2 sm:px-6 min-w-[680px]">
          {data.map((d, index) => (
            <div 
              key={index} 
              onClick={() => setActiveTooltipIndex(activeTooltipIndex === index ? null : index)}
              onMouseEnter={() => setHoveredTooltipIndex(index)}
              onMouseLeave={() => setHoveredTooltipIndex(null)}
              className="flex flex-col items-center flex-1 group cursor-pointer relative"
            >
              <div 
                style={{ width: '78.43px' }} 
                className="flex flex-col justify-end h-[180px] items-center gap-[3px] shrink-0 relative"
              >
                <div 
                  style={{ height: `${d.whatsapp}%` }} 
                  className="w-full bg-[#006A6A] rounded-t-[4px] hover:bg-[#005757] transition-all duration-300 relative origin-bottom shrink-0 group-hover:scale-y-[1.02]"
                />
                <div 
                  style={{ height: `${d.email}%` }} 
                  className="w-full bg-[#004370] rounded-t-[4px] hover:bg-[#003152] transition-all duration-300 relative origin-bottom shrink-0 group-hover:scale-y-[1.02]"
                />

                {visibleIndex === index && (
                  <div className="absolute left-[84px] top-[30px] bg-white border border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-[8px] p-2.5 z-30 min-w-[115px] text-left animate-in fade-in zoom-in-95 duration-150">
                    <div className="absolute -left-[5px] top-[14px] w-2.5 h-2.5 bg-white border-l border-b border-slate-200/80 rotate-45" />
                    
                    <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#475569]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006A6A] shrink-0" />
                      <span className="whitespace-nowrap">Whatsapp {d.whatsapp < 10 ? `0${d.whatsapp}` : d.whatsapp}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] font-extrabold text-[#475569] mt-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#004370] shrink-0" />
                      <span className="whitespace-nowrap">Email {d.email < 10 ? `0${d.email}` : d.email}</span>
                    </div>
                  </div>
                )}
              </div>
              <span className="text-[11px] font-bold text-[#8492A6] mt-3 whitespace-nowrap">{d.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignPerformanceChart;
