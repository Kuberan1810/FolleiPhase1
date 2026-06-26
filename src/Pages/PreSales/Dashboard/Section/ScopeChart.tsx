import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Nov", green: 10, blue: 5, red: 8 },
  { name: "Dec", green: 80, blue: 50, red: 20 },
  { name: "Jan", green: 45, blue: 45, red: 30 },
  { name: "Feb", green: 20, blue: 85, red: 65 },
  { name: "Mar", green: 90, blue: null, red: null }
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#EDF3FD] shadow-lg rounded-[8px] p-3 text-[14px]">
        <p className="font-semibold text-[#191C1E] mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 mt-1">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
            <span className="text-[#6E6E6E] font-medium capitalize">{entry.name}:</span>
            <span className="text-[#191C1E] font-bold">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ScopeChart: React.FC = () => {
  return (
    <div className="col-span-12 lg:col-span-7 BoxStyle flex flex-col justify-between h-[360px]">
      {/* Legend Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-[10px] h-[10px] rounded-full bg-[#428FDC] shrink-0" />
          <span className="text-[14px] font-semibold text-[#6E6E6E] tracking-[0.6px]">Scope</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[10px] h-[10px] rounded-full bg-[#17BB84] shrink-0" />
          <span className="text-[14px] font-semibold text-[#6E6E6E] tracking-[0.6px]">Scope</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[10px] h-[10px] rounded-full bg-[#F23D3D] shrink-0" />
          <span className="text-[14px] font-semibold text-[#6E6E6E] tracking-[0.6px]">Scope</span>
        </div>
      </div>

      {/* Recharts Area */}
      <div className="relative flex-1 w-full min-h-0 mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#17BB84" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#17BB84" stopOpacity={0} />
              </linearGradient>
              <filter id="shadowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6.5" floodColor="#17BB84" floodOpacity="0.4" />
              </filter>
              <filter id="shadowBlue" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6.5" floodColor="#428FDC" floodOpacity="0.4" />
              </filter>
              <filter id="shadowRed" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6.5" floodColor="#F23D3D" floodOpacity="0.4" />
              </filter>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: "#000000", fontSize: 16, fontWeight: 500 }} 
              dy={15}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#E5ECFB', strokeWidth: 1, strokeDasharray: '4 4' }} />
            
            <Area 
              type="monotone" 
              dataKey="green" 
              stroke="#17BB84" 
              strokeWidth={4} 
              fill="url(#greenGrad)" 
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              dot={{ r: 4, stroke: '#fff', strokeWidth: 2, fill: '#17BB84' }}
              style={{ filter: "url(#shadowGreen)" }}
              animationDuration={1500}
            />
            <Area 
              type="monotone" 
              dataKey="blue" 
              stroke="#428FDC" 
              strokeWidth={4} 
              fill="transparent" 
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              dot={{ r: 4, stroke: '#fff', strokeWidth: 2, fill: '#428FDC' }}
              style={{ filter: "url(#shadowBlue)" }}
              animationDuration={1500}
              connectNulls
            />
            <Area 
              type="monotone" 
              dataKey="red" 
              stroke="#F23D3D" 
              strokeWidth={4} 
              fill="transparent" 
              activeDot={{ r: 6, stroke: '#fff', strokeWidth: 2 }}
              dot={{ r: 4, stroke: '#fff', strokeWidth: 2, fill: '#F23D3D' }}
              style={{ filter: "url(#shadowRed)" }}
              animationDuration={1500}
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScopeChart;
