import OrchestratorHeader from './section/OrchestratorHeader';
import BulkDataImport from './section/BulkDataImport';
import LinkCRM from './section/LinkCRM';
// import IntelligenceAlerts from './section/IntelligenceAlerts';

const Orchestrator = () => {
  return (
    <div className="w-full flex flex-col gap-6 md:gap-8  lg:mb-0 mb-20" >
      <OrchestratorHeader />
      <BulkDataImport />
      <LinkCRM />
      {/* <IntelligenceAlerts /> */}
    </div>
  );
};

export default Orchestrator;