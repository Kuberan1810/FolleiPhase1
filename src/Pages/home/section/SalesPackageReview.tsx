import React, { useState } from 'react';
import {
  ArrowUp,
  Check,
  Loader2,
  Sparkles,
  Copy,
  CheckCheck,
  FileText,
  Target,
  ShieldAlert,
  PhoneCall,
  Layers,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  SlidersHorizontal,
  Bot,
  HelpCircle,
  Volume2,
  RefreshCw,
  ArrowRight,
  Zap,
} from 'lucide-react';
import type { GapQuestion, RequirementsDraft, SalesPackage } from '../../../api/setup/setup.api';
import { STAGE_LABELS, type PackageStage } from '../../../hooks/useSalesPackageFlow';

interface Props {
  stage: PackageStage;
  requirements: RequirementsDraft | null;
  gapQuestions: GapQuestion[];
  salesPackage: SalesPackage | null;
  isWorking: boolean;
  onAnswer: (questionId: string, answer: string) => void;
  onApprove: () => void;
  onRequestRevision?: (feedback: string) => void;
}

type TabType = 'pitch' | 'offer' | 'strategy' | 'objections' | 'script';

const getContextualOptions = (questionText: string) => {
  const q = questionText.toLowerCase();

  // 1. USP / Differentiator / Competitor
  if (
    q.includes('unique') ||
    q.includes('apart') ||
    q.includes('competitor') ||
    q.includes('usp') ||
    q.includes('sets') ||
    q.includes('differentiator') ||
    q.includes('advantage')
  ) {
    return [
      { id: '1', label: '100% Placement & Internship Assurance with 100+ hiring tech partners' },
      { id: '2', label: '1-on-1 Mentorship from Senior Industry AI & Data Engineers' },
      { id: '3', label: 'Hands-on Production Capstone Projects with real LLMs & pipelines' },
      { id: '4', label: 'Industry-first curriculum: Fundamentals to Advanced GenAI Agents' },
    ];
  }

  // 2. Pricing / Payment Structure
  if (
    q.includes('price') ||
    q.includes('pricing') ||
    q.includes('payment') ||
    q.includes('cost') ||
    q.includes('fee') ||
    q.includes('structure') ||
    q.includes('emi')
  ) {
    return [
      { id: '1', label: 'Flexible Monthly Installments / No-cost EMI (₹5,000 – ₹10,000/mo)' },
      { id: '2', label: 'Upfront One-time Payment with 15% Early-bird Discount' },
      { id: '3', label: 'Income Share Agreement (ISA) / Pay After Placement' },
      { id: '4', label: 'Merit-based Scholarships & Corporate Sponsorship options' },
    ];
  }

  // 3. Target Audience / Customer Segment
  if (
    q.includes('target') ||
    q.includes('who') ||
    q.includes('audience') ||
    q.includes('student') ||
    q.includes('customer') ||
    q.includes('reach') ||
    q.includes('segment')
  ) {
    return [
      { id: '1', label: 'Recent College Graduates & Final-year Tech Students' },
      { id: '2', label: 'Working Software Engineers & Tech Career Switchers' },
      { id: '3', label: 'Non-tech professionals transitioning into Data & AI' },
      { id: '4', label: 'Enterprise Teams & Corporate Upskilling Cohorts' },
    ];
  }

  // 4. Schedule / Delivery Format / Duration
  if (
    q.includes('schedule') ||
    q.includes('duration') ||
    q.includes('format') ||
    q.includes('mode') ||
    q.includes('weekend') ||
    q.includes('hours')
  ) {
    return [
      { id: '1', label: 'Live Interactive Weekend Batches + Weekly Hands-on Assignments' },
      { id: '2', label: 'Weekday Evening Live Online Cohorts' },
      { id: '3', label: 'Full-time Intensive Bootcamp with Daily Coding Standups' },
      { id: '4', label: 'Hybrid Model: Self-paced Modules + Weekly Live Mentorship' },
    ];
  }

  // 5. Prerequisites / Eligibility
  if (
    q.includes('prerequisite') ||
    q.includes('eligibility') ||
    q.includes('background') ||
    q.includes('coding') ||
    q.includes('math')
  ) {
    return [
      { id: '1', label: 'No coding background required — starts from foundational basics' },
      { id: '2', label: 'Basic Python & fundamental math knowledge recommended' },
      { id: '3', label: 'STEM degree / Tech background preferred' },
      { id: '4', label: 'Open to any driven learner with strong problem-solving mindset' },
    ];
  }

  // Default Fallback
  return [
    { id: '1', label: 'Focus on practical hands-on outcomes & job readiness' },
    { id: '2', label: 'Flexible, affordable options tailored to individual learner needs' },
    { id: '3', label: 'Direct 1-on-1 industry expert guidance throughout the journey' },
    { id: '4', label: 'Proven track record with certified curriculum & portfolio' },
  ];
};

export const SalesPackageReview: React.FC<Props> = ({
  stage,
  requirements,
  gapQuestions,
  salesPackage,
  isWorking,
  onAnswer,
  onApprove,
  onRequestRevision,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<TabType>('pitch');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [revisionText, setRevisionText] = useState('');
  const [openObjectionIndex, setOpenObjectionIndex] = useState<number | null>(0);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);
  const directInputRef = React.useRef<HTMLInputElement>(null);

  const handleCopy = (text: string, sectionKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionKey);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionText.trim() || !onRequestRevision || isWorking) return;
    onRequestRevision(revisionText.trim());
    setRevisionText('');
  };

  const busy = isWorking || stage === 'requirements' || stage === 'gap-questions' || stage === 'package';

  // Stepper calculations
  const getStepStatus = (stepIndex: number) => {
    if (stage === 'verified') return 'completed';
    if (stage === 'review') return stepIndex <= 3 ? 'completed' : stepIndex === 4 ? 'active' : 'pending';
    if (stage === 'package') return stepIndex <= 2 ? 'completed' : stepIndex === 3 ? 'active' : 'pending';
    if (stage === 'awaiting-answers') return stepIndex <= 1 ? 'completed' : stepIndex === 2 ? 'active' : 'pending';
    if (stage === 'gap-questions') return stepIndex <= 1 ? 'completed' : stepIndex === 2 ? 'active' : 'pending';
    if (stage === 'requirements') return stepIndex === 0 ? 'completed' : stepIndex === 1 ? 'active' : 'pending';
    return stepIndex === 0 ? 'completed' : 'pending';
  };

  const steps = [
    { title: 'Goal Settled', desc: 'Target locked' },
    { title: 'Requirements', desc: 'Scope & offerings' },
    { title: 'Gap Questions', desc: 'Clarifications' },
    { title: 'Sales Package', desc: 'Pitch & script' },
    { title: 'Live Calling', desc: 'Verified' },
  ];

  const answeredQuestions = gapQuestions.filter((q) => q.status === 'ANSWERED' && Boolean(q.answer_text));
  const unansweredQuestions = gapQuestions.filter((q) => q.status !== 'ANSWERED');
  const safeIndex = Math.min(Math.max(0, activeQuestionIndex), Math.max(0, unansweredQuestions.length - 1));
  const currentQuestion = unansweredQuestions[safeIndex];
  const questionOptions = currentQuestion ? getContextualOptions(currentQuestion.question_text) : [];

  const handleOptionSelect = (optionText: string) => {
    if (!currentQuestion || isWorking) return;
    onAnswer(currentQuestion.id, optionText);
  };

  const handleDirectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuestion || isWorking) return;
    const value = (answers[currentQuestion.id] || '').trim();
    if (!value) return;
    onAnswer(currentQuestion.id, value);
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: '' }));
  };

  return (
    <div className="w-full flex flex-col gap-6 animate-fade-slide">
      {/* 1. Visual Stage Progress Tracker */}
      <div className="rounded-[24px] border border-[#E6E6E4] bg-white p-4.5 shadow-2xs">
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 scrollbar-hide pt-1">
          {steps.map((step, idx) => {
            const status = getStepStatus(idx);
            const isCurrent =
              (idx === 1 && (stage === 'requirements' || stage === 'gap-questions')) ||
              (idx === 2 && stage === 'awaiting-answers') ||
              (idx === 3 && (stage === 'package' || stage === 'review')) ||
              (idx === 4 && stage === 'verified');

            return (
              <div key={idx} className="flex items-center gap-2 min-w-[130px] flex-1">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition-all ${status === 'completed'
                      ? 'bg-[#0D9488] text-white shadow-2xs'
                      : isCurrent
                        ? 'bg-[#16171A] text-white ring-4 ring-[#0D9488]/15'
                        : 'bg-[#F1F3F5] text-[#717378]'
                      }`}
                  >
                    {status === 'completed' ? (
                      <Check className="size-3.5 stroke-[2.5]" />
                    ) : isCurrent && busy ? (
                      <Loader2 className="size-3.5 animate-spin text-[#A7F3D0]" />
                    ) : (
                      <span>{idx + 1}</span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span
                      className={`text-[12.5px] font-semibold leading-tight ${
                        isCurrent
                          ? 'text-[#16171A]'
                          : status === 'completed'
                          ? 'text-[#0D9488]'
                          : 'text-[#717378]'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[11px] text-[#94A3B8] hidden sm:block">{step.desc}</span>
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`h-[2px] flex-1 mx-1.5 rounded-full ${status === 'completed' ? 'bg-[#0D9488]' : 'bg-[#E6E6E4]'
                      }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Live Busy Generation Spinner Banner */}
      {busy && (
        <div className="flex items-center gap-3.5 rounded-[22px] border border-[#A7F3D0] bg-[#ECFDF5] px-5 py-4 text-[#047857] shadow-2xs animate-fade-slide">
          <div className="flex size-8 items-center justify-center rounded-full bg-[#0D9488] text-white shrink-0">
            <Loader2 className="size-4 animate-spin" />
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-semibold">{STAGE_LABELS[stage]}</span>
            <span className="text-[12px] text-[#059669]">Follei is crafting personalized sales material based on your business data.</span>
          </div>
        </div>
      )}

      {/* 3. Phase 4: Requirements Draft Summary Card */}
      {requirements && (
        <div className="rounded-[26px] border border-[#E6E6E4] bg-white p-5.5 shadow-2xs flex flex-col gap-4 animate-fade-slide">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="flex size-7 items-center justify-center rounded-lg bg-[#F1F5F9] text-[#0D9488]">
                <Target className="size-4" />
              </div>
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#717378]">
                REQUIREMENTS DRAFT
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F4FBF7] text-[#0D9488] border border-[#A7F3D0]/60 text-[11.5px] font-medium">
              Phase 4 Output
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                Target Audience Segment
              </span>
              <p className="text-[14px] font-medium text-[#1E293B]">
                {requirements.target_segment}
              </p>
            </div>

            <div className="flex flex-col gap-1 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B]">
                Success Definition
              </span>
              <p className="text-[14px] font-medium text-[#1E293B]">
                {requirements.success_definition}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 rounded-2xl bg-[#FDFDFC] border border-[#E6E6E4] p-4">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#717378]">
              Offer Summary
            </span>
            <p className="text-[13.5px] leading-relaxed text-[#47484B]">
              {requirements.offer_summary}
            </p>
          </div>
        </div>
      )}

      {/* 4. Answered Clarification Q&A Summary Card (Claude-style) */}
      {answeredQuestions.length > 0 && (
        <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-[0_2px_16px_rgba(0,0,0,0.03)] flex flex-col gap-4 animate-fade-slide">
          {answeredQuestions.map((q, idx) => (
            <div
              key={q.id}
              className={`flex flex-col gap-1.5 ${
                idx > 0 ? 'border-t border-gray-100 pt-3.5' : ''
              }`}
            >
              <p className="text-[13.5px] text-[#717378] font-normal leading-snug">
                {q.question_text}
              </p>
              <p className="text-[15px] text-[#16171A] font-semibold leading-relaxed">
                {q.answer_text}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 5. Phase 5: Single-Question Interactive Claude-Style Questionnaire */}
      {stage === 'awaiting-answers' && currentQuestion && (
        <div className="flex flex-col gap-3 animate-fade-slide">
          {/* Main Question Card */}
          <div className="rounded-[24px] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col gap-4">
            {/* Header Row: Question Title + Stepper */}
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 pb-3">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0D9488]">
                  CLARIFYING QUESTION
                </span>
                <h3 className="text-[16px] sm:text-[17px] font-semibold text-[#16171A] tracking-tight leading-snug">
                  {currentQuestion.question_text}
                </h3>
              </div>

              {/* Stepper Navigation (< 1 of N >) */}
              {unansweredQuestions.length > 1 && (
                <div className="flex items-center gap-1 shrink-0 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full px-2 py-1.5 text-[12px] font-medium text-[#64748B]">
                  <button
                    type="button"
                    aria-label="Previous question"
                    disabled={safeIndex === 0}
                    onClick={() => setActiveQuestionIndex((prev) => Math.max(0, prev - 1))}
                    className="size-5 flex items-center justify-center rounded-full hover:bg-gray-200 text-[#717378] hover:text-[#16171A] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <span className="px-1 font-medium text-[11.5px] select-none">
                    {safeIndex + 1} of {unansweredQuestions.length}
                  </span>
                  <button
                    type="button"
                    aria-label="Next question"
                    disabled={safeIndex === unansweredQuestions.length - 1}
                    onClick={() => setActiveQuestionIndex((prev) => Math.min(unansweredQuestions.length - 1, prev + 1))}
                    className="size-5 flex items-center justify-center rounded-full hover:bg-gray-200 text-[#717378] hover:text-[#16171A] disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Contextual Options: 1, 2, 3, 4 */}
            <div className="flex flex-col gap-2">
              {questionOptions.map((opt, idx) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleOptionSelect(opt.label)}
                  disabled={isWorking}
                  className="group flex items-center justify-between w-full p-3 sm:p-3.5 rounded-[16px] border border-[#E6E6E4] bg-[#FDFDFC] hover:bg-[#F4F4F0] hover:border-[#D1D5DB] transition-all duration-150 cursor-pointer text-left shadow-2xs hover:shadow-xs active:scale-[0.99] disabled:opacity-50"
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#EBEBE8] text-[#16171A] group-hover:bg-[#16171A] group-hover:text-white text-[12px] font-bold transition-colors">
                      {idx + 1}
                    </span>
                    <span className="text-[13.5px] sm:text-[14px] text-[#16171A] group-hover:text-black font-medium leading-normal">
                      {opt.label}
                    </span>
                  </div>
                  <div className="flex size-6 shrink-0 items-center justify-center text-[#94A3B8] group-hover:text-[#16171A] transition-colors opacity-0 group-hover:opacity-100">
                    <ArrowRight className="size-4" />
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
              {/* Something else button */}
              <button
                type="button"
                onClick={() => {
                  directInputRef.current?.focus();
                  directInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#717378] hover:text-[#16171A] transition-colors cursor-pointer"
              >
                <span>✎ Something else</span>
              </button>

              {/* Skip button */}
              <button
                type="button"
                onClick={() => {
                  if (safeIndex < unansweredQuestions.length - 1) {
                    setActiveQuestionIndex((prev) => prev + 1);
                  } else {
                    handleOptionSelect('Standard industry defaults');
                  }
                }}
                className="rounded-lg bg-[#F1F3F5] hover:bg-[#E2E8F0] px-3.5 py-1.5 text-[12.5px] font-medium text-[#47484B] transition-colors cursor-pointer"
              >
                Skip
              </button>
            </div>
          </div>

          {/* Bottom Direct Reply Input Bar */}
          <form
            onSubmit={handleDirectSubmit}
            onClick={() => directInputRef.current?.focus()}
            className="flex items-center gap-2.5 rounded-[22px] border border-[#E2E8F0] bg-white p-2.5 pl-4 focus-within:border-[#94A3B8] focus-within:shadow-xs transition-all shadow-2xs cursor-text"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                directInputRef.current?.focus();
              }}
              className="flex size-6 items-center justify-center text-[#94A3B8] hover:text-[#16171A] text-[20px] font-light leading-none select-none cursor-pointer"
            >
              +
            </button>
            <input
              ref={directInputRef}
              type="text"
              value={answers[currentQuestion.id] || ''}
              onChange={(e) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: e.target.value }))}
              placeholder="Or reply directly in detail..."
              disabled={isWorking}
              className="min-w-0 flex-1 bg-transparent text-[14px] text-[#16171A] outline-none placeholder:text-[#94A3B8]"
            />
            <button
              type="submit"
              aria-label="Submit Answer"
              disabled={isWorking || !(answers[currentQuestion.id] || '').trim()}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#16171A] hover:bg-black text-white disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs active:scale-95"
            >
              {isWorking ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4 stroke-[2.4]" />}
            </button>
          </form>
        </div>
      )}

      {/* 5. Phase 6 & 7: Sales Package Studio (Hero Pitch, Strategy, Script, Objections) */}
      {salesPackage && (stage === 'review' || stage === 'verified') && (
        <div className="rounded-[28px] border border-[#E6E6E4] bg-white p-5 sm:p-7 shadow-xs flex flex-col gap-6 animate-fade-slide">
          {/* Studio Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              {/* <div className="flex size-9 items-center justify-center rounded-xl bg-[#16171A] text-white shadow-2xs">
                <Sparkles className="size-4.5 text-[#A7F3D0]" />
              </div> */}
              <div>
                <h3 className="text-[17px] font-semibold text-[#16171A] tracking-tight">
                  Follei Sales Engine & Pitch Studio
                </h3>
                <p className="text-[12.5px] text-[#717378]">
                  Automated sales strategy, objections, and call script generated from your data.
                </p>
              </div>
            </div>

            {stage === 'verified' ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[13px] font-semibold text-[#047857]">
                <Check className="size-4 stroke-[3]" />
                Verified & Live
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F4FBF7] border border-[#A7F3D0]/70 text-[12px] font-medium text-[#0D9488]">
                <Zap className="size-3 text-[#0D9488]" />
                Ready for Review
              </span>
            )}
          </div>

          {/* Studio Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide border-b border-[#E6E6E4]/70">
            <button
              type="button"
              onClick={() => setActiveTab('pitch')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-[13.5px] font-semibold transition-all border-b-2 cursor-pointer ${activeTab === 'pitch'
                ? 'border-[#0D9488] text-[#0D9488] bg-[#F4FBF7]/60'
                : 'border-transparent text-[#717378] hover:text-[#16171A] hover:bg-gray-50'
                }`}
            >
              <MessageSquare className="size-4" />
              <span>The Pitch</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('strategy')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-[13.5px] font-semibold transition-all border-b-2 cursor-pointer ${activeTab === 'strategy'
                ? 'border-[#0D9488] text-[#0D9488] bg-[#F4FBF7]/60'
                : 'border-transparent text-[#717378] hover:text-[#16171A] hover:bg-gray-50'
                }`}
            >
              <Target className="size-4" />
              <span>Target Segments</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('objections')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-[13.5px] font-semibold transition-all border-b-2 cursor-pointer ${activeTab === 'objections'
                ? 'border-[#0D9488] text-[#0D9488] bg-[#F4FBF7]/60'
                : 'border-transparent text-[#717378] hover:text-[#16171A] hover:bg-gray-50'
                }`}
            >
              <ShieldAlert className="size-4" />
              <span>Objection Handling</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('script')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-[13.5px] font-semibold transition-all border-b-2 cursor-pointer ${activeTab === 'script'
                ? 'border-[#0D9488] text-[#0D9488] bg-[#F4FBF7]/60'
                : 'border-transparent text-[#717378] hover:text-[#16171A] hover:bg-gray-50'
                }`}
            >
              <PhoneCall className="size-4" />
              <span>Call Script</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('offer')}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-[13.5px] font-semibold transition-all border-b-2 cursor-pointer ${activeTab === 'offer'
                ? 'border-[#0D9488] text-[#0D9488] bg-[#F4FBF7]/60'
                : 'border-transparent text-[#717378] hover:text-[#16171A] hover:bg-gray-50'
                }`}
            >
              <FileText className="size-4" />
              <span>Offer Details</span>
            </button>
          </div>

          {/* TAB 1: THE PITCH */}
          {activeTab === 'pitch' && (
            <div className="flex flex-col gap-5 animate-fade-slide">
              <div className="relative rounded-[24px] border border-[#A7F3D0]/80 bg-gradient-to-br from-[#F4FBF7] via-white to-[#F0FDF4] p-6 shadow-2xs">
                <div className="flex items-center justify-between gap-3 mb-3 border-b border-[#A7F3D0]/40 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex size-2 rounded-full bg-[#0D9488] animate-pulse" />
                    <span className="text-[11.5px] font-semibold tracking-wider text-[#0D9488] uppercase">
                      CORE VALUE PITCH
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(salesPackage.sales_pitch, 'pitch')}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E6E6E4] text-[12px] font-medium text-[#47484B] hover:text-[#16171A] hover:border-gray-400 transition-all cursor-pointer shadow-2xs"
                  >
                    {copiedSection === 'pitch' ? (
                      <>
                        <CheckCheck className="size-3.5 text-[#0D9488]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        <span>Copy Pitch</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="whitespace-pre-wrap text-[16px] leading-[28px] text-[#16171A] font-medium">
                  "{salesPackage.sales_pitch}"
                </p>
              </div>

              {/* What We're Selling Requirement */}
              <div className="rounded-[22px] border border-[#E6E6E4] bg-[#FDFDFC] p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#717378] block mb-2">
                  WHAT WE'RE SELLING & WHY IT MATTERS
                </span>
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#47484B]">
                  {salesPackage.sales_requirement}
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: STRATEGY & SEGMENTS */}
          {activeTab === 'strategy' && (
            <div className="flex flex-col gap-4 animate-fade-slide">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#717378]">
                TARGET SEGMENTS & STRATEGIC ANGLES
              </span>

              {salesPackage.sales_strategy?.segments && salesPackage.sales_strategy.segments.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {salesPackage.sales_strategy.segments.map((seg, idx) => (
                    <div
                      key={idx}
                      className="rounded-[22px] border border-[#E6E6E4] bg-[#F8FAFC] p-4.5 shadow-2xs flex flex-col gap-2 hover:border-[#0D9488]/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded-full bg-[#0D9488] text-white text-[11px] font-bold">
                          {idx + 1}
                        </div>
                        <h4 className="text-[14px] font-semibold text-[#16171A]">{seg.name}</h4>
                      </div>
                      <p className="text-[13px] leading-relaxed text-[#475569]">
                        <span className="font-medium text-[#1E293B]">Approach Angle:</span> {seg.angle}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[22px] border border-[#E6E6E4] bg-[#F8FAFC] p-4.5">
                  <p className="text-[13.5px] text-[#717378]">
                    {JSON.stringify(salesPackage.sales_strategy, null, 2)}
                  </p>
                </div>
              )}

              {salesPackage.sales_strategy?.sequencing && (
                <div className="rounded-[22px] border border-[#E6E6E4] bg-[#FDFDFC] p-5 mt-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#717378] block mb-2">
                    SEQUENCING & CADENCE
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-[#47484B]">
                    {salesPackage.sales_strategy.sequencing}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: OBJECTION HANDLING */}
          {activeTab === 'objections' && (
            <div className="flex flex-col gap-3.5 animate-fade-slide">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#717378]">
                  POTENTIAL PROSPECT OBJECTIONS & PROVEN COUNTERS
                </span>
              </div>

              {salesPackage.sales_strategy?.objections && salesPackage.sales_strategy.objections.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {salesPackage.sales_strategy.objections.map((obj, idx) => {
                    const isOpen = openObjectionIndex === idx;

                    return (
                      <div
                        key={idx}
                        className="rounded-[22px] border border-[#E6E6E4] bg-white overflow-hidden shadow-2xs transition-all"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenObjectionIndex(isOpen ? null : idx)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50/70 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                              !
                            </span>
                            <span className="text-[14px] font-semibold text-[#16171A]">
                              "{obj.objection}"
                            </span>
                          </div>
                          <ChevronRight
                            className={`size-4 text-[#717378] transition-transform duration-200 ${isOpen ? 'rotate-90' : ''
                              }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="p-4 pt-1 bg-[#F4FBF7]/50 border-t border-[#E6E6E4] flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0D9488]">
                                FOLLEI RECOMMENDED COUNTER-RESPONSE:
                              </span>
                              <button
                                type="button"
                                onClick={() => handleCopy(obj.response, `obj-${idx}`)}
                                className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[#0D9488] hover:underline cursor-pointer"
                              >
                                {copiedSection === `obj-${idx}` ? (
                                  <>
                                    <CheckCheck className="size-3 text-[#0D9488]" />
                                    <span>Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-3" />
                                    <span>Copy response</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <p className="text-[13.5px] leading-relaxed text-[#16171A]">
                              {obj.response}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-[22px] border border-[#E6E6E4] bg-[#F8FAFC] p-4.5">
                  <p className="text-[13.5px] text-[#717378]">No explicit objections structured.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CALL SCRIPT TELEPROMPTER */}
          {activeTab === 'script' && (
            <div className="flex flex-col gap-4 animate-fade-slide">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-semibold uppercase tracking-wider text-[#717378]">
                  STEP-BY-STEP TELEPROMPTER SCRIPT
                </span>
                <span className="text-[11.5px] text-[#0D9488] font-medium flex items-center gap-1">
                  <Volume2 className="size-3.5" />
                  Optimized for natural conversation
                </span>
              </div>

              {/* Script Blocks */}
              <div className="flex flex-col gap-3.5">
                {/* 1. Opening */}
                {salesPackage.call_script?.opening && (
                  <div className="rounded-[22px] border border-[#E6E6E4] bg-white p-4.5 shadow-2xs flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                      1. OPENING GREETING & HOOK
                    </span>
                    <p className="text-[14px] leading-relaxed text-[#16171A]">
                      {salesPackage.call_script.opening}
                    </p>
                  </div>
                )}

                {/* 2. Discovery Questions */}
                {salesPackage.call_script?.discovery_questions &&
                  salesPackage.call_script.discovery_questions.length > 0 && (
                    <div className="rounded-[22px] border border-[#E6E6E4] bg-white p-4.5 shadow-2xs flex flex-col gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600">
                        2. DISCOVERY QUESTIONS
                      </span>
                      <ul className="flex flex-col gap-1.5 pl-2">
                        {salesPackage.call_script.discovery_questions.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-[13.5px] text-[#16171A]">
                            <span className="size-1.5 rounded-full bg-purple-500 mt-2 shrink-0" />
                            <span>{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                {/* 3. If Interested */}
                {salesPackage.call_script?.if_interested && (
                  <div className="rounded-[22px] border border-[#A7F3D0]/80 bg-[#F4FBF7] p-4.5 shadow-2xs flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#0D9488]">
                      3. IF PROSPECT SHOWS INTEREST (PITCH OFFER)
                    </span>
                    <p className="text-[14px] leading-relaxed text-[#16171A]">
                      {salesPackage.call_script.if_interested}
                    </p>
                  </div>
                )}

                {/* 4. If Hesitant */}
                {salesPackage.call_script?.if_hesitant && (
                  <div className="rounded-[22px] border border-amber-200 bg-amber-50/40 p-4.5 shadow-2xs flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                      4. IF HESITANT / RESISTANCE
                    </span>
                    <p className="text-[14px] leading-relaxed text-[#16171A]">
                      {salesPackage.call_script.if_hesitant}
                    </p>
                  </div>
                )}

                {/* 5. Closing */}
                {salesPackage.call_script?.closing && (
                  <div className="rounded-[22px] border border-[#E6E6E4] bg-white p-4.5 shadow-2xs flex flex-col gap-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">
                      5. CLOSING & SCHEDULING NEXT STEP
                    </span>
                    <p className="text-[14px] leading-relaxed text-[#16171A]">
                      {salesPackage.call_script.closing}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: OFFER DETAILS */}
          {activeTab === 'offer' && (
            <div className="flex flex-col gap-4 animate-fade-slide">
              <div className="rounded-[22px] border border-[#E6E6E4] bg-[#F8FAFC] p-5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#717378] block mb-2">
                  FULL SALES REQUIREMENT SPECIFICATION
                </span>
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#16171A]">
                  {salesPackage.sales_requirement}
                </p>
              </div>
            </div>
          )}

          {/* 6. AI Refinement Bar */}
          {stage !== 'verified' && onRequestRevision && (
            <div className="mt-2 pt-4 border-t border-gray-100 flex flex-col gap-2">
              <span className="text-[12px] font-semibold text-[#717378] flex items-center gap-1.5">
                <SlidersHorizontal className="size-3.5" />
                Want to adjust anything? Ask Follei to refine the pitch:
              </span>
              <form
                onSubmit={handleRevisionSubmit}
                className="flex items-center gap-2 rounded-[20px] border border-[#E2E8F0] bg-[#F8FAFC] p-2 pl-4 focus-within:border-[#0D9488] focus-within:bg-white transition-all"
              >
                <input
                  value={revisionText}
                  onChange={(e) => setRevisionText(e.target.value)}
                  placeholder="e.g. 'Make the opening hook shorter' or 'Add budget objection response'..."
                  disabled={isWorking}
                  className="min-w-0 flex-1 bg-transparent text-[13.5px] text-[#16171A] outline-none placeholder:text-[#94A3B8]"
                />
                <button
                  type="submit"
                  disabled={isWorking || !revisionText.trim()}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#16171A] text-white hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all shadow-2xs active:scale-95"
                >
                  {isWorking ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4 stroke-[2.4]" />}
                </button>
              </form>
            </div>
          )}

          {/* 7. Action Footer: Approve & Go Live Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-100">
            {stage === 'verified' ? (
              <div className="flex items-center gap-2.5 text-[#047857] text-[14px] font-semibold">
                <div className="flex size-7 items-center justify-center rounded-full bg-[#0D9488] text-white">
                  <Check className="size-4 stroke-[3]" />
                </div>
                <span>Package verified and deployed to workspace leads</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={onApprove}
                disabled={isWorking}
                className="inline-flex items-center gap-2 rounded-full bg-[#16171A] hover:bg-black text-white px-7 py-3 text-[14.5px] font-semibold transition-all shadow-sm cursor-pointer hover:scale-[1.01] active:scale-98 disabled:opacity-50"
              >
                {isWorking ? (
                  <>
                    <Loader2 className="size-4.5 animate-spin text-[#A7F3D0]" />
                    <span>Approving Sales Engine...</span>
                  </>
                ) : (
                  <>
                   
                    <span>Approve and Go Live</span>
                    <ArrowRight className="size-4 text-[#fff]" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPackageReview;
