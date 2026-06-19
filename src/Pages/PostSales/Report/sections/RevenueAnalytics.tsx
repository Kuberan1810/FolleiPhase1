import { TrendingUp, Heart, Timer, Users } from 'lucide-react';

const AnalyticsCard = ({ icon: Icon, title, value, trend, status, iconBg, iconColor }: any) => {
  return (
    <div className="BoxStyle flex flex-col justify-between min-h-[180px]">
      <div className="flex justify-between items-start mb-4">
        <div className={`${iconBg} p-2.5 rounded-lg`}>
          <Icon size={20} className={iconColor} />
        </div>
        
        {trend && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
        
        {status && (
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
            status === 'Optimal' ? 'text-slate-500 bg-slate-100' : 'text-rose-600 bg-rose-50'
          }`}>
            {status}
          </span>
        )}
      </div>

      <div>
        <p className="text-[#64748B] text-[14px] font-medium mb-1">{title}</p>
        <h3 className="text-[30px] font-bold text-[#0F172A]">{value}</h3>
      </div>
    </div>
  );
};

const RevenueAnalytics = () => {
  const data = [
    {
      title: "Net Revenue Retention",
      value: "112.8%",
      trend: "+4.2%",
      icon: TrendingUp,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
    },
    {
      title: "Avg. Health Score",
      value: "84/100",
      status: "Optimal",
      icon: Heart,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      title: "Resolution Time (Avg)",
      value: "4.2h",
      trend: "+12%",
      icon: Timer,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
    },
    {
      title: "At-Risk Revenue",
      value: "10 L",
      status: "Alert",
      icon: Users,
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
  ];

  return (
    <div className=" ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((item, index) => (
            <AnalyticsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RevenueAnalytics;

// C:\Users\NIRANJAN\Documents\Zoom