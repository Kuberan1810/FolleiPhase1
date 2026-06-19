import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Dropdown from "./Dropdown";
import BtnCom from "../../../../Component/BtnCom";

const chatOptions = [
  { label: "Total Chats", value: "total_chats" },
  { label: "Active Chats", value: "active_chats" },
  { label: "Closed Chats", value: "closed_chats" },
];

const TopMetrics = () => {
  const navigate = useNavigate();
  const [chatType, setChatType] = useState("total_chats");

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-6 lg:gap-8 mb-8 w-full">
      <div
        className="BoxStyle bg-[#F6FBFF]! shadow-xs flex flex-col justify-between items-start text-left flex-1 w-full  "

      >
        <Dropdown
          options={chatOptions}
          value={chatType}
          onChange={setChatType}
          className="font-semibold text-[24px] text-[#191C1E]"
        />
        <div className="w-full text-center">
          <span className=" font-semibold text-[48px] text-[#191C1E] leading-none tracking-tight">
            568
          </span>
        </div>
        <div className="h-1" />
      </div>

      <div className="BoxStyle bg-black! shadow-xs text-white flex flex-col justify-between items-center w-full md:w-[549px] shrink-0 "
      >
        <div className="w-full">
          <h3 className=" font-medium text-[24px] tracking-tight leading-tight mb-1.5">
            customer conversion conversation
          </h3>
        </div>
        <p className=" text-[13px] font-medium text-[#DFF2FE] text-left w-full mb-1.5">
          83% of total chat
        </p>
        <div className="h-[42px] w-full rounded-[4px] overflow-hidden flex p-[1px] mt-2">
          <div className="h-full bg-[#F6FBFF]" style={{ width: "83%", borderTopLeftRadius: "4px", borderBottomLeftRadius: "4px" }}></div>
          <div className="h-full bg-[#004370]" style={{ width: "17%", borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }}></div>
        </div>
      </div>

      <div
        className="BoxStyle bg-[#F6FBFF]! shadow-xs flex flex-col justify-between items-start text-left flex-1 w-full  "

      >
        <span className=" font-semibold text-[24px] text-[#191C1E]">
          Admin Needs
        </span>
        <div className="w-full text-center mb-1.5 ">
          <span className="text-[48px]  font-semibold text-[#191C1E] leading-none tracking-tight ">
            10
          </span>
        </div>
        <div className="w-full flex justify-center">
          {/* <button
            onClick={() => navigate('/presales/inbox/admin-needs')}
            className="bg-[#004370] text-white px-10 py-2 rounded-[8px]  font-medium text-[14px] cursor-pointer shadow-sm active:scale-95  tracking-wider"
          >
            View
          </button> */}

          <BtnCom
            onClick={() => navigate('/presales/inbox/admin-needs')}
            label="View"
            className="px-10! py-2.5! text-[14px]! font-semibold! tracking-wider rounded-xl!"
          />
        </div>
      </div>
    </div >
  );
};

export default TopMetrics;
