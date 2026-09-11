/**
 * Home: the project's chat. Typing "find competitors" or "generate leads" runs
 * that stage; whatever the project has produced so far renders inline under the
 * conversation, so asking for leads here shows the leads here.
 */
import { useState } from 'react';
import toast from 'react-hot-toast';
import Chat, { type Turn, type ChatMode } from '../../Component/Chat';
import LeadsTable from '../../Component/LeadsTable';
import CompetitorsTable from '../../Component/CompetitorsTable';
import CompanyAnalysisCard from '../../Component/CompanyAnalysisCard';
import IcpBuildingCard from '../../Component/IcpBuildingCard';
import { JobBanner, label } from '../../Component/Page';
import { coirei, projectName, STAGE_LABEL } from '../../api/coirei';
import { useProject, stopJob } from './ProjectShell';

export default function Home() {
  const { projectId, snapshot, active, current, stage, busy, perform, refresh, openEvidence } = useProject();
  const [mode, setMode] = useState<ChatMode>('research');
  const [researchMessage, setResearchMessage] = useState('');
  const [growMessage, setGrowMessage] = useState('');
  const [growTurns, setGrowTurns] = useState<Turn[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);

  const profile = snapshot.profiles[0];
  const icp = snapshot.icps[0];
  const leads = [...snapshot.sheet.rows].sort((a, b) => b.score - a.score);

  // The research conversation is stored on the project, so it survives reloads.
  const researchTurns: Turn[] = [
    ...(snapshot.flow.message ? [{ role: 'user' as const, message: snapshot.flow.message }] : []),
    ...((snapshot.company.context?._chat || []) as Turn[]),
  ];

  const currentMessage = mode === 'research' ? researchMessage : growMessage;
  const setCurrentMessage = mode === 'research' ? setResearchMessage : setGrowMessage;
  const currentTurns = mode === 'research' ? researchTurns : growTurns;

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const text = currentMessage.trim();
    if (!text && !files.length) return;
    setSending(true);
    try {
      for (const file of files) await coirei.uploadDocument(projectId, file);
      if (files.length) toast.success(`${files.length} document(s) uploaded`);
      setFiles([]);

      if (mode === 'research') {
        setResearchMessage('');
        if (text) {
          const result = await coirei.command(projectId, text);
          if (result.ran === 'leads') toast.success('Finding accounts — they will appear here and in Leads');
        }
      } else {
        setGrowMessage('');
        if (text) {
          setGrowTurns((prev) => [...prev, { role: 'user', message: text }]);
          const result = await coirei.command(projectId, text);
          setGrowTurns((prev) => [
            ...prev,
            {
              role: 'assistant',
              message: result.reply || `Growth command processed for "${text}". Showing updated accounts and pipeline data.`,
            },
          ]);
          if (result.ran === 'leads') toast.success('Finding accounts — they will appear here and in Leads');
        }
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
      turns={currentTurns}
      value={currentMessage}
      onChange={setCurrentMessage}
      onSubmit={submit}
      files={files}
      onFiles={setFiles}
      busy={sending}
      thinking={thinking}
      mode={mode}
      onModeChange={setMode}
      heading={mode === 'grow' ? "Let's grow your business" : projectName(snapshot.company)}
      placeholder={mode === 'grow' ? 'Find qualified leads or draft outreach campaigns…' : 'Ask coirei, or say “find competitors”, “generate leads”…'}
      suggestions={active ? [] : (mode === 'grow' ? [] : SUGGESTIONS[stage] || [])}
      snapshot={snapshot}
      onOpenEvidence={openEvidence}
      onStop={active ? () => void perform(() => stopJob(active, projectId)) : undefined}
    >
      <div className="flex flex-col gap-5">
        {mode === 'research' ? (
          <>
            {/* Show JobBanner if job failed so user can retry */}
            {(active?.status === 'failed' || current?.status === 'failed') && (
              <JobBanner
                job={active || current}
                onStop={() => void perform(() => stopJob(active, projectId))}
                onRetry={() => void perform(() => coirei.act(projectId, 'retry'))}
              />
            )}

            {/* Company analysis card */}
            {(profile || stage === 'company_review' || stage === 'company' || Boolean(snapshot.company.name) || Boolean(snapshot.company.domain) || currentTurns.length > 0) && (
              <div className="w-full">
                <CompanyAnalysisCard />
              </div>
            )}

            {/* Competitors spreadsheet table */}
            {(stage === 'competitors_review' || snapshot.competitors.length > 0) && (
              <div className="w-full">
                <CompetitorsTable embedded />
              </div>
            )}

            {/* Building ICP loading state */}
            {(stage === 'icp' || (active?.kind === 'workflow' && active?.progress?.step === 'icp')) && (
              <div className="w-full">
                <IcpBuildingCard stage="icp" stepText={active?.progress?.step ? label(active.progress.step) : undefined} />
              </div>
            )}

            {/* ICP checkpoint */}
            {icp && stage === 'icp_review' && (
              <section className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] space-y-4">
                <div className="flex items-center justify-between gap-3 border-b border-[#F1F5F9] pb-3.5">
                  <div>
                    <h2 className="text-[16px] font-bold text-[#0F172A] tracking-tight">Ideal Customer Profile (ICP)</h2>
                    <p className="text-[12.5px] text-[#64748B]">Synthesized from competitor analysis and target market criteria</p>
                  </div>
                  <span className="rounded-full bg-[#ECFDF5] px-2.5 py-0.5 text-[11px] font-semibold text-[#059669]">
                    Ready for Approval
                  </span>
                </div>

                <p className="text-[13.5px] leading-relaxed text-[#334155]">{icp.data.rationale}</p>

                <div className="grid gap-3 sm:grid-cols-2 pt-1">
                  {(['industries', 'geography', 'buyer_roles', 'pains'] as const).map((key) => (
                    (icp.data[key] || []).length > 0 && (
                      <div key={key} className="rounded-xl border border-[#F1F5F9] bg-[#F8FAFC] p-3">
                        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">{label(key)}</div>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {icp.data[key].map((item: string) => (
                            <span key={item} className="rounded-md bg-white border border-[#E2E8F0] px-2 py-0.5 text-[11.5px] font-medium text-[#334155] shadow-2xs">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F1F5F9]">
                  <button
                    disabled={busy || !!active}
                    onClick={() => void perform(() => coirei.act(projectId, 'approve_icp', { icp_id: icp.id }))}
                    className="rounded-xl bg-[#0F172A] px-4 py-2 text-[12.5px] font-medium text-white shadow-sm transition-all hover:bg-[#1E293B] disabled:opacity-50 cursor-pointer"
                  >
                    Approve ICP &amp; Find Accounts
                  </button>
                  <button
                    onClick={() => openEvidence(icp.data)}
                    className="rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-2 text-[12.5px] font-medium text-[#475569] shadow-sm transition-all hover:bg-[#F8FAFC] cursor-pointer"
                  >
                    View Full Evidence
                  </button>
                </div>
              </section>
            )}

            {/* Finding leads loading state */}
            {(stage === 'leads' || (active?.kind === 'workflow' && active?.progress?.step === 'leads' && leads.length === 0)) && (
              <div className="w-full">
                <IcpBuildingCard stage="leads" stepText={active?.progress?.step ? label(active.progress.step) : undefined} />
              </div>
            )}

            {/* Leads spreadsheet checkpoint */}
            {(stage === 'leads_ready' || leads.length > 0) && (
              <div className="w-full">
                <LeadsTable embedded showOutreachActions />
              </div>
            )}
          </>
        ) : (
          <>
            {/* Grow mode leads spreadsheet */}
            <div className="w-full">
              <LeadsTable embedded showOutreachActions />
            </div>
          </>
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
