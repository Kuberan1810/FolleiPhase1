import React from 'react';
import { Sms, UserSquare, Calendar, GoogleDrive, Lock1, type IconProps } from 'iconsax-react';
import Google from '../../../assets/auth/google-logo.svg';

interface FeatureItemProps {
  icon: React.ComponentType<IconProps>;
  title: string;
  description: string;
  isLast?: boolean;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon: Icon,
  title,
  description,
  isLast = false,
}) => (
  <div
    className={`flex items-start gap-3.5 px-4.5 py-3.5 ${!isLast ? 'border-b border-[#E4E4E7]/70' : ''
      }`}
  >
    <Icon size={22} color="#333" className="mt-0.5 shrink-0" />
    <div>
      <h4 className="text-sm font-semibold text-[#191C1E]">{title}</h4>
      <p className="text-xs text-[#52525B] mt-0.5 leading-normal">{description}</p>
    </div>
  </div>
);

interface GoogleWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinueWithGoogle?: () => void;
  onSkip?: () => void;
}

export const GoogleWorkspaceModal: React.FC<GoogleWorkspaceModalProps> = ({
  isOpen,
  onClose,
  onContinueWithGoogle,
  onSkip,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="relative w-full max-w-[520px] bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-gray-100 flex flex-col items-center animate-in zoom-in-95 duration-200">

        {/* Top Google Icon Badge */}
        <div className="rounded-xl bg-[#F2F4F6] p-4 border border-[#C4C7C7] flex items-center justify-center shadow-xs">
          <img src={Google} alt="Google" className="w-7 h-7" />
        </div>

        {/* Title & Subtitle */}
        <p className="text-sm text-[#444748] text-center mt-2 px-1 leading-relaxed max-w-sm">
          Connect your business Google account to securely sync the information Follei needs to power your sales workspace.
        </p>

        {/* Features List Box with custom borders & padding */}
        <div className="w-full bg-[#F4F4F5] rounded-xl overflow-hidden border border-[#E4E4E7]/50 mt-5">
          <FeatureItem
            icon={Sms}
            title="Gmail"
            description="Access your business email conversations"
          />
          <FeatureItem
            icon={UserSquare}
            title="Google Contacts"
            description="Sync contacts and customer information"
          />
          <FeatureItem
            icon={Calendar}
            title="Google Calendar"
            description="Manage meetings and follow-ups"
          />
          <FeatureItem
            icon={GoogleDrive}
            title="Google Drive"
            description="Store and access relevant sales files"
            isLast
          />
        </div>

        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={onContinueWithGoogle}
          className="w-full bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-medium py-3 px-4  text-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 mt-5 "
        >
          <div className='p-0.5 bg-white rounded-full'>
            <img src={Google} alt="Google" className="w-5 h-5" />
          </div>
          <span>Continue with Google</span>
        </button>

        {/* Permission Disclaimer */}
        <p className="text-[12px] text-[#444748]/90 text-center mt-4">
          We'll ask for permission before connecting your account.
        </p>

        {/* Skip Link */}
        <button
          type="button"
          onClick={onSkip || onClose}
          className="text-sm text-[#444748] hover:text-black font-medium text-center mt-3 cursor-pointer transition-colors"
        >
          Skip for now
        </button>

        {/* Security Disclaimer Footer */}
        <div className="w-full border-t border-gray-100 mt-5 pt-4 flex items-start gap-2">
          <Lock1 size={16} color="#444748" className="shrink-0 mt-0.5" />
          <p className="text-[13px] text-[#444748] leading-relaxed">
            Your data stays secure. Follei only accesses the permissions required to provide CRM and AI-powered sales features.{' '}
            <a href="#" className="font-semibold text-[#191C1E] hover:underline">
              Learn more
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleWorkspaceModal;
