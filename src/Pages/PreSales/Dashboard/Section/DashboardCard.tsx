import { Calendar, People, Personalcard, Chart, DollarSquare } from "iconsax-react";

const DashboardCard = () => {
  const cards = [
    {
      title: "Today's Leads",
      value: "268",
      icon: <People variant="Bold" size={24} color="#004370" />,
      badge: { text: "+12.4%", color: "text-[#006A6A]", bg: "bg-[#006A611A]" }
    },
    {
      title: "Meeting Booked",
      value: "12",
      icon: <Calendar variant="Bold" size={24} color="#004370" />,
      badge: { text: "14% Book Rate", color: "text-[#006A6A]", bg: "bg-[#006A611A]" }
    },
    {
      title: "Hot Leads",
      value: "21",
      icon: <Personalcard variant="Bold" size={24} color="#004370" />
    },
    {
      title: "Conversion Rate",
      value: "14.2%",
      icon: <Chart variant="Bold" size={24} color="#004370" />,
      badge: { text: "+1.5%", color: "text-[#006A6A]", bg: "bg-[#006A611A]" }
    },
    {
      title: "Revenue Pipeline",
      value: "₹9.2 L",
      icon: <DollarSquare variant="Bold" size={24} color="#004370" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card, idx) => (
        <div key={idx} className="BoxStyle shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-[14px] bg-[#E0F2FE] p-2">
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
