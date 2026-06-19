import React from "react";

const CrmConnect: React.FC = () => {
  return (
    <div className="col-span-12 lg:col-span-7 BoxStyle flex flex-col justify-between">
      <h3 className="text-[20px] font-bold text-[#000000] mb-3.5 leading-[1.2] tracking-[0.6px]">CRM Connect</h3>
      <div className="flex items-center gap-[15px] w-full">
        <input
          type="text"
          readOnly
          value="https://follei-vercel-eta.vercel.app/presales/data-import"
          className="flex-1 px-4 py-2 bg-white border border-[#CAD4E0] rounded-[10px] text-sm text-slate-800 focus:outline-none focus:border-[#014370] transition-colors"
        />
        <button
          className="text-[#000000] font-bold text-sm transition-colors cursor-pointer flex items-center justify-center rounded-[218px] shrink-0"
          style={{
            width: '91px',
            height: '34px',
            backgroundColor: '#E5ECF1',
            boxShadow: 'inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25)'
          }}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default CrmConnect;
