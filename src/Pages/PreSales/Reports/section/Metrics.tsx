import {
  Calendar,
  ChevronDown,
  TrendingUp,
  CheckCircle2,
  UsersRound,
  Handshake,
  Minus,
  TrendingDown
} from 'lucide-react';

import {Money,Timer} from "iconsax-react"

const Metrics = () => {
  const data = [
    {
      label: 'REVENUE',
      value: '₹10,209',
      trend: '+12% this month',
      trendType: 'up',
      bgIcon: Money,
    },
    {
      label: 'TOTAL VISITORS',
      value: '1,209',
      trend: '+ 12.5%',
      trendType: 'success',
      bgIcon: UsersRound,
    },
    {
      label: 'CONVERSION RATE',
      value: '8.21 %',
      trend: ' 0.5%',
      trendType: 'up',
      bgIcon: Handshake,
    },
    {
      label: 'AVG. SESSION TIME',
      value: '8.2 min',
      trend: '1.2min',
      trendType: 'neutral',
      bgIcon: Timer,
    },
  ];
  const getColor = (type: string) => {
    if (type === 'up') return 'text-green-600';
    if (type === 'down') return 'text-red-500';
    if (type === 'neutral') return 'text-[#006A6A]';
    if (type === 'success') return 'text-[#006A6A]';
  };

  return (
    /* lg:ml-[256px]: Matches your sidebar width.
       w-full: Takes full available width.
       px-4 md:px-8: Responsive padding so cards don't touch screen edges.
    */
    <div className="w-full ">

      {/* Top Header Section */}
      <div className="flex justify-end mb-6">
        <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-xs cursor-pointer">
          <Calendar size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Custom range</span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>
      </div>

      {/* GRID CONFIGURATION:
          - grid-cols-1: Mobile (Full width cards)
          - md:grid-cols-2: Tablet/Small Screens (Two cards per row)
          - xl:grid-cols-4: Large Screens (Four cards per row)
          - gap-5: Fixed 20px gap
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden h-[145.5px] bg-[#F2F4F6] border-2  border-[#F2F4F6] rounded-[16px] pt-6 px-6 pb-[40px] hover:border-2 hover:border-[#00437010] cursor-pointer"
          >
            {/* Background Decorative Icon - Watermark effect */}
            <item.bgIcon
              className="absolute -right-2 -bottom-2 text-[#00437010]  group-hover:opacity-50 transition-opacity"
              size={90}
              strokeWidth={1} 
              color='currentColor'
            />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col h-full justify-between ">
              <div>
                <p className="text-[12px] font-semibold  tracking-[1.2px] text-[#64748B]  ">
                  {item.label}
                </p>
                <h2 className="md:text-[30px] text-2xl font-bold text-[#004370] mt-1 font-manrope tracking-tight mb-1">
                  {item.value}
                </h2>
              </div>

              <div className="flex items-center gap-1.5">
                {index !== data.length - 1 && item.trendType === 'success' && (
                  <CheckCircle2 size={16} className={getColor(item.trendType)} />
                )}

                {index !== data.length - 1 && item.trendType === 'up' && (
                  <TrendingUp size={16} className={getColor(item.trendType)} />
                )}

                {index !== data.length - 1 && item.trendType === 'down' && (
                  <TrendingDown size={16} className={getColor(item.trendType)} />
                )}

                {index !== data.length - 1 && item.trendType === 'neutral' && (
                  <Minus size={16} className={getColor(item.trendType)} />
                )}

                <span className={`text-[16px] font-semibold ${getColor(item.trendType)}`}>
                  {item.trend}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Metrics;

