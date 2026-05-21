import React, { useState } from "react";
import TopMetrics from "./Section/TopMetrics";
import HandlesSection from "./Section/HandlesSection";
import ChatHistory from "./Section/ChatHistory";
import FloatingButton from "../../../Component/FloatingButton";
import Img from "../../../assets/img/upgrade.png";

const InBox: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<"whatsapp" | "call" | "email">("whatsapp");

  const channels = [
    { id: "call", label: "Call" },
    { id: "whatsapp", label: "Whatsapp" },
    { id: "email", label: "Email" },
  ];

  return (
    <div className="w-fullanimate-fade-in pt-2">
      <div className="flex justify-center items-center gap-[10px] mb-12">
        {channels.map((channel) => {
          const isActive = activeChannel === channel.id;
          return (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.id as any)}
              className={`py-[14px] px-[20px] rounded-full text-[14px] font-bold tracking-wide transition-all duration-300 cursor-pointer ${isActive
                ? "bg-[#000000] text-[#F6FBFF]"
                : "bg-[#EBEBEB] text-[#000000] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]"
                }`}
            >
              {channel.label}
            </button>
          );
        })}
      </div>

      {activeChannel === "whatsapp" ? (
        <div className="flex flex-col gap-6 lg:gap-8">
          <TopMetrics />
          <HandlesSection />

          <ChatHistory />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[480px] text-center px-4 py-8 animate-fade-in select-none">
          <img
            src={Img}
            alt="Feeling blue illustration"
            className="w-[183px] h-auto mb-8 pointer-events-none drop-shadow-sm"
          />

          <h2 className="text-[#4F4E4E] text-[28px] sm:text-[48px] font-semibold leading-tight mb-2 tracking-tight">
            You're one step away from making {activeChannel === "call" ? "calls" : "emails"}
          </h2>

          <p className="text-[#707070] text-[14px] sm:text-[32px] font-medium font-inter mb-8">
            upgrade your plan to enable this feature
          </p>

          <button
            onClick={() => alert("Redirecting to Plan Upgrades & Billing Section...")}
            className="bg-[#DCE4E9] hover:bg-[#D1D5DB] text-[#777272] px-[30px] py-[10px] rounded-[10px] text-[13px] font-bold font-inter transition-all duration-200 cursor-pointer active:scale-95"
          >
            Upgrade
          </button>
        </div>
      )}

      <FloatingButton />
    </div>
  );
};

export default InBox;
