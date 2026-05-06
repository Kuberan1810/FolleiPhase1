
import { useState } from 'react';
import { Mail, Shield, PhoneIncoming } from 'lucide-react';
import { Whatsapp, SmsNotification, ShieldSecurity } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import FolleiWhite from '../../assets/logo/FolleiLogo.svg';
import OnboardingProgress from './OnboardingProgress';
import BtnCom from '../../Component/BtnCom';
import { ArrowRight } from 'lucide-react';

const OnBoarding = () => {
  const [selectedMethods, setSelectedMethods] = useState<string[]>([]);
  const navigate = useNavigate();

  const methods = [
    { id: 'mail', label: 'MAIL', icon: <Mail size={24} color="#005B96" /> },
    { id: 'chat', label: 'CHAT', icon: <Whatsapp size={24} color="#005B96" /> },
    { id: 'sms', label: 'SMS', icon: <SmsNotification size={24} color="#005B96" /> },
    { id: 'voice', label: 'VOICE', icon: <PhoneIncoming size={24} color="#005B96" /> }
  ];

  const toggleMethod = (methodId: string) => {
    setSelectedMethods(prev =>
      prev.includes(methodId)
        ? prev.filter(id => id !== methodId)
        : [...prev, methodId]
    );
  };

  const handleNext = () => {
    navigate('/onboarding/details');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5">
      {/* <header className="bg-[#005B96] h-[100px] flex items-center px-8 shrink-0"> */}

      <div className="flex items-center gap-3 mb-10">
        <div className='w-28 fixed top-5'>
          <img src={FolleiWhite} alt="FolleiLogo" />

        </div>
      </div>

      {/* </header> */}

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#]">
        <div
          className="BoxStyle p-7.5! flex flex-col relative w-full max-w-[750px] shadow-xs "

        >
          <div className="mb-[48px]">
            <h2 className="text-[#191C1E] text-xl md:text-[24px] font-semibold leading-[24px] mb-[10px] font-manrope">How Should We Reach Your Customer?</h2>
            <p className="text-[#64748B] text-sm  md:text-[16px] font-regular leading-none font-inter">Pick your contact method securely</p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-4 sm:gap-[39px] mb-[40px] justify-center font-inter">
            {methods.map((method) => (
              <button
                key={method.id}
                onClick={() => toggleMethod(method.id)}
                className={`BoxStyle flex flex-col items-center justify-center rounded-[10px] border transition-all duration-200 cursor-pointer w-full group ${selectedMethods.includes(method.id)
                  ? 'border-[#0C4A6E]! bg-[#d1e5ff20]! ring-1 ring-[#0C4A6E]'
                  : 'border-[#e6e6e6]! bg-white! hover:border-[#0C4A6E]!'
                  }`}
              >
                <div
                  className={`transition-colors text-[#0C4A6E] mb-2`}
                >
                  {method.icon}
                </div>
                <span className="text-[12px] font-semibold tracking-widest text-[#191C1E]">
                  {method.label}
                </span>
              </button>
            ))}
          </div>


          <div className="flex items-center gap-3 mb-15 ">
            <div className="mt-1 text-[#005B96] shrink-0">
              <ShieldSecurity size={28} color='currentColor' strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#191C1E] font-manrope">Your data is secure with us</h4>
              <p className="text-xs text-[#6B7A90] font-regular leading-tight mt-0.5 ">We only use your contact method for essential updates no spam.</p>
            </div>
          </div>


          <BtnCom
            title="Next"
            onClick={handleNext}
            disabled={selectedMethods.length === 0}
            // icon={ArrowRight}
            // iconPosition="right"
            className="ml-auto px-10!"
          // variant="primary"
          />
        </div>

        <OnboardingProgress currentStep={0} />
      </main>
    </div>
  );

};

export default OnBoarding;
