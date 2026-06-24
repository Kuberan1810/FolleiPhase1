import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadConnectDataModal from "./UploadConnectDataModal";
import DataValidationModal from "./DataValidationModal";

const isLink = (val: string) => {
  if (!val) return false;
  const trimmed = val.trim();
  return (
    /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(trimmed) ||
    trimmed.startsWith("www.") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  );
};

const DataImport: React.FC = () => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState("Internal storage/ downloads/ leads/ A team");
  const [activeModal, setActiveModal] = useState<"none" | "upload" | "validation">("none");
  const [selectedData, setSelectedData] = useState<{ fileName?: string; size?: string; url?: string } | null>(null);

  // Connect or Import
  const buttonLabel = isLink(inputValue) ? "Connect" : "Import";

  const handleActionClick = () => {
    if (isLink(inputValue)) {
      setSelectedData({ url: inputValue });
      setActiveModal("validation");
    } else {
      setActiveModal("upload");
    }
  };

  const handleUploadContinue = (data: { type: "file" | "url"; fileName?: string; fileSize?: string; url?: string }) => {
    setSelectedData({
      fileName: data.fileName,
      size: data.fileSize,
      url: data.url,
    });
    setActiveModal("validation");
  };

  const handleSuccessContinue = (action: "view_leads" | "dashboard") => {
    setActiveModal("none");
    if (action === "view_leads") {
      navigate("/presales/leads");
    }
  };

  return (
    <>
      <div className="col-span-12 lg:col-span-5 BoxStyle bg-[#3B6997]! border-[#3B6997]! text-white flex flex-col justify-between">
        <h3 className="text-[20px] font-bold text-white mb-3.5 leading-[1.2] tracking-[0.6px]">
          Data Import
        </h3>
        <div className="flex items-center gap-[15px] w-full">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Paste File URL or directory path..."
            className="flex-1 px-4 py-2 bg-transparent border border-white/40 rounded-[10px] text-sm text-white placeholder-white/60 focus:outline-none focus:border-white transition-colors"
          />
          <button
            onClick={handleActionClick}
            className="text-[#000000] font-bold text-sm transition-colors cursor-pointer flex items-center justify-center rounded-[218px] shrink-0 font-urbanist"
            style={{
              width: "91px",
              height: "34px",
              backgroundColor: "#E5ECF1",
              boxShadow: "inset 0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            {buttonLabel}
          </button>
        </div>
      </div>

      {/* Step 1: Upload or Connect Modal */}
      <UploadConnectDataModal
        isOpen={activeModal === "upload"}
        onClose={() => setActiveModal("none")}
        onContinue={handleUploadContinue}
      />

      {/* Step 2: Data Validation Modal */}
      <DataValidationModal
        isOpen={activeModal === "validation"}
        onClose={() => setActiveModal("none")}
        onBack={() => setActiveModal("upload")}
        onSuccessContinue={handleSuccessContinue}
        sourceName={selectedData?.fileName || selectedData?.url || ""}
      />
    </>
  );
};

export default DataImport;
