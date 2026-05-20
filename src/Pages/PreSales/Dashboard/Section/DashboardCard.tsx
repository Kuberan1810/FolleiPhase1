import { ClipboardTick, Profile2User, Star, Refresh, MoneyTick } from "iconsax-react";

const DashboardCard = () => {
  const cards = [
    {
      title: "Today's Leads",
      value: "268",
      icon: <Profile2User variant="Bold" size={24} color="#64748B" />,
      badge: { text: "+12.4%", color: "text-[#188573]", bg: "bg-[#006A611A]" }
    },
    {
      title: "Meeting Booked",
      value: "12",
      icon: <ClipboardTick variant="Bold" size={24} color="#64748B" />,
      badge: { text: "14% Book Rate", color: "text-[#0C4A6E]", bg: "bg-[#E0F2FE]" }
    },
    {
      title: "Hot Leads",
      value: "21",
      icon: <Star variant="Bold" size={24} color="#64748B" />
    },
    {
      title: "Conversion Rate",
      value: "14.2%",
      icon: <Refresh variant="Bold" size={24} color="#64748B" />,
      badge: { text: "+1.5%", color: "text-[#188573]", bg: "bg-[#006A611A]" }
    },
    {
      title: "Revenue Pipeline",
      value: "₹9.2 L",
      icon: <MoneyTick variant="Bold" size={24} color="#64748B" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-[20px] p-6 border border-[#F1F5F9] shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-[14px] bg-[#F1F5F9] p-2">
              {card.icon}
            </div>
            {card.badge && (
              <span className={`px-2 py-1 rounded-full text-[12px] font-semibold ${card.badge.bg} ${card.badge.color}`}>
                {card.badge.text}
              </span>
            )}
          </div>
          <div className="font-inter text-[12px] uppercase tracking-widest text-[#64748B] mb-1">
            {card.title}
          </div>
          <div className="font-inter text-[34px] font-bold text-[#191C1E]">
            {card.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
