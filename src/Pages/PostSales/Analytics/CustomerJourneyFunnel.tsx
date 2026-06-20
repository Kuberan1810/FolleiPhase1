import React from 'react';

const CustomerJourneyFunnel: React.FC = () => {
  return (
    <div className="BoxStyle p-6 bg-white border border-[#EDF3FD] rounded-[24px] flex flex-col font-[Inter] h-auto lg:h-[440px]">
      <div className="mb-6">
        <h3 className="tracking-normal font-semibold text-[#1E293B] text-[20px] leading-[20px]">
          Customer Journey Funnel
        </h3>
        <p className="text-[15px] text-slate-400   mt-1.5">
          Track Customer Progression after purchase.
        </p>
      </div>

      {/* Custom SVG Funnel rendering */}
      <div className="w-full flex-1 min-h-0 flex justify-center py-4">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 254"
          preserveAspectRatio="xMidYMid meet"
          className="max-w-[480px] sm:max-w-full"
        >
          {/* Step 1: Purchase Completed */}
          <g className="cursor-pointer group">
            <path
              d="M 0,0 L 530,0 L 477,44 L 53,44 Z"
              fill="#E3DBFD"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="265" y="20" textAnchor="middle" fontSize="13" fontWeight="semibold" fill="#00000">
              Purchase Completed
            </text>
            <text x="265" y="34" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#00000">
              23,240
            </text>
            <text x="560" y="26" fontSize="15" fontWeight="semibold" fill="#0D1C2E">
              89%
            </text>
          </g>

          {/* Step 2: Order Delivered */}
          <g className="cursor-pointer group">
            <path
              d="M 53,48 L 477,48 L 424,92 L 106,92 Z"
              fill="#BFA6F9"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="265" y="68" textAnchor="middle" fontSize="13" fontWeight="semibold" fill="#00000">
              Order Delivered
            </text>
            <text x="265" y="82" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#00000">
              10,240
            </text>
            <text x="560" y="74" fontSize="15" fontWeight="semibold" fill="#0D1C2E">
              82%
            </text>
          </g>

          {/* Step 3: Product Used */}
          <g className="cursor-pointer group">
            <path
              d="M 106,96 L 424,96 L 371,140 L 159,140 Z"
              fill="#6B94F8"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="265" y="116" textAnchor="middle" fontSize="13" fontWeight="semibold" fill="#00000">
              Product Used
            </text>
            <text x="265" y="130" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#00000">
              5,240
            </text>
            <text x="560" y="122" fontSize="15" fontWeight="semibold" fill="#0D1C2E">
              71%
            </text>
          </g>

          {/* Step 4: Repeat Purchase */}
          <g className="cursor-pointer group">
            <path
              d="M 159,144 L 371,144 L 330,188 L 200,188 Z"
              fill="#23C3DA"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="265" y="164" textAnchor="middle" fontSize="13" fontWeight="semibold" fill="#00000">
              Repeat Purchase
            </text>
            <text x="265" y="178" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#00000">
              3,240
            </text>
            <text x="560" y="170" fontSize="15" fontWeight="semibold" fill="#0D1C2E">
              40%
            </text>
          </g>

          {/* Step 5: Referral */}
          <g className="cursor-pointer group">
            <path
              d="M 200,192 L 330,192 L 330,236 L 200,236 Z"
              fill="#6FC77D"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="265" y="212" textAnchor="middle" fontSize="13" fontWeight="semibold" fill="#00000">
              Referral
            </text>
            <text x="265" y="226" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#00000">
              1,240
            </text>
            <text x="560" y="218" fontSize="15" fontWeight="semibold" fill="#0D1C2E">
              32%
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CustomerJourneyFunnel;
