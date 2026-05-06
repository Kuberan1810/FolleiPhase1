import React from 'react';

interface OnboardingProgressProps {
  currentStep: number;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({ currentStep }) => {
  return (
    <div className="flex gap-2 mt-8 items-center justify-center">
      {[...Array(7)].map((_, i) => {
        if (i === currentStep) {
          // Current step: pill shape
          return (
            <div
              key={i}
              className="w-6 h-[8px] rounded-full bg-[#00416A] transition-all duration-300"
            />
          );
        } else if (i < currentStep) {
          // Completed steps: solid dots
          return (
            <div
              key={i}
              className="w-[8px] h-[8px] rounded-full bg-[#00416A] transition-all duration-300"
            />
          );
        } else {
          // Inactive/Future steps: outline dots
          return (
            <div
              key={i}
              className="w-[8px] h-[8px] rounded-full border border-[#CBD5E1] transition-all duration-300"
            />
          );
        }
      })}
    </div>
  );
};

export default OnboardingProgress;
