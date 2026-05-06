import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  callStatus: string;
  setCallStatus: (status: string) => void;
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ 
  isOpen, 
  onClose,
  callStatus,
  setCallStatus
}) => {
  const [sentiment, setSentiment] = useState('Medium Interest');

  const handleClearAll = () => {
    setCallStatus('');
    setSentiment('');
  };

  const statuses = ['Completed', 'Busy', 'No Answer'];
  const sentiments = [
    { label: 'High Interest', icon: Sparkles },
    { label: 'Medium Interest', icon: Sparkles },
    { label: 'Low Interest', icon: Sparkles },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Mobile Backdrop - only visible on small screens */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] sm:hidden cursor-pointer"
          />

          {/* Transparent click-away layer for desktop */}
          <div 
            className="hidden sm:block fixed inset-0 z-[90]" 
            onClick={onClose}
          />

          <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] sm:items-end sm:justify-end sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-[90vw] max-w-[320px] bg-white rounded-[10px] shadow-[0_-4px_32px_0_rgba(0,30,64,0.12)] border border-gray-100 overflow-hidden font-manrope flex flex-col pointer-events-auto"
              style={{ height: '468px' }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                    <X size={18} className="text-[#64748B]" />
                  </button>
                  <h2 className="text-[15px] leading-[100%] font-[600] text-[#004370] font-manrope">Filters</h2>
                </div>
                <button 
                  onClick={handleClearAll}
                  className="text-[14px] font-medium text-[#64748B] hover:text-[#004370] font-manrope cursor-pointer"
                >
                  Clear all
                </button>
              </div>

              {/* Content */}
              <div className="p-4 space-y-4">
                {/* Call Status Section */}
                <div className="space-y-2">
                  <h3 className="text-[12px] leading-[12px] font-[700] text-[#45464D] tracking-[0.96px] uppercase font-manrope">
                    CALL STATUS
                  </h3>
                  <div className="flex flex-row gap-1.5 overflow-x-hidden">
                    {statuses.map((status) => (
                      <button
                        key={status}
                        onClick={() => setCallStatus(status)}
                        className={`min-w-[60px] h-[28px] px-2 flex items-center justify-center rounded-lg border text-[11px] leading-[20px] font-[500] font-manrope transition-all whitespace-nowrap cursor-pointer
                          ${callStatus === status 
                            ? 'bg-[#004370] border-[#004370] text-[#FFFFFF]' 
                            : 'bg-white border-[#E2E8F0] text-[#64748B] hover:border-[#004370]'
                          }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Result Sentiment Section */}
                <div className="pt-[24px] space-y-2">
                  <h3 className="text-[12px] leading-[12px] font-[700] text-[#45464D] tracking-[0.96px] uppercase font-manrope">
                    AI RESULT SENTIMENT
                  </h3>
                  <div className="space-y-[12px]">
                    {sentiments.map((item) => (
                      <div
                        key={item.label}
                        onClick={() => setSentiment(item.label)}
                        className={`flex items-center justify-between px-[12px] h-[48px] rounded-[11px] border cursor-pointer transition-all
                          ${sentiment === item.label 
                            ? 'border-[#004370] border-2 bg-[#D5E3FC1A]' 
                            : 'border-[#C6C6CD] bg-white hover:border-[#00437050]'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`${sentiment === item.label ? 'text-amber-500' : 'text-[#64748B]'}`}>
                            <item.icon size={18} />
                          </div>
                          <span className={`text-[15px] leading-[22px] font-manrope transition-all
                            ${sentiment === item.label ? 'font-[700] text-[#004370]' : 'font-[400] text-[#222222]'}`}
                          >
                            {item.label}
                          </span>
                        </div>
                        <div className={`w-4 h-4 rounded flex items-center justify-center border transition-all
                          ${sentiment === item.label 
                            ? 'bg-[#004370] border-[#004370] text-white' 
                            : 'bg-white border-[#E2E8F0]'
                          }`}
                        >
                          {sentiment === item.label && <Check size={12} strokeWidth={3} />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-auto p-4 bg-gray-50 border-t border-gray-100">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-[#004370] text-white rounded-xl text-[16px] font-bold hover:bg-[#00365a] transition-all cursor-pointer"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdvancedFilters;
