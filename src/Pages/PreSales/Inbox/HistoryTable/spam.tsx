import { useMemo } from "react";

interface ChatItem {
    id: string;
    avatarChar: string;
    avatarColor: string;
    reason: string;
    name : string;
    source: string;
    confi: string;
    action: string;
}

interface SpamChatTableProps {
    searchQuery?: string;
}

const SpamChatTable = ({ searchQuery = "" }: SpamChatTableProps) => {
    const chats: ChatItem[] = [
        {
            id: "1",
            avatarChar: "K",
            avatarColor: "bg-gradient-to-br from-[#DCB1B1] to-[#419EF5] text-white",
            reason: "Promotional Message",
            source: "WhatsApp",
            name : "kuberan",
            confi: "98%",
            action: "Blocked",
        },
        {
            id: "2",
            avatarChar: "N",
            avatarColor: "bg-gradient-to-br from-[#AEA14C] to-[#F5E941] text-white",
            reason: "Irrelevant Query",
            source: "SMS",
            name : "viswa",
            confi: "98%",
            action: "Ignored",
        },
        {
            id: "3",
            avatarChar: "R",
            avatarColor: "bg-gradient-to-br from-[#6C86C9] to-[#0B4984] text-white",
            reason: "Fake Information",
            source: "WhatsApp",
            name : "pradeep",
            confi: "98%",
            action: "Blocked",
        },
        {
            id: "4",
            avatarChar: "H",
            avatarColor: "bg-gradient-to-br from-[#3599AD] to-[#41F2F5] text-white",
            reason: "Spam Content",
            name : "sivamani",
            source: "Email",
            confi: "98%",
            action: "Removed",
        },
    ];

    const filteredChats = useMemo(() => {
        return chats.filter((chat) => {
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                chat.reason.toLowerCase().includes(query) ||
                chat.source.toLowerCase().includes(query) ||
                chat.confi.toLowerCase().includes(query) ||
                chat.action.toLowerCase().includes(query);
            return matchesSearch;
        });
    }, [searchQuery]);

    return (
        <div className="BoxStyle overflow-hidden p-0!">
            <div className="w-full overflow-x-auto scrollbar-thin">
                <table className="w-full border-collapse text-left">
                    <thead>
                        <tr className="border-b border-[#EDF3FD] font-semibold text-[14px]  uppercase tracking-wider text-[#64748B] bg-white">
                            <th className="py-4 px-8 whitespace-nowrap">Recent chats</th>
                            <th className="py-4 px-6 whitespace-nowrap">Reason</th>
                            <th className="py-4 px-6 whitespace-nowrap">Source</th>
                            <th className="py-4 px-6 whitespace-nowrap">Confidence</th>
                            <th className="py-4 px-8 whitespace-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] bg-white">
                        {filteredChats.length > 0 ? (
                            filteredChats.map((chat) => (
                                <tr key={chat.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="py-4 px-8 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center font-bold text-[14px] shrink-0 shadow-sm ${chat.avatarColor}`}>
                                                {chat.avatarChar}
                                            </div>
                                            <div className=" text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">{chat.name}</div>

                                        </div>
                                    </td>

                                    <td className="py-4 px-6  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.reason}
                                    </td>

                                    <td className="py-4 px-6  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.source}
                                    </td>

                                    <td className="py-4 px-6  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.confi}
                                    </td>

                                    <td className="py-4 px-8  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.action}
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
    );
};

export default SpamChatTable;