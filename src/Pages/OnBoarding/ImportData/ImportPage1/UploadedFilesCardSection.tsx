import React, { useRef, useState, useEffect, useCallback } from "react";
import { FileText, X, Check, Plus, ChevronUp, ChevronDown } from "lucide-react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(64);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartScrollTop = useRef(0);

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

  // Sync thumb position with scroll
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current || !trackRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
    const trackHeight = trackRef.current.clientHeight;

    if (scrollHeight <= clientHeight) {
      setThumbHeight(trackHeight);
      setThumbTop(0);
      return;
    }

    const calculatedThumbHeight = Math.max(
      (clientHeight / scrollHeight) * trackHeight,
      40
    );
    setThumbHeight(calculatedThumbHeight);

    const maxScroll = scrollHeight - clientHeight;
    const maxThumbTop = trackHeight - calculatedThumbHeight;
    const currentThumbTop = (scrollTop / maxScroll) * maxThumbTop;
    setThumbTop(currentThumbTop);
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [files, handleScroll]);

  const scrollUp = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: -140, behavior: "smooth" });
    }
  };

  const scrollDown = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 140, behavior: "smooth" });
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!trackRef.current || !scrollContainerRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const trackHeight = rect.height;
    const { scrollHeight, clientHeight } = scrollContainerRef.current;
    const maxScroll = scrollHeight - clientHeight;

    const targetScroll = (clickY / trackHeight) * maxScroll;
    scrollContainerRef.current.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  const handleThumbMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    dragStartY.current = e.clientY;
    if (scrollContainerRef.current) {
      dragStartScrollTop.current = scrollContainerRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !trackRef.current || !scrollContainerRef.current) return;
      const deltaY = e.clientY - dragStartY.current;
      const trackHeight = trackRef.current.clientHeight;
      const { scrollHeight, clientHeight } = scrollContainerRef.current;
      const maxScroll = scrollHeight - clientHeight;
      const maxThumbTop = trackHeight - thumbHeight;

      if (maxThumbTop > 0) {
        const scrollDelta = (deltaY / maxThumbTop) * maxScroll;
        scrollContainerRef.current.scrollTop = dragStartScrollTop.current + scrollDelta;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, thumbHeight]);

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

      {/* File Cards Container with Custom Dedicated Scrollbar Rail */}
      <div className="bg-white border border-[#E2E8F0] rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden flex flex-row">
        {/* Scrollable File Cards List */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex-1 p-3.5 sm:p-4 lg:max-h-[180px] xl:max-h-[240px] 2xl:max-h-[300px] overflow-y-auto no-scrollbar space-y-3"
        >
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-3.5 sm:p-4 flex items-center justify-between shadow-2xs transition-all"
            >
              {/* Left: Icon & File Info */}
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#64748B] shrink-0">
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
                ) : file.status === "error" ? (
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[12px] font-medium">
                    <span>Failed</span>
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
                  className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
                  title="Remove file"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Dedicated Scrollbar Rail */}
        <div
          className="w-[30px] shrink-0 select-none flex flex-col items-center justify-between py-3"
          style={{
            backgroundColor: "rgba(249, 250, 251, 0.8)",
            borderLeft: "1px solid #F9FAFB",
          }}
        >
          {/* Top Chevron */}
          <button
            type="button"
            onClick={scrollUp}
            className="text-[#94A3B8] hover:text-[#0F172A] p-0.5 transition-colors cursor-pointer"
            aria-label="Scroll up"
          >
            <ChevronUp size={15} strokeWidth={2.4} />
          </button>

          {/* Scroll Track */}
          <div
            ref={trackRef}
            onClick={handleTrackClick}
            className="relative flex-1 w-full my-1 flex justify-center cursor-pointer"
          >
            {/* Scroll Thumb Pill */}
            <div
              onMouseDown={handleThumbMouseDown}
              className="absolute w-[6px] rounded-full bg-[#94A3B8] hover:bg-[#64748B] transition-colors cursor-grab active:cursor-grabbing"
              style={{
                height: `${thumbHeight}px`,
                transform: `translateY(${thumbTop}px)`,
              }}
            />
          </div>

          {/* Bottom Chevron */}
          <button
            type="button"
            onClick={scrollDown}
            className="text-[#94A3B8] hover:text-[#0F172A] p-0.5 transition-colors cursor-pointer"
            aria-label="Scroll down"
          >
            <ChevronDown size={15} strokeWidth={2.4} />
          </button>
        </div>
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
