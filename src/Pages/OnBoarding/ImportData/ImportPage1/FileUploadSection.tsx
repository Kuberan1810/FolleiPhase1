import React, { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import type { UploadedFile } from "./types";
import { ACCEPTED_EXTENSIONS } from "./types";

interface FileUploadSectionProps {
  files: UploadedFile[];
  onFilesChange: (files: UploadedFile[]) => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  files,
  onFilesChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
      // reset value so the same file can be re-selected if removed
      e.target.value = "";
    }
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles: UploadedFile[] = newFiles.map((file) => ({
      id: `${file.name}-${file.lastModified}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type || file.name.split(".").pop() || "unknown",
      status: "analyzing",
    }));

    onFilesChange([...files, ...validFiles]);
  };

  const removeFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onFilesChange(files.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="w-full">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_EXTENSIONS.join(",")}
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Dropzone Container */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative w-full rounded-[20px] border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center text-center p-8 sm:p-12 ${
          isDragging
            ? "border-[#0284C7] bg-[#F0F7FF]/80 scale-[1.005]"
            : "border-[#D8E1EC] bg-[#FFFFFF] hover:border-[#CBD5E1] hover:bg-[#FAFCFF]"
        }`}
      >
        {/* Upload Icon Badge */}
        <div className="w-14 h-14 rounded-full bg-[#F0F7FF] flex items-center justify-center text-[#0284C7] mb-4 shadow-xs">
          <UploadCloud size={28} strokeWidth={1.8} className="text-[#0284C7]" />
        </div>

        {/* Text Details */}
        <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#0F172A] tracking-[-0.01em]">
          Drop your files here
        </h3>
        <p className="text-[14px] text-[#64748B] mt-1 mb-5">
          or click to browse from your computer
        </p>

        {/* Choose Files Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="px-6 py-2 rounded-full border border-[#D8E1EC] bg-white hover:bg-slate-50 text-[14px] font-medium text-[#1E293B] shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all cursor-pointer hover:shadow-xs active:scale-[0.98]"
        >
          Choose files
        </button>
      </div>

      {/* Uploaded Files Preview List */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-[12px] font-semibold text-[#64748B] uppercase tracking-wider pl-1">
            Uploaded Files ({files.length})
          </p>
          <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 onboarding-scroll">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2.5 px-3.5 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#CBD5E1] transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#F0F7FF] text-[#0284C7] flex items-center justify-center shrink-0">
                    <FileText size={18} strokeWidth={2} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-[#1E293B] truncate">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-[#64748B]">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => removeFile(file.id, e)}
                  className="p-1 text-[#94A3B8] hover:text-[#EF4444] rounded-md hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;
