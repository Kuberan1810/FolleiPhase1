import React from 'react';
import { Users, Mail, Send, } from 'lucide-react';
import { Money } from 'iconsax-react';
import AiContent from '../../../../../assets/icons/ai.svg';
interface MetricItem {
  label: string;
  value: string;
  topRight: React.ReactNode;
  icon: React.ReactNode;
  iconBg: string;
}

const CampaignDetailMetrics: React.FC = () => {
  const metrics: MetricItem[] = [
    {
      label: "Total Sent",
      value: "2,450",
      topRight: <span className="text-[12px] font-extrabold text-[#464555] uppercase tracking-[0.5px]">Reach</span>,
      icon: <Users size={18} className="text-[#004370]" />,
      iconBg: "bg-[#E5EEFF]"
    },
    {
      label: "Open Rate",
      value: "68%",
      topRight: (
        <span className="text-[12px] font-extrabold text-#059669 uppercase tracking-[0.5px]">
          +12% vs avg
        </span>
      ),
      icon: <Mail size={18} className="text-[#004370]" />,
      iconBg: "bg-[#E5EEFF]"
    },
    {
      label: "Click Rate",
      value: "32%",
      topRight: (
        <span className="text-[12px] font-bold text-[#059669] uppercase tracking-[0.5px]">
          +5% vs avg
        </span>
      ),
      icon: <Send size={18} className="text-[#0E9F6E]" />,
      iconBg: "bg-[#E6FFF1]"
    },
    {
      label: "Conversion Rate",
      value: "19.8%",
      topRight: (
        <span className="text-[10px] font-bold text-white bg-[#004370] px-2 py-0.5 rounded-[4px] uppercase tracking-wider">
          Excellent
        </span>
      ),
      icon: <img src={AiContent} className="text-[#004370]" />,
      iconBg: "bg-[#E5EEFF]"
    },
    {
      label: "Revenue Generated",
      value: "$845K",
      topRight: <span className="text-[12px] font-bold text-[#222222] uppercase tracking-[0.5px]">Projected</span>,
      icon: <Money size={18} color="#004370" />,
      iconBg: "bg-[#E5EEFF]"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5 mb-8">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="BoxStyle flex flex-col justify-between"
        >
          <div className="flex items-center justify-between w-full mb-1">
            <div className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 ${m.iconBg}`}>
              {m.icon}
            </div>
            {m.topRight}
          </div>

          <div className="flex flex-col mt-3">
            <div className="text-[24px] font-bold text-[#0B1C30] tracking-[-0.6px] leading-tight">
              {m.value}
            </div>
            <div className="text-[12px] font-normal text-[#464555] uppercase tracking-[0.5px] mt-0.5">
              {m.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CampaignDetailMetrics;
