import React from "react";

interface PageHeaderSectionProps {
  title?: string;
  subtitle?: string;
}

const PageHeaderSection: React.FC<PageHeaderSectionProps> = ({
  title = "Import Your Business Data",
  subtitle = "Help Follei understand your business, products, customers, pricing, and sales process.",
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-[28px] sm:text-[32px] font-bold text-[#0F172A] tracking-[-0.02em] leading-tight">
        {title}
      </h1>
      <p className="text-[15px] text-[#64748B] mt-2 font-normal leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
};

export default PageHeaderSection;
