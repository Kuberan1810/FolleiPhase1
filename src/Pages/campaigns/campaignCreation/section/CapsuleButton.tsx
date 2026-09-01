import React from 'react';

export interface CapsuleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isSelected?: boolean;
  activeColor?: 'brand' | 'teal';
  size?: 'sm' | 'md';
  className?: string;
}

export const CapsuleButton: React.FC<CapsuleButtonProps> = ({
  children,
  isSelected = false,
  activeColor = 'brand',
  size = 'sm',
  className = '',
  disabled = false,
  type = 'button',
  ...props
}) => {
  const sizeClasses = size === 'sm' ? 'px-3 py-1.5 text-[12px]' : 'px-3.5 py-1.5 text-[12.5px]';

  const activeStyles =
    activeColor === 'brand'
      ? 'border-[#7A9601] bg-[#F4F7E6] text-[#7A9601] font-medium'
      : 'border-[#0D9488] bg-[#F0FDFA] text-[#0D9488] font-medium';

  const defaultStyles =
    'border-[#E2E8F0] bg-white text-[#475569] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]';

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center rounded-full border transition-all ${sizeClasses} ${
        disabled
          ? disabledStyles
          : isSelected
          ? activeStyles
          : defaultStyles
      } ${disabled ? '' : 'cursor-pointer active:scale-98'} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CapsuleButton;
