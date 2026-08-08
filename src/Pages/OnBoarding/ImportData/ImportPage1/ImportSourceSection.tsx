import React from "react";
import { Database, FileSpreadsheet, Globe } from "lucide-react";

interface ImportSourceSectionProps {
  onSelectSource?: (sourceId: string) => void;
  onUploadCsvClick?: () => void;
}

// Clean inline Google Drive Triangle icon
const GoogleDriveIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 16,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 3.5h6l6 10.5h-6z" fill="none" />
    <path d="M3 14l3-5.5 6 10.5H6z" fill="none" />
    <path d="M15 14h6l-3 5.5H6z" fill="none" />
  </svg>
);

const ImportSourceSection: React.FC<ImportSourceSectionProps> = ({
  onSelectSource,
  onUploadCsvClick,
}) => {
  const sources = [
    {
      id: "google_drive",
      label: "Google Drive",
      icon: <GoogleDriveIcon size={16} className="text-[#475569]" />,
      action: () => onSelectSource?.("google_drive"),
    },
    {
      id: "crm",
      label: "CRM",
      icon: <Database size={16} strokeWidth={1.8} className="text-[#475569]" />,
      action: () => onSelectSource?.("crm"),
    },
    {
      id: "upload_csv",
      label: "Upload CSV",
      icon: <FileSpreadsheet size={16} strokeWidth={1.8} className="text-[#475569]" />,
      action: () => (onUploadCsvClick ? onUploadCsvClick() : onSelectSource?.("upload_csv")),
    },
    {
      id: "connect_website",
      label: "Connect Website",
      icon: <Globe size={16} strokeWidth={1.8} className="text-[#475569]" />,
      action: () => onSelectSource?.("connect_website"),
    },
  ];

  return (
    <div className="mt-8">
      <p className="text-[12px] sm:text-[13px] text-[#64748B] mb-3 font-normal">
        Or import from
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {sources.map((src) => (
          <button
            key={src.id}
            type="button"
            onClick={src.action}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-[13px] font-medium text-[#1E293B] shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:border-[#CBD5E1] transition-all cursor-pointer active:scale-[0.98] whitespace-nowrap"
          >
            {src.icon}
            <span>{src.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImportSourceSection;
