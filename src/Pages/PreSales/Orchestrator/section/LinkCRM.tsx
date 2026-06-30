import { useState } from "react";
import { LayoutGrid, } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BtnComSecondary from "../../../../Component/BtnComSecondary";

const LinkCRM = () => {
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  return (
    <div className="flex-1 BoxStyle md:p-8! flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <div className="p-1 rounded-lg bg-[#005B9620] flex items-center justify-center shrink-0">
            <LayoutGrid size={20} color='#005B96' className='hidden md:flex' />
            <LayoutGrid size={16} color='#005B96' className='md:hidden flex' />
          </div>
          <h2 className="font-manrope font-bold text-[18px] text-[#191C1E]">Link CRM</h2>
        </div>
        <BtnComSecondary
          label="Connected CRM"
          onClick={() => navigate("/presales/connected-crm")}
        />
      </div>

      {/* Input section */}
      <div className="flex flex-col gap-2">
        <label className="font-inter font-bold text-[12px] font-bold text-[#64748B] uppercase tracking-widest text-[#64748B]">
          Fetch & Import Link
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://external-resource.io/data.crm"
          className="w-full bg-[#F1F5F9] border border-[#E2E8F0] rounded-[10px] px-4 py-3 font-inter font-normal text-[14px] text-[#191C1E] placeholder:text-[#94A3B8] outline-none focus:border-[#005B96] transition-colors"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          className="flex-1 flex items-center justify-center gap-2.5 bg-[#005B96] hover:bg-[#076aac] text-white text-[18px] font-bold py-4 rounded-xl cursor-pointer transition-colors"
        >
          Connect CRM
        </button>
        <button
          onClick={() => navigate("/presales/dashboard", { state: { openAvailableCrm: true } })}
          className="flex-1 flex items-center justify-center gap-2.5 bg-[#005B96] hover:bg-[#076aac] text-white text-[18px] font-bold py-4 rounded-xl cursor-pointer transition-colors"
        >
        Available CRM
        </button>
      </div>
    </div>
  );
};

export default LinkCRM;
