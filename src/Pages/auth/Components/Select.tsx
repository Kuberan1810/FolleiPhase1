import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  options?: (SelectOption | string)[];
  value?: string;
  name?: string;
  disabled?: boolean;
  onChange?: (e: { target: { value: string; name?: string } }) => void;
  children?: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  label,
  error,
  containerClassName = '',
  className = '',
  placeholder = 'Select...',
  options = [],
  value = '',
  name,
  disabled = false,
  onChange,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options array
  const parsedOptions: SelectOption[] = React.useMemo(() => {
    if (options && options.length > 0) {
      return options.map((opt) =>
        typeof opt === 'string' ? { value: opt, label: opt } : opt
      );
    }
    // If children options are passed (legacy support)
    const childOpts: SelectOption[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.props) {
        const props = child.props as { value?: unknown; children?: unknown };
        const val = props.value || props.children;
        const lbl = props.children || props.value;
        if (val) childOpts.push({ value: String(val), label: String(lbl) });
      }
    });
    return childOpts;
  }, [options, children]);

  const selectedOption = parsedOptions.find((opt) => opt.value === value);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectOption = (optValue: string) => {
    if (onChange) {
      onChange({ target: { value: optValue, name } });
    }
    setIsOpen(false);
  };

  return (
    <div className={`w-full ${containerClassName}`} ref={containerRef}>
      {label && (
        <label className="block text-xs sm:text-sm font-medium text-[#191C1E] mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {/* Trigger Box */}
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-full p-3.5 pr-10 border rounded-lg text-sm bg-white text-left transition-all duration-200 outline-none flex items-center justify-between cursor-pointer ${isOpen
              ? 'border-black ring-1 ring-black'
              : 'border-[#C4C7C7] hover:border-gray-400'
            } ${!selectedOption ? 'text-[#717378]' : 'text-[#191C1E]'} ${error ? 'border-red-500 ring-1 ring-red-500' : ''
            } ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : ''} ${className}`}
        >
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className="absolute right-3.5 text-[#717378] pointer-events-none flex items-center justify-center transition-transform duration-200">
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-black' : ''}`} />
          </div>
        </button>

        {/* Custom Popover Dropdown Menu */}
        {isOpen && (
          <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 bg-white border border-[#C4C7C7] rounded-lg shadow-lg max-h-60 overflow-y-auto p-1.5 space-y-0.5 animate-in fade-in zoom-in-95 duration-100 onboarding-scroll">
            {parsedOptions.length === 0 ? (
              <div className="px-3.5 py-2.5 text-xs text-[#717378] text-center">
                No options available
              </div>
            ) : (
              parsedOptions.map((opt) => {
                const isSelected = opt.value === value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelectOption(opt.value)}
                    className={`w-full px-3.5 py-2.5 rounded-md text-sm text-left transition-colors flex items-center justify-between cursor-pointer ${isSelected
                        ? 'bg-[#F0F7FF] text-[#004370] font-semibold'
                        : 'text-[#191C1E] hover:bg-[#F2F4F6] hover:text-black'
                      }`}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#004370] shrink-0 ml-2" />}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  );
};

export default Select;
