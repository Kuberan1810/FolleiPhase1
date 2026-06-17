import React, { useState } from "react";

const DataImport: React.FC = () => {
  const [filePath, setFilePath] = useState("");

  return (
    <div className="col-span-1 md:col-span-6 lg:col-span-3 BoxStyle !bg-black !border-black text-white flex flex-col justify-between h-[175px]">
      <div>
        <h3 className="text-[18px] font-bold text-white mb-3.5">Data Import</h3>
        <input
          type="text"
          readOnly
          placeholder="Internal storage/ downloads/ leads/ A team..."
          className="w-full px-4 py-2 bg-transparent border border-neutral-700 rounded-[10px] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
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
          Upload
        </button>
      </div>
    </div>
  );
};

export default DataImport;
