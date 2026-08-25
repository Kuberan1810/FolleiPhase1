import React from 'react';
import { ArrowUp, Loader2 } from 'lucide-react';
import type { BusinessCategoryOption } from '../types';

interface SetupStepContentProps {
  question?: string;
  description?: string;
  options: BusinessCategoryOption[];
  selectedOptionId?: string | null;
  onSelectOption?: (optionId: string) => void;
  miniInputValue: string;
  onMiniInputChange: (val: string) => void;
  onMiniInputSubmit: (e?: React.FormEvent) => void;
  placeholder?: string;
  isLoading?: boolean;
  loadingText?: string;
  onSkip?: () => void;
}

export const SetupStepContent: React.FC<SetupStepContentProps> = ({
  question = 'What do you do?',
  description,
  options,
  onSelectOption,
  miniInputValue,
  onMiniInputChange,
  onMiniInputSubmit,
  placeholder = 'Tell Follei about your business...',
  isLoading = false,
  loadingText = 'Importing business data...',
  onSkip,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (miniInputValue.trim()) {
      onMiniInputSubmit(e);
    }
  };

  return (
    <div key={question + (isLoading ? '-loading' : '')} className="flex flex-col gap-3 animate-fade-slide">
      {isLoading ? (
        <div className="flex items-center gap-2.5 rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-4 py-2.5 text-[13px] font-medium text-[#047857] shadow-2xs">
          <Loader2 className="size-4 animate-spin text-[#059669]" />
          <span>{loadingText}</span>
        </div>
      ) : (
        <>
          {question && (
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-semibold tracking-tight text-[#16171A]">
                {question}
              </p>
              {onSkip && (
                <button
                  type="button"
                  onClick={onSkip}
                  className="text-[12.5px] font-medium text-[#717378] hover:text-[#16171A] transition-colors cursor-pointer"
                >
                  Skip
                </button>
              )}
            </div>
          )}

          {description && (
            <p className="text-[12.5px] text-[#717378] leading-relaxed">
              {description}
            </p>
          )}

          {/* Option Tag Pills */}
          {options.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => onSelectOption?.(opt.id)}
                  className="rounded-full border border-gray-200 bg-[#FDFDFC] px-3 py-1.5 text-[12.5px] text-[#2C2E31] transition-colors duration-150 cursor-pointer hover:border-[#d2d2cd] hover:bg-[#F8F8F6] hover:text-[#16171A]"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          {/* Mini Quick Input */}
          {placeholder && (
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 rounded-[18px] border border-[#E6E6E4] bg-[#FDFDFC] px-2 py-2 transition-shadow duration-200 focus-within:border-gray-400 focus-within:shadow-xs"
            >
              <input
                type="text"
                placeholder={placeholder}
                value={miniInputValue}
                onChange={(e) => onMiniInputChange(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-[13px] text-[#16171A] outline-none placeholder:text-[#717378]"
              />
              <button
                type="submit"
                aria-label="Send answer"
                disabled={!miniInputValue.trim()}
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1D1E21] text-white transition-opacity duration-150 hover:bg-black disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <ArrowUp className="size-3.5" aria-hidden="true" />
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default SetupStepContent;
