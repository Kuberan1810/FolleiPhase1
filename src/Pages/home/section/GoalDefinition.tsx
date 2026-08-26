import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, X, Check, Loader2, Plus, FileText } from 'lucide-react';
import { useGoalConversation } from '../../../hooks/useGoalConversation';
import { useSalesPackageFlow } from '../../../hooks/useSalesPackageFlow';
import SalesPackageReview from './SalesPackageReview';

// Fallback only. Real suggestions come from the workspace's own documents;
// these show when ingestion has not produced anything yet.
const ALL_GOALS = [
  'Increase Student Enrollment',
  'Boost Student Engagement',
  'Increase Placement Success',
  'Convert more enquiries into admissions',
  'Re-engage inactive leads',
];

interface GoalDefinitionProps {
  userName?: string;
  workspaceId: string | undefined;
  onProjectReady: () => void;
}

export const GoalDefinition: React.FC<GoalDefinitionProps> = ({
  userName = 'Aditya',
  workspaceId,
  onProjectReady,
}) => {
  const goal = useGoalConversation(workspaceId);
  const pkg = useSalesPackageFlow(workspaceId);
  // Suggestions are generated from this workspace's documents; fall back to
  // the generic list only when there are none.
  const goalOptions = goal.suggestions.length ? goal.suggestions : ALL_GOALS;
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollH, 28), 160)}px`;
    }
  }, [inputValue]);

  /**
   * A suggestion is a starting sentence, not a tag. Clicking one writes it
   * into the input so the user can see, edit and extend the exact text that
   * will be sent -- previously chips and the textarea were two separate
   * inputs, and it was not obvious which one the submit button used.
   */
  const appendSuggestion = (goal: string) => {
    setInputValue((current) => {
      const trimmed = current.trim();
      if (!trimmed) return goal;
      if (trimmed.toLowerCase().includes(goal.toLowerCase())) return current;
      return `${trimmed.replace(/[.\s]+$/, '')}. ${goal}`;
    });
    textareaRef.current?.focus();
  };

  const toggleGoal = (goal: string) => {
    setSelectedGoals((current) => current.filter((g) => g !== goal));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedGoals.length === 0 && !inputValue.trim() && !attachedFile) return;
    setIsSubmitting(true);
    // Selected chips and free text are one statement of intent, so they go as
    // a single message rather than several turns.
    const message = [selectedGoals.join(', '), inputValue.trim()].filter(Boolean).join('. ');
    const result = await goal.send(message);
    setIsSubmitting(false);
    if (!result) return;
    // Only move to the confirmation step once the backend says the goal is
    // actually settled. Requirements generation rejects a workspace with no
    // goal_text, so confirming early would fail on the next call.
    if (result.goal_finalized) {
      setIsConfirmed(true);
    } else {
      // Still clarifying: keep the composer open and clear what was sent.
      setSelectedGoals([]);
      setInputValue('');
    }
  };

  const handleEdit = () => {
    setIsConfirmed(false);
  };

  const handleConfirm = async () => {
    setIsSaving(true);
    // Phase 4 onward runs itself from here: requirements, then gap questions,
    // then the package. The workspace is "ready" as soon as that starts.
    await pkg.start();
    setIsSaving(false);
    onProjectReady();
  };

  const [compactPrompt, setCompactPrompt] = useState('');
  const [compactFile, setCompactFile] = useState<File | null>(null);
  const compactFileInputRef = useRef<HTMLInputElement>(null);
  const compactTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (compactTextareaRef.current) {
      compactTextareaRef.current.style.height = 'auto';
      const scrollH = compactTextareaRef.current.scrollHeight;
      compactTextareaRef.current.style.height = `${Math.min(Math.max(scrollH, 24), 120)}px`;
    }
  }, [compactPrompt]);

  const handleCompactSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = compactPrompt.trim();
    if (!text && !compactFile) return;
    setCompactPrompt('');
    setCompactFile(null);
    // Once a package exists this is Phase 7 -- an objection or change request
    // against what Follei plans to say. Before that it is still the goal
    // conversation.
    if (pkg.salesPackage && pkg.stage !== 'verified') {
      await pkg.requestRevision(text);
    } else {
      await goal.send(text);
    }
  };

  const hasSelections = selectedGoals.length > 0;
  const canSubmit = hasSelections || inputValue.trim().length > 0 || attachedFile !== null;

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-60px)] lg:min-h-screen justify-between">
      {/* Scrollable Center Content */}
      <div className="w-full max-w-5xl mx-auto px-6 pt-12 md:pt-16 pb-8 flex flex-col gap-8 flex-1">
        {/* Header Greeting */}
        <header className="flex flex-col gap-1.5">
          <p className="text-[14px] text-[#717378]">Good morning, {userName}</p>
          <h1 className="text-[28px] font-semibold text-[#16171A] tracking-tight">
            Let's define your ultimate goal.
          </h1>
          <p className="text-[14.5px] text-[#717378]">
            Tell Follei what you ultimately want to achieve, and I'll use it to shape your workspace.
          </p>
        </header>

        {!isConfirmed ? (
          <div className="flex flex-col gap-6">
            {/* Input Form / Container */}
            <form
              onSubmit={handleSubmit}
              className="group relative flex w-full min-h-[88px] flex-col justify-center rounded-[28px] border border-[#E5E7EB] bg-white p-4 md:px-7 md:py-4 shadow-[0_2px_8px_rgba(0,0,0,0.03)] transition-all duration-200 hover:border-[#D1D5DB] focus-within:border-[#94A3B8] focus-within:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
            >
              {/* Hidden File Input for document upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.json"
                className="hidden"
              />

              {/* Selected Goals & Attached File Row */}
              {(selectedGoals.length > 0 || attachedFile) && (
                <div className="flex flex-wrap items-center gap-2 mb-2.5">
                  {selectedGoals.map((goal) => (
                    <span
                      key={goal}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#16171A] text-white px-3.5 py-1 text-[13px] font-medium shadow-2xs"
                    >
                      {goal}
                      <button
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        disabled={isSubmitting}
                        className="hover:text-gray-300 focus:outline-none cursor-pointer"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  ))}

                  {attachedFile && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] px-3.5 py-1 text-[12.5px] font-medium shadow-2xs">
                      <FileText className="size-3.5 text-[#64748B]" />
                      <span className="max-w-[180px] truncate">{attachedFile.name}</span>
                      <button
                        type="button"
                        onClick={removeAttachedFile}
                        disabled={isSubmitting}
                        className="hover:text-red-600 focus:outline-none cursor-pointer text-[#94A3B8]"
                      >
                        <X className="size-3.5" />
                      </button>
                    </span>
                  )}
                </div>
              )}

              {/* Input Controls Row: Plus (Upload) -> Input -> Submit Arrow (All Vertically Centered) */}
              <div className="flex items-center gap-3 w-full">
                {/* Plus / Document Upload Button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                  title="Upload document or file"
                  aria-label="Upload document"
                  className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] hover:text-[#111827] transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="size-5 stroke-[2.2]" />
                </button>

                {/* Auto-expanding Textarea (Vertically centered on 1 line, expands downwards as text fills) */}
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  placeholder={hasSelections ? 'Add more context or upload data...' : 'What is your ultimate goal?'}
                  disabled={isSubmitting}
                  className="min-w-0 flex-1 resize-none bg-transparent text-[16px] leading-[26px] text-[#1E293B] outline-none placeholder:text-[#94A3B8] placeholder:font-normal py-1 max-h-[160px] overflow-y-auto"
                />

                {/* Submit Arrow Button */}
                <button
                  type="submit"
                  aria-label="Submit Goal"
                  disabled={!canSubmit || isSubmitting}
                  className={`flex size-10 md:size-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                    canSubmit && !isSubmitting
                      ? 'bg-[#111827] text-white hover:bg-black scale-100 shadow-xs'
                      : 'bg-[#F3F4F6] text-[#6B7280]'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin text-white" />
                  ) : (
                    <ArrowUp className="size-5 stroke-[2.2]" />
                  )}
                </button>
              </div>
            </form>

            {/* Follei's clarifying reply, shown while the goal is not settled */}
            {!isSubmitting && goal.understanding && (
              <div className="rounded-[22px] border border-[#E6E6E4] bg-white px-5 py-4">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-[#717378]">
                  FOLLEI
                </span>
                <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-[#16171A]">
                  {goal.understanding}
                </p>
              </div>
            )}

            {/* Loading Indicator */}
            {isSubmitting && (
              <div className="flex items-center gap-2 text-[13px] text-[#717378] animate-pulse pl-1">
                <Loader2 className="size-4 animate-spin text-[#0D9488]" />
                <span>Understanding your goal...</span>
              </div>
            )}

            {/* Suggested Goals (Chips) */}
            {!isSubmitting && (
              <div className="flex flex-wrap gap-2 pt-1">
                {goalOptions.map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => appendSuggestion(goal)}
                    className="rounded-full border border-[#E6E6E4] bg-white px-3.5 py-1.5 text-[13px] text-[#47484B] transition-colors duration-150 hover:border-gray-400 hover:text-[#16171A] hover:bg-gray-50 cursor-pointer shadow-2xs"
                  >
                    {goal}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Confirmation Flow */
          <div className="flex flex-col gap-6 animate-fade-slide">
            {isSaving ? (
              <div className="rounded-2xl border border-[#E6E6E4] bg-white p-6 shadow-xs">
                <div className="flex size-8 items-center justify-center rounded-full bg-black text-white mb-4">
                  <Check className="size-4" strokeWidth={3} />
                </div>
                <h3 className="text-[16px] font-semibold text-[#16171A] mb-2">Goal saved</h3>
                <p className="text-[13px] text-[#717378]">
                  Your ultimate goal and interpretation are saved. Taking you to Project 1...
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* Goal summary box */}
                <div className="rounded-[28px] border border-[#E6E6E4] bg-white p-5 ">
                  <span className="text-[11px] font-medium tracking-wider text-[#717378] uppercase block mb-2">
                    YOUR GOAL
                  </span>
                  <p className="text-[15px] font-medium text-[#16171A]">
                    {goal.goalText || (selectedGoals.length > 0 ? selectedGoals.join(', ') : inputValue)}
                  </p>
                </div>

                {/* What the model actually understood, not a canned line */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[17px] font-medium text-[#16171A] mb-2.5">
                    Here's what I understand
                  </h3>
                  <p className="text-[14px] text-[#737373] leading-relaxed whitespace-pre-wrap">
                    {goal.understanding || 'Working out what that means for your workspace...'}
                  </p>
                </div>

                {/* Phases 4-7 run here once the goal is confirmed */}
                {pkg.stage !== 'idle' && (
                  <SalesPackageReview
                    stage={pkg.stage}
                    requirements={pkg.requirements}
                    gapQuestions={pkg.gapQuestions}
                    salesPackage={pkg.salesPackage}
                    isWorking={pkg.isWorking}
                    onAnswer={pkg.answerQuestion}
                    onApprove={pkg.approve}
                  />
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="rounded-full bg-[#7A9601] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-black transition-colors cursor-pointer"
                  >
                    Confirm goal
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="rounded-full border border-[#E6E6E4] bg-white px-5 py-2.5 text-[14px] font-medium text-[#16171A] hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Edit goal
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Claude / GPT Style Bottom-Docked Chatbot Prompt Bar */}
      {isConfirmed && !isSaving && (
        <div className="sticky bottom-0 z-30 w-full bg-gradient-to-t from-[#FDFDFC] via-[#FDFDFC]/95 to-transparent pt-6 pb-6">
          <div className="max-w-4xl mx-auto w-full">
            <form
              onSubmit={handleCompactSubmit}
              className="group relative flex flex-col justify-center rounded-[26px] border border-[#E5E7EB] bg-white px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:border-[#D1D5DB] focus-within:border-[#94A3B8] focus-within:shadow-[0_6px_24px_rgba(0,0,0,0.08)] transition-all duration-200"
            >
              <input
                type="file"
                ref={compactFileInputRef}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCompactFile(file);
                  }
                }}
                accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.json"
                className="hidden"
              />

              {compactFile && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] px-3 py-0.5 text-[12px] font-medium shadow-2xs mb-2 self-start">
                  <FileText className="size-3 text-[#64748B]" />
                  <span className="max-w-[180px] truncate">{compactFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setCompactFile(null)}
                    className="hover:text-red-600 focus:outline-none cursor-pointer text-[#94A3B8]"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2.5 w-full">
                {/* Plus Button */}
                <button
                  type="button"
                  onClick={() => compactFileInputRef.current?.click()}
                  title="Upload document or file"
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[#4B5563] hover:bg-[#E5E7EB] hover:text-[#111827] transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="size-4 stroke-[2.2]" />
                </button>

                {/* Textarea */}
                <textarea
                  ref={compactTextareaRef}
                  rows={1}
                  value={compactPrompt}
                  onChange={(e) => setCompactPrompt(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleCompactSubmit();
                    }
                  }}
                  placeholder="Tell Follei about your business or refine goal..."
                  className="min-w-0 flex-1 resize-none bg-transparent text-[14.5px] leading-[22px] text-[#16171A] outline-none placeholder:text-[#94A3B8] py-1 max-h-[120px] overflow-y-auto"
                />

                {/* Send Button */}
                <button
                  type="submit"
                  aria-label="Send to Follei"
                  disabled={!compactPrompt.trim() && !compactFile}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#111827] text-white hover:bg-black disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer transition-all shadow-xs"
                >
                  <ArrowUp className="size-4 stroke-[2.2]" />
                </button>
              </div>
            </form>
            <p className="text-center text-[12px] text-[#94A3B8] mt-2 font-normal">
              Follei shapes your workspace based on your business context and goals.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalDefinition;
