import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
    selectedDateRange: string;
    onClose: () => void;
    onApply: (startDate: Date, endDate: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDateRange, onClose, onApply }) => {
    // Parse initial dates from string (e.g. "Apr 1- Apr 30, 2026")
    const parseDateRange = (rangeStr: string) => {
        const defaultStart = new Date(2026, 3, 1); // Apr 1, 2026
        const defaultEnd = new Date(2026, 3, 30);  // Apr 30, 2026
        try {
            const parts = rangeStr.split('-');
            if (parts.length === 2) {
                const startPart = parts[0].trim();
                let endPart = parts[1].trim();
                let year = 2026;
                const yearMatch = endPart.match(/,?\s*(\d{4})$/);
                if (yearMatch) {
                    year = parseInt(yearMatch[1], 10);
                    endPart = endPart.replace(yearMatch[0], '').trim();
                }

                const monthMap: { [key: string]: number } = {
                    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
                    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
                };

                const parsePart = (part: string, defaultMonth: number) => {
                    const match = part.match(/([a-zA-Z]{3})\s*(\d+)/);
                    if (match) {
                        const mStr = match[1].toLowerCase().substring(0, 3);
                        const m = monthMap[mStr] !== undefined ? monthMap[mStr] : defaultMonth;
                        const d = parseInt(match[2], 10);
                        return { month: m, day: d };
                    }
                    return null;
                };

                const startInfo = parsePart(startPart, 3);
                const endInfo = parsePart(endPart, startInfo ? startInfo.month : 3);

                if (startInfo && endInfo) {
                    return {
                        start: new Date(year, startInfo.month, startInfo.day),
                        end: new Date(year, endInfo.month, endInfo.day)
                    };
                }
            }
        } catch (e) {
            console.error('Error parsing date range:', e);
        }
        return { start: defaultStart, end: defaultEnd };
    };

    const { start: initialStart, end: initialEnd } = parseDateRange(selectedDateRange);

    const [tempStartDate, setTempStartDate] = useState<Date | null>(initialStart);
    const [tempEndDate, setTempEndDate] = useState<Date | null>(initialEnd);

    // Month and Year state for the calendar view navigation
    const [currentMonth, setCurrentMonth] = useState<number>(initialStart.getMonth());
    const [currentYear, setCurrentYear] = useState<number>(initialStart.getFullYear());

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const handleDateClick = (date: Date) => {
        if (!tempStartDate || (tempStartDate && tempEndDate)) {
            setTempStartDate(date);
            setTempEndDate(null);
        } else {
            if (date < tempStartDate) {
                setTempStartDate(date);
                setTempEndDate(null);
            } else {
                setTempEndDate(date);
            }
        }
    };

    const isSameDay = (d1: Date, d2: Date | null) => {
        if (!d2) return false;
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate();
    };

    const isBetween = (date: Date, start: Date | null, end: Date | null) => {
        if (!start || !end) return false;
        const d = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
        const s = new Date(start.getFullYear(), start.getMonth(), start.getDate()).getTime();
        const e = new Date(end.getFullYear(), end.getMonth(), end.getDate()).getTime();
        return d > s && d < e;
    };

    // Calculate days grid
    const getDaysArray = () => {
        const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
        const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
        const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

        const daysArray: { date: Date; isCurrentMonth: boolean }[] = [];

        // Previous month padding
        const prevMonthDate = new Date(currentYear, currentMonth - 1, 1);
        const prevYearVal = prevMonthDate.getFullYear();
        const prevMonthVal = prevMonthDate.getMonth();
        for (let i = firstDayIndex - 1; i >= 0; i--) {
            daysArray.push({
                date: new Date(prevYearVal, prevMonthVal, prevMonthDays - i),
                isCurrentMonth: false
            });
        }

        // Current month days
        for (let d = 1; d <= totalDays; d++) {
            daysArray.push({
                date: new Date(currentYear, currentMonth, d),
                isCurrentMonth: true
            });
        }

        // Next month padding to fill grid (5-row or 6-row layout dynamically)
        const totalCellsSoFar = daysArray.length;
        const targetTotal = totalCellsSoFar <= 35 ? 35 : 42;
        const nextDaysNeeded = targetTotal - totalCellsSoFar;
        const nextMonthDate = new Date(currentYear, currentMonth + 1, 1);
        const nextYearVal = nextMonthDate.getFullYear();
        const nextMonthVal = nextMonthDate.getMonth();
        for (let d = 1; d <= nextDaysNeeded; d++) {
            daysArray.push({
                date: new Date(nextYearVal, nextMonthVal, d),
                isCurrentMonth: false
            });
        }

        return daysArray;
    };

    const days = getDaysArray();

    const handleApply = () => {
        if (tempStartDate) {
            const finalEnd = tempEndDate || tempStartDate;
            onApply(tempStartDate, finalEnd);
        }
    };

    return (
        <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-[288px] bg-white border border-[#EDF3FD] rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-6 z-50 flex flex-col select-none font-[Inter]">
            {/* Header Navigation */}
            <div className="flex items-center justify-between mb-5">
                <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-700"
                    type="button"
                >
                    <ChevronLeft size={20} />
                </button>
                <span className="font-semibold text-slate-800 text-[16px] leading-[24px]">
                    {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-700"
                    type="button"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Weekdays Grid */}
            <div className="grid grid-cols-7 gap-0 text-center mb-2">
                {['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'].map((day) => (
                    <span
                        key={day}
                        className="text-slate-400 font-medium text-[11px] tracking-wider flex items-center justify-center"
                        style={{ width: '33.57px', height: '20px' }}
                    >
                        {day}
                    </span>
                ))}
            </div>

            {/* Days Grid */}
            <div className="grid grid-cols-7 gap-0 text-center mb-4">
                {days.map((dayObj, idx) => {
                    const isStart = isSameDay(dayObj.date, tempStartDate);
                    const isEnd = isSameDay(dayObj.date, tempEndDate);
                    const isInRange = isBetween(dayObj.date, tempStartDate, tempEndDate);
                    const isCurrent = dayObj.isCurrentMonth;

                    if (!isCurrent) {
                        return (
                            <div
                                key={idx}
                                style={{
                                    width: '33.57px',
                                    height: '33.57px'
                                }}
                            />
                        );
                    }

                    let btnClass = 'flex items-center justify-center text-sm font-medium transition-all duration-150 cursor-pointer ';
                    let bgStyle = {};

                    if (isStart || isEnd) {
                        // Start/End Date style
                        btnClass += 'text-white ';
                        bgStyle = { backgroundColor: '#004370' };
                    } else if (isInRange) {
                        // In Range style
                        btnClass += 'text-[#004370] ';
                        bgStyle = { backgroundColor: '#E1E0FF' };
                    } else {
                        // Standard day style
                        btnClass += 'text-[#1E293B] hover:bg-slate-50 ';
                    }

                    return (
                        <button
                            key={idx}
                            onClick={() => handleDateClick(dayObj.date)}
                            className={btnClass}
                            style={{
                                width: '33.57px',
                                height: '33.57px',
                                borderRadius: '4px',
                                ...bgStyle
                            }}
                            type="button"
                        >
                            {dayObj.date.getDate()}
                        </button>
                    );
                })}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-[#EDF3FD] pt-4 flex items-center justify-between mt-2">
                <button
                    onClick={onClose}
                    className="text-[#434655] font-semibold text-sm cursor-pointer hover:text-slate-800 transition-colors px-2 py-1"
                    type="button"
                >
                    Cancel
                </button>
                <button
                    onClick={handleApply}
                    className="bg-[#004370] text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors hover:bg-[#003152] cursor-pointer"
                    type="button"
                >
                    Apply
                </button>
            </div>
        </div>
    );
};

export default DatePicker;
