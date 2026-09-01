import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerPopoverProps {
  value: string;
  onChange: (dateStr: string) => void;
  minDate?: Date;
  placeholder?: string;
  className?: string;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAY_NAMES = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DatePickerPopover: React.FC<DatePickerPopoverProps> = ({
  value,
  onChange,
  minDate = new Date(),
  placeholder = 'MM/DD/YYYY',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial date from value or fallback to today
  const parseDate = (str: string): Date => {
    if (!str) return new Date();
    // Support MM/DD/YYYY or YYYY-MM-DD or DD/MM/YYYY
    const parts = str.split(/[/.-]/);
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // YYYY-MM-DD
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        if (!isNaN(d.getTime())) return d;
      } else {
        // MM/DD/YYYY
        const d = new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
        if (!isNaN(d.getTime())) return d;
      }
    }
    const d = new Date(str);
    return isNaN(d.getTime()) ? new Date() : d;
  };

  const selectedDate = parseDate(value);
  const [viewDate, setViewDate] = useState<Date>(selectedDate);

  // Sync viewDate when value changes
  useEffect(() => {
    if (value) {
      setViewDate(parseDate(value));
    }
  }, [value]);

  // Close on outside click
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

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const formatDate = (date: Date): string => {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  const handleSelectDay = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onChange(formatDate(newDate));
    setIsOpen(false);
  };

  const handleQuickSelect = (type: 'today' | 'tomorrow' | 'nextWeek') => {
    const today = new Date();
    if (type === 'today') {
      onChange(formatDate(today));
    } else if (type === 'tomorrow') {
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      onChange(formatDate(tomorrow));
    } else if (type === 'nextWeek') {
      const nextWeek = new Date(today);
      nextWeek.setDate(today.getDate() + 7);
      onChange(formatDate(nextWeek));
    }
    setIsOpen(false);
  };

  const isSameDay = (d1: Date, y: number, m: number, d: number) => {
    return d1.getFullYear() === y && d1.getMonth() === m && d1.getDate() === d;
  };

  const isPastDay = (y: number, m: number, d: number) => {
    if (!minDate) return false;
    const check = new Date(y, m, d, 23, 59, 59);
    const startOfMin = new Date(minDate);
    startOfMin.setHours(0, 0, 0, 0);
    return check < startOfMin;
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Date Input Box */}
      <div className="relative flex items-center group">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full rounded-[14px] border border-[#CBD5E1] bg-white pl-3 pr-8 py-2 text-[12.5px] text-[#1E293B] placeholder-[#94A3B8] focus:border-[#7A9601] focus:outline-none transition-colors group-hover:border-[#94A3B8]"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2.5 flex items-center justify-center text-[#64748B] hover:text-[#16171A] transition-colors cursor-pointer"
        >
          <CalendarIcon className="size-3.5" />
        </button>
      </div>

      {/* Calendar Popover Dropdown */}
      {isOpen && (
        <div className="absolute left-0 bottom-full mb-1.5 z-50 w-[270px] rounded-[18px] border border-[#E2E8F0] bg-white p-3.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] animate-fade-slide">
          {/* Header with Month / Year and Navigation */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100">
            <span className="text-[13px] font-semibold text-[#16171A]">
              {MONTH_NAMES[currentMonth]} {currentYear}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="flex size-6 items-center justify-center rounded-full hover:bg-gray-100 text-[#475569] transition-colors cursor-pointer"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                className="flex size-6 items-center justify-center rounded-full hover:bg-gray-100 text-[#475569] transition-colors cursor-pointer"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
            {WEEKDAY_NAMES.map((d) => (
              <span key={d} className="text-[11px] font-medium text-[#94A3B8]">
                {d}
              </span>
            ))}
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Blank offset for first day */}
            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
              <div key={`blank-${i}`} className="size-7" />
            ))}

            {/* Days in Month */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = isSameDay(selectedDate, currentYear, currentMonth, day);
              const isPast = isPastDay(currentYear, currentMonth, day);
              const isToday = isSameDay(new Date(), currentYear, currentMonth, day);

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDay(day)}
                  className={`size-7 rounded-full text-[12px] flex items-center justify-center transition-all ${
                    isPast
                      ? 'text-[#CBD5E1] cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#7A9601] text-white font-semibold shadow-2xs'
                      : isToday
                      ? 'border border-[#7A9601] text-[#7A9601] font-medium hover:bg-[#F4F7E6]'
                      : 'text-[#1E293B] hover:bg-[#F4F7E6] hover:text-[#7A9601] cursor-pointer'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => handleQuickSelect('today')}
              className="text-[11px] font-medium text-[#7A9601] hover:text-[#5E7401] transition-colors cursor-pointer"
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('tomorrow')}
              className="text-[11px] font-medium text-[#475569] hover:text-[#16171A] transition-colors cursor-pointer"
            >
              Tomorrow
            </button>
            <button
              type="button"
              onClick={() => handleQuickSelect('nextWeek')}
              className="text-[11px] font-medium text-[#475569] hover:text-[#16171A] transition-colors cursor-pointer"
            >
              In 1 week
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePickerPopover;
