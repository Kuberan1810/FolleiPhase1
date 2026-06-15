import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentViewName: string;
  onSave: (newName: string, categorizeBy: string, headerStyle: string) => void;
  initialCategorizeBy?: string;
  initialHeaderStyle?: string;
};

const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  currentViewName,
  onSave,
  initialCategorizeBy = 'Lead Source',
  initialHeaderStyle = 'Multi Color'
}) => {
  const [viewName, setViewName] = useState(currentViewName);
  const [categorizeBy, setCategorizeBy] = useState(initialCategorizeBy);
  const [headerStyle, setHeaderStyle] = useState(initialHeaderStyle);

  const [showCategorizeDropdown, setShowCategorizeDropdown] = useState(false);
  const [showHeaderStyleDropdown, setShowHeaderStyleDropdown] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-100"
        onClick={onClose}
      />

      {/* Settings Modal Dialog */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl z-110 w-[92%] sm:w-full max-w-[600px] border border-slate-100 overflow-hidden font-sans"
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-slate-100">
          <h2 className="text-[#0D1C2E] text-[20px] font-bold tracking-tight">
            Kanban View - Settings
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          {/* Setting item: View Name */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
            <span className="text-[#64748B] text-sm font-medium">
              Kanban View Name
            </span>
            <input
              type="text"
              value={viewName}
              onChange={(e) => setViewName(e.target.value)}
              className="w-full sm:w-[320px] h-[38px] px-3 border border-slate-200 rounded-lg text-sm text-[#0D1C2E] focus:outline-none focus:ring-2 focus:ring-[#004370] bg-white"
            />
          </div>

          {/* Setting item: Categorize By */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
            <span className="text-[#64748B] text-sm font-medium">
              Categorize By
            </span>
            <div className="relative w-full sm:w-[320px]">
              <button
                type="button"
                onClick={() => {
                  setShowCategorizeDropdown(!showCategorizeDropdown);
                  setShowHeaderStyleDropdown(false);
                }}
                className="w-full h-[38px] px-3 flex items-center justify-between border border-slate-200 rounded-lg text-sm text-[#0D1C2E] bg-white cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span>{categorizeBy}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {showCategorizeDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowCategorizeDropdown(false)} />
                  <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 overflow-hidden">
                    {['Lead Source', 'Lead Status', 'Lead Score', 'Campaign'].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setCategorizeBy(opt);
                          setShowCategorizeDropdown(false);
                        }}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-50 transition-colors ${categorizeBy === opt ? 'bg-[#EFF6FF] text-[#004370] font-semibold' : 'text-[#0D1C2E] font-medium'
                          }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Setting item: Header Style */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
            <span className="text-[#64748B] text-sm font-medium">
              Header Style
            </span>
            <div className="relative w-full sm:w-[320px]">
              <button
                type="button"
                onClick={() => {
                  setShowHeaderStyleDropdown(!showHeaderStyleDropdown);
                  setShowCategorizeDropdown(false);
                }}
                className="w-full h-[38px] px-3 flex items-center justify-between border border-slate-200 rounded-lg text-sm text-[#0D1C2E] bg-white cursor-pointer hover:bg-slate-50 transition-colors"
              >
                <span>{headerStyle}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {showHeaderStyleDropdown && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowHeaderStyleDropdown(false)} />
                  <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 overflow-hidden">
                    {['Multi Color', 'Mono Color'].map((opt) => (
                      <div
                        key={opt}
                        onClick={() => {
                          setHeaderStyle(opt);
                          setShowHeaderStyleDropdown(false);
                        }}
                        className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-50 transition-colors ${headerStyle === opt ? 'bg-[#EFF6FF] text-[#004370] font-semibold' : 'text-[#0D1C2E] font-medium'
                          }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-5 bg-[#F8FAFC] border-t border-slate-100 flex justify-between items-center w-full">
          <button
            onClick={onClose}
            className="h-[38px] px-6 border border-slate-200 bg-white hover:bg-slate-50 text-slate-500 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(viewName, categorizeBy, headerStyle)}
            className="h-[38px] px-6 bg-[#004370] hover:bg-[#002D4C] text-white rounded-lg text-sm font-semibold transition-colors cursor-pointer border-none"
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsModal;
