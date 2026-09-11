/**
 * Home: the project's chat. Typing "find competitors" or "generate leads" runs
 * that stage; whatever the project has produced so far renders inline under the
 * conversation, so asking for leads here shows the leads here.
 */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import Chat, { type Turn } from '../../Component/Chat';
import { FitScore } from '../../Component/FitScore';
import { LinkedInLink, LocationCard } from '../../Component/Place';
import { JobBanner, Pill, card, label, show } from '../../Component/Page';
import { coirei, projectName, STAGE_LABEL, type Data } from '../../api/coirei';
import { useProject, stopJob } from './ProjectShell';

export default function Home() {
  const { projectId, snapshot, active, current, stage, busy, perform, refresh, openEvidence } = useProject();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);

  const profile = snapshot.profiles[0];
  const icp = snapshot.icps[0];
  const competitors = snapshot.competitors.filter((row) => row.state === 'analysed');
  const leads = [...snapshot.sheet.rows].sort((a, b) => b.score - a.score);

  // The conversation is stored on the project, so it survives reloads.
  const turns: Turn[] = [
    ...(snapshot.flow.message ? [{ role: 'user' as const, message: snapshot.flow.message }] : []),
    ...((snapshot.company.context?._chat || []) as Turn[]),
  ];

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const text = message.trim();
    if (!text && !files.length) return;
    setSending(true);
    try {
      for (const file of files) await coirei.uploadDocument(projectId, file);
      if (files.length) toast.success(`${files.length} document(s) uploaded`);
      setFiles([]);
      if (text) {
        setMessage('');
        const result = await coirei.command(projectId, text);
        if (result.ran === 'leads') toast.success('Finding accounts — they will appear here and in Leads');
      }
      await refresh();
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setSending(false);
    }
  };

  const thinking = sending
    ? 'Thinking…'
    : active
      ? `${label(active.progress?.step || STAGE_LABEL[stage] || 'Working')}…`
      : undefined;

  return (
    <Chat
      turns={turns}
      value={message}
      onChange={setMessage}
      onSubmit={submit}
      files={files}
      onFiles={setFiles}
      busy={sending}
      thinking={thinking}
      heading={projectName(snapshot.company)}
      placeholder="Ask coirei, or say “find competitors”, “generate leads”…"
      suggestions={active ? [] : SUGGESTIONS[stage] || []}
      snapshot={snapshot}
      onOpenEvidence={openEvidence}
    >
      <div className="flex flex-col gap-5">
        <JobBanner
          job={active || current}
          onStop={() => void perform(() => stopJob(active, projectId))}
          onRetry={() => void perform(() => coirei.act(projectId, 'retry'))}
        />

        {/* Company profile — the first human checkpoint. */}
        {profile && stage === 'company_review' && (
          <section className={`${card} space-y-4`}>
            <h2 className="text-[17px] font-semibold text-[#16171A]">Company understanding</h2>
            <p className="text-[14px] leading-relaxed text-[#2C2E31]">{profile.data.summary}</p>
            <div className="grid gap-3 md:grid-cols-2">
              {(profile.data.claims || []).map((claim: Data, index: number) => (
                <button key={index} onClick={() => openEvidence(claim)} className="cursor-pointer rounded-xl bg-[#F9F9F7] p-3 text-left hover:bg-[#F4F4F0]">
                  <div className="text-[11px] uppercase tracking-wide text-[#717378]">{label(claim.field)}</div>
                  <div className="mt-0.5 text-[13.5px] text-[#16171A]">{show(claim.value)}</div>
                  <div className="mt-1 text-[11px] text-[#7A9601]">
                    {claim.evidence?.length || 0} sources · {label(claim.verification_status || claim.origin)}
                  </div>
                </button>
              ))}
            </div>
            {snapshot.company.context?._location && (
              <div className="rounded-xl bg-[#F9F9F7] p-3">
                <LocationCard location={snapshot.company.context._location} />
                <LinkedInLink url={snapshot.company.context._location.linkedin} className="mt-2" />
              </div>
            )}
            {profile.data.unknowns?.length > 0 && (
              <p className="text-[12.5px] text-amber-700">Still unknown: {profile.data.unknowns.join(', ')}</p>
            )}
            <Pill tone="dark" disabled={busy || !!active} onClick={() => void perform(() => coirei.act(projectId, 'confirm_profile', { profile_id: profile.id }))}>
              Confirm profile &amp; find competitors
            </Pill>
          </section>
        )}

        {/* Competitors preview — full review lives on its own page. */}
        {competitors.length > 0 && (
          <section className={`${card} space-y-4`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[17px] font-semibold text-[#16171A]">Competitors</h2>
              <Link to={`/p/${projectId}/competitors`} className="inline-flex items-center gap-1 text-[12.5px] text-[#7A9601] hover:underline">
                Open all {snapshot.competitors.length} <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <ul className="flex flex-col gap-1">
              {competitors.slice(0, 5).map((row) => (
                <li key={row.id}>
                  <button onClick={() => openEvidence(row.data)} className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-2 py-2 text-left hover:bg-[#F9F9F7]">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13.5px] font-medium text-[#16171A]">{row.name || row.domain}</span>
                      <span className="block truncate text-[11.5px] text-[#717378]">{row.domain}</span>
                    </span>
                    <FitScore score={row.score} size="sm" />
                  </button>
                </li>
              ))}
            </ul>
            {stage === 'competitors_review' && (
              <Pill tone="dark" disabled={busy || !!active} onClick={() => void perform(() => coirei.act(projectId, 'review_competitors'))}>
                Finish review &amp; build ICP
              </Pill>
            )}
          </section>
        )}

        {/* ICP checkpoint. */}
        {icp && stage === 'icp_review' && (
          <section className={`${card} space-y-3`}>
            <h2 className="text-[17px] font-semibold text-[#16171A]">{icp.data.name}</h2>
            <p className="text-[13.5px] leading-relaxed text-[#717378]">{icp.data.rationale}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {(['industries', 'geography', 'buyer_roles', 'pains'] as const).map((key) => (
                (icp.data[key] || []).length > 0 && (
                  <div key={key}>
                    <div className="text-[11px] uppercase tracking-wide text-[#717378]">{label(key)}</div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {icp.data[key].map((item: string) => (
                        <span key={item} className="rounded-full bg-[#F4F7E6] px-2.5 py-0.5 text-[11.5px] text-[#7A9601]">{item}</span>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill tone="dark" disabled={busy || !!active} onClick={() => void perform(() => coirei.act(projectId, 'approve_icp', { icp_id: icp.id }))}>
                Approve ICP &amp; find accounts
              </Pill>
              <Pill onClick={() => openEvidence(icp.data)}>View full ICP</Pill>
            </div>
          </section>
        )}

        {/* Leads inline: asking for leads in chat shows them right here. */}
        {leads.length > 0 && (
          <section className={`${card} space-y-4`}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[17px] font-semibold text-[#16171A]">Matching accounts</h2>
              <Link to={`/p/${projectId}/leads`} className="inline-flex items-center gap-1 text-[12.5px] text-[#7A9601] hover:underline">
                Open all {leads.length} <ArrowRight className="size-3.5" />
              </Link>
            </div>
            <div className="overflow-x-auto rounded-[16px] border border-[#E5E7EB]">
              <table className="w-full border-collapse text-left">
                <thead className="bg-[#F8F9FA] text-[11px] uppercase tracking-wide text-[#6B7280]">
                  <tr><th className="px-4 py-2.5">Company</th><th className="px-4 py-2.5">Fit</th></tr>
                </thead>
                <tbody className="divide-y divide-[#F0F0EC]">
                  {leads.slice(0, 5).map((row) => (
                    <tr key={row.id} className="hover:bg-[#FDFDFC]">
                      <td className="px-4 py-3">
                        <button onClick={() => openEvidence(row.data)} className="cursor-pointer text-[13.5px] font-medium text-[#16171A] hover:underline">
                          {row.name || row.domain}
                        </button>
                        <p className="text-[11.5px] text-[#717378]">{row.domain}</p>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => openEvidence(row.data)} className="flex cursor-pointer items-center gap-2">
                          <FitScore score={row.score || 0} size="sm" />
                          <span className="text-[13px] text-[#16171A]">{Math.round(row.score || 0)}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap gap-2">
              <Pill onClick={() => navigate(`/p/${projectId}/leads`)}>Research a column</Pill>
              <Pill onClick={() => navigate(`/p/${projectId}/outreach`)}>Start outreach</Pill>
            </div>
          </section>
        )}
      </div>
    </Chat>
  );
}

/** Stage-appropriate prompts, so the chat always suggests the real next step. */
const SUGGESTIONS: Record<string, string[]> = {
  intake: ['Start researching my business'],
  company_review: ['Find my competitors'],
  competitors_review: ['Build my ideal customer profile'],
  icp_review: ['Generate leads'],
  leads_ready: ['Get the LinkedIn handles of these companies', 'Which accounts are the best fit and why?'],
};
