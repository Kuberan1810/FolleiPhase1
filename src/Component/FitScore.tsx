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
  score >= 60 ? { bar: '#7A9601', chip: 'bg-[#F4F7E6] text-[#7A9601]' }
  : score >= 30 ? { bar: '#D97706', chip: 'bg-amber-50 text-amber-700' }
  : { bar: '#CBD5E1', chip: 'bg-[#F1F5F9] text-[#64748B]' };

/** Compact score: the number, and a bar showing it out of 100. */
export function FitScore({ score, size = 'md' }: { score: number; size?: 'sm' | 'md' }) {
  const value = Math.round(score || 0);
  const tone = toneOf(value);
  return (
    <span className="inline-flex items-center gap-2" title={`Fit score ${value} of 100`}>
      <span className={`${size === 'sm' ? 'text-[12.5px]' : 'text-[14px]'} font-semibold tabular-nums text-[#16171A]`}>{value}</span>
      <span className={`${size === 'sm' ? 'w-10' : 'w-16'} h-1.5 overflow-hidden rounded-full bg-[#EFEFE9]`}>
        <span className="block h-full rounded-full " style={{ width: `${value}%`, background: tone.bar }} />
      </span>
    </span>
  );
}

/** A score chip for headers and cards. */
export function ScoreChip({ score }: { score: number }) {
  const value = Math.round(score || 0);
  return <span className={`rounded-full px-2.5 py-0.5 text-[11.5px] font-medium tabular-nums ${toneOf(value).chip}`}>{value}/100</span>;
}

/**
 * Why the score is what it is: one row per weighted factor, ordered by the
 * points actually earned so the strongest reasons read first.
 */
export function FitBreakdown({ factors, onSelect }: { factors: Factor[]; onSelect?: (key: string) => void }) {
  const usable = [...factors].filter((factor) => factor.weight > 0).sort((a, b) => b.points - a.points || b.weight - a.weight);
  if (!usable.length) return null;

  return (
    <ul className="flex flex-col gap-1.5">
      {usable.map((factor) => {
        const ratio = Math.max(0, Math.min(1, factor.points / factor.weight));
        const match = factor.match ?? (ratio >= 0.999 ? 'yes' : ratio > 0 ? 'partial' : 'unknown');
        const colour = match === 'yes' ? '#7A9601' : match === 'partial' ? '#B9CC6B' : '#E2E8F0';
        return (
          <li key={factor.key}>
            <button
              type="button"
              onClick={onSelect ? () => onSelect(factor.key) : undefined}
              className={`flex w-full items-center gap-2.5 rounded-lg px-1.5 py-1 text-left ${onSelect ? 'cursor-pointer hover:bg-[#F9F9F7]' : 'cursor-default'}`}
            >
              <span className="w-28 shrink-0 truncate text-[11.5px] capitalize text-[#717378]">{prettify(factor.label)}</span>
              <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#EFEFE9]">
                <span className="block h-full rounded-full" style={{ width: `${ratio * 100}%`, background: colour }} />
              </span>
              <span className="w-12 shrink-0 text-right text-[11px] tabular-nums text-[#9CA3AF]">
                {Math.round(factor.points)}/{factor.weight}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/** Turn a backend candidate's `data.components` map into factor rows. */
export function factorsFrom(components: Record<string, Data> | undefined): Factor[] {
  if (!components) return [];
  return Object.entries(components).map(([key, value]) => ({
    key,
    label: key,
    weight: Number(value?.weight ?? 0),
    points: Number(value?.points ?? 0),
    match: value?.match,
  }));
}

export default FitScore;
