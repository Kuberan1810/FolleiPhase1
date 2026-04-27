import React from 'react';
import { useSalesContext } from '../Context/SalesContext';

const SalesToggleSwitch: React.FC = () => {
  const { salesMode, setSalesMode } = useSalesContext();

  const baseClass =
    "flex-1 sm:flex-none sm:w-[155px] h-[52px] sm:h-[62px] rounded-[10px] text-[14px] font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center px-4 border border-gray-200/50";

  const activeClass = "bg-[#014370] text-white hover:bg-[#013254]";

  // ✅ Same OFF style for BOTH buttons
  const inactiveClass =
    "bg-[#E5ECF1] text-black hover:bg-gray-200 shadow-inner";

  return (
    <div className="flex gap-3 sm:gap-4">

      {/* Pre Sales */}
      <button
        onClick={() => {
          if (salesMode !== 'presales') {
            setSalesMode('presales');
          }
        }}
        className={`${baseClass} ${salesMode === 'presales' ? activeClass : inactiveClass
          }`}
      >
        Pre Sales
      </button>

      {/* Post Sales */}
      <button
        onClick={() => {
          if (salesMode !== 'postsales') {
            setSalesMode('postsales');
          }
        }}
        className={`${baseClass} ${salesMode === 'postsales' ? activeClass : inactiveClass
          }`}
      >
        Post Sales
      </button>

    </div>
  );
};

export default SalesToggleSwitch;