import React, { useEffect, useState } from 'react';
import { User, Building2, CircleDollarSign, ClipboardList, FileText, Check, ArrowRight } from 'lucide-react';

interface ToolSyncModalProps {
  toolName?: string;
  toolLogo?: React.ReactNode;
  onContinue?: () => void;
  onDisconnect?: () => void;
}

interface TargetItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  target: number;
}

const TARGET_ITEMS: TargetItem[] = [
  { id: 'contacts', label: 'Contacts', icon: User, target: 4820 },
  { id: 'companies', label: 'Companies', icon: Building2, target: 842 },
  { id: 'deals', label: 'Deals', icon: CircleDollarSign, target: 328 },
  { id: 'activities', label: 'Activities', icon: ClipboardList, target: 8420 },
  { id: 'documents', label: 'Documents', icon: FileText, target: 126 },
];

export function OutlookSyncModal({
  toolName = 'HubSpot',
  onContinue,
}: ToolSyncModalProps) {
  const [stage, setStage] = useState<1 | 2 | 3>(1);
  const [progress, setProgress] = useState(0);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    contacts: 0,
    companies: 0,
    deals: 0,
    activities: 0,
    documents: 0,
  });

  useEffect(() => {
    const startTime = performance.now();
    const stage1Duration = 1400; // ms to reach 38%
    const stage2Duration = 2600; // ms to reach 100%
    const totalDuration = stage1Duration + stage2Duration; // 4000ms

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;

      if (elapsed < stage1Duration) {
        // Stage 1: 0% to 38%
        const ratio = elapsed / stage1Duration;
        const currentProgress = Math.min(38, Math.round(ratio * 38));
        setProgress(currentProgress);
        setStage(1);
        animationFrameId = requestAnimationFrame(tick);
      } else if (elapsed < totalDuration) {
        // Stage 2: 38% to 100%
        setStage(2);
        const stage2Elapsed = elapsed - stage1Duration;
        const ratio = stage2Elapsed / stage2Duration;
        const currentProgress = Math.min(100, Math.round(38 + ratio * 62));
        setProgress(currentProgress);

        // Interpolate counts smoothly
        const newCounts: { [key: string]: number } = {};
        TARGET_ITEMS.forEach((item) => {
          newCounts[item.id] = Math.round(ratio * item.target);
        });
        setCounts(newCounts);

        animationFrameId = requestAnimationFrame(tick);
      } else {
        // Stage 3: Ready!
        setProgress(100);
        setStage(3);
        const finalCounts: { [key: string]: number } = {};
        TARGET_ITEMS.forEach((item) => {
          finalCounts[item.id] = item.target;
        });
        setCounts(finalCounts);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 backdrop-blur-xs p-4 sm:p-6 font-sans select-none">
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-[540px] rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl border border-gray-100 transition-all duration-300 animate-in fade-in zoom-in-95"
      >
        {/* Stage 1: Connecting */}
        {stage === 1 && (
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3">
                <span className="size-4.5 rounded-full bg-[#047857] inline-block shrink-0 animate-pulse" />
                <h2 className="text-[22px] font-bold tracking-tight text-[#16171A]">
                  Connecting {toolName}
                </h2>
              </div>
              <p className="mt-2 text-[14px] text-[#64748B] font-normal leading-relaxed">
                Follei is securely accessing your {toolName} workspace.
              </p>
            </div>

            {/* Progress status & bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[13px] text-[#64748B] mb-2 font-normal">
                <span>Preparing your workspace...</span>
                <span className="tabular-nums font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                <div
                  className="h-full rounded-full bg-[#047857] transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Stage 2: Importing Data */}
        {stage === 2 && (
          <div className="flex flex-col gap-5">
            {/* Header */}
            <div>
              <h2 className="text-[22px] font-bold tracking-tight text-[#16171A]">
                Importing your {toolName} data
              </h2>
              <p className="mt-1.5 text-[14px] text-[#64748B] font-normal leading-relaxed">
                Follei is bringing your existing business information into your workspace.
              </p>
            </div>

            {/* Data items counting card */}
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] p-4.5 space-y-3.5 my-1">
              {TARGET_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[14px] text-[#475569]">
                      <IconComponent className="size-4 text-[#64748B] stroke-[1.8]" />
                      <span className="font-normal">{item.label}</span>
                    </div>
                    <span className="text-[14.5px] font-semibold text-[#16171A] tabular-nums">
                      {(counts[item.id] || 0).toLocaleString('en-US')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Progress status & bar */}
            <div className="pt-1">
              <div className="flex items-center justify-between text-[13px] text-[#64748B] mb-2 font-normal">
                <span>Organizing everything for Follei...</span>
                <span className="tabular-nums font-medium">{progress}%</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#E5E7EB]">
                <div
                  className="h-full rounded-full bg-[#047857] transition-all duration-150 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Stage 3: Ready */}
        {stage === 3 && (
          <div className="flex flex-col gap-5 animate-in fade-in duration-300">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2.5">
                <Check className="size-5.5 text-[#059669] stroke-[2.8]" />
                <h2 className="text-[22px] font-bold tracking-tight text-[#16171A]">
                  {toolName} is ready
                </h2>
              </div>
              <p className="mt-1.5 text-[14px] text-[#64748B] font-normal leading-relaxed">
                Your {toolName} data has been imported successfully.
              </p>
            </div>

            {/* Data items completed card */}
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9] p-4.5 space-y-3.5 my-1">
              {TARGET_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[14px] text-[#475569]">
                      <IconComponent className="size-4 text-[#64748B] stroke-[1.8]" />
                      <span className="font-normal">{item.label}</span>
                    </div>
                    <span className="text-[14.5px] font-semibold text-[#16171A] tabular-nums">
                      {item.target.toLocaleString('en-US')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Sub-note */}
            <p className="text-[13px] text-[#64748B] font-normal leading-normal">
              Follei can now use this information to understand your customers, leads and sales activity.
            </p>

            {/* Footer action */}
            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#007A5A] hover:bg-[#00664a] active:bg-[#00523b] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-all cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="size-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OutlookSyncModal;