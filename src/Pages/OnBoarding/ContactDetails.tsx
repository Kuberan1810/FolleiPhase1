import { useState } from 'react';
import { Shield, Lock, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OnboardingProgress from './OnboardingProgress';

const ContactDetails = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: ''
  });

  const isFormComplete = formData.name && formData.email && formData.password && formData.mobile;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'mobile') {
      const numericValue = value.replace(/\D/g, '');
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
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
          className="bg-white rounded-[12px] p-8 sm:p-12 flex flex-col relative w-full max-w-[660px]"
          style={{
            height: 'auto',
            minHeight: '400px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="flex flex-col gap-[10px] mb-[32px]">
            <h2 className="text-[#000000] text-[24px] font-semibold leading-tight font-manrope">Enter Your Contact Details</h2>
            <p className="text-[#5A5A5A] text-[16px] font-medium font-inter">We use your details only for security and essential updates</p>
          </div>

          <div className="flex flex-col gap-6 mb-6">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-normal text-[#000000] leading-none font-inter">Enter your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-[52px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-normal text-[#000000] leading-none font-inter">Enter your email id</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-[52px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[14px] font-normal text-[#000000] leading-none font-inter">Password</label>
                <a href="#" className="text-[14px] font-medium text-[#004370] hover:underline font-manrope cursor-pointer">Forgot Password?</a>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-[52px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-normal text-[#000000] leading-none font-inter">Enter your mobile number</label>
              <div className="relative w-full flex items-center">
                <span className="absolute left-6 text-black text-[16px]">+91</span>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  className="w-full h-[52px] pl-[60px] pr-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E]"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
            <div className="flex items-start gap-3 max-w-[260px]">
              <div className="mt-1 text-[#005B96] shrink-0">
                <Lock size={20} strokeWidth={3} />
              </div>
              <div>
                <h4 className="text-[12px] font-semibold text-[#000000] font-inter">Secure Encryption</h4>
                <p className="text-[10px] text-[#999999] font-medium leading-tight mt-0.5 font-inter">End-to-end encrypted for your security</p>
              </div>
            </div>
            <div className="flex items-start gap-3 max-w-[260px]">
              <div className="mt-1 text-[#005B96] shrink-0">
                <Shield size={22} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-[12px] font-semibold text-[#000000] font-inter">Your data is secure with us</h4>
                <p className="text-[10px] text-[#999999] font-medium leading-tight mt-0.5 font-inter">We only use your contact method for essential updates no spam.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end gap-3">
            <button
              onClick={() => navigate('/onboarding')}
              className="bg-white border border-[#D2D2D2] text-[#64748B] w-[100px] h-[40px] rounded-[5px] text-[14px] font-semibold flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
            >
              Go Back
            </button>
            <button
              onClick={() => navigate('/onboarding/verify')}
              disabled={!isFormComplete}
              className={`w-[100px] h-[40px] rounded-[5px] text-[14px] font-semibold flex items-center justify-center transition-all shadow-sm ${isFormComplete
                ? 'bg-[#004370] text-white hover:bg-[#003152] cursor-pointer active:scale-95'
                : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed shadow-none'
                }`}
            >
              Next
            </button>
          </div>
        </div>

        <OnboardingProgress currentStep={1} />
      </main>
    </div>
  );
};

export default ContactDetails;
