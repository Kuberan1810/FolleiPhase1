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
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-[20px] font-semibold text-[#191C1E]">Product Usage</h3>
          <p className="text-[14px] font-medium text-[#565E74] mt-1">
            Engagement activity over the last 30 days
          </p>
        </div>
        <div className="text-right">
          <span className="text-[30px] text-[#004370] block leading-none">
            {statsData.usageScore}
          </span>
          <span className="text-[12px] text-[#565E74] uppercase tracking-[0.5px] block mt-1.5">
            Usage Score
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
            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={68}>
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
