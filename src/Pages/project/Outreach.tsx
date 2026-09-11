/**
 * Outreach: work one account at a time. Read what the research actually found,
 * confirm a real contact, then draft a message written from that account's own
 * evidence. Bulk batches live on Campaigns.
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { FitScore, ScoreChip, FitBreakdown, factorsFrom } from '../../Component/FitScore';
import { LinkedInLink, PlaceLabel } from '../../Component/Place';
import { Empty, JobBanner, PageHeader, Pill, card, field, label } from '../../Component/Page';
import { coirei, type Data } from '../../api/coirei';
import { useGmail } from '../../hooks/useProjects';
import { useProject, stopJob } from './ProjectShell';

const SENDABLE = ['provider-verified', 'user-confirmed'];

/** An account's headquarters, from the address its own site declared. */
const hqOf = (row: Data) => {
  const address = (row?.data?.addresses || [])[0] || {};
  return { city: address.addressLocality, state: address.addressRegion, country: address.addressCountry };
};

export default function Outreach() {
  const { projectId, snapshot, active, current, busy, perform, openEvidence } = useProject();
  const gmail = useGmail();
  const { rows, cells, columns, contacts } = snapshot.sheet;

  const sorted = [...rows].sort((a, b) => (b.score || 0) - (a.score || 0));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const account = sorted.find((row) => row.id === selectedId) ?? sorted[0];
  const [draft, setDraft] = useState({ name: '', title: '', email: '' });
  const [instruction, setInstruction] = useState('Introduce our product using the evidence we found, and invite a short conversation.');

  const connection = gmail.data?.find((row) => row.active);
  const accountContacts = contacts.filter((row) => row.candidate_id === account?.id);
  const sendable = accountContacts.filter((row) => SENDABLE.includes(row.status));

  const addContact = () => {
    if (!account || !draft.email.trim()) return;
    void perform(async () => {
      await coirei.addContact(projectId, { candidate_id: account.id, name: draft.name, title: draft.title, email: draft.email, status: 'unverified', verification_note: '' });
      setDraft({ name: '', title: '', email: '' });
      toast.success('Contact added — confirm the address before sending');
    });
  };

  const confirmContact = (contact: Data) => {
    const note = window.prompt(`How did you verify ${contact.email}?`);
    if (note?.trim()) void perform(() => coirei.confirmContact(contact.id, contact.email, note.trim()));
  };

  const startOutreach = () => {
    if (!connection || !sendable.length || !account) return;
    void perform(async () => {
      await coirei.createCampaign(projectId, {
        name: `Outreach · ${account.name || account.domain}`,
        connection_id: connection.id,
        contact_ids: sendable.map((row) => row.id),
        instruction,
      });
      toast.success('Drafting — review and approve it on Campaigns');
    });
  };

  if (!rows.length) {
    return (
      <div className="flex flex-col">
        <PageHeader title="Outreach" subtitle="Analyse one account and write to it from its own evidence." />
        <div className="px-6 py-5">
          <Empty title="No accounts yet" hint="Approve your ICP on Home to discover accounts, then come back to work them one by one." />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Outreach"
        subtitle="One account at a time, personalised from its researched evidence."
        actions={
          connection
            ? <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F7E6] px-3 py-1.5 text-[12px] text-[#7A9601]"><CheckCircle2 className="size-3.5" /> {connection.email}</span>
            : <Pill onClick={() => void perform(async () => {
                const result = await coirei.gmailStart();
                window.open(result.authorization_url, '_blank', 'noopener,noreferrer');
              })}>Connect Gmail</Pill>
        }
      />

      <JobBanner job={active || current} onStop={() => void perform(() => stopJob(active, projectId))} />

      <div className="grid gap-5 px-6 py-5 lg:grid-cols-[260px_1fr]">
        {/* Account picker, ranked by fit. */}
        <aside className="space-y-1.5 lg:max-h-[calc(100vh-220px)] lg:overflow-auto">
          {sorted.map((row) => (
            <button
              key={row.id}
              onClick={() => setSelectedId(row.id)}
              className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left ${ row.id === account?.id ? 'bg-[#EFEFE9]' : 'hover:bg-black/5'
              }`}
            >
              <FitScore score={row.score || 0} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-medium text-[#16171A]">{row.name || row.domain}</span>
                <span className="block truncate text-[11px] text-[#717378]">{row.domain}</span>
              </span>
            </button>
          ))}
        </aside>

        {account && (
          <div className="space-y-5">
            {/* What the research found. */}
            <section className={`${card} space-y-4`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-[17px] font-semibold text-[#16171A]">{account.name || account.domain}</h2>
                  <a href={`https://${account.domain}`} target="_blank" rel="noreferrer" className="text-[12.5px] text-[#7A9601] hover:underline">{account.domain}</a>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <PlaceLabel location={{ headquarters: hqOf(account) }} />
                    <LinkedInLink url={account.data?.linkedin} />
                  </div>
                </div>
                <ScoreChip score={account.score || 0} />
              </div>

              <FitBreakdown
                factors={factorsFrom(account.data?.components)}
                onSelect={(key) => openEvidence({ label: key, ...(account.data?.components?.[key] || {}) })}
              />

              {account.data?.summary && <p className="text-[13.5px] leading-relaxed text-[#2C2E31]">{account.data.summary}</p>}

              <div className="grid gap-3 sm:grid-cols-2">
                {Object.entries(account.data?.components || {})
                  .filter(([, value]) => (value as Data)?.reason)
                  .map(([key, value]) => (
                    <button key={key} onClick={() => openEvidence({ label: key, ...(value as Data) })} className="cursor-pointer rounded-xl bg-[#F9F9F7] p-3 text-left hover:bg-[#F4F4F0]">
                      <div className="text-[11px] uppercase tracking-wide text-[#717378]">{label(key)}</div>
                      <div className="mt-0.5 line-clamp-3 text-[12.5px] text-[#16171A]">{(value as Data).reason}</div>
                    </button>
                  ))}
              </div>

              {columns.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {columns.map((column) => {
                    const cell = cells.find((row) => row.candidate_id === account.id && row.column_id === column.id);
                    return (
                      <button
                        key={column.id}
                        onClick={() => cell && openEvidence(cell.data)}
                        className="rounded-full bg-[#F1F5F9] px-3 py-1 text-[11.5px] text-[#1E293B]"
                      >
                        {column.definition.name}: {cell?.data?.display_value || '—'}
                      </button>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Contacts for this one account. */}
            <section className={`${card} space-y-3`}>
              <h3 className="text-[15px] font-semibold text-[#16171A]">Contacts</h3>
              {accountContacts.length === 0 && (
                <p className="text-[12.5px] text-[#717378]">No contact yet. Add one you have verified — coirei never invents people or addresses.</p>
              )}
              {accountContacts.map((contact) => (
                <div key={contact.id} className="flex flex-wrap items-center gap-3 border-b border-[#F0F0EC] pb-3 last:border-0">
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13.5px] text-[#16171A]">{contact.name || contact.email}</span>
                    <span className="block truncate text-[11.5px] text-[#717378]">{contact.email} · {contact.title || 'no title'} · {contact.status}</span>
                  </span>
                  {!SENDABLE.includes(contact.status) && <Pill onClick={() => confirmContact(contact)}>Confirm email</Pill>}
                </div>
              ))}

              <div className="flex flex-wrap items-end gap-2">
                <input aria-label="Contact name" placeholder="Name" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className={`${field} max-w-[150px]`} />
                <input aria-label="Contact title" placeholder="Title" value={draft.title} onChange={(event) => setDraft({ ...draft, title: event.target.value })} className={`${field} max-w-[150px]`} />
                <input aria-label="Contact email" placeholder="name@company.com" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} className={`${field} max-w-[220px]`} />
                <Pill disabled={busy || !draft.email.trim()} onClick={addContact}>Add contact</Pill>
              </div>
            </section>

            {/* Draft for this account. */}
            <section className={`${card} space-y-3`}>
              <h3 className="text-[15px] font-semibold text-[#16171A]">Write to {account.name || account.domain}</h3>
              <textarea
                aria-label="Message instruction"
                rows={3}
                value={instruction}
                onChange={(event) => setInstruction(event.target.value)}
                className={field}
              />
              {!connection && (
                <p className="flex items-center gap-1.5 text-[12.5px] text-amber-700"><ShieldAlert className="size-3.5" /> Connect Gmail before drafting.</p>
              )}
              {connection && !sendable.length && (
                <p className="flex items-center gap-1.5 text-[12.5px] text-amber-700"><ShieldAlert className="size-3.5" /> Confirm a work email above — unverified addresses cannot be sent to.</p>
              )}
              <div className="flex flex-wrap gap-2">
                <Pill tone="dark" disabled={busy || !!active || !connection || !sendable.length} onClick={startOutreach}>
                  <Mail className="size-3.5" /> Draft message
                </Pill>
                <Link to={`/p/${projectId}/campaigns`} className="inline-flex items-center rounded-full border border-[#E2E8F0] bg-white px-3.5 py-1.5 text-[12.5px] text-[#475569] hover:bg-[#F8FAFC]">
                  Review &amp; send on Campaigns
                </Link>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
