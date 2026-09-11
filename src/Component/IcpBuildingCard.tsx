/**
 * IcpBuildingCard: Ultra-premium SaaS animated progress card shown while
 * building the Ideal Customer Profile (ICP) or discovering qualified leads.
 */
import { Loader2 } from 'lucide-react';

interface IcpBuildingCardProps {
  stage?: string;
  stepText?: string;
}

export default function IcpBuildingCard({ stage = 'icp', stepText }: IcpBuildingCardProps) {
  const isLeads = stage === 'leads';

  const title = isLeads
    ? 'Finding Matching Leads & Accounts'
    : 'Building your Ideal Customer Profile (ICP)';

  const subtitle = isLeads
    ? 'Discovering high-intent accounts and key decision makers matching your approved ICP criteria…'
    : 'Synthesizing market positioning, competitor differentiators, and target buyer criteria…';

  const steps = isLeads
    ? [
        { label: 'Scouring market data for verified companies', status: 'done' },
        { label: 'Identifying key decision makers and verified contacts', status: 'active' },
        { label: 'Computing ICP fit scores and research insights', status: 'pending' },
      ]
    : [
        { label: 'Analyzing competitor landscape & differentiators', status: 'done' },
        { label: 'Extracting target industries, buyer roles & pains', status: 'active' },
        { label: 'Calibrating qualification criteria & scoring weights', status: 'pending' },
      ];

  return (
    <div className="w-full rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <Loader2 className="size-4 animate-spin text-[#0F172A]" />
            <h3 className="text-[15px] font-semibold text-[#0F172A] tracking-tight">
              {title}
            </h3>
            <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-medium text-[#475569]">
              In Progress
            </span>
          </div>
          <p className="text-[13px] text-[#64748B] pl-6.5">
            {stepText || subtitle}
          </p>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="mt-4 pl-6.5">
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
          <div className="absolute inset-y-0 left-0 w-2/3 rounded-full bg-[#0F172A] animate-pulse" />
        </div>

        {/* Live Step Progress Checklist */}
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          {steps.map((step, idx) => {
            const isDone = step.status === 'done';
            const isActive = step.status === 'active';

            return (
              <div
                key={idx}
                className={`flex items-center gap-2 rounded-xl border p-2.5 text-[12px] transition-all ${
                  isActive
                    ? 'border-[#CBD5E1] bg-[#F8FAFC] text-[#0F172A] font-medium shadow-xs'
                    : isDone
                    ? 'border-[#E2E8F0] bg-white text-[#334155]'
                    : 'border-[#F1F5F9] bg-[#FAFAFA] text-[#94A3B8]'
                }`}
              >
                <div
                  className={`size-2 shrink-0 rounded-full ${
                    isActive
                      ? 'bg-[#0F172A] animate-ping'
                      : isDone
                      ? 'bg-[#059669]'
                      : 'bg-[#CBD5E1]'
                  }`}
                />
                <span className="truncate">{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
