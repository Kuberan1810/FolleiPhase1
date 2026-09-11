/**
 * CompetitorsTable: Ultra-premium SaaS Competitor Landscape & Overlap Spreadsheet Table UI.
 * Displays competitor brand avatars, market overlap scores, classification badges,
 * positioning summaries, key differentiators, review approvals, and evidence drawers.
 */
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { coirei, type Data } from '../api/coirei';
import { useProject } from '../Pages/project/ProjectShell';

/** A shimmering placeholder for a cell whose value hasn't landed yet. */
function CellShimmer({ width = 'w-20' }: { width?: string }) {
  return <span className={`inline-block h-3.5 ${width} animate-pulse rounded-full bg-[#F1F5F9]`} />;
}

/** A candidate's headquarters, from the address its own site declared. */
export const hqOf = (row: Data) => {
  const address = (row.data?.addresses || [])[0] || {};
  return { city: address.addressLocality, state: address.addressRegion, country: address.addressCountry };
};

export interface CompetitorsTableProps {
  embedded?: boolean;
  title?: string;
  subtitle?: string;
}

export default function CompetitorsTable({
  embedded = false,
  title,
  subtitle,
}: CompetitorsTableProps) {
  const { projectId, snapshot, stage, busy, perform, openEvidence } = useProject();
  const navigate = useNavigate();

  const [urls, setUrls] = useState('');
  const [showAddUrlModal, setShowAddUrlModal] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'high_overlap' | 'direct'>('all');
  const [promptDismissed, setPromptDismissed] = useState(
    () => typeof window !== 'undefined' && localStorage.getItem(`coirei:leadsPrompt:${projectId}`) === 'dismissed',
  );

  const COMPETITOR_SLOTS = 10;
  // Screened out or unreachable: these will never become a listed competitor.
  const DEAD_STATES = new Set(['filtered', 'unavailable']);

  const all = snapshot.competitors;
  const candidates = useMemo(() => all.filter((row) => !DEAD_STATES.has(row.state)), [all]);
  const analysedSorted = useMemo(
    () => candidates.filter((row) => row.state === 'analysed').sort((a, b) => (b.score || 0) - (a.score || 0)),
    [candidates],
  );
  const inProgress = useMemo(() => candidates.filter((row) => row.state !== 'analysed'), [candidates]);
  // Rows appear the moment they're discovered and fill in as their own
  // analysis completes; the fully-analysed ones settle to the top by score,
  // still-working ones fill the remaining slots below them.
  const topCompetitors = useMemo(
    () => [...analysedSorted, ...inProgress].slice(0, COMPETITOR_SLOTS),
    [analysedSorted, inProgress],
  );
  const stillWorking = topCompetitors.some((row) => row.state !== 'analysed');
  const isAnalysing = all.length > 0 && analysedSorted.length === 0;

  // The competitors phase itself has finished as soon as the workflow stage
  // moves past it -- backend chains straight into the ICP and leads with no
  // human gate, so this is the one moment worth asking "keep exploring, or
  // move on to leads?"
  const competitorsPhaseDone = !['intake', 'company', 'company_review', 'competitors'].includes(stage);
  const showLeadsPrompt = competitorsPhaseDone && analysedSorted.length > 0 && !promptDismissed;

  const dismissPrompt = (goToLeads: boolean) => {
    setPromptDismissed(true);
    try { localStorage.setItem(`coirei:leadsPrompt:${projectId}`, 'dismissed'); } catch { /* best effort */ }
    if (goToLeads) navigate(`/p/${projectId}/leads`);
    else toast.success("Sounds good — I'll keep finding matching leads in the background. Check the Leads tab whenever you're ready.");
  };

  // Filter real competitors
  const visibleRows = useMemo(() => {
    const term = search.trim().toLowerCase();

    return topCompetitors
      .filter((row) => {
        if (activeTab === 'high_overlap') return (row.score || 0) >= 80;
        if (activeTab === 'direct') return String(row.data?.classification || '').toLowerCase().includes('direct');
        return true;
      })
      .filter((row) => !term || `${row.name || ''} ${row.domain}`.toLowerCase().includes(term));
  }, [topCompetitors, search, activeTab]);

  const addUrls = () => {
    const list = urls.split(/[\s,]+/).map((value) => value.trim()).filter(Boolean);
    if (!list.length) return;
    void perform(async () => {
      await coirei.discover(projectId, 'competitors', { urls: list, search: false });
      setUrls('');
      setShowAddUrlModal(false);
      toast.success(`Analyzing ${list.length} custom competitor URL(s)`);
    });
  };

  const exportCompetitorsCsv = () => {
    if (!visibleRows.length) {
      toast.error('No competitors to export');
      return;
    }
    const rowsToExport = visibleRows.map((r) => {
      const hq = hqOf(r);
      return {
        Name: r.name || r.domain,
        Domain: r.domain,
        Location: [hq.city, hq.state, hq.country].filter(Boolean).join(', ') || '',
        MarketOverlap: `${Math.round(r.score || 0)}%`,
        Classification: r.data?.classification ? String(r.data.classification).replace(/_/g, ' ') : '',
        Positioning: r.data?.summary || r.data?.prefilter?.reason || '',
        Differentiators: r.data?.differences || '',
      };
    });

    const headers = ['Name', 'Domain', 'Location', 'MarketOverlap', 'Classification', 'Positioning', 'Differentiators'];
    const csvContent = [
      headers.join(','),
      ...rowsToExport.map((row) =>
        headers
          .map((h) => {
            const val = String((row as any)[h] || '').replace(/"/g, '""');
            return `"${val}"`;
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `competitors_${projectId || 'export'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Exported competitors CSV');
  };

  const totalCount = topCompetitors.length;

  return (
    <div className="w-full space-y-4">
      {/* Top Header & Table Controls Bar */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
                {title || (embedded ? 'Competitor Landscape' : 'Competitors')}
              </h2>
              <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-semibold text-[#475569]">
                {totalCount} competitors
              </span>
              <span className="rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-semibold text-[#059669]">
                {analysedSorted.length} analysed
              </span>
              {stillWorking && (
                <span className="rounded-full bg-[#FFF7ED] px-2.5 py-0.5 text-[11px] font-semibold text-[#C2410C] animate-pulse">
                  Ranking…
                </span>
              )}
            </div>
            <p className="mt-1 text-[12.5px] text-[#64748B]">
              {subtitle || 'Ranked market overlap, key differentiators, pricing models & target audience comparison.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddUrlModal((v) => !v)}
              className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#0F172A] shadow-sm transition-all hover:border-[#CBD5E1] hover:bg-[#F8FAFC] cursor-pointer"
            >
              + Add Competitor
            </button>

            <button
              onClick={exportCompetitorsCsv}
              className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#475569] shadow-sm transition-all hover:border-[#CBD5E1] hover:bg-[#F8FAFC] cursor-pointer"
            >
              Export
            </button>

            {embedded && (
              <Link
                to={`/p/${projectId}/competitors`}
                className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#475569] shadow-sm transition-all hover:bg-[#F8FAFC]"
              >
                All Competitors →
              </Link>
            )}
          </div>
        </div>

        {/* Inline Add Competitor URL Form */}
        {showAddUrlModal && (
          <div className="mt-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-semibold text-[#0F172A]">Add custom competitor URLs to analyze</span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addUrls();
              }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <input
                value={urls}
                onChange={(e) => setUrls(e.target.value)}
                placeholder="competitor1.com, competitor2.com"
                className="flex-1 min-w-[280px] rounded-lg border border-[#CBD5E1] bg-white px-3.5 py-2 text-[13px] text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]"
              />
              <button
                type="submit"
                disabled={busy || !urls.trim()}
                className="rounded-lg bg-[#0F172A] px-4 py-2 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-[#1E293B] disabled:opacity-50"
              >
                {busy ? 'Analyzing…' : 'Analyze Competitors'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddUrlModal(false)}
                className="rounded-lg border border-[#E2E8F0] bg-white px-3 py-2 text-[12.5px] text-[#64748B] hover:bg-[#F8FAFC]"
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* Filter Tabs & Search Bar */}
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-t border-[#F1F5F9] pt-3.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setActiveTab('all')}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              All Competitors
            </button>
            <button
              onClick={() => setActiveTab('high_overlap')}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${
                activeTab === 'high_overlap'
                  ? 'bg-[#059669] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              High Overlap (80%+)
            </button>
            <button
              onClick={() => setActiveTab('direct')}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${
                activeTab === 'direct'
                  ? 'bg-[#E11D48] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              Direct Competitors
            </button>
          </div>

          <div className="relative min-w-[220px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search competitors or tags..."
              className="w-full rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] py-1.5 px-3 text-[12.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none transition-all focus:border-[#0F172A] focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Main Rich Table UI */}
      <div className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="overflow-x-auto leads-table-scroll">
          <table className="w-full border-collapse text-left">
            {/* Table Header */}
            <thead>
              <tr className="border-b border-[#E2E8F0] bg-[#F8FAFC] text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                <th className="min-w-[200px] px-4 py-3">Competitor</th>
                <th className="min-w-[130px] px-4 py-3">Headquarters</th>
                <th className="min-w-[130px] px-4 py-3">Market Overlap</th>
                <th className="min-w-[160px] px-4 py-3">Classification</th>
                <th className="min-w-[260px] px-4 py-3">Positioning &amp; Offering</th>
                <th className="min-w-[220px] px-4 py-3">Differentiators</th>
                <th className="w-24 px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#F1F5F9] text-[13px]">
              {visibleRows.length > 0 ? (
                visibleRows.map((row) => {
                  const score = Math.round(row.score || 0);
                  const hq = hqOf(row);
                  const locationText = [hq.city, hq.state, hq.country].filter(Boolean).join(', ') || '';
                  // Overlap, classification, positioning and differentiators all
                  // come out of the same assessment call, so they land together
                  // as soon as this row finishes analysis -- shimmer as one unit
                  // until then, rather than guessing per-cell readiness.
                  const analysed = row.state === 'analysed';

                  return (
                    <tr
                      key={row.id}
                      className="transition-colors duration-150 hover:bg-[#F8FAFC]/80"
                    >
                      {/* Competitor -- known the moment it's discovered */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEF2F6] to-[#E2E8F0] font-bold text-[#334155] shadow-xs text-[13px]">
                            {(row.name || row.domain || 'C').charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <button
                              onClick={() => openEvidence({ name: row.name, domain: row.domain, ...row.data })}
                              className="block truncate font-semibold text-[#0F172A] hover:text-[#0284C7] hover:underline text-left cursor-pointer"
                            >
                              {row.name || row.domain}
                            </button>
                            <a
                              href={`https://${row.domain}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center text-[11.5px] text-[#64748B] hover:text-[#0F172A]"
                            >
                              {row.domain}
                            </a>
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="px-4 py-3.5">
                        {analysed ? (
                          <span className="text-[12.5px] text-[#475569] truncate block">{locationText || '—'}</span>
                        ) : (
                          <CellShimmer width="w-24" />
                        )}
                      </td>

                      {/* Market Overlap Score */}
                      <td className="px-4 py-3.5">
                        {analysed ? (
                          <button
                            onClick={() => openEvidence({ name: row.name, domain: row.domain, ...row.data })}
                            className="cursor-pointer font-normal text-[#0F172A] text-[13px] hover:text-[#059669] hover:underline"
                          >
                            {score}% Overlap
                          </button>
                        ) : (
                          <CellShimmer width="w-16" />
                        )}
                      </td>

                      {/* Classification */}
                      <td className="px-4 py-3.5">
                        {analysed ? (
                          <span className="text-[12.5px] font-medium text-[#E11D48]">
                            {row.data?.classification ? String(row.data.classification).replace(/_/g, ' ') : '—'}
                          </span>
                        ) : (
                          <CellShimmer width="w-20" />
                        )}
                      </td>

                      {/* Positioning & Offering */}
                      <td className="px-4 py-3.5">
                        {analysed ? (
                          <p className="line-clamp-2 text-[12.5px] leading-relaxed text-[#334155]">
                            {row.data?.summary || row.data?.prefilter?.reason || '—'}
                          </p>
                        ) : (
                          <div className="space-y-1.5">
                            <CellShimmer width="w-full" />
                            <CellShimmer width="w-3/4" />
                          </div>
                        )}
                      </td>

                      {/* Differentiators -- a single sentence from the model, not a list */}
                      <td className="px-4 py-3.5">
                        {analysed ? (
                          <p className="line-clamp-2 text-[12.5px] leading-relaxed text-[#334155]">
                            {row.data?.differences || <span className="text-[#94A3B8]">—</span>}
                          </p>
                        ) : (
                          <CellShimmer width="w-full" />
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {row.data?.linkedin && (
                            <a
                              href={row.data.linkedin}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg px-2 py-1 text-[11.5px] font-medium text-[#0A66C2] bg-[#F0F9FF] border border-[#E0F2FE] hover:bg-[#E0F2FE]"
                            >
                              LinkedIn
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : isAnalysing ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#64748B] text-[13px]">
                    Ranking {all.length} discovered domains — the top {COMPETITOR_SLOTS} will appear here as they're analysed.
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-[#64748B] text-[13px]">
                    No competitors found. Use &quot;+ Add Competitor&quot; or message coirei to analyze competitors.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Table Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
          <div className="flex items-center gap-2 text-[12.5px] text-[#64748B]">
            <span>
              Showing <strong className="text-[#0F172A]">{visibleRows.length}</strong> of{' '}
              <strong className="text-[#0F172A]">{totalCount}</strong> competitors
            </span>
          </div>
        </div>
      </div>

      {/* "Your top competitors are ready" prompt -- appears once, the moment
          the competitors phase finishes. Leads keep being found in the
          background either way; this only decides whether to switch pages. */}
      {showLeadsPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4" role="dialog" aria-modal="true">
          <div className="w-full max-w-md space-y-4 rounded-2xl bg-white p-6 shadow-2xl">
            <div className="space-y-1.5">
              <h3 className="text-[17px] font-bold text-[#0F172A]">Your top competitors are ready 🎉</h3>
              <p className="text-[13.5px] leading-relaxed text-[#475569]">
                I've ranked your top {analysedSorted.length} competitors. Want me to start finding matching leads
                now, or would you rather dig into these a bit more first?
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => dismissPrompt(false)}
                className="rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-[12.5px] font-medium text-[#475569] shadow-sm transition-all hover:bg-[#F8FAFC] cursor-pointer"
              >
                Not yet, keep exploring
              </button>
              <button
                type="button"
                onClick={() => dismissPrompt(true)}
                className="rounded-xl bg-[#0F172A] px-4 py-2 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-[#1E293B] cursor-pointer"
              >
                Yes, find leads →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
