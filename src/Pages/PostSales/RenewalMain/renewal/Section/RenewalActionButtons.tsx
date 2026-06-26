
import { Download, Plus } from 'lucide-react';

export default function RenewalActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-end gap-3 mb-4">
      <button className="w-full sm:w-auto justify-center bg-[#004370] text-white font-bold text-[13px] leading-4 rounded-lg px-4 py-2.5 flex items-center gap-2 cursor-pointer border-none hover:bg-[#003258] transition-colors duration-200">
        <Download className="w-[13px] h-[13px]" />
        Export
      </button> 
    </div>
  );
}
