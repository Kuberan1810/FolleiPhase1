import { useState } from "react";
import { Users, RefreshCw, Send, UserCheck, ChevronDown } from "lucide-react";
import FloatingButton from "../../../../Component/FloatingButton";
import ChannelPerformance from "./ChannelPerformance";
import NeedsAttention from "./NeedsAttention";
import LeadsForm from "./LeadsForm";
import AiActivity from "./AiActivity";
import CrmConnect from "./CrmConnect";
import DataImport from "./DataImport";

const DashboardLayout = () => {
  const [selectedMonth, setSelectedMonth] = useState("Month");
  const [showDropdown, setShowDropdown] = useState(false);

  // Stats Grid data
  const stats = [
    {
      title: "Total leads",
      value: "1,284",
      change: "12% vs yesterday",
      trend: "up",
      icon: Users,
    },
    {
      title: "Replied",
      value: "312",
      change: "37% reply rate",
      trend: "up",
      icon: RefreshCw,
    },
    {
      title: "Followed up",
      value: "847",
      change: "66% rate",
      trend: "up",
      icon: Send,
    },
    {
      title: "Converted",
      value: "58",
      change: "4% vs last week",
      trend: "down",
      icon: UserCheck,
    },
  ];

  // Overview columns heights matching Figma specs (Apr is 200px, June is 240px)
  const overviewColumns = [
    { label: "Mar", height: 110, tooltip: "55 customers" },
    { label: "Apl", height: 200, tooltip: "100 customers" },
    { label: "May", height: 140, tooltip: "70 customers" },
    { label: "Jun", height: 240, tooltip: "120 customers" },
    { label: "Jul", height: 120, tooltip: "60 customers" },
    { label: "Oct", height: 200, tooltip: "100 customers" },
  ];

  const generateWavePath = (columns: { height: number }[], yOffset: number = 0) => {
    const width = 524;
    const height = 240;
    const points = columns.map((col, i) => {
      const spacing = (width - 61) / (columns.length - 1);
      return {
        x: 30.5 + i * spacing,
        y: height - col.height + yOffset
      };
    });

    const firstPoint = { x: 0, y: points[0].y + 10 };
    const lastPoint = { x: width, y: points[points.length - 1].y + 10 };

    const allPoints = [firstPoint, ...points, lastPoint];

    let path = `M ${allPoints[0].x} ${allPoints[0].y}`;
    for (let i = 0; i < allPoints.length - 1; i++) {
      const p0 = allPoints[i];
      const p1 = allPoints[i + 1];
      const cpX = (p1.x - p0.x) * 0.4;
      path += ` C ${p0.x + cpX} ${p0.y}, ${p1.x - cpX} ${p1.y}, ${p1.x} ${p1.y}`;
    }
    path += ` L ${width} ${height} L 0 ${height} Z`;
    return path;
  };

  return (
    <div className="space-y-6 w-full pb-16 font-urbanist">

      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

        {/* 1. Overview Chart Card */}
        <div
          className="col-span-12 lg:col-span-8 xl:col-span-5 rounded-[20px] p-5 relative overflow-hidden flex flex-col justify-between w-full h-full"
          style={{
            background: 'linear-gradient(180deg, #B4CCFF 0%, #8EB0EF 100%)',
            boxShadow: '0px 4px 4px 0px #E5ECFB'
          }}
        >
          {/* SVG mountain background layer */}
          <svg className="absolute bottom-[48px] left-0 w-full h-[240px] z-0 pointer-events-none" viewBox="0 0 524 240" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mountainGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#014370" />
                <stop offset="100%" stopColor="#A0BEFF" />
              </linearGradient>
            </defs>
            <path d={generateWavePath(overviewColumns, 15)} fill="#014370" opacity="0.25" style={{ transition: 'd 0.5s ease-in-out' }} />
            <path d={generateWavePath(overviewColumns, 0)} fill="url(#mountainGrad)" style={{ transition: 'd 0.5s ease-in-out' }} />
          </svg>

          {/* Dashed threshold line */}
          <svg className="absolute left-6 right-6 bottom-[48px] h-[2px] z-0 pointer-events-none" style={{ width: 'calc(100% - 48px)' }}>
            <line x1="0" y1="1" x2="100%" y2="1" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="5,5" />
          </svg>

          {/* Card Header */}
          <div className="flex items-center justify-between relative z-20">
            <span className="bg-white text-slate-800 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/30">
              Overview
            </span>
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-white hover:bg-slate-50 transition-colors text-slate-800 rounded-full px-3.5 py-1.5 text-xs font-semibold flex items-center gap-1 cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100/30"
              >
                {selectedMonth} <ChevronDown size={14} />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-1.5 w-28 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-30 text-xs text-slate-700">
                  {["Month", "Week", "Day"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSelectedMonth(item);
                        setShowDropdown(false);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-50 transition-colors font-medium cursor-pointer"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Capsule Chart Area */}
          <div className="relative z-10 flex flex-col justify-end h-[240px] mb-8">
            <div className="flex justify-between items-end px-1" style={{ height: '240px' }}>
              {overviewColumns.map((col, idx) => (
                <div key={idx} className="relative flex flex-col items-center justify-end h-full group" style={{ width: "61px" }}>
                  {col.tooltip && (
                    <div
                      className="absolute left-1/2 -translate-x-1/2 bg-white text-slate-800 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md flex-col items-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none flex"
                      style={{ bottom: `${col.height + 12}px` }}
                    >
                      <span className="whitespace-nowrap">{col.tooltip}</span>
                      <div className="w-2 h-2 bg-white rotate-45 -mt-1" />
                    </div>
                  )}
                  <div
                    className="w-[61px] rounded-t-[10px] rounded-b-none shadow-sm cursor-pointer"
                    style={{
                      height: `${col.height}px`,
                      background: 'linear-gradient(180deg, #FFFFFF 0%, #8EB0EF 100%)'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Month Labels aligned pixel-perfectly below the bars */}
          <div className="absolute bottom-4 left-0 right-0 px-6 flex justify-between items-center z-10">
            {overviewColumns.map((col, idx) => (
              <span key={idx} className="w-[61px] text-center text-[13px] font-bold text-white tracking-wide">
                {col.label}
              </span>
            ))}
          </div>

        </div>

        {/* 2. Stats Grid - formatted to match Figma layout and specs */}
        <div className="col-span-12 lg:col-span-4 xl:col-span-4 grid grid-cols-2 grid-rows-2 gap-x-5 gap-y-8 pt-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[20px] pt-7 pb-3 px-3 border border-[#EDF3FD] relative flex flex-col justify-between items-center w-full max-w-[173.5px] h-full cursor-pointer"
              style={{
                boxShadow: '0px 4px 4px 0px rgba(237, 243, 253, 0.3)'
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white border border-[#EDF3FD] flex items-center justify-center z-10"
                style={{
                  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                }}
              >
                <item.icon size={20} className="text-[#014370] stroke-[2.5]" fill="#014370" />
              </div>

              <div className="text-center flex flex-col items-center justify-center mt-1.5 flex-1">
                <p className="text-[16px] font-semibold text-[#6E6E6E]">{item.title}</p>
                <h3
                  className="text-[36px] font-bold text-[#6693B1] font-urbanist leading-none mt-1"
                  style={{ fontWeight: 700 }}
                >
                  {item.value}
                </h3>
              </div>

              <div
                className="flex items-center gap-1 text-[16px] font-light font-urbanist"
                style={{
                  fontWeight: 300,
                  color: item.trend === "up" ? "#008900" : "#D60509"
                }}
              >
                <span>{item.trend === "up" ? "↑" : "↓"}</span>
                <span>{item.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Channel Performance Card */}
        <ChannelPerformance />

      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

        {/* 4. Needs Attention Now Table Card */}
        <NeedsAttention />

        {/* 5. Leads From Polar Area Card */}
        <LeadsForm />

      </div>

      {/* AI Activity, CRM Connect, Data Import Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <AiActivity />
        <CrmConnect />
        <DataImport />
      </div>

      <FloatingButton />
    </div>
  );
};

export default DashboardLayout;