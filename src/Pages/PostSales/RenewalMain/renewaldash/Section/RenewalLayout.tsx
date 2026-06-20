import { useState } from 'react';
import RenewalHeaderCards from './RenewalHeaderCards';
import RenewalPredictionChart from './RenewalPredictionChart';
import UpcomingRenewalTable from './UpcomingRenewalTable';
import AiInsightsPanel from './AiInsightsPanel';
import RevenueForecastPanel from './RevenueForecastPanel';
import UpsellOpportunityList from './UpsellOpportunityList';
import { mockStats, mockPredictionData, mockRenewalRows, mockAiInsights, mockForecast, mockUpsells } from '../data/mockRenewalData';

export default function RenewalLayout() {
  const [stats] = useState(mockStats);
  const [predictionData] = useState(mockPredictionData);
  const [renewalRows] = useState(mockRenewalRows);
  const [aiInsights] = useState(mockAiInsights);
  const [forecast] = useState(mockForecast);
  const [upsells] = useState(mockUpsells);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="m-0 font-extrabold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
          Renewal Management
        </h1>
        <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
          Monitor upcoming renewals, reduce churn risk, and maximize recurring revenue.
        </p>
      </div>

      <div className="flex flex-col xl:flex-row gap-6">
        <div className="w-full xl:w-auto xl:flex-shrink-0">
          <RenewalHeaderCards stats={stats} />
        </div>
        <div className="flex-1 min-w-0">
          <RenewalPredictionChart data={predictionData} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-stretch mt-6">
        <div className="flex-1 min-w-0">
          <UpcomingRenewalTable rows={renewalRows} />
        </div>
        <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col gap-4">
          <AiInsightsPanel insights={aiInsights} />
          <RevenueForecastPanel forecast={forecast} />
        </div>
      </div>

      <div className="mt-6">
        <UpsellOpportunityList upsells={upsells} />
      </div>
    </div>
  );
}
