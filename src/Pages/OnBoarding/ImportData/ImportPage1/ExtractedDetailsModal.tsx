import React from "react";
import { X, Check } from "lucide-react";
import type { ChecklistItem } from "./types";
import { MOCK_PRODUCT_SUBITEMS } from "./types";

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

  const subItems = item.subItems && item.subItems.length > 0
    ? item.subItems
    : MOCK_PRODUCT_SUBITEMS;

  const isNotFound = item.status === "not_found";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="bg-white rounded-[20px] max-w-[360px] w-full p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-full border border-[#E2E8F0] flex items-center justify-center text-[#94A3B8] hover:text-[#0F172A] hover:bg-slate-50 transition-colors absolute top-4 right-4 cursor-pointer"
          aria-label="Close dialog"
        >
          <X size={12} strokeWidth={2.5} />
        </button>

        {/* Header */}
        <div className="pr-8 mb-3">
          <h2 className="text-[16px] sm:text-[18px] font-bold text-[#0F172A] tracking-[-0.01em]">
            {item.name}
          </h2>
          <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
            {isNotFound
              ? "0 items found — this information was not detected in your uploaded files."
              : `${item.resultText || `${subItems.length} items found`} — extracted from your uploaded files.`}
          </p>
        </div>

        {/* Scrollable Sub-items Cards */}
        <div className="max-h-[300px] overflow-y-auto pr-1 space-y-2.5 onboarding-scroll">
          {subItems.map((sub) => {
            const isSubNotFound = sub.status === "not_found" || isNotFound;

            return (
              <div
                key={sub.id}
                className={`border rounded-[12px] p-3 flex items-start gap-3 transition-all ${
                  isSubNotFound
                    ? "border-[#FEE2E2] bg-[#FFF5F5]"
                    : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1]"
                }`}
              >
                {/* Icon */}
                {isSubNotFound ? (
                  <div className="w-4 h-4 rounded-full bg-[#FEE2E2] text-[#DC2626] flex items-center justify-center shrink-0 mt-0.5">
                    <X size={10} strokeWidth={3} />
                  </div>
                ) : (
                  <div className="w-4 h-4 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={10} strokeWidth={3} />
                  </div>
                )}

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-[13px] font-semibold text-[#0F172A]">
                    {sub.title}
                  </h4>
                  <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                    {sub.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExtractedDetailsModal;
