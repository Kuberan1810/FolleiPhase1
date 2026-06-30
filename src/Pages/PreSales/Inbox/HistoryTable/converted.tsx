import { useMemo } from "react";

interface ChatItem {
    id: string;
    avatarChar: string;
    name: string;
    avatarColor: string;
    product: string;
    value: string;
    convertedDate: string;
    owner: string;
}

interface ConvertedChatTableProps {
    searchQuery?: string;
}

const ConvertedChatTable = ({ searchQuery = "" }: ConvertedChatTableProps) => {
    const chats: ChatItem[] = [
        {
            id: "1",
            avatarChar: "K",
            avatarColor: "bg-gradient-to-br from-[#DCB1B1] to-[#419EF5] text-white",
            product: "CRM Pro",
            name: "rahul",
            value: "₹25,000",
            convertedDate: "Today",
            owner: "Raleni",
        },
        {
            id: "2",
            avatarChar: "N",
            avatarColor: "bg-gradient-to-br from-[#AEA14C] to-[#F5E941] text-white",
            product: "CRM Enterprise",
            name: "Kuberan",
            value: "₹25,000",
            convertedDate: "Today",
            owner: "Raleni",
        },
        {
            id: "3",
            avatarChar: "R",
            avatarColor: "bg-gradient-to-br from-[#6C86C9] to-[#0B4984] text-white",
            product: "CRM Pro",
            name: "Harish",
            value: "₹80,000",
            convertedDate: "2 Days Ago",
            owner: "Raleni",
        },
        {
            id: "4",
            avatarChar: "H",
            avatarColor: "bg-gradient-to-br from-[#3599AD] to-[#41F2F5] text-white",
            product: "CRM Pro",
            name: "Harish",
            value: "₹80,000",
            convertedDate: "2 Days Ago",
            owner: "Raleni",
        },
    ];

    const filteredChats = useMemo(() => {
        return chats.filter((chat) => {
            const query = searchQuery.toLowerCase().trim();
            const matchesSearch =
                chat.product.toLowerCase().includes(query) ||
                chat.value.toLowerCase().includes(query) ||
                chat.convertedDate.toLowerCase().includes(query) ||
                chat.owner.toLowerCase().includes(query);
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
                            <th className="py-4 px-6 whitespace-nowrap">Product</th>
                            <th className="py-4 px-6 whitespace-nowrap">Deal Value</th>
                            <th className="py-4 px-6 whitespace-nowrap">Converted Date</th>
                            <th className="py-4 px-8 whitespace-nowrap">Owner</th>
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
                                        {chat.product}
                                    </td>

                                    <td className="py-4 px-6  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.value}
                                    </td>

                                    <td className="py-4 px-6  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.convertedDate}
                                    </td>

                                    <td className="py-4 px-8  text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.owner}
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

export default ConvertedChatTable;