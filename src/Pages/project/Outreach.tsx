/**
 * Outreach: work one account at a time. Read what the research actually found,
 * confirm a real contact, then draft a message written from that account's own
 * evidence. Bulk batches live on Campaigns.
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { LinkedInLink, PlaceLabel } from '../../Component/Place';
import { JobBanner, PageHeader, label } from '../../Component/Page';
import { coirei, type Data } from '../../api/coirei';
import { useGmail } from '../../hooks/useProjects';
import { useProject, stopJob } from './ProjectShell';

// Only rendered when the account's own research actually produced a reason
// for this factor -- never a generic placeholder, which would read as real
// for every account regardless of what was actually found.
const STANDARD_FACTOR_KEYS = [
  'problem',
  'industry',
  'geography',
  'company_size',
  'required_icp',
  'buying_intent',
  'growth_signal',
  'technology_fit',
  'buyer_accessibility',
];

/** An account's headquarters, from the address its own site declared. */
const hqOf = (row: Data) => {
  const address = (row?.data?.addresses || [])[0] || {};
  return { city: address.addressLocality, state: address.addressRegion, country: address.addressCountry };
};

export default function Outreach() {
  const { projectId, snapshot, active, current, busy, perform, openEvidence } = useProject();
  const gmail = useGmail();
  const { cells, columns, contacts } = snapshot.sheet;

  // Leads first, competitors if there are no leads yet -- never fabricated
  // accounts just to keep this page from looking empty.
  const sorted = useMemo(() => {
    const list = snapshot.sheet.rows.length > 0 ? snapshot.sheet.rows : snapshot.competitors;
    return [...list].sort((a, b) => (b.score || 0) - (a.score || 0));
  }, [snapshot.sheet.rows, snapshot.competitors]);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const account = sorted.find((row) => row.id === selectedId) ?? sorted[0];
  const [draft, setDraft] = useState({ name: '', title: '', email: '' });
  const [instruction, setInstruction] = useState(
    'Introduce our product using the evidence we found, and invite a short conversation.'
  );

  const connection = gmail.data?.find((row) => row.active);

  // Only contacts research actually found or the operator confirmed -- never
  // an invented hr@domain address standing in for a real one.
  const accountContacts = useMemo(
    () => (account ? contacts.filter((row) => row.candidate_id === account.id) : []),
    [contacts, account],
  );

  const sendable = accountContacts;

  // Summary narrative -- left blank (the section below is hidden) rather than
  // a generic paragraph when the site didn't actually say this.
  const summaryText = account?.data?.summary || account?.data?.description || account?.data?.positioning || '';

  // Compute combined factors for the 2-column grid -- only ones this
  // account's own research actually produced a reason for.
  const factorCards = useMemo(() => {
    if (!account) return [];
    const components = account.data?.components || {};

    return STANDARD_FACTOR_KEYS
      .map((key) => {
        const comp = components[key] as Data | undefined;
        if (!comp?.reason) return null;
        return { key, label: label(key), reason: comp.reason, data: comp };
      })
      .filter(Boolean) as { key: string; label: string; reason: string; data: Data }[];
  }, [account]);

  const addContact = () => {
    if (!account || !draft.email.trim()) return;
    void perform(async () => {
      await coirei.addContact(projectId, {
        candidate_id: account.id,
        name: draft.name,
        title: draft.title,
        email: draft.email,
        status: 'verified',
        verification_note: '',
      });
      setDraft({ name: '', title: '', email: '' });
      toast.success('Contact added');
    });
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

  return (
    <div className="flex flex-col space-y-4">
      <PageHeader
        title="Outreach"
        subtitle="One account at a time, personalised from its researched evidence."
        actions={
          connection ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECFDF5] border border-[#BBF7D0] px-3 py-1.5 text-[12px] font-semibold text-[#059669]">
              <CheckCircle2 className="size-3.5" /> {connection.email}
            </span>
          ) : (
            <button
              onClick={() =>
                void perform(async () => {
                  const result = await coirei.gmailStart();
                  window.open(result.authorization_url, '_blank', 'noopener,noreferrer');
                })
              }
              className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-[#475569] shadow-sm transition-all hover:bg-[#F8FAFC] cursor-pointer"
            >
              Connect Gmail
            </button>
          )
        }
      />

      <JobBanner job={active || current} onStop={() => void perform(() => stopJob(active, projectId))} />

      <div className="grid gap-6 px-6 py-2 lg:grid-cols-[280px_1fr]">
        {/* Left Sidebar Account Picker */}
        <aside className="h-fit rounded-2xl border border-[#E2E8F0] bg-white p-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-1.5 lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto">
          <div className="flex items-center justify-between px-2 py-1 mb-1 text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
            <span>Target Accounts</span>
            <span className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[11px] font-medium text-[#334155]">
              {sorted.length}
            </span>
          </div>

          <div className="space-y-1">
            {sorted.map((row) => {
              const isSelected = row.id === account?.id;
              const score = Math.round(row.score || 0);

              return (
                <button
                  key={row.id}
                  onClick={() => setSelectedId(row.id)}
                  className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F8FAFC] border border-[#CBD5E1] shadow-2xs'
                      : 'bg-white border border-transparent hover:bg-[#F8FAFC] hover:border-[#E2E8F0]'
                  }`}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-[#F1F5F9] text-[12px] font-bold text-[#0F172A]">
                    {score}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[13px] font-semibold text-[#0F172A]">
                      {row.name || row.domain}
                    </span>
                    <span className="block truncate text-[11.5px] text-[#64748B]">
                      {row.domain}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Main Account Details Pane */}
        {account && (
          <div className="space-y-5">
            {/* Main Research & Factor Understanding Card */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-5">
              {/* Account Header */}
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#F1F5F9] pb-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-[18px] font-bold text-[#0F172A] tracking-tight">
                      {account.name || account.domain}
                    </h2>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <a
                      href={`https://${account.domain}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[12.5px] font-medium text-[#64748B] hover:text-[#0F172A] hover:underline"
                    >
                      {account.domain}
                    </a>
                    <PlaceLabel location={{ headquarters: hqOf(account) }} />
                    <LinkedInLink url={account.data?.linkedin} />
                  </div>
                </div>
              </div>

              {/* Narrative Summary Box */}
              {summaryText && (
                <div className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4 text-[13.5px] leading-relaxed text-[#334155]">
                  {summaryText}
                </div>
              )}

              {/* 2-Column Grid of Factor Detail Cards */}
              <div className="grid gap-3 sm:grid-cols-2 pt-1">
                {factorCards.map((cardItem) => (
                  <button
                    key={cardItem.key}
                    type="button"
                    onClick={() => openEvidence({ label: cardItem.key, ...cardItem.data })}
                    className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-4 text-left transition-all hover:border-[#CBD5E1] hover:bg-white hover:shadow-xs cursor-pointer"
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B]">
                      {cardItem.label}
                    </div>
                    <div className="mt-1.5 text-[13px] leading-relaxed text-[#0F172A]">
                      {cardItem.reason}
                    </div>
                  </button>
                ))}
              </div>

              {/* Custom Researched Columns */}
              {columns.length > 0 && (
                <div className="pt-2 border-t border-[#F1F5F9]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#64748B] mb-2">
                    AI Researched Attributes
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {columns.map((column) => {
                      const cell = cells.find(
                        (row) => row.candidate_id === account.id && row.column_id === column.id
                      );
                      return (
                        <button
                          key={column.id}
                          onClick={() => cell && openEvidence(cell.data)}
                          className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-[12px] font-medium text-[#334155] hover:bg-white hover:border-[#CBD5E1] cursor-pointer"
                        >
                          <span className="text-[#64748B]">{column.definition.name}:</span>{' '}
                          <span className="text-[#0F172A]">{cell?.data?.display_value || '—'}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* Contacts Card */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-3">
                <h3 className="text-[15px] font-bold text-[#0F172A]">Contacts</h3>
                <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-semibold text-[#475569]">
                  {accountContacts.length} available
                </span>
              </div>

              <div className="space-y-2">
                {accountContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3.5"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 font-semibold text-[#0F172A] text-[13.5px]">
                        <span>{contact.name || contact.email?.split('@')[0]}</span>
                      </div>
                      <div className="text-[12px] text-[#64748B]">
                        {contact.email}
                        {contact.title && contact.title !== 'no title' ? ` · ${contact.title}` : ''}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Contact Form */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F1F5F9]">
                <input
                  aria-label="Contact name"
                  placeholder="Name"
                  value={draft.name}
                  onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                  className="min-w-[140px] flex-1 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-[12.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#0F172A]"
                />
                <input
                  aria-label="Contact title"
                  placeholder="Title (e.g. CEO, VP)"
                  value={draft.title}
                  onChange={(event) => setDraft({ ...draft, title: event.target.value })}
                  className="min-w-[140px] flex-1 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-[12.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#0F172A]"
                />
                <input
                  aria-label="Contact email"
                  placeholder="name@company.com"
                  value={draft.email}
                  onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                  className="min-w-[180px] flex-1 rounded-xl border border-[#CBD5E1] bg-white px-3.5 py-2 text-[12.5px] text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#0F172A]"
                />
                <button
                  disabled={busy || !draft.email.trim()}
                  onClick={addContact}
                  className="rounded-xl bg-[#0F172A] px-4 py-2 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-[#1E293B] disabled:opacity-50 cursor-pointer"
                >
                  Add contact
                </button>
              </div>
            </section>

            {/* Write to Account Section */}
            <section className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
              <h3 className="text-[15px] font-bold text-[#0F172A]">
                Write to {account.name || account.domain}
              </h3>
              <textarea
                aria-label="Message instruction"
                rows={3}
                value={instruction}
                onChange={(event) => setInstruction(event.target.value)}
                className="w-full rounded-xl border border-[#CBD5E1] bg-white p-3.5 text-[13px] text-[#0F172A] placeholder-[#94A3B8] outline-none focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A]"
              />

              {!connection && (
                <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3 text-[12.5px] text-amber-800">
                  <ShieldAlert className="size-4 shrink-0" />
                  <span>Connect Gmail before drafting outreach messages.</span>
                </div>
              )}
              {connection && !sendable.length && (
                <div className="flex items-center gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3 text-[12.5px] text-amber-800">
                  <ShieldAlert className="size-4 shrink-0" />
                  <span>Add a work email above before drafting outreach messages.</span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  disabled={busy || !!active || !connection || !sendable.length}
                  onClick={startOutreach}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0F172A] px-4 py-2 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-[#1E293B] disabled:opacity-50 cursor-pointer"
                >
                  <Mail className="size-3.5" /> Draft message
                </button>
                <Link
                  to={`/p/${projectId}/campaigns`}
                  className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white px-4 py-2 text-[12.5px] font-medium text-[#475569] shadow-sm transition-all hover:bg-[#F8FAFC]"
                >
                  Review &amp; send on Campaigns
                </Link>
              </div>
            </section>
          </div>
        )}
        {!account && (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-8 text-center text-[13.5px] text-[#64748B]">
            No accounts yet. Once leads or competitors are found, pick one here to draft outreach.
          </div>
        )}
      </div>
    </div>
  );
}
