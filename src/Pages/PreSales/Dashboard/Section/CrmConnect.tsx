import React, { useState } from "react";

const CrmConnect: React.FC = () => {
  const [url, setUrl] = useState("https://follei-vercel-eta.vercel.app/pr...");

  return (
    <div className="lg:col-span-3 rounded-[10px] p-5 bg-white border border-[#EDF3FD] shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex flex-col justify-between font-urbanist h-[175px]">
      <div>
        <h3 className="text-[18px] font-bold text-[#191C1E] mb-3.5">CRM Connect</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-[#CAD4E0] rounded-[10px] text-sm text-slate-500 focus:outline-none focus:border-[#014370] transition-colors"
        />
      </div>
      <div>
        <button className="bg-[#EAEFF5] hover:bg-[#DCE4ED] text-[#191C1E] font-bold px-8 py-2 rounded-full text-sm transition-colors cursor-pointer">
          Link
        </button>
      </div>
    </div>
  );
};

export default CrmConnect;
