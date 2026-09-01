import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowUp,
  X,
  Check,
  Loader2,
  Plus,
  Copy,
  CheckCheck,
} from 'lucide-react';
import { getFileFormatIcon } from '../../../Component/fileFormatIcons';
import { useGoalConversation } from '../../../hooks/useGoalConversation';
import { useSalesPackageFlow } from '../../../hooks/useSalesPackageFlow';
import SalesPackageReview from './SalesPackageReview';
import FolleiLogo from "../../../assets/logo/folleinew.svg"
import { Edit } from 'iconsax-react';

interface GoalDefinitionProps {
  userName?: string;
  workspaceId: string | undefined;
  onProjectReady: () => void;
}

const WORKING_DESCRIPTIONS = [
  'Understanding your goal...',
  'Analyzing your business context...',
  'Identifying target customer segments...',
  'Aligning offerings and value proposition...',
  'Structuring workspace requirements...',
  'Tailoring sales workflows...',
  'Finalizing goal recommendations...',
];

export const GoalDefinition: React.FC<GoalDefinitionProps> = ({
  userName = 'kuberan',
  workspaceId,
  onProjectReady,
}) => {
  const goal = useGoalConversation(workspaceId);
  const pkg = useSalesPackageFlow(workspaceId);
  const goalOptions = goal.suggestions;

  const [inputValue, setInputValue] = useState('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const isSubmitting = goal.isSending;
  const hasConversation = goal.turns.length > 0;

  // Rotate thinking messages
  useEffect(() => {
    if (!isSubmitting) {
      setLoadingTextIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => (prev + 1) % WORKING_DESCRIPTIONS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isSubmitting]);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    if (hasConversation) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [goal.turns.length, isSubmitting, hasConversation]);

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollH = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(Math.max(scrollH, 28), 160)}px`;
    }
  }, [inputValue]);

  /**
   * Append/set suggestion directly into prompt input and focus cursor
   */
  const handleSuggestionClick = (suggestionText: string) => {
    setInputValue((current) => {
      const trimmed = current.trim();
      if (!trimmed) return suggestionText;
      if (trimmed.toLowerCase().includes(suggestionText.toLowerCase())) return current;
      return `${trimmed.replace(/[.\s]+$/, '')}. ${suggestionText}`;
    });
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(
          textareaRef.current.value.length,
          textareaRef.current.value.length,
        );
      }
    }, 50);
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
    const textToSend = inputValue.trim();
    if (!textToSend && !attachedFile) return;

    setInputValue('');
    setAttachedFile(null);

    const result = await goal.send(textToSend);
    if (!result) return;

    if (result.goal_finalized) {
      setIsConfirmed(true);
    }
  };

  const handleCopyMessage = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleEdit = () => {
    setIsConfirmed(false);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 100);
  };

  const handleConfirm = () => {
    onProjectReady();
  };

  const canSubmit = inputValue.trim().length > 0 || attachedFile !== null;

  return (
    <div className="flex-1 flex flex-col min-h-[calc(100vh-60px)] lg:min-h-screen justify-between bg-[#FDFDFC]">
      {/* 1. INITIAL SCREEN: Shown before any message is sent (Clean compact layout matching DashboardSetup) */}
      {!hasConversation && !isConfirmed ? (
        <div className="w-full max-w-5xl mx-auto px-6 py-12 md:py-16 flex flex-col gap-8 flex-1 animate-fade-slide">
          {/* Header Greeting */}
          <header className="flex flex-col gap-1.5 animate-fade-slide">
            <h1 className="text-[28px] font-bold text-[#16171A] tracking-tight">
              Good morning, {userName}
            </h1>
            <p className="text-[15px] font-medium text-[#2C2E31]">
              Let's define your ultimate goal.
            </p>
            <p className="text-[13.5px] text-[#717378]">
              Tell Follei what you ultimately want to achieve, and I'll use it to shape your workspace.
            </p>
          </header>

          <div className="flex flex-col gap-4">
            <h2 className="text-[18px] font-medium tracking-tight text-[#16171A]">
              What is your ultimate goal?
            </h2>

            {/* Input Form Box - Compact version matching DashboardSetup */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center rounded-[24px] border border-[#E6E6E4] bg-white px-4 py-3 min-h-[64px] transition-shadow focus-within:border-gray-400 focus-within:shadow-xs"
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.json"
                className="hidden"
              />

              {attachedFile && (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] px-3 py-1 text-[12px] font-medium mb-2 self-start animate-fade-slide">
                  <div className="flex size-4 shrink-0 items-center justify-center">
                    {getFileFormatIcon(attachedFile.name, 'size-3.5 object-contain')}
                  </div>
                  <span className="max-w-[200px] truncate">{attachedFile.name}</span>
                  <button
                    type="button"
                    onClick={removeAttachedFile}
                    disabled={isSubmitting}
                    className="hover:text-red-600 focus:outline-none cursor-pointer text-[#94A3B8] ml-0.5"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2.5 w-full">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                  title="Upload document or file"
                  aria-label="Upload document"
                  className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-[#F4F4F0] text-[#4B5563] hover:bg-[#EBEBE8] hover:text-[#111827] transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  <Plus className="size-4 stroke-[2.2]" />
                </button>

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
                  placeholder="Tell Follei about your goal..."
                  disabled={isSubmitting}
                  className="min-w-0 flex-1 resize-none bg-transparent text-[14px] leading-[22px] text-[#16171A] outline-none placeholder:text-[#717378] py-0.5 max-h-[140px] overflow-y-auto"
                />

                <button
                  type="submit"
                  aria-label="Submit Goal"
                  disabled={!canSubmit || isSubmitting}
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
                    canSubmit && !isSubmitting
                      ? 'bg-[#16171A] hover:bg-black text-white cursor-pointer active:scale-95 shadow-xs'
                      : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <Loader2 className="size-3.5 animate-spin text-white" />
                  ) : (
                    <ArrowUp className="size-4 stroke-[2.5]" />
                  )}
                </button>
              </div>
            </form>

            {/* Skeleton Shimmer Loading or Suggestion Chips Ribbon */}
            {goal.isLoading ? (
              <div className="flex flex-wrap items-center gap-2 pt-1 animate-pulse" aria-label="Loading goal suggestions">
                <div className="h-[32px] w-56 rounded-full bg-[#EAEAEA]" />
                <div className="h-[32px] w-40 rounded-full bg-[#EAEAEA]" />
                <div className="h-[32px] w-64 rounded-full bg-[#EAEAEA]" />
              </div>
            ) : (
              goalOptions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1 animate-fade-slide">
                  {goalOptions.map((goalItem, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSuggestionClick(goalItem)}
                      className="rounded-full border border-[#E6E6E4] bg-white px-3.5 py-1.5 text-[12.5px] text-[#2C2E31] transition-colors duration-150 hover:border-[#CBD5E1] hover:bg-[#F8F8F6] hover:text-[#16171A] cursor-pointer shadow-2xs"
                    >
                      {goalItem}
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        /* 2. GPT / CLAUDE STYLE CONVERSATION STREAM (Once prompt is sent or during active interaction) */
        <div className="flex-1 flex flex-col justify-between">
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-10 md:pt-14 pb-36 flex flex-col gap-8 flex-1">
            {/* Chat Transcript Thread */}
            <div className="flex flex-col gap-5">
              {goal.turns.map((turn, idx) => {
                const isUser = turn.role === 'USER';

                return (
                  <div
                    key={idx}
                    className={`flex gap-3 animate-fade-slide ${
                      isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Follei Avatar */}
                    {!isUser && (
                      <div className="flex size-8  shrink-0 items-center justify-center rounded-full  text-white shadow-xs mt-1">
                        <img src={FolleiLogo} alt="" className=''/>
                      </div>
                    )}

                    {/* Chat Bubble Card */}
                    <div
                      className={`group relative max-w-[85%] sm:max-w-[80%] rounded-[22px] px-5 py-3.5 shadow-2xs transition-all ${
                        isUser
                          ? 'bg-[#16171A] text-white rounded-tr-xs'
                          : 'bg-white border border-[#E6E6E4] text-[#16171A] rounded-tl-xs hover:border-[#D1D5DB]'
                      }`}
                    >
                      {!isUser && (
                        <div className="flex items-center justify-between gap-3 mb-1.5 pb-1 border-b border-gray-100">
                          <span className="text-[11px] font-semibold tracking-wider text-[#0D9488] uppercase flex items-center gap-1">
                            Follei AI
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(turn.message, idx)}
                            className="opacity-0 group-hover:opacity-100 text-[#94A3B8] hover:text-[#16171A] transition-opacity cursor-pointer p-0.5"
                            title="Copy reply"
                          >
                            {copiedIndex === idx ? (
                              <CheckCheck className="size-3.5 text-[#0D9488]" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      <p className="whitespace-pre-wrap text-[14.5px] leading-relaxed font-normal">
                        {turn.message}
                      </p>
                    </div>

                    {/* User Avatar */}
                    {isUser && (
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] shadow-2xs mt-1 font-semibold text-[11px]">
                        {userName.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Live Thinking Status Pill with Skeleton Shimmer Shade Effect */}
              {isSubmitting && (
                <div className="flex gap-3 justify-start animate-fade-slide">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-full mt-1 p-1">
                    <img
                      src={FolleiLogo}
                      alt="Follei AI"
                      className="size-full object-contain animate-blink"
                    />
                  </div>
                  
                  {/* Thinking Pill with Skeleton Shimmer Shade Wave */}
                  <div className="relative overflow-hidden rounded-[22px] rounded-tl-xs bg-white/50 border border-[#E6E6E4] px-5 py-3 shadow-xs flex items-center gap-3">
                    {/* Skeleton Light Shade Beam moving across */}
                    <div className="absolute inset-0 -translate-x-full animate-shimmer-sweep bg-gradient-to-r from-transparent via-[#EAEAEA]/80 to-transparent pointer-events-none" />

                    <Loader2 className="size-4 animate-spin text-[#16171A] shrink-0 relative z-10" />
                    
                    {/* Shimmer Text */}
                    <span className="text-[13.5px] font-medium bg-gradient-to-r from-[#16171A] via-[#717378] to-[#16171A] bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent relative z-10">
                      {WORKING_DESCRIPTIONS[loadingTextIndex]}
                    </span>
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Settled / Verified Goal State (When Goal is Finalized) */}
            {(goal.isFinalized || isConfirmed) && (
                <div className="rounded-[26px] border border-[#E6E6E4] bg-[#fff] p-6 shadow-xs flex flex-col gap-4 animate-fade-slide">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex p-1 items-center justify-center rounded-full bg-[#0D9488] text-white">
                      <Check className="size-4 stroke-[3]" />
                    </div>
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0D9488]">
                        Goal Settled & Verified
                      </span>
                      <h3 className="text-[16px] font-semibold text-[#16171A]">
                        {goal.goalText || 'Your Ultimate Goal'}
                      </h3>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#717378] hover:text-[#16171A] transition-colors cursor-pointer"
                  >
                      <Edit className="size-3.5" color='#717378' />
                    <span>Refine</span>
                  </button>
                </div>

                {goal.understanding && (
                  <div className="rounded-2xl bg-white border border-[#E6E6E4] p-4 text-[13.5px] text-[#47484B] leading-relaxed">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#717378] block mb-1">
                      How Follei will execute this:
                    </span>
                    {goal.understanding}
                  </div>
                )}

                {/* Confirm Goal & Advance to Pipeline Button */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="inline-flex items-center gap-2 rounded-full bg-[#16171A] hover:bg-black text-white px-6 py-2.5 text-[14px] font-medium transition-all shadow-sm cursor-pointer hover:scale-[1.01] duration-300"
                  >
                    <span>Confirm Goal & Build Sales Package</span>
                    {/* <ArrowRight className="size-4 text-[#fff]" /> */}
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="rounded-full border border-[#E6E6E4] bg-white hover:bg-gray-50 px-5 py-2.5 text-[14px] font-medium text-[#16171A] transition-colors cursor-pointer"
                  >
                    Add more details
                  </button>
                </div>
              </div>
            )}

            {/* Phases 4-7 SalesPackageReview studio if active */}
            {isConfirmed && pkg.stage !== 'idle' && (
              <div className="animate-fade-slide mt-2">
                <SalesPackageReview
                  stage={pkg.stage}
                  requirements={pkg.requirements}
                  gapQuestions={pkg.gapQuestions}
                  salesPackage={pkg.salesPackage}
                  isWorking={pkg.isWorking}
                  onAnswer={pkg.answerQuestion}
                  onApprove={pkg.approve}
                  onRequestRevision={pkg.requestRevision}
                />
              </div>
            )}
          </div>

          {/* Bottom Fixed GPT / Claude Style Prompt Composer Bar */}
          {!isConfirmed && (
            <div className="sticky bottom-0 z-30 w-full bg-gradient-to-t from-[#FDFDFC] via-[#FDFDFC]/95 to-transparent pt-4 pb-6 px-4 sm:px-6">
              <div className="max-w-2xl mx-auto w-full flex flex-col gap-3">
                {/* Main Form Composer */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col justify-center rounded-[24px] border border-[#E6E6E4] bg-white px-4 py-3 min-h-[64px] transition-shadow focus-within:border-gray-400 focus-within:shadow-xs shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.txt,.csv,.xlsx,.json"
                    className="hidden"
                  />

                  {attachedFile && (
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] text-[#1E293B] px-3 py-1 text-[12px] font-medium shadow-2xs mb-2 self-start animate-fade-slide">
                      <div className="flex size-4 shrink-0 items-center justify-center">
                        {getFileFormatIcon(attachedFile.name, 'size-3.5 object-contain')}
                      </div>
                      <span className="max-w-[200px] truncate">{attachedFile.name}</span>
                      <button
                        type="button"
                        onClick={removeAttachedFile}
                        disabled={isSubmitting}
                        className="hover:text-red-600 focus:outline-none cursor-pointer text-[#94A3B8] ml-0.5"
                      >
                        <X className="size-3" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-2.5 w-full">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isSubmitting}
                      title="Attach file to message"
                      aria-label="Upload document"
                      className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-[#F4F4F0] text-[#4B5563] hover:bg-[#EBEBE8] hover:text-[#111827] transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      <Plus className="size-4 stroke-[2.2]" />
                    </button>

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
                      placeholder="Reply to Follei or add more details..."
                      disabled={isSubmitting}
                      className="min-w-0 flex-1 resize-none bg-transparent text-[14px] leading-[22px] text-[#16171A] outline-none placeholder:text-[#717378] py-0.5 max-h-[140px] overflow-y-auto"
                    />

                    <button
                      type="submit"
                      aria-label="Send message"
                      disabled={!canSubmit || isSubmitting}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 cursor-pointer ${
                        canSubmit && !isSubmitting
                          ? 'bg-[#16171A] hover:bg-black text-white active:scale-95 shadow-xs'
                          : 'bg-[#E5E7EB] text-[#9CA3AF] cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <Loader2 className="size-3.5 animate-spin text-white" />
                      ) : (
                        <ArrowUp className="size-4 stroke-[2.5]" />
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-center text-[12px] text-[#94A3B8] font-normal">
                  Type your reply to Follei AI to refine and confirm your goal.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalDefinition;
