import React from 'react';
import { FOLLEI_NUMBERS } from '../../types';
import { StepActionButtons } from '../StepActionButtons';

interface Step3WhatsAppProps {
  selectedNumber: string;
  onSelectedNumberChange: (val: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const Step3WhatsApp: React.FC<Step3WhatsAppProps> = ({
  selectedNumber,
  onSelectedNumberChange,
  onBack,
  onContinue,
}) => {
  return (
    <div className="flex flex-col gap-3 animate-fade-slide">
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[14.5px] font-semibold text-[#16171A]">
          Choose a Follei number
        </h3>
        <p className="text-[12px] text-[#717378]">
          Select the number you want to use for this campaign.
        </p>
      </div>

      {/* Follei Number Cards List */}
      <div className="flex flex-col gap-2">
        {FOLLEI_NUMBERS.map((num) => {
          const isSelected = selectedNumber === num.id;
          return (
            <button
              key={num.id}
              type="button"
              onClick={() => onSelectedNumberChange(num.id)}
              className={`flex items-center justify-between p-3 rounded-[16px] border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[#7A9601] bg-[#F4F7E6]'
                  : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:bg-[#64748B05]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {/* Radio Dot */}
                <div
                  className={`flex size-4.5 items-center justify-center rounded-full border-[1.5px] ${
                    isSelected ? 'border-[#7A9601] bg-[#F4F7E6]' : 'border-[#CBD5E1] bg-white'
                  }`}
                >
                  {isSelected && <div className="size-2 rounded-full bg-[#7A9601]" />}
                </div>

                <div className="flex flex-col">
                  <span className="text-[13px] font-semibold text-[#16171A]">
                    {num.title}
                  </span>
                  <span className="text-[12px] text-[#64748B]">
                    {num.phone}
                  </span>
                </div>
              </div>

              {/* Follei Badge */}
              <span className="rounded-full bg-[#64748B10] px-2 py-0.5 text-[10.5px]  text-[#64748B]">
                {num.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Helper text */}
      <p className="text-[11.5px] text-[#717378] leading-relaxed">
        This number will be used to send your campaign messages.
      </p>

      {/* Reusable Action Buttons */}
      <StepActionButtons
        onBack={onBack}
        onContinue={onContinue}
      />
    </div>
  );
};

export default Step3WhatsApp;
