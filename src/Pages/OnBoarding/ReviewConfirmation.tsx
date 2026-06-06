import { useState, type ChangeEvent } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OnboardingProgress from './OnboardingProgress';
import FolleiWhite from '../../assets/logo/FolleiLogo.svg';
import BtnCom from '../../Component/BtnCom';

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

  const isFormComplete = localData.fullName && localData.email && localData.mobileNumber && localData.role && confirmed;

  return (
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5">
      <div className="flex items-center gap-3 mb-10">
        <div className='w-28 fixed top-5'>
          <img src={FolleiWhite} alt="FolleiLogo" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 bg-[#]">
        <div className="BoxStyle flex flex-col lg:flex-row relative w-full max-w-[1100px] overflow-hidden p-0! shadow-xs border-none">
          {/* Left Panel - Review Summary */}
          <div className="w-full lg:w-[400px] bg-[#005B96] p-10 flex flex-col text-white">
            <h2 className="text-[24px] font-semibold leading-[28px] mb-[10px] font-manrope text-white">Review & Confirmation</h2>
            <p className="text-white/80 text-[15px] font-regular mb-12 font-inter leading-[22px]">
              Contact information submitted successfully and ready for next steps.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Phone size={18} className="text-white" />
                </div>
                <span className="text-[16px] font-medium font-inter text-white">{localData.mobileNumber || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail size={18} className="text-white" />
                </div>
                <span className="text-[16px] font-medium font-inter text-white truncate max-w-[220px]">{localData.email || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-[16px] font-semibold font-inter">India</span>
              </div>
            </div>
          </div>

          {/* Right Panel - Contact Info */}
          <div className="flex-1 p-8 lg:p-12 flex flex-col bg-white">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#005B96]/10 text-[#005B96] p-3 rounded-[12px]">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-[#191C1E] font-inter leading-none">Contact info</h3>
                <p className="text-[12px] text-[#64748B] font-regular font-inter mt-1.5">Primary identity details for system verification</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 mb-10 font-inter">
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-normal text-[#64748B] font-inter">Full name</label>
                <input
                  type="text"
                  value={localData.fullName}
                  onChange={(e) => handleInputChange(e, 'fullName')}
                  placeholder="Full Name"
                  className="pb-2 border-b border-[#E2E8F0] text-[15px] text-[#191C1E] font-medium font-inter bg-transparent focus:border-[#005B96] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-normal text-[#64748B] font-inter">Email id</label>
                <input
                  type="email"
                  value={localData.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  placeholder="Email Address"
                  className="pb-2 border-b border-[#E2E8F0] text-[15px] text-[#191C1E] font-medium font-inter bg-transparent focus:border-[#005B96] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-normal text-[#64748B] font-inter">Mobile number</label>
                <input
                  type="tel"
                  value={localData.mobileNumber}
                  onChange={(e) => handleInputChange(e, 'mobileNumber')}
                  placeholder="Mobile Number"
                  className="pb-2 border-b border-[#E2E8F0] text-[15px] text-[#191C1E] font-medium font-inter bg-transparent focus:border-[#005B96] outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-normal text-[#64748B] font-inter">Role</label>
                <input
                  type="text"
                  value={localData.role}
                  onChange={(e) => handleInputChange(e, 'role')}
                  placeholder="Your Role"
                  className="pb-2 border-b border-[#E2E8F0] text-[15px] text-[#191C1E] font-medium font-inter bg-transparent focus:border-[#005B96] outline-none transition-colors"
                />
              </div>
            </div>

            <label className="flex items-start gap-3 cursor-pointer mb-10 group">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border-2 border-[#CBD5E1] rounded-[6px] checked:bg-[#005B96] checked:border-[#005B96] transition-all cursor-pointer"
                />
                <Check className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity left-0.75 pointer-events-none" />
              </div>
              <span className="text-[13.5px] text-[#64748B] font-regular font-inter group-hover:text-[#191C1E] transition-colors leading-relaxed">
                I confirm my information is accurate and understand it will be used for system setup
              </span>
            </label>

            <div className="mt-auto flex justify-end items-center gap-4">
              <BtnCom
                title="Go Back"
                variant="outline"
                onClick={() => navigate(-1)}
                className="px-8!"
              />
              <BtnCom
                title="Submit Profile"
                variant="primary"
                onClick={handleSubmit}
                disabled={!isFormComplete}
                className="px-8!"
              />
            </div>
          </div>
        </div>

        <OnboardingProgress currentStep={9} />
      </main>
    </div>
  );
};

const Check = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ReviewConfirmation;
