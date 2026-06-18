import React from 'react';
import { ChevronDown, Grid } from 'lucide-react';

interface PurchasedProductsCardProps {
  customer: {
    activeProducts: number;
  };
}

const PurchasedProductsCard: React.FC<PurchasedProductsCardProps> = ({ customer }) => {
  const products = [
    { name: 'CRM Platform', edition: 'Enterprise Edition', color: 'text-[#E5AD44]', bg: 'bg-[#FFFBEF]' },
    { name: 'CRM Platform', edition: 'Enterprise Edition', color: 'text-[#E5AD44]', bg: 'bg-[#FFFBEF]' },
  ];

  return (
    <div className="bg-white border border-[#EEF0FF] rounded-[20px] p-5 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[16px] font-bold text-[#1E293B] uppercase tracking-wider">Purchased Products</h3>
        <button className="text-[12px] font-bold text-[#004370] cursor-pointer">View All</button>
      </div>

      <div className="flex flex-col gap-3">
        {products.slice(0, Math.min(customer.activeProducts, products.length)).map((prod, i) => (
          <div
            key={i}
            className="flex items-center justify-between p-3 bg-[#F8FAFC] border border-[#F3F4FC] rounded-[8px]"
          >
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${prod.bg} ${prod.color} flex items-center justify-center shrink-0`}>
                <Grid className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[14px] font-bold text-[#131B2E] truncate">{prod.name}</span>
                <span className="text-[12px] text-[#767587] font-medium mt-0.5">{prod.edition}</span>
              </div>
            </div>
            <ChevronDown className="w-5 h-5 text-[#464555] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedProductsCard;
