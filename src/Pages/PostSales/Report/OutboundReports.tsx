import React, { useState } from 'react';
import {
  Calendar,
  Download,
  ShoppingCart,
  TrendingUp,
  RotateCcw,
  Percent,
  Repeat,
  ChevronDown
} from 'lucide-react';
import MetricCard from './MetricCard';
import type { MetricCardProps } from './MetricCard';
import NetRevenueChart from './NetRevenueChart';
import ChurnAnalysis from './ChurnAnalysis';
import SegmentsComparison from './SegmentsComparison';
import CustomerJourneyFunnel from './CustomerJourneyFunnel';

const OutboundReports: React.FC = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Apr 1- Apr 30, 2026');

  const metricsData: MetricCardProps[] = [
    {
      icon: ShoppingCart,
      title: 'Total Sales',
      value: '₹ 2.45M',
      trend: '12.6%',
      trendType: 'up',
      period: 'vs Apr 1 - Apr 30, 2025',
      iconBg: '#DBEAFE',
      iconColor: 'text-[#2563EB]'
    },
    {
      icon: TrendingUp,
      title: 'Net Revenue',
      value: '₹ 2.18M',
      trend: '10.3%',
      trendType: 'up',
      period: 'vs Apr 1 - Apr 30, 2026',
      iconBg: '#DCFCE7',
      iconColor: 'text-[#10B981]'
    },
    {
      icon: RotateCcw,
      title: 'Returns',
      value: '₹ 142K',
      trend: '8.7%',
      trendType: 'down',
      period: 'vs Apr 1 - Apr 30, 2026',
      iconBg: '#FFEDD5',
      iconColor: 'text-[#F97316]'
    },
    {
      icon: Percent,
      title: 'Refund Rate',
      value: '2.35%',
      trend: '0.42%',
      trendType: 'down',
      period: 'vs Apr 1 - Apr 30, 2026',
      iconBg: '#F3E8FF',
      iconColor: 'text-[#8B5CF6]'
    },
    {
      icon: Repeat,
      title: 'Repeat Purchase',
      value: '28.7%',
      trend: '3.9%',
      trendType: 'up',
      period: 'vs Apr 1 - Apr 30, 2026',
      iconBg: '#DBEAFE',
      iconColor: 'text-[#3B82F6]'
    }
  ];


  const handleExport = () => {
    alert('Exporting analytics data to CSV...');
  };

  return (
    <div className="min-h-screen pb-12 px-6">
      {/* Title & Description Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pt-4">
        <div>
          <h1
            className="tracking-tight"
            style={{
              fontWeight: 500,
              fontSize: '36px',
              lineHeight: '44px',
              letterSpacing: '-0.72px',
              color: '#0D1C2E'
            }}
          >
            Analysis
          </h1>
          <p
            className="mt-1 max-w-3xl font-normal text-[16px] text-[#434655] leading-[24px]"
            style={{
              fontWeight: 400,
              fontSize: '16px',
              color: '#434655',
              lineHeight: '24px'
            }}
          >
            Evaluate sales performance and customer outcomes after the sale to drive retention, satisfaction and repeat business.
          </p>
        </div>

        {/* Date Selector and Export */}
        <div className="flex items-center gap-3 self-end md:self-center">
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50"
            >
              <Calendar size={16} className="text-[#64748B]" />
              <span>{selectedDateRange}</span>
              <ChevronDown size={14} className="text-[#64748B]" />
            </button>

            {showDatePicker && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowDatePicker(false)} />
                <div className="absolute right-0 mt-2 w-[220px] bg-white border border-[#EDF3FD] rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] py-1.5 z-50 flex flex-col font-[Inter]">
                  {[
                    'Apr 1- Apr 30, 2026',
                    'May 1 - May 31, 2026',
                    'Last 30 Days',
                    'Last 90 Days',
                    'This Year'
                  ].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setSelectedDateRange(range);
                        setShowDatePicker(false);
                      }}
                      className={`px-4 py-2 text-left text-sm transition-colors hover:bg-slate-50 cursor-pointer ${selectedDateRange === range ? 'text-[#004370] font-semibold bg-[#EFF4FF]' : 'text-slate-600 font-medium'
                        }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-[#004370] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#003152] transition-colors cursor-pointer"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* 5 KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
        {metricsData.map((metric, idx) => (
          <MetricCard key={idx} {...metric} />
        ))}
      </div>

      {/* Two Column Layout for detailed widgets */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
        {/* Column 1: Net Revenue Over Time & Churn Analysis */}
        <div className="flex flex-col gap-6">
          <NetRevenueChart />
          <ChurnAnalysis />
        </div>

        {/* Column 2: Segments Comparison Table & Funnel Chart */}
        <div className="flex flex-col gap-6">
          <SegmentsComparison />
          <CustomerJourneyFunnel />
        </div>
      </div>
    </div>
  );
};

export default OutboundReports;
