import { BanknoteArrowUp } from 'lucide-react';

const RevenueCharts = () => {
  const barData = [
    { month: 'JAN 26', height: '35%' },
    { month: 'FEB 26', height: '50%' },
    { month: 'MAR 26', height: '40%' },
    { month: 'APR 26', height: '65%' },
    { month: 'MAY 26', height: '85%', active: true },
    { month: 'JUN 26', height: '55%' },
    { month: 'JUL 26', height: '45%' },
    { month: 'AUG 26', height: '70%' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
      {/* Left Section: Total Expansion Revenue */}
      <div className="lg:col-span-2 BoxStyle flex flex-col overflow-hidden">
        <div className="flex justify-between items-start mb-6 md:mb-10">
          <div>
            <p className="text-[#767686] text-[11px] font-bold tracking-widest uppercase mb-1">
              Total Expansion Revenue
            </p>
            <div className="flex items-center gap-3">
              <h2 className="text-[30px] font-bold text-[#0B1C30">$412,850.00</h2>
              <span className="flex items-center text-[14px] rounded-xl font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-md">
                ↑ 12.4%
              </span>
            </div>
          </div>
          <div className="bg-blue-50 p-2 rounded-lg">
            <BanknoteArrowUp size={20} className="text-blue-600" />
          </div>
        </div>

        {/* Histogram with Explicit Height and Colors */}
        <div className="flex items-end justify-between h-[160px] w-full gap-2 md:gap-4 px-2">
          {barData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center h-full justify-end">
              <div 
                className="w-full rounded-sm transition-opacity hover:opacity-80"
                style={{ 
                  height: item.height, 
                  backgroundColor: item.active ? '#004370' : '#F0F7FF',
                  minWidth: '20px'
                }}
              ></div>
              <span className="mt-4 text-[11px] tracking-[1px] font-bold text-[#94A3B8] whitespace-nowrap">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section: Renewal Rate */}
      <div className="BoxStyle flex flex-col font-[Inter]">
        <p className="text-[#767686] text-[11px] font-bold tracking-[0.55px] uppercase mb-8">
          Renewal Rate
        </p>

        <div className="relative flex justify-center mb-10">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64" cy="64" r="58"
              stroke="#f1f5f9" strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="64" cy="64" r="58"
              stroke="#004269" strokeWidth="10"
              fill="transparent" strokeDasharray={-365}
              strokeDashoffset={-365}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center translate-y-1">
            <span className="text-[24px] font-bold text-[#0B1C30]">90%</span>
            <span className="text-[10px] font-bold text-[#94A3B8] tracking-tight uppercase">Target 85%</span>
          </div>
        </div>

        <div className="space-y-6 mt-auto">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B] text-[14px] font-medium">Automatic Renewals</span>
              <span className="text-[#0B1C30] font-bold">74%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: '74%', backgroundColor: '#004370' }}></div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-[#64748B] font-medium">Manual Upsell Renewals</span>
              <span className="text-[#0B1C30] font-bold">16%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full" style={{ width: '16%', backgroundColor: '#004370' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCharts;