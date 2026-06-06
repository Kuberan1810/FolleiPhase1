import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingProgress from './OnboardingProgress';
import FolleiWhite from '../../assets/logo/FolleiLogo.svg';
import BtnCom from '../../Component/BtnCom';
import { Lock1, ShieldSecurity } from 'iconsax-react';

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
    <div className="min-h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5">
      <div className="flex items-center gap-3 mb-10 fixed top-4 sm:top-5 Z-999">
        <div className='w-28 fixed top-5'>
          <img src={FolleiWhite} alt="FolleiLogo" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6  ">
        <div className="BoxStyle p-7.5! flex flex-col relative w-full max-w-[750px]  shadow-xs ">
          <div className="mb-[48px]">
            <h2 className="text-[#191C1E] text-xl md:text-[24px] font-semibold leading-[24px] mb-[10px] font-manrope">Enter Your Contact Details</h2>
            <p className="text-[#64748B] text-sm md:text-[16px] font-regular leading-none font-inter">We use your details only for security and essential updates</p>
          </div>
          <div className="h-[300px] overflow-y-auto scrollbar-thin p-1">
            <div className="flex flex-col gap-6 mb-8 ">
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-normal text-[#191C1E] leading-none font-inter">Enter your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full h-[52px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E] font-inter"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-normal text-[#191C1E] leading-none font-inter">Enter your email id</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full h-[52px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E] font-inter"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-[14px] font-normal text-[#191C1E] leading-none font-inter">Password</label>
                  <a href="#" className="text-[14px] font-medium text-[#004370] hover:underline font-manrope cursor-pointer">Forgot Password?</a>
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full h-[52px] px-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E] font-inter"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-normal text-[#191C1E] leading-none font-inter">Enter your mobile number</label>
                <div className="relative w-full flex items-center">
                  <span className="absolute left-6 text-black text-[16px] font-inter">+91</span>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    className="w-full h-[52px] pl-[60px] pr-6 rounded-[10px] border border-[#D2D2D2] bg-white text-[16px] text-black focus:outline-none focus:ring-1 focus:ring-[#0C4A6E] font-inter"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-start justify-between gap-6 mb-10">
              <div className="flex flex-1 items-start gap-3">
                <div className="mt-1 text-[#005B96] shrink-0">
                  <Lock1 size={28} color='currentColor' strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#191C1E] font-manrope">Secure Encryption</h4>
                  <p className="text-xs text-[#6B7A90] font-regular leading-tight mt-0.5">End-to-end encrypted for your security</p>
                </div>
              </div>
              <div className="flex-1 flex items-start gap-3 ">
                <div className="mt-1 text-[#005B96] shrink-0">
                  <ShieldSecurity size={28} color='currentColor' strokeWidth={2.5} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#191C1E] font-manrope">Your data is secure with us</h4>
                  <p className="text-xs text-[#6B7A90] font-regular leading-tight mt-0.5">We only use your contact method for essential updates no spam.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <BtnCom
              title="Go Back"
              variant="outline"
              onClick={() => navigate('/onboarding')}
              className="px-10!"
            />
            <BtnCom
              title="Next"
              variant="primary"
              onClick={() => navigate('/onboarding/verify')}
              disabled={!isFormComplete}
              className="px-10!"
            />
          </div>
        </div>

        <OnboardingProgress currentStep={1} />
      </main >
    </div >
  );
};

export default ContactDetails;
