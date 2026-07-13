
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['customerOverview'];
}

export default function CustomerOverviewCard({ data }: Props) {
  const rowClass = "flex justify-between items-center py-3 border-b border-[#EDF3FD] gap-2";

  return (
    <div className="bg-white h-full flex flex-col BoxStyle border border-[#EDF3FD] rounded-xl p-4 sm:p-6">
      <h2 className="font-semibold text-[17px] sm:text-xl leading-6 text-[#0D1C2E] m-0 whitespace-nowrap">
        Customer Overview
      </h2>
      <div className="border-b border-[#EDF3FD] mt-3 -mx-4 sm:-mx-6" />

      <div className="flex flex-col">
        <div className={rowClass}>
          <span className="font-medium text-sm sm:text-base leading-6 text-[#6B7280] shrink-0">Company</span>
          <span className="font-semibold text-sm sm:text-base leading-[120%] text-[#1B1B1D] text-right">{data.company}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-sm sm:text-base leading-6 text-[#6B7280] shrink-0">Industry</span>
          <span className="font-semibold text-sm sm:text-base leading-[120%] text-[#1B1B1D] text-right">{data.industry}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-sm sm:text-base leading-6 text-[#6B7280] shrink-0">Company Size</span>
          <span className="font-semibold text-sm sm:text-base leading-[120%] text-[#1B1B1D] text-right">{data.companySize}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-sm sm:text-base leading-6 text-[#6B7280] shrink-0">Region</span>
          <span className="font-semibold text-sm sm:text-base leading-[120%] text-[#1B1B1D] text-right">{data.region}</span>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-sm sm:text-base leading-6 text-[#6B7280] shrink-0">Customer Since</span>
          <div className="flex flex-col text-right">
            <span className="font-semibold text-sm sm:text-base leading-[120%] text-[#1B1B1D]">{data.customerSince}</span>
            <span className="font-normal text-xs leading-4 text-[#6B7280]">{data.yearsTotal}</span>
          </div>
        </div>
        <div className={rowClass}>
          <span className="font-medium text-sm sm:text-base leading-6 text-[#6B7280] shrink-0">Tier</span>
          <div className="font-medium text-xs leading-4 text-[#0051D5] bg-[rgba(0,81,213,0.1)] rounded-md px-2.5 py-1 w-fit">
            {data.tier}
          </div>
        </div>
      </div>

      <div className="flex-1" />

      <div className="mt-4">
        <span className="font-semibold text-sm leading-6 uppercase text-[#6B7280]">
          PRIMARY CONTACT
        </span>
        <div className="flex items-center gap-3 mt-2">
          <div className="w-10 h-10 rounded-full bg-[rgba(0,81,213,0.1)] flex items-center justify-center">
            <span className="font-bold text-base leading-6 text-center text-[#0051D5]">
              {data.primaryContact.initials}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-base leading-[120%] text-[#1B1B1D]">{data.primaryContact.name}</span>
            <span className="font-normal text-sm leading-[120%] text-[#6B7280]">{data.primaryContact.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
