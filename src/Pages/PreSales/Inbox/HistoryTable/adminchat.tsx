import { useMemo } from "react";

interface ChatItem {
    id: string;
    avatarChar: string;
    avatarColor: string;
    AssignedTo: string;
    Reason: string;
    priority: string;
    status: string;
}

interface AdminChatTableProps {
    searchQuery?: string;
}

const AdminChatTable = ({ searchQuery = "" }: AdminChatTableProps) => {
    const chats: ChatItem[] = [
        {
            id: "1",
            avatarChar: "K",
            avatarColor: "bg-gradient-to-br from-[#DCB1B1] to-[#419EF5] text-white",
            AssignedTo: "Raleni",
            Reason: "Pricing Discussion",
            priority: "High",
            status: "In Progress",
        },
        {
            id: "2",
            avatarChar: "N",
            avatarColor: "bg-gradient-to-br from-[#AEA14C] to-[#F5E941] text-white",
            AssignedTo: "Roxaze",
            Reason: "Demo Request",
            priority: "High",
            status: "In Progress",
        },
        {
            id: "3",
            avatarChar: "R",
            avatarColor: "bg-gradient-to-br from-[#6C86C9] to-[#0B4984] text-white",
            AssignedTo: "Raleni",
            Reason: "Custom Requirement",
            priority: "Medium",
            status: "In Progress",
        },
        {
            id: "4",
            avatarChar: "H",
            avatarColor: "bg-gradient-to-br from-[#3599AD] to-[#41F2F5] text-white",
            AssignedTo: "Raleni",
            Reason: "Enterprise Query",
            priority: "High",
            status: "In Progress",
        },
    ];

    const filteredChats = useMemo(() => {
        return chats.filter((chat) => {
            const matchesSearch =
                chat.AssignedTo.includes(searchQuery) ||
                chat.Reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
                chat.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
                chat.status.toLowerCase().includes(searchQuery.toLowerCase());
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
                            className="border-b border-[#F1F5F9] font-bold text-[12px] font-manrope uppercase tracking-wider text-[#64748B] bg-white">
                            <th className="py-4 px-8 whitespace-nowrap">Recent chats</th>
                            <th className="py-4 px-6 whitespace-nowrap">Assigned To</th>
                            <th className="py-4 px-6 whitespace-nowrap">Reason</th>
                            <th className="py-4 px-6 whitespace-nowrap">Priority</th>
                            <th className="py-4 px-8 whitespace-nowrap">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9] bg-white">
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

                                    <td className="py-4 px-6 font-inter text-[16px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.AssignedTo}
                                    </td>

                                    <td className="py-4 px-6 font-inter text-[14px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.Reason}
                                    </td>

                                    <td className="py-4 px-6 font-inter text-[14px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.priority}
                                    </td>

                                    <td className="py-4 px-8 font-inter text-[14px] text-[#0D1C2E] font-medium whitespace-nowrap">
                                        {chat.status}
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
export default AdminChatTable