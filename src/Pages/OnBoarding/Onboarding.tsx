import React, { useState } from 'react';
import { Mail, MessageSquare, Smartphone, Phone, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Onboarding = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const navigate = useNavigate();

  const methods = [
    { id: 'mail', label: 'MAIL', icon: <Mail size={24} /> },
    { id: 'chat', label: 'CHAT', icon: <MessageSquare size={24} /> },
    { id: 'sms', label: 'SMS', icon: <Smartphone size={24} /> },
    { id: 'voice', label: 'VOICE', icon: <Phone size={24} /> }
  ];

  const handleNext = () => {
    navigate('/onboarding/details');
  };

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
          className="bg-white rounded-[12px] p-8 sm:p-[60px] flex flex-col relative w-full max-w-[1000px]"
          style={{
            height: 'auto',
            minHeight: '520px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="mb-[48px]">
            <h2 className="text-[#000000] text-[36px] font-bold leading-tight mb-2 font-['Inter']">How Should We Reach Your Customer?</h2>
            <p className="text-[#666666] text-[20px] font-medium font-['Inter']">Pick your contact method securely</p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-[39px] mb-[80px] justify-center">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`flex flex-col items-center justify-center rounded-[10px] border transition-all duration-200 w-full sm:w-[150px] sm:h-[81px] group ${selectedMethod === method.id
                    ? 'border-[#0C4A6E] bg-[#F0F7FF] ring-1 ring-[#0C4A6E]'
                    : 'border-[#D2D2D2] bg-white hover:border-[#0C4A6E]'
                  }`}
              >
                <div
                  className={`transition-colors text-[#0C4A6E] mb-2`}
                >
                  {React.cloneElement(method.icon as React.ReactElement, { size: 24 })}
                </div>
                <span className="text-[12px] font-bold tracking-widest text-[#191C1E]">
                  {method.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[#0C4A6E]">
                <Shield size={24} />
              </div>
              <div>
                <h4 className="text-[16px] font-bold text-[#191C1E] font-['Inter']">Your data is secure with us</h4>
                <p className="text-[13px] text-[#9CA3AF] font-medium font-['Inter']">We only use your contact method for essential updates — no spam.</p>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="bg-[#0C4A6E] text-white h-[40px] w-[100px] rounded-[6px] text-[15px] font-bold flex items-center justify-center gap-2 hover:bg-[#092e4f] transition-all cursor-pointer shadow-sm"
            >
              Next
              <div className="bg-white/20 rounded-full p-0.5 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
              </div>
            </button>
          </div>
        </div>

        <div className="flex gap-2 mt-8">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === 0 ? 'bg-[#00416A]' : 'bg-[#CBD5E1]'
              }`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Onboarding;
