import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  isPassword?: boolean;
  leftIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  isPassword = false,
  leftIcon,
  type = 'text',
  containerClassName = '',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-[#191C1E] mb-2">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 text-gray-400 pointer-events-none flex items-center justify-center">
            {leftIcon}
          </div>
        )}
        <input
          type={inputType}
          className={`w-full p-3.5 border border-[#C4C7C7] rounded-lg text-sm text-[#191C1E] placeholder:text-gray-400 bg-white selection:bg-gray-200 selection:text-gray-900 transition-all duration-200 outline-none focus:border-black  focus:ring-black ${
            leftIcon ? 'pl-10' : ''
          } ${
            isPassword ? 'pr-11' : ''
          } ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''} ${className}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3.5 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default Input;
