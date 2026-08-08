import React from "react";
import { Sparkles, Check } from "lucide-react";

interface KnowledgeExtractedSectionProps {
  categoriesCount?: number;
  insightsCount?: number;
  productsServicesCount?: number;
  customerSegmentsCount?: number;
}

const KnowledgeExtractedSection: React.FC<KnowledgeExtractedSectionProps> = ({
  categoriesCount = 24,
  insightsCount = 186,
  productsServicesCount = 42,
  customerSegmentsCount = 18,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 sm:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.03)] mb-6 transition-all duration-300">
      {/* Title with Sparkle Icon */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={18} className="text-[#3B82F6] fill-[#3B82F6]" />
        <h3 className="text-[16px] font-bold text-[#0F172A] tracking-[-0.01em]">
          Business Knowledge Extracted
        </h3>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2 text-center border-y border-[#F1F5F9] my-3">
        <div className="py-2">
          <span className="text-[26px] sm:text-[30px] font-bold text-[#0F172A] leading-tight block">
            {categoriesCount}
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#64748B] block mt-1 uppercase">
            Categories
          </span>
        </div>

        <div className="py-2">
          <span className="text-[26px] sm:text-[30px] font-bold text-[#0F172A] leading-tight block">
            {insightsCount}
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#64748B] block mt-1 uppercase">
            Insights
          </span>
        </div>

        <div className="py-2">
          <span className="text-[26px] sm:text-[30px] font-bold text-[#0F172A] leading-tight block">
            {productsServicesCount}
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#64748B] block mt-1 uppercase">
            Products & Services
          </span>
        </div>

        <div className="py-2">
          <span className="text-[26px] sm:text-[30px] font-bold text-[#0F172A] leading-tight block">
            {customerSegmentsCount}
          </span>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#64748B] block mt-1 uppercase">
            Customer Segments
          </span>
        </div>
      </div>

      {/* Green Ready Banner */}
      <div className="bg-[#DCFCE7]/70 border border-[#86EFAC]/50 rounded-[14px] p-3 sm:p-3.5 flex items-start gap-2.5 mt-4">
        <div className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5">
          <Check size={13} strokeWidth={3} />
        </div>
        <p className="text-[13px] text-[#166534] leading-snug">
          <strong className="font-semibold text-[#14532D]">Your business context is ready.</strong>{" "}
          Follei will use this information to personalize your CRM and AI recommendations.
        </p>
      </div>
    </div>
  );
};

export default KnowledgeExtractedSection;
