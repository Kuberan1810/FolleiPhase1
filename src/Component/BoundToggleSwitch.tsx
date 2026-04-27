import React from 'react';

interface BoundToggleSwitchProps {
  isOutbound: boolean;
  onToggle: (type: 'inbound' | 'outbound') => void;
}

const BoundToggleSwitch: React.FC<BoundToggleSwitchProps> = ({ isOutbound, onToggle }) => {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => onToggle('inbound')}
        className={`h-[38px] sm:h-[44px] px-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
          !isOutbound
            ? 'bg-[#014370] text-white hover:bg-[#013254]'
            : 'bg-[#E5ECF1] text-gray-800 border border-gray-200/50 hover:bg-gray-200 shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]'
        }`}
      >
        In Bound
      </button>
      <button
        onClick={() => onToggle('outbound')}
        className={`h-[38px] sm:h-[44px] px-5 rounded-full text-[13px] sm:text-[14px] font-semibold transition-colors cursor-pointer flex items-center justify-center ${
          isOutbound
            ? 'bg-[#014370] text-white hover:bg-[#013254]'
            : 'bg-[#E5ECF1] text-gray-800 border border-gray-200/50 hover:bg-gray-200 shadow-[inset_0_3px_4px_0_rgba(0,0,0,0.25)]'
        }`}
      >
        Out Bound
      </button>
    </div>
  );
};

export default BoundToggleSwitch;
