import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Globe, TrendingUp, Megaphone, MoreHorizontal } from 'lucide-react';
import { Input } from '../auth/Components/Input';
import { onboardingApi } from '../../api/onboarding/onboardingApi';
import toast from 'react-hot-toast';

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
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('founder');
  const [customRole, setCustomRole] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName) {
      toast.error('Please enter your full name');
      return;
    }

    const job_title = selectedRole === 'other' ? customRole : roles.find(r => r.id === selectedRole)?.label;

    if (!job_title) {
      toast.error('Please select or specify your role');
      return;
    }

    setIsSubmitting(true);
    try {
      await onboardingApi.updateUserProfile({
        full_name: fullName,
        mobile_number: mobileNumber || undefined,
        job_title: job_title,
        terms_accepted: true,
      });
      // Navigate to next onboarding step
      navigate('/onboarding/company-details');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : 'Failed to update profile');
    } finally {
      setIsSubmitting(false);
    }
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
            Tell us a bit about yourself to customize your experience.
          </p>
        </div>

        {/* Card Box */}
        <div className="w-full bg-white rounded-[8px] border border-[#E2E8F0]/50 shadow-[0_4px_6px_-4px_rgba(236,238,240,0.5),0_10px_15px_-3px_rgba(236,238,240,0.5)] p-10">
          <form onSubmit={handleContinue} className="space-y-4">
            {/* Input 1: Full Name */}
            <Input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
            />

            {/* Input 2: Mobile Number */}
            <Input
              type="text"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Mobile Number (Optional)"
            />

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

              {selectedRole === 'other' && (
                <div className="mt-3">
                  <Input
                    type="text"
                    value={customRole}
                    onChange={(e) => setCustomRole(e.target.value)}
                    placeholder="Specify your role"
                  />
                </div>
              )}
            </div>

            {/* Bottom HorizontalBorder Row */}
            <div className="flex justify-end border-t border-[#ECEEF0] pt-4 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-[48px] px-6 bg-[#000000] hover:bg-gray-900 text-white text-[14px] font-semibold shadow-[0_2px_4px_-2px_rgba(0,0,0,0.10),0_4px_6px_-1px_rgba(0,0,0,0.10)] transition-all cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Saving...' : 'Continue'}</span>
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

    </div>
  );
};

export default Workspace;
