
import type { RenewalDetailsData } from '../RenewalDetailsPage';

interface Props {
  data: RenewalDetailsData['subscriptionFinancials'];
}

export default function SubscriptionFinancialsCard({ data }: Props) {
  const rows = [
    { label: 'Annual Recurring Revenue', value: data.arr, color: 'text-[#1B1B1D]' },
    { label: 'Monthly Recurring Revenue', value: data.mrr, color: 'text-[#1B1B1D]' },
    { label: 'Last Invoice Date', value: data.lastInvoiceDate, color: 'text-[#1B1B1D]' },
    { label: 'Current Value', value: data.currentValue, color: 'text-[#1B1B1D]' },
    { label: 'Renewal Value', value: data.renewalValue, color: 'text-[#0051D5]' },
    { label: 'Increase', value: data.increase, color: 'text-[#16A34A]' },
  ];

  return (
    <div className="bg-white h-full flex flex-col BoxStyle border border-[#EDF3FD] rounded-xl p-4 sm:p-6">
      <h2 className="font-semibold text-[17px] sm:text-xl leading-6 text-[#0D1C2E] m-0 whitespace-nowrap">
        Subscription Financials
      </h2>
      <div className="border-b border-[#EDF3FD] mt-3 -mx-4 sm:-mx-6" />

      <div className="flex flex-col mt-1">
        {rows.map((row, idx) => (
          <div key={idx} className="flex justify-between items-center py-3 border-b border-[#EDF3FD] gap-4">
            <span className="font-medium text-[13px] sm:text-sm leading-[1.4] text-[#6B7280]">
              {row.label}
            </span>
            <span className={`font-semibold text-sm sm:text-base leading-[120%] whitespace-nowrap ${row.color}`}>
              {row.value}
            </span>
          </div>
        ))}

        {/* Auto-Renewal row */}
        <div className="flex justify-between items-center py-3 gap-4">
          <span className="font-medium text-[13px] sm:text-sm leading-[1.4] text-[#6B7280]">
            Auto-Renewal
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            {data.autoRenewal && <div className="w-2 h-2 rounded-full bg-[#16A34A]" />}
            <span className="font-semibold text-sm sm:text-base leading-[120%] text-[#1B1B1D] whitespace-nowrap">
              {data.autoRenewal ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1" />
    </div>
  );
}
