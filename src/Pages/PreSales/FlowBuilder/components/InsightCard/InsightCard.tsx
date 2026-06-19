import React from 'react';

interface InsightCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  status: string;
  onClick?: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({
  icon: Icon,
  title,
  description,
  status,
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-[10px] p-[15px] border border-[#C1C7D1]/20 w-full max-w-[390px] h-[152px] flex flex-col justify-between group cursor-pointer transition-all shadow-[0_1px_2px_rgba(0,0,0,0.05)] mx-auto md:mx-0 hover:border-[#1D7EBE]/30 hover:shadow-md"
    >
      <div className="flex flex-col gap-[15px]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#DBEAFE] rounded-[5px] text-[#004370]">
            <Icon size={18} />
          </div>
          <h3 className="text-[16px] font-semibold text-[#191C1E]">{title}</h3>
        </div>
        <p className="text-[14px] text-[#595C5E] leading-[1.6]">
          {description}
        </p>
      </div>

      <div className="mt-1">
        <div className="w-full h-[1.5px] bg-[#C1C7D1]/20 mb-2" />
        <span className="text-[14px] font-medium text-[#004370]">
          {status}
        </span>
      </div>
    </div>
  );
};

export default InsightCard;
