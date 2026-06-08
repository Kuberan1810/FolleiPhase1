import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Lead } from '../Leads';
import AISummaryCard from '../ai-insights/AISummaryCard';
import LeadActivities from './LeadActivities';
import ProfileDetailsCard from './ProfileDetailsCard';
import ProgressTimeline from './ProgressTimeline';
import AIInsightsDrawer from '../ai-insights/AIInsightsDrawer';
import ActivityLogsView from '../ai-insights/ActivityLogsView';

type LeadProfileProps = {
  lead: Lead;
  onBack: () => void;
};

const LeadProfile: React.FC<LeadProfileProps> = ({ lead, onBack }) => {
  const [isInsightsOpen, setIsInsightsOpen] = React.useState(false);
  const [showLogs, setShowLogs] = React.useState(false);

  // Determine stage progress indices
  const stages = [
    { key: 'NEW INQUIRY', label: 'New' },
    { key: 'CONTACTED', label: 'Contacted' },
    { key: 'QUALIFIED', label: 'Qualified' },
    { key: 'DEMO SCHEDULED', label: 'Demo Scheduled' },
    { key: 'PROPOSAL', label: 'Proposal' },
    { key: 'NEGOTIATION', label: 'Negotiation' },
    { key: 'CONVERTED', label: 'Won' }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === lead.status) !== -1
    ? stages.findIndex(s => s.key === lead.status)
    : 2; // Default to Qualified (index 2) for demo/mock purposes if not found

  if (showLogs) {
    return (
      <ActivityLogsView
        onBack={() => setShowLogs(false)}
        leadName={lead.name}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 font-sans pb-12" style={{ fontFamily: 'Inter, sans-serif' }}>
      {/* Header back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent"
        >
          <ArrowLeft className="w-6 h-6 text-slate-800" />
        </button>
        <h1 className="text-xl font-bold text-slate-800">Lead Profile</h1>
      </div>

      {/* Main Cards Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Card: Profile Details */}
        <ProfileDetailsCard lead={lead} />

        {/* Right Card: AI Summarize */}
        <AISummaryCard onInsightsClick={() => setIsInsightsOpen(true)} />
      </div>

      {/* Progress timeline stages */}
      <ProgressTimeline currentStageIndex={currentStageIndex} stages={stages} />

      {/* Sections Cards */}
      <LeadActivities lead={lead} />

      {/* Sliding AI Insights Drawer */}
      <AIInsightsDrawer
        isOpen={isInsightsOpen}
        onClose={() => setIsInsightsOpen(false)}
        leadName={lead.name}
        probability={88}
        onViewLogsClick={() => {
          setIsInsightsOpen(false);
          setShowLogs(true);
        }}
      />
    </div>
  );
};

export default LeadProfile;
