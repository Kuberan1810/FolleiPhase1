import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import illustration from '../../assets/illustration/login-illustration.png';

const OnBoarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8F0F8] via-[#F8FAFC] to-[#DCE6ED] p-4 font-inter">
      
      {/* Background blur overlays for a more immersive feel */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-[640px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] p-8 md:p-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
        
        {/* Header */}
        <h1 className="text-[36px] font-bold font-inter text-[#0D1C2E] mb-3 leading-[40px] tracking-[-0.9px]">
          Let's Get Started
        </h1>
        <p className="text-[16px] font-normal font-inter text-[#767587] mb-8 leading-[29.3px] tracking-normal w-full max-w-none">
          Answer a few quick question to personalize your Follie workspace
        </p>

        {/* Illustration */}
        <div className="w-full max-w-[280px] mb-8">
          <img 
            src={illustration} 
            alt="Onboarding workspace setup" 
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3 max-w-[480px]">
          <button 
            onClick={() => navigate('/onboarding/step-2')}
            className="w-full h-[52px] bg-[#004370] text-white rounded-[12px] flex items-center justify-center gap-2 font-semibold text-[16px] hover:bg-[#003152] transition-colors group cursor-pointer"
          >
            Continue
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')} // Or wherever skip goes
            className="w-full h-[52px] bg-[#F8FAFC] text-[#464555] rounded-[12px] flex items-center justify-center font-semibold text-[16px] hover:bg-[#F1F5F9] transition-colors cursor-pointer"
          >
            Skip setup
          </button>
        </div>

      </div>
    </div>
  );
};

export default OnBoarding;
