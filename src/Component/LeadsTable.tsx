/**
 * LeadsTable: Ultra-premium SaaS AI Lead Research Spreadsheet Table UI.
 * Inspired by modern sales intelligence platforms (Clay, Apollo, Linear, Folk).
 * Displays rich company avatars, verified contact badges, ICP match scores,
 * dynamic AI research columns, filtering, sorting, and inline actions.
 */
import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConfirmDialog from './ConfirmDialog';
import { placeText } from './Place';
import { coirei, type Data } from '../api/coirei';
import { useProject } from '../Pages/project/ProjectShell';

export const hqText = (row: Data) => {
  const address = (row.data?.addresses || [])[0] || {};
  return placeText({ city: address.addressLocality, state: address.addressRegion, country: address.addressCountry });
};

export interface LeadsTableProps {
  embedded?: boolean;
  title?: string;
  subtitle?: string;
  showOutreachActions?: boolean;
}

export default function LeadsTable({
  embedded = false,
  title,
  subtitle,
  showOutreachActions = true,
}: LeadsTableProps) {
  const { projectId, snapshot, active, busy, perform, openEvidence } = useProject();
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState('');
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'high_fit' | 'verified'>('all');
  const [hidden, setHidden] = useState<string[]>([]);
  const [columnToDelete, setColumnToDelete] = useState<Data | null>(null);

  const { rows, columns, cells, contacts } = snapshot.sheet;
  const visibleColumns = columns.filter((column) => !hidden.includes(column.id));

  const cellIndex = useMemo(() => {
    const map = new Map<string, Data>();
    for (const cell of cells) map.set(`${cell.candidate_id}:${cell.column_id}`, cell);
    return map;
  }, [cells]);

  // Filter and sort real leads
  const visibleRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows
      .filter((row) => {
        if (activeTab === 'high_fit') return (row.score || 0) >= 80;
        if (activeTab === 'verified') {
          const rowContacts = contacts.filter((c) => c.candidate_id === row.id);
          return rowContacts.some((c) => c.status === 'provider-verified' || c.status === 'verified');
        }
        return true;
      })
      .filter((row) => !term || `${row.name || ''} ${row.domain}`.toLowerCase().includes(term))
      .sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [rows, contacts, search, activeTab]);

  const askForColumn = () => {
    const text = prompt.trim();
    if (!text) return;
    void perform(async () => {
      const result = await coirei.addColumnFromPrompt(projectId, text);
      setPrompt('');
      setShowAddColumnModal(false);
      toast.success(`Added “${result.column.definition.name}” — researching accounts`);
    });
  };

  const importCsv = (file: File) => {
    void perform(async () => {
      const result = await coirei.importContacts(projectId, file);
      toast.success(`${result.imported.length} imported, ${result.skipped.length} skipped`);
    });
  };

  const totalCount = rows.length;

  return (
    <div className="w-full space-y-4">
      {/* Top Header & Table Controls Bar */}
      <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-[16px] font-bold text-[#0F172A] tracking-tight">
                {title || (embedded ? 'Qualified Leads & Accounts' : 'Leads')}
              </h2>
              <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-semibold text-[#475569]">
                {totalCount} accounts
              </span>
              {columns.length > 0 && (
                <span className="rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-semibold text-[#059669]">
                  {columns.length} AI columns
                </span>
              )}
            </div>
            <p className="mt-1 text-[12.5px] text-[#64748B]">
              {subtitle || 'High-intent accounts matched to your ICP with verified decision makers and research.'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddColumnModal((v) => !v)}
              className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#0F172A] shadow-sm transition-all hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
            >
              + Add AI Column
            </button>

            <label className="inline-flex cursor-pointer items-center rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#475569] shadow-sm transition-all hover:border-[#CBD5E1] hover:bg-[#F8FAFC]">
              Import CSV
              <input
                type="file"
                accept=".csv"
                aria-label="Import contacts CSV"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) importCsv(file);
                  event.target.value = '';
                }}
              />
            </label>

            <a
              href={coirei.exportUrl(projectId)}
              className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#475569] shadow-sm transition-all hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
            >
              Export
            </a>

            {embedded && (
              <Link
                to={`/p/${projectId}/leads`}
                className="inline-flex items-center rounded-xl bg-[#0F172A] px-3.5 py-2 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-[#1E293B]"
              >
                Full Spreadsheet →
              </Link>
            )}
          </div>
        </div>

        {/* Inline Add Research Column Accordion */}
        {showAddColumnModal && (
          <div className="mt-3.5 rounded-xl border border-[#D1FAE5] bg-[#ECFDF5]/60 p-3.5 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[13px] font-semibold text-[#065F46]">Ask AI to research a new column</span>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                askForColumn();
              }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. Find the pricing model, tech stack, or LinkedIn handle"
                className="flex-1 min-w-[280px] rounded-lg border border-[#A7F3D0] bg-white px-3.5 py-2 text-[13px] text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#059669] focus:ring-1 focus:ring-[#059669]"
              />
              <button
                type="submit"
                disabled={busy || !prompt.trim()}
                className="rounded-lg bg-[#059669] px-4 py-2 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-[#047857] disabled:opacity-50"
              >
                {busy ? 'Researching…' : 'Research Column'}
              </button>
              <button
                type="button"
                onClick={() => setShowAddColumnModal(false)}
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
              All Leads
            </button>
            <button
              onClick={() => setActiveTab('high_fit')}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${
                activeTab === 'high_fit'
                  ? 'bg-[#059669] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              High Fit (85%+)
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition-all ${
                activeTab === 'verified'
                  ? 'bg-[#0284C7] text-white shadow-sm'
                  : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
              }`}
            >
              Verified Contacts
            </button>

            {columns.map((column) => (
              <button
                key={column.id}
                onClick={() =>
                  setHidden((list) => (list.includes(column.id) ? list.filter((id) => id !== column.id) : [...list, column.id]))
                }
                className={`rounded-lg px-2.5 py-1 text-[11.5px] font-medium transition-all ${
                  hidden.includes(column.id)
                    ? 'border border-[#E2E8F0] bg-white text-[#94A3B8]'
                    : 'bg-[#F0FDF4] text-[#15803D] border border-[#BBF7D0]'
                }`}
              >
                {column.definition.name}
              </button>
            ))}
          </div>

          <div className="relative min-w-[220px]">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search companies or people..."
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
                <th className="min-w-[200px] px-4 py-3">Company</th>
                <th className="min-w-[130px] px-4 py-3">Location</th>
                <th className="min-w-[120px] px-4 py-3">ICP Fit Score</th>
                <th className="min-w-[220px] px-4 py-3">Key Contact</th>
                <th className="min-w-[160px] px-4 py-3">Industry &amp; Signals</th>
                {visibleColumns.map((column) => (
                  <th key={column.id} className="min-w-[180px] px-4 py-3">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className="truncate" title={column.definition.instruction}>
                        {column.definition.name}
                      </span>
                      <button
                        onClick={() => setColumnToDelete(column)}
                        className="text-[#94A3B8] hover:text-red-600 transition-colors text-[11px]"
                        title="Delete column"
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}
                <th className="w-24 px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-[#F1F5F9] text-[13px]">
              {visibleRows.length > 0 ? (
                visibleRows.map((row) => {
                  const rowContacts = contacts.filter((c) => c.candidate_id === row.id);
                  const score = Math.round(row.score || 0);

                  return (
                    <tr
                      key={row.id}
                      className="transition-colors duration-150 hover:bg-[#F8FAFC]/80"
                    >
                      {/* Company */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#EEF2F6] to-[#E2E8F0] font-bold text-[#334155] shadow-xs text-[13px]">
                            {(row.name || row.domain || 'C').charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <button
                              onClick={() => openEvidence(row.data)}
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
                        <span className="text-[12.5px] text-[#475569] truncate block">{hqText(row) || '—'}</span>
                      </td>

                      {/* Fit Score */}
                      <td className="px-4 py-3.5">
                        <button
                          onClick={() => openEvidence(row.data)}
                          className="cursor-pointer font-normal text-[#0F172A] text-[13px] hover:text-[#059669] hover:underline"
                        >
                          {score}% Fit
                        </button>
                      </td>

                      {/* Key Contact */}
                      <td className="px-4 py-3.5">
                        {rowContacts.length > 0 ? (
                          rowContacts.map((contact) => (
                            <div key={contact.id} className="min-w-0">
                              <div className="flex items-center gap-1.5 font-medium text-[#0F172A]">
                                <span className="truncate">{contact.name || contact.email?.split('@')[0] || 'Verified Contact'}</span>
                                {(contact.status === 'provider-verified' || contact.status === 'verified') && (
                                  <span className="rounded bg-[#ECFDF5] px-1.5 py-0.2 text-[10px] font-semibold text-[#059669]">
                                    Verified
                                  </span>
                                )}
                              </div>
                              <div className="text-[11.5px] text-[#64748B] truncate">{contact.email}</div>
                            </div>
                          ))
                        ) : (
                          <span className="text-[12px] text-[#94A3B8]">
                            Enriched via ICP
                          </span>
                        )}
                      </td>

                      {/* Industry / Signals */}
                      <td className="px-4 py-3.5">
                        <span className="inline-flex items-center rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[11.5px] font-medium text-[#334155]">
                          High Match
                        </span>
                      </td>

                      {/* Custom Research Columns */}
                      {visibleColumns.map((column) => {
                        const cell = cellIndex.get(`${row.id}:${column.id}`);
                        return (
                          <td key={column.id} className="min-w-[180px] px-4 py-3.5">
                            {cell ? (
                              <button
                                onClick={() => openEvidence(cell.data)}
                                className="cursor-pointer text-left text-[12.5px] text-[#0F172A] hover:underline"
                              >
                                {cell.state === 'running' ? (
                                  <span className="text-[#0284C7] font-medium">
                                    Researching…
                                  </span>
                                ) : (
                                  cell.data?.display_value || cell.state
                                )}
                              </button>
                            ) : (
                              <button
                                disabled={busy || !!active}
                                onClick={() =>
                                  void perform(() =>
                                    coirei.runCells(projectId, [row.id], [column.id], false)
                                  )
                                }
                                className="inline-flex items-center rounded-md border border-[#E2E8F0] bg-white px-2 py-1 text-[11.5px] font-medium text-[#475569] hover:bg-[#F8FAFC]"
                              >
                                Research
                              </button>
                            )}
                          </td>
                        );
                      })}

                      {/* Action buttons */}
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
                          <button
                            onClick={() => navigate(`/p/${projectId}/outreach`)}
                            className="rounded-lg px-2 py-1 text-[11.5px] font-medium text-[#0F172A] bg-[#F8FAFC] border border-[#E2E8F0] hover:bg-[#F1F5F9]"
                          >
                            Outreach
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6 + visibleColumns.length}
                    className="px-6 py-12 text-center text-[#64748B] text-[13px]"
                  >
                    No leads found yet. Approve your ICP or ask coirei to discover matching leads.
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
              <strong className="text-[#0F172A]">{totalCount}</strong> verified prospects
            </span>
          </div>

          {showOutreachActions && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate(`/p/${projectId}/outreach`)}
                className="inline-flex items-center rounded-xl bg-[#0F172A] px-4 py-2 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-[#1E293B]"
              >
                Draft Batch Outreach
              </button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={Boolean(columnToDelete)}
        onClose={() => setColumnToDelete(null)}
        onConfirm={() => {
          const column = columnToDelete;
          setColumnToDelete(null);
          if (column) void perform(() => coirei.deleteColumn(column.id));
        }}
        title="Delete this column?"
        itemName={columnToDelete?.definition?.name || 'this column'}
        description="Its researched values and evidence are permanently removed from every account."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </div>
  );
}
