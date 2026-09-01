import React from 'react';
import { StepActionButtons } from '../StepActionButtons';
import { DatePickerPopover } from '../DatePickerPopover';
import { TimePickerPopover } from '../TimePickerPopover';

interface Step5ScheduleProps {
  scheduleOption: 'now' | 'later';
  onScheduleOptionChange: (val: 'now' | 'later') => void;
  scheduledDate: string;
  onScheduledDateChange: (val: string) => void;
  scheduledTime: string;
  onScheduledTimeChange: (val: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const Step5Schedule: React.FC<Step5ScheduleProps> = ({
  scheduleOption,
  onScheduleOptionChange,
  scheduledDate,
  onScheduledDateChange,
  scheduledTime,
  onScheduledTimeChange,
  onBack,
  onContinue,
}) => {
  const isLater = scheduleOption === 'later';
  const canContinue = !isLater || (scheduledDate.trim().length > 0 && scheduledTime.trim().length > 0);

  return (
    <div className="flex flex-col gap-3 animate-fade-slide">
      {/* Title & Subtitle */}
      <div className="flex flex-col gap-0.5">
        <h3 className="text-[14.5px] font-semibold text-[#16171A]">
          When should we send it?
        </h3>
        <p className="text-[12px] text-[#717378]">
          Choose when your campaign should be sent.
        </p>
      </div>

      {/* Sending Options (Cards) */}
      <div className="flex flex-col gap-2">
        {/* Send Now Card */}
        <button
          type="button"
          onClick={() => onScheduleOptionChange('now')}
          className={`flex items-center gap-2.5 p-3 rounded-[16px] border text-left transition-all cursor-pointer ${
            scheduleOption === 'now'
              ? 'border-[#7A9601] bg-[#F4F7E6]'
              : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
          }`}
        >
          <div
            className={`flex size-4.5 items-center justify-center rounded-full border-[1.5px] ${
              scheduleOption === 'now'
                ? 'border-[#7A9601] bg-[#F4F7E6]'
                : 'border-[#CBD5E1] bg-white'
            }`}
          >
            {scheduleOption === 'now' && (
              <div className="size-2 rounded-full bg-[#7A9601]" />
            )}
          </div>
          <span className="text-[13px] font-semibold text-[#16171A]">
            Send now
          </span>
        </button>

        {/* Schedule For Later Card */}
        <button
          type="button"
          onClick={() => onScheduleOptionChange('later')}
          className={`flex items-center gap-2.5 p-3 rounded-[16px] border text-left transition-all cursor-pointer ${
            scheduleOption === 'later'
              ? 'border-[#7A9601] bg-[#F4F7E6]'
              : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
          }`}
        >
          <div
            className={`flex size-4.5 items-center justify-center rounded-full border-[1.5px] ${
              scheduleOption === 'later'
                ? 'border-[#7A9601] bg-[#F4F7E6]'
                : 'border-[#CBD5E1] bg-white'
            }`}
          >
            {scheduleOption === 'later' && (
              <div className="size-2 rounded-full bg-[#7A9601]" />
            )}
          </div>
          <span className="text-[13px] font-semibold text-[#16171A]">
            Schedule for later
          </span>
        </button>
      </div>

      {/* Date & Time Fields with Interactive Pickers */}
      {isLater && (
        <div className="grid grid-cols-2 gap-2.5 pt-0.5 animate-fade-slide">
          {/* Date Picker Popover */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-normal text-[#1E293B]">
              Date
            </label>
            <DatePickerPopover
              value={scheduledDate}
              onChange={onScheduledDateChange}
              placeholder="09/01/2026"
            />
          </div>

          {/* Time Picker Popover */}
          <div className="flex flex-col gap-1">
            <label className="text-[12px] font-normal text-[#1E293B]">
              Time
            </label>
            <TimePickerPopover
              value={scheduledTime}
              onChange={onScheduledTimeChange}
              placeholder="10:00 AM"
            />
          </div>
        </div>
      )}

      {/* Reusable Action Buttons */}
      <StepActionButtons
        onBack={onBack}
        canContinue={canContinue}
        onContinue={onContinue}
      />
    </div>
  );
};

export default Step5Schedule;
