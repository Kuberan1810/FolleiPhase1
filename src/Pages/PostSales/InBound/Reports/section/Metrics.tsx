import React, { useState } from 'react';
import {
  Calendar,
  ChevronDown,
  TrendingUp,
  CheckCircle2,
  Building2,
  UsersRound,
  Handshake,
  TrendingDown,
  Minus
} from 'lucide-react';

import { Money } from "iconsax-react"
import CustomRangeCalendar from './CustomRangeCalendar';

const Metrics = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const data = [
// ... (rest of data)
    {
      label: 'TOTAL ORDERS',
      value: '₹12,450',
      trend: '+12% this month',
      trendType: 'up',
      bgIcon: Building2,
    },
    {
      label: 'DELIVERED ORDERS',
      value: '1,209',
      trend: '+ 12.5%',
      trendType: 'success',
      bgIcon: UsersRound,
    },
    {
      label: 'FEEDBACK RECEIVED',
      value: '8.21 %',
      trend: '0.5%',
      trendType: 'up',
      bgIcon: Handshake,
    },
    {
      label: 'REPEAT PURCHASES',
      value: '2.2k',
      trend: '0.5%',
      trendType: 'up',
      bgIcon: Money,
    },
  ];

  const getColor = (type: string) => {
    if (type === 'up') return 'text-green-600';
    if (type === 'down') return 'text-red-500';
    if (type === 'neutral') return 'text-[#006A6A]';
    if (type === 'success') return 'text-[#006A6A]';
    return 'text-gray-600';
  };

  return (
    <div className="w-full">
      {/* Top Header Section */}
      <div className="flex justify-end mb-6 relative">
        <button 
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors shadow-xs cursor-pointer"
        >
          <Calendar size={16} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Custom range</span>
          <ChevronDown size={16} className="text-gray-500" />
        </button>

        <CustomRangeCalendar 
          isOpen={isCalendarOpen} 
          onClose={() => setIsCalendarOpen(false)} 
        />
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 w-full">
        {data.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden h-[145.5px] bg-[#F2F4F6] border-2 border-[#F2F4F6] rounded-[16px] pt-6 px-6 pb-[40px] hover:border-2 hover:border-[#00437010] cursor-pointer"
          >
            {/* Background Decorative Icon */}
            <item.bgIcon
              className="absolute -right-2 -bottom-2 text-[#00437010]"
              size={90}
              strokeWidth={1}
              color='currentColor'
            />

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div>
                <p className="text-[12px] font-semibold tracking-[1.2px] text-[#64748B] uppercase">
                  {item.label}
                </p>
                <h2 className="md:text-[30px] text-2xl font-bold text-[#004370] mt-1 font-manrope tracking-tight mb-1">
                  {item.value}
                </h2>
              </div>

              <div className="flex items-center gap-1.5">
                {item.trendType === 'success' && (
                  <CheckCircle2 size={16} className={getColor(item.trendType)} />
                )}
                {item.trendType === 'up' && (
                  <TrendingUp size={16} className={getColor(item.trendType)} />
                )}
                {item.trendType === 'down' && (
                  <TrendingDown size={16} className={getColor(item.trendType)} />
                )}
                {item.trendType === 'neutral' && (
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
