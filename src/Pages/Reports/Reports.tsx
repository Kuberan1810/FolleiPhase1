import CampaignAndAnalysis from "./section/CampaignAndAnalysis";
import Metrics from "./section/Metrics";
import RecentActivity from "./section/RecentActivity";

const Reports = () => {
  return (
    <div className="flex flex-col gap-6">
      <Metrics />
      <CampaignAndAnalysis />
      <RecentActivity />
    </div>
  );
};

export default Reports;
