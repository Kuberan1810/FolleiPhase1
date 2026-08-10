
import React, { useState } from 'react';
import { Input } from '../../Components/Input';
import { Checkbox } from './Checkbox';
import Google from "../../../../assets/auth/google-logo.svg"
interface SignInFormProps {
  onSubmit?: (data: { email: string; password: string; rememberMe: boolean }) => void;
  onGoogleSignIn?: () => void;
  onForgotPassword?: () => void;
  isLoading?: boolean;
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  onGoogleSignIn,
  onForgotPassword,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    if (onSubmit) {
      onSubmit({ email, password, rememberMe });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-[#C4C7C7]/30  p-8 sm:p-8 w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email Input */}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          required
        />

        {/* Password Input */}
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

        {/* Options Row: Remember Me & Forgot Password */}
        <div className="flex items-center justify-between pt-1 pb-2 text-xs font-normal text-gray-500">
          <Checkbox
            label="Remember Me"
            checked={rememberMe}
            onChange={setRememberMe}
          />

          <button
            type="button"
            onClick={onForgotPassword}
            className="text-[#444748] hover:text-gray-900 transition-colors cursor-pointer focus:outline-none"
          >
            Forgot Password?!
          </button>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-black hover:bg-gray-900 active:bg-gray-800 text-white font-medium py-3.5 px-4  text-sm transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={onGoogleSignIn}
          disabled={isLoading}
          className="flex items-center justify-center gap-2 border border-[#C4C7C7] rounded-lg px-4 py-3 w-full text-sm text-[#444748] bg-white hover:bg-gray-50 transition-colors duration-200 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <img src={Google} alt="Google" className="w-5 h-5" />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
