import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhatsAppVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter']">
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
            <h1 className="text-white font-bold text-[36px] leading-tight tracking-tight">LiveTracker</h1>
            <p className="text-white/70 text-[20px] uppercase font-bold tracking-[0.05em]">Precision Orchestrator</p>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#F9FAFB]">
        <div 
          className="bg-white rounded-[12px] p-8 sm:p-14 flex flex-col relative w-full max-w-[624px]"
          style={{ 
            height: 'auto',
            minHeight: '520px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' 
          }}
        >
          <div className="mb-[24px]">
            <h2 className="text-[#333333] text-[36px] font-bold leading-tight mb-2 text-center">Security Verification</h2>
            <p className="text-[#666666] text-[18px] font-medium font-['Inter'] text-center">We've sent a whatsapp verification code please enter it below</p>
          </div>

          <div className="mb-[32px]">
            <input
              type="text"
              className="w-full h-[64px] rounded-[8px] border border-[#CBD5E1] bg-white text-center text-[24px] font-bold text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#0C4A6E] transition-all"
            />
          </div>

          <div className="text-center mb-[40px]">
            <a href="#" className="text-[#0C4A6E] font-bold text-[15px] hover:underline">
              Resend code in 45s
            </a>
          </div>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-[#00416A] text-white h-[60px] rounded-[10px] text-[20px] font-bold hover:bg-[#003354] transition-all mb-[32px]"
          >
            Verify
          </button>

          <div className="mt-auto flex justify-end gap-5">
            <button
              onClick={() => navigate('/onboarding/additional-details')}
              className="bg-[#E5E7EB] text-[#4B5563] h-[48px] px-6 rounded-[8px] text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition-all cursor-pointer shadow-sm"
            >
              <div className="bg-gray-400/30 rounded-full p-1 flex items-center justify-center">
                <ChevronLeft size={18} strokeWidth={3} />
              </div>
              Go Back
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-[#0C4A6E] text-white h-[48px] px-6 rounded-[8px] text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-[#092e4f] transition-all cursor-pointer shadow-sm"
            >
              Next
              <div className="bg-white/20 rounded-full p-1 flex items-center justify-center">
                <ChevronRight size={18} strokeWidth={3} />
              </div>
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-12">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === 4 ? 'bg-[#00416A]' : 'bg-[#CBD5E1]'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default WhatsAppVerification;
