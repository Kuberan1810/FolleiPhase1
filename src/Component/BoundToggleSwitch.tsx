import React from 'react';

interface BoundToggleSwitchProps {
  salesMode: 'presales' | 'postsales';
  onToggle: (mode: 'presales' | 'postsales') => void;
}

const BoundToggleSwitch: React.FC<BoundToggleSwitchProps> = ({ salesMode, onToggle }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onToggle('presales')}
        className={`h-[38px] sm:h-[44px] px-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
          salesMode === 'presales'
            ? 'bg-[#014370] text-white hover:bg-[#013254]'
            : 'bg-[#E5ECF1] text-gray-800 border border-gray-200/50 hover:bg-gray-200 shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]'
        }`}
      >
        Pre sales
      </button>
      <button
        onClick={() => onToggle('postsales')}
        className={`h-[38px] sm:h-[44px] px-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
          salesMode === 'postsales'
            ? 'bg-[#014370] text-white hover:bg-[#013254]'
            : 'bg-[#E5ECF1] text-gray-800 border border-gray-200/50 hover:bg-gray-200 shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]'
        }`}
      >
        Post sales
      </button>
    </div>
  );
};

export default BoundToggleSwitch;
