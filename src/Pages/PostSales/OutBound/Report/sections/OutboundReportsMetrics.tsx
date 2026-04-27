import {
  Calendar,
  ChevronDown,
} from 'lucide-react';

const OutboundReportsMetrics = () => {
  const data = [
    {
      label: 'Total Outreach',
      value: '35,561',
      trend: '↑ 0.5%',
      trendType: 'up',
    },
    {
      label: 'Delivery rate',
      value: '95.03%',
      trend: '+ 12.5%',
      trendType: 'up',
    },
    {
      label: 'Response Rate',
      value: '14.56 %',
      trend: '↑ 0.5%',
      trendType: 'up',
    },
    {
      label: 'Conversion Rate',
      value: '4.62%',
      trend: '↑ 1.2min',
      trendType: 'up',
    },
  ];

  return (
    <div className="w-full">
      <div className="flex justify-end mb-6 p-4 pt-4 lg:pr-8">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-[6px]
        border-[1px] border-[#EBEBEB] bg-[#FFFFFF] cursor-pointer">
          <Calendar size={14} className="text-[#000000]" />
          <span className="text-[14px] font-medium text-[#000000]">Custom range</span>
          <ChevronDown size={14} className="text-[#000000]" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white md:w-[260px] sm:w-full rounded-[16px] px-[16px] py-[10px]"
          >
            <div className="flex flex-col h-full justify-between gap-2">
              <div>
                <p className="text-[16px] font-medium text-[#333333] mb-2">
                  {item.label}
                </p>
                <h2 className="text-[20px] font-bold text-[#333333] font-manrope tracking-tight">
                  {item.value}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[16px] font-bold text-[#006A6A]">
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

export default OutboundReportsMetrics;
