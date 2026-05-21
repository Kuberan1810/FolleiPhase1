import React from 'react';
import { X, Mail, Phone, Calendar, Check, Flame, CalendarCheck, AlertTriangle, ShieldCheck, Clock, History, CheckCircle2 } from 'lucide-react';

interface AIInsightsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  leadName?: string;
  probability?: number;
  onViewLogsClick?: () => void;
}

const AIInsightsDrawer: React.FC<AIInsightsDrawerProps> = ({
  isOpen,
  onClose,
  probability = 88,
  onViewLogsClick
}) => {
  const radius = 64;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const [dashOffset, setDashOffset] = React.useState(circumference);

  React.useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setDashOffset(circumference - (probability / 100) * circumference);
      }, 150);
      return () => clearTimeout(timer);
    }
    setDashOffset(circumference);
  }, [isOpen, probability, circumference]);

  const fontStyle = (weight: number, size: string, lh: string, color: string, extra = {}) => ({
    fontFamily: 'Manrope, sans-serif',
    fontWeight: weight,
    fontSize: size,
    lineHeight: lh,
    color,
    ...extra
  });

  return (
    <>
      <div 
        className={`fixed inset-0 bg-slate-900/30 backdrop-blur-[2px] z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      <div className={`fixed top-0 right-0 h-screen w-full max-w-[480px] bg-white shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-[22px] h-[22px] shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="w-full h-full">
                <defs>
                  <radialGradient id="sparklesGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#007ACD" />
                    <stop offset="50%" stopColor="#0A4268" />
                    <stop offset="100%" stopColor="#003659" />
                  </radialGradient>
                </defs>
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" fill="url(#sparklesGradient)" />
                <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5.5 5 3Z" fill="url(#sparklesGradient)" />
                <path d="m19 17 1 2.5 2.5.5-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" fill="url(#sparklesGradient)" />
              </svg>
            </div>
            <div>
              <h2 style={fontStyle(600, '20px', '28px', '#0B1C30')}>AI Insights</h2>
              <p style={fontStyle(400, '12px', '16px', '#464555', { marginTop: '4px', verticalAlign: 'middle' })}>Smart analysis & recommendations</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 py-1 px-3 rounded-full text-xs font-bold bg-[#FFECEC] text-[#D32F2F]">
              <Flame className="w-3 h-3 fill-current" /> Hot
            </span>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400 border-none bg-transparent flex items-center justify-center">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Gauge Card */}
          <div className="bg-[#1A1D1E] rounded-[20px] p-6 flex flex-col items-center justify-center text-white">
            <div className="relative w-[152px] h-[152px] flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 152 152" style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}>
                <circle cx="76" cy="76" r={radius} className="stroke-[#ECECEC]" style={{ stroke: '#ECECEC' }} strokeWidth={strokeWidth} fill="transparent" />
                <circle cx="76" cy="76" r={radius} className="stroke-[#06840A]" style={{ stroke: '#06840A', transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} strokeWidth={strokeWidth} fill="transparent" strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" />
              </svg>
              <div className="absolute text-center">
                <span className="text-4xl font-extrabold text-white tracking-tight">{probability}%</span>
              </div>
            </div>
            <h3 className="text-[17px] font-bold text-white font-manrope mt-4">Conversion Probability</h3>
            <p className="text-center text-[13px] text-slate-400 font-manrope mt-1 max-w-[300px]">Based on recent engagement trends and historical success data</p>
          </div>

          {/* Next Best Action */}
          <div className="border border-slate-100 rounded-[16px] p-5 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
            <div className="flex gap-4">
              <div className="shrink-0 flex items-center justify-center border border-slate-100/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]" style={{ width: '34px', height: '36px', borderRadius: '8px', backgroundColor: '#FFFFFF', padding: '8px', boxSizing: 'border-box' }}>
                <CalendarCheck className="w-full h-full text-[#004370]" />
              </div>
              <div className="min-w-0">
                <span style={fontStyle(600, '12px', '16px', '#222222', { letterSpacing: '0.6px', textTransform: 'uppercase', display: 'block' })}>NEXT BEST ACTION</span>
                <h4 style={fontStyle(700, '16px', '20px', '#222222', { marginTop: '4px' })}>Conduct product demo within 24 hours</h4>
              </div>
            </div>
            <button className="w-full hover:bg-[#00355a] text-white transition-all cursor-pointer border-none font-manrope mt-5" style={{ backgroundColor: '#004370', height: '40px', borderRadius: '8px', padding: '8px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '14px' }}>
              Schedule Demo
            </button>
          </div>

          {/* Engagement Insights */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-slate-900 font-manrope">Engagement Insights</h3>
              <span className="px-2.5 py-0.5 bg-[#EFF6FF] text-[#0A71B7] rounded-full text-xs font-bold font-manrope">High Engagement</span>
            </div>
            <div className="space-y-2.5">
              {[
                { label: 'Email Opened', Icon: Mail },
                { label: 'Call Completed', Icon: Phone },
                { label: 'Demo Scheduled', Icon: Calendar }
              ].map(({ label, Icon }) => (
                <div key={label} className="flex items-center justify-between p-3.5 bg-[#F8FAFC] rounded-[12px] border border-slate-100/50">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Icon className="w-4 h-4 text-slate-500" />
                    <span className="text-[14px] font-medium font-manrope">{label}</span>
                  </div>
                  <div className="bg-[#004370] text-white rounded-full p-0.5 flex items-center justify-center w-5 h-5">
                    <Check className="w-3.5 h-3.5 stroke-[3px]" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Budget Analysis */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-bold text-slate-900 font-manrope">Budget Analysis</h3>
              <span className="inline-flex items-center gap-1 font-manrope text-xs font-bold" style={{ backgroundColor: '#DCFCE7', color: '#15803D', borderRadius: '9999px', padding: '4px 8px', height: '24px', boxSizing: 'border-box' }}>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#15803D] stroke-[2.5px]" /> Budget Match
              </span>
            </div>
            <div className="bg-[#F8FAFC] rounded-[12px] border border-slate-100/50 p-5 space-y-3">
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-500 font-manrope">Budget:</span>
                <span className="font-bold text-slate-900 font-manrope">₹1,00,000</span>
              </div>
              <div className="flex justify-between items-center text-[14px]">
                <span className="text-slate-500 font-manrope">Fit:</span>
                <span className="font-bold text-[#004370] font-manrope">Strong alignment</span>
              </div>
              <div className="border-t border-slate-100 my-2" />
              <p className="text-[13px] text-slate-500 font-manrope leading-5">
                "High purchasing capability detected. Budget aligns well with proposed solution, indicating strong purchase capability."
              </p>
            </div>
          </div>

          {/* Pain Points */}
          <div className="bg-[#FFF5F5] border border-[#FEE2E2] rounded-[16px] p-5 space-y-3">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-[#EF4444] shrink-0" />
              <h4 className="text-[16px] font-bold text-[#0B1C30] font-manrope">Pain Point Detection</h4>
            </div>
            <ul className="space-y-2.5 pl-1.5">
              {['Lead is highly interested in CRM automation to reduce manual entry.', 'Looking for a scalable solution for their growing sales team.'].map(txt => (
                <li key={txt} className="flex items-start gap-2 text-[14px] text-[#0B1C30] font-manrope leading-5">
                  <span className="text-[#EF4444] select-none mt-0.5">•</span>
                  <span>{txt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Analysis */}
          <div className="bg-[#ECFDF5] border border-[#D1FAE5] rounded-[12px] p-4 flex items-center gap-3">
            <ShieldCheck 
              className="shrink-0" 
              style={{ width: '16px', height: '20px', color: '#077F39' }} 
            />
            <div>
              <h4 style={fontStyle(700, '12px', '16px', '#004370')}>Risk Analysis</h4>
              <p className="text-[13px] text-slate-600 font-manrope mt-0.5">No immediate risk detected</p>
            </div>
          </div>

          {/* Smart Suggestions */}
          <div className="space-y-4">
            <h3 className="text-[16px] font-bold text-slate-900 font-manrope">Smart Suggestions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'BEST TIME', val: '10 AM – 12 PM', Icon: Clock },
                { label: 'FOLLOW-UP', val: 'Within 1 Day', Icon: History }
              ].map(({ label, val, Icon }) => (
                <div key={label} className="bg-[#EEF2FF] rounded-[12px] p-4 flex gap-3.5 items-center">
                  <Icon className="w-5 h-5 text-[#004370] shrink-0" />
                  <div>
                    <span 
                      style={fontStyle(400, '11px', '16.5px', '#464555', { 
                        letterSpacing: '0px', 
                        textTransform: 'uppercase', 
                        display: 'block',
                        verticalAlign: 'middle'
                      })}
                    >
                      {label}
                    </span>
                    <span className="block text-[14px] font-bold text-[#0B1C30] font-manrope mt-0.5">{val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View Logs */}
          <button 
            onClick={onViewLogsClick}
            className="w-full bg-white hover:bg-slate-50 text-[#0B1C30] py-3 rounded-[12px] font-bold text-[15px] border border-slate-200 transition-colors cursor-pointer font-manrope flex items-center justify-center mt-6"
          >
            View Logs
          </button>
        </div>
      </div>
    </>
  );
};

export default AIInsightsDrawer;
