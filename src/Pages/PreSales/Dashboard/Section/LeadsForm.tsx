import React from "react";

const LeadsForm: React.FC = () => {
  return (
    <div className="col-span-1 md:col-span-5 lg:col-span-5 BoxStyle relative w-full overflow-hidden h-[428px]">
      <div>
        <h3 className="text-[20px] font-bold text-[#000000] leading-[1.2] tracking-[0.6px]">Leads from</h3>
      </div>
      
      {/* SVG Polar-Area Donut Chart centered dynamically */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[54px]">
        <svg viewBox="0 0 200 200" className="w-[220px] h-[220px] sm:w-[250px] sm:h-[250px] lg:w-[240px] lg:h-[240px] xl:w-[293px] xl:h-[293px] drop-shadow-sm transition-all">
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
      <div className="absolute bottom-4 left-4 right-4 flex flex-wrap justify-center items-center gap-x-4 xl:gap-x-8 gap-y-1.5">
        <div className="flex items-center gap-1.5 text-xs xl:text-[16px] font-normal text-black leading-[1.2] tracking-[0.6px] align-middle">
          <span className="w-3 h-3 rounded-xs bg-[#0E4C77] shrink-0" />
          <span>Meta Adds</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs xl:text-[16px] font-normal text-black leading-[1.2] tracking-[0.6px] align-middle">
          <span className="w-3 h-3 rounded-xs bg-[#34698D] shrink-0" />
          <span>Website Form</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs xl:text-[16px] font-normal text-black leading-[1.2] tracking-[0.6px] align-middle">
          <span className="w-3 h-3 rounded-xs bg-[#678EA9] shrink-0" />
          <span>CRM</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs xl:text-[16px] font-normal text-black leading-[1.2] tracking-[0.6px] align-middle">
          <span className="w-3 h-3 rounded-xs bg-[#99B4C6] shrink-0" />
          <span>Manual Import</span>
        </div>
      </div>
    </div>
  );
};

export default LeadsForm;
