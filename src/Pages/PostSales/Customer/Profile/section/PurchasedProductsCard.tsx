import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, Grid, Sparkles, Star } from 'lucide-react';
import BtnComSecondary from '../../../../../Component/BtnComSecondary';

interface Product {
  name: string;
  edition: string;
  color: string;
  bg: string;
  borderColor: string;
  billing: string;
  renewal: string;
  amount: string;
  plan: string;
  utilization: number;
  feedback: {
    rating: number;
    text: string;
  };
  upsell: {
    text: string;
  };
}

interface PurchasedProductsCardProps {
  customer: {
    activeProducts: number;
  };
  isDetailedView?: boolean;
  onViewAllClick?: () => void;
  onBack?: () => void;
}

const PurchasedProductsCard: React.FC<PurchasedProductsCardProps> = ({
  customer,
  isDetailedView = false,
  onViewAllClick,
  onBack
}) => {
  const products: Product[] = [
    {
      name: 'CRM Platform',
      edition: 'Enterprise Edition',
      color: 'text-[#E5AD44]',
      bg: 'bg-[#FFFBEF]',
      borderColor: 'border-[#FFEAB8]',
      billing: 'Yearly',
      renewal: '28 Jun 2026',
      amount: '₹1,080,000/yr',
      plan: 'Enterprise',
      utilization: 84,
      feedback: {
        rating: 4.8,
        text: 'The new mobile interface is a game changer for our field team.'
      },
      upsell: {
        text: 'Strong adoption across core features, upsell opportunity for Advanced Seats.'
      }
    },
    {
      name: 'CRM Platform',
      edition: 'Enterprise Edition',
      color: 'text-[#E5AD44]',
      bg: 'bg-[#FFFBEF]',
      borderColor: 'border-[#FFEAB8]',
      billing: 'Yearly',
      renewal: '28 Jun 2026',
      amount: '₹1,080,000/yr',
      plan: 'Enterprise',
      utilization: 84,
      feedback: {
        rating: 4.8,
        text: 'The new mobile interface is a game changer for our field team.'
      },
      upsell: {
        text: 'Strong adoption across core features, upsell opportunity for Advanced Seats.'
      }
    }
  ];

  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({ 0: true });

  const toggleExpand = (index: number) => {
    setExpandedIndices((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const displayedProducts = isDetailedView
    ? products
    : products.slice(0, Math.min(customer.activeProducts, products.length));

  if (isDetailedView) {
    return (
      <div className="bg-white border border-[#EEF0FF] rounded-[20px] p-6 flex flex-col gap-6 w-full">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 hover:bg-[#F1F5F9] rounded-full text-[#464555] transition-colors cursor-pointer"
              aria-label="Back to Profile"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <h3 className="text-[16px] font-bold text-[#1E293B] uppercase tracking-wider">
            Purchased Products
          </h3>
        </div>

        {/* Accordion Product List */}
        <div className="flex flex-col gap-4">
          {displayedProducts.map((prod, index) => {
            const isExpanded = !!expandedIndices[index];
            return (
              <div
                key={index}
                className="bg-[#F8FAFC] border border-[#F3F4FC] rounded-[8px] overflow-hidden transition-all duration-300"
              >
                <div
                  onClick={() => toggleExpand(index)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#F1F5F9] transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-[12px] ${prod.bg} border ${prod.borderColor} ${prod.color} flex items-center justify-center shrink-0`}
                    >
                      <Grid className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[14px] font-bold text-[#1E293B] truncate">
                        {prod.name}
                      </span>
                      <span className="text-[12px] text-[#64748B] font-semibold mt-0.5">
                        {prod.edition}
                      </span>
                    </div>
                  </div>
                  <div className="p-1 hover:bg-[#E2E8F0] rounded-full text-[#464555] transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-5 border-t border-[#EEF0FF] flex flex-col gap-6 bg-[#FFFFFF]">
                    {/* Metrics Fields Row */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                          Billing
                        </span>
                        <span className="text-[12px] font-medium text-[#131B2E]">
                          {prod.billing}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                          Renewal
                        </span>
                        <span className="text-[12px] font-medium text-[#131B2E]">
                          {prod.renewal}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                          Amount
                        </span>
                        <span className="text-[12px] font-medium text-[#131B2E]">
                          {prod.amount}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                          Plan
                        </span>
                        <span className="text-[12px] font-medium text-[#131B2E]">
                          {prod.plan}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                        <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                          Utilization
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 max-w-[120px] bg-[#EAEDFF] rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-[#004370] h-2 rounded-full"
                              style={{ width: `${prod.utilization}%` }}
                            ></div>
                          </div>
                          <span className="text-[11px] font-medium text-[#767587] shrink-0">
                            {prod.utilization}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Feedback and Upsell Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-[#FCFDFE] border border-[#F3F4FC] rounded-[12px] px-3 py-2 flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[10px] font-semibold text-[#222222] uppercase tracking-wider">
                            Feedback
                          </span>
                          <div className="bg-[#EAEDFF] rounded-[8px] px-1 py-0.5 flex items-center gap-1 shrink-0">
                            <Star className="w-3.5 h-3.5 fill-[#E5AD44] text-[#E5AD44]" />
                            <span className="text-[12px] text-[#131B2E]">
                              {prod.feedback.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-[13px] text-[#464555] leading-relaxed">
                          &ldquo;{prod.feedback.text}&rdquo;
                        </p>
                      </div>

                      <div className="bg-[#F4FBFF] rounded-[12px] py-2 px-3 flex flex-col justify-between">
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#004370] fill-[#004370]" />
                          <span className="text-[10px] font-medium text-[#004370] uppercase tracking-wider">
                            AI Smart Upsell
                          </span>
                        </div>
                        <p className="text-[12px] text-[#131B2E] leading-relaxed">
                          {prod.upsell.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#EEF0FF] rounded-[20px] p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center gap-2">
        <h3 className="text-[13px] sm:text-[16px] font-bold text-[#1E293B] uppercase tracking-wider whitespace-nowrap">Purchased Products</h3>
        <BtnComSecondary
          label="View All"
          onClick={onViewAllClick}
          className="px-2 py-1 text-xs sm:px-3 sm:py-1.5 sm:text-[14px] whitespace-nowrap shrink-0"
        />
      </div>

      <div className="flex flex-col gap-3">
        {displayedProducts.map((prod, index) => {
          const isExpanded = !!expandedIndices[index];
          return (
            <div
              key={index}
              className="bg-[#F8FAFC] border border-[#F3F4FC] rounded-[8px] overflow-hidden transition-all duration-300"
            >
              <div
                onClick={() => toggleExpand(index)}
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-[#F1F5F9] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full ${prod.bg} border ${prod.borderColor} ${prod.color} flex items-center justify-center shrink-0`}
                  >
                    <Grid className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-bold text-[#131B2E] truncate">{prod.name}</span>
                    <span className="text-[12px] text-[#767587] font-medium mt-0.5">{prod.edition}</span>
                  </div>
                </div>
                <div className="p-1 hover:bg-[#E2E8F0] rounded-full text-[#464555] transition-colors">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-5 border-t border-[#EEF0FF] flex flex-col gap-6 bg-[#FFFFFF]">
                  {/* Metrics Fields Row */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                        Billing
                      </span>
                      <span className="text-[12px] font-medium text-[#131B2E]">
                        {prod.billing}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                        Renewal
                      </span>
                      <span className="text-[12px] font-medium text-[#131B2E]">
                        {prod.renewal}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                        Amount
                      </span>
                      <span className="text-[12px] font-medium text-[#131B2E]">
                        {prod.amount}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                        Plan
                      </span>
                      <span className="text-[12px] font-medium text-[#131B2E]">
                        {prod.plan}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                      <span className="text-[10px] font-medium text-[#767587] uppercase tracking-wider">
                        Utilization
                      </span>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[120px] bg-[#EAEDFF] rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-[#004370] h-2 rounded-full"
                            style={{ width: `${prod.utilization}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-medium text-[#767587] shrink-0">
                          {prod.utilization}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Feedback and Upsell Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#FCFDFE] border border-[#F3F4FC] rounded-[12px] px-3 py-2 flex flex-col justify-between">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[10px] font-semibold text-[#222222] uppercase tracking-wider">
                          Feedback
                        </span>
                        <div className="bg-[#EAEDFF] rounded-[8px] px-1 py-0.5 flex items-center gap-1 shrink-0">
                          <Star className="w-3.5 h-3.5 fill-[#E5AD44] text-[#E5AD44]" />
                          <span className="text-[12px] text-[#131B2E]">
                            {prod.feedback.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-[13px] text-[#464555] leading-relaxed">
                        &ldquo;{prod.feedback.text}&rdquo;
                      </p>
                    </div>

                    <div className="bg-[#F4FBFF] rounded-[12px] py-2 px-3 flex flex-col justify-between">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-[#004370] fill-[#004370]" />
                        <span className="text-[10px] font-medium text-[#004370] uppercase tracking-wider">
                          AI Smart Upsell
                        </span>
                      </div>
                      <p className="text-[12px] text-[#131B2E] leading-relaxed">
                        {prod.upsell.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PurchasedProductsCard;