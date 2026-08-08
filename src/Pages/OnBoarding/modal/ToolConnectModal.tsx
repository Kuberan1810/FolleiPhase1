import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  CircleAlert,
  Clock,
  Handshake,
  Lock,
  Mail,
  MessagesSquare,
  Target,
  Users,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { OutlookLogo, FolleiLogo } from "./logo";

type Phase = "sync" | "ai" | "done" | "error";

const STAGES = [
  "Outlook connected",
  "Secure connection established",
  "Reading business data",
  "Understanding sales context",
  "Preparing Follei workspace",
];

type Category = { label: string; count: number; icon: LucideIcon };

const CATEGORIES: Category[] = [
  { label: "Emails", count: 12482, icon: Mail },
  { label: "Contacts", count: 1284, icon: Users },
  { label: "Companies", count: 326, icon: Building2 },
  { label: "Meetings", count: 148, icon: CalendarDays },
  { label: "Follow-ups", count: 84, icon: Clock },
  { label: "Sales Conversations", count: 2431, icon: MessagesSquare },
  { label: "Customer Interactions", count: 3908, icon: Handshake },
  { label: "Email Threads", count: 5140, icon: Mail },
  { label: "Calendar Activities", count: 612, icon: CalendarDays },
  { label: "Potential Leads", count: 176, icon: Target },
  { label: "Existing Opportunities", count: 42, icon: Sparkles },
  { label: "Customer Communication History", count: 9720, icon: MessagesSquare },
];

const AI_STEPS = [
  "Customer relationships identified",
  "Sales conversations organized",
  "Follow-up opportunities identified",
  "Active opportunities detected",
  "Customer communication patterns analyzed",
  "Important contacts identified",
  "Upcoming meetings detected",
  "Follow-up gaps identified",
];

const SUMMARY = [
  { value: "12,482", label: "Emails" },
  { value: "1,284", label: "Contacts" },
  { value: "326", label: "Companies" },
  { value: "148", label: "Meetings" },
  { value: "84", label: "Follow-ups" },
  { value: "42", label: "Opportunities" },
];

const INSIGHTS = [
  "3 high-priority follow-ups",
  "12 active opportunities",
  "8 customers needing attention",
  "24 upcoming meetings",
];

const fmt = (n: number) => n.toLocaleString("en-US");

function useTimeline(shouldFail: boolean, runKey: number) {
  const [phase, setPhase] = useState<Phase>("sync");
  const [progress, setProgress] = useState(2);
  const [stage, setStage] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [found, setFound] = useState(0);
  const [aiDone, setAiDone] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setPhase("sync");
    setProgress(2);
    setStage(0);
    setRevealed(0);
    setFound(0);
    setAiDone(0);

    const at = (ms: number, fn: () => void) => timers.current.push(setTimeout(fn, ms));

    // stages progression
    at(600, () => setStage(1));
    at(1500, () => setStage(2));
    at(5200, () => setStage(3));
    at(8600, () => setStage(4));

    // progress ticks
    for (let i = 1; i <= 48; i++) {
      at(700 + i * 190, () => setProgress(Math.min(100, 2 + Math.round(i * 2.05))));
    }

    // categories revealing / resolving
    CATEGORIES.forEach((_, i) => {
      at(1200 + i * 460, () => setRevealed((r) => Math.max(r, i + 1)));
      at(2100 + i * 460, () => setFound((f) => Math.max(f, i + 1)));
    });

    if (shouldFail) {
      at(6200, () => setPhase("error"));
      return () => timers.current.forEach(clearTimeout);
    }

    at(7600, () => setPhase("ai"));
    AI_STEPS.forEach((_, i) => at(8100 + i * 430, () => setAiDone((n) => Math.max(n, i + 1))));
    at(12200, () => {
      setProgress(100);
      setStage(5);
      setPhase("done");
    });

    return () => timers.current.forEach(clearTimeout);
  }, [shouldFail, runKey]);

  return { phase, progress, stage, revealed, found, aiDone };
}

function FlowNode({
  logo,
  label,
  sub,
  active,
}: {
  logo: React.ReactNode;
  label: string;
  sub: string;
  active: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-col items-center gap-2.5 text-center">
      <div className="relative">
        {active && (
          <span className="node-halo absolute -inset-2 rounded-3xl bg-[#EFF6FF]" aria-hidden />
        )}
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-gray-200 bg-white shadow-xs">
          {logo}
        </div>
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-semibold text-[#191C1E]">{label}</p>
        <p className="text-xs text-[#64748B]">{sub}</p>
      </div>
    </div>
  );
}

function Particles({ vertical }: { vertical: boolean }) {
  const icons: LucideIcon[] = [Mail, Users, CalendarDays, MessagesSquare, Building2];
  const items = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        Icon: icons[i % icons.length] as LucideIcon,
        delay: `${i * 0.48}s`,
        offset: vertical ? `${(i % 3) * 14 - 14}px` : `${(i % 3) * 16 - 16}px`,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [vertical],
  );

  return (
    <>
      {items.map(({ Icon, delay, offset }, i) => (
        <span
          key={i}
          className={`${vertical ? "flow-particle-v" : "flow-particle"} absolute flex h-6 w-6 items-center justify-center rounded-lg border border-gray-200 bg-white text-[#2563EB] shadow-xs`}
          style={
            vertical
              ? { animationDelay: delay, left: `calc(50% - 12px + ${offset})`, top: 0 }
              : { animationDelay: delay, top: `calc(50% - 12px + ${offset})`, left: 0 }
          }
          aria-hidden
        >
          <Icon className="h-3.5 w-3.5" />
        </span>
      ))}
    </>
  );
}

function StageRow({ label, state }: { label: string; state: "done" | "active" | "idle" }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
          state === "done"
            ? "border-transparent bg-[#16A34A] text-white"
            : state === "active"
              ? "border-[#2563EB] bg-[#EFF6FF]"
              : "border-gray-200 bg-white"
        }`}
      >
        {state === "done" ? (
          <Check className="pop-in h-3 w-3" strokeWidth={3} />
        ) : state === "active" ? (
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#2563EB]" />
        ) : null}
      </span>
      <span
        className={
          state === "idle"
            ? "text-[#64748B]"
            : state === "active"
              ? "font-medium text-[#191C1E]"
              : "text-[#191C1E] font-medium"
        }
      >
        {label}
      </span>
    </li>
  );
}

export function OutlookSyncModal({
  shouldFail = false,
  onContinue,
  onDisconnect,
}: {
  shouldFail?: boolean;
  onContinue?: () => void;
  onDisconnect?: () => void;
}) {
  const [runKey, setRunKey] = useState(0);
  const [failing, setFailing] = useState(shouldFail);
  const { phase, progress, stage, revealed, found, aiDone } = useTimeline(failing, runKey);

  const heading =
    phase === "error"
      ? "Sync didn't finish"
      : phase === "done"
        ? "Outlook is connected"
        : phase === "ai"
          ? "Understanding your sales data..."
          : "Connecting Outlook to Follei";

  const sub =
    phase === "error"
      ? "We couldn't finish syncing your Outlook data."
      : phase === "done"
        ? "Your sales activity is now available in Follei."
        : phase === "ai"
          ? "Follei is turning your Outlook activity into useful sales context."
          : "Follei is securely syncing your sales data and preparing your workspace.";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 sm:p-6 font-sans">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Connecting Outlook to Follei"
        className="rise-in flex max-h-[85vh] w-full max-w-[720px] flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3.5 border-b border-gray-100 px-6 pb-5 pt-6 sm:px-8">
          <span
            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
              phase === "error"
                ? "bg-red-50 text-red-600"
                : phase === "done"
                  ? "bg-[#DCFCE7] text-[#16A34A]"
                  : "bg-[#EFF6FF] text-[#2563EB]"
            }`}
          >
            {phase === "error" ? (
              <CircleAlert className="h-5 w-5" />
            ) : phase === "done" ? (
              <Check className="pop-in h-5 w-5" strokeWidth={3} />
            ) : (
              <Sparkles className="h-4.5 w-4.5" />
            )}
          </span>
          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-[#191C1E] sm:text-xl">
              {heading}
            </h2>
            <p className="mt-1 text-sm text-[#64748B]">{sub}</p>
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          {phase === "error" ? (
            <div className="rise-in space-y-4">
              <div className="rounded-xl border border-gray-200 bg-slate-50 p-5">
                <p className="text-sm font-semibold text-[#191C1E]">Possible reason</p>
                <p className="mt-1 text-sm text-[#64748B]">
                  Your account permissions may have changed or the connection may have expired.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Data flow connector */}
              <div className="rounded-2xl border border-gray-100 bg-[#F8FAFC] px-4 py-6 sm:px-8">
                <div className="flex flex-col items-center gap-5 sm:flex-row sm:justify-between sm:gap-4">
                  <FlowNode
                    logo={<OutlookLogo className="h-10 w-10" />}
                    label="Outlook"
                    sub="Your connected account"
                    active={phase !== "done"}
                  />

                  {/* Connector: horizontal on desktop, vertical on mobile */}
                  <div className="relative hidden h-24 flex-1 sm:block" style={{ "--flow-distance": "100%" } as React.CSSProperties}>
                    <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gray-200" />
                    <div
                      className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-[#2563EB] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                    {phase !== "done" && <Particles vertical={false} />}
                    <div className="absolute inset-x-0 bottom-1 flex justify-center">
                      <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-[#64748B] shadow-2xs">
                        {phase === "done" ? "Sync complete" : "Syncing data..."}
                      </span>
                    </div>
                    <ArrowRight className="absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2563EB]" />
                  </div>

                  <div className="relative h-24 w-full sm:hidden" style={{ "--flow-distance": "96px" } as React.CSSProperties}>
                    <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-gray-200" />
                    {phase !== "done" && <Particles vertical />}
                    <div className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center">
                      <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-[#64748B]">
                        {phase === "done" ? "Sync complete" : "Syncing data..."}
                      </span>
                    </div>
                  </div>

                  <FlowNode
                    logo={<FolleiLogo className="h-11 w-11" />}
                    label="Follei"
                    sub="Your sales workspace"
                    active
                  />
                </div>
              </div>

              {/* Progress */}
              <div className="mt-7">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-semibold text-[#191C1E]">
                    {phase === "done" ? "Sync complete" : "Syncing your Outlook data..."}
                  </p>
                  <span className="text-sm font-bold tabular-nums text-[#2563EB]">{progress}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-[#2563EB] transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <ul className="mt-5 space-y-3">
                  {STAGES.map((s, i) => (
                    <StageRow
                      key={s}
                      label={s}
                      state={i < stage ? "done" : i === stage ? "active" : "idle"}
                    />
                  ))}
                </ul>
              </div>

              {/* Categories */}
              {revealed > 0 && phase !== "done" && (
                <div className="mt-8">
                  <h3 className="text-base font-bold text-[#0F172A] tracking-tight mb-3">
                    Follei is finding
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {CATEGORIES.slice(0, revealed).map((c, i) => {
                      const isFound = i < found;
                      return (
                        <div
                          key={c.label}
                          className="rise-in flex items-center justify-between gap-3 rounded-full border border-[#E2E8F0] bg-white px-4 py-2.5 "
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <c.icon className="h-4.5 w-4.5 shrink-0 text-[#475569]" />
                            <span className="truncate text-sm font-medium text-[#191C1E]">{c.label}</span>
                          </div>
                          {isFound ? (
                            <div className="pop-in flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#0F172A]">
                              <Check className="h-4 w-4 text-[#16A34A]" strokeWidth={2.5} />
                              <span>{fmt(c.count)}</span>
                            </div>
                          ) : (
                            <span className="shrink-0 animate-pulse text-xs text-[#64748B]">
                              Analyzing...
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* AI understanding */}
              {(phase === "ai" || phase === "done") && (
                <div className="mt-8">
                  <p className="text-sm font-semibold text-[#191C1E]">
                    {phase === "done" ? "What Follei understood" : "Understanding your sales data"}
                  </p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {AI_STEPS.slice(0, aiDone).map((s) => (
                      <li key={s} className="rise-in flex items-center gap-2.5 text-sm">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#DCFCE7] shrink-0">
                          <Check className="pop-in h-3 w-3 text-[#16A34A]" strokeWidth={3} />
                        </span>
                        <span className="text-[#191C1E] font-normal">{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Final summary */}
              {phase === "done" && (
                <div className="rise-in mt-8 space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
                      Your Outlook data is ready
                    </h3>
                    <p className="mt-1 text-sm text-[#64748B] font-normal">
                      Follei successfully connected and analyzed your sales activity.
                    </p>
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                      {SUMMARY.map((s) => (
                        <div
                          key={s.label}
                          className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-2 sm:p-3.5"
                        >
                          <p className="text-2xl font-bold tracking-tight text-[#0F172A]">
                            {s.value}
                          </p>
                          <p className="mt-1 text-sm text-[#64748B] font-normal">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-5 sm:p-6">
                    <h4 className="text-base font-semibold text-[#0F172A] mb-3">
                      Follei also found
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                      {INSIGHTS.map((t) => (
                        <li key={t} className="flex items-center gap-2.5 text-sm text-[#475569] font-medium">
                          <span className="h-2 w-2 rounded-full bg-[#2563EB] shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 px-6 py-5 sm:px-8 bg-white">
          {phase === "error" ? (
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onDisconnect}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-gray-200 px-4 text-sm font-semibold text-[#191C1E] transition-colors hover:bg-gray-50 cursor-pointer"
              >
                Disconnect Outlook
              </button>
              <button
                type="button"
                onClick={() => {
                  setFailing(false);
                  setRunKey((k) => k + 1);
                }}
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] px-5 text-sm font-semibold text-white transition-colors cursor-pointer shadow-xs"
              >
                Try again
              </button>
            </div>
          ) : phase === "done" ? (
            <div className="flex flex-col items-center gap-2.5">
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] px-8 text-sm font-semibold text-white transition-colors sm:w-auto sm:min-w-[200px] cursor-pointer shadow-sm"
              >
                Continue
              </button>
              <p className="text-xs text-[#64748B]">
                You can manage this connection anytime from Settings.
              </p>
            </div>
          ) : null}

          <div
            className={`flex items-center justify-center gap-2 text-xs text-[#64748B] ${
              phase === "done" || phase === "error" ? "mt-4" : ""
            }`}
          >
            <Lock className="h-3.5 w-3.5 shrink-0" />
            <span>Your data is securely connected to Follei.</span>
            <a href="#" className="font-semibold text-[#2563EB] hover:underline">
              Learn more
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ToolConnectModal() {
  return (
    <main className="min-h-screen bg-slate-400/40 px-4 py-12 flex flex-col items-center justify-center">
      {/* Top Header Logo */}
      <div className="w-full max-w-[720px] mb-4 flex items-center gap-2.5">
        <FolleiLogo className="h-8 w-8" />
        <span className="text-xl font-bold tracking-tight text-[#191C1E]">Follei</span>
      </div>

      <OutlookSyncModal
        onContinue={() => console.log("Continue to next onboarding step")}
        onDisconnect={() => console.log("Disconnected Outlook")}
      />
    </main>
  );
}