import { Repeat } from 'iconsax-react';
import { Users, Send, UserCheck } from 'lucide-react';

const stats = [
  {
    title: "Total Customers",
    value: "1,284",
    change: "12% vs yesterday",
    trend: "up",
    icon: Users,
    color: "#014370",
    titleColor: "#6E6E6E"
  },
  {
    title: "Renewal Due (30)",
    value: "32",
    change: "37% vs last month",
    trend: "critical",
    icon: Repeat,
    color: "#014370",
    titleColor: "#DBA400"
  },
  {
    title: "Followed up",
    value: "847",
    change: "66% rate",
    trend: "up",
    icon: Send,
    color: "#014370",
    titleColor: "#6E6E6E"
  },
  {
    title: "At Risk",
    value: "58",
    change: "4% vs last week",
    trend: "down",
    icon: UserCheck,
    color: "#014370",
    titleColor: "#F00000"
  }
];

export default function StatsGrid() {
  return (
    <div className="col-span-12 lg:col-span-4 xl:col-span-4 grid grid-cols-2 grid-rows-2 gap-x-5 gap-y-8 pt-6">
      {stats.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-[20px] pt-7 pb-3 px-3 border border-[#EDF3FD] relative flex flex-col justify-between items-center w-full h-full "
          style={{
            boxShadow: '0px 4px 4px 0px rgba(237, 243, 253, 0.3)'
          }}
        >
          {/* Floating Circle Icon */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full bg-white border border-[#EDF3FD] flex items-center justify-center z-10"
            style={{
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
            }}
          >
            <item.icon
              size={20}
              className="stroke-[2.5]"
              style={{ color: item.color, fill: item.color }}
              color="currentColor"
            />
          </div>

          {/* Centered card header & values */}
          <div className="text-center flex flex-col items-center justify-center mt-1.5 flex-1">
            <p
              className="text-[16px] font-semibold"
              style={{ color: item.titleColor }}
            >
              {item.title}
            </p>
            <h3
              className="text-[36px] font-bold text-[#6693B1] leading-none mt-1"
              style={{ fontWeight: 700 }}
            >
              {item.value}
            </h3>
          </div>

          {/* Trend Indicator */}
          <div
            className="flex items-center gap-1 text-[16px] font-light "
            style={{
              fontWeight: 300,
              color: item.trend === "critical" ? "#D60509" : "#008900"
            }}
          >
            <span>{item.trend === "critical" ? "↑" : (item.trend === "down" ? "↓" : "↑")}</span>
            <span>{item.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
