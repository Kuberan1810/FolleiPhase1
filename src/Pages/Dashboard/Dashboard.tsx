
import Activecs from "./Section/Activecs";
import LiveActivity from "./LiveActivity";
import FloatingButton from "../../Component/FloatingButton";

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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
        <div>
          <p
            className="text-[#004370] uppercase mb-1.5 sm:mb-2"
            style={{ 
              fontFamily: 'Inter', 
              fontWeight: 700, 
              fontSize: '12px', 
              lineHeight: '16px', 
              letterSpacing: '1.2px' 
            }}
          >
            INTELLIGENCE HUB
          </p>
          <h1 className="text-[30px] leading-none font-extrabold text-[#191C1E] font-manrope">Dashboard</h1>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <button className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#014370] text-white rounded-[10px] text-[14px] font-semibold hover:bg-[#013254] transition-colors cursor-pointer flex items-center justify-center px-4">
            Pre Sales
          </button>
          <button 
            className="flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] bg-[#E5ECF1] text-black rounded-[10px] text-[14px] font-semibold border border-gray-200/50 hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center px-4"
            style={{ boxShadow: 'inset 0 3px 4px 0 rgba(0, 0, 0, 0.15)' }}
          >
            Post Sales
          </button>
        </div>
      </div>



      {/* Top Metrics Row */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 mb-8">
        {/* Left Half: Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* Card 1: Conversion Rate */}
          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F1F5F9] flex flex-col justify-between h-[210px] w-full">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-[14px] bg-[#EBF4F3] flex items-center justify-center text-[#188573]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
              <div className="bg-[#EBF4F3] px-3 py-1.5 rounded-full">
                <span className="text-[#188573] text-[13px] font-bold">+12.4%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="uppercase mb-1 font-semibold text-[12px] tracking-widest text-[#64748B] font-inter">
                Conversion Rate
              </h3>
              <div className="text-black text-[34px] font-bold leading-tight tracking-tight mb-4">24.8%</div>
              <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-[#188573] w-[45%] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Response Rate */}
          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F1F5F9] flex flex-col justify-between h-[210px] w-full">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-[14px] bg-[#EEF2F6] flex items-center justify-center text-[#0B3A64]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div className="bg-[#EEF2F6] px-3 py-1.5 rounded-full">
                <span className="text-[#0B3A64] text-[13px] font-bold">Optimal</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="uppercase mb-1 font-semibold text-[12px] tracking-widest text-[#64748B] font-inter">
                Response Rate
              </h3>
              <div className="text-black text-[34px] font-bold leading-tight tracking-tight mb-4">92.1%</div>
              <div className="h-1.5 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                <div className="h-full bg-[#0B3A64] w-[85%] rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Half: Communication Volume */}
        <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F1F5F9] flex flex-col h-[210px] w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-[12px] tracking-widest text-[#64748B] uppercase font-inter">
              Communication Volume
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#0B3A64]"></div>
                <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Email</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#188573]"></div>
                <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">WhatsApp</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#FFB57A]"></div>
                <span className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider">Calls</span>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-end gap-3 px-2">
            {chartData.map((bar, i) => {
              const heightPct = (bar.height / maxHeight) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col justify-end h-full group cursor-pointer">
                  <div className="relative w-full overflow-hidden rounded-t-[4px] rounded-b-[2px]" style={{ height: `${heightPct}%` }}>
                    {/* Ghost top section effect */}
                    <div className="absolute top-0 left-0 w-full h-1/4 opacity-15" style={{ backgroundColor: bar.color }}></div>
                    <div className="w-full h-full" style={{ backgroundColor: bar.color }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Data Row */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 sm:gap-6 lg:gap-[32px] w-full items-start">
        <div className="xl:col-span-8">
          <Activecs />
        </div>
        <div className="xl:col-span-4">
          <LiveActivity />
        </div>
          <FloatingButton />
      </div>
    </>
  );
};

export default Dashboard;
