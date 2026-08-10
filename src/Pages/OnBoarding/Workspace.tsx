import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Globe, TrendingUp, Megaphone, MoreHorizontal, ArrowRight } from 'lucide-react';
import GoogleWorkspaceModal from '../auth/modal/GoogleWorkspaceModal';
import CompanyWebsiteModal from './modal/CompanyWebsiteModal';

interface RoleOption {
  id: string;
  label: string;
  icon: React.ElementType;
}

const roles: RoleOption[] = [
  { id: 'founder', label: 'Founder', icon: Rocket },
  { id: 'sales_manager', label: 'Sales Manager', icon: Globe },
  { id: 'sales_exec', label: 'Sales Exec', icon: TrendingUp },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

const Workspace: React.FC = () => {
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('founder');
  
  // Sequence: 'google' -> 'website' -> 'none' (reaches Workspace form)
  const [popupStep, setPopupStep] = useState<'google' | 'website' | 'none'>('google');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to next onboarding step
    navigate('/onboarding/company-details');
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-[640px] flex flex-col items-center">
        {/* Header Title & Subtitle */}
        <div className="text-center mb-8">
          <span className="text-[12px] font-medium uppercase tracking-widest text-[#505F76] block mb-1">
            STEP 1 OF 3
          </span>
          <h1 className="text-[32px] font-bold text-[#000000] tracking-tight">
            Set up your workspace
          </h1>
          <p className="text-[14px] text-[#444748] mt-2 font-normal">
            Tell us a bit about your team to customize your experience.
          </p>
        </div>

        {/* Card Box */}
        <div className="w-full bg-white rounded-[8px] border border-[#E2E8F0]/50 shadow-[0_4px_6px_-4px_rgba(236,238,240,0.5),0_10px_15px_-3px_rgba(236,238,240,0.5)] p-10">
          <form onSubmit={handleContinue} className="space-y-4">
            {/* Input 1: Workspace Name */}
            <div>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                placeholder="Workspace Name"
                className="w-full px-4 py-3 bg-white border border-[#C4C7C7] rounded-[4px] text-[16px] text-[#0F172A] placeholder-[#444748] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370] transition-all"
              />
            </div>

            {/* Input 2: Company Name */}
            <div>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Company Name"
                className="w-full px-4 py-3 bg-white border border-[#C4C7C7] rounded-[4px] text-[16px] text-[#0F172A] placeholder-[#444748] focus:outline-none focus:border-[#004370] focus:ring-1 focus:ring-[#004370] transition-all"
              />
            </div>

            {/* Section: Your Role */}
            <div className="pt-2">
              <label className="block text-[14px] uppercase tracking-wider text-[#191C1E] mb-3">
                YOUR ROLE
              </label>

              <div className="grid grid-cols-3 gap-3">
                {roles.slice(0, 3).map((role) => {
                  const IconComponent = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex flex-col items-start justify-between p-4 rounded-[4px]  border text-left transition-all cursor-pointer min-h-[76px] ${isSelected
                        ? 'border-[#004370] bg-[#F0F7FF]/70 shadow-[0_2px_10px_rgba(0,67,112,0.1)] ring-1 ring-[#004370]'
                        : 'border-[#C4C7C7] bg-[#F7F9FB] hover:bg-gray-100/80 hover:border-gray-300'
                        }`}
                    >
                      <IconComponent className={`w-5 h-5 ${isSelected ? 'text-[#004370]' : 'text-[#475569]'}`} />
                      <span className={`text-[14px] font-medium ${isSelected ? 'text-[#004370] font-semibold' : 'text-[#334155]'}`}>
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-3 gap-3 mt-3">
                {roles.slice(3).map((role) => {
                  const IconComponent = role.icon;
                  const isSelected = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`flex flex-col items-start justify-between p-4 rounded-[4px] border text-left transition-all cursor-pointer min-h-[76px] ${isSelected
                        ? 'border-[#004370] bg-[#F7F9FB]/70 shadow-[0_2px_10px_rgba(0,67,112,0.1)] ring-1 ring-[#004370]'
                        : 'border-[#C4C7C7] bg-[#F7F9FB] hover:bg-gray-100/80 hover:border-gray-300'
                        }`}
                    >
                      <IconComponent className={`w-5 h-5 ${isSelected ? 'text-[#004370]' : 'text-[#475569]'}`} />
                      <span className={`text-[14px] font-medium ${isSelected ? 'text-[#004370] font-semibold' : 'text-[#334155]'}`}>
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom HorizontalBorder Row */}
            <div className="flex justify-end border-t border-[#ECEEF0] pt-4 mt-6">
              <button
                type="submit"
                className="h-[48px] px-6 bg-[#000000] hover:bg-gray-900 text-white text-[14px] font-semibold shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10),0_4px_6px_-1px_rgba(0,0,0,0.10)] transition-all cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          <span className="w-2.5 h-2.5 bg-[#0F172A] rounded-full transition-all" />
          <span className="w-2 h-2 bg-[#CBD5E1] rounded-full transition-all" />
          <span className="w-2 h-2 bg-[#CBD5E1] rounded-full transition-all" />
        </div>
      </div>

      {/* Popup 1: Connect Google Workspace Modal */}
      <GoogleWorkspaceModal
        isOpen={popupStep === 'google'}
        onClose={() => setPopupStep('website')}
        onContinueWithGoogle={() => {
          console.log('Connecting Google Workspace...');
          setPopupStep('website');
        }}
        onSkip={() => {
          setPopupStep('website');
        }}
      />

      {/* Popup 2: Connect Company Website Modal */}
      <CompanyWebsiteModal
        isOpen={popupStep === 'website'}
        onClose={() => setPopupStep('none')}
        onNext={() => {
          console.log('Company Website analysis done, opening Workspace setup form...');
          setPopupStep('none');
        }}
        onSkip={() => {
          setPopupStep('none');
        }}
      />
    </div>
  );
};

export default Workspace;
