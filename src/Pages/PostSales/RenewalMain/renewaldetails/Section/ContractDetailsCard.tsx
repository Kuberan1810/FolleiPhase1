import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['contractDetails'];
}

export default function ContractDetailsCard({ data }: Props) {
  const rowClass = "flex justify-between items-center py-3.5 border-b border-[#EDF3FD]";

  return (
    <div className="bg-white h-full flex flex-col BoxStyle border border-[#EDF3FD] rounded-xl p-6">
      <h2 className="font-semibold text-xl leading-6 text-[#0D1C2E] m-0">
        Contract Details
      </h2>
      <div className="border-b border-[#EDF3FD] mt-3" />

      <div className="flex flex-col">
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Contract ID</span>
          <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">{data.contractId}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Start Date</span>
          <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">{data.startDate}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Expiry Date</span>
          <span className="font-semibold text-base leading-[120%] text-[#DC2626]">{data.expiryDate}</span>
        </div>
      </div>

      <div className="flex-1" />

      <div className="mt-4">
        <span className="font-semibold text-sm leading-6 uppercase text-[#6B7280]">
          ACCOUNT MANAGER
        </span>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-full bg-[rgba(220,38,38,0.1)] flex items-center justify-center">
            <span className="font-bold text-base leading-6 text-center text-[#DC2626]">
              {data.accountManager.initials}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">{data.accountManager.name}</span>
            <span className="font-normal text-sm leading-[120%] text-[#6B7280]">{data.accountManager.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}