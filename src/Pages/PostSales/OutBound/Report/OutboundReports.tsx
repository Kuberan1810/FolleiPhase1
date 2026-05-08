import RevenueAnalytics from './sections/RevenueAnalytics';
import RevenueCharts from './sections/RevenueCharts';
import RevenueFollowUp from './sections/RevenueFollowUp';
import RevenueTable from './sections/RevenueTable';


const OutboundReports = () => {
  return (
    <div className="flex flex-col">


      <RevenueAnalytics />
      <RevenueCharts />
      <RevenueFollowUp />
      <RevenueTable/>
    </div>
  );
};

export default OutboundReports;
