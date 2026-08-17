import React, { useState } from 'react';
import { Input } from '../../Components/Input';
import { Checkbox } from '../../signIn/Section/Checkbox';

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
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onGoogleSignUp,
  isLoading = false,
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
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Fields Row */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <Input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: undefined }));
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
          className="w-full bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-medium py-3.5 px-4 text-sm transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center rounded-lg"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Continue'
          )}
        </button>

        {onGoogleSignUp && null}
      </form>
    </div>
  );
};

export default SignUpForm;
