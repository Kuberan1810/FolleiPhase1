import OrchestratorHeader from './section/OrchestratorHeader';
import ScheduleSection from './section/ScheduleSection';
import BulkDataImport from './section/BulkDataImport';
import IntelligenceAlerts from './section/IntelligenceAlerts';

const Orchestrator = () => {
  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 font-['Inter']">
      <OrchestratorHeader />
      <ScheduleSection />
      <BulkDataImport />
      <IntelligenceAlerts />
    </div>
  );
};

export default Orchestrator;