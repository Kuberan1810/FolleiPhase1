
import Activecs from "./Section/Activecs";
import LiveActivity from "./LiveActivity";
import FloatingButton from "../../../../Component/FloatingButton";
import { AlertTriangle, CheckIcon } from "lucide-react";
import SalesToggleSwitch from "../../../../Component/SalesToggleSwitch";

const PostSalesDashboard = () => {


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
        <SalesToggleSwitch />
      </div>



      {/* Top Metrics Row */}
      <div className="w-full mb-8">
        {/* Quick Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">

          {/* Card 1: Conversion Rate */}
          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F1F5F9] flex flex-col justify-between h-[210px] w-full">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-[14px] bg-[#EBF4F3] flex items-center justify-center text-[#188573]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
              </div>
              <div className="bg-[#EBF4F3] px-3 py-1.5 rounded-full">
                <span className="text-[#188573] text-[13px] font-bold">+12%</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="uppercase mb-1 font-semibold text-[12px] tracking-widest text-[#64748B] font-inter">
                Incoming Requests
              </h3>
              <div className="text-black text-[34px] font-bold leading-tight tracking-tight mb-4">245</div>

            </div>
          </div>

          {/* Card 2: Response Rate */}
          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F1F5F9] flex flex-col justify-between h-[210px] w-full">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-[14px] bg-[#EEF2F6] flex items-center justify-center text-[#0B3A64]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              </div>
              <div className="bg-[#EEF2F6] px-3 py-1.5 rounded-full">
                <span className="text-[#0B3A64] text-[13px] font-bold">Today</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="uppercase mb-1 font-semibold text-[12px] tracking-widest text-[#64748B] font-inter">
                Tickets Created
              </h3>
              <div className="text-black text-[34px] font-bold leading-tight tracking-tight mb-4">203</div>

            </div>
          </div>

          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F1F5F9] flex flex-col justify-between h-[210px] w-full">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-[14px] bg-[#BA1A1A1A] flex items-center justify-center">
                <AlertTriangle size={24} color="#BA1A1A" strokeWidth={2.5} />
              </div>
              <div className="bg-[#EEF2F6] px-3 py-1.5 rounded-full">
                <span className="text-[#0B3A64] text-[13px] font-bold">+1.8 %</span>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="uppercase mb-1 font-semibold text-[12px] tracking-widest text-[#64748B] font-inter">
                Complaint rate
              </h3>
              <div className="text-black text-[34px] font-bold leading-tight tracking-tight mb-4">4.2%</div>
            </div>
          </div>


          <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-[#F1F5F9] flex flex-col justify-between h-[210px] w-full">
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-[14px] bg-[#006A611A] flex items-center justify-center">
                <CheckIcon size={24} color="#006A61" strokeWidth={3} />
              </div>
            </div>

            <div className="mt-4">
              <h3 className="uppercase mb-1 font-semibold text-[12px] tracking-widest text-[#64748B] font-inter">
                Resolution rate
              </h3>
              <div className="text-black text-[34px] font-bold leading-tight tracking-tight mb-4">94%</div>
            </div>
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

export default PostSalesDashboard;
