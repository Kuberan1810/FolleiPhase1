/**
 * Leads: AI research spreadsheet page.
 */
import LeadsTable from '../../Component/LeadsTable';
import IcpBuildingCard from '../../Component/IcpBuildingCard';
import { useProject } from './ProjectShell';

export default function Leads() {
  const { stage, snapshot } = useProject();
  const leads = snapshot.sheet.rows;
  const isBuildingIcp = stage === 'icp';
  const isFindingLeads = stage === 'leads' && leads.length === 0;

  return (
    <div className="w-full px-6 py-6 space-y-4">
      {isBuildingIcp && <IcpBuildingCard stage="icp" />}
      {isFindingLeads && <IcpBuildingCard stage="leads" />}
      <LeadsTable />
    </div>
  );
}

