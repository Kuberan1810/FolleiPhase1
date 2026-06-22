import React from 'react';
import { Flag, Check, MoreHorizontalIcon } from 'lucide-react';

interface MilestoneStep {
  label: string;
  sub: string;
  status: 'Completed' | 'InProgress' | 'Pending';
}

const steps: MilestoneStep[] = [
  { label: 'Account Setup', sub: 'Oct 12', status: 'Completed' },
  { label: 'User Configuration', sub: 'Oct 10', status: 'Completed' },
  { label: 'Data Import', sub: 'Oct 15', status: 'Completed' },
  { label: 'Training Complete', sub: 'Oct 25', status: 'Completed' },
  { label: 'Adv. Features', sub: 'In Progress', status: 'InProgress' },
  { label: 'Customer Completion', sub: '', status: 'Pending' }
];

const MilestoneTimeline: React.FC = () => {
  return (
    <div className="BoxStyle flex flex-col gap-6 shadow-[0_4px_20px_rgba(237,243,253,0.3)]">
      <div>
        <h3 className="text-[20px] font-bold text-[#191C1E]">Detailed Milestone Timeline</h3>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4 px-6 py-4 overflow-hidden">

        {steps.map((step, idx) => {
          const isCompleted = step.status === 'Completed';
          const isInProgress = step.status === 'InProgress';

          return (
            <div
              key={idx}
              className="relative flex md:flex-col items-center gap-4 md:gap-3 flex-1 w-full md:w-auto"
            >
              {idx < steps.length - 1 && (
                <div
                  className={`absolute left-1/2 w-full h-[3px] hidden md:block z-0 ${steps[idx + 1].status === 'Completed' || steps[idx].status === 'Completed'
                    ? 'bg-[#22C55E]'
                    : 'border-t-2 border-dashed border-[#D1D5DB]'
                    }`}
                  style={{ top: '20px' }}
                />
              )}

              {/* Stepper node indicator */}
              <div className="relative z-10 shrink-0">
                {isCompleted ? (
                  <div className="w-[40px] h-[40px] rounded-full bg-[#DCFCE7] border-2 border-[#22C55E] flex items-center justify-center text-[#15803D] shadow-sm shrink-0">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                ) : isInProgress ? (
                  <div className="w-[40px] h-[40px] rounded-full bg-[#ECEEF0] border-2 border-[#C3C6D7] flex items-center justify-center text-[#434655] shadow-sm shrink-0">
                    <MoreHorizontalIcon className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="w-[40px] h-[40px] rounded-full bg-[#ECEEF0] border-2 border-[#C3C6D7] flex items-center justify-center text-[#434655] shadow-sm shrink-0">
                    <Flag className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Text labels */}
              <div className="flex flex-col items-start md:items-center text-left md:text-center leading-tight z-10">
                <span
                  className="text-[12px] font-bold text-[#191C1E] mt-1"
                >
                  {step.label}
                </span>
                <span className="text-[10px] font-semibold text-[#565E74] mt-1">
                  {step.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MilestoneTimeline;
