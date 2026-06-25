import React from 'react';
import { Sparkles, Info, AlertTriangle } from 'lucide-react';

interface InsightItem {
  type: 'info' | 'warning';
  boldPrefix?: string;
  text: string;
}

const insights: InsightItem[] = [
  {
    type: 'info',
    text: 'Customer logs in weekly and exhibits high engagement with the core dashboard module.'
  },
  {
    type: 'info',
    text: 'Demo video 100% completed; user is ready for advanced technical walkthroughs.'
  },
  {
    type: 'warning',
    boldPrefix: 'Attention: ',
    text: 'Integration setup is still pending. This may hinder long-term retention.'
  }
];

const AiInsights: React.FC = () => {
  return (
    <div className="BoxStyle flex flex-col gap-5 bg-white border border-[#EDF3FD] shadow-[0_4px_20px_rgba(237,243,253,0.3)]">
      <div className="flex items-center gap-3">
        <Sparkles className="w-6 h-6 text-[#004AC6] fill-[#004AC6]" />
        <h3 className="text-[20px] font-bold text-[#191C1E]">AI Insights & Recommendations</h3>
      </div>

      <div className="flex flex-col gap-4">
        {insights.map((item, idx) => {
          const isWarning = item.type === 'warning';
          const bg = isWarning ? 'bg-[#FFDAD6]/20' : 'bg-[#2563EB]/10';

          return (
            <div
              key={idx}
              className={`flex items-start gap-3.5 p-4 rounded-[8px] ${bg} `}
            >
              {isWarning ? (
                <AlertTriangle className="w-3 h-3 text-[#BA1A1A] shrink-0 mt-1" />
              ) : (
                <Info className="w-3 h-3 text-[#004AC6] shrink-0 mt-1" />
              )}
              <p className="text-[14px] font-bold text-[#434655] leading-[22px]">
                {item.boldPrefix && (
                  <span className="font-bold text-[#BA1A1A]">{item.boldPrefix}</span>
                )}
                {item.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AiInsights;
