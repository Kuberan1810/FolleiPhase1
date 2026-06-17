import React, { useState } from "react";

const CrmConnect: React.FC = () => {
  const [url, setUrl] = useState("");

  return (
    <div className="col-span-1 md:col-span-6 lg:col-span-3 BoxStyle flex flex-col justify-between h-[175px]">
      <div>
        <h3 className="text-[18px] font-bold text-[#191C1E] mb-3.5">CRM Connect</h3>
        <input
          type="text"
          readOnly
          placeholder="https://follei-vercel-eta.vercel.app/pr..."
          className="w-full px-4 py-2 bg-white border border-[#CAD4E0] rounded-[10px] text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#014370] transition-colors"
        />
      </div>
      <div>
        <button
          className="text-[#000000] font-bold text-sm transition-colors cursor-pointer flex items-center justify-center rounded-[218px]"
          style={{
            width: '91px',
            height: '34px',
            backgroundColor: '#E5ECF1',
            boxShadow: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          Link
        </button>
      </div>
    </div>
  );
};

export default CrmConnect;
