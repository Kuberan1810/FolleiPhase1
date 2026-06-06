

const RevenueCard = () => {
  const revenueMetrics = [
    { label: "Upsell Opportunities", value: "48", sub: "$284K pipeline" },
    { label: "Cross-sell Conversions", value: "27", sub: "Win rate 36%" },
    { label: "Expansion Revenue", value: "$412K", sub: "+12.4% MoM" },
    { label: "Churned Revenue", value: "$38K", sub: "-2.1% MoM" }
  ];

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-[#F1F5F9]">
      <div className="mb-6">
        <h2 className="text-[#171C1F] text-[20px] font-semibold font-manrope leading-[28px]">Revenue Expansion</h2>
        <p className="text-[#464554] text-[14px] font-manrope font-normal leading-[20px]">Growth signals from existing accounts</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {revenueMetrics.map((card, i) => (
          <div key={i} className="bg-[#F8FAFC] rounded-[16px] p-4 sm:p-5">
            <p className="text-[#333333] text-[16px] font-manrope font-medium leading-[1.2] mb-[10px]">{card.label}</p>
            <p className="text-[#222222] text-[24px] font-manrope font-semibold leading-[1.2] mb-[10px]">{card.value}</p>
            <p className="text-[#6B7280] text-[14px] font-manrope font-medium leading-none">{card.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueCard;
