import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomRangeCalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomRangeCalendar: React.FC<CustomRangeCalendarProps> = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026
  const [startDate, setStartDate] = useState<number | null>(7);
  const [endDate, setEndDate] = useState<number | null>(10);

  const daysInMonth = 31;
  const startDay = 3; // Thursday (0=Mon, 3=Thu for this specific layout)
  
  const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  
  const handleDateClick = (day: number) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (day < startDate) {
        setStartDate(day);
      } else {
        setEndDate(day);
      }
    }
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    return day >= startDate && day <= endDate;
  };

  const isStart = (day: number) => day === startDate;
  const isEnd = (day: number) => day === endDate;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:p-0 pointer-events-none">
          <div className="fixed inset-0 z-[-1] pointer-events-auto bg-black/20 sm:bg-transparent" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="pointer-events-auto w-[92vw] sm:w-[433px] h-auto sm:h-[359px] bg-white rounded-[12px] shadow-[0_4px_32px_0_rgba(170,170,170,0.03)] border border-[#EBEBEB] p-5 sm:p-[30px] font-manrope overflow-hidden flex flex-col"
          >
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[16px] font-bold text-[#222]">
                {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
              </h2>
              <div className="flex gap-4">
                <button className="text-gray-600 hover:text-[#004370]">
                  <ChevronLeft size={20} />
                </button>
                <button className="text-gray-600 hover:text-[#004370]">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Weekdays */}
            <div className="grid grid-cols-7 gap-y-4 mb-4">
              {weekdays.map(day => (
                <div key={day} className="text-center text-[14px] font-medium text-[#222]">
                  {day}
                </div>
              ))}
              
              {/* Padding for start day */}
              {Array.from({ length: startDay }).map((_, i) => (
                <div key={`pad-${i}`} />
              ))}

              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const isSelected = isStart(day) || isEnd(day);
                const isWithinRange = isInRange(day);
                const active = isSelected || isWithinRange;
                
                return (
                  <div key={day} className="relative h-10 flex items-center justify-center">
                    {/* Range/Selection Background */}
                    {active && (
                      <div className={`absolute inset-y-1 left-0 right-0 bg-[#004370] 
                        ${isStart(day) && endDate ? 'rounded-l-full ml-1' : ''} 
                        ${isEnd(day) ? 'rounded-r-full mr-1' : ''}
                        ${isSelected && !isWithinRange ? 'rounded-full mx-1' : ''}
                        ${!isSelected && isWithinRange ? '' : ''}
                      `} />
                    )}
                    
                    <button
                      onClick={() => handleDateClick(day)}
                      className={`relative z-10 w-8 h-8 flex items-center justify-center text-[14px] font-medium transition-colors
                        ${active ? 'text-white' : 'text-[#222] hover:bg-gray-100 rounded-full'}
                      `}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CustomRangeCalendar;
