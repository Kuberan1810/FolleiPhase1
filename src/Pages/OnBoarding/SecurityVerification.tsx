import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OnboardingProgress from './OnboardingProgress';

const SecurityVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      // Focus previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
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
          className="bg-white rounded-[12px] p-8 sm:p-14 flex flex-col relative w-full max-w-[620px]"
          style={{
            height: 'auto',
            minHeight: '520px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="mb-[24px]">
            <h2 className="text-[#000000] text-[24px] font-semibold leading-[24px] mb-2 font-manrope">Security Verification</h2>
            <p className="text-[#5A5A5A] text-[16px] font-medium leading-[15px] font-inter">We've sent a verification code please enter it below</p>
          </div>

          <div className="flex justify-between gap-3 sm:gap-4 mb-[32px]">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-10 h-14 sm:w-[68px] sm:h-[72px] rounded-[10px] border border-[#D2D2D2] bg-white text-center text-[28px] font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0C4A6E] transition-all"
              />
            ))}
          </div>

          <div className="text-center mb-[40px]">
            <a href="#" className="text-[#0C4A6E] font-bold text-[15px] hover:underline">
              Resend code in 45s
            </a>
          </div>

          <button
            onClick={() => navigate('/onboarding/additional-details')}
            className="w-full max-w-[445px] mx-auto bg-[#004370] text-white h-[40px] rounded-[5px] text-[14px] font-semibold hover:bg-[#003152] transition-all mb-[32px] flex items-center justify-center cursor-pointer shadow-sm"
          >
            Verify
          </button>

          <div className="mt-auto flex justify-end gap-3">
            <button
              onClick={() => navigate('/onboarding/details')}
              className="bg-white border border-[#D2D2D2] text-[#64748B] w-[100px] h-[40px] rounded-[5px] text-[14px] font-semibold flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/onboarding/additional-details')}
              className="bg-[#004370] text-white w-[100px] h-[40px] rounded-[5px] text-[14px] font-semibold flex items-center justify-center hover:bg-[#003152] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Next
            </button>
          </div>
        </div>

        <OnboardingProgress currentStep={2} />
      </main>
    </div>
  );
};

export default SecurityVerification;
