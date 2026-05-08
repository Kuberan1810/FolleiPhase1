import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Factory,
  Stethoscope,
  CircleDollarSign,
  Headphones,
  ShoppingCart,
  Briefcase,
  Hotel,
  GraduationCap,
  Plane,
  BarChart3,
  Home,
  Search,

  X,
  ShieldCheck
} from 'lucide-react';
import { Lock1 } from 'iconsax-react';


import OnboardingProgress from './OnboardingProgress';
import FolleiWhite from '../../assets/logo/FolleiLogo.svg';
import BtnCom from '../../Component/BtnCom';

const WorkDescription = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { id: 'sales', label: 'Sales & Marketing', icon: <TrendingUp size={20} /> },
    { id: 'industrial', label: 'Industrial & Manufacturing', icon: <Factory size={20} /> },
    { id: 'healthcare', label: 'Healthcare', icon: <Stethoscope size={20} /> },
    { id: 'finance', label: 'Finance', icon: <CircleDollarSign size={20} /> },
    { id: 'customer_support', label: 'Customer support', icon: <Headphones size={20} /> },
    { id: 'ecommerce', label: 'Ecommerce', icon: <ShoppingCart size={20} /> },
    { id: 'consulting', label: 'Consulting', icon: <Briefcase size={20} /> },
    { id: 'hospitality', label: 'Hospitality', icon: <Hotel size={20} /> },
    { id: 'education', label: 'Education', icon: <GraduationCap size={20} /> },
    { id: 'travel', label: 'Travel & Tourism', icon: <Plane size={20} /> },
    { id: 'business', label: 'Business & Strategy', icon: <BarChart3 size={20} /> },
    { id: 'real_estate', label: 'Real Estate', icon: <Home size={20} /> },
  ];

  const filteredCategories = categories.filter(category =>
    category.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleNext = () => {
    navigate('/onboarding/review');
  };

  return (

    <div className="h-screen bg-[#F8F9FC] flex flex-col font-['Inter'] px-5 pt-5 overflow-hidden">
      <div className="flex items-center gap-3 mb-10">

        <div className='w-28'>
          <img src={FolleiWhite} alt="FolleiLogo" />
        </div>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">

        <div className="BoxStyle p-6 sm:p-10 flex flex-col relative w-full max-w-[1200px] shadow-lg border border-gray-100 flex-1 min-h-0">
          <div className="relative flex justify-between items-center mb-10 h-14 sm:h-auto">
            <div className={`flex flex-col gap-2 ${searchOpen ? 'hidden sm:flex' : 'flex'}`}>

              <h2 className="text-[#191C1E] text-xl md:text-[24px] font-semibold leading-[24px] font-manrope">Describe Your Work ?</h2>
              <p className="text-[#64748B] text-sm md:text-[16px] font-regular leading-none font-inter">Tell us about your current role or activity</p>
            </div>


            {/* Search Container */}
            <div className={`flex items-center gap-2 ${searchOpen ? 'w-full sm:w-auto sm:relative z-10 sm:ml-auto' : 'relative ml-auto'}`}>
              {searchOpen && (
                <div className="flex items-center overflow-hidden w-full sm:w-[320px]">
                  <div className="relative w-full">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]">
                      <Search size={16} strokeWidth={2.5} />
                    </div>
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Escape') { setSearchOpen(false); setSearchQuery(''); } }}
                      className="w-full h-[46px] sm:h-[40px] pl-10 pr-10 bg-white border border-[#D2D2D2] rounded-xl text-[14px] font-medium focus:outline-none focus:border-[#005B96] transition-all font-inter"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-[#64748B] transition-colors"
                      >
                        <X size={14} strokeWidth={3} />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Search toggle icon button */}
              <button
                onClick={() => { setSearchOpen(prev => !prev); setSearchQuery(''); }}
                className={`shrink-0 w-[38px] h-[38px] rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer ${searchOpen
                  ? 'bg-[#0C4A6E] text-white absolute right-1 top-1/2 -translate-y-1/2 sm:relative sm:right-auto sm:top-auto sm:translate-y-0'
                  : 'bg-[#F0F7FF] text-[#005B96] hover:bg-[#005B96] hover:text-white'
                  }`}
              >

                {searchOpen ? <X size={18} strokeWidth={2.5} className='cursor-pointer' /> : <Search size={18} strokeWidth={2.5} className='cursor-pointer' />}
              </button>
            </div>
          </div>


          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 justify-items-center font-inter flex-1 min-h-0 overflow-y-auto premium-scroll pr-2 p-1">

            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}

                  className={`BoxStyle flex flex-col items-start p-4 gap-3 rounded-[12px] border transition-all duration-200 group text-left w-full h-[110px] cursor-pointer ${selectedCategories.includes(category.id)

                    ? 'border-[#0C4A6E]! bg-[#d1e5ff20]! ring-1 ring-[#0C4A6E]'
                    : 'border-[#e6e6e6]! bg-white! hover:border-[#0C4A6E]!'
                    }`}
                >
                  <div

                    className={`w-[32px] h-[32px] shrink-0 rounded-[8px] flex items-center justify-center transition-colors ${selectedCategories.includes(category.id)

                      ? 'bg-[#004370] text-white shadow-md'
                      : 'bg-[#005B96] text-white group-hover:bg-[#004370]'
                      }`}
                  >

                    {category.icon && React.cloneElement(category.icon as React.ReactElement<any>, { size: 16 })}
                  </div>
                  <span className="text-[14px] font-semibold text-[#191C1E] font-inter leading-tight">

                    {category.label}
                  </span>
                </button>
              ))
            ) : (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-center opacity-50">
                <Search size={48} className="mb-4 text-[#64748B]" />
                <p className="text-[16px] font-medium font-inter">No categories found matching "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Security Info Section */}

          <div className="flex flex-col gap-6 mb-10">
            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#005B96] shrink-0">
                <Lock1 size={24} color='currentColor' strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-[#191C1E] font-manrope">Secure Encryption</h4>
                <p className="text-[13px] text-[#64748B] font-regular leading-tight mt-0.5">End-to-end encrypted for your security</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 text-[#005B96] shrink-0">
                <ShieldCheck color='currentColor' size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-[#191C1E] font-manrope">Your data is secure with us</h4>

              </div>
            </div>
          </div>


          <div className="mt-auto flex items-center justify-end gap-3 sm:gap-4">

            <BtnCom
              title="Go Back"
              variant="outline"
              onClick={() => navigate(-1)}

              className="px-8 sm:px-10!"

            />
            <BtnCom
              title="Next"
              variant="primary"
              onClick={handleNext}
              disabled={selectedCategories.length === 0}

              className="px-8 sm:px-10!"

            />
          </div>
        </div>

        <OnboardingProgress currentStep={5} />
      </main>
    </div>
  );
};

export default WorkDescription;
