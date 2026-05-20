import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface HandleItem {
  id: string;
  name: string;
  type: string;
}

const HandlesSection: React.FC = () => {
  const [adminHandles] = useState<HandleItem[]>([
    { id: "1", name: "Raleni", type: "Enquiry" },
    { id: "2", name: "Venilax", type: "Enquiry" },
    { id: "3", name: "roxaze", type: "Enquiry" },
    { id: "4", name: "Kineemay", type: "Enquiry" },
  ]);

  const [expanded, setExpanded] = useState(false);

  const radius = 80;
  const strokeWidth = 16;
  const circumference = Math.PI * radius;
  const percentage = 92;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8 w-full">
      <div className="BoxStyle shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#EEF2F5] flex flex-col items-center justify-between min-h-[400px]">
        <div className="w-full text-left">
          <h3 className="text-[#191C1E] text-[18px] font-extrabold font-manrope">
            Follei Handles
          </h3>
        </div>

        <div className="relative flex flex-col items-center justify-center my-6 select-none w-full">
          <svg className="w-full max-w-[406px] h-auto" viewBox="0 0 200 115">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#DFF2FE"
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
            />
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#23669C"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="butt"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute bottom-[10px] sm:bottom-[15px] flex flex-col items-center justify-center">
            <span className="text-[56px] font-extrabold text-black tracking-tight leading-none font-manrope">
              {percentage}%
            </span>
          </div>
        </div>

        <div className="flex justify-center items-center gap-6 mt-2 w-full text-[16px] font-semibold tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#E0F2FE] shadow-[0_1px_1.8px_rgba(0,0,0,0.25)] flex-shrink-0"></div>
            <span className="text-[#64748B]">Follei handles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#23669C] shadow-[0_1px_1.8px_rgba(0,0,0,0.25)] flex-shrink-0"></div>
            <span className="text-[#64748B]">Admin handles</span>
          </div>
        </div>
      </div>

      <div className="BoxStyle shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#EEF2F5] flex flex-col justify-between min-h-[400px]">
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[#191C1E] text-[24px] font-semibold">
              Admin Handles
            </h3>
          </div>

          <div className="flex flex-col font-inter">
            {adminHandles.map((handle) => (
              <div
                key={handle.id}
                className="flex items-center justify-between py-4 px-2 border-b border-[#DFDFDF] hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="text-[#5E5353] font-medium text-[20px]">
                  {handle.name}
                </span>

                <span className="text-[#5E5353] text-[20px] font-medium justify-center">
                  {handle.type}
                </span>

                <button
                  className="text-[#23669C] hover:text-[#194E73] text-[20px] font-medium hover:underline cursor-pointer transition-colors"
                >
                  History
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full flex justify-center">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-[#64748B] text-[20px] font-medium cursor-pointer transition-colors"
          >
            view all
            <ChevronDown size={18} className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HandlesSection;
