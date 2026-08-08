import React from "react";
import { SUPPORTED_FORMATS, MAX_FILE_SIZE_TEXT } from "./types";

interface FileFormatSectionProps {
  supportedFormats?: string;
  maxFileSize?: string;
}

const FileFormatSection: React.FC<FileFormatSectionProps> = ({
  supportedFormats = SUPPORTED_FORMATS,
  maxFileSize = MAX_FILE_SIZE_TEXT,
}) => {
  return (
    <div className="mt-6 flex flex-wrap items-center justify-between gap-4 py-1">
      <div>
        <span className="text-[12px] sm:text-[13px] text-[#64748B] block">
          Supported formats
        </span>
        <span className="text-[13px] sm:text-[14px] font-semibold text-[#0F172A] mt-0.5 block">
          {supportedFormats}
        </span>
      </div>

      <div>
        <span className="text-[12px] sm:text-[13px] text-[#64748B] block">
          Maximum file size
        </span>
        <span className="text-[13px] sm:text-[14px] font-semibold text-[#0F172A] mt-0.5 block">
          {maxFileSize}
        </span>
      </div>
    </div>
  );
};

export default FileFormatSection;
