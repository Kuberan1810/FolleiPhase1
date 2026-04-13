import React from 'react';
import { ShieldCheck, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactDetailsFinal = () => {
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
          className="bg-white rounded-[12px] p-8 sm:p-12 flex flex-col relative w-full max-w-[660px]"
          style={{
            height: 'auto',
            minHeight: '620px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="mb-[32px]">
            <h2 className="text-[#333333] text-[32px] font-bold leading-tight mb-2">Enter Your Contact Details</h2>
            <p className="text-[#666666] text-[18px] font-medium font-['Inter']">We use your details only for security and essential updates</p>
          </div>

          <div className="flex flex-col gap-[24px] mb-[40px]">
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-semibold text-[#191C1E]">Enter your Name</label>
              <input
                type="text"
                placeholder="siva"
                className="w-full h-[56px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] focus:outline-none focus:ring-1 focus:ring-[#0C4A6E] placeholder:text-[#D2D2D2]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[16px] font-semibold text-[#191C1E]">Enter your Whatsapp number</label>
              <input
                type="tel"
                placeholder="9451334956211"
                className="w-full h-[56px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] focus:outline-none focus:ring-1 focus:ring-[#0C4A6E] placeholder:text-[#D2D2D2]"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-6 mb-[40px]">
            <div className="flex items-start gap-3 max-w-[260px]">
              <div className="mt-1 text-[#0C4A6E] w-[28px] h-[28px] border-2 border-[#0C4A6E] rounded-md flex items-center justify-center shrink-0">
                <Lock size={16} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#191C1E]">Secure Encryption</h4>
                <p className="text-[12px] text-[#9CA3AF] font-medium leading-tight mt-0.5">End-to-end encrypted for your security</p>
              </div>
            </div>
            <div className="flex items-start gap-3 max-w-[260px]">
              <div className="mt-1 text-[#0C4A6E] w-[28px] h-[28px] border-2 border-[#0C4A6E] rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#191C1E]">Your data is secure with us</h4>
                <p className="text-[12px] text-[#9CA3AF] font-medium leading-tight mt-0.5">We only use your contact method for essential updates — no spam.</p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex justify-end gap-4">
            <button
              onClick={() => navigate('/onboarding/verify')}
              className="bg-[#E5E7EB] text-[#4B5563] h-[48px] px-6 rounded-[8px] text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-gray-300 transition-all cursor-pointer shadow-sm"
            >
              <div className="bg-gray-400/30 rounded-full p-1 flex items-center justify-center">
                <ChevronLeft size={18} strokeWidth={3} />
              </div>
              Go Back
            </button>
            <button
              onClick={() => navigate('/onboarding/whatsapp-verify')}
              className="bg-[#0C4A6E] text-white h-[48px] px-6 rounded-[8px] text-[16px] font-bold flex items-center justify-center gap-2 hover:bg-[#092e4f] transition-all cursor-pointer shadow-sm"
            >
              Next
              <div className="bg-white/20 rounded-full p-1 flex items-center justify-center">
                <ChevronRight size={18} strokeWidth={3} />
              </div>
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === 3 ? 'bg-[#00416A]' : 'bg-[#CBD5E1]'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ContactDetailsFinal;
