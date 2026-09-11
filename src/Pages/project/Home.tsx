/**
 * Home: the project's chat. Typing "find competitors" or "generate leads" runs
 * that stage; whatever the project has produced so far renders inline under the
 * conversation, so asking for leads here shows the leads here.
 */
import { useState } from 'react';
import toast from 'react-hot-toast';
import Chat, { type Turn, type ChatMode } from '../../Component/Chat';
import LeadsTable from '../../Component/LeadsTable';
import CompanyAnalysisCard from '../../Component/CompanyAnalysisCard';
import { JobBanner, label } from '../../Component/Page';
import { coirei, projectName, STAGE_LABEL } from '../../api/coirei';
import { useProject, stopJob } from './ProjectShell';

export default function Home() {
  const { projectId, snapshot, active, current, stage, perform, refresh, openEvidence } = useProject();
  const [mode, setMode] = useState<ChatMode>('research');
  const [researchMessage, setResearchMessage] = useState('');
  const [growMessage, setGrowMessage] = useState('');
  const [growTurns, setGrowTurns] = useState<Turn[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);

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

            {/* Company analysis card -- the one thing shown inline here.
                Confirming it navigates straight to Competitors, and every
                later stage (competitors, ICP, leads) runs on its own with no
                further human checkpoint, so once the profile is confirmed
                Home goes back to being just the chat. */}
            {['intake', 'company', 'company_review'].includes(stage) && (
              <div className="w-full">
                <CompanyAnalysisCard />
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

/** Stage-appropriate prompts, so the chat always suggests the real next step.
 * Competitors, the ICP and leads all run on their own once the profile is
 * confirmed, so there's no "next step" prompt once past company_review --
 * only leads_ready has follow-up questions worth suggesting once you're back
 * here in the chat. */
const SUGGESTIONS: Record<string, string[]> = {
  intake: ['Start researching my business'],
  company_review: ['Find my competitors'],
  leads_ready: ['Get the LinkedIn handles of these companies', 'Which accounts are the best fit and why?'],
};
