/**
 * Shared furniture for the non-chat project pages, in the Follei visual
 * language: page header, empty / loading / error states, the research progress
 * banner, and the evidence drawer every score and cell links into.
 */
import type { ReactNode } from 'react';
import { AlertCircle, ExternalLink, X } from 'lucide-react';
import { FitBreakdown, ScoreChip, factorsFrom } from './FitScore';
import type { Data } from '../api/coirei';

export const card =
  'rounded-[24px] border border-[#E6E6E4] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)]';
export const field =
  'w-full rounded-xl border border-[#E6E6E4] bg-[#F9F9F7] px-3 py-2.5 text-[13.5px] text-[#16171A] outline-none focus:border-[#7A9601]';
export const label = (value: string) => value.replace(/_/g, ' ');
export const show = (value: unknown) =>
  value === null || value === undefined ? 'Unknown' : typeof value === 'string' ? value : JSON.stringify(value);

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 border-b border-[#EBEBE8] px-6 py-5">
      <div className="min-w-0">
        <h1 className="text-[20px] font-semibold tracking-tight text-[#16171A]">{title}</h1>
        {subtitle && <p className="mt-1 text-[13px] text-[#717378]">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function Pill({
  children, onClick, tone = 'default', disabled, title, type = 'button',
}: {
  children: ReactNode; onClick?: () => void; tone?: 'default' | 'active' | 'dark' | 'danger';
  disabled?: boolean; title?: string; type?: 'button' | 'submit';
}) {
  const tones = {
    default: 'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]',
    active: 'border-[#7A9601] bg-[#F4F7E6] text-[#7A9601] font-medium',
    dark: 'border-[#16171A] bg-[#16171A] text-white hover:bg-black font-medium',
    danger: 'border-[#FECACA] bg-white text-[#DC2626] hover:bg-red-50 font-medium',
  };
  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] ${tones[tone]} ${ disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer '
      }`}
    >
      {children}
    </button>
  );
}

export function Empty({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-[24px] border border-dashed border-[#E6E6E4] bg-[#FDFDFC] px-6 py-16 text-center">
      <p className="text-[15px] font-medium text-[#16171A]">{title}</p>
      {hint && <p className="max-w-md text-[13px] text-[#717378]">{hint}</p>}
      {action}
    </div>
  );
}

export function Loading({ label: text = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 px-6 py-16 text-[13.5px] text-[#717378]">
      {text}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="mx-6 my-4 flex flex-wrap items-center gap-3 rounded-2xl border border-[#FECACA] bg-red-50 px-4 py-3 text-[13px] text-[#B91C1C]">
      <AlertCircle className="size-4 shrink-0" />
      <span className="flex-1">{message}</span>
      {onRetry && <Pill onClick={onRetry}>Retry</Pill>}
    </div>
  );
}

/** Live research banner: current step, plus stop / retry for the active job. */
export function JobBanner({ job, onStop, onRetry }: { job?: Data; onStop?: () => void; onRetry?: () => void }) {
  if (!job) return null;
  const running = job.status === 'queued' || job.status === 'running';
  if (running) {
    const step = label(job.progress?.step || 'Researching');
    const counts = [
      job.progress?.discovered && `${job.progress.discovered} found`,
      job.progress?.analysed && `${job.progress.analysed} analysed`,
    ].filter(Boolean).join(' · ');
    return (
      <div className="mx-6 my-4 flex flex-wrap items-center gap-3 rounded-2xl border border-[#E6E6E4] bg-white px-4 py-3 text-[13px] text-[#16171A]" aria-live="polite">
        <span className="flex-1 capitalize">{step}{counts && <span className="text-[#717378]"> — {counts}</span>}</span>
        {onStop && <Pill onClick={onStop}>Stop</Pill>}
      </div>
    );
  }
  if (job.status === 'failed' || job.status === 'cancelled') {
    return <ErrorState message={job.error || 'Research stopped. Your project is saved.'} onRetry={onRetry} />;
  }
  return null;
}

/**
 * Evidence drawer. Anything with a `components` map also renders its orange
 * slice, so a score can be opened straight into the reasoning behind it.
 */
export function EvidenceDrawer({ data, onClose, onSegment }: { data: Data | null; onClose: () => void; onSegment?: (key: string) => void }) {
  if (!data) return null;
  return (
    <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose}>
      <aside
        role="dialog"
        aria-label="Evidence"
        className="absolute right-0 top-0 bottom-0 w-full max-w-lg space-y-4 overflow-auto bg-white p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold text-[#16171A]">{data.name || data.domain || 'Sources and reasoning'}</h2>
            {data.domain && (
              <a href={`https://${data.domain}`} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-1 text-[12.5px] text-[#7A9601] hover:underline">
                {data.domain} <ExternalLink className="size-3" />
              </a>
            )}
          </div>
          <button onClick={onClose} aria-label="Close evidence" className="shrink-0 rounded-lg p-1 text-[#717378] hover:bg-black/5">
            <X className="size-4" />
          </button>
        </div>

        {/* Why this candidate is in the list at all. Present long before any
            score exists, which is most of a research run. */}
        {data.discovery && (
          <section className="space-y-2 rounded-[20px] border border-[#E6E6E4] bg-[#FDFDFC] p-4">
            <h3 className="text-[12.5px] font-medium text-[#16171A]">How we found it</h3>
            {data.discovery.title && <p className="text-[13px] text-[#16171A]">{data.discovery.title}</p>}
            {data.discovery.snippet && <p className="text-[12.5px] leading-relaxed text-[#717378]">{data.discovery.snippet}</p>}
            {data.discovery.query && (
              <p className="text-[11.5px] text-[#9CA3AF]">Search: “{data.discovery.query}”</p>
            )}
            {data.discovery.manual_url && (
              <p className="text-[11.5px] text-[#9CA3AF]">Added manually</p>
            )}
          </section>
        )}

        {/* The cheap screen that decided whether to spend a full analysis. */}
        {data.prefilter && (
          <section className="space-y-2 rounded-[20px] border border-[#E6E6E4] bg-[#FDFDFC] p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-[12.5px] font-medium text-[#16171A]">Screening</h3>
              <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
                data.prefilter.eligible ? 'bg-[#F4F7E6] text-[#7A9601]' : 'bg-[#F1F5F9] text-[#64748B]'}`}>
                {data.prefilter.eligible ? 'Passed' : 'Filtered out'}
                {typeof data.prefilter.priority === 'number' ? ` · ${data.prefilter.priority}` : ''}
              </span>
            </div>
            {data.prefilter.reason && (
              <p className="text-[12.5px] leading-relaxed text-[#717378]">{data.prefilter.reason}</p>
            )}
          </section>
        )}

        {data.components && (
          <div className="space-y-3 rounded-[20px] border border-[#E6E6E4] bg-[#FDFDFC] p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12.5px] font-medium text-[#16171A]">Fit score</span>
              <div className="flex items-center gap-2">
                {data.classification && (
                  <span className="rounded-full bg-[#F4F7E6] px-2.5 py-0.5 text-[11px] font-medium capitalize text-[#7A9601]">
                    {label(data.classification)}
                  </span>
                )}
                <ScoreChip score={data.score || 0} />
              </div>
            </div>
            <FitBreakdown factors={factorsFrom(data.components)} onSelect={onSegment} />
          </div>
        )}

        {(data.summary || data.differences || data.reason) && (
          <div className="space-y-2 text-[13.5px] text-[#717378]">
            {data.summary && <p>{data.summary}</p>}
            {data.differences && <p><b className="text-[#16171A]">Differences: </b>{data.differences}</p>}
            {data.reason && <p><b className="text-[#16171A]">{label(data.label || 'Reason')}: </b>{data.reason}</p>}
          </div>
        )}

        {Array.isArray(data.evidence) && data.evidence.length > 0 && (
          <div className="space-y-3">
            {data.evidence.map((item: Data, index: number) => (
              <blockquote key={index} className="border-l-2 border-[#7A9601] pl-3 text-[13px] text-[#16171A]">
                “{item.quote}”
                {/^https?:\/\//i.test(item.source_url || '') && (
                  <a className="mt-1 block break-all text-[12px] text-[#7A9601] hover:underline" href={item.source_url} target="_blank" rel="noreferrer">
                    {item.source_url}
                  </a>
                )}
              </blockquote>
            ))}
          </div>
        )}

        {(data.linkedin || (data.emails || []).length > 0 || (data.addresses || []).length > 0) && (
          <section className="space-y-2 rounded-[20px] border border-[#E6E6E4] bg-[#FDFDFC] p-4">
            <h3 className="text-[12.5px] font-medium text-[#16171A]">Contact details found</h3>
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer"
                 className="inline-flex items-center gap-1 text-[12.5px] text-[#0A66C2] hover:underline">
                LinkedIn <ExternalLink className="size-3" />
              </a>
            )}
            {(data.emails || []).length > 0 && (
              <ul className="space-y-0.5">
                {(data.emails as Data[]).slice(0, 8).map((entry) => (
                  <li key={entry.email}>
                    <a href={`mailto:${entry.email}`} className="text-[12.5px] text-[#16171A] hover:underline">{entry.email}</a>
                  </li>
                ))}
              </ul>
            )}
            {(data.addresses || []).length > 0 && (
              <p className="text-[12.5px] text-[#717378]">
                {[data.addresses[0].streetAddress, data.addresses[0].addressLocality,
                  data.addresses[0].addressRegion, data.addresses[0].addressCountry]
                  .filter(Boolean).join(', ')}
              </p>
            )}
          </section>
        )}

        <details>
          <summary className="cursor-pointer text-[12px] text-[#717378]">Raw data</summary>
          <pre className="mt-2 whitespace-pre-wrap break-words rounded-xl bg-[#F9F9F7] p-4 text-[11px]">{JSON.stringify(data, null, 2)}</pre>
        </details>
      </aside>
    </div>
  );
}
