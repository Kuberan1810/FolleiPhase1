import React, { useState } from "react";

const DataImport: React.FC = () => {
  const [filePath, setFilePath] = useState("Internal storage/ downloads/ leads/ A team...");

  return (
    <div className="lg:col-span-3 rounded-[10px] p-5 bg-black border border-black shadow-[0_1px_2px_rgba(0,0,0,0.15)] flex flex-col justify-between font-urbanist text-white h-[175px]">
      <div>
        <h3 className="text-[18px] font-bold text-white mb-3.5">Data Import</h3>
        <input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          className="w-full px-4 py-2 bg-transparent border border-neutral-700 rounded-[10px] text-sm text-neutral-400 focus:outline-none focus:border-white transition-colors"
        />
      </div>
      <div>
        <button className="bg-white hover:bg-neutral-200 text-black font-bold px-8 py-2 rounded-full text-sm transition-colors cursor-pointer">
          Upload
        </button>
      </div>
    </div>
  );
};

export default DataImport;
