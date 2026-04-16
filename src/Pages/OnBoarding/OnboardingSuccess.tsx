import { useEffect, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OnboardingSuccess = () => {
  const navigate = useNavigate();
  const [dots, setDots] = useState('');

  // Animated ellipsis for the status text
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      <header className="bg-[#005B96] h-[100px] flex items-center px-8 shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-[#005B96]">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="16" y="16" width="6" height="6" rx="1" />
              <rect x="2" y="16" width="6" height="6" rx="1" />
              <rect x="9" y="2" width="6" height="6" rx="1" />
              <path d="M7 16v-3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" />
              <path d="M12 11V8" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-[28px] leading-tight tracking-tight font-manrope">LiveTracker</h1>
            <p className="text-white/70 text-[16px] uppercase font-bold tracking-[0.05em] font-manrope">Precision Orchestrator</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Success Icon with Glow */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-[#005B96] opacity-20 blur-2xl rounded-full scale-150 transform transition-transform duration-1000 animate-pulse"></div>
          <div className="relative w-[80px] h-[80px] bg-[#005B96] rounded-full flex items-center justify-center text-white shadow-xl">
            <Check size={44} strokeWidth={3} />
            <Sparkles className="absolute -top-1 -right-4 w-6 h-6 text-[#005B96]/40" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center max-w-[500px] mb-16">
          <h2 className="text-[#000000] text-[24px] font-semibold mb-4 font-manrope leading-[40px] tracking-[-0.9px]">
            You're All Set!
          </h2>
          <p className="text-[#464555] text-[18px] font-normal font-inter leading-[29.25px]">
            Your AI agent is ready to manage calls,messages, and emails with sentient level precision.
          </p>
        </div>
        {/* Loading Status */}
        <div className="flex items-center gap-1 mb-12">
          <span className="text-[#015C96] text-[11px] font-semibold tracking-normal uppercase font-inter leading-[11px]">
            Setting up your dashboard
          </span>
          <span className="text-[#015C96] text-[11px] font-semibold w-6 leading-[11px]">{dots}</span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-[#005B96] text-white h-[56px] px-16 rounded-[8px] text-[16px] font-bold tracking-widest uppercase hover:bg-[#004370] transition-all cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.1)] active:scale-95"
        >
          Go To Dashboard
        </button>
      </main>
    </div>
  );
};

export default OnboardingSuccess;
