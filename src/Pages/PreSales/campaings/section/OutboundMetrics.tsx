import { Layers, TrendingUp, MessageSquare, Activity } from 'lucide-react';

const OutboundMetrics = () => {
  const metricsLeft = [
    {
      title: "TOTAL CAMPAIGNS",
      value: "5",
      subtitle: "+1 this month",
      icon: <Layers size={20} strokeWidth={2.5} />,
      badge: "OVERALL",
      badgeColor: "text-gray-500",
      iconBg: "bg-blue-50 text-blue-600",
      subtitleColor: "#006A61"
    },
    {
      title: "ACTIVE CAMPAIGNS",
      value: "2",
      subtitle: "40% of total",
      icon: <TrendingUp size={20} strokeWidth={2.5} />,
      badge: "• Live",
      badgeColor: "text-emerald-700 bg-emerald-50",
      iconBg: "bg-emerald-50 text-emerald-600",
      subtitleColor: "#64748B"
    }
  ];

  const metricsRight = [
    {
      title: "TOTAL REPLIES",
      value: "425",
      subtitle: "Avg 85/camp",
      icon: <MessageSquare size={20} strokeWidth={2.5} />,
      badge: "↑ 12%",
      badgeColor: "text-emerald-700",
      iconBg: "bg-blue-50 text-blue-600",
      subtitleColor: "#64748B"
    },
    {
      title: "CONVERSION RATE",
      value: "19.8%",
      subtitle: "",
      icon: <Activity size={20} strokeWidth={2.5} />,
      badge: "Excellent",
      badgeColor: "text-emerald-700",
      iconBg: "bg-blue-50 text-blue-600",
      hasProgress: true
    }
  ];

  const renderCard = (metric: any, idx: number) => (
    <div key={idx} className="BoxStyle flex flex-col justify-between h-[210px] w-full">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-[40px] h-[40px] rounded-[10px] flex items-center justify-center ${metric.iconBg}`}>
          {metric.icon}
        </div>
        <div className={`px-3 py-1 rounded-full text-[11px] font-bold ${metric.badgeColor}`}>
          {metric.badge}
        </div>
      </div>

      <div className="mt-auto">
        <h3 className="text-[#64748B] uppercase font-inter font-semibold text-[12px] leading-[16px] tracking-[1.2px] mb-2">
          {metric.title}
        </h3>
        <div className="flex items-end gap-2 mb-4">
          <span className="text-[32px] font-extrabold text-[#191C1E] leading-none font-manrope">{metric.value}</span>
          {metric.subtitle && (
            <span
              className="mb-1 font-inter font-bold text-[12px] leading-[16px]"
              style={{ color: metric.subtitleColor }}
            >
              {metric.subtitle}
            </span>
          )}
        </div>
        {/* {metric.hasProgress && (
          <div className="h-[4px] w-full bg-[#F1F5F9] rounded-[12px] overflow-hidden">
            <div className="h-full bg-[#006A61] w-[80%] rounded-[12px]"></div>
          </div>
        )} */}
      </div>
    </div>
  );

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-8">
      {/* Left Half */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {metricsLeft.map((m, i) => renderCard(m, i))}
      </div>
      {/* Right Half */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {metricsRight.map((m, i) => renderCard(m, i))}
      </div>
    </div>
  );
};

export default OutboundMetrics;
