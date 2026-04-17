import { useState } from 'react';
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
  ChevronLeft,
  ChevronRight,
  Search
} from 'lucide-react';

import OnboardingProgress from './OnboardingProgress';

const WorkDescription = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
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
          className="bg-white rounded-[12px] p-8 sm:p-[60px] flex flex-col relative w-full max-w-[1440px]"
          style={{
            height: 'auto',
            minHeight: '520px',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          <div className="flex justify-between items-start mb-[40px]">
            <div className="flex flex-col gap-[10px]">
              <h2 className="text-[#000000] text-[24px] font-semibold leading-[24px] font-manrope">Describe Your Work ?</h2>
              <p className="text-[#5A5A5A] text-[16px] font-medium leading-none font-inter">Tell us about your current role or activity</p>
            </div>
            <div className="w-[36px] h-[36px] bg-[#F0F7FF] rounded-full flex items-center justify-center text-[#005B96] cursor-pointer">
              <Search size={20} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[50px] mb-[60px] justify-items-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className={`flex flex-col items-start pt-[20px] pb-[10px] px-[20px] gap-[20px] rounded-[10px] border-[0.5px] transition-all duration-200 group text-left w-[290px] h-[135px] ${selectedCategories.includes(category.id)
                  ? 'border-[#004370] bg-[#F8FAFC] ring-1 ring-[#004370] shadow-[0_1px_2px_0_#CEE9FB]'
                  : 'border-[#DCD7D7] bg-white hover:border-[#004370]/30 shadow-[0_1px_2px_0_#CEE9FB]'
                  }`}
              >
                <div
                  className={`w-[40px] h-[40px] shrink-0 rounded-[8px] flex items-center justify-center transition-colors ${selectedCategories.includes(category.id)
                    ? 'bg-[#004370] text-white shadow-md'
                    : 'bg-[#005B96] text-white group-hover:bg-[#004370]'
                    }`}
                >
                  {category.icon}
                </div>
                <span className="text-[18px] font-medium text-[#000000] font-inter leading-tight">
                  {category.label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-auto flex justify-end gap-3">
            <button
              onClick={() => navigate(-1)}
              className="bg-white border border-[#D2D2D2] text-[#64748B] w-[100px] h-[40px] rounded-[5px] text-[14px] font-semibold flex items-center justify-center hover:bg-gray-50 transition-all cursor-pointer"
            >
              Go Back
            </button>
            <button
              onClick={handleNext}
              disabled={selectedCategories.length === 0}
              className={`w-[100px] h-[40px] rounded-[5px] text-[14px] font-semibold flex items-center justify-center transition-all shadow-sm ${selectedCategories.length > 0
                ? 'bg-[#004370] text-white hover:bg-[#003152] cursor-pointer active:scale-95'
                : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed shadow-none'
                }`}
            >
              Next
            </button>
          </div>
        </div>

        <OnboardingProgress currentStep={5} />
      </main>
    </div>
  );
};

export default WorkDescription;
