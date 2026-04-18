import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const IntelligenceAlerts = () => {
  const [autoOn, setAutoOn] = useState(true);
  const [alertText, setAlertText] = useState('Notify admin if lead response exceeds 4 hours');

  return (
    <div className="BoxStyle flex flex-col gap-5">

      {/* Header */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-[#E0F0FF] flex items-center justify-center shrink-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#004370" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4l3 3" />
          </svg>
        </div>
        <span className="text-[16px] font-bold text-[#191C1E]">AI Override &amp; Intelligence Alerts</span>
      </div>

      {/* Two cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Left – Auto-Schedule with Checkbox */}
        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 flex flex-col gap-3">

          {/* Checkbox row */}
          <button
            onClick={() => setAutoOn(p => !p)}
            className="flex items-center gap-3 cursor-pointer group w-full text-left"
          >
            {/* Custom checkbox */}
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors
                ${autoOn
                  ? 'bg-[#2563EB] border-[#2563EB]'
                  : 'bg-white border-[#CBD5E1] group-hover:border-[#2563EB]'
                }`}
            >
              {autoOn && (
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                  <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-[11px] font-bold text-[#374151] uppercase tracking-wider leading-tight">
              Auto-Schedule Follow-Up
            </span>
          </button>

          <p className="text-[11px] text-[#6B7280] leading-relaxed pl-8">
            Automatically assigns a 48hr re-engagement task if appointment is missed or cancelled without rescheduling.
          </p>
        </div>

        {/* Right – NLP Alert */}
        <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAFA] p-4 flex flex-col gap-3">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">
            Alert Rule &amp; Logic (Natural Language)
          </span>
          <textarea
            rows={2}
            value={alertText}
            onChange={e => setAlertText(e.target.value)}
            className="flex-1 text-[13px] font-semibold text-[#191C1E] bg-transparent resize-none focus:outline-none leading-relaxed"
          />
          <div className="flex justify-end">
            <button className="flex items-center gap-1.5 border border-[#E5E7EB] bg-white hover:bg-[#F2F4F6] text-[#374151] text-[10px] font-bold px-3 py-1.5 rounded-lg cursor-pointer transition-colors tracking-wide">
              <RefreshCw size={10} />
              SYNC CALENDAR
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default IntelligenceAlerts;
