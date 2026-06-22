import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface HealthSummaryProps {
  customerName: string;
  productName?: string;
}

interface MetricItem {
  label: string;
  value: number;
  color: string;
}

interface HealthSummaryData {
  metrics: MetricItem[];
}

const summaryData: HealthSummaryData = {
  metrics: [
    { label: 'ADOPTION', value: 75, color: '#004AC6' },
    { label: 'LEARNING', value: 80, color: '#22C55E' },
    { label: 'HEALTH', value: 78, color: '#60A5FA' }
  ]
};

const HealthSummary: React.FC<HealthSummaryProps> = ({ productName }) => {
  return (
    <div className="BoxStyle flex flex-col gap-6 bg-white border border-[#EDF3FD] shadow-[0_4px_20px_rgba(237,243,253,0.3)]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-[20px] font-bold text-[#191C1E]">Health Summary</h3>
        <ShieldCheck className="w-8 h-8 text-[#C6D8FB] shrink-0" />
      </div>

      {/* Progress Bars */}
      <div className="flex flex-col gap-5">
        {summaryData.metrics.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-[#565E74] uppercase tracking-[0.5px] text-[12px] font-semibold">
                {item.label}
              </span>
              <span className="text-[#191C1E] text-[14px] font-bold leading-none">
                {item.value}%
              </span>
            </div>
            <div className="w-full bg-[#E6E8EA] h-[8px] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: item.color
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Green Metric Callout Box */}
      <div className="mt-2 p-5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-[8px] flex flex-col gap-1.5">
        <p className="text-[12px] font-medium text-[#166534] leading-[26px]">
          Overall health is Strong. {productName || 'Acme Corp'} is tracking ahead of typical Enterprise onboarding timelines.
        </p>
      </div>
    </div>
  );
};

export default HealthSummary;
