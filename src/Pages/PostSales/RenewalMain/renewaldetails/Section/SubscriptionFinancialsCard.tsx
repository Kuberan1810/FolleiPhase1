import React from 'react';
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['subscriptionFinancials'];
}

export default function SubscriptionFinancialsCard({ data }: Props) {
  const rowClass = "flex justify-between items-center py-3.5 border-b border-[#EDF3FD]";
  const lastRowClass = "flex justify-between items-center py-3.5";

  return (
    <div className="bg-white h-full flex flex-col BoxStyle border border-[#EDF3FD] rounded-xl p-6">
      <h2 className="font-semibold text-xl leading-6 text-[#0D1C2E] m-0">
        Subscription Financials
      </h2>
      <div className="border-b border-[#EDF3FD] mt-3" />

      <div className="flex flex-col">
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Annual Recurring Revenue</span>
          <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">{data.arr}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Monthly Recurring Revenue</span>
          <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">{data.mrr}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Last Invoice Date</span>
          <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">{data.lastInvoiceDate}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Current Value</span>
          <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">{data.currentValue}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Renewal Value</span>
          <span className="font-semibold text-base leading-[120%] text-[#0051D5]">{data.renewalValue}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Increase</span>
          <span className="font-semibold text-base leading-[120%] text-[#16A34A]">{data.increase}</span>
        </div>
        <div className={lastRowClass}>
          <span className="font-medium text-base leading-6 text-[#6B7280]">Auto-Renewal</span>
          <div className="flex items-center gap-1.5">
            {data.autoRenewal && <div className="w-2 h-2 rounded-full bg-[#16A34A]" />}
            <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">
              {data.autoRenewal ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex-1" />
    </div>
  );
}