import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUp,
  Building2,
  Check,
  FileText,
  Languages,
  Loader2,
  Menu,
  RefreshCw,
  Sparkles,
  Upload,
  Users,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import Sidebar from '../../Component/Sidebar';
import CallLab from './CallLab';
import { getUserInfo } from '../../lib/auth';
import {
  folleiApi,
  type Business,
  type DocumentRecord,
  type GapQuestion,
  type GoalTurn,
  type Language,
  type Lead,
  type RequirementsDraft,
  type SalesPackage,
  type Workspace,
} from '../../api/follei';

const CATEGORY_OPTIONS = ['Software', 'Services', 'Retail', 'Manufacturing', 'Consulting', 'Other'];
const CUSTOMER_OPTIONS = ['Businesses', 'Consumers', 'Both'];
const CRM_OPTIONS = ['HubSpot', 'Salesforce', 'Zoho', 'Pipedrive', 'Other', 'No CRM'];

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase() || 'F';
}

function Panel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`border border-[#E5E7E3] bg-white ${className}`}>{children}</section>;
}

function StatusPill({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'green' | 'amber' }) {
  const colors = tone === 'green'
    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : tone === 'amber'
      ? 'bg-amber-50 text-amber-700 border-amber-200'
      : 'bg-[#F5F5F2] text-[#61636A] border-[#E5E7E3]';
  return <span className={`inline-flex items-center border px-2 py-1 text-[11px] font-medium ${colors}`}>{children}</span>;
}

export default function Dashboard() {
  const authUser = getUserInfo() as { full_name?: string; email?: string } | null;
  const userName = authUser?.full_name || 'Follei user';
  const [mobileNav, setMobileNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [business, setBusiness] = useState<Business | null>(null);
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [goalTurns, setGoalTurns] = useState<GoalTurn[]>([]);
  const [goalSuggestions, setGoalSuggestions] = useState<string[]>([]);
  const [suggestionsLoadedFor, setSuggestionsLoadedFor] = useState<string | null>(null);
  const [requirements, setRequirements] = useState<RequirementsDraft | null>(null);
  const [questions, setQuestions] = useState<GapQuestion[]>([]);
  const [salesPackage, setSalesPackage] = useState<SalesPackage | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const generationInFlight = useRef(false);

  const [businessName, setBusinessName] = useState(
    () => sessionStorage.getItem('follei_pending_business_name') || '',
  );
  const [category, setCategory] = useState('');
  const [customerType, setCustomerType] = useState('');
  const [crmProvider, setCrmProvider] = useState('No CRM');
  const [goalInput, setGoalInput] = useState('');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [goalStartedWorkspace, setGoalStartedWorkspace] = useState(
    () => sessionStorage.getItem('follei_goal_started_workspace'),
  );

  const loadWorkspaceData = useCallback(async (currentWorkspace: Workspace) => {
    const [docs, leadRows, turns, draft, gapRows, packageRow] = await Promise.all([
      folleiApi.listDocuments(currentWorkspace.id),
      folleiApi.listLeads(currentWorkspace.id),
      folleiApi.getGoalHistory(currentWorkspace.id),
      folleiApi.getRequirements(currentWorkspace.id),
      folleiApi.listGapQuestions(currentWorkspace.id),
      folleiApi.getSalesPackage(currentWorkspace.id),
    ]);
    setDocuments(docs);
    setLeads(leadRows);
    setGoalTurns(turns);
    setRequirements(draft);
    setQuestions(gapRows);
    setSalesPackage(packageRow);
  }, []);

  const bootstrap = useCallback(async () => {
    setError(null);
    try {
      const businesses = await folleiApi.listBusinesses();
      const firstBusiness = businesses[0] || null;
      setBusiness(firstBusiness);
      if (!firstBusiness) return;
      const workspaces = await folleiApi.listWorkspaces(firstBusiness.id);
      const firstWorkspace = workspaces[0] || null;
      setWorkspace(firstWorkspace);
      if (firstWorkspace) await loadWorkspaceData(firstWorkspace);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load your Follei workspace.');
    } finally {
      setLoading(false);
    }
  }, [loadWorkspaceData]);

  useEffect(() => { void bootstrap(); }, [bootstrap]);

  const documentsActive = documents.some((document) =>
    document.status === 'UPLOADED' || document.status === 'PROCESSING',
  );
  useEffect(() => {
    if (!workspace || !documentsActive) return;
    const timer = window.setInterval(async () => {
      try { setDocuments(await folleiApi.listDocuments(workspace.id)); } catch { /* next poll retries */ }
    }, 2000);
    return () => window.clearInterval(timer);
  }, [workspace, documentsActive]);

  useEffect(() => {
    if (!workspace?.goal_text || salesPackage || documentsActive || generationInFlight.current) return;

    const continueGeneration = async () => {
      generationInFlight.current = true;
      setBusy('requirements');
      try {
        if (!requirements && workspace.stage === 'GOAL_SET') {
          setRequirements(await folleiApi.generateRequirements(workspace.id));
          setWorkspace(await folleiApi.getWorkspace(workspace.id));
          return;
        }

        if (requirements && workspace.stage === 'REQUIREMENTS_DRAFTED') {
          const gapRows = await folleiApi.generateGapQuestions(workspace.id);
          setQuestions(gapRows);
          setWorkspace(await folleiApi.getWorkspace(workspace.id));
          if (gapRows.length === 0) {
            setSalesPackage(await folleiApi.generateSalesPackage(workspace.id));
            setWorkspace(await folleiApi.getWorkspace(workspace.id));
          }
          return;
        }

        if (requirements && workspace.stage === 'GAP_FILLING' && !questions.some((row) => row.status === 'PENDING')) {
          setSalesPackage(await folleiApi.generateSalesPackage(workspace.id));
          setWorkspace(await folleiApi.getWorkspace(workspace.id));
        }
      } catch (err) {
        toast.error(err instanceof Error ? err.message : 'Could not prepare campaign requirements.');
      } finally {
        generationInFlight.current = false;
        setBusy(null);
      }
    };
    void continueGeneration();
  }, [workspace, requirements, questions, salesPackage, documentsActive]);

  const setupReady = documents.some((document) => document.status === 'PROCESSED') && leads.length > 0;
  const projectStarted = Boolean(
    workspace && (workspace.stage !== 'DRAFT' || (setupReady && goalStartedWorkspace === workspace.id)),
  );
  const pendingQuestions = questions.filter((question) => question.status === 'PENDING');

  useEffect(() => {
    if (!workspace || !projectStarted || workspace.goal_text || suggestionsLoadedFor === workspace.id) return;
    setSuggestionsLoadedFor(workspace.id);
    folleiApi.getGoalSuggestions(workspace.id)
      .then(({ suggestions }) => setGoalSuggestions(suggestions))
      .catch(() => setGoalSuggestions([
        `Grow ${business?.category || 'Business'} Sales`,
        'Convert More Qualified Leads',
        'Re-engage Inactive Leads',
      ]));
  }, [workspace, projectStarted, suggestionsLoadedFor, business?.category]);

  const setupSteps = useMemo(() => [
    { label: 'Business profile', done: Boolean(business) },
    { label: 'Project 1', done: Boolean(workspace) },
    { label: 'Business files', done: documents.some((document) => document.status === 'PROCESSED') },
    { label: 'Leads', done: leads.length > 0 },
    { label: 'Ultimate goal', done: Boolean(workspace?.goal_text) },
    { label: 'Verify sales package', done: workspace?.stage === 'VERIFIED' },
  ], [business, workspace, documents, leads]);

  const createBusinessAndProject = async () => {
    if (!businessName.trim() || !category || !customerType) {
      toast.error('Add the business name, category, and customer type.');
      return;
    }
    setBusy('business');
    try {
      const createdBusiness = await folleiApi.createBusiness({
        name: businessName.trim(),
        category,
        customer_type: customerType,
        crm_provider: crmProvider === 'No CRM' ? null : crmProvider,
      });
      const createdWorkspace = await folleiApi.createWorkspace(createdBusiness.id);
      sessionStorage.removeItem('follei_pending_business_name');
      setBusiness(createdBusiness);
      setWorkspace(createdWorkspace);
      toast.success('Project 1 is ready for your data.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not create your business.');
    } finally { setBusy(null); }
  };

  const uploadDocuments = async (files: FileList | null) => {
    if (!workspace || !files?.length) return;
    setBusy('documents');
    try {
      for (const file of Array.from(files)) {
        await folleiApi.uploadDocument(workspace.id, file, (percent) =>
          setUploadProgress((current) => ({ ...current, [file.name]: percent })),
        );
      }
      setDocuments(await folleiApi.listDocuments(workspace.id));
      toast.success('Business files uploaded. Follei is processing them.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Document upload failed.');
    } finally { setBusy(null); }
  };

  const uploadLeadCsv = async (file: File | undefined) => {
    if (!workspace || !file) return;
    setBusy('leads');
    try {
      const result = await folleiApi.uploadLeads(workspace.id, file, (percent) =>
        setUploadProgress((current) => ({ ...current, [file.name]: percent })),
      );
      setLeads(await folleiApi.listLeads(workspace.id));
      toast.success(`${result.imported} leads imported without dropping source columns.`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Lead import failed.');
    } finally { setBusy(null); }
  };

  const sendGoal = async () => {
    if (!workspace || !goalInput.trim()) return;
    const message = goalInput.trim();
    setGoalInput('');
    setGoalTurns((current) => [...current, { role: 'USER', message }]);
    setBusy('goal');
    try {
      const reply = await folleiApi.sendGoalMessage(workspace.id, message);
      setGoalTurns((current) => [...current, { role: 'ASSISTANT', message: reply.reply }]);
      if (reply.goal_finalized) setWorkspace(await folleiApi.getWorkspace(workspace.id));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Follei could not respond.');
    } finally { setBusy(null); }
  };

  const submitAnswer = async (question: GapQuestion) => {
    if (!workspace || !answers[question.id]?.trim()) return;
    setBusy(`question-${question.id}`);
    try {
      const answered = await folleiApi.answerGapQuestion(workspace.id, question.id, answers[question.id].trim());
      setQuestions((current) => current.map((row) => row.id === answered.id ? answered : row));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not save the answer.');
    } finally { setBusy(null); }
  };

  const revisePackage = async () => {
    if (!workspace || !salesPackage || !revisionFeedback.trim()) return;
    setBusy('revision');
    try {
      setSalesPackage(await folleiApi.reviseSalesPackage(workspace.id, salesPackage.id, revisionFeedback.trim()));
      setRevisionFeedback('');
      toast.success('A revised package is ready.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not revise the package.');
    } finally { setBusy(null); }
  };

  const approvePackage = async () => {
    if (!workspace || !salesPackage) return;
    setBusy('verify');
    try {
      setSalesPackage(await folleiApi.verifySalesPackage(workspace.id, salesPackage.id));
      setWorkspace(await folleiApi.getWorkspace(workspace.id));
      toast.success('Sales package approved. Project 1 is ready for go live.');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Could not approve the package.');
    } finally { setBusy(null); }
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#FDFDFC]"><Loader2 className="size-6 animate-spin text-[#0D9488]" /></div>;

  const sidebarUser = { name: userName, email: authUser?.email || '', initials: initials(userName) };

  return (
    <div className="flex min-h-screen bg-[#FDFDFC] text-[#17181B]">
      <Sidebar user={sidebarUser} projects={workspace ? [workspace.name] : []} isOpen={mobileNav} onClose={() => setMobileNav(false)} />
      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#E5E7E3] bg-[#FDFDFC]/95 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileNav(true)} className="flex size-8 items-center justify-center border border-[#E5E7E3] lg:hidden" aria-label="Open navigation"><Menu className="size-4" /></button>
            <div>
              <p className="text-[13px] font-semibold">{workspace?.name || 'Set up Follei'}</p>
              <p className="text-[11px] text-[#777980]">{workspace ? workspace.stage.replaceAll('_', ' ').toLowerCase() : 'Business profile'}</p>
            </div>
          </div>
          {workspace && <StatusPill tone={workspace.stage === 'VERIFIED' ? 'green' : 'neutral'}>{workspace.stage === 'VERIFIED' ? 'Ready' : workspace.language}</StatusPill>}
        </header>

        {error && (
          <div className="mx-auto mt-8 flex max-w-3xl items-center justify-between border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            <span>{error}</span><button type="button" onClick={() => void bootstrap()} title="Retry"><RefreshCw className="size-4" /></button>
          </div>
        )}

        <div className={`mx-auto grid gap-8 px-5 py-8 lg:px-8 lg:py-12 ${projectStarted ? 'max-w-5xl' : 'max-w-6xl lg:grid-cols-[minmax(0,1fr)_280px]'}`}>
          <div className="min-w-0">
            {!business && (
              <div className="max-w-2xl">
                <p className="text-sm text-[#6D6F73]">Good morning, {userName.split(' ')[0]}</p>
                <h1 className="mt-3 text-3xl font-semibold">Let's set up your workspace.</h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-[#676970]">I'll help you get everything ready, one step at a time.</p>
                <Panel className="mt-8 p-5 sm:p-6">
                  <h2 className="text-base font-semibold">What are you working on?</h2>
                  <p className="mt-1 text-xs text-[#777980]">Tell Follei the essentials about your business.</p>
                  <label className="block text-xs font-medium text-[#676970]">Business name</label>
                  <input value={businessName} onChange={(event) => setBusinessName(event.target.value)} className="mt-2 h-11 w-full border border-[#DCDDD9] px-3 text-sm outline-none focus:border-[#0D9488]" placeholder="Acme Learning" />
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <div><p className="text-xs font-medium text-[#676970]">Category</p><div className="mt-2 flex flex-wrap gap-2">{CATEGORY_OPTIONS.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`border px-3 py-2 text-xs ${category === item ? 'border-[#0D9488] bg-emerald-50 text-[#087A70]' : 'border-[#DCDDD9]'}`}>{item}</button>)}</div></div>
                    <div><p className="text-xs font-medium text-[#676970]">Customer type</p><div className="mt-2 flex flex-wrap gap-2">{CUSTOMER_OPTIONS.map((item) => <button key={item} type="button" onClick={() => setCustomerType(item)} className={`border px-3 py-2 text-xs ${customerType === item ? 'border-[#0D9488] bg-emerald-50 text-[#087A70]' : 'border-[#DCDDD9]'}`}>{item}</button>)}</div></div>
                  </div>
                  <div className="mt-5"><label className="text-xs font-medium text-[#676970]">CRM preference</label><select value={crmProvider} onChange={(event) => setCrmProvider(event.target.value)} className="mt-2 h-11 w-full border border-[#DCDDD9] bg-white px-3 text-sm outline-none"><option>No CRM</option>{CRM_OPTIONS.filter((item) => item !== 'No CRM').map((item) => <option key={item}>{item}</option>)}</select><p className="mt-2 text-xs text-[#8A8C91]">Recorded as a preference only. No connector is started.</p></div>
                  <button type="button" onClick={() => void createBusinessAndProject()} disabled={busy === 'business'} className="mt-6 flex h-11 w-full items-center justify-center gap-2 bg-[#1C1D20] text-sm font-medium text-white disabled:opacity-50">{busy === 'business' && <Loader2 className="size-4 animate-spin" />}Create Project 1</button>
                </Panel>
              </div>
            )}

            {business && workspace && !projectStarted && (
              <div>
                <p className="mb-3 text-xs font-semibold uppercase text-[#0D9488]">Project 1 setup</p>
                <h1 className="text-3xl font-semibold">Ground Follei in your real data.</h1>
                <p className="mt-3 text-sm leading-6 text-[#676970]">Upload business documents and one lead CSV. Files stay inside this project.</p>
                <div className="mt-8 grid gap-5 md:grid-cols-2">
                  <Panel className="p-5">
                    <div className="flex items-center gap-3"><FileText className="size-5 text-[#0D9488]" /><div><h2 className="text-sm font-semibold">Business files</h2><p className="text-xs text-[#777980]">Products, pricing, services, FAQs</p></div></div>
                    <label className="mt-5 flex min-h-28 cursor-pointer flex-col items-center justify-center border border-dashed border-[#C9CBC6] bg-[#FAFAF8] text-center hover:border-[#0D9488]"><Upload className="mb-2 size-5 text-[#777980]" /><span className="text-xs font-medium">Choose files</span><input type="file" multiple className="hidden" accept=".pdf,.docx,.xlsx,.csv,.md,.txt" onChange={(event) => void uploadDocuments(event.target.files)} /></label>
                    <div className="mt-4 space-y-2">{documents.map((document) => <div key={document.id} className="flex items-center justify-between gap-3 text-xs"><span className="truncate">{document.filename}</span><StatusPill tone={document.status === 'PROCESSED' ? 'green' : document.status === 'FAILED' ? 'amber' : 'neutral'}>{document.status}</StatusPill></div>)}{Object.entries(uploadProgress).map(([name, value]) => value < 100 && <div key={name} className="text-xs text-[#777980]">{name} · {value}%</div>)}</div>
                  </Panel>
                  <Panel className="p-5">
                    <div className="flex items-center gap-3"><Users className="size-5 text-[#0D9488]" /><div><h2 className="text-sm font-semibold">Lead CSV</h2><p className="text-xs text-[#777980]">Every original column is preserved</p></div></div>
                    <label className="mt-5 flex min-h-28 cursor-pointer flex-col items-center justify-center border border-dashed border-[#C9CBC6] bg-[#FAFAF8] text-center hover:border-[#0D9488]"><Upload className="mb-2 size-5 text-[#777980]" /><span className="text-xs font-medium">Choose CSV</span><input type="file" className="hidden" accept=".csv,text/csv" onChange={(event) => void uploadLeadCsv(event.target.files?.[0])} /></label>
                    <p className="mt-4 text-xs text-[#777980]">{leads.length ? `${leads.length} leads imported` : 'No leads imported yet'}</p>
                  </Panel>
                </div>
                <button type="button" disabled={!setupReady || documentsActive} onClick={() => { sessionStorage.setItem('follei_goal_started_workspace', workspace.id); setGoalStartedWorkspace(workspace.id); }} className="mt-6 h-11 bg-[#1C1D20] px-6 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-35">Continue to ultimate goal</button>
              </div>
            )}

            {business && workspace && projectStarted && !salesPackage && (
              <div className="mx-auto max-w-3xl pt-3 lg:pt-8">
                <p className="text-sm text-[#6D6F73]">Good morning, {userName.split(' ')[0]}</p>
                <h1 className="mt-3 text-3xl font-semibold">Let's define your ultimate goal.</h1>
                <p className="mt-3 text-base leading-6 text-[#676970]">Tell Follei what you ultimately want to achieve, and I'll use it to shape your workspace.</p>
                {!workspace.goal_text ? (
                  <div className="mt-10">
                    {goalTurns.length > 0 && (
                      <div className="mb-6 max-h-72 space-y-3 overflow-y-auto">
                        {goalTurns.map((turn, index) => <div key={`${turn.role}-${index}`} className={`flex ${turn.role === 'USER' ? 'justify-end' : 'justify-start'}`}><div className={`max-w-[82%] rounded-lg px-4 py-3 text-sm leading-6 ${turn.role === 'USER' ? 'bg-[#17181B] text-white' : 'bg-[#F3F3F0] text-[#303238]'}`}>{turn.message}</div></div>)}
                      </div>
                    )}
                    <form onSubmit={(event) => { event.preventDefault(); void sendGoal(); }} className="flex min-h-24 items-center gap-3 rounded-[24px] border border-[#DDDEDA] bg-white px-5 py-4 shadow-sm focus-within:border-[#A6A8A3]">
                      <textarea value={goalInput} onChange={(event) => setGoalInput(event.target.value)} className="min-h-14 min-w-0 flex-1 resize-none bg-transparent py-2 text-base outline-none" placeholder="What is your ultimate goal?" aria-label="What is your ultimate goal?" />
                      <button type="submit" disabled={!goalInput.trim() || busy === 'goal'} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#17181B] text-white disabled:opacity-30" aria-label="Submit goal">{busy === 'goal' ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}</button>
                    </form>
                    <div className="mt-5 flex min-h-10 flex-wrap gap-2">
                      {goalSuggestions.map((suggestion) => <button key={suggestion} type="button" onClick={() => setGoalInput(suggestion)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${goalInput === suggestion ? 'border-[#17181B] bg-[#17181B] text-white' : 'border-[#DDDEDA] bg-white text-[#686A6F] hover:border-[#A6A8A3] hover:text-[#17181B]'}`}>{suggestion}</button>)}
                      {!goalSuggestions.length && <span className="flex items-center gap-2 text-sm text-[#85878B]"><Loader2 className="size-3.5 animate-spin" />Building suggestions from your documents...</span>}
                    </div>
                  </div>
                ) : (
                  <Panel className="mt-8 p-5 sm:p-6">
                    <div className="flex items-start gap-3"><Check className="mt-0.5 size-5 text-emerald-600" /><div><p className="text-xs font-semibold uppercase text-[#777980]">Captured goal</p><p className="mt-2 text-sm leading-6">{workspace.goal_text}</p></div></div>
                    {busy === 'requirements' && <div className="mt-6 flex items-center gap-2 border-t border-[#E5E7E3] pt-5 text-sm text-[#676970]"><Loader2 className="size-4 animate-spin text-[#0D9488]" />Drafting requirements and checking for genuine gaps…</div>}
                  </Panel>
                )}
                {requirements && <Panel className="mt-5 p-5"><h2 className="text-sm font-semibold">Requirements draft</h2><div className="mt-4 grid gap-4 sm:grid-cols-3">{[['Success', requirements.success_definition], ['Target', requirements.target_segment], ['Offer', requirements.offer_summary]].map(([label, value]) => <div key={label}><p className="text-[11px] font-semibold uppercase text-[#777980]">{label}</p><p className="mt-1 text-sm leading-5">{value}</p></div>)}</div></Panel>}
                {pendingQuestions.map((question, index) => <Panel key={question.id} className="mt-5 p-5"><p className="text-[11px] font-semibold uppercase text-[#0D9488]">Gap question {index + 1} of {pendingQuestions.length}</p><h2 className="mt-2 text-sm font-semibold">{question.question_text}</h2><div className="mt-4 flex gap-2"><input value={answers[question.id] || ''} onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))} className="h-10 min-w-0 flex-1 border border-[#DCDDD9] px-3 text-sm outline-none focus:border-[#0D9488]" placeholder="Your answer" /><button type="button" onClick={() => void submitAnswer(question)} disabled={!answers[question.id]?.trim() || busy === `question-${question.id}`} className="bg-[#1C1D20] px-4 text-xs font-medium text-white disabled:opacity-35">Answer</button></div></Panel>)}
              </div>
            )}

            {business && workspace && salesPackage && (
              <div>
                <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="mb-3 text-xs font-semibold uppercase text-[#0D9488]">Sales package</p><h1 className="text-3xl font-semibold">Review before Follei goes live.</h1><p className="mt-3 text-sm text-[#676970]">Pitch is the angle. Script is the progressive conversation.</p></div><div className="flex items-center gap-2"><Languages className="size-4 text-[#777980]" /><select value={workspace.language} onChange={async (event) => setWorkspace(await folleiApi.updateLanguage(workspace.id, event.target.value as Language))} className="h-9 border border-[#DCDDD9] bg-white px-3 text-xs"><option value="TAMIL">Tamil</option><option value="HINDI">Hindi</option><option value="ENGLISH">English</option></select></div></div>
                {salesPackage.verified && <div className="mt-6 flex items-center gap-3 border border-emerald-200 bg-emerald-50 px-4 py-4 text-sm text-emerald-800"><Check className="size-5" /><div><p className="font-semibold">Project 1 is verified and ready.</p><p className="mt-0.5 text-xs">Test the approved strategy in the realtime Call Lab below.</p></div></div>}
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <Panel className="p-5"><p className="text-[11px] font-semibold uppercase text-[#777980]">Sales requirement</p><p className="mt-3 text-sm leading-6">{salesPackage.sales_requirement}</p></Panel>
                  <Panel className="p-5"><p className="text-[11px] font-semibold uppercase text-[#777980]">Sales pitch</p><p className="mt-3 text-sm leading-6">{salesPackage.sales_pitch}</p></Panel>
                </div>
                <Panel className="mt-5 p-5"><h2 className="text-sm font-semibold">Sales strategy</h2><p className="mt-3 text-xs font-semibold uppercase text-[#777980]">Sequencing</p><p className="mt-1 text-sm leading-6">{salesPackage.sales_strategy.sequencing}</p><div className="mt-5 grid gap-4 md:grid-cols-2">{salesPackage.sales_strategy.segments?.map((segment) => <div key={segment.name} className="border-l-2 border-[#0D9488] pl-3"><p className="text-sm font-semibold">{segment.name}</p><p className="mt-1 text-xs leading-5 text-[#676970]">{segment.angle}</p></div>)}</div></Panel>
                <Panel className="mt-5 p-5"><h2 className="text-sm font-semibold">Call script</h2><p className="mt-4 text-[11px] font-semibold uppercase text-[#777980]">Opening</p><p className="mt-1 text-sm leading-6">{salesPackage.call_script.opening}</p><p className="mt-5 text-[11px] font-semibold uppercase text-[#777980]">Key points</p><ul className="mt-2 space-y-2">{salesPackage.call_script.key_points?.map((point) => <li key={point} className="flex gap-2 text-sm leading-5"><Check className="mt-0.5 size-4 shrink-0 text-[#0D9488]" />{point}</li>)}</ul><div className="mt-5 grid gap-4 md:grid-cols-3">{[['Interested', salesPackage.call_script.if_interested], ['Hesitant', salesPackage.call_script.if_hesitant], ['Not interested', salesPackage.call_script.if_not_interested]].map(([label, value]) => <div key={label} className="bg-[#F6F6F3] p-3"><p className="text-[11px] font-semibold uppercase text-[#777980]">{label}</p><p className="mt-2 text-xs leading-5">{value}</p></div>)}</div></Panel>
                {!salesPackage.verified && <Panel className="mt-5 p-5"><h2 className="text-sm font-semibold">Request a change</h2><textarea value={revisionFeedback} onChange={(event) => setRevisionFeedback(event.target.value)} className="mt-3 min-h-24 w-full resize-y border border-[#DCDDD9] p-3 text-sm outline-none focus:border-[#0D9488]" placeholder="Make the pitch shorter, emphasize the guarantee…" /><div className="mt-3 flex flex-wrap justify-end gap-2"><button type="button" onClick={() => void revisePackage()} disabled={!revisionFeedback.trim() || busy === 'revision'} className="flex h-10 items-center gap-2 border border-[#DCDDD9] px-4 text-xs font-medium disabled:opacity-35">{busy === 'revision' && <Loader2 className="size-3.5 animate-spin" />}Generate revision</button><button type="button" onClick={() => void approvePackage()} disabled={busy === 'verify'} className="flex h-10 items-center gap-2 bg-[#1C1D20] px-5 text-xs font-medium text-white disabled:opacity-50">{busy === 'verify' && <Loader2 className="size-3.5 animate-spin" />}Approve package</button></div></Panel>}
                {salesPackage.verified && <CallLab workspace={workspace} leads={leads} />}
              </div>
            )}
          </div>

          {!projectStarted && <aside className="h-fit border border-[#E5E7E3] bg-white p-4 lg:sticky lg:top-24">
            <div className="flex items-center gap-2"><Sparkles className="size-4 text-[#0D9488]" /><h2 className="text-sm font-semibold">Follei setup</h2></div>
            <div className="mt-5 space-y-3">{setupSteps.map((step, index) => <div key={step.label} className="flex items-center gap-3"><span className={`flex size-5 shrink-0 items-center justify-center border text-[10px] ${step.done ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-[#DCDDD9] text-[#8A8C91]'}`}>{step.done ? <Check className="size-3" /> : index + 1}</span><span className={`text-xs ${step.done ? 'text-[#676970]' : 'font-medium'}`}>{step.label}</span></div>)}</div>
            {business && <div className="mt-5 border-t border-[#E5E7E3] pt-4"><div className="flex items-center gap-2"><Building2 className="size-4 text-[#777980]" /><div><p className="text-xs font-medium">{business.name}</p><p className="text-[11px] text-[#8A8C91]">{business.category} · {business.customer_type}</p></div></div></div>}
          </aside>}
        </div>
      </main>
      {mobileNav && <button type="button" className="fixed right-3 top-3 z-[60] lg:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X className="size-5" /></button>}
    </div>
  );
}
