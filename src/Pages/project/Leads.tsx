/**
 * Leads: the AI research spreadsheet. Fixed account columns plus any column the
 * operator asks for in plain language ("get the LinkedIn handles of these
 * companies") — the request is stored as a column definition and every cell
 * keeps its own value, status and evidence.
 */
import { useMemo, useState } from 'react';
import { Download, Sparkles, Trash2, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../Component/ConfirmDialog';
import { FitScore } from '../../Component/FitScore';
import { LinkedInLink, placeText } from '../../Component/Place';
import { Empty, JobBanner, PageHeader, Pill, card, field } from '../../Component/Page';
import { coirei, type Data } from '../../api/coirei';
import { useProject, stopJob } from './ProjectShell';

/** Headquarters string from the address the account's own site declared. */
const hqText = (row: Data) => {
  const address = (row.data?.addresses || [])[0] || {};
  return placeText({ city: address.addressLocality, state: address.addressRegion, country: address.addressCountry });
};

export default function Leads() {
  const { projectId, snapshot, active, current, busy, perform, openEvidence } = useProject();
  const [prompt, setPrompt] = useState('');
  const [search, setSearch] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [sort, setSort] = useState<'score' | 'name'>('score');
  const [hidden, setHidden] = useState<string[]>([]);
  const [columnToDelete, setColumnToDelete] = useState<Data | null>(null);

  const { rows, columns, cells, contacts } = snapshot.sheet;
  const visibleColumns = columns.filter((column) => !hidden.includes(column.id));

  const cellIndex = useMemo(() => {
    const map = new Map<string, Data>();
    for (const cell of cells) map.set(`${cell.candidate_id}:${cell.column_id}`, cell);
    return map;
  }, [cells]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return rows
      .filter((row) => (row.score || 0) >= minScore)
      .filter((row) => !term || `${row.name || ''} ${row.domain}`.toLowerCase().includes(term))
      .sort((a, b) => (sort === 'score' ? (b.score || 0) - (a.score || 0) : (a.name || a.domain).localeCompare(b.name || b.domain)));
  }, [rows, search, minScore, sort]);

  const askForColumn = () => {
    const text = prompt.trim();
    if (!text) return;
    void perform(async () => {
      const result = await coirei.addColumnFromPrompt(projectId, text);
      setPrompt('');
      toast.success(`Added “${result.column.definition.name}” — researching ${visible.length} accounts`);
    });
  };

  const importCsv = (file: File) => {
    void perform(async () => {
      const result = await coirei.importContacts(projectId, file);
      toast.success(`${result.imported.length} imported, ${result.skipped.length} skipped`);
    });
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Leads"
        subtitle={rows.length ? `${rows.length} accounts · ${columns.length} research columns` : 'Accounts matched to your approved ICP.'}
        actions={
          <>
            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3.5 py-1.5 text-[12.5px] text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]">
              <Upload className="size-3.5" /> Import contacts
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
              className="inline-flex items-center gap-1.5 rounded-full border border-[#E2E8F0] bg-white px-3.5 py-1.5 text-[12.5px] text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
            >
              <Download className="size-3.5" /> Export CSV
            </a>
          </>
        }
      />

      <JobBanner
        job={active || current}
        onStop={() => void perform(() => stopJob(active, projectId))}
        onRetry={() => void perform(() => coirei.act(projectId, 'retry'))}
      />

      <div className="space-y-5 px-6 py-5">
        {/* Ask for a new research column in plain language. */}
        <form
          className={`${card} flex flex-wrap items-end gap-3`}
          onSubmit={(event) => { event.preventDefault(); askForColumn(); }}
        >
          <label className="min-w-[280px] flex-1 space-y-1.5">
            <span className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#2C2E31]">
              <Sparkles className="size-3.5 text-[#7A9601]" /> Add a research column
            </span>
            <input
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Get the LinkedIn handles of these companies"
              className={field}
            />
          </label>
          <Pill type="submit" tone="dark" disabled={busy || !!active || !prompt.trim() || !rows.length}>
            {busy ? 'Researching…' : 'Research it'}
          </Pill>
        </form>

        {rows.length === 0 ? (
          <Empty
            title={active ? 'Finding accounts…' : 'No accounts yet'}
            hint={active
              ? 'Candidates are discovered, filtered against your ICP rules, then crawled and scored.'
              : 'Approve your ICP on Home to discover accounts, or import contacts from a CSV.'}
          />
        ) : (
          <>
            {/* Filter / sort / hide */}
            <div className="flex flex-wrap items-center gap-3">
              <input
                aria-label="Search accounts"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search companies or domains"
                className={`${field} max-w-xs`}
              />
              <label className="flex items-center gap-2 text-[12.5px] text-[#717378]">
                Min fit
                <input
                  aria-label="Minimum fit score"
                  type="number"
                  min={0}
                  max={100}
                  value={minScore}
                  onChange={(event) => setMinScore(Number(event.target.value))}
                  className="w-20 rounded-xl border border-[#E6E6E4] bg-[#F9F9F7] px-2 py-1.5 text-[13px] outline-none focus:border-[#7A9601]"
                />
              </label>
              <Pill tone={sort === 'score' ? 'active' : 'default'} onClick={() => setSort('score')}>Sort by fit</Pill>
              <Pill tone={sort === 'name' ? 'active' : 'default'} onClick={() => setSort('name')}>Sort by name</Pill>
              {columns.map((column) => (
                <Pill
                  key={column.id}
                  tone={hidden.includes(column.id) ? 'default' : 'active'}
                  onClick={() => setHidden((list) => list.includes(column.id) ? list.filter((id) => id !== column.id) : [...list, column.id])}
                >
                  {column.definition.name}
                </Pill>
              ))}
            </div>

            <div className="overflow-x-auto rounded-[16px] border border-[#E5E7EB] bg-white">
              <table className="w-full border-collapse text-left">
                <thead className="bg-[#F8F9FA] text-[11px] uppercase tracking-wide text-[#6B7280]">
                  <tr>
                    <th className="px-5 py-3">Company</th>
                    <th className="px-5 py-3">Location</th>
                    <th className="px-5 py-3">Fit score</th>
                    {visibleColumns.map((column) => (
                      <th key={column.id} className="min-w-52 px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="flex-1" title={column.definition.instruction}>{column.definition.name}</span>
                          <button
                            aria-label={`Delete ${column.definition.name} column`}
                            onClick={() => setColumnToDelete(column)}
                            className="text-[#9CA3AF] hover:text-red-600"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EC]">
                  {visible.map((row) => (
                    <tr key={row.id} className="align-top hover:bg-[#FDFDFC]">
                      <td className="px-5 py-4">
                        <button onClick={() => openEvidence(row.data)} className="cursor-pointer text-[13.5px] font-medium text-[#16171A] hover:underline">
                          {row.name || row.domain}
                        </button>
                        <p className="text-[11.5px] text-[#717378]">{row.domain}</p>
                        {contacts.filter((contact) => contact.candidate_id === row.id).map((contact) => (
                          <p key={contact.id} className="mt-1 text-[11.5px] text-[#717378]">{contact.email} · {contact.status}</p>
                        ))}
                        <LinkedInLink url={row.data?.linkedin} className="mt-1" />
                      </td>
                      <td className="px-5 py-4 text-[12.5px] text-[#717378]">{hqText(row) || '—'}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => openEvidence(row.data)} className="flex cursor-pointer items-center gap-2">
                          <FitScore score={row.score || 0} size="sm" />
                          <span className="text-[13px] text-[#16171A]">{Math.round(row.score || 0)}</span>
                        </button>
                      </td>
                      {visibleColumns.map((column) => {
                        const cell = cellIndex.get(`${row.id}:${column.id}`);
                        return (
                          <td key={column.id} className="min-w-52 px-5 py-4">
                            {cell ? (
                              <button onClick={() => openEvidence(cell.data)} className="cursor-pointer text-left text-[13px] text-[#16171A] hover:underline">
                                {cell.state === 'running'
                                  ? <span className="text-[#717378]">Researching…</span>
                                  : cell.data?.display_value || cell.state}
                              </button>
                            ) : (
                              <span className="text-[12.5px] text-[#9CA3AF]">Not researched</span>
                            )}
                            <div className="mt-1.5">
                              <Pill
                                disabled={busy || !!active}
                                onClick={() => void perform(() => coirei.runCells(projectId, [row.id], [column.id], Boolean(cell)))}
                              >
                                {cell ? 'Re-run' : 'Research'}
                              </Pill>
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              {visible.length === 0 && (
                <p className="px-6 py-10 text-center text-[13px] text-[#717378]">No accounts match these filters.</p>
              )}
            </div>
          </>
        )}
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
