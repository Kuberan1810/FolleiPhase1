import React from 'react';
import { Check, Pencil } from 'lucide-react';

interface ProgressTimelineProps {
  currentStageIndex: number;
  stages: Array<{ key: string; label: string }>;
}

const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ currentStageIndex, stages }) => {
  return (
    <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] my-2">
      <div className="max-w-4xl mx-auto relative py-2">
        
        {/* Row 1: Circles & Connector Line */}
        <div className="relative h-8 flex items-center justify-between">
          {/* Connector Line Wrapper */}
          <div 
            className="absolute top-1/2 h-1 -translate-y-1/2 z-0"
            style={{ left: '7.14%', right: '7.14%' }}
          >
            {/* Background Line */}
            <div className="w-full h-full bg-slate-100 rounded-full" />
            {/* Active Progress Line */}
            <div
              className="absolute left-0 top-0 h-full bg-[#004370] transition-all duration-500 rounded-full"
              style={{ width: `${(currentStageIndex / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {stages.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div key={`circle-${stage.key}`} className="flex-1 flex justify-center z-10 relative">
                {/* Stage dot indicator */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-[#004370] text-white shadow-sm' :
                  isCurrent ? 'bg-white border-2 border-[#004370] text-[#004370] shadow-md' :
                    'bg-white border-2 border-slate-200 text-slate-400'
                  }`}>
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3px]" />
                  ) : isCurrent ? (
                    <Pencil className="w-3.5 h-3.5" />
                  ) : (
                    <span className="text-[10px] font-bold">{idx + 1}</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 2: Labels */}
        <div className="flex justify-between mt-2">
          {stages.map((stage, idx) => {
            const isCurrent = idx === currentStageIndex;
            return (
              <div key={`label-${stage.key}`} className="flex-1 flex justify-center text-center px-1">
                <span className={`text-[11px] font-bold font-sans tracking-wide whitespace-nowrap ${isCurrent ? 'text-[#004370]' : 'text-slate-400 font-semibold'}`}>
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default ProgressTimeline;
