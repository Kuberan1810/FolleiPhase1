import React, { useState } from 'react';
import { 
  Users, 
  Flame, 
  CheckCircle2, 
  Calendar, 
  ChevronDown, 
  TrendingUp, 
  Zap, 
  Sparkles, 
  ArrowRight,
  Menu
} from 'lucide-react';
import Sidebar from '../../Component/Sidebar';
import toast from 'react-hot-toast';

interface TopMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconColor: string;
}

export const MainDashboard: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState('This Week');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const topMetrics: TopMetric[] = [
    {
      label: 'TOTAL LEADS',
      value: '1,248',
      change: '+12 this week',
      icon: <Users className="size-3.5 text-[#2563EB]" />,
      iconColor: '#2563EB',
    },
    {
      label: 'HOT LEADS',
      value: '42',
      change: '+6 today',
      icon: <Flame className="size-3.5 text-[#EA580C]" />,
      iconColor: '#EA580C',
    },
    {
      label: 'CONVERTED',
      value: '86',
      change: '+5 this week',
      icon: <CheckCircle2 className="size-3.5 text-[#16A34A]" />,
      iconColor: '#16A34A',
    },
    {
      label: 'MEETINGS BOOKED',
      value: '24',
      change: '4 today',
      icon: <Calendar className="size-3.5 text-[#F59E0B]" />,
      iconColor: '#F59E0B',
    },
  ];

  const avatars = [
    { initials: 'IN', bg: 'bg-[#E0F2FE]', text: 'text-[#0284C7]' },
    { initials: 'HM', bg: 'bg-[#F3E8FF]', text: 'text-[#9333EA]' },
    { initials: 'GM', bg: 'bg-[#FFEDD5]', text: 'text-[#EA580C]' },
    { initials: 'AP', bg: 'bg-[#CCFBF1]', text: 'text-[#0D9488]' },
    { initials: '+3', bg: 'bg-[#DBEAFE]', text: 'text-[#2563EB]' },
  ];

  return (
    <div className="flex h-screen w-full bg-white text-[#16171A] font-sans antialiased overflow-hidden">
      {/* Left Sidebar */}
      <Sidebar
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
        activeItem="home"
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto min-w-0 bg-[#FFFFFF]">
        {/* Mobile Header Bar */}
        <div className="flex items-center justify-between border-b border-[#EBEBE8] bg-white px-4 py-3 lg:hidden sticky top-0 z-30 shrink-0">
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsMobileSidebarOpen(true)}
            className="flex size-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 cursor-pointer shadow-2xs"
          >
            <Menu className="size-4" />
          </button>
          <span className="text-[14px] font-semibold tracking-tight text-[#16171A]">
            Follei
          </span>
          <div className="size-8" />
        </div>

        {/* Dashboard Main Container - Full Width */}
        <main className="w-full font-['Manrope'] px-6 py-6 lg:px-10 lg:py-8">
          {/* Header Greeting */}
          <div className="mb-6">
            <h1 className="font-['Manrope'] font-medium text-[28px] leading-[35px] tracking-[0px] text-[#1E293B]">
              Good afternoon, Pragya
            </h1>
            <p className="font-['Manrope'] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#64748B] mt-1">
              Your AI is actively working on your sales pipeline.
            </p>
          </div>

          {/* Top Metrics Row (Figma specs: Fill 100% width, border-t & border-b: 1px #E2E8F0, py: 19px) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y border-[#E2E8F0] divide-y sm:divide-y-0 sm:divide-x divide-[#E2E8F0] py-[19px] mb-8">
            {topMetrics.map((metric, index) => (
              <div 
                key={index} 
                className={`flex flex-col justify-between ${
                  index === 0 ? 'pr-6 py-2 sm:py-0' : 
                  index === topMetrics.length - 1 ? 'pl-6 py-2 sm:py-0' : 
                  'px-6 py-2 sm:py-0'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  {metric.icon}
                  <span className="font-['Manrope'] font-semibold text-[12px] leading-[16px] tracking-[0.6px] uppercase text-[#64748B]">
                    {metric.label}
                  </span>
                </div>
                <div className="font-['Manrope'] font-semibold text-[30px] leading-[36px] tracking-[0px] text-[#1E293B]">
                  {metric.value}
                </div>
                <div className="font-['Manrope'] font-normal text-[12px] leading-[16px] tracking-[0px] text-[#64748B] mt-1">
                  {metric.change}
                </div>
              </div>
            ))}
          </div>

          {/* Main Grid Layout (Left: Sales Health, Right: AI Attention & Top Campaign) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Card: Sales Health (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-[16px] border border-[#F3F4F6] p-[24px] flex flex-col justify-between">
              <div className="flex flex-col gap-[20px]">
                {/* Header & Filter */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-['Manrope'] font-semibold text-[18px] text-[#1E293B]">
                      Sales Health
                    </h2>
                    <p className="font-['Manrope'] font-normal text-[14px] text-[#64748B] mt-0.5">
                      How your sales pipeline is performing
                    </p>
                  </div>

                  {/* Dropdown Filter */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5 text-[13px] font-medium text-[#475569] hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <span>{timeRange}</span>
                      <ChevronDown className="size-3.5 text-[#64748B]" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-1.5 w-36 bg-white border border-[#E2E8F0] rounded-xl z-20 py-1 text-[13px]">
                        {['Today', 'This Week', 'This Month', 'This Quarter'].map((item) => (
                          <button
                            key={item}
                            onClick={() => {
                              setTimeRange(item);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3.5 py-1.5 hover:bg-[#F8FAFC] cursor-pointer transition-colors ${
                              timeRange === item ? 'font-semibold text-[#1E293B]' : 'text-[#64748B]'
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Semicircular Gauge (Figma specs: stroke 20.48px, #6A6A6A, 78 @ 44px #111827, /100 @ 22px #6B7280) */}
                <div className="flex flex-col items-center justify-center my-4">
                  <div className="relative w-[240px] h-[140px] flex items-center justify-center">
                    <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible">
                      {/* Background Arch (180 deg) */}
                      <path
                        d="M 25 130 A 95 95 0 0 1 215 130"
                        fill="none"
                        stroke="#E2E8F0"
                        strokeWidth="20.48"
                        strokeLinecap="round"
                      />

                      {/* Active Progress Arch (78%) */}
                      {/* Arc length for R=95 is PI * 95 = 298.45. 78% progress gives offset = 298.45 * (1 - 0.78) = 65.66 */}
                      <path
                        d="M 25 130 A 95 95 0 0 1 215 130"
                        fill="none"
                        stroke="#6A6A6A"
                        strokeWidth="20.48"
                        strokeLinecap="round"
                        strokeDasharray="298.45"
                        strokeDashoffset="65.66"
                      />
                    </svg>

                    {/* Value in center of gauge - 75px offset from top matching Figma */}
                    <div className="absolute top-[64px] inset-x-0 flex flex-col items-center justify-center pointer-events-none">
                      <div className="flex items-baseline justify-center">
                        <span className="font-['Manrope'] font-bold text-[44px] leading-[44px] text-[#111827] tracking-[0px]">
                          78
                        </span>
                        <span className="font-['Manrope'] font-semibold text-[22px] leading-[33px] text-[#6B7280] tracking-[0px] ml-0.5">
                          /100
                        </span>
                      </div>
                      <span className="font-['Manrope'] font-semibold text-[15px] leading-[20px] text-[#16A34A] mt-1.5 text-center">
                        Healthy
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metric Breakdown Rows (Figma: Manrope 400, 15px, 22.5px line-height, #6B7280 / Values: Manrope 600, 15px, 22.5px, #10B981) */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-['Manrope'] font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <TrendingUp className="size-4 text-[#94A3B8]" />
                      <span>Pipeline Growth</span>
                    </div>
                    <span className="font-['Manrope'] font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#10B981]">
                      ↑ 14.2%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-['Manrope'] font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <Users className="size-4 text-[#94A3B8]" />
                      <span>Lead-to-Meeting Rate</span>
                    </div>
                    <span className="font-['Manrope'] font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#10B981]">
                      ↑ 8.6%
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5 font-['Manrope'] font-normal text-[15px] leading-[22.5px] text-[#6B7280]">
                      <Zap className="size-4 text-[#94A3B8]" />
                      <span>Leads Going Cold</span>
                    </div>
                    <span className="font-['Manrope'] font-semibold text-[15px] leading-[22.5px] tracking-[0px] text-[#10B981]">
                      ↓ 3.2%
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Footer Section (Figma: Manrope 600, 16px, #111827 & #8B5CF6) */}
              <div className="border-t border-[#F1F5F9] pt-4 mt-6 flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="font-['Manrope'] font-semibold text-[11px] uppercase tracking-[0.6px] text-[#64748B]">
                    BIGGEST IMPROVEMENT
                  </div>
                  <div className="font-['Manrope'] font-semibold text-[16px] leading-[24px] tracking-[0px] text-[#111827] mt-0.5">
                    Hot leads increased by 24% this week
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast.success('Viewing latest sales insights')}
                  className="font-['Manrope'] font-medium text-[15px] leading-[22.5px] text-[#8B5CF6] hover:text-[#7C3AED] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>View Sales Insights</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </div>

            {/* Right Column: 2 Cards (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Card 1: AI Needs Your Attention */}
              <div className="bg-white rounded-[16px] border border-[#F3F4F6] p-[24px]">
                <div className="flex items-center justify-between">
                  <h3 className="font-['Manrope'] font-semibold text-[16px] text-[#1E293B]">
                    AI Needs Your Attention
                  </h3>
                  {/* Figma badge specs: 28x28, bg #F15B5B 20%, drop shadow 0 0 10px #EF4444 30% */}
                  <div className="flex size-[28px] items-center justify-center rounded-full bg-[#F15B5B]/20 shadow-[0_0_10px_rgba(239,68,68,0.3)] text-[13px] font-bold text-[#F15B5B]">
                    7
                  </div>
                </div>

                {/* Figma specs: Manrope 400, 15px, 24.38px line-height, #9CA3AF */}
                <p className="font-['Manrope'] font-normal text-[15px] leading-[24.38px] text-[#9CA3AF] mt-2.5 mb-4">
                  7 leads are showing strong buying signals. Review the most important conversations.
                </p>

                {/* Avatar Stack (Figma specs: 40x40, border 2px #DBDEEE) */}
                <div className="flex items-center mb-5">
                  {[
                    { initials: 'IN', bg: 'bg-[#F8FAFC]', text: 'text-[#334155]' },
                    { initials: 'HM', bg: 'bg-[#FEF3C7]', text: 'text-[#92400E]' },
                    { initials: 'GM', bg: 'bg-[#FFEDD5]', text: 'text-[#9A3412]' },
                    { initials: 'AP', bg: 'bg-[#FEF9C3]', text: 'text-[#854D0E]' },
                    { initials: '+3', bg: 'bg-[#E2F4FF]', text: 'text-[#0369A1]' },
                  ].map((av, idx) => (
                    <div
                      key={idx}
                      className={`flex size-[40px] items-center justify-center rounded-full border-2 border-[#DBDEEE] font-['Manrope'] text-[13px] font-semibold ${av.bg} ${av.text} ${
                        idx > 0 ? '-ml-2.5' : ''
                      }`}
                    >
                      {av.initials}
                    </div>
                  ))}
                </div>

                {/* Olive CTA Button (Figma exact hex: #7A9601) */}
                <button
                  type="button"
                  onClick={() => toast.success('Opening leads to review')}
                  className="w-full py-3 px-4 bg-[#7A9601] hover:bg-[#6C8501] active:scale-[0.99] text-white font-['Manrope'] font-medium text-[14px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  <span>Review Now</span>
                  <ArrowRight className="size-4" />
                </button>
              </div>

              {/* Card 2: Top Performing Campaign */}
              <div className="bg-white rounded-[16px] border border-[#F3F4F6] p-[24px]">
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="size-4 text-[#9333EA]" />
                  <h3 className="font-['Manrope'] font-semibold text-[16px] text-[#1E293B]">
                    Top Performing Campaign
                  </h3>
                </div>

                {/* Campaign Name & Active Badge */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-['Manrope'] font-normal text-[14px] text-[#64748B]">
                    Product Demo Campaign
                  </span>
                  <span className="bg-[#DCFCE7] text-[#16A34A] text-[11px] font-semibold px-2 py-0.5 rounded-md">
                    Active
                  </span>
                </div>

                {/* Stats 4-columns */}
                <div className="grid grid-cols-4 gap-2 text-left mb-5">
                  <div>
                    <div className="font-['Manrope'] text-[12px] text-[#64748B]">Sent</div>
                    <div className="font-['Manrope'] text-[16px] font-bold text-[#1E293B] mt-0.5">1.2K</div>
                  </div>
                  <div>
                    <div className="font-['Manrope'] text-[12px] text-[#64748B]">Opened</div>
                    <div className="font-['Manrope'] text-[16px] font-bold text-[#1E293B] mt-0.5">68%</div>
                  </div>
                  <div>
                    <div className="font-['Manrope'] text-[12px] text-[#64748B]">Replied</div>
                    <div className="font-['Manrope'] text-[16px] font-bold text-[#1E293B] mt-0.5">24%</div>
                  </div>
                  <div>
                    <div className="font-['Manrope'] text-[12px] text-[#64748B]">Meetings</div>
                    <div className="font-['Manrope'] text-[16px] font-bold text-[#1E293B] mt-0.5">18</div>
                  </div>
                </div>

                {/* View Campaign Report CTA Button (Figma specs: bg #0D0D0D 5%, border #0D0D0D 5%, text #222222 @ 15px/22.5px, h 48.5px) */}
                <button
                  type="button"
                  onClick={() => toast.success('Loading campaign report')}
                  className="w-full h-[48.5px] px-4 bg-[#0D0D0D]/5 hover:bg-[#0D0D0D]/10 border border-[#0D0D0D]/5 text-[#222222] font-['Manrope'] font-medium text-[15px] leading-[22.5px] tracking-[0px] rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <span>View campaign report</span>
                  <ArrowRight className="size-4 text-[#222222]" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainDashboard;