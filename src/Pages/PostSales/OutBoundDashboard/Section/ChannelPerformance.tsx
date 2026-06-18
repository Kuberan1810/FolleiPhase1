import React from "react";
import whatsappLogo from "../../../../assets/icons/whatsapplogoo.svg";
import gmailLogo from "../../../../assets/icons/gmaillogo.svg";
import callIcon from "../../../../assets/icons/call.svg";
import mailIcon from "../../../../assets/icons/maill.svg";

const ChannelPerformance: React.FC = () => {
  const channels = [
    {
      sent: "248 sent",
      openRate: "67% open",
      progress: 67,
      barColor: "bg-[#25D366]",
      icon: <img src={whatsappLogo} className="w-full h-full object-contain" alt="WhatsApp" />,
    },
    {
      sent: "321 sent",
      openRate: "30% open",
      progress: 30,
      barColor: "bg-[#EF4444]",
      icon: <img src={gmailLogo} className="w-full h-full object-contain" alt="Gmail" />,
    },
    {
      sent: "158 sent",
      openRate: "80% open",
      progress: 80,
      barColor: "bg-[#3B82F6]",
      icon: <img src={callIcon} className="w-full h-full object-contain" alt="Call" />,
    },
    {
      sent: "248 sent",
      openRate: "45% open",
      progress: 45,
      barColor: "bg-[#F59E0B]",
      icon: (
        <div className="relative w-full h-full flex items-center justify-center">
          <img src={mailIcon} className="w-full h-full object-contain" alt="Mail" />
        </div>
      ),
    },
  ];

  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 BoxStyle flex flex-col">
      <h3 className="text-[20px] font-medium text-[#000000] mb-4 leading-[1.2] tracking-[0.6px]">Channel performance</h3>
      <div className="flex flex-col gap-[10px]">
        {channels.map((chan, idx) => (
          <div key={idx} className="bg-[#F6F8FF] border border-[#EDF3FD] rounded-[10px] h-[71px] px-5 flex items-center justify-between">
            <div className="flex items-center gap-[10px]">
              <div className="w-7 h-7 flex items-center justify-center shrink-0">
                {chan.icon}
              </div>
              <span className="text-[16px] font-normal text-[#000000] leading-[1.2] tracking-[0.6px] align-middle">{chan.sent}</span>
            </div>
            <div className="flex flex-col items-start gap-1">
              <div className="flex items-baseline text-black leading-[1.2] tracking-[0.6px]">
                <span className="text-[20px] font-normal">{chan.progress}%</span>
                <span className="text-[16px] font-normal ml-1">open</span>
              </div>
              <div className="w-[114px] bg-[#D9D9D9] rounded-[30px] h-[7px] overflow-hidden">
                <div className={`h-full ${chan.barColor} rounded-[30px]`} style={{ width: `${chan.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPerformance;
