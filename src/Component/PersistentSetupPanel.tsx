import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { useSetupProgress } from '../hooks/useSetupProgress';

const STEP_LABELS: Record<string, string> = {
  DRAFT: 'Add your business data and leads',
  GOAL_SET: 'Draft your requirements',
  REQUIREMENTS_DRAFTED: 'Answer a couple of questions',
  GAP_FILLING: 'Answer a couple of questions',
  PACKAGE_GENERATED: 'Review and approve your sales package',
};

/**
 * Setup follows the user across the app.
 *
 * The panel used to live only on /dashboard-setup, so it vanished the moment
 * the user opened Leads or Dashboard -- and there was no way back to an
 * unfinished setup. Setup belongs to the workspace, so this renders wherever
 * the user is until the workspace reaches VERIFIED.
 */
export const PersistentSetupPanel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { shouldShowSetup, stage, stageIndex, totalStages, route } = useSetupProgress();

  if (!shouldShowSetup) return null;
  // Already on the page that handles this stage: the panel would just be a
  // button that reloads the screen the user is looking at.
  if (location.pathname === route) return null;

  const label = STEP_LABELS[stage] ?? 'Finish setting up your workspace';

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[320px] rounded-2xl border border-[#E6E6E4] bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.10)]">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#717378]">
          Follei Setup
        </span>
        <span className="text-[11px] text-[#717378]">
          {stageIndex + 1} of {totalStages}
        </span>
      </div>

      <div className="mb-3 flex gap-1">
        {Array.from({ length: totalStages }).map((_, index) => (
          <span
            key={index}
            className={`h-1 flex-1 rounded-full ${index <= stageIndex ? 'bg-[#7A9601]' : 'bg-[#EBEBE8]'}`}
          />
        ))}
      </div>

      <p className="mb-3 text-[13px] font-medium text-[#16171A]">{label}</p>

      <button
        type="button"
        onClick={() => navigate(route)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#16171A] px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-black"
      >
        <span>Continue setup</span>
        <ArrowRight className="size-3.5" />
      </button>
    </div>
  );
};

/** Shown once setup is finished, so the transition is visible. */
export const SetupCompleteBadge: React.FC = () => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] px-3 py-1 text-[12px] font-medium text-[#047857]">
    <Check className="size-3" strokeWidth={3} />
    Setup complete
  </span>
);

export default PersistentSetupPanel;
