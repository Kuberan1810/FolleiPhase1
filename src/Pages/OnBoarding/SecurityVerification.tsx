import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingProgress from './OnboardingProgress';
import FolleiWhite from '../../assets/logo/FolleiLogo.svg';
import BtnCom from '../../Component/BtnCom';

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

  const isOtpComplete = otp.every(digit => digit !== '');

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5">
      <div className="flex items-center gap-3 mb-10">
        <div className='w-28 fixed top-5'>
          <img src={FolleiWhite} alt="FolleiLogo" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#]">
        <div className="BoxStyle p-7.5! flex flex-col relative w-full max-w-[750px] shadow-xs">
          <div className="mb-[48px]">
            <h2 className="text-[#191C1E] text-xl md:text-[24px] font-semibold leading-[24px] mb-[10px] font-manrope">Security Verification</h2>
            <p className="text-[#64748B] text-sm md:text-[16px] font-regular leading-none font-inter">We've sent a verification code please enter it below</p>
          </div>

          <div className="flex justify-between gap-3 sm:gap-4 mb-[48px] px-2 sm:px-10">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-10 h-14 sm:w-[68px] sm:h-[72px] rounded-[10px] border border-[#D2D2D2] bg-white text-center text-[28px] font-bold text-black focus:outline-none focus:ring-2 focus:ring-[#0C4A6E] transition-all font-inter"
              />
            ))}
          </div>

          <div className="text-center mb-[48px]">
            <a href="#" className="text-[#0C4A6E] font-bold text-[15px] hover:underline cursor-pointer font-manrope">
              Resend code in 45s
            </a>
          </div>

          <div className="flex justify-end gap-4">
            <BtnCom
              title="Go Back"
              variant="outline"
              onClick={() => navigate('/onboarding/details')}
              className="px-10!"
            />
            <BtnCom
              title="Verify"
              variant="primary"
              onClick={() => navigate('/onboarding/work-description')}
              disabled={!isOtpComplete}
              className="px-10!"
            />
          </div>
        </div>

        <OnboardingProgress currentStep={2} />
      </main>
    </div>
  );
};

export default SecurityVerification;
