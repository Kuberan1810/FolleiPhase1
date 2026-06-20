import React from 'react';

const CustomerJourneyFunnel: React.FC = () => {
  return (
    <div className="BoxStyle p-6 bg-white border border-[#EDF3FD] rounded-[24px] flex flex-col font-[Inter]">
      <div className="mb-6">
        <h3
          className="tracking-normal font-semibold text-[#1E293B]"
          style={{
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#1E293B'
          }}
        >
          Customer Journey Funnel
        </h3>
        <p className="text-[13px] text-slate-400 font-medium mt-0.5">
          Track Customer Progression after purchase.
        </p>
      </div>

      {/* Custom SVG Funnel rendering */}
      <div className="w-full flex justify-center py-4">
        <svg
          width="100%"
          height="270"
          viewBox="0 0 580 254"
          preserveAspectRatio="xMidYMid meet"
          className="max-w-[480px] sm:max-w-full"
        >
          {/* Step 1: Purchase Completed */}
          <g className="cursor-pointer group">
            <path
              d="M 0,0 L 460,0 L 414,44 L 46,44 Z"
              fill="#E3DBFA"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="230" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0D1C2E">
              Purchase Completed
            </text>
            <text x="230" y="34" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#5E6366">
              23,240
            </text>
            <text x="500" y="26" fontSize="15" fontWeight="bold" fill="#0D1C2E">
              89%
            </text>
          </g>

          {/* Step 2: Order Delivered */}
          <g className="cursor-pointer group">
            <path
              d="M 46,48 L 414,48 L 368,92 L 92,92 Z"
              fill="#C7B5FB"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="230" y="68" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0D1C2E">
              Order Delivered
            </text>
            <text x="230" y="82" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#5E6366">
              10,240
            </text>
            <text x="500" y="74" fontSize="15" fontWeight="bold" fill="#0D1C2E">
              82%
            </text>
          </g>

          {/* Step 3: Product Used */}
          <g className="cursor-pointer group">
            <path
              d="M 92,96 L 368,96 L 322,140 L 138,140 Z"
              fill="#5C82F2"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="230" y="116" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#FFFFFF">
              Product Used
            </text>
            <text x="230" y="130" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#E2E8F0">
              5,240
            </text>
            <text x="500" y="122" fontSize="15" fontWeight="bold" fill="#0D1C2E">
              71%
            </text>
          </g>

          {/* Step 4: Repeat Purchase */}
          <g className="cursor-pointer group">
            <path
              d="M 138,144 L 322,144 L 286,188 L 174,188 Z"
              fill="#06B6D4"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="230" y="164" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#FFFFFF">
              Repeat Purchase
            </text>
            <text x="230" y="178" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#E2E8F0">
              3,240
            </text>
            <text x="500" y="170" fontSize="15" fontWeight="bold" fill="#0D1C2E">
              40%
            </text>
          </g>

          {/* Step 5: Referral */}
          <g className="cursor-pointer group">
            <path
              d="M 174,192 L 286,192 L 286,236 L 174,236 Z"
              fill="#10B981"
              className="transition-all duration-300 group-hover:brightness-95"
            />
            <text x="230" y="212" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#FFFFFF">
              Referral
            </text>
            <text x="230" y="226" textAnchor="middle" fontSize="11" fontWeight="semibold" fill="#E2E8F0">
              1,240
            </text>
            <text x="500" y="218" fontSize="15" fontWeight="bold" fill="#0D1C2E">
              32%
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default CustomerJourneyFunnel;
