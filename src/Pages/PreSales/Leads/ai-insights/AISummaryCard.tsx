import React from 'react';
import { Sparkles } from 'lucide-react';

interface AISummaryCardProps {
  summary?: string;
  recommendation?: string;
  onInsightsClick?: () => void;
}

const AISummaryCard: React.FC<AISummaryCardProps> = ({
  summary = "High-value website lead currently in the Qualified stage with strong engagement and a positive response during the initial call. A product demo is the next step, indicating strong conversion potential.",
  recommendation = "Proceed with scheduling and delivering the demo to move the lead toward the proposal stage.",
  onInsightsClick
}) => {
  return (
    <div className="w-full lg:flex-1 h-[225px] rounded-[12px] bg-linear-to-r from-[#4F46E5] via-[#EC4899] to-[#F97316] p-[2px] shadow-[0_4px_20px_rgba(0,0,0,0.015)]">
      <div className="w-full h-full bg-white rounded-[10px] p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4F46E5]" />
              <h3 className="text-[15px] font-bold text-slate-800 font-manrope">Al summarize</h3>
            </div>
            <button 
              onClick={onInsightsClick}
              className="px-3 py-1 bg-[#004370] hover:bg-[#00355a] text-white text-[10px] font-bold rounded-full uppercase tracking-wider font-manrope cursor-pointer border-none transition-colors"
            >
              AI Insights
            </button>
          </div>

          <p
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '22px',
              color: '#464555',
              textAlign: 'justify'
            }}
          >
            {summary}
          </p>
        </div>

        <p
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '16px',
            lineHeight: '22px',
            color: '#464555',
            textAlign: 'justify'
          }}
        >
          Recommended: <span style={{ fontWeight: 400, fontFamily: 'Inter, sans-serif' }}>{recommendation}</span>
        </p>
      </div>
    </div>
  );
};

export default AISummaryCard;
