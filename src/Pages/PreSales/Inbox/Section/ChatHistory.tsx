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
    <div 
      className="w-full BoxStyle shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#EEF2F5] hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
      style={{ backgroundColor: '#F6FBFF' }}
    >
      <div className="flex flex-row items-center justify-between gap-4 mb-6">
        <h2 className="font-urbanist font-semibold text-[20px] sm:text-[24px] text-[#191C1E] text-left">
          Chat History
        </h2>
        <div className="flex items-center justify-end gap-2 w-auto">
          {showSearchInput && (
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-28 sm:w-64 px-4 py-1.5 border border-[#E2E8F0] rounded-full text-[13px] font-medium font-urbanist focus:outline-none focus:border-[#236C9F] transition-all"
              autoFocus
            />
          )}
          <button
            onClick={() => setShowSearchInput(!showSearchInput)}
            className="w-9 h-9 rounded-full bg-white border border-[#E2E8F0] text-[#64748B] flex items-center justify-center hover:bg-slate-100 transition-colors cursor-pointer active:scale-95 shadow-sm flex-shrink-0"
          >
            <Search size={16} />
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
              className={`py-[10px] px-[16px] rounded-full text-[14px] font-urbanist font-semibold tracking-wide transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                ? "bg-black text-white shadow-sm"
                : "bg-[#EBEBEB] text-[#64748B] hover:text-[#334155] shadow-[inset_0_4px_4px_rgba(0,0,0,0.25)]"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="BoxStyle overflow-hidden p-0!">
        <div className="w-full overflow-x-auto scrollbar-thin">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-[#F1F5F9] font-bold text-[12px] font-manrope uppercase tracking-wider text-[#64748B] bg-white">
                <th className="py-4 px-8">Recent chats</th>
                <th className="py-4 px-6 whitespace-nowrap">Number</th>
                <th className="py-4 px-6">Tone</th>
                <th className="py-4 px-6">Intent</th>
                <th className="py-4 px-8 whitespace-nowrap">Pricing discussed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] bg-white">
              {filteredChats.length > 0 ? (
                filteredChats.map((chat) => (
                  <tr
                    key={chat.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-4 px-8">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 shadow-sm ${chat.avatarColor}`}
                        >
                          {chat.avatarChar}
                        </div>
                        <span className="font-urbanist font-semibold text-[16px] text-[#0D1C2E]">
                          {chat.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-inter text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                      {chat.number}
                    </td>

                    <td className="py-4 px-6 font-inter text-[14px] text-[#0D1C2E] font-medium">
                      {chat.tone}
                    </td>

                    <td className="py-4 px-6 font-inter text-[14px] text-[#0D1C2E] font-medium">
                      {chat.intent}
                    </td>

                    <td className="py-4 px-8 font-inter text-[14px] text-[#0D1C2E] font-medium">
                      {chat.pricingDiscussed}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12 text-[#94A3B8] font-medium text-[14px]">
                    No chats found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
