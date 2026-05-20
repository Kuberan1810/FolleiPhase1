import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";

interface ChatItem {
  id: string;
  name: string;
  avatarChar: string;
  avatarColor: string;
  number: string;
  tone: string;
  intent: string;
  pricingDiscussed: string;
}

const ChatHistory: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<"ai" | "admin" | "converted" | "spam">("ai");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);

  const chats: ChatItem[] = [
    {
      id: "1",
      name: "Karan",
      avatarChar: "K",
      avatarColor: "bg-gradient-to-br from-[#DCB1B1] to-[#419EF5] text-white",
      number: "+91 8344427271",
      tone: "Cold",
      intent: "Good",
      pricingDiscussed: "Not yet",
    },
    {
      id: "2",
      name: "Nisha",
      avatarChar: "N",
      avatarColor: "bg-gradient-to-br from-[#AEA14C] to-[#F5E941] text-white",
      number: "+91 7678837890",
      tone: "Warm",
      intent: "Good",
      pricingDiscussed: "Not yet",
    },
    {
      id: "3",
      name: "Rohan",
      avatarChar: "R",
      avatarColor: "bg-gradient-to-br from-[#6C86C9] to-[#0B4984] text-white",
      number: "+91 4578443248",
      tone: "Cold",
      intent: "Good",
      pricingDiscussed: "Not yet",
    },
    {
      id: "4",
      name: "Harsh",
      avatarChar: "H",
      avatarColor: "bg-gradient-to-br from-[#3599AD] to-[#41F2F5] text-white",
      number: "+91 4098837839",
      tone: "Hot",
      intent: "Good",
      pricingDiscussed: "Not yet",
    },
  ];

  const filteredChats = useMemo(() => {
    return chats.filter((chat) => {
      const matchesSearch =
        chat.number.includes(searchQuery) ||
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.tone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.intent.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#F6FBFF] rounded-[20px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#EEF2F5] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-[#191C1E] text-[24px] font-semibold">
          Chat History
        </h2>
        <div className="flex items-center gap-2">
          {showSearchInput && (
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 sm:w-64 px-4 py-1.5 border border-[#E2E8F0] rounded-full text-[13px] font-medium font-inter focus:outline-none focus:border-[#236C9F] transition-all"
              autoFocus
            />
          )}
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer active:scale-95 shadow-sm"
          >
            <Search size={16} />
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-[10px] mb-8">
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
              className={`py-[14px] px-[20px] rounded-full text-[20px] font-semibold tracking-wide transition-all duration-300 cursor-pointer ${isActive
                ? "bg-black text-white shadow-sm"
                : "bg-[#EBEBEB] text-[#64748B] hover:text-[#334155] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="overflow-hidden border border-[#EEF2F5] rounded-[10px] bg-white">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-12 gap-2 py-4 pr-6 pl-8 text-[#000000] text-[24px] font-semibold bg-white">
              <div className="col-span-3">Recent chats</div>
              <div className="col-span-3">Number</div>
              <div className="col-span-2 ">tone</div>
              <div className="col-span-1">intent</div>
              <div className="col-span-2 whitespace-nowrap px-8">pricing discussed</div>
            </div>

            <div className="divide-y divide-[#F1F5F9]">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <div
                    key={chat.id}
                    className="grid grid-cols-12 gap-2 py-4 pr-8 pl-6 hover:bg-slate-50 transition-colors"
                  >
                    <div className="col-span-3 flex ">
                      <div
                        className={`w-[50px] h-[50px] rounded-full flex items-center justify-center font-bold text-[20px] shrink-0 shadow-sm ${chat.avatarColor}`}
                      >
                        {chat.avatarChar}
                      </div>
                    </div>

                    <div className="col-span-3 text-[#000000] pr-8 text-[24px] font-medium">
                      {chat.number}
                    </div>

                    <div className="col-span-2 text-[#000000] text-[24px] font-medium">
                      {chat.tone}
                    </div>
                    <div className="col-span-2 text-[#000000] text-[24px] font-medium">
                      {chat.intent}
                    </div>

                    <div className="col-span-2 text-[#000000] text-[24px]">
                      {chat.pricingDiscussed}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-[#94A3B8] font-medium text-[14px]">
                  No chats found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
