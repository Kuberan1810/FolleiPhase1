
import React, { useState } from 'react';
import { Input } from '../../Components/Input';
import { Checkbox } from './Checkbox';

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
            className="text-[#444748] hover:text-[#16171A] transition-colors cursor-pointer focus:outline-none"
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
            <div className="w-full border-t border-[#E6E6E4]"></div>
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
          <GoogleIcon />
          <span>Continue with Google</span>
        </button>
      </form>
    </div>
  );
};

export default SignInForm;

