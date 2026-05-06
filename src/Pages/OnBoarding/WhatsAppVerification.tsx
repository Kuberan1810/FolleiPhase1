import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingProgress from './OnboardingProgress';
import FolleiWhite from '../../assets/logo/FolleiLogo.svg';
import BtnCom from '../../Component/BtnCom';

const WhatsAppVerification = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5">
      <div className="flex items-center gap-3 mb-10">
        <div className='w-28 fixed top-5'>
          <img src={FolleiWhite} alt="FolleiLogo" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#]">
        <div className="BoxStyle p-7.5! flex flex-col relative  shadow-xs">
          <div className="mb-[48px]">
            <h2 className="text-[#191C1E] text-xl md:text-[24px] font-semibold leading-[24px] mb-[10px] font-manrope ">Security Verification</h2>
            <p className="text-[#64748B] text-sm md:text-[16px] font-regular leading-none font-inter ">We've sent a whatsapp verification code please enter it below</p>
          </div>

          <div className="mb-[48px] px-2 sm:px-20">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter Code"
              className="w-full h-[64px] rounded-[10px] border border-[#D2D2D2] bg-white text-center text-[24px] font-bold text-black placeholder:text-[#64748B40] placeholder:font-semibold focus:outline-none focus:ring-2 focus:ring-[#0C4A6E] transition-all font-inter"
            />
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
              onClick={() => navigate('/onboarding/additional-details')}
              className="px-10!"
            />
            <BtnCom
              title="Verify"
              variant="primary"
              onClick={() => navigate('/onboarding/work-description')}
              disabled={!code}
              className="px-10!"
            />
          </div>
        </div>

        <OnboardingProgress currentStep={4} />
      </main>
    </div>
  );
};

export default WhatsAppVerification;
