import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ArrowLeft, 
  Cloud, ShoppingCart, Landmark, Heart, GraduationCap,
  Truck, Factory, Code2, Wifi, Building, MonitorPlay, MoreHorizontal,
  User, Users
} from 'lucide-react';

const OrganizationDetails: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOrgTypes, setSelectedOrgTypes] = useState<string[]>(['saas']);
  const [companySize, setCompanySize] = useState<string>('');

  const toggleOrgType = (id: string) => {
    if (selectedOrgTypes.includes(id)) {
      setSelectedOrgTypes(selectedOrgTypes.filter(type => type !== id));
    } else {
      setSelectedOrgTypes([...selectedOrgTypes, id]);
    }
  };

  const orgTypes = [
    { id: 'saas', title: 'SaaS', desc: 'Subscription-based software products.', Icon: Cloud },
    { id: 'ecommerce', title: 'E-commerce', desc: 'Online retail and marketplaces.', Icon: ShoppingCart },
    { id: 'finance', title: 'Financial Services', desc: 'Banking, fintech, insurance, investments.', Icon: Landmark },
    { id: 'healthcare', title: 'Healthcare', desc: 'Hospitals, clinics, health tech.', Icon: Heart },
    { id: 'education', title: 'Education', desc: 'Schools, universities, EdTech platforms.', Icon: GraduationCap },
    { id: 'logistics', title: 'Logistics & Transportation', desc: 'Shipping, delivery, fleet management.', Icon: Truck },
    { id: 'manufacturing', title: 'Manufacturing', desc: 'Industrial production and supply chain.', Icon: Factory },
    { id: 'it', title: 'IT Services & Consulting', desc: 'Technology services and consulting firms.', Icon: Code2 },
    { id: 'telecom', title: 'Telecommunications', desc: 'Communication and network providers.', Icon: Wifi },
    { id: 'realestate', title: 'Real Estate', desc: 'Property management and real estate services.', Icon: Building },
    { id: 'media', title: 'Media & Entertainment', desc: 'Streaming, publishing, digital media.', Icon: MonitorPlay },
    { id: 'other', title: 'Other', desc: 'Specify your organization type.', Icon: MoreHorizontal }
  ];

  const sizes = [
    { id: '1-10', label: '1-10', Icon: User },
    { id: '11-50', label: '11-50', Icon: Users },
    { id: '51-200', label: '51-200', Icon: Users },
    { id: '201-1000', label: '201-1,000', Icon: Building },
    { id: '1000+', label: '1,000+', Icon: Building }
  ];

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-[#E8F0F8] via-[#F8FAFC] to-[#DCE6ED] p-4 md:p-8 font-inter overflow-hidden">
      
      {/* Background blur overlays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[60%] rounded-full bg-blue-300/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-cyan-200/40 blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-blue-200/30 blur-[100px]" />
      </div>

      {/* Main Content Card - Flex Layout Chassis */}
      <div className="relative z-10 w-full max-w-[1200px] h-full max-h-[900px] bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.06)] flex flex-col animate-in fade-in zoom-in duration-500">
        
        {/* Sticky Top Header Area */}
        <div className="px-6 md:px-12 pt-6 md:pt-10 shrink-0 bg-white rounded-t-[24px] z-10 relative">
          <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-b from-white to-transparent -mb-6 pointer-events-none z-20" />
          
          {/* Stepper */}
          <div className="flex items-center gap-3 w-full mb-8">
            {[1, 2, 3, 4, 5].map((_, index) => (
              <div 
                key={index} 
                className={`flex-1 h-1.5 rounded-full ${index < 2 ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`} 
              />
            ))}
          </div>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0D1C2E] mb-3 leading-tight tracking-[-0.9px]">
              What best describes your organization?
            </h1>
            <p className="text-[16px] font-normal text-[#767587]">
              Help Follei tailor AI insights, customer health metrics, and recommendations for your business.
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-4 onboarding-scroll z-0">

        {/* Organization Type Grid */}
        <div className="flex flex-wrap justify-start gap-5 mb-14">
          {orgTypes.map((method) => {
            const isSelected = selectedOrgTypes.includes(method.id);
            return (
              <div 
                key={method.id}
                onClick={() => toggleOrgType(method.id)}
                className={`relative flex flex-col items-center text-center p-6 rounded-[20px] cursor-pointer transition-all duration-300 border-[1.5px] w-full sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)] min-h-[160px] ${
                  isSelected 
                    ? 'border-transparent onboarding-selected-box' 
                    : 'border-[#F1F5F9] hover:border-[#E2E8F0] hover:bg-[#FAFAFA] bg-white'
                }`}
              >
                {/* Active Checkmark Badge */}
                {isSelected && (
                  <div className="absolute top-4 right-4 bg-[#004370] rounded-full flex items-center justify-center p-0.5">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" fill="#004370"/>
                      <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}

                <div className="mb-4">
                  <method.Icon 
                    size={28} 
                    color={isSelected ? '#004370' : '#8B98A5'} 
                    strokeWidth={isSelected ? 2.5 : 1.5}
                  />
                </div>
                <h3 className={`text-[15px] font-bold mb-2 ${isSelected ? 'text-[#004370]' : 'text-[#131B2E]'}`}>
                  {method.title}
                </h3>
                <p className={`text-[12px] leading-relaxed px-1 ${isSelected ? 'text-[#004370]/70' : 'text-[#8B98A5]'}`}>
                  {method.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Company Size Section */}
        <div className="mb-14">
          <h4 className="text-[12px] font-bold text-[#8B98A5] tracking-wider uppercase mb-4 pl-2">
            Company Size (Optional)
          </h4>
          <div className="flex flex-wrap gap-4">
            {sizes.map((size) => {
              const isSelected = companySize === size.id;
              return (
                <div 
                  key={size.id}
                  onClick={() => setCompanySize(size.id)}
                  className={`flex-1 min-w-[140px] flex items-center gap-3 p-4 rounded-[12px] cursor-pointer transition-all duration-300 border-[1.5px] ${
                    isSelected 
                      ? 'border-transparent onboarding-selected-box' 
                      : 'border-[#F1F5F9] hover:border-[#E2E8F0] hover:bg-[#FAFAFA] bg-white'
                  }`}
                >
                  <size.Icon size={20} color={isSelected ? '#004370' : '#8B98A5'} strokeWidth={isSelected ? 2 : 1.5} />
                  <div className="flex flex-col">
                    <span className={`text-[14px] font-bold ${isSelected ? 'text-[#004370]' : 'text-[#131B2E]'}`}>
                      {size.label}
                    </span>
                    <span className={`text-[12px] ${isSelected ? 'text-[#004370]/70' : 'text-[#8B98A5]'}`}>
                      Employees
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        </div>

        {/* Sticky Bottom Footer */}
        <div className="px-6 md:px-12 pb-6 md:pb-10 pt-6 shrink-0 bg-white rounded-b-[24px] border-t border-[#F1F5F9] z-10 relative">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent -mt-6 pointer-events-none z-20" />
          
          <div className="w-full flex items-center justify-between">
            <button 
              onClick={() => navigate('/onboarding/step-2')}
              className="flex items-center gap-2 text-[#64748B] font-semibold text-[15px] hover:text-[#0D1C2E] transition-colors px-2 py-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button 
              onClick={() => navigate('/onboarding/step-4')}
              className="h-[48px] px-8 bg-[#004370] text-white rounded-[10px] flex items-center justify-center gap-2 font-semibold text-[15px] hover:bg-[#003152] transition-colors cursor-pointer"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrganizationDetails;
