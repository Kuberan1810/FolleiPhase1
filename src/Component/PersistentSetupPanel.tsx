import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useSetupProgress } from '../hooks/useSetupProgress';

const STEP_LABELS: Record<string, string> = {
  DRAFT: 'Add your business data and leads',
  GOAL_SET: 'Define your ultimate goal',
  REQUIREMENTS_DRAFTED: 'Draft your requirements',
  GAP_FILLING: 'Answer a couple of clarifying questions',
  PACKAGE_GENERATED: 'Review and approve your sales package',
};

/**
 * Setup follows the user across the app.
 *
 * It renders on non-setup pages (Dashboard, Leads, Campaigns, Meetings, etc.)
 * until the workspace reaches VERIFIED, so the user can easily return to finish setup.
 * On /home and /dashboard-setup (where setup is actively happening), the panel is hidden.
 */
export const PersistentSetupPanel: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { shouldShowSetup, stageIndex, totalStages, stageLabel, missingItem, route } = useSetupProgress();

  if (!shouldShowSetup) return null;
  // If the user is already on /dashboard-setup, hide floating panel to avoid duplication
  if (location.pathname === '/dashboard-setup') return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 w-[330px] rounded-[22px] border border-[#E6E6E4] bg-white p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] animate-fade-slide flex flex-col gap-2.5">
      {/* Header: Title + Step Counter */}
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#717378]">
          Follei Setup
        </span>
        <span className="text-[11px] font-semibold text-[#16171A]">
          {stageIndex + 1} of {totalStages}
        </span>
      </div>

      {/* 6 Segmented Progress Bars */}
      <div className="flex gap-1.5 py-0.5">
        {Array.from({ length: totalStages }).map((_, index) => (
          <span
            key={index}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              index <= stageIndex ? 'bg-[#7A9601]' : 'bg-[#EBEBE8]'
            }`}
          />
        ))}
      </div>

      {/* Stage Description & Missing Item Tag */}
      <div className="flex flex-col  w-fit gap-1 my-0.5">
        <p className="text-[13.5px] font-medium text-[#16171A] leading-snug">
          {stageLabel}
        </p>
        {missingItem && (
          <span className="w-fit inline-flex items-center gap-1 shrink-0 rounded-full bg-amber-50 border border-amber-200/80 px-2 py-0.5 text-[10.5px] font-medium text-amber-700">
            ⚠️ {missingItem}
          </span>
        )}
      </div>

      {/* Continue Setup CTA Button */}
      <button
        type="button"
        onClick={() => navigate(route)}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#16171A] px-4 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-black cursor-pointer shadow-2xs active:scale-[0.99]"
      >
        <span>Continue setup</span>
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
