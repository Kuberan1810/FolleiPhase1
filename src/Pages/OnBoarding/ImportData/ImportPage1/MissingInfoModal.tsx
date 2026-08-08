import React from "react";
import { AlertTriangle } from "lucide-react";

export interface MissingCategoryItem {
  id: string;
  name: string;
  category: string;
}

interface MissingInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadMore: () => void;
  onContinueAnyway: () => void;
  missingCount?: number;
  totalCount?: number;
  missingItems?: MissingCategoryItem[];
}

const DEFAULT_MISSING_ITEMS: MissingCategoryItem[] = [
  {
    id: "comm_prefs",
    name: "Communication Preferences",
    category: "Customers",
  },
  {
    id: "followup",
    name: "Follow-up Patterns",
    category: "Operations",
  },
];

const MissingInfoModal: React.FC<MissingInfoModalProps> = ({
  isOpen,
  onClose,
  onUploadMore,
  onContinueAnyway,
  missingCount = 2,
  totalCount = 25,
  missingItems = DEFAULT_MISSING_ITEMS,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div
        className="bg-white rounded-[24px] max-w-[500px] w-full p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Alert Icon */}
        <div className="flex items-center gap-2.5 text-[#EF4444]">
          <AlertTriangle size={22} className="shrink-0" />
          <h2 className="text-[20px] sm:text-[21px] font-bold text-[#0F172A] tracking-[-0.01em]">
            Some information is missing
          </h2>
        </div>

        <p className="text-[13px] text-[#64748B] mt-2.5 leading-relaxed">
          Follei couldn't find {missingCount} of {totalCount} categories in your files. You can continue now and add these later, or upload more files for a better business context.
        </p>

        {/* Missing Items List Container */}
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-[16px] p-4 space-y-3 mt-4 mb-6">
          {missingItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between text-[13px]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-[#94A3B8] font-bold text-[16px] leading-none shrink-0">
                  —
                </span>
                <span className="font-medium text-[#0F172A] truncate">
                  {item.name}
                </span>
              </div>
              <span className="text-[12px] text-[#64748B] shrink-0 ml-3">
                {item.category}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onUploadMore}
            className="px-5 py-2.5 rounded-none border border-[#CBD5E1] bg-white hover:bg-slate-50 text-[14px] font-medium text-[#1E293B] cursor-pointer shadow-xs transition-all active:scale-[0.98]"
          >
            Upload more files
          </button>

          <button
            type="button"
            onClick={onContinueAnyway}
            className="px-6 py-2.5 rounded-none bg-black hover:bg-[#1A1A1A] text-[14px] font-medium text-white cursor-pointer shadow-xs transition-all active:scale-[0.98]"
          >
            Continue anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissingInfoModal;
