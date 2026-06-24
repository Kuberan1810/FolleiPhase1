import React, { useState, useRef, useEffect } from "react";
import { X, CloudUpload, FileText, Link2, ChevronLeft } from "lucide-react";

interface UploadConnectDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (data: { type: "file" | "url"; fileName?: string; fileSize?: string; url?: string }) => void;
}

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

const UploadConnectDataModal: React.FC<UploadConnectDataModalProps> = ({
  isOpen,
  onClose,
  onContinue,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [modalUrl, setModalUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "uploaded">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setModalUrl("");
      setSelectedFile(null);
      setUploadState("idle");
      setUploadProgress(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const simulateUpload = (file: File) => {
    setUploadState("uploading");
    setUploadProgress(0);

    const totalDuration = 1500;
    const intervalTime = 50;
    const step = 100 / (totalDuration / intervalTime);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadState("uploaded");
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      simulateUpload(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      simulateUpload(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setUploadState("idle");
    setUploadProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 1;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const handleContinueClick = () => {
    if (uploadState === "uploaded" && selectedFile) {
      onContinue({
        type: "file",
        fileName: selectedFile.name,
        fileSize: formatFileSize(selectedFile.size),
      });
    } else if (modalUrl.trim()) {
      onContinue({
        type: "url",
        url: modalUrl,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-[#EDF3FD] shadow-2xl w-full max-w-[650px] max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 text-left">

        <div className="px-6 pt-6 md:px-8 md:pt-8 pb-0 flex justify-between items-start">
          <div>
            <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
              Upload Or Connect Data
            </h1>
            <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
              Connect your data source to start the enterprise-grade synchronization.
            </p>
          </div>

        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar px-6 pb-6 md:px-8 md:pb-8 pt-4 space-y-3">
          {/* Local Data Assets */}
          <div>
            <span className="text-[24px] font-medium text-[#333333] mb-3 block">
              Local Data Assets
            </span>

            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-[10px] py-10 flex flex-col items-center justify-center gap-2.5 text-center cursor-pointer transition-all duration-200 ${dragActive
                ? "border-[#000000] bg-[#F1F5F9]/70"
                : "border-[#C1C7D1] hover:border-[#3B6997] bg-[#F8FAFC] hover:bg-[#F1F5F9]/40"
                }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
              />
              <div className="p-3 bg-[#F7F9FB] rounded-full text-[#3B6997] shadow-[0px_4px_5px_0px_#00000033]">
                <CloudUpload size={28} />
              </div>
              <div>
                <p className="text-[24px] font-medium text-[#333333]">Upload your files</p>
                <p className="text-[20px] text-[#626262] mt-0.5">
                  Drag and drop files here or click to select files
                </p>
              </div>
              <div className="space-y-0.5 text-[15px] text-[#626262]">
                <p>Supported formats: pdf, doc, docx, txt</p>
                <p>Maximum file size: 10MB</p>
              </div>
            </div>

            {/* Upload Status Card */}
            {selectedFile && (
              <div className="mt-4 pb-5 flex flex-col gap-4 relative">
                <div className="flex items-center gap-4">
                  <div className="w-[52px] h-[52px] bg-[#F7F9FB] rounded-[24px] flex items-center justify-center shrink-0">
                    <div className="w-6 h-8 bg-[#E90000] rounded-[4px] relative flex flex-col items-center justify-center text-white shadow-sm shrink-0">
                      <FileText size={16} strokeWidth={2.5} />
                      <span className="text-[6px] font-extrabold uppercase mt-0.5 tracking-wider">PDF</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[16px] font-medium text-[#4D4D4D] truncate mb-0.5">
                      {selectedFile.name}
                    </p>
                    <div className="flex items-center gap-4 text-[14px] text-[#808080]">
                      <span>{formatFileSize(selectedFile.size)}</span>
                      <span className={uploadState === "uploaded" ? "text-[#626262] flex items-center" : ""}>
                        {uploadState === "uploading" ? "Uploading..." : <> Uploaded</>}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1.5 text-[#000000] rounded-full hover:bg-slate-100 transition-colors cursor-pointer mr-1"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Progress Bar inside flow */}
                {(uploadState === "uploading" || uploadState === "uploaded") && (
                  <div className="w-[360px] h-2 bg-[#D3D3D3] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#004370] rounded-full transition-all duration-150 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* OR Separator */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-[#F3F4F6]"></div>
            <span className="flex-shrink mx-4 text-[#333333] font-medium text-[24px] tracking-widest uppercase">
              OR
            </span>
            <div className="flex-grow border-t border-[#F3F4F6]"></div>
          </div>

          {/* Import from URL link */}
          <div>
            <span className="text-[24px] font-medium text-[#333333] mb-3 block">
              Import from URL link
            </span>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#4D4D4D] ">
                <Link2 size={18} />
              </div>
              <input
                type="text"
                value={modalUrl}
                onChange={(e) => setModalUrl(e.target.value)}
                placeholder="Paste File URL"
                className="w-full pl-10 pr-4 py-3 bg-[#F3F4F6] rounded-[10px] text-[#4D4D4D] focus:outline-none focus:ring-2 focus:ring-[#004370]/10 focus:border-[#004370] transition-all placeholder-[#4D4D4D]"
              />
            </div>
          </div>
        </div>

        <div className="px-6 py-3 md:p-8 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-1 px-4 py-2 border border-[#E2E8F0] hover:bg-slate-50 text-[#464555] rounded-[12px] text-[16px] font-semibold cursor-pointer transition-colors"
          >
            <ChevronLeft size={16} />
            Back
          </button>
          <button
            onClick={handleContinueClick}
            disabled={uploadState !== "uploaded" && !isLink(modalUrl)}
            className="px-6 py-2.5 bg-[#004370] hover:bg-[#003152] disabled:opacity-50 disabled:pointer-events-none text-white rounded-lg text-sm font-semibold cursor-pointer transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadConnectDataModal;
