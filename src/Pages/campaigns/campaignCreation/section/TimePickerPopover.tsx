import React, { useState, useRef, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface TimePickerPopoverProps {
  value: string;
  onChange: (timeStr: string) => void;
  placeholder?: string;
  className?: string;
}

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));

export const TimePickerPopover: React.FC<TimePickerPopoverProps> = ({
  value,
  onChange,
  placeholder = '10:00 AM',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse time parts: "11:12 AM" -> hour: "11", minute: "12", period: "AM"
  const parseTime = (str: string) => {
    const match = str.trim().match(/^(\d{1,2})[:.](\d{1,2})\s*(AM|PM)?$/i);
    if (match) {
      const h = String(Math.min(Math.max(parseInt(match[1], 10), 1), 12)).padStart(2, '0');
      const m = String(Math.min(Math.max(parseInt(match[2], 10), 0), 59)).padStart(2, '0');
      const p = (match[3] || 'AM').toUpperCase();
      return { hour: h, minute: m, period: p };
    }
    return { hour: '10', minute: '00', period: 'AM' };
  };

  const { hour, minute, period } = parseTime(value || '10:00 AM');

  // Close popover on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const updateTime = (newH: string, newM: string, newP: string) => {
    onChange(`${newH}:${newM} ${newP}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleHourChange = (newHour: string) => {
    updateTime(newHour, minute, period);
  };

  const handleMinuteChange = (newMinute: string) => {
    updateTime(hour, newMinute, period);
  };

  const handlePeriodChange = (newPeriod: 'AM' | 'PM') => {
    updateTime(hour, minute, newPeriod);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Time Input Box: Editable typing + Clock icon toggle */}
      <div className="relative flex items-center group">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-[14px] border border-[#CBD5E1] bg-white pl-3 pr-8 py-2 text-[12.5px] text-[#1E293B] placeholder-[#94A3B8] focus:border-[#7A9601] focus:outline-none transition-colors group-hover:border-[#94A3B8]"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2.5 flex items-center justify-center text-[#64748B] hover:text-[#16171A] transition-colors cursor-pointer"
        >
          <Clock className="size-3.5 stroke-[1.8]" />
        </button>
      </div>

      {/* Interactive Custom Time Picker Popover */}
      {isOpen && (
        <div className="absolute right-0 bottom-full mb-1.5 z-50 w-[240px] rounded-[18px] border border-[#E2E8F0] bg-white p-3 shadow-[0_12px_36px_rgba(0,0,0,0.12)] animate-fade-slide">
          {/* Header Display */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
            <span className="text-[12px] font-medium text-[#64748B]">Set Time</span>
            <span className="text-[13px] font-semibold text-[#16171A] font-mono">
              {hour}:{minute} {period}
            </span>
          </div>

          {/* 3 Columns: Hour (01-12), Minute (00-59), AM/PM */}
          <div className="grid grid-cols-3 gap-1.5 text-center">
            {/* Hour Column */}
            <div className="flex flex-col">
              <span className="text-[10.5px] font-medium text-[#94A3B8] uppercase pb-1">
                Hour
              </span>
              <div className="h-36 overflow-y-auto rounded-[10px] border border-gray-100 bg-gray-50/50 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col gap-0.5">
                {HOURS.map((h) => {
                  const isSelected = h === hour;
                  return (
                    <button
                      key={h}
                      type="button"
                      onClick={() => handleHourChange(h)}
                      className={`py-1 text-[11.5px] rounded-[6px] transition-colors cursor-pointer font-mono ${
                        isSelected
                          ? 'bg-[#7A9601] text-white font-semibold'
                          : 'text-[#334155] hover:bg-white hover:text-[#16171A]'
                      }`}
                    >
                      {h}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Minute Column (00 to 59 - supports exact 11.12, 11:12, etc.) */}
            <div className="flex flex-col">
              <span className="text-[10.5px] font-medium text-[#94A3B8] uppercase pb-1">
                Min
              </span>
              <div className="h-36 overflow-y-auto rounded-[10px] border border-gray-100 bg-gray-50/50 p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex flex-col gap-0.5">
                {MINUTES.map((m) => {
                  const isSelected = m === minute;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => handleMinuteChange(m)}
                      className={`py-1 text-[11.5px] rounded-[6px] transition-colors cursor-pointer font-mono ${
                        isSelected
                          ? 'bg-[#7A9601] text-white font-semibold'
                          : 'text-[#334155] hover:bg-white hover:text-[#16171A]'
                      }`}
                    >
                      {m}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* AM / PM Column */}
            <div className="flex flex-col">
              <span className="text-[10.5px] font-medium text-[#94A3B8] uppercase pb-1">
                Period
              </span>
              <div className="flex flex-col gap-1.5 p-1">
                <button
                  type="button"
                  onClick={() => handlePeriodChange('AM')}
                  className={`py-2 text-[12px] font-semibold rounded-[8px] border transition-all cursor-pointer ${
                    period === 'AM'
                      ? 'border-[#7A9601] bg-[#F4F7E6] text-[#7A9601]'
                      : 'border-gray-200 bg-white text-[#64748B] hover:bg-gray-50'
                  }`}
                >
                  AM
                </button>
                <button
                  type="button"
                  onClick={() => handlePeriodChange('PM')}
                  className={`py-2 text-[12px] font-semibold rounded-[8px] border transition-all cursor-pointer ${
                    period === 'PM'
                      ? 'border-[#7A9601] bg-[#F4F7E6] text-[#7A9601]'
                      : 'border-gray-200 bg-white text-[#64748B] hover:bg-gray-50'
                  }`}
                >
                  PM
                </button>
              </div>
            </div>
          </div>

          {/* Done button */}
          <div className="flex items-center justify-end pt-2.5 mt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full rounded-full bg-[#1E293B] hover:bg-[#0F172A] py-1.5 text-[11.5px] font-medium text-white transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePickerPopover;
