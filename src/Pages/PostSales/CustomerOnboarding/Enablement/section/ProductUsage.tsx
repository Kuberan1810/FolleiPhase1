import React from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ProductUsageProps {
  customerName: string;
}

const usageData = [
  { day: 'Oct 12', value: 30 },
  { day: ' ', value: 45 },
  { day: '  ', value: 40 },
  { day: 'Oct 19', value: 65 },
  { day: '   ', value: 50 },
  { day: 'Oct 26', value: 55 },
  { day: '    ', value: 48 },
  { day: 'Today', value: 75 }
];

const statsData = {
  usageScore: '75%',
  gridStats: [
    { label: 'First Login', value: 'Oct 12' },
    { label: 'Last Login', value: 'Today' },
    { label: 'Active Days', value: '18/30' },
    { label: 'Time Spent', value: '12h 40m' }
  ]
};

const ProductUsage: React.FC<ProductUsageProps> = () => {
  return (
    <div className="BoxStyle flex flex-col gap-6">
      <style dangerouslySetInnerHTML={{
        __html: `
        .recharts-wrapper:focus,
        .recharts-wrapper *,
        svg:focus,
        svg * {
          outline: none !important;
          box-shadow: none !important;
        }
      `}} />
      {/* Header and usage score */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h3 className="text-[20px] font-semibold text-[#191C1E]">Product Usage</h3>
          <p className="text-[14px] font-medium text-[#565E74] mt-1">
            Engagement activity over the last 30 days
          </p>
        </div>
        <div className="flex items-baseline justify-between sm:flex-col sm:items-end w-full sm:w-auto border-t sm:border-t-0 border-[#EDF3FD] pt-3 sm:pt-0 mt-1 sm:mt-0">
          <span className="text-[12px] text-[#565E74] uppercase tracking-[0.5px] font-semibold leading-none order-1 sm:order-none">
            Usage Score
          </span>
          <span className="text-[30px] font-semibold text-[#004370] leading-none order-2 sm:order-none mt-0 sm:mt-1.5">
            {statsData.usageScore}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {statsData.gridStats.map((stat, idx) => (
          <div key={idx} className="bg-[#F7F9FD]/75 rounded-[8px] p-3 flex flex-col justify-center h-[66px]">
            <span className="text-[12px] font-semibold text-[#565E74] uppercase tracking-[0.5px] leading-none mb-1.5">
              {stat.label}
            </span>
            <span className="text-[16px] font-medium text-[#191C1E] leading-none">
              {stat.value}
            </span>
          </div>
        ))}
      </div>

      <div className="h-[200px] w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={usageData} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#565E74', fontSize: 10, fontWeight: 500 }}
              dy={8}
            />
            <YAxis hide />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
              {usageData.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === usageData.length - 1 ? '#004AC6' : '#DBE1FF'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductUsage;
