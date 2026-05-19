


import React from 'react';

const CampaignAndAnalysis = () => {
  // Dynamic Data
  const campaignsRaw = [
    { name: 'Meta', value: 45, color: 'bg-[#1e3a8a]' },
    { name: 'Direct', value: 24, color: 'bg-[#f7b681]' },
  ];

  const maxCampaignValue = Math.max(...campaignsRaw.map(c => c.value));
  const campaigns = campaignsRaw.map(c => ({
    ...c,
    width: (c.value / maxCampaignValue) * 80 // Scale bars to max 80% width visually
  }));

  const interestDataRaw = [
    { label: 'High Interest', value: 58, colorName: 'bg-[#3ba972]', hex: '#3ba972' },
    { label: 'Medium Interest', value: 18, colorName: 'bg-[#f9bd5e]', hex: '#f9bd5e' },
    { label: 'Low Interest', value: 8, colorName: 'bg-[#f66161]', hex: '#f66161' },
  ];

  // Calculate dynamic circular segments
  const totalInterestValue = interestDataRaw.reduce((acc, item) => acc + item.value, 0);
  const gapSize = 6; 
  const totalGaps = interestDataRaw.length * gapSize;
  const availableSpace = 100 - totalGaps;
  
  let currentOffset = -2;
  const interestSegments = interestDataRaw.map(item => {
    const proportion = item.value / totalInterestValue;
    const baseLength = proportion * availableSpace;
    const dashArray = `${baseLength} ${100 - baseLength}`;
    const offset = currentOffset;
    
    currentOffset -= (baseLength + gapSize);
    
    return {
      ...item,
      dashArray,
      offset
    };
  });

  return (
    <div className=" font-[Inter]">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-[20px]">

        {/* Top Performing Campaign Card */}
        <div className="BoxStyle">
          <h3 className="text-[14px] md:text-[16px]  font-semibold text-[#64748B] tracking-[1.2px] uppercase mb-10">
            Top Performing Campaign / Source
          </h3>
          <div className="space-y-6">
            {campaigns.map((item) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="text-[16px] text-[#222222] w-[55px] font-medium">{item.name}</span>
                <div className="flex-1 flex items-center">
                  <div
                    className={`h-[30px] ${item.color} rounded-r-full transition-all duration-500`}
                    style={{ width: `${item.width}%` }}
                  />
                  <span className="ml-[16px] text-[16px] font-medium text-[#222222]">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interest Analysis Card */}
        <div className="BoxStyle flex flex-col">
          <h3 className="text-[14px] font-semibold text-[#64748B] tracking-[1.2px] mb-1 uppercase">
            Interest Analysis
          </h3>
          <p className="text-[14px] md:text-[16px] text-[#626262] font-regular mb-8">Customer interest level based on AI analysis</p>

          <div className="flex items-center justify-between flex-1">
            {/* Donut Chart with Figma Gaps */}
            <div className="relative w-32 h-32">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                {interestSegments.map((seg, idx) => (
                  <circle
                    key={idx}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={seg.hex}
                    strokeWidth="4.5"
                    strokeDasharray={seg.dashArray}
                    strokeDashoffset={seg.offset}
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="flex flex-col gap-3 flex-1 ml-12">
              {interestSegments.map((item) => (
                <div key={item.label} className="flex items-center justify-between ">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.colorName}`} />
                    <span className="text-base font-medium text-[#222]">{item.label}</span>
                  </div>
                  <span className="text-base font-bold text-[#22222290]">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CampaignAndAnalysis;