import { useState, type ChangeEvent } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OnboardingProgress from './OnboardingProgress';

const ReviewConfirmation = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [localData, setLocalData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    role: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setLocalData({ ...localData, [field]: e.target.value });
  };

  const handleSubmit = () => {
    if (confirmed) {
      navigate('/onboarding/success');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-inter">
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

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#F9FAFB]">
        <div
          className="bg-white rounded-[24px] flex flex-col lg:flex-row relative w-full max-w-[1100px] overflow-hidden"
          style={{
            height: 'auto',
            minHeight: '620px',
            boxShadow: '0px 10px 40px rgba(0, 0, 0, 0.05)'
          }}
        >
          {/* Left Panel - Review Summary */}
          <div className="w-full lg:w-[450px] bg-[#005B96] p-10 flex flex-col text-white">
            <h2 className="text-[24px] font-semibold leading-[28px] mb-4 font-manrope text-white">Review & Confirmation</h2>
            <p className="text-white text-[16px] font-medium mb-12 font-inter leading-[25px]">
              Contact information submitted successfully and ready for next steps.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone size={20} className="text-white" />
                </div>
                <span className="text-[18px] font-medium font-inter leading-[25px] text-white">{localData.mobileNumber || ''}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail size={20} className="text-white" />
                </div>
                <span className="text-[18px] font-medium font-inter leading-[25px] text-white">{localData.email || ''}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin size={20} className="text-white" />
                </div>
                <span className="text-[18px] font-semibold font-inter">India</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Contact Info */}
          <div className="flex-1 p-10 lg:p-14 flex flex-col">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#005B96] text-white p-3 rounded-[12px]">
                <User size={28} />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[#32313B] font-inter leading-none">Contact info</h3>
                <p className="text-[12px] text-[#5A5A5A] font-medium font-inter leading-[15px]">Primary identity details for system verification</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-normal text-[#000000] font-inter leading-none">Full name</label>
                <input
                  type="text"
                  value={localData.fullName}
                  onChange={(e) => handleInputChange(e, 'fullName')}
                  className="pb-2 border-b border-[#E2E8F0] text-[14px] text-black font-normal font-inter leading-none bg-transparent focus:border-[#005B96] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-normal text-[#000000] font-inter leading-none">Email id</label>
                <input
                  type="email"
                  value={localData.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  className="pb-2 border-b border-[#E2E8F0] text-[14px] text-black font-normal font-inter leading-none bg-transparent focus:border-[#005B96] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-normal text-[#000000] font-inter leading-none">Mobile number</label>
                <input
                  type="tel"
                  value={localData.mobileNumber}
                  onChange={(e) => handleInputChange(e, 'mobileNumber')}
                  className="pb-2 border-b border-[#E2E8F0] text-[14px] text-black font-normal font-inter leading-none bg-transparent focus:border-[#005B96] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-normal text-[#000000] font-inter leading-none">Role</label>
                <input
                  type="text"
                  value={localData.role}
                  onChange={(e) => handleInputChange(e, 'role')}
                  className="pb-2 border-b border-[#E2E8F0] text-[14px] text-black font-normal font-inter leading-none bg-transparent focus:border-[#005B96] outline-none transition-colors"
                />
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer mb-12 group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border-2 border-[#CBD5E1] rounded-[4px] checked:bg-[#005B96] checked:border-[#005B96] transition-all"
                />
                <Check className="absolute w-4 h-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-0.5" />
              </div>
              <span className="text-[14px] text-[#64748B] font-medium font-inter group-hover:text-[#191C1E] transition-colors">
                I confirm my information is accurate and understand it will be used for system setup
              </span>
            </label>

            <div className="mt-auto flex justify-end items-center gap-3">
              <button
                onClick={() => navigate(-1)}
                className="bg-white border border-[#D2D2D2] text-[#64748B] w-[100px] h-[40px] rounded-[5px] text-[14px] font-semibold flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
              >
                Go Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={!confirmed}
                className={`w-[140px] h-[40px] rounded-[5px] text-[14px] font-semibold flex items-center justify-center gap-1 transition-all shadow-sm ${confirmed
                  ? 'bg-[#004370] text-white hover:bg-[#003152] cursor-pointer'
                  : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed shadow-none'
                  }`}
              >
                Submit Profile
              </button>
            </div>
          </div>
        </div>

        <OnboardingProgress currentStep={6} />
      </main>
    </div>
  );
};

// Simple check icon for the checkbox
const Check = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ReviewConfirmation;
