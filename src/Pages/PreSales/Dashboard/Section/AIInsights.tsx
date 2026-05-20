import { Sparkles, AlertTriangle, Timer, TrendingUp } from "lucide-react";

const AIInsights = () => {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)] h-full">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles size={20} className="text-[#004370]" />
        <h2 className="font-manrope font-bold text-[18px] text-[#004370]">AI Insights</h2>
      </div>

      <div className="mb-8">
        <div className="font-inter font-bold text-[11px] uppercase tracking-widest text-[#191C1E] mb-4">
          Intent Classification
        </div>
        <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-[14px] p-4 flex flex-col gap-4">
          <div>
            <div className="flex justify-between mb-1 text-[13px]">
              <span>Interested</span>
              <span className="font-bold text-[#11629D]">64</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#F1F5F9] mt-1">
              <div className="bg-[#11629D] h-1.5 rounded-full" style={{ width: '64%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-[13px]">
              <span>Neutral</span>
              <span className="text-[#64748B]">28</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#F1F5F9] mt-1">
              <div className="bg-[#94A3B8] h-1.5 rounded-full" style={{ width: '28%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1 text-[13px]">
              <span>Not Interested</span>
              <span className="font-bold text-[#BA1A1A]">12</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#F1F5F9] mt-1">
              <div className="bg-[#BA1A1A] h-1.5 rounded-full" style={{ width: '12%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="font-inter text-[11px] uppercase tracking-widest text-[#64748B] mb-4">
          Smart Alerts
        </div>
        <div className="space-y-3">
          <div className="bg-[#FFF7ED] border border-[#FED7AA] rounded-[14px] p-3 flex items-start gap-3">
            <AlertTriangle size={18} className="text-[#D97706] mt-0.5 shrink-0" />
            <div className="text-[13px] text-[#D97706] font-medium">Drop in reply rate (-12%)</div>
          </div>
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[14px] p-3 flex items-center gap-3">
            <Timer size={18} className="text-[#D97706] mt-0.5 shrink-0" />
            <div className="text-[13px] text-[#D97706] font-medium">24 Inactive leads detected</div>
          </div>
        </div>
      </div>

      <div>
        <div className="font-inter font-bold text-[11px] uppercase tracking-widest text-[#191C1E] mb-4">
          Priority Leads
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#EDE9FE] flex items-center justify-center font-bold text-[#6D28D9] text-[12px]">
                SJ
              </div>
              <div>
                <div className="font-manrope font-semibold text-[14px] text-[#191C1E]">John Doe</div>
                <div className="text-[12px] text-[#64748B]">Acme Corp</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#004370] text-[16px]">98</span>
                <TrendingUp size={14} className="text-[#188573]" />
              </div>
              <span className="bg-[#BA1A1A1A] text-[#BA1A1A] rounded-[6px] px-2 py-0.5 text-[11px] font-bold flex items-center gap-1">
                🔥 HOT
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#FFE4E6] flex items-center justify-center font-bold text-[#BE123C] text-[12px]">
                MA
              </div>
              <div>
                <div className="font-manrope font-semibold text-[14px] text-[#191C1E]">Alice Smith</div>
                <div className="text-[12px] text-[#64748B]">Globex</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <span className="font-bold text-[#004370] text-[16px]">85</span>
                <TrendingUp size={14} className="text-[#188573]" />
              </div>
              <span className="bg-[#F59E0B1A] text-[#F59E0B] rounded-[6px] px-2 py-0.5 text-[11px] font-bold">
                WARM
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
