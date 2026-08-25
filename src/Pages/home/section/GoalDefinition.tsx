import React, { useState, useRef, useEffect } from 'react';
import { ArrowUp, X, Check, Loader2, Plus, FileText } from 'lucide-react';

const ALL_GOALS = [
  'Increase Student Enrollment',
  'Boost Student Engagement',
  'Increase Placement Success',
  'Convert more enquiries into admissions',
  'Re-engage inactive leads',
];

interface GoalDefinitionProps {
  userName?: string;
  onProjectReady: () => void;
}

export const GoalDefinition: React.FC<GoalDefinitionProps> = ({
  userName = 'Aditya',
  onProjectReady,
}) => {
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

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
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

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedGoals.length === 0 && !inputValue.trim() && !attachedFile) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmed(true);
    }, 1500);
  };

  const handleEdit = () => {
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    setIsSaving(true);
    setTimeout(() => {
      onProjectReady();
    }, 1500);
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

  const handleCompactSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!compactPrompt.trim() && !compactFile) return;
    setCompactPrompt('');
    setCompactFile(null);
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
                {ALL_GOALS.filter((g) => !selectedGoals.includes(g)).map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => toggleGoal(goal)}
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
                    {selectedGoals.length > 0
                      ? selectedGoals.join(', ')
                      : inputValue}
                  </p>
                </div>

                {/* Understanding explanation */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-[17px] font-medium text-[#16171A] mb-2.5">
                    Here's what I understand
                  </h3>
                  <p className="text-[14px] text-[#737373] leading-relaxed">
                    Got it. Your ultimate goal is to boost Student Engagement. In practice, that means you want to deepen engagement so people stay active and involved over time. Follei will focus on spotting drop-off moments early, timing nudges well, and tailoring communication to each segment so more of your effort lands where it counts. You can refine this later — everything in your workspace will be shaped around it.
                  </p>
                </div>

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
