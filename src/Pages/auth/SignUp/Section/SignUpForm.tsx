import React, { useState } from 'react';
import { Input } from '../../Components/Input';
import Google from '../../../../assets/auth/google-logo.svg';

interface SignUpFormProps {
  onSubmit?: (data: {
    firstName: string;
    lastName: string;
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
  const [workEmail, setWorkEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    workEmail?: string;
    password?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};

    if (!firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!workEmail.trim()) {
      newErrors.workEmail = 'Work Email is required';
    } else if (!/\S+@\S+\.\S+/.test(workEmail)) {
      newErrors.workEmail = 'Please enter a valid email address';
    }
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (onSubmit) {
      onSubmit({ firstName, lastName, workEmail, password });
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

        {/* Terms of Service & Privacy Policy Agreement */}
        <div className="text-center pt-2 pb-1">
          <p className="text-xs text-[#444748] font-normal leading-relaxed">
            I agree to the{' '}
            <a href="#" className="font-semibold text-[#191C1E] hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="font-semibold text-[#191C1E] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
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

        {/* Divider */}
        <div className="relative my-6 flex items-center justify-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200/80"></div>
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
          <img src={Google} alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
