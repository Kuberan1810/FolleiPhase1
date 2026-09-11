/**
 * Campaigns: bulk batches. Pick confirmed contacts across accounts, draft them
 * together, then review the exact messages. Approval is bound to a hash of the
 * batch — editing any message invalidates it, and sending needs a second,
 * separate confirmation.
 */
import { useState } from 'react';
import { CheckCircle2, Mail, Send, ShieldAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../../Component/ConfirmDialog';
import { Empty, JobBanner, PageHeader, Pill, card, field } from '../../Component/Page';
import { coirei, type Data } from '../../api/coirei';
import { useGmail } from '../../hooks/useProjects';
import { useProject, stopJob } from './ProjectShell';

const SENDABLE = ['provider-verified', 'user-confirmed'];
const STATUS_TONE: Record<string, string> = {
  sent: 'bg-[#F4F7E6] text-[#7A9601]',
  failed: 'bg-red-50 text-[#B91C1C]',
  skipped: 'bg-[#F1F5F9] text-[#475569]',
  unknown: 'bg-amber-50 text-amber-700',
};

export default function Campaigns() {
  const { projectId, snapshot, active, current, busy, perform } = useProject();
  const gmail = useGmail();
  const { contacts, rows } = snapshot.sheet;

  const [selected, setSelected] = useState<string[]>([]);
  const [name, setName] = useState(`Outreach ${new Date().toLocaleDateString()}`);
  const [instruction, setInstruction] = useState('Introduce our product using verified evidence and invite a short conversation.');
  const [editing, setEditing] = useState<Data | null>(null);
  const [confirming, setConfirming] = useState<{ title: string; description: string; run: () => Promise<unknown> } | null>(null);

  const connection = gmail.data?.find((row) => row.active);
  const sendable = contacts.filter((row) => SENDABLE.includes(row.status));
  const accountFor = (contact: Data) => rows.find((row) => row.id === contact.candidate_id);

  const draftBatch = () => {
    if (!connection || !selected.length) return;
    void perform(async () => {
      await coirei.createCampaign(projectId, { name, connection_id: connection.id, contact_ids: selected, instruction });
      setSelected([]);
      toast.success('Drafting messages — they appear below for review');
    });
  };

  return (
    <div className="flex flex-col">
      <PageHeader
        title="Campaigns"
        subtitle="Send one reviewed batch at a time. Nothing leaves without your explicit approval."
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

      <div className="space-y-5 px-6 py-5">
        {/* Compose a batch. */}
        <section className={`${card} space-y-4`}>
          <h2 className="text-[15px] font-semibold text-[#16171A]">New batch</h2>

          {sendable.length === 0 ? (
            <p className="flex items-center gap-1.5 text-[12.5px] text-amber-700">
              <ShieldAlert className="size-3.5" />
              No confirmed contacts yet. Add and verify addresses on Outreach — unverified contacts can never be sent to.
            </p>
          ) : (
            <>
              <div className="grid gap-2 sm:grid-cols-2">
                {sendable.map((contact) => {
                  const account = accountFor(contact);
                  const checked = selected.includes(contact.id);
                  return (
                    <label key={contact.id} className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 ${checked ? 'border-[#7A9601] bg-[#F4F7E6]' : 'border-[#E6E6E4] bg-[#F9F9F7] hover:bg-[#F4F4F0]'}`}>
                      <input
                        type="checkbox"
                        checked={checked}
                        aria-label={`Select ${contact.email}`}
                        onChange={(event) => setSelected((list) => event.target.checked ? [...list, contact.id] : list.filter((id) => id !== contact.id))}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] text-[#16171A]">{contact.name || contact.email}</span>
                        <span className="block truncate text-[11.5px] text-[#717378]">{account?.name || account?.domain || contact.email}</span>
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-end gap-3">
                <label className="min-w-[200px] flex-1 space-y-1.5">
                  <span className="text-[12.5px] font-medium text-[#2C2E31]">Batch name</span>
                  <input value={name} onChange={(event) => setName(event.target.value)} className={field} />
                </label>
              </div>
              <label className="block space-y-1.5">
                <span className="text-[12.5px] font-medium text-[#2C2E31]">What should these emails say?</span>
                <textarea rows={2} value={instruction} onChange={(event) => setInstruction(event.target.value)} className={field} />
              </label>

              <Pill tone="dark" disabled={busy || !!active || !connection || !selected.length || selected.length > 10} onClick={draftBatch}>
                <Mail className="size-3.5" /> Draft {selected.length || ''} message{selected.length === 1 ? '' : 's'}
              </Pill>
              {selected.length > 10 && <p className="text-[12px] text-amber-700">Batches are capped at 10 recipients.</p>}
            </>
          )}
        </section>

        {/* Existing batches. */}
        {snapshot.campaigns.length === 0 ? (
          <Empty title="No campaigns yet" hint="Draft a batch above, or start from a single account on Outreach." />
        ) : (
          snapshot.campaigns.map((entry: Data) => {
            const campaign = entry.campaign;
            const messages: Data[] = entry.results || [];
            const editable = ['draft', 'approved'].includes(campaign.status);
            return (
              <section key={campaign.id} className={`${card} space-y-4`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-[15px] font-semibold text-[#16171A]">
                    {campaign.name}
                    <span className="ml-2 rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-normal capitalize text-[#475569]">{campaign.status}</span>
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {campaign.status === 'draft' && messages.length > 0 && (
                      <Pill tone="dark" disabled={busy} onClick={() => setConfirming({
                        title: 'Approve these exact messages?',
                        description: `Approval locks these ${messages.length} message(s) exactly as shown. Editing any of them afterwards invalidates it.`,
                        run: () => coirei.approveCampaign(campaign.id, entry.preview_hash),
                      })}>Approve exact messages</Pill>
                    )}
                    {campaign.status === 'approved' && (
                      <Pill tone="dark" disabled={busy} onClick={() => setConfirming({
                        title: `Send ${messages.length} approved email(s) now?`,
                        description: 'These are sent from your connected Gmail account, one at a time. This cannot be undone.',
                        run: () => coirei.sendCampaign(campaign.id, entry.preview_hash),
                      })}><Send className="size-3.5" /> Send approved batch</Pill>
                    )}
                    {['drafting', 'draft', 'approved', 'sending'].includes(campaign.status) && (
                      <Pill tone="danger" disabled={busy} onClick={() => void perform(() => coirei.cancelCampaign(campaign.id))}>Cancel</Pill>
                    )}
                  </div>
                </div>

                {campaign.status === 'drafting' && messages.length === 0 && (
                  <p className="text-[13px] text-[#717378]">Writing personalised messages from each account’s evidence…</p>
                )}

                {messages.map((message) => (
                  <article key={message.id} className="space-y-2 rounded-xl bg-[#F9F9F7] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <b className="text-[13px] text-[#16171A]">{message.recipient}</b>
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] capitalize ${STATUS_TONE[message.status] || 'bg-[#F1F5F9] text-[#475569]'}`}>
                        {message.status}
                      </span>
                    </div>
                    <p className="text-[13.5px] font-medium text-[#16171A]">{message.subject}</p>
                    <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#717378]">{message.body}</p>
                    {message.error && <p className="text-[12px] text-[#B91C1C]">{message.error}</p>}
                    {editable && <Pill onClick={() => setEditing(message)}>Edit</Pill>}
                  </article>
                ))}

                {campaign.status === 'sent' || campaign.status === 'completed' ? (
                  <p className="text-[12.5px] text-[#717378]">
                    {messages.filter((m) => m.status === 'sent').length} sent ·{' '}
                    {messages.filter((m) => m.status === 'failed').length} failed ·{' '}
                    {messages.filter((m) => m.status === 'unknown').length} need manual checking
                  </p>
                ) : null}
              </section>
            );
          })
        )}
      </div>

      {/* Edit one message; any edit clears the batch approval server-side. */}
      {editing && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/30 p-5" onClick={() => setEditing(null)}>
          <div role="dialog" aria-label="Edit message" className={`${card} w-full max-w-2xl space-y-3`} onClick={(event) => event.stopPropagation()}>
            <h3 className="text-[15px] font-semibold text-[#16171A]">Edit message to {editing.recipient}</h3>
            <input
              aria-label="Subject"
              value={editing.subject}
              onChange={(event) => setEditing({ ...editing, subject: event.target.value })}
              className={field}
            />
            <textarea
              aria-label="Body"
              rows={12}
              value={editing.body}
              onChange={(event) => setEditing({ ...editing, body: event.target.value })}
              className={field}
            />
            <p className="text-[12px] text-amber-700">Saving an edit clears this batch’s approval — you will review and approve it again.</p>
            <div className="flex gap-2">
              <Pill tone="dark" disabled={busy} onClick={() => {
                const message = editing;
                setEditing(null);
                void perform(() => coirei.editMessage(message.id, { subject: message.subject, body: message.body }));
              }}>Save changes</Pill>
              <Pill onClick={() => setEditing(null)}>Cancel</Pill>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={Boolean(confirming)}
        onClose={() => setConfirming(null)}
        onConfirm={() => {
          const action = confirming;
          setConfirming(null);
          if (action) void perform(action.run);
        }}
        title={confirming?.title || ''}
        description={confirming?.description}
        confirmText="Confirm"
        cancelText="Cancel"
        variant="primary"
        isLoading={busy}
      />
    </div>
  );
}
