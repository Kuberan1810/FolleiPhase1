/**
 * Competitors: the ranked overlap view.
 *
 * A candidate reaches this page long before it has a score - discovery finds
 * it, a cheap screen keeps or drops it, and only then is it crawled and scored.
 * Each card says which of those stages it reached, so a run that stopped early
 * still shows what was found instead of claiming there is nothing.
 */
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { ScoreChip, FitBreakdown, factorsFrom } from '../../Component/FitScore';
import { LinkedInLink, PlaceLabel } from '../../Component/Place';
import { Empty, JobBanner, PageHeader, Pill, card, label } from '../../Component/Page';
import { coirei, type Data } from '../../api/coirei';
import { useProject, stopJob } from './ProjectShell';

/** Plain words for where a candidate stopped in the funnel. */
const STATE_LABEL: Record<string, string> = {
  discovered: 'Not screened yet',
  shortlisted: 'Awaiting analysis',
  filtered: 'Screened out',
  unavailable: 'Could not read site',
  analysed: 'Analysed',
};

/** A candidate's headquarters, from the address its own site declared. */
const hqOf = (row: Data) => {
  const address = (row.data?.addresses || [])[0] || {};
  return { city: address.addressLocality, state: address.addressRegion, country: address.addressCountry };
};

/** What the drawer shows: the row's identity plus everything research stored. */
const details = (row: Data) => ({
  name: row.name, domain: row.domain, state: row.state, score: row.score, ...row.data,
});

export default function Competitors() {
  const { projectId, snapshot, active, current, stage, busy, perform, openEvidence } = useProject();
  const [showAll, setShowAll] = useState(false);
  const [urls, setUrls] = useState('');

  const all = snapshot.competitors;
  const analysed = all.filter((row) => row.state === 'analysed');
  // Ranked results when they exist, otherwise the candidates that survived
  // screening: "no competitors yet" is untrue once discovery has returned 60.
  const best = analysed.length ? analysed : all.filter((row) => row.state === 'shortlisted');
  const visible = showAll ? all : best.slice(0, 10);

  const addUrls = () => {
    const list = urls.split(/[\s,]+/).map((value) => value.trim()).filter(Boolean);
    if (!list.length) return;
    void perform(async () => {
      await coirei.discover(projectId, 'competitors', { urls: list, search: false });
      setUrls('');
    });
  };

  const subtitle = analysed.length
    ? `${analysed.length} analysed of ${all.length} discovered · scores are computed from evidence, not the model`
    : all.length
      ? `${all.length} discovered, none scored yet · open one to see how it was found`
      : 'Discovered competitors are crawled, scored on nine weighted overlap factors, then ranked.';

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Competitors"
        subtitle={subtitle}
        actions={
          <>
            {all.length > 0 && (
              <Pill onClick={() => setShowAll((value) => !value)}>
                {showAll ? 'Best matches' : `All ${all.length}`}
              </Pill>
            )}
            {stage === 'competitors_review' && (
              <Pill tone="dark" disabled={busy || !!active} onClick={() => void perform(() => coirei.act(projectId, 'review_competitors'))}>
                Finish review &amp; build ICP
              </Pill>
            )}
          </>
        }
      />

      <JobBanner
        job={active || current}
        onStop={() => void perform(() => stopJob(active, projectId))}
        onRetry={() => void perform(() => coirei.act(projectId, 'retry'))}
      />

      <div className="space-y-5 px-6 py-5">
        {/* Manual fallback: public search can be blocked or thin. */}
        <div className={`${card} flex flex-wrap items-end gap-3`}>
          <label className="min-w-[240px] flex-1 space-y-1.5">
            <span className="text-[12.5px] font-medium text-[#2C2E31]">Know a competitor we missed?</span>
            <input
              value={urls}
              onChange={(event) => setUrls(event.target.value)}
              placeholder="competitor-one.com, competitor-two.com"
              className="w-full rounded-xl border border-[#E6E6E4] bg-[#F9F9F7] px-3 py-2.5 text-[13.5px] outline-none focus:border-[#7A9601]"
            />
          </label>
          <Pill disabled={busy || !!active || !urls.trim()} onClick={addUrls}>Analyse these</Pill>
        </div>

        {all.length === 0 ? (
          <Empty
            title={active ? 'Finding competitors…' : 'No competitors yet'}
            hint={active
              ? 'Candidates are discovered, cheaply screened, then crawled and scored. This takes a few minutes.'
              : 'Confirm your company profile on Home, or add competitor URLs above.'}
          />
        ) : (
          <>
            {!analysed.length && !active && (
              <p className="text-[13px] text-[#717378]">
                Discovery finished but the scoring pass did not, so these have no score yet.
                Retry the research on Home — every candidate below is kept.
              </p>
            )}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((row: Data) => (
                <article key={row.id} className="flex flex-col gap-3 rounded-[20px] border border-[#E6E6E4] bg-white p-4">
                  <div className="flex w-full items-start justify-between gap-2">
                    <div className="min-w-0">
                      <button
                        onClick={() => openEvidence(details(row))}
                        className="block max-w-full truncate text-left text-[14px] font-semibold text-[#16171A] hover:underline"
                      >
                        {row.name || row.domain}
                      </button>
                      <a
                        href={`https://${row.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-[11.5px] text-[#717378] hover:text-[#7A9601] hover:underline"
                      >
                        {row.domain} <ExternalLink className="size-3" />
                      </a>
                    </div>
                    {row.state === 'analysed'
                      ? <ScoreChip score={row.score} />
                      : <span className="shrink-0 rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-medium text-[#64748B]">
                          {STATE_LABEL[row.state] || row.state}
                        </span>}
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {row.data?.classification && (
                      <span className="rounded-full bg-[#F4F7E6] px-2 py-0.5 text-[10.5px] font-medium capitalize text-[#7A9601]">
                        {label(row.data.classification)}
                      </span>
                    )}
                    <PlaceLabel location={{ headquarters: hqOf(row) }} />
                    <LinkedInLink url={row.data?.linkedin} />
                  </div>

                  {row.state === 'analysed' ? (
                    <FitBreakdown
                      factors={factorsFrom(row.data?.components)}
                      onSelect={(key) => openEvidence({ label: key, ...(row.data?.components?.[key] || {}) })}
                    />
                  ) : row.data?.prefilter?.reason ? (
                    <p className="line-clamp-3 text-[12.5px] leading-relaxed text-[#717378]">
                      {row.data.prefilter.reason}
                    </p>
                  ) : null}

                  <div className="flex gap-2">
                    <Pill tone={row.decision === 'approved' ? 'active' : 'default'} disabled={busy} onClick={() => void perform(() => coirei.reviewCandidate(row.id, 'approved'))}>Approve</Pill>
                    <Pill tone={row.decision === 'rejected' ? 'active' : 'default'} disabled={busy} onClick={() => void perform(() => coirei.reviewCandidate(row.id, 'rejected'))}>Reject</Pill>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
