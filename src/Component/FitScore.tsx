/**
 * Score display for competitors and leads.
 *
 * Deliberately not a chart: a score is one number plus a short list of reasons,
 * so it reads as a number with a bar, and the breakdown reads as labelled rows.
 * Every factor row is clickable and opens the evidence behind it.
 */
import type { Data } from '../api/coirei';

export interface Factor {
  key: string;
  label: string;
  weight: number;
  points: number;
  match?: 'yes' | 'partial' | 'no' | 'unknown';
}

const prettify = (value: string) => value.replace(/_/g, ' ').replace(/\bicp\b/i, 'ICP');

/** Green when it is a strong fit, amber mid, grey when unevidenced. */
const toneOf = (score: number) =>
  score >= 80
    ? { bar: '#059669', chip: 'bg-[#ECFDF5] text-[#059669] border-[#BBF7D0]' }
    : score >= 40
    ? { bar: '#0284C7', chip: 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]' }
    : { bar: '#94A3B8', chip: 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]' };

/** Compact score: the number, and a bar showing it out of 100. */
export function FitScore({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' }) {
  const value = Math.round(score || 0);
  const tone = toneOf(value);
  return (
    <span className="inline-flex items-center gap-2" title={`Fit score ${value} of 100`}>
      <span className={`${size === 'sm' ? 'text-[12px]' : 'text-[13.5px]'} font-semibold tabular-nums text-[#0F172A]`}>{value}</span>
      <span className={`${size === 'sm' ? 'w-8' : 'w-14'} h-1.5 overflow-hidden rounded-full bg-[#E2E8F0]`}>
        <span className="block h-full rounded-full transition-all duration-300" style={{ width: `${Math.max(value, 5)}%`, background: tone.bar }} />
      </span>
    </span>
  );
}

/** A score chip for headers and cards. */
export function ScoreChip({ score }: { score: number }) {
  const value = Math.round(score || 0);
  const tone = toneOf(value);
  return (
    <span className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[12px] font-semibold tabular-nums shadow-2xs ${tone.chip}`}>
      {value}/100 Fit
    </span>
  );
}

/**
 * Why the score is what it is: one row per weighted factor, ordered by the
 * points actually earned so the strongest reasons read first.
 */
export function FitBreakdown({ factors, onSelect }: { factors: Factor[]; onSelect?: (key: string) => void }) {
  const usable = [...factors].filter((factor) => factor.weight > 0).sort((a, b) => b.points - a.points || b.weight - a.weight);
  if (!usable.length) return null;

  return (
    <ul className="flex flex-col gap-2.5">
      {usable.map((factor) => {
        const ratio = Math.max(0, Math.min(1, factor.points / factor.weight));
        const fillColour = ratio >= 0.8 ? '#059669' : ratio >= 0.4 ? '#0284C7' : '#94A3B8';
        return (
          <li key={factor.key}>
            <button
              type="button"
              onClick={onSelect ? () => onSelect(factor.key) : undefined}
              className={`flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-left transition-all ${
                onSelect ? 'cursor-pointer hover:bg-[#F8FAFC]' : 'cursor-default'
              }`}
            >
              <span className="w-32 shrink-0 truncate text-[12px] font-medium text-[#475569]">{prettify(factor.label)}</span>
              <span className="h-2 flex-1 overflow-hidden rounded-full bg-[#F1F5F9] border border-[#E2E8F0]">
                <span
                  className="block h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.max(ratio * 100, 3)}%`, background: fillColour }}
                />
              </span>
              <span className="w-12 shrink-0 text-right text-[11.5px] font-semibold tabular-nums text-[#64748B]">
                {Math.round(factor.points)}/{factor.weight}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

const DEFAULT_BREAKDOWN_FACTORS: Factor[] = [
  { key: 'geography', label: 'Geography', weight: 5, points: 0 },
  { key: 'growth_signal', label: 'Growth Signal', weight: 5, points: 0 },
  { key: 'buyer_accessibility', label: 'Buyer Accessibility', weight: 5, points: 0 },
];

/** Turn a backend candidate's `data.components` map into factor rows. */
export function factorsFrom(components: Record<string, Data> | undefined): Factor[] {
  if (!components || Object.keys(components).length === 0) {
    return DEFAULT_BREAKDOWN_FACTORS;
  }
  const result = Object.entries(components).map(([key, value]) => ({
    key,
    label: key,
    weight: Number(value?.weight ?? 5),
    points: Number(value?.points ?? 0),
    match: value?.match,
  }));
  return result.length > 0 ? result : DEFAULT_BREAKDOWN_FACTORS;
}

export default FitScore;
