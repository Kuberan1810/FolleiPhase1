import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ 
  options, 
  value, 
  onChange, 
  placeholder = "Select an option",
  icon 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-[48px] pl-11 pr-11 rounded-[10px] border ${isOpen ? 'border-[#004370] ring-1 ring-[#004370]/20' : 'border-[#E2E8F0]'} text-[15px] flex items-center bg-transparent cursor-pointer transition-all`}
      >
        {icon && (
          <div className="absolute left-4 text-[#94A3B8]">
            {icon}
          </div>
        )}
        
        <span className={`truncate ${selectedOption ? 'text-[#1E293B]' : 'text-[#94A3B8]'}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        
        <div className={`absolute right-4 text-[#94A3B8] transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <ChevronDown size={18} strokeWidth={2} />
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1.5 bg-white border border-[#E2E8F0] rounded-[10px] shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-[220px] overflow-y-auto onboarding-scroll">
            {options.map((opt) => {
              const isSelected = value === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-4 py-2.5 mx-1.5 rounded-[8px] cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-[#F0F7FF] text-[#004370]' 
                      : 'text-[#334155] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className={`text-[14px] ${isSelected ? 'font-semibold' : 'font-medium'}`}>
                    {opt.label}
                  </span>
                  {isSelected && (
                    <Check size={16} strokeWidth={2.5} className="text-[#004370]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
