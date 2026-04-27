import OutboundReportsMetrics from './sections/OutboundReportsMetrics';
import OutboundChannelAnalysis from './sections/OutboundChannelAnalysis';
import OutboundRecentActivity from './sections/OutboundRecentActivity';

const OutboundReports = () => {
  return (
    <div className="flex flex-col gap-8">


      <OutboundReportsMetrics />
      <OutboundChannelAnalysis />
      <OutboundRecentActivity />
    </div>
  );
};

export default OutboundReports;
