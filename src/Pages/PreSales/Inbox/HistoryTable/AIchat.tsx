import { useMemo } from "react";

interface ChatItem {
    id: string;
    avatarChar: string;
    avatarColor: string;
    number: string;
    tone: string;
    intent: string;
    pricingDiscussed: string;
}

interface AiChatTableProps {
    searchQuery?: string;
}

const AiChatTable = ({ searchQuery = "" }: AiChatTableProps) => {
    const chats: ChatItem[] = [
        {
            id: "1",
            avatarChar: "K",
            avatarColor: "bg-gradient-to-br from-[#DCB1B1] to-[#419EF5] text-white",
            number: "+91 8344427271",
            tone: "Cold",
            intent: "Good",
            pricingDiscussed: "Not yet",
        },
        {
            id: "2",
            avatarChar: "N",
            avatarColor: "bg-gradient-to-br from-[#AEA14C] to-[#F5E941] text-white",
            number: "+91 7678837890",
            tone: "Warm",
            intent: "Good",
            pricingDiscussed: "Not yet",
        },
        {
            id: "3",
            avatarChar: "R",
            avatarColor: "bg-gradient-to-br from-[#6C86C9] to-[#0B4984] text-white",
            number: "+91 4578443248",
            tone: "Cold",
            intent: "Good",
            pricingDiscussed: "Not yet",
        },
        {
            id: "4",
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
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                chat.number.toLowerCase().includes(query) ||
                chat.tone.toLowerCase().includes(query) ||
                chat.intent.toLowerCase().includes(query) ||
                chat.pricingDiscussed.toLowerCase().includes(query);
            return matchesSearch;
        });
    }, [searchQuery]);
    return (
        <div className="BoxStyle overflow-hidden p-0!">
            <div className="w-full overflow-x-auto scrollbar-thin">
                <table
                    className="w-full border-collapse text-left">
                    <thead>
                        <tr
                            className="border-b border-[#EDF3FD] font-semibold text-[14px]  uppercase tracking-wider text-[#64748B] bg-white">
                            <th className="py-4 px-8 whitespace-nowrap">Recent chats</th>
                            <th className="py-4 px-6 whitespace-nowrap">Number</th>
                            <th className="py-4 px-6 whitespace-nowrap">Tone</th>
                            <th className="py-4 px-6 whitespace-nowrap">Intent</th>
                            <th className="py-4 px-8 whitespace-nowrap">Pricing discussed</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDF3FD] bg-white">
                        {filteredChats.length > 0 ? (
                            filteredChats.map((chat) => (
                                <tr
                                    key={chat.id}
                                    className="hover:bg-slate-50 transition-colors"
                                >
                                    <td className="py-4 px-8 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 shadow-sm ${chat.avatarColor}`}
                                            >
                                                {chat.avatarChar}
                                            </div>

                                        </div>
                                    </td>

                                    <td className="py-4 px-6  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.number}
                                    </td>

                                    <td className="py-4 px-6  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.tone}
                                    </td>

                                    <td className="py-4 px-6  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.intent}
                                    </td>

                                    <td className="py-4 px-8  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
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
    )
}
export default AiChatTable