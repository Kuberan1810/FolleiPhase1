import React, { useState } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { Input } from '../../Components/Input';
import { Checkbox } from '../../signIn/Section/Checkbox';

const GoogleIcon: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

interface SignUpFormProps {
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
    companyName: string;
    workEmail: string;
    password: string;
  }) => void;
  onGoogleSignUp?: () => void;
  isLoading?: boolean;
  apiError?: string | null;
  onClearApiError?: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onGoogleSignUp,
  isLoading = false,
  apiError,
  onClearApiError,
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    companyName?: string;
    workEmail?: string;
    password?: string;
    agreedToTerms?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!workEmail.trim()) {
      newErrors.workEmail = 'Work Email is required';
    } else if (!/\S+@\S+\.\S+/.test(workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address';
    } else {
      const domain = workEmail.trim().toLowerCase().split('@')[1] || '';
      const personalDomains = ['gmail.com', 'googlemail.com', 'yahoo.com', 'yahoo.co.in', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com', 'protonmail.com', 'live.com'];
      if (personalDomains.includes(domain)) {
        newErrors.workEmail = 'Please enter a valid company email';
      }
    }
    if (!password) newErrors.password = 'Password is required';
    if (!agreedToTerms) newErrors.agreedToTerms = 'You must agree to the Terms of Service';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (onSubmit) {
      onSubmit({ firstName, lastName, companyName, workEmail, password });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#C4C7C7]/30 p-8 sm:p-8 w-full">
      {/* Inline API / Server Error Alert */}
      {apiError && (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50/90 p-3.5 text-xs text-red-800 transition-all duration-200">
          <AlertCircle className="size-4 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1 leading-relaxed font-medium">{apiError}</div>
          {onClearApiError && (
            <button
              type="button"
              onClick={onClearApiError}
              className="text-red-400 hover:text-red-700 transition-colors cursor-pointer focus:outline-none p-0.5"
              aria-label="Dismiss error"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields Row */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
              if (onClearApiError) onClearApiError();
            }}
            error={errors.firstName}
            required
          />
          <Input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: undefined }));
              if (onClearApiError) onClearApiError();
            }}
            error={errors.lastName}
            required
          />
        </div>

        {/* Company Name Field */}
        <Input
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            if (errors.companyName) setErrors((prev) => ({ ...prev, companyName: undefined }));
            if (onClearApiError) onClearApiError();
          }}
          error={errors.companyName}
          required
        />

        {/* Work Email Field */}
        <Input
          type="email"
          placeholder="Work Email"
          value={workEmail}
          onChange={(e) => {
            setWorkEmail(e.target.value);
            if (errors.workEmail) setErrors((prev) => ({ ...prev, workEmail: undefined }));
            if (onClearApiError) onClearApiError();
          }}
          error={errors.workEmail}
          required
        />

        {/* Password Field */}
        <div>
          <Input
            isPassword
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
              if (onClearApiError) onClearApiError();
            }}
            error={errors.password}
            required
          />
        </div>

        {/* Terms of Service & Privacy Policy Agreement Checkbox */}
        <div className="pt-2 pb-1">
          <Checkbox
            id="agree-terms"
            checked={agreedToTerms}
            onChange={(checked) => {
              setAgreedToTerms(checked);
              if (errors.agreedToTerms) {
                setErrors((prev) => ({ ...prev, agreedToTerms: undefined }));
              }
              if (onClearApiError) onClearApiError();
            }}
            label={
              <span className="text-xs text-[#444748] font-normal leading-relaxed">
                I agree to the{' '}
                <a
                  href="#"
                  className="font-semibold text-[#191C1E] hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Terms of Service
                </a>{' '}
                and{' '}
                <a
                  href="#"
                  className="font-semibold text-[#191C1E] hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </a>
                .
              </span>
            }
          />
          {errors.agreedToTerms && (
            <p className="mt-1 text-xs text-red-500">{errors.agreedToTerms}</p>
          )}
        </div>

        {/* Continue Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#7A9601] hover:bg-[#87a404] active:bg-[#add10b] text-white font-medium py-3.5 px-4 text-sm transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rounded-lg"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Continue'
          )}
        </button>

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E6E6E4]"></div>
          </div>
          <span className="relative bg-white px-3 text-sm text-[#444748] font-normal">
            or
          </span>
        </div>

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={onGoogleSignUp}
          className="flex items-center justify-center gap-2 border border-[#C4C7C7] rounded-lg px-4 py-3 w-full text-sm text-[#444748] bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none cursor-pointer"
        >
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;

