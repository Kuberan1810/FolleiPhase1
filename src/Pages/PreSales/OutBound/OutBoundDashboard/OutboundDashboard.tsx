
import { Send, MessageSquare, Smile, Plus, Mail, ChevronDown, Phone, CalendarCheck } from 'lucide-react';
import FloatingButton from '../../../../Component/FloatingButton';

import SalesToggleSwitch from '../../../../Component/SalesToggleSwitch';

const OutboundDashboard = () => {
  const stats = [
    {
      label: "TOTAL OUTREACH",
      value: "24,402",
      change: "+12.5%",
      isPositive: true,
      icon: <Send size={17} />,
      iconBg: "bg-[#F0F4FF] text-[#5E5CE6]"
    },
    {
      label: "REPLY RATE",
      value: "4.82%",
      change: "+2.1%",
      isPositive: true,
      icon: <MessageSquare size={17} />,
      iconBg: "bg-[#FFF9F0] text-[#FF9500]"
    },
    {
      label: "MEETINGS BOOKED",
      value: "112",
      change: "+8.4%",
      isPositive: true,
      icon: <CalendarCheck size={17} />,
      iconBg: "bg-[#EBF7F5] text-[#006A6A]"
    },
    {
      label: "POSITIVE INTENT",
      value: "21.4%",
      change: "-0.4%",
      isPositive: false,
      icon: <Smile size={17} />,
      iconBg: "bg-[#E7EFF7] text-[#004370]"
    }
  ];

  const chartData = [
    { name: "Q1 Launch", sent: 490, replied: 405, opened: 195, booked: 75 },
    { name: "Product Demo", sent: 435, replied: 315, opened: 135, booked: 45 },
    { name: "Referral Intro", sent: 525, replied: 465, opened: 285, booked: 165 },
    { name: "Cold Outreach", sent: 315, replied: 225, opened: 75, booked: 30 },
    { name: "Webinar Follow", sent: 405, replied: 285, opened: 105, booked: 35 }
  ];

  const maxVal = 600;

  const prospects = [
    { name: "Alex Bennett", persona: "TechFlow", source: "CRM", status: "Cold", action: "Follow-up email", initials: "AB", color: "bg-[#E6E6FE] text-[#5E5CE6]" },
    { name: "Sarah Liang", persona: "Growth", source: "Imported", status: "Replied", action: "Follow-up email", initials: "SL", color: "bg-[#D1FAE5] text-[#059669]" },
    { name: "Sarah Liang", persona: "Growth", source: "Imported", status: "Replied", action: "Follow-up email", initials: "SL", color: "bg-[#D1FAE5] text-[#059669]" },
    { name: "Julian Rossi", persona: "Sales", source: "Scraped", status: "Converted", action: "Follow-up email", initials: "JR", color: "bg-[#F3F4F6] text-[#374151]" }
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
              <h3 className="text-[#64748B] uppercase font-manrope font-semibold text-[12px] leading-[16px] tracking-[0.6px] mb-1">
                {stat.label}
              </h3>
              <div className="text-[#171C1F] text-[24px] font-extrabold leading-[32px] font-manrope">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Performance Bar Chart */}
      <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-[#F1F5F9]">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 sm:mb-10">
          <div>
            <h2 className="text-[#171C1F] text-[18px] sm:text-[20px] font-extrabold leading-[28px] font-manrope">Campaign Performance</h2>
            <p className="text-[#64748B] text-[13px] sm:text-[14px] font-inter">Metric comparison across active funnels</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#F1F5F9] rounded-lg text-[13px] sm:text-[14px] font-manrope font-medium leading-[20px] text-[#191C1E] border border-transparent hover:border-[#E2E8F0] transition-all">
            All Campaign <ChevronDown size={14} />
          </button>
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
                      style={{ height: `${(data.sent / maxVal) * 100}%` }}
                      title={`Sent: ${data.sent}`}
                    ></div>
                    <div
                      className="w-[24px] bg-[#13A26D] rounded-t-[6px] transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.replied / maxVal) * 100}%` }}
                      title={`Replied: ${data.replied}`}
                    ></div>
                    <div
                      className="w-[24px] bg-[#B68E00] rounded-t-[6px] transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.opened / maxVal) * 100}%` }}
                      title={`Opened: ${data.opened}`}
                    ></div>
                    <div
                      className="w-[24px] bg-[#FFB385] rounded-t-[6px] transition-all duration-300 hover:opacity-80 cursor-pointer"
                      style={{ height: `${(data.booked / maxVal) * 100}%` }}
                      title={`Booked: ${data.booked}`}
                    ></div>
                  </div>
                  {/* Label Area (Below Axis) */}
                  <span className="text-[11px] text-[#464554] font-manrope font-semibold leading-[16.5px] whitespace-nowrap mt-4">{data.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-8">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#004370]"></div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#004370]">Sent</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#13A26D]"></div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#13A26D]">Replied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#B68E00]"></div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#B68E00]">Opened</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFB385]"></div>
            <span className="text-[10px] sm:text-[11px] font-bold text-[#FFB385]">Booked</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Target Prospects Table */}
        <div className="xl:col-span-8 bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-[#F1F5F9]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h2 className="text-[#191C1E] text-[18px] sm:text-[20px] font-bold font-manrope">Target Prospects</h2>
            <button className="w-full sm:w-auto bg-[#004370] text-white px-[20px] py-[10px] rounded-[4px] flex items-center justify-center gap-[8px] text-[13px] sm:text-[14px] font-bold font-manrope leading-[20px] hover:opacity-90 transition-all cursor-pointer">
              <Plus size={16} strokeWidth={3} />
              Add Prospect
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider border-b border-[#F1F5F9]">
                  <th className="pb-4 px-8 font-bold">Name</th>
                  <th className="pb-4 px-8 font-bold">Persona</th>
                  <th className="pb-4 px-8 font-bold">Source</th>
                  <th className="pb-4 px-8 font-bold">Status</th>
                  <th className="pb-4 px-8 font-bold">Next Action</th>
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
                    <td className="py-5 px-8 text-[#464554] font-manrope font-normal text-[14px] leading-[20px]">{prospect.persona}</td>
                    <td className="py-5 px-8 text-[#464554] font-manrope font-normal text-[14px] leading-[20px]">{prospect.source}</td>
                    <td className="py-5 px-8">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${prospect.status === 'Converted' ? 'bg-[#EBF7F5] text-[#188573]' :
                        prospect.status === 'Replied' ? 'bg-[#F0FFF4] text-[#34C759]' :
                          'bg-[#F1F5F9] text-[#64748B]'
                        }`}>
                        {prospect.status}
                      </span>
                    </td>
                    <td className="py-5 px-8 text-[#464554] font-manrope font-normal text-[14px] leading-[20px]">{prospect.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Activity Side */}
        <div className="xl:col-span-4">
          <LiveActivity2 />
        </div>
      </div>

      {/* Channel Breakdown Section */}
      <div className="mt-4">
        <h3 className="text-[#64748B] uppercase font-inter font-bold text-[12px] leading-[16px] tracking-[1.2px] mb-6">
          CHANNEL BREAKDOWN
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {/* Email Marketing Card */}
          <div className="bg-white rounded-[24px] p-6 sm:p-8 border border-[#F1F5F9] flex items-center gap-4 sm:gap-6">
            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] sm:rounded-[12px] bg-[#EFF6FF] flex items-center justify-center text-[#022165] shrink-0">
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
            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] sm:rounded-[12px] bg-[#ECFDF5] flex items-center justify-center text-[#006A6A] shrink-0">
              <MessageSquare width={18} height={18} strokeWidth={2.5} />
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
            <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[10px] sm:rounded-[12px] bg-[#FFF7ED] flex items-center justify-center text-[#703800] shrink-0">
              <Phone width={18} height={18} strokeWidth={2.5} />
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
      </div>
    </div>
  );
};

const LiveActivity2 = () => {
  const activities = [
    {
      type: "Email Opened",
      user: "David Chen",
      content: "opened \"Re: Integration Strategy\"",
      time: "2m ago",
      color: "bg-[#5E5CE6]",
      tag: "Open count: 3"
    },
    {
      type: "New Reply",
      user: "Sarah Liang",
      content: "replied to your follow-up",
      time: "14m ago",
      color: "bg-[#34C759]",
      quote: "\"This looks interesting, would love to see a demo...\""
    },
    {
      type: "Link Clicked",
      user: "Mike Ross",
      content: "clicked on \"Whitepaper: Enterprise Sales\"",
      time: "45m ago",
      color: "bg-[#FF9500]"
    },
    {
      type: "New Reply",
      user: "Julian Rossi",
      content: "replied to your follow-up",
      time: "55m ago",
      color: "bg-[#34C759]"
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
            <div className={`absolute left-0 top-1.5 w-[7px] h-[7px] rounded-full ${act.color} z-10 border-white border-2`}></div>
            <div className="flex justify-between items-start mb-1">
              <span className={`text-[12px] font-manrope font-semibold leading-[16px] ${act.type === 'New Reply' ? 'text-[#34C759]' : 'text-[#464554]'}`}>{act.type}</span>
              <span className="text-[10px] text-[#94A3B8] font-medium">{act.time}</span>
            </div>
            <p className="text-[14px] text-[#171C1F] leading-[20px] font-inter font-normal">
              <span className="font-manrope font-semibold">{act.user}</span> {act.content}
            </p>
            {act.tag && (
              <span className="inline-block mt-2 px-2 py-0.5 bg-[#F1F5F9] text-[#64748B] text-[10px] font-bold rounded-sm">
                {act.tag}
              </span>
            )}
            {act.quote && (
              <div className="mt-3 bg-[#F0FFF4] border border-[#D1FAE5] rounded-lg p-3 text-[12px] text-[#064E3B] font-inter font-normal leading-[16px] italic">
                {act.quote}
              </div>
            )}
          </div>
        ))}
      </div>
      <FloatingButton />
    </div>
  );
};

export default OutboundDashboard;
