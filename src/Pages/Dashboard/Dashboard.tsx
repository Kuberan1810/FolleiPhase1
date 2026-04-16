
import Activecs from "./Section/Activecs";
import LiveActivity from "./LiveActivity";

const Dashboard = () => {
  const chartData = [
    { color: '#0B3A64', height: 35.3 },
    { color: '#188573', height: 50.97 },
    { color: '#FFB57A', height: 55.42 },
    { color: '#0B3A64', height: 71.39 },
    { color: '#188573', height: 30.23 },
    { color: '#FFB57A', height: 90.42 },
  ];

  const maxHeight = Math.max(...chartData.map(b => b.height));

  return (
    <>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
        <div>
          <p
            className="text-[#0B3A64] text-[10px] sm:text-[11px] uppercase tracking-wider mb-1.5 sm:mb-2"
            style={{ fontFamily: 'Inter', fontWeight: 700 }}
          >
            INTELLIGENCE HUB
          </p>
          <h1 className="text-[30px] leading-none font-extrabold text-[#0C4A6E]">Dashboard</h1>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#0C4A6E] text-white rounded-lg text-[13px] sm:text-[14px] font-semibold hover:bg-[#092e4f] transition-colors cursor-pointer flex items-center justify-center px-4">
            Pre Sales
          </button>
          <button className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#0C4A6E] text-white rounded-lg text-[13px] sm:text-[14px] font-semibold hover:bg-[#092e4f] transition-colors cursor-pointer flex items-center justify-center px-4">
            Post Sales
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-3">
        <button className="h-[38px] sm:h-[44px] px-5 bg-[#014370] text-white rounded-full text-[13px] sm:text-[14px] font-semibold hover:bg-[#013254] transition-colors cursor-pointer flex items-center justify-center">
          In Bound
        </button>
        <button
          className="h-[38px] sm:h-[44px] px-5 bg-[#E5ECF1] text-gray-800 rounded-full text-[13px] sm:text-[14px] font-semibold border border-gray-200/50 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center"
          style={{ boxShadow: 'inset 0 3px 4px 0 rgba(0, 0, 0, 0.25)' }}
        >
          Out Bound
        </button>
      </div>

      {/* Top Metrics Row */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        {/* Card 1: Combined Metrics Card */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F1F5F9] w-[468px] h-[206px] flex items-center justify-between gap-8 shrink-0">
          <div className="flex-1 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="w-[42px] h-[42px] rounded-xl bg-[#F0FAF8] flex items-center justify-center text-[#188573]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
              <div className="bg-[#F0FAF8] px-2.5 py-1 rounded-full">
                <span className="text-[#188573] text-[12px] font-bold">+12.4%</span>
              </div>
            </div>
            <div className="mt-auto">
              <h3 className="uppercase mb-1" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', color: '#94A3B8' }}>
                Conversion Rate
              </h3>
              <div className="text-[#0C4A6E] text-[34px] font-bold font-['Inter'] leading-tight tracking-tight mb-3">24.8%</div>
              <div className="h-1 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-[#188573] w-[45%] rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="w-px h-[80%] bg-[#F1F5F9]" />
          <div className="flex-1 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div className="w-[42px] h-[42px] rounded-xl bg-[#F0F7FF] flex items-center justify-center text-[#0C4A6E]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div className="bg-[#F0F7FF] px-3 py-1 rounded-full flex items-center justify-center text-[#0C4A6E] text-[12px] font-bold">Optimal</div>
            </div>
            <div className="mt-auto">
              <h3 className="uppercase mb-1" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '11px', letterSpacing: '0.08em', color: '#94A3B8' }}>
                Response Rate
              </h3>
              <div className="text-[#0C4A6E] text-[34px] font-bold font-['Inter'] leading-tight tracking-tight mb-3">92.1%</div>
              <div className="h-1 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-[#0C4A6E] w-[85%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2: Communication Volume */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-[#F1F5F9] w-[486px] h-[206px] flex flex-col shrink-0 ml-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '11px', lineHeight: '16px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', margin: 0 }}>
              Communication Volume
            </h3>
            <div className="flex items-center flex-wrap gap-[8px]">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#0B3A64]"></div>
                <span className="text-[10px] text-[#A6AEB8] font-medium font-['Inter'] uppercase tracking-wider">Email</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#188573]"></div>
                <span className="text-[10px] text-[#A6AEB8] font-medium font-['Inter'] uppercase tracking-wider">WhatsApp</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFB57A]"></div>
                <span className="text-[10px] text-[#A6AEB8] font-medium font-['Inter'] uppercase tracking-wider">Calls</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-[12px] pb-1">
            {chartData.map((bar, i) => {
              const heightPct = (bar.height / maxHeight) * 100;
              return (
                <div
                  key={i}
                  style={{ flex: 1, height: `${heightPct}%`, backgroundColor: bar.color, borderRadius: '3px 3px 0 0', flexShrink: 0 }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Data Row */}
      <div className="flex flex-col xl:flex-row gap-5 sm:gap-6 lg:gap-[32px] w-full">
        <Activecs />
        <div className="w-full xl:w-auto xl:flex-1 flex justify-end">
          <LiveActivity />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
