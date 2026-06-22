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
import DatePicker from './DatePicker';
import ChurnAnalysis from './ChurnAnalysis';
import SegmentsComparison from './SegmentsComparison';
import CustomerJourneyFunnel from './CustomerJourneyFunnel';

const Analytics: React.FC = () => {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDateRange, setSelectedDateRange] = useState('Apr 1- Apr 30, 2026');

    const getPreviousYearPeriod = (rangeStr: string) => {
        return rangeStr.replace(/\d{4}/g, (match) => String(parseInt(match, 10) - 1));
    };

    const handleApplyDateRange = (start: Date, end: Date) => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const startStr = `${months[start.getMonth()]} ${start.getDate()}`;
        const endStr = `${months[end.getMonth()]} ${end.getDate()}`;
        const startYear = start.getFullYear();
        const endYear = end.getFullYear();
        let formattedRange = '';
        if (startYear === endYear) {
            formattedRange = `${startStr}- ${endStr}, ${startYear}`;
        } else {
            formattedRange = `${startStr}, ${startYear}- ${endStr}, ${endYear}`;
        }
        setSelectedDateRange(formattedRange);
        setShowDatePicker(false);
    };

    const metricsData: MetricCardProps[] = [
        {
            icon: ShoppingCart,
            title: 'Total Sales',
            value: '₹ 2.45M',
            trend: '12.6%',
            trendType: 'up',
            period: `vs ${getPreviousYearPeriod(selectedDateRange)}`,
            iconBg: '#DBEAFE',
            iconColor: 'text-[#2563EB]'
        },
        {
            icon: TrendingUp,
            title: 'Net Revenue',
            value: '₹ 2.18M',
            trend: '10.3%',
            trendType: 'up',
            period: `vs ${selectedDateRange}`,
            iconBg: '#DCFCE7',
            iconColor: 'text-[#10B981]'
        },
        {
            icon: RotateCcw,
            title: 'Returns',
            value: '₹ 142K',
            trend: '8.7%',
            trendType: 'down',
            period: `vs ${selectedDateRange}`,
            iconBg: '#FFEDD5',
            iconColor: 'text-[#F97316]'
        },
        {
            icon: Percent,
            title: 'Refund Rate',
            value: '2.35%',
            trend: '0.42%',
            trendType: 'down',
            period: `vs ${selectedDateRange}`,
            iconBg: '#F3E8FF',
            iconColor: 'text-[#8B5CF6]'
        },
        {
            icon: Repeat,
            title: 'Repeat Purchase',
            value: '28.7%',
            trend: '3.9%',
            trendType: 'up',
            period: `vs ${selectedDateRange}`,
            iconBg: '#DBEAFE',
            iconColor: 'text-[#3B82F6]'
        }
    ];


    const handleExport = () => {
        alert('Exporting analytics data to CSV...');
    };

    return (
        <div className="min-h-screen pb-12">
            {/* Title & Description Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">

                        Analytics
                    </h1>
                    <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">

                        Evaluate sales performance and customer outcomes after the sale to drive retention, satisfaction and repeat business.
                    </p>
                </div>

                {/* Date Selector and Export */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
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
                                <DatePicker
                                    selectedDateRange={selectedDateRange}
                                    onClose={() => setShowDatePicker(false)}
                                    onApply={handleApplyDateRange}
                                />
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 mb-8">
                {metricsData.map((metric, idx) => (
                    <MetricCard key={idx} {...metric} />
                ))}
            </div>

            {/* Two Column Layout for detailed widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
                {/* Column 1: Net Revenue Over Time & Churn Analysis */}
                <div className="flex flex-col gap-6 w-full min-w-0">
                    <NetRevenueChart />
                    <ChurnAnalysis />
                </div>

                {/* Column 2: Segments Comparison Table & Funnel Chart */}
                <div className="flex flex-col gap-6 w-full min-w-0">
                    <SegmentsComparison />
                    <CustomerJourneyFunnel />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
