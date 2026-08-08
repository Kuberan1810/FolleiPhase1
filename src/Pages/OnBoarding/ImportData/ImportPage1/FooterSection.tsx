import React from "react";

interface FooterSectionProps {
  onSkip?: () => void;
  onContinue?: () => void;
  isLoading?: boolean;
  isAnalyzed?: boolean;
  continueText?: string;
  skipText?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({
  onSkip,
  onContinue,
  isLoading = false,
  continueText = "Continue",
  skipText = "Skip for now",
}) => {
  return (
    <div className="w-full border-t border-[#E2E8F0] mt-12 pt-6 pb-8 flex items-center justify-between">
      {/* Skip for now button */}
      <button
        type="button"
        onClick={onSkip}
        className="text-[14px] font-medium text-[#475569] hover:text-[#0F172A] cursor-pointer transition-colors bg-transparent border-none py-2 px-1 focus-visible:outline-none"
      >
        {skipText}
      </button>

      {/* Continue button: black background with no border radius */}
      <button
        type="button"
        onClick={onContinue}
        disabled={isLoading}
        className="px-8 py-2.5 rounded-none bg-black hover:bg-[#1A1A1A] active:bg-[#262626] text-white text-[14px] font-medium transition-colors duration-150 cursor-pointer shadow-xs disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        <span>{continueText}</span>
      </button>
    </div>
  );
};

export default FooterSection;
