import React, { useState } from "react";
import { Search, X } from "lucide-react";
import AiChatTable from "../HistoryTable/AIchat";
import AdminChatTable from "../HistoryTable/adminchat";
import ConvertedChatTable from "../HistoryTable/converted";
import SpamChatTable from "../HistoryTable/spam";


const ChatHistory: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"ai" | "admin" | "converted" | "spam">("ai");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);



  return (
    <div
      className="w-full BoxStyle shadow-xs border border-[#EEF2F5]  transition-all duration-300"
      style={{ backgroundColor: '#F6FBFF' }}
    >
      <div className="flex flex-row items-center justify-between gap-4 mb-6">
        <h2 className=" font-semibold text-[20px] sm:text-[24px] text-[#191C1E] text-left">
          Chat History
        </h2>
        <div className="flex items-center justify-end gap-2 w-auto">
          {showSearchInput && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-28 sm:w-64 px-4 py-1.5 border border-[#E2E8F0] rounded-full text-[13px] font-medium  focus:outline-none focus:border-[#236C9F] transition-all capitalize"
              autoFocus
            />
          )}
          <button
            onClick={() => {
              if (showSearchInput) {
                setSearchQuery("");
                setShowSearchInput(false);
              } else {
                setShowSearchInput(true);
              }
            }}
            className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer active:scale-95 shadow-sm flex-shrink-0"
          >
            {showSearchInput ? <X size={16} /> : <Search size={16} />}
          </button>
        </div>
      </div>
      <div className="flex overflow-x-auto no-scrollbar justify-start sm:justify-center items-center gap-[10px] mb-8 pb-1 w-full flex-nowrap select-none">
        {[
          { id: "ai", label: "AI Chats" },
          { id: "admin", label: "Admin Chats" },
          { id: "converted", label: "Converted" },
          { id: "spam", label: "Spam" },
        ].map((tab) => {
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setSelectedTab(tab.id as any);
                setSearchQuery("");
              }}
              className={`py-[10px] px-[16px] rounded-full text-[14px]  font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                ? "bg-black text-white shadow-sm"
                : "bg-[#EBEBEB] text-[#64748B] hover:text-[#334155] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)] hover:bg-gray-300 " 
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* table */}
      {selectedTab === "ai" && <AiChatTable searchQuery={searchQuery} />}
      {selectedTab === "admin" && <AdminChatTable searchQuery={searchQuery} />}
      {selectedTab === "converted" && <ConvertedChatTable searchQuery={searchQuery} />}
      {selectedTab === "spam" && <SpamChatTable searchQuery={searchQuery} />}
    </div>
  );
};

export default ChatHistory;
