import React, { useState } from 'react';
import { ArrowUp, Check, Loader2 } from 'lucide-react';
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
}

const Card: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="rounded-[28px] border border-[#E6E6E4] bg-white p-5">
    <span className="mb-2 block text-[11px] font-medium uppercase tracking-wider text-[#717378]">
      {label}
    </span>
    {children}
  </div>
);

/** Renders the strategy/script objects without assuming a fixed shape. The
 *  backend types these as free-form dicts filled by a model, so iterating the
 *  actual keys shows everything -- an explicit field-by-field renderer would
 *  silently drop anything the type did not anticipate. */
const Structured: React.FC<{ value: object }> = ({ value }) => (
  <div className="flex flex-col gap-3">
    {Object.entries(value as Record<string, unknown>).map(([key, item]) => (
      <div key={key}>
        <p className="mb-1 text-[12.5px] font-medium capitalize text-[#16171A]">
          {key.replace(/_/g, ' ')}
        </p>
        <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-[#737373]">
          {Array.isArray(item)
            ? item.map((entry) => (typeof entry === 'string' ? entry : JSON.stringify(entry))).join('\n• ')
            : typeof item === 'string'
              ? item
              : JSON.stringify(item, null, 2)}
        </p>
      </div>
    ))}
  </div>
);

export const SalesPackageReview: React.FC<Props> = ({
  stage,
  requirements,
  gapQuestions,
  salesPackage,
  isWorking,
  onAnswer,
  onApprove,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const busy = stage === 'requirements' || stage === 'gap-questions' || stage === 'package';
  if (busy) {
    return (
      <div className="flex items-center gap-2.5 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2.5 text-[13px] font-medium text-[#047857]">
        <Loader2 className="size-4 animate-spin text-[#059669]" />
        <span>{STAGE_LABELS[stage]}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 animate-fade-slide">
      {requirements && (
        <Card label="WHAT SUCCESS LOOKS LIKE">
          <p className="text-[14px] leading-relaxed text-[#16171A]">{requirements.success_definition}</p>
          <p className="mt-2 text-[13px] text-[#737373]">
            <span className="font-medium text-[#16171A]">Targeting:</span> {requirements.target_segment}
          </p>
          <p className="mt-1 text-[13px] text-[#737373]">
            <span className="font-medium text-[#16171A]">Offer:</span> {requirements.offer_summary}
          </p>
        </Card>
      )}

      {stage === 'awaiting-answers' &&
        gapQuestions
          .filter((q) => q.status !== 'ANSWERED')
          .map((question) => (
            <Card key={question.id} label="FOLLEI NEEDS ONE THING">
              <p className="mb-3 text-[14px] font-medium text-[#16171A]">{question.question_text}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const value = (answers[question.id] || '').trim();
                  if (value) onAnswer(question.id, value);
                }}
                className="flex items-center gap-2 rounded-[18px] border border-[#E6E6E4] bg-[#FDFDFC] px-3 py-2 focus-within:border-gray-400"
              >
                <input
                  value={answers[question.id] || ''}
                  onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                  placeholder="Your answer..."
                  disabled={isWorking}
                  className="min-w-0 flex-1 bg-transparent text-[13.5px] text-[#16171A] outline-none placeholder:text-[#94A3B8]"
                />
                <button
                  type="submit"
                  aria-label="Send answer"
                  disabled={isWorking || !(answers[question.id] || '').trim()}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#1D1E21] text-white transition-opacity hover:bg-black disabled:cursor-not-allowed disabled:opacity-30"
                >
                  {isWorking ? <Loader2 className="size-3.5 animate-spin" /> : <ArrowUp className="size-4" />}
                </button>
              </form>
            </Card>
          ))}

      {salesPackage && (stage === 'review' || stage === 'verified') && (
        <>
          <Card label="THE PITCH">
            <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#16171A]">
              {salesPackage.sales_pitch}
            </p>
          </Card>
          <Card label="WHAT WE'RE SELLING">
            <p className="whitespace-pre-wrap text-[13.5px] leading-relaxed text-[#737373]">
              {salesPackage.sales_requirement}
            </p>
          </Card>
          <Card label="STRATEGY">
            <Structured value={salesPackage.sales_strategy} />
          </Card>
          <Card label="CALL SCRIPT">
            <Structured value={salesPackage.call_script} />
          </Card>

          {stage === 'verified' ? (
            <div className="flex items-center gap-2 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2.5 text-[13px] font-medium text-[#047857] self-start">
              <Check className="size-4" strokeWidth={3} />
              <span>{STAGE_LABELS.verified}</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onApprove}
                disabled={isWorking}
                className="rounded-full bg-[#7A9601] px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black disabled:opacity-50"
              >
                {isWorking ? 'Approving...' : 'Approve and go live'}
              </button>
              <span className="text-[12.5px] text-[#717378]">
                Or ask for a change in the box below.
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SalesPackageReview;
