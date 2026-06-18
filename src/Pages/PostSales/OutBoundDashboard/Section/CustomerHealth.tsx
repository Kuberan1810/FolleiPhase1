import React from 'react';

const chartData = [
  {
    label: 'Healthy',
    valueText: '74%',
    color: '#0E4C77',
    legendColor: '#309700',
    dasharray: '250 496.37',
    dashoffset: -10,
    pillX: 56,
    pillY: 198
  },
  {
    label: 'Watch',
    valueText: '34%',
    color: '#99B4C6',
    legendColor: '#F58E0A',
    dasharray: '93 496.37',
    dashoffset: -269,
    pillX: 34,
    pillY: 28
  },
  {
    label: 'At Risk',
    valueText: '23%',
    color: '#34698D',
    legendColor: '#DE0000',
    dasharray: '130 496.37',
    dashoffset: -375,
    pillX: 197,
    pillY: 40
  }
];

export default function CustomerHealth() {
  return (
    <div
      className="col-span-12 md:col-span-6 lg:col-span-5 bg-gradient-to-bl from-[#E7F5FF] to-[#FFFFFF] rounded-[20px] p-5 border border-[#EDF3FD] shadow-[0_4px_20px_rgba(237,243,253,0.4)] flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[18px] font-bold text-[#000000]">Customer Health Rate</h2>
      </div>

      <div className="relative flex justify-center items-center h-[220px]">
        <svg width="220" height="220" viewBox="0 0 220 220" className="mx-auto">
          <defs>
            <filter id="roundCorners" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -9.5" result="contrast" />
            </filter>

            <filter id="pillShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#014370" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Group of segments  */}
          <g filter="url(#roundCorners)">
            {chartData.map((item) => (
              <circle
                key={item.label}
                cx="110"
                cy="110"
                r="79"
                fill="transparent"
                stroke={item.color}
                strokeWidth="62"
                strokeDasharray={item.dasharray}
                strokeDashoffset={item.dashoffset}
              />
            ))}
          </g>

          {/* White Circle Overlays centered precisely on the midpoints of the segments */}
          {chartData.map((item) => (
            <g key={`pill-${item.label}`} transform={`translate(${item.pillX}, ${item.pillY})`}>
              <circle
                cx="0"
                cy="0"
                r="20"
                fill="white"
                filter="url(#pillShadow)"
              />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fontSize="14"
                fontWeight="medium"
                fill="#0E4C77"
              >
                {item.valueText}
              </text>
            </g>
          ))}
        </svg>
      </div>

      <div className="flex items-center justify-center gap-12 mt-4 text-[14px] font-medium">
        {chartData.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.legendColor }}
            ></span>
            <span className="text-[#333333]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
