import React from "react";

const LeadsForm: React.FC = () => {
  return (
    <div className="lg:col-span-5 rounded-[10px] p-5 bg-white border border-[#EDF3FD] relative font-urbanist w-full overflow-hidden">
      <div>
        <h3 className="text-[20px] font-bold text-[#000000] leading-[1.2] tracking-[0.6px]">Leads from</h3>
      </div>
      
      {/* SVG Polar-Area Donut Chart centered dynamically */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[54px]">
        <svg width="293" height="293" viewBox="0 0 200 200" className="drop-shadow-sm">
          {/* Sector 1: Meta Adds (Dark Blue, Radius 100) - spans 135 to 360 deg */}
          <path
            d="M 100 100 L 29.3 170.7 A 100 100 0 1 1 200 100 Z"
            fill="#0E4C77"
            className="cursor-pointer"
          />
          {/* Sector 2: Website Form (Medium Blue, Radius 81) - spans 0 to 45 deg */}
          <path
            d="M 100 100 L 181 100 A 81 81 0 0 1 157.3 157.3 Z"
            fill="#34698D"
            className="cursor-pointer"
          />
          {/* Sector 3: CRM (Slate Blue, Radius 70) - spans 45 to 90 deg */}
          <path
            d="M 100 100 L 149.5 149.5 A 70 70 0 0 1 100 170 Z"
            fill="#678EA9"
            className="cursor-pointer"
          />
          {/* Sector 4: Manual Import (Light Blue, Radius 62) - spans 90 to 135 deg */}
          <path
            d="M 100 100 L 100 162 A 62 62 0 0 1 56.2 143.8 Z"
            fill="#99B4C6"
            className="cursor-pointer"
          />
          {/* Center Donut Hole */}
          <circle cx="100" cy="100" r="18" fill="white" />
        </svg>
      </div>
      
      {/* Legend Grid positioned at the bottom */}
      <div className="absolute bottom-4 left-5 right-5 flex flex-wrap justify-center items-center gap-x-[32px] gap-y-2">
        <div className="flex items-center gap-2 text-[16px] font-normal text-black leading-[1.2] tracking-[0.6px] align-middle">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#0E4C77] shrink-0" />
          <span>Meta Adds</span>
        </div>
        <div className="flex items-center gap-2 text-[16px] font-normal text-black leading-[1.2] tracking-[0.6px] align-middle">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#34698D] shrink-0" />
          <span>Website Form</span>
        </div>
        <div className="flex items-center gap-2 text-[16px] font-normal text-black leading-[1.2] tracking-[0.6px] align-middle">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#678EA9] shrink-0" />
          <span>CRM</span>
        </div>
        <div className="flex items-center gap-2 text-[16px] font-normal text-black leading-[1.2] tracking-[0.6px] align-middle">
          <span className="w-3.5 h-3.5 rounded-xs bg-[#99B4C6] shrink-0" />
          <span>Manual Import</span>
        </div>
      </div>
    </div>
  );
};

export default LeadsForm;
