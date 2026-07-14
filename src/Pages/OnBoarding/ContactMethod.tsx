import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Whatsapp, SmsNotification, ShieldSecurity, Sms, Call } from 'iconsax-react';

const ContactMethod: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMethods, setSelectedMethods] = useState<string[]>(['email']);

  const toggleMethod = (id: string) => {
    if (selectedMethods.includes(id)) {
      setSelectedMethods(selectedMethods.filter(method => method !== id));
    } else {
      setSelectedMethods([...selectedMethods, id]);
    }
  };

  const methods = [
    {
      id: 'email',
      title: 'Email',
      desc: 'Reach customers via email securely',
      Icon: Sms
    },
    {
      id: 'phone',
      title: 'Phone',
      desc: 'Call or SMS your customers',
      Icon: Call
    },
    {
      id: 'sms',
      title: 'SMS',
      desc: 'Send text messages instantly',
      Icon: SmsNotification
    },
    {
      id: 'whatsapp',
      title: 'WhatsApp',
      desc: 'Connect through WhatsApp Business API',
      Icon: Whatsapp
    }
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
                className={`flex-1 h-1.5 rounded-full ${index === 0 ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`} 
              />
            ))}
          </div>

          {/* Header */}
          <div className="flex flex-col items-center text-center mb-6">
            <h1 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[36px] font-bold text-[#0D1C2E] mb-3 leading-tight tracking-[-0.9px]">
              How Should We Reach Your Customer?
            </h1>
            <p className="text-[16px] font-normal text-[#767587]">
              Pick your contact method securely
            </p>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-4 onboarding-scroll z-0">

        {/* Contact Method Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {methods.map((method) => {
            const isSelected = selectedMethods.includes(method.id);
            return (
              <div 
                key={method.id}
                onClick={() => toggleMethod(method.id)}
                className={`relative flex flex-col items-center text-center p-6 rounded-[20px] cursor-pointer transition-all duration-300 border-[1.5px] ${
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
                    variant={isSelected ? 'Bold' : 'Outline'}
                  />
                </div>
                <h3 className={`text-[16px] font-bold mb-2 ${isSelected ? 'text-[#004370]' : 'text-[#131B2E]'}`}>
                  {method.title}
                </h3>
                <p className={`text-[13px] leading-relaxed ${isSelected ? 'text-[#004370]/70' : 'text-[#8B98A5]'}`}>
                  {method.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Security Banner */}
        <div className="w-full bg-[#F4F7FB] border border-[#E2E8F0] rounded-[16px] p-5 flex items-start gap-4 mb-12">
          <div className="mt-0.5">
            <ShieldSecurity size={24} color="#004370" variant="Outline" />
          </div>
          <div>
            <h4 className="text-[#004370] font-bold text-[15px] mb-1">Security First</h4>
            <p className="text-[#64748B] text-[14px] leading-relaxed">
              We use enterprise-grade encryption to keep your customer communication private, secure, and compliant.
            </p>
          </div>
        </div>

        </div>

        {/* Sticky Bottom Footer */}
        <div className="px-6 md:px-12 pb-6 md:pb-10 pt-6 shrink-0 bg-white rounded-b-[24px] border-t border-[#F1F5F9] z-10 relative">
          <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-t from-white to-transparent -mt-6 pointer-events-none z-20" />

          <div className="w-full flex items-center justify-between">
            <button 
              onClick={() => navigate('/onboarding')}
              className="flex items-center gap-2 text-[#64748B] font-semibold text-[15px] hover:text-[#0D1C2E] transition-colors px-2 py-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button 
              onClick={() => navigate('/onboarding/step-3')}
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

export default ContactMethod;
