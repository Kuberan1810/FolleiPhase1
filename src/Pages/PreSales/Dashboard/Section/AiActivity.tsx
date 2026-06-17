import React from "react";

const AiActivity: React.FC = () => {
  const activities = [
    { text: "847 leads followed up across all channels", status: "Ongoing", type: "ongoing" },
    { text: "Escalated 7 leads — needs your decision", status: "Now", type: "now" },
    { text: "58 leads converted, moved to Customer List", status: "Auto", type: "auto" },
    { text: "847 leads followed up across all channels", status: "Ongoing", type: "ongoing" },
  ];

  return (
    <div className="col-span-1 md:col-span-12 lg:col-span-6 BoxStyle flex flex-col justify-between">
      <h3 className="text-[20px] font-bold text-[#000000] mb-4 leading-[1.2] tracking-[0.6px]">AI activity today</h3>
      <div className="space-y-3">
        {activities.map((act, idx) => {
          const isNow = act.type === "now";
          const bgClass = isNow ? "bg-[#FFF1F2]" : "bg-[#F3F6FF]";
          const textClass = isNow ? "text-[#254AA5]" : "text-[#254AA5]";

          return (
            <div key={idx} className={`p-3.5 rounded-[12px] ${bgClass} flex items-center justify-between`}>
              <span className="text-[14px] font-medium text-[#191C1E]">{act.text}</span>
              <span className={`text-[16px] font-normal underline decoration-solid leading-[1.2] tracking-[0.6px] cursor-pointer ${textClass}`}>
                {act.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AiActivity;
