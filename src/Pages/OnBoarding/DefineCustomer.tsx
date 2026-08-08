import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, User, Users, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface CustomerTypeOption {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    icon: React.ElementType;
    examples?: string[];
}

const customerOptions: CustomerTypeOption[] = [
    {
        id: 'b2b',
        title: 'B2B',
        subtitle: 'BUSINESS TO BUSINESS',
        description: 'Sell products or services to companies and organizations.',
        icon: Building2,
        examples: ['SaaS', 'Agencies', 'Manufacturers'],
    },
    {
        id: 'b2c',
        title: 'B2C',
        subtitle: 'BUSINESS TO CONSUMER',
        description: 'Sell products or services directly to individual customers.',
        icon: User,
        examples: ['Retail', 'Ecommerce', 'Healthcare'],
    },
    {
        id: 'hybrid',
        title: 'Both B2B & B2C',
        subtitle: 'HYBRID MODEL',
        description: 'Sell to both businesses and individual customers.',
        icon: Users,
    },
];

const DefineCustomer: React.FC = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState<string>('b2b');

    const handleContinue = (e: React.FormEvent) => {
        e.preventDefault();
        navigate('/onboarding/import-data');
    };

    return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-[845px] flex flex-col items-center">
        {/* Step Indicator & Header Title */}
        <div className="text-center mb-8">
          <span className="text-[12px] font-medium uppercase tracking-widest text-[#505F76] block mb-1">
            STEP 3 OF 3
          </span>
          <h1 className="text-[32px] font-bold text-[#000000] tracking-tight">
            How do you define your Customer?
          </h1>
          <p className="text-[14px] text-[#444748] mt-2 font-normal">
            Help Follei personalize your sales workspace.
          </p>
        </div>

        {/* Form & Cards */}
        <form onSubmit={handleContinue} className="w-full flex flex-col items-center">
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 w-full mb-8">
            {customerOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedType === option.id;

              return (
                <div
                  key={option.id}
                  onClick={() => setSelectedType(option.id)}
                  className={`bg-white rounded-[8px] p-5 sm:p-6 flex flex-col justify-between border transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-[#004370] bg-[#F0F7FF]/30 ring-1 ring-[#004370] shadow-[0_4px_6px_-4px_rgba(236,238,240,0.5),0_10px_15px_-3px_rgba(236,238,240,0.5)]'
                      : 'border-[#E2E8F0] shadow-[0_4px_6px_-4px_rgba(236,238,240,0.5),0_10px_15px_-3px_rgba(236,238,240,0.5)] hover:border-gray-300'
                  }`}
                >
                  {/* Top Bar: Icon & Radio Circle */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-[#004370] text-white' : 'bg-gray-100/90 text-[#475569]'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                      </div>

                      {/* Custom Radio Button */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${
                          isSelected
                            ? 'bg-[#004370] text-white ring-2 ring-[#004370]/20'
                            : 'border-2 border-gray-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="text-lg font-bold text-[#0F172A] tracking-tight">
                      {option.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block mt-0.5">
                      {option.subtitle}
                    </span>

                    {/* Description */}
                    <p className="text-xs text-[#64748B] mt-3 leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  {/* Examples Section if available */}
                  {option.examples && option.examples.length > 0 && (
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block mb-2">
                        EXAMPLES
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {option.examples.map((ex) => (
                          <span
                            key={ex}
                            className={`px-2 py-0.5 text-[11px] font-medium rounded-md ${
                              isSelected
                                ? 'bg-white text-[#004370] border border-[#004370]/20'
                                : 'bg-gray-100 text-[#475569]'
                            }`}
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Actions Row Container */}
          <div className="w-full flex items-center justify-between border-t border-[#ECEEF0] pt-4 mt-2">
            <button
              type="button"
              onClick={() => navigate('/onboarding/company-details')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] hover:text-[#0F172A] transition-colors cursor-pointer px-4 py-2.5 rounded-lg hover:bg-gray-200/50"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="h-[48px] px-6 bg-[#000000] hover:bg-gray-900 text-white text-[14px] font-semibold rounded-[4px] shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10),0_4px_6px_-1px_rgba(0,0,0,0.10)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-2 h-2 bg-[#CBD5E1] rounded-full transition-all" />
          <span className="w-2 h-2 bg-[#CBD5E1] rounded-full transition-all" />
          <span className="w-2.5 h-2.5 bg-[#0F172A] rounded-full transition-all" />
        </div>
      </div>
    </div>
    );
};

export default DefineCustomer;
