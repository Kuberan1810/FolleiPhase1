

const SupportCard = () => {
  const supportMetrics = [
    { label: "Tickets Opened", value: "342", sub: "vs 318 closed" },
    { label: "Avg Resolution", value: "4h 12m", sub: "-18% this week" },
    { label: "First Response", value: "8m", sub: "Target: <15m" },
    { label: "Escalations", value: "12", sub: "+3 vs last week" }
  ];

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 border border-[#F1F5F9]">
      <div className="mb-6">
        <h2 className="text-[#171C1F] text-[20px] font-semibold font-manrope leading-[28px]">Support & Engagement</h2>
        <p className="text-[#464554] text-[14px] font-manrope font-normal leading-[20px]">Performance of your support motion</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {supportMetrics.map((card, i) => (
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

export default SupportCard;
