import React from "react";
import { X } from "lucide-react";
import type { ChecklistItem } from "./types";
import { CategorySummaryList } from "./CategorySummaryList";

interface ExtractedDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ChecklistItem | null;
}

const ExtractedDetailsModal: React.FC<ExtractedDetailsModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen || !item) return null;

  const isNotFound = item.status === "not_found";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-[#F8FAFC] rounded-[24px] max-w-[640px] w-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header - Fixed */}
        <div className="bg-white px-6 sm:px-7 py-6 border-b border-gray-200 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-50 transition-colors absolute top-6 right-6 cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
          
          <div className="pr-10">
            <h2 className="text-[22px] sm:text-[24px] font-bold text-[#0F172A] tracking-[-0.01em]">
              Review: {item.name}
            </h2>
            <p className="text-[13px] text-[#64748B] mt-1">
              {isNotFound
                ? "This information was not detected in your uploaded files."
                : `${item.resultText || `Facts found`} — extracted from your data sources.`}
            </p>
          </div>
        </div>

        {/* Scrollable List Container */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-7 onboarding-scroll">
          {!isNotFound ? (
            <CategorySummaryList categoryKey={item.id} />
          ) : (
            <div className="text-center py-12 text-gray-500 text-sm">
              No facts could be extracted for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExtractedDetailsModal;
