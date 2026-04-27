import OrchestratorHeader from './section/OrchestratorHeader';
import ScheduleSection from './section/ScheduleSection';
import BulkDataImport from './section/BulkDataImport';
import IntelligenceAlerts from './section/IntelligenceAlerts';

const Orchestrator = () => {
  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 font-['Inter'] min-h-screen lg:mb-0 mb-20" >
      <OrchestratorHeader />
      <ScheduleSection /> 
      <BulkDataImport />
      <IntelligenceAlerts />
    </div>
  );
};

export default Orchestrator;