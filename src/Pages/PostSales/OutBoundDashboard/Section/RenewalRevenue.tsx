import { useState } from 'react';

const revenueData = [
  { label: 'Safe', color: '#00BB42', width: '90%', value: '$3.78M' },
  { label: 'Critical', color: '#FFC20D', width: '25%', value: '$1.05M' },
  { label: 'At Risk', color: '#FF6467', width: '10%', value: '$0.42M' }
];

export default function RenewalRevenue() {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleInteraction = (e: React.MouseEvent | React.TouchEvent, label: string) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    let x = clientX - rect.left;
    const y = clientY - rect.top;

    if (x < 80) x = 80;
    if (x > rect.width - 80) x = rect.width - 80;

    setMousePos({ x, y });
    setHoveredLabel(label);
  };

  return (
    <div className="col-span-12 lg:col-span-5 BoxStyle shadow-[0_4px_20px_rgba(237,243,253,0.4)] flex flex-col justify-between">
      <div className="mb-4">
        <h2 className="text-[20px] font-semibold text-black leading-[24px] tracking-[0.6px]">Renewal Revenue</h2>
      </div>

      <div className="space-y-5 flex-1 flex flex-col justify-center">
        {revenueData.map((item) => (
          <div
            key={item.label}
            className="flex items-center bg-[#F6F8FF] rounded-[10px] p-2 pl-3 md:pl-6 h-[48px] md:h-[56px] relative cursor-pointer"
            onMouseEnter={(e) => handleInteraction(e, item.label)}
            onMouseMove={(e) => handleInteraction(e, item.label)}
            onMouseLeave={() => setHoveredLabel(null)}
            onTouchStart={(e) => handleInteraction(e, item.label)}
            onTouchMove={(e) => handleInteraction(e, item.label)}
            onTouchEnd={() => setHoveredLabel(null)}
          >
            <span className="w-[60px] md:w-[70px] text-[14px] md:text-[16px] font-semibold text-black">{item.label}</span>
            <div className="flex-1 h-full flex items-center pr-2 md:pr-4">
              <div
                className="h-[38px] md:h-[46px] rounded-tr-[10px] rounded-br-[10px] transition-all duration-500 hover:opacity-90"
                style={{
                  width: item.width,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
            {hoveredLabel === item.label && (
              <div
                className="absolute bg-white border border-[#EDF3FD] text-[#0D1C2E] text-[12px] px-3.5 py-2.5 rounded-[12px] shadow-md pointer-events-none z-50 whitespace-nowrap"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y - 10}px`,
                  transform: 'translate(-50%, -100%)'
                }}
              >
                <div className="flex flex-col gap-1.5">
                  <span className="font-bold text-[13px] text-[#0D1C2E]">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-[#6E6E6E]">Revenue:</span>
                    <span className="font-bold text-[#0D1C2E]">{item.value}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <span className="font-medium text-[#6E6E6E]">Target:</span>
                    <span className="font-bold text-[#0D1C2E]">{item.width}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 text-center pl-4">
        <p className="text-[13px] font-medium text-black italic">
          - <u>The Statics from last one month</u>
        </p>
      </div>
    </div>
  );
}
