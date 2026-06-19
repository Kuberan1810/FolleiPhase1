import React from "react";

const ScopeChart: React.FC = () => {
  return (
    <div className="col-span-12 lg:col-span-7 BoxStyle flex flex-col justify-between h-[360px]">
      {/* Legend Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <span className="w-[10px] h-[10px] rounded-full bg-[#428FDC] shrink-0" />
          <span className="text-[14px] font-semibold text-[#6E6E6E] tracking-[0.6px]">Scope</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[10px] h-[10px] rounded-full bg-[#17BB84] shrink-0" />
          <span className="text-[14px] font-semibold text-[#6E6E6E] tracking-[0.6px]">Scope</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-[10px] h-[10px] rounded-full bg-[#F23D3D] shrink-0" />
          <span className="text-[14px] font-semibold text-[#6E6E6E] tracking-[0.6px]">Scope</span>
        </div>
      </div>

      {/* SVG Chart Area */}
      <div className="relative flex-1 w-full min-h-0">
        <svg
          viewBox="0 0 600 200"
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Gradients */}
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#17BB84" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#17BB84" stopOpacity="0.0" />
            </linearGradient>

            {/* Line Drop Shadows */}
            <filter id="shadowGreen" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6.5" floodColor="#17BB84" floodOpacity="0.4" />
            </filter>
            <filter id="shadowBlue" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6.5" floodColor="#428FDC" floodOpacity="0.4" />
            </filter>
            <filter id="shadowRed" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="8" stdDeviation="6.5" floodColor="#F23D3D" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Fills */}
          <path
            d="M 15 185 C 40 195, 70 192, 100 130 C 130 70, 160 20, 190 20 C 230 20, 270 95, 305 95 C 340 95, 375 125, 410 125 C 450 125, 515 20, 585 20 L 585 200 L 15 200 Z"
            fill="url(#greenGrad)"
          />

          {/* Stroke Lines */}
          <path
            d="M 15 185 C 40 195, 70 192, 100 130 C 130 70, 160 20, 190 20 C 230 20, 270 95, 305 95 C 340 95, 375 125, 410 125 C 450 125, 515 20, 585 20"
            fill="none"
            stroke="#17BB84"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#shadowGreen)"
          />
          <path
            d="M 15 185 C 80 185, 100 72.5, 150 72.5 C 200 72.5, 240 87.5, 290 87.5 C 315 87.5, 340 50, 360 20"
            fill="none"
            stroke="#428FDC"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#shadowBlue)"
          />
          <path
            d="M 15 185 C 80 185, 100 155, 150 155 C 200 155, 240 132.5, 290 132.5 C 340 132.5, 395 110, 460 65"
            fill="none"
            stroke="#F23D3D"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#shadowRed)"
          />

          {/* Data Points (Dots with outer ring for green) */}
          {/* Green dots */}
          <circle cx="190" cy="20" r="5" fill="#17BB84" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="410" cy="125" r="5" fill="#17BB84" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="585" cy="20" r="5" fill="#17BB84" stroke="#FFFFFF" strokeWidth="2" />

          {/* Blue end dot (no white border) */}
          <circle cx="360" cy="20" r="5" fill="#428FDC" />

          {/* Red end dot (no white border) */}
          <circle cx="460" cy="65" r="5" fill="#F23D3D" />
        </svg>
      </div>

      {/* X Axis Labels aligned under their respective SVG X-points */}
      <div className="relative z-10 flex justify-between items-center text-[20px] font-medium text-black leading-[1.2] tracking-normal px-2.5 mt-2">
        <span className="w-12 text-center">Nov</span>
        <span className="w-12 text-center">Dec</span>
        <span className="w-12 text-center">Jan</span>
        <span className="w-12 text-center">Feb</span>
        <span className="w-12 text-center">Mar</span>
      </div>
    </div>
  );
};

export default ScopeChart;
