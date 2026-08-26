import React from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import type { BusinessAnalysis } from '../../../api/setup/setup.api';

interface Props {
  analysis: BusinessAnalysis | null;
  isAnalysing: boolean;
  processedCount: number;
  totalCount: number;
}

const Row: React.FC<{ label: string; items: string[] }> = ({ label, items }) =>
  items.length ? (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] font-medium uppercase tracking-wider text-[#717378]">{label}</span>
      <ul className="flex flex-col gap-0.5">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="text-[12.5px] leading-relaxed text-[#2C2E31]">
            • {item}
          </li>
        ))}
      </ul>
    </div>
  ) : null;

/**
 * What Follei actually understood from the uploaded documents. The setup panel
 * used to show only a file count, which said nothing about whether the
 * documents were usable.
 */
export const BusinessAnalysisCard: React.FC<Props> = ({
  analysis,
  isAnalysing,
  processedCount,
  totalCount,
}) => {
  if (isAnalysing && !analysis) {
    return (
      <div className="flex items-center gap-2.5 rounded-2xl border border-[#E6E6E4] bg-white px-4 py-3 text-[12.5px] text-[#717378]">
        <Loader2 className="size-3.5 animate-spin text-[#7A9601]" />
        <span>
          Reading {processedCount} of {totalCount} document{totalCount === 1 ? '' : 's'}...
        </span>
      </div>
    );
  }
  if (!analysis) return null;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-[#E6E6E4] bg-white p-4">
      <div className="flex items-center gap-1.5">
        <Sparkles className="size-3.5 text-[#7A9601]" />
        <span className="text-[11px] font-medium uppercase tracking-wider text-[#717378]">
          What Follei learned
        </span>
      </div>

      <p className="text-[12.5px] leading-relaxed text-[#16171A]">{analysis.summary}</p>

      <Row label="Sells" items={analysis.what_they_sell} />
      {analysis.who_they_sell_to && (
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-[#717378]">To</span>
          <p className="text-[12.5px] text-[#2C2E31]">{analysis.who_they_sell_to}</p>
        </div>
      )}
      <Row label="Pricing" items={analysis.pricing} />
      <Row label="Stands out for" items={analysis.differentiators} />

      {analysis.gaps.length > 0 && (
        <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2">
          <span className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-[#92400E]">
            Follei still needs
          </span>
          <ul className="flex flex-col gap-0.5">
            {analysis.gaps.slice(0, 3).map((gap) => (
              <li key={gap} className="text-[12px] leading-relaxed text-[#78350F]">
                • {gap}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BusinessAnalysisCard;
