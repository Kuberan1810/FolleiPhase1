import React, { useState } from 'react';
import { Send, MessageSquare, Smile, Plus, Mail, ChevronDown, Phone, CalendarCheck } from 'lucide-react';
import SupportCard from './Sections/SupportCard';
import RevenueCard from './Sections/RevenueCard';
import FloatingButton from '../../../../Component/FloatingButton';
import SalesToggleSwitch from '../../../../Component/SalesToggleSwitch';

const OutboundDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Customer");
  const categories = ["All Customer", "Enterprise Only", "SMB Only", "High Risk Accounts", "Churned This Month"];

  const stats = [
    {
      label: "TOTAL ACTIVE CUSTOMERS",
      value: "24,402",
      change: "+12.5%",
      isPositive: true,
      icon: <Send size={17} />,
      iconBg: "bg-[#F0F4FF] text-[#5E5CE6]"
    },
    {
      label: "CUSTOMER RETENTION RATE",
      value: "94.6%",
      change: "+2.1%",
      isPositive: true,
      icon: <MessageSquare size={17} />,
      iconBg: "bg-[#FFF9F0] text-[#FF9500]"
    },
    {
      label: "NET REVENUE RETENTION",
      value: "118%",
      change: "+8.4%",
      isPositive: true,
      icon: <CalendarCheck size={17} />,
      iconBg: "bg-[#EBF7F5] text-[#006A6A]"
    },
    {
      label: "CSAT SCORE",
      value: "4.7 / 5",
      change: "-0.4%",
      isPositive: false,
      icon: <Smile size={17} />,
      iconBg: "bg-[#E7EFF7] text-[#004370]"
    }
  ];

  const chartData = [
    { name: "Q1 Launch", usage: 490, adoption: 405, tickets: 195, renewals: 75 },
    { name: "Product Demo", usage: 435, adoption: 315, tickets: 135, renewals: 45 },
    { name: "Referral Intro", usage: 525, adoption: 465, tickets: 285, renewals: 165 },
    { name: "Cold Outreach", usage: 315, adoption: 225, tickets: 75, renewals: 30 },
    { name: "Webinar Follow", usage: 405, adoption: 285, tickets: 105, renewals: 35 }
  ];

  const maxVal = 600;

  const prospects = [
    { name: "Alex Bennett", segment: "Enterprise", health: "Good", activity: "CRM", renewal: "Follow-up email", initials: "AB", color: "bg-[#E6E6FE] text-[#5E5CE6]", segmentStyle: "bg-[#D0D0D0]/25 text-[#191C1E]" },
    { name: "Sarah Liang", segment: "SMB", health: "Critical", activity: "Imported", renewal: "Follow-up email", initials: "SL", color: "bg-[#D1FAE5] text-[#059669]", segmentStyle: "bg-[#ECFDF5] text-[#059669]" },
    { name: "Sarah Liang", segment: "Enterprise", health: "Good", activity: "Imported", renewal: "Follow-up email", initials: "SL", color: "bg-[#D1FAE5] text-[#059669]", segmentStyle: "bg-[#ECFDF5] text-[#059669]" },
    { name: "Julian Rossi", segment: "SMB", health: "Good", activity: "Scraped", renewal: "Follow-up email", initials: "JR", color: "bg-[#F3F4F6] text-[#374151]", segmentStyle: "bg-[#F1F5F9] text-[#059669]" },
    { name: "Julian Rossi", segment: "Enterprise", health: "Good", activity: "Scraped", renewal: "Follow-up email", initials: "JR", color: "bg-[#F3F4F6] text-[#374151]", segmentStyle: "bg-[#ECFDF5] text-[#059669]" }
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 pb-10">
      {/* Header Section */}
     <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <h1 className="text-[#191C1E] font-extrabold text-[24px] sm:text-[34px] leading-tight font-manrope">Outbound Dashboard</h1>
          <p className="text-[#767676] text-[12px] font-normal leading-none font-inter mt-1.5">Track Your Outreach Performance And Pipeline Generation</p>
        </div>
        <SalesToggleSwitch />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-[24px] p-5 sm:p-6 border border-[#F1F5F9] flex flex-col justify-between h-[160px] sm:h-[180px]">
            <div className="flex justify-between items-start">
              <div className={`w-[36px] h-[36px] rounded-[12px] flex items-center justify-center ${stat.iconBg}`}>
                {stat.icon}
              </div>
              <div className={`px-2.5 py-1 rounded-full text-[12px] font-semibold font-manrope leading-[16px] ${stat.isPositive ? 'bg-[#EBF7F5] text-[#006A6A]' : 'bg-[#FFF0F0] text-[#D93025]'}`}>
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[#464554] uppercase font-manrope font-semibold text-[12px] leading-[16px] tracking-[0.6px] mb-1">
                {stat.label}
              </h3>
              <div className="text-[#171C1F] text-[24px] font-extrabold leading-[32px] font-manrope">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Health & Engagement Bar Chart */}
      <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-[#F1F5F9]">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-[#171C1F] text-[18px] sm:text-[20px] font-extrabold leading-[28px] font-manrope">Customer Health & Engagement</h2>
            <p className="text-[#64748B] text-[13px] sm:text-[14px] font-inter">Trends across key engagement signals</p>
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-[#F1F5F9] rounded-lg text-[13px] sm:text-[14px] font-manrope font-medium leading-[20px] text-[#191C1E] border border-transparent hover:border-[#E2E8F0] transition-all min-w-[160px] justify-between cursor-pointer"
            >
              {selectedCategory}
              <ChevronDown size={14} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-full min-w-[180px] bg-white rounded-xl shadow-xl border border-[#F1F5F9] z-[100] py-2 animate-in fade-in zoom-in duration-200">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-[13px] sm:text-[14px] font-manrope font-medium transition-colors hover:bg-[#F8FAFC] ${selectedCategory === cat ? 'text-[#004370] bg-[#F0F7FF]' : 'text-[#464554]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-hide">
          <div className="relative h-[340px] min-w-[600px] sm:min-w-0 w-full flex flex-col justify-start px-4">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 flex flex-col justify-between text-[11px] text-[#94A3B8] font-bold h-[260px] pr-4">
              <span>600</span>
              <span>450</span>
              <span>300</span>
              <span>150</span>
              <span>0</span>
            </div>

            {/* Grid lines */}
            <div className="absolute left-[30px] right-0 top-0 h-[260px] flex flex-col justify-between pointer-events-none z-0">
              <div className="w-full h-px bg-[#F1F5F9]"></div>
              <div className="w-full h-px bg-[#F1F5F9]"></div>
              <div className="w-full h-px bg-[#F1F5F9]"></div>
              <div className="w-full h-px bg-[#F1F5F9]"></div>
              <div className="w-full h-[2px] bg-[#E2E8F0]"></div>
            </div>

            {/* Bars and Labels */}
            <div className="absolute left-[30px] right-0 top-0 h-[320px] flex justify-around items-start z-10">
              {chartData.map((data, i) => (
                <div key={i} className="flex flex-col items-center h-full flex-1">
                  {/* Bars Area */}
                  <div className="flex items-end gap-1 group/bars h-[260px]">
                    <div
                      className="w-[24px] bg-[#004370] rounded-t-[6px] transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.usage / maxVal) * 100}%` }}
                      title={`Product Usage: ${data.usage}`}
                    ></div>
                    <div
                      className="w-[24px] bg-[#0E9F6E] rounded-t-[6px] transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.adoption / maxVal) * 100}%` }}
                      title={`Feature Adoption: ${data.adoption}`}
                    ></div>
                    <div
                      className="w-[24px] bg-[#BC8800] rounded-t-[6px] transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.tickets / maxVal) * 100}%` }}
                      title={`Support Tickets: ${data.tickets}`}
                    ></div>
                    <div
                      className="w-[24px] bg-[#FFB385] rounded-t-[6px] transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.renewals / maxVal) * 100}%` }}
                      title={`Renewals: ${data.renewals}`}
                    ></div>
                  </div>
                  {/* Label Area (Below Axis) */}
                  <span className="text-[11px] text-[#464554] font-manrope font-semibold leading-[16.5px] whitespace-nowrap mt-4">{data.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#004370]"></div>
            <span className="text-[12px] font-manrope font-semibold leading-none text-[#004370]">Product Usage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0E9F6E]"></div>
            <span className="text-[12px] font-manrope font-semibold leading-none text-[#0E9F6E]">Feature Adoption</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#BC8800]"></div>
            <span className="text-[12px] font-manrope font-semibold leading-none text-[#B68E00]">Support Tickets</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFB781]"></div>
            <span className="text-[12px] font-manrope font-semibold leading-none text-[#FFB385]">Renewals</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Account Health Table */}
        <div className="xl:col-span-8 bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-[#F1F5F9]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-[#171C1F] text-[20px] font-extrabold font-manrope leading-[28px]">Account Health</h2>
              <p className="text-[#464554] text-[14px] font-manrope font-normal leading-[20px]">Monitor accounts that need attention</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-manrope font-semibold text-[#464554] uppercase tracking-[1px] leading-none border-b border-[#F1F5F9]">
                  <th className="pb-4 px-8">CUSTOMER</th>
                  <th className="pb-4 px-8">SEGMENT</th>
                  <th className="pb-4 px-8">HEALTH</th>
                  <th className="pb-4 px-8">LAST ACTIVITY</th>
                  <th className="pb-4 px-8">RENEWAL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {prospects.map((prospect, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold ${prospect.color}`}>
                          {prospect.initials}
                        </div>
                        <span className="text-[#191C1E] font-manrope font-semibold text-[14px]">{prospect.name}</span>
                      </div>
                    </td>
                    <td className="py-5 px-8">
                      <span className={`h-[20px] px-[8px] rounded-[9px] text-[10px] font-bold flex items-center justify-center w-fit ${prospect.segmentStyle}`}>
                        {prospect.segment}
                      </span>
                    </td>
                    <td className="py-5 px-8">
                      <span className={`h-[20px] px-[8px] rounded-[9px] text-[10px] font-bold flex items-center justify-center w-fit ${prospect.health === 'Good' ? 'bg-[#EBF7F5] text-[#188573]' :
                        prospect.health === 'Critical' ? 'bg-[#FFF0F0] text-[#D93025]' :
                          'bg-[#F1F5F9] text-[#64748B]'
                        }`}>
                        {prospect.health}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-[#171C1F] font-manrope font-normal text-[12px] leading-[16px]">{prospect.activity}</td>
                    <td className="py-5 px-8 text-[#171C1F] font-manrope font-normal text-[12px] leading-[16px]">{prospect.renewal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Side */}
        <div className="xl:col-span-4">
          <LiveActivityV2 />
        </div>
      </div>

      {/* Support & Engagement and Revenue Expansion */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-4">
        <SupportCard />
        <RevenueCard />
      </div>

      {/* Channel Management Section */}
      <div className="mt-8">
        <h3 className="text-[#464554] uppercase font-manrope font-medium text-[14px] leading-[20px] tracking-[1.4px] mb-6">
          CHANNEL MANAGEMENT
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Email Marketing Card */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#F1F5F9] flex items-center gap-4 sm:gap-6">
            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] sm:rounded-[12px] bg-[#F0F4FF] flex items-center justify-center text-[#004370] shrink-0">
              <Mail width={22} height={18} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[#171C1F] font-manrope font-medium text-[14px] leading-[24px] mb-3">Email Marketing</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Sent</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">8,204</p>
                </div>
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Engagement</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">18.2%</p>
                </div>
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Conv.</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">4.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* WhatsApp Direct Card */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#F1F5F9] flex items-center gap-4 sm:gap-6">
            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] sm:rounded-[12px] bg-[#EBF7F5] flex items-center justify-center text-[#006A6A] shrink-0">
              <MessageSquare width={20} height={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[#171C1F] font-manrope font-medium text-[14px] leading-[24px] mb-3">WhatsApp Direct</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Sent</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">8,204</p>
                </div>
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Engagement</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">18.2%</p>
                </div>
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Conv.</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">4.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calls Card */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#F1F5F9] flex items-center gap-4 sm:gap-6">
            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] sm:rounded-[12px] bg-[#F6810C]/10 flex items-center justify-center text-[#703800] shrink-0">
              <Phone width={20} height={20} strokeWidth={2.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-[#171C1F] font-manrope font-medium text-[14px] leading-[24px] mb-3">Calls</h4>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Sent</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">8,204</p>
                </div>
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Engagement</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">18.2%</p>
                </div>
                <div>
                  <p className="text-[10px] font-manrope font-normal leading-[15px] text-[#464554] mb-1">Conv.</p>
                  <p className="text-[12px] font-manrope font-medium leading-[20px] text-[#171C1F]">4.2%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FloatingButton />
      </div>
    </div>
  );
};

const LiveActivityV2 = () => {
  const activities = [
    {
      type: "Feature usage spike",
      user: "Acme Corp — Workflows +42%",
      content: "",
      time: "2m ago",
      color: "bg-[#5E5CE6]"
    },
    {
      type: "New support ticket",
      user: "Northwind Labs — P2 priority",
      content: "",
      time: "2m ago",
      color: "bg-[#FF9500]"
    },
    {
      type: "CSAT feedback received",
      user: "Globex Inc. rated 9/10",
      content: "",
      time: "2h ago",
      color: "bg-[#34C759]"
    },
    {
      type: "Renewal reminder",
      user: "Initech — 14 days remaining",
      content: "",
      time: "5h ago",
      color: "bg-[#004370]"
    },
    {
      type: "Onboarding completed",
      user: "Umbrella Group — full setup",
      content: "",
      time: "6h ago",
      color: "bg-[#34C759]"
    },
    {
      type: "Escalation flagged",
      user: "Hooli — billing dispute",
      content: "",
      time: "2m ago",
      color: "bg-[#FF9500]"
    }
  ];

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-[#F1F5F9] h-full">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[#191C1E] text-[18px] sm:text-[20px] font-bold font-manrope">Live Activity</h2>
        <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse"></div>
      </div>

      <div className="space-y-8 relative">
        <div className="absolute left-[3px] top-2 bottom-0 w-px bg-[#F1F5F9]"></div>

        {activities.map((act, i) => (
          <div key={i} className="relative pl-6">
            <div className={`absolute left-[-4.5px] top-1.5 w-4 h-4 rounded-full ${act.color} z-10 border-white border-[4px]`}></div>
            <div className="flex justify-between items-start mb-1">
              <span className={`text-[12px] font-manrope font-semibold leading-[16px] text-[#464554]`}>{act.type}</span>
              <span className="text-[10px] text-[#94A3B8] font-medium">{act.time}</span>
            </div>
            <p className="text-[14px] text-[#171C1F] leading-[20px] font-inter font-normal">
              <span className="text-[#64748B] text-[13px]">{act.user}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OutboundDashboard;
