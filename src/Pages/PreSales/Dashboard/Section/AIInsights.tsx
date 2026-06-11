import { AlertTriangle, Timer } from "lucide-react";
import starIcon from "../../../../assets/star-icon.svg";
import { useNavigate } from "react-router-dom";

const AIInsights = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate("/dashboard/ai-insights")}
      className="w-full p-[2px] rounded-[22px] h-full cursor-pointer hover:shadow-lg transition-shadow duration-200" 
      style={{ background: 'linear-gradient(135deg, #4F46E5, #EC4899, #F97316)' }}
    >
      <div className="bg-white rounded-[20px] p-3 sm:p-5 h-full">
        <div className="flex items-center gap-2 mb-6">
          <img src={starIcon} alt="AI Insights icon" className="w-5 h-5 shrink-0" />
          <h2 className="font-manrope font-bold text-[15px] sm:text-[18px] text-[#004370]">AI Insights</h2>
        </div>

        <div className="mb-8">
          <div className="font-inter font-bold text-[11px] sm:text-[14px] uppercase tracking-widest text-[#191C1E] mb-4">
            Intent Classification
          </div>
          <div className="border border-[#EFECFF] rounded-[12px] p-3 flex flex-col gap-4">
            <div>
              <div className="flex justify-between mb-1 text-[11px] sm:text-[13px]">
                <span>Interested</span>
                <span className="font-bold text-[#3525CD]">64</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#F1F5F9] mt-1">
                <div className="bg-[#3525CD] h-1.5 rounded-full" style={{ width: '64%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-[11px] sm:text-[13px]">
                <span>Neutral</span>
                <span className="text-[#64748B]">28</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#F1F5F9] mt-1">
                <div className="bg-[#46455566] h-1.5 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1 text-[11px] sm:text-[13px]">
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
          <div className="font-inter font-semibold text-[11px] sm:text-[14px] uppercase tracking-widest text-[#64748B] mb-4">
            Smart Alerts
          </div>
          <div className="space-y-3">
            <div className="bg-[#BA1A1A0D] border border-[#BA1A1A1A] rounded-[14px] p-3 flex items-start gap-3">
              <AlertTriangle className="text-[#BA1A1A] mt-0.5 shrink-0 w-[15px] h-[15px] sm:w-[18px] sm:h-[18px]" />
              <div className="text-[11px] sm:text-[13px] text-[#BA1A1A] font-medium">Drop in reply rate (-12%)</div>
            </div>
            <div className="bg-[#FDE68A26] border border-[#FDE68A] rounded-[14px] p-3 flex items-center gap-3">
              <Timer className="text-[#D97706] mt-0.5 shrink-0 w-[15px] h-[15px] sm:w-[18px] sm:h-[18px]" />
              <div className="text-[11px] sm:text-[13px] text-[#D97706] font-medium">24 Inactive leads detected</div>
            </div>
          </div>
        </div>

        <div>
          <div className="font-inter font-semibold text-[11px] sm:text-[14px] uppercase tracking-widest text-[#191C1E] mb-4">
            Priority Leads
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-[#FBFAFF] rounded-[12px] p-3">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-[#EDE9FE] flex items-center justify-center font-bold text-[#6D28D9] text-[10px] sm:text-[12px]">
                  SJ
                </div>
                <div>
                  <div className="font-inter font-bold text-[12px] sm:text-[14px] text-[#191C1E]">John Doe</div>
                  <div className="text-[10px] sm:text-[12px] text-[#64748B]">Acme Corp</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-0.5 text-[#3525CD]">
                  <span className="font-inter font-extrabold text-[14px] sm:text-[18px]">98</span>
                  <span className="text-[14px] sm:text-[18px] font-bold">↗</span>
                </div>
                <span className="bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA] rounded-[6px] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold flex items-center gap-1">
                  🔥 HOT
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between bg-[#FBFAFF] rounded-[12px] p-3">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-[#FFE4E6] flex items-center justify-center font-bold text-[#BE123C] text-[10px] sm:text-[12px]">
                  MA
                </div>
                <div>
                  <div className="font-inter font-bold text-[12px] sm:text-[14px] text-[#191C1E]">Alice Smith</div>
                  <div className="text-[10px] sm:text-[12px] text-[#64748B]">Globex</div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-0.5">
                  <span className="font-inter font-extrabold text-[14px] sm:text-[18px] text-[#191C1E]">85</span>
                  <span className="text-[14px] sm:text-[18px] font-bold text-[#777587]">→</span>
                </div>
                <span className="bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A] rounded-[6px] px-2 py-0.5 text-[10px] sm:text-[11px] font-bold">
                  WARM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIInsights;
