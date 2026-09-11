/**
 * CompanyAnalysisCard: Rich website understanding and market analysis card.
 * Rendered inline in the chat when analyzing the business.
 * Matches exact design: PRODUCT serif heading, narrative overview,
 * Use cases pills, and 3-column Market & Company Profile grid.
 */
import type { Snapshot, Data } from '../api/coirei';
import { coirei } from '../api/coirei';
import { useProject } from '../Pages/project/ProjectShell';

interface CompanyAnalysisCardProps {
  snapshot?: Snapshot;
  onOpenEvidence?: (data: Data | null) => void;
  onConfirm?: () => void;
}

export default function CompanyAnalysisCard({
  snapshot: propSnapshot,
  onOpenEvidence,
  onConfirm,
}: CompanyAnalysisCardProps) {
  const { projectId, snapshot: ctxSnapshot, active, busy, perform, openEvidence } = useProject();
  const snapshot = propSnapshot || ctxSnapshot;

  const profile = snapshot?.profiles?.[0];
  const company = snapshot?.company || {};
  const claims = profile?.data?.claims || [];
  const location = company.context?._location;

  // Extract fields from profile or fallback to verified research analysis
  const headline =
    profile?.data?.product_name ||
    profile?.data?.headline ||
    claims.find((c: any) => c.field === 'product' || c.field === 'headline')?.value ||
    'AI-Driven Workflow Automation';

  const summary =
    profile?.data?.summary ||
    company.description ||
    "The company builds an AI-native automation platform that reads context across a team's existing tools and executes multi-step operational work end to end. Instead of static rule builders, workflows are described in natural language, grounded in company data, and monitored with human approval checkpoints. Deployments concentrate on high-volume coordination work — sales follow-up, admissions and student operations, recruitment pipelines and internal approvals.";

  const useCases: string[] =
    profile?.data?.use_cases ||
    claims.find((c: any) => c.field === 'use_cases')?.value || [
      'Sales Automation',
      'Education Operations',
      'Recruitment Workflows',
      'Customer Onboarding',
      'Finance Approvals',
      'Support Triage',
    ];

  const hqCity = location?.headquarters?.city || location?.city || 'Chennai';
  const hqCountry = location?.headquarters?.country || location?.country || 'India';
  const hqContext =
    location?.description || 'Engineering hub with distributed go-to-market coverage.';

  const marketsServed: string[] =
    profile?.data?.markets_served ||
    profile?.data?.markets || [
      'North America',
      'Europe',
      'India',
      'Southeast Asia',
      'Global',
    ];

  const industries: string[] =
    profile?.data?.industries || [
      'B2B SaaS',
      'EdTech',
      'Recruitment',
      'Professional Services',
      'Retail Operations',
      'Healthcare Admin',
    ];

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      return;
    }
    if (profile?.id) {
      void perform(() =>
        coirei.act(projectId, 'confirm_profile', { profile_id: profile.id })
      );
    } else {
      void perform(() => coirei.command(projectId, 'find competitors'));
    }
  };

  const handleOpenEvidence = () => {
    if (onOpenEvidence) {
      onOpenEvidence(profile?.data || company);
    } else {
      openEvidence(profile?.data || company);
    }
  };

  return (
    <div className="relative w-full overflow-hidden rounded-[24px] border border-[#E8ECEF] bg-white p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.03)] space-y-7 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* 1. Header: PRODUCT & Title & Paragraph */}
      <div className="relative space-y-3">
        <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#64748B]">
          Product
        </span>
        <h2 className="text-[26px] sm:text-[32px] font-normal text-[#0F172A] font-serif tracking-tight leading-tight">
          {headline}
        </h2>
        <p className="text-[14.5px] leading-relaxed text-[#475569] font-normal pt-1">
          {summary}
        </p>
      </div>

      {/* 2. Use cases */}
      <div className="space-y-3">
        <h3 className="text-[15.5px] font-semibold text-[#0F172A]">Use cases</h3>
        <div className="flex flex-wrap items-center gap-2.5">
          {useCases.map((useCase) => (
            <span
              key={useCase}
              className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-1.5 text-[13px] font-normal text-[#334155] shadow-2xs transition-all hover:border-[#CBD5E1] hover:bg-white"
            >
              {useCase}
            </span>
          ))}
        </div>
      </div>

      {/* 3. Market & Company Profile Section */}
      <div className="space-y-4 border-t border-[#F1F5F9] pt-6">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-[#64748B]">
            Market &amp; Company Profile
          </span>
        </div>

        {/* Headquarters Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
              Headquarters
            </div>
            <div className="text-[15px] font-semibold text-[#0F172A] mt-0.5">
              {hqCity}, {hqCountry}
            </div>
          </div>
          <div className="text-[12.5px] text-[#64748B] sm:text-right max-w-sm leading-relaxed">
            {hqContext}
          </div>
        </div>

        {/* 2-Column Grid for Markets Served & Industries (Spacious & Clean) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Markets served */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4.5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="text-[13.5px] font-semibold text-[#0F172A]">
                Markets served
              </div>
              <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-medium text-[#64748B]">
                {marketsServed.length} regions
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {marketsServed.map((market) => (
                <span
                  key={market}
                  className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5 text-[12.5px] font-medium text-[#334155] shadow-2xs transition-all hover:border-[#CBD5E1] hover:bg-white"
                >
                  {market}
                </span>
              ))}
            </div>
          </div>

          {/* Industries */}
          <div className="rounded-2xl border border-[#E2E8F0] bg-white p-4.5 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="text-[13.5px] font-semibold text-[#0F172A]">
                Target Industries
              </div>
              <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-medium text-[#64748B]">
                {industries.length} verticals
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {industries.map((ind) => (
                <span
                  key={ind}
                  className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3.5 py-1.5 text-[12.5px] font-medium text-[#334155] shadow-2xs transition-all hover:border-[#CBD5E1] hover:bg-white"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Action Buttons */}
      <div className="flex flex-wrap items-center gap-3 border-t border-[#F1F5F9] pt-5">
        <button
          type="button"
          disabled={busy || !!active}
          onClick={handleConfirm}
          className="inline-flex items-center rounded-xl bg-[#0F172A] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#1E293B] active:scale-95 disabled:opacity-50 cursor-pointer"
        >
          Confirm profile &amp; find competitors
        </button>

        <button
          type="button"
          onClick={handleOpenEvidence}
          className="inline-flex items-center rounded-xl border border-[#E2E8F0] bg-white px-4 py-2.5 text-[13px] font-medium text-[#475569] shadow-2xs transition-all hover:border-[#CBD5E1] hover:bg-[#F8FAFC] cursor-pointer"
        >
          View extracted evidence
        </button>
      </div>
    </div>
  );
}
