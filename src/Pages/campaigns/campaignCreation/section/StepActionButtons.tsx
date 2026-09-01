import React from 'react';

interface StepActionButtonsProps {
  onBack?: () => void;
  onContinue?: () => void;
  canContinue?: boolean;
  backDisabled?: boolean;
  backLabel?: string;
  continueLabel?: string;
  className?: string;
}

export const StepActionButtons: React.FC<StepActionButtonsProps> = ({
  onBack,
  onContinue,
  canContinue = true,
  backDisabled = false,
  backLabel = 'Back',
  continueLabel = 'Continue',
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-2.5 pt-1.5 ${className}`}>
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled || !onBack}
        className={`flex-1 h-9 rounded-full border border-[#E2E8F0] bg-white text-[12px] font-medium transition-colors ${
          backDisabled || !onBack
            ? 'text-[#94A3B8] cursor-not-allowed opacity-60'
            : 'text-[#16171A] hover:bg-gray-50 cursor-pointer'
        }`}
      >
        {backLabel}
      </button>
      <button
        type="button"
        onClick={onContinue}
        disabled={!canContinue}
        className={`flex-1 h-9 rounded-full text-[12px] font-medium transition-all ${
          canContinue
            ? 'bg-[#1E293B] hover:bg-[#0F172A] text-white cursor-pointer active:scale-98'
            : 'bg-[#64748B] text-white/80 cursor-not-allowed opacity-80'
        }`}
      >
        {continueLabel}
      </button>
    </div>
  );
};

export default StepActionButtons;
