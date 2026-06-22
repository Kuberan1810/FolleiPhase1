import React from 'react';
import { PlayCircle, Sparkles, BookOpenText } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  learningProgress: number;
}

interface LearningProgressProps {
  customer: Customer;
}

interface MetaItem {
  label: string;
  value: string;
  alignRight: boolean;
}

const progressMeta: MetaItem[] = [
  { label: 'LAST ACTIVITY', value: '2 Days Ago', alignRight: false },
  { label: 'MODULES', value: '4/5', alignRight: true }
];

interface MiniStatItem {
  label: string;
  value: string;
  progressPercent: number;
  iconType: 'play' | 'book';
}

const miniStats: MiniStatItem[] = [
  { label: 'VIDEOS WATCHED', value: '8/10', progressPercent: 80, iconType: 'play' },
  { label: 'GUIDES READ', value: '3/4', progressPercent: 75, iconType: 'book' }
];

const LearningProgress: React.FC<LearningProgressProps> = ({ customer }) => {
  const radius = 60;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progressPercent = customer.learningProgress || 80;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

      <div className="lg:col-span-5 flex flex-col">
        <div className="BoxStyle flex flex-col justify-between h-full min-h-[289px] p-6">

          <div className="flex flex-col items-center justify-center flex-1 py-4">
            <div className="relative w-[144px] h-[144px] flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-[#EDF3FD]"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-[#004370]"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              {/* Center Content */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[30px] font-bold text-[#004370] leading-none">
                  {progressPercent}%
                </span>
                <span className="text-[12px] font-semibold text-[#565E74] uppercase tracking-[0.5px] mt-1 text-center max-w-[65px] leading-tight">
                  LEARNING SCORE
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between w-full border-t border-[#EDF3FD] pt-4 mt-auto">
            {progressMeta.map((item, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${item.alignRight ? 'text-right' : ''}`}
              >
                <span className="text-[10px] font-bold text-[#8C90A6] uppercase tracking-[0.5px] mb-1.5 leading-none">
                  {item.label}
                </span>
                <span className="text-[18px] font-bold text-[#191C1E] leading-none">
                  {item.value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Right Column: Mini Stats and AI Recommendations Grid */}
      <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-full min-h-[289px]">
        {miniStats.map((item, idx) => (
          <div key={idx} className="BoxStyle flex flex-col justify-between h-[84px] lg:h-auto">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-[#565E74] uppercase tracking-[0.5px] mb-1 leading-none">
                  {item.label}
                </span>
                <span className="text-[30px] font-bold text-[#191C1E] leading-none">
                  {item.value}
                </span>
              </div>
              <div className="w-11 h-11 rounded-full bg-[#FAFBFE] flex items-center justify-center text-[#004370]">
                {item.iconType === 'play' ? (
                  <PlayCircle className="w-5 h-5 text-[#004370]" />
                ) : (
                  <BookOpenText className="w-5 h-5 text-[#004370]" />
                )}
              </div>
            </div>
            {/* Progress bar */}
            <div className="w-[100px] h-[8px] bg-[#E6E8EA] rounded-full overflow-hidden mt-2">
              <div className="h-full bg-[#004370] rounded-full" style={{ width: `${item.progressPercent}%` }}></div>
            </div>
          </div>
        ))}

        <div className="col-span-2  rounded-[20px] p-5 bg-[#2563EB]/10 border border-[#D0E1FD] p-5 flex flex-col gap-2 justify-center">
          <div className="flex items-center gap-2 text-[#004370]">
            <Sparkles className="w-4 h-4 fill-current shrink-0" />
            <span className="text-[12px] font-semibold tracking-[0.5px] uppercase">
              AI INSIGHT & RECOMMENDATION
            </span>
          </div>
          <p className="text-[14px] font-medium text-[#191C1E] leading-[20px]">
            Customer has completed basic product learning and actively uses lead management features.
            Recommend Workflow Automation training and Reports module walkthrough to achieve full onboarding completion.
          </p>
        </div>
      </div>

    </div>
  );
};

export default LearningProgress;
