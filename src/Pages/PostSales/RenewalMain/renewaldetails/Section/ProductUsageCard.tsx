import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['productUsage'];
}

export default function ProductUsageCard({ data }: Props) {
  return (
    <div className="bg-white h-full flex flex-col BoxStyle border border-[#EDF3FD] rounded-xl p-6">
      <h2 className="font-semibold text-xl leading-6 text-[#0D1C2E] m-0">
        Product Usage
      </h2>
      <div className="border-b border-[#EDF3FD] mt-3 mb-5" />

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-base text-[#1B1B1D]">Seat Utilization</span>
          <span className="font-semibold text-base text-[#2563EB]">{data.seatUtilization}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#EAE7E9]">
          <div className="h-2 rounded-full bg-[#2563EB] transition-all duration-500" style={{ width: `${data.seatUtilization}%` }} />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-base text-[#1B1B1D]">Storage Usage</span>
          <span className="font-semibold text-base text-[#DC2626]">{data.storageUsage}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#EAE7E9]">
          <div className="h-2 rounded-full bg-[#DC2626] transition-all duration-500" style={{ width: `${data.storageUsage}%` }} />
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-medium text-base text-[#1B1B1D]">API Usage</span>
          <span className="font-semibold text-base text-[#16A34A]">{data.apiUsage}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#EAE7E9]">
          <div className="h-2 rounded-full bg-[#16A34A] transition-all duration-500" style={{ width: `${data.apiUsage}%` }} />
        </div>
      </div>

      <div className="flex-1" />
    </div>
  );
}