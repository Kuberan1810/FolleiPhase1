import React, { useRef } from "react";
import { FileText, X, Check, Plus } from "lucide-react";
import type { UploadedFile } from "./types";
import { ACCEPTED_EXTENSIONS } from "./types";

interface UploadedFilesCardSectionProps {
  files: UploadedFile[];
  onRemoveFile: (fileId: string) => void;
  onAddFiles: (newFiles: File[]) => void;
}

const UploadedFilesCardSection: React.FC<UploadedFilesCardSectionProps> = ({
  files,
  onRemoveFile,
  onAddFiles,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAddFiles(Array.from(e.target.files));
      e.target.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes || bytes === 0) return "304 KB";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[13px] sm:text-[14px] font-bold text-[#0F172A]">
          Uploaded files
        </h3>
        <span className="text-[12px] text-[#94A3B8] font-normal">
          {files.length} {files.length === 1 ? "file" : "files"}
        </span>
      </div>

      {/* Hidden File Input for Add More */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_EXTENSIONS.join(",")}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* File Cards List */}
      <div className="space-y-3">
        {files.map((file) => (
          <div
            key={file.id}
            className="bg-white border border-[#E2E8F0] rounded-[16px] p-3.5 sm:p-4 flex items-center justify-between shadow-xs transition-all"
          >
            {/* Left: Icon & File Info */}
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#64748B] shrink-0">
                <FileText size={20} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#0F172A] truncate">
                  {file.name}
                </p>
                <p className="text-[12px] text-[#64748B] mt-0.5">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            {/* Right: Status Badge & Delete */}
            <div className="flex items-center gap-3 shrink-0 ml-3">
              {file.status === "analyzing" ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1F5F9] text-[#475569] text-[12px] font-medium">
                  {/* Subtle spinning ring */}
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-[#0284C7]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Analyzing</span>
                </div>
              ) : (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[12px] font-medium">
                  <Check size={14} strokeWidth={2.5} />
                  <span>Analyzed</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => onRemoveFile(file.id)}
                className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                title="Remove file"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add More Files Dashed Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="w-full rounded-[16px] border-2 border-dashed border-[#CBD5E1] bg-white hover:bg-[#FAFCFF] hover:border-[#0284C7] py-3 text-center text-[#0284C7] text-[14px] font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-all mt-3"
      >
        <Plus size={16} strokeWidth={2.5} />
        <span>Add more files</span>
      </button>
    </div>
  );
};

export default UploadedFilesCardSection;
