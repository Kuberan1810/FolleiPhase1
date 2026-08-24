import React, { useState } from 'react';
import { ArrowUp, X, Check, Loader2, Sparkles } from 'lucide-react';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (selectedGoals.length === 0 && !inputValue.trim()) return;
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

  const hasSelections = selectedGoals.length > 0;
  const canSubmit = hasSelections || inputValue.trim().length > 0;

  return (
    <div className="min-w-0 flex-1">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 px-6 py-14 md:py-20">
        {/* Header Greeting */}
        <header className="flex flex-col gap-2">
          <p className="text-[14px] text-[#717378]">Good morning, {userName}</p>
          <h1 className="text-[28px] font-semibold text-[#16171A] tracking-tight">
            Let's define your ultimate goal.
          </h1>
          <p className="text-[15px] text-[#717378]">
            Tell Follei what you ultimately want to achieve, and I'll use it to shape your workspace.
          </p>
        </header>

        {!isConfirmed ? (
          <div className="flex flex-col gap-6">
            {/* Input Form / Container */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-wrap items-center gap-2 rounded-[22px] border border-[#D7D7D4] bg-white p-3.5 shadow-xs transition-shadow duration-200 focus-within:border-gray-400 focus-within:shadow-md"
            >
              <Sparkles className="size-4 shrink-0 text-[#0D9488] ml-1" aria-hidden="true" />
              
              {selectedGoals.map((goal) => (
                <span
                  key={goal}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#16171A] text-white px-3 py-1 text-[13px] font-medium"
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

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit(e);
                }}
                placeholder={hasSelections ? '' : 'What is your ultimate goal?'}
                disabled={isSubmitting}
                className="min-w-[150px] flex-1 bg-transparent px-2 text-[14px] text-[#16171A] outline-none placeholder:text-[#717378]"
              />

              <button
                type="submit"
                aria-label="Submit Goal"
                disabled={!canSubmit || isSubmitting}
                className={`flex size-8 shrink-0 items-center justify-center rounded-xl transition-all duration-150 cursor-pointer ${
                  canSubmit && !isSubmitting
                    ? 'bg-gray-900 text-white hover:bg-black'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {isSubmitting ? (
                  <Loader2 className="size-4 animate-spin text-gray-500" />
                ) : (
                  <ArrowUp className="size-4" />
                )}
              </button>
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
                <div className="rounded-2xl border border-[#E6E6E4] bg-white p-5 shadow-xs">
                  <span className="text-[11px] font-bold tracking-wider text-[#717378] uppercase block mb-2">
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
                  <h3 className="text-[16px] font-semibold text-[#16171A]">
                    Here's what I understand
                  </h3>
                  <p className="text-[14px] text-[#55575C] leading-relaxed">
                    Got it. Your ultimate goal is to{' '}
                    <span className="font-medium text-[#16171A]">
                      {selectedGoals.length > 0
                        ? selectedGoals.join(', ').toLowerCase()
                        : inputValue.toLowerCase()}
                    </span>
                    . In practice, that means you want to grow enrollment by turning more enquiries into confirmed admissions. Follei will focus on identifying high-intent prospects, improving follow-up timing, personalizing outreach, and re-engaging inactive leads so more of your effort lands where it counts. You can refine this later — everything in your workspace will be shaped around it.
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleConfirm}
                    className="rounded-full bg-[#16171A] px-5 py-2 text-[14px] font-medium text-white hover:bg-black transition-colors shadow-2xs cursor-pointer"
                  >
                    Confirm goal
                  </button>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="rounded-full border border-[#E6E6E4] bg-white px-5 py-2 text-[14px] font-medium text-[#16171A] hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
                  >
                    Edit goal
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalDefinition;
