import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
  id?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  className = '',
  id,
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer select-none text-[#444748] hover:text-[#191C1E] transition-colors text-xs font-normal ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only peer"
        />
        <div className="w-4 h-4 rounded border border-[#C4C7C7] bg-white peer-checked:bg-black peer-checked:border-black transition-all duration-150 flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-black/20">
          <svg
            className={`w-2.5 h-2.5 text-white transition-all duration-150 ${
              checked ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <span>{label}</span>
    </label>
  );
};

export default Checkbox;
