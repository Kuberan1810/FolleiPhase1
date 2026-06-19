import React from 'react';

export interface Ticket {
    id: string;
    subject: string;
    category: string;
    customerName: string;
    customerEmail: string;
    customerInitials: string;
    priority: 'Critical' | 'Medium' | 'Low';
    status: 'New' | 'In Progress' | 'Waiting' | 'Resolved' | 'Closed';
    created: string;
    createdAtTimestamp: number;
    viewSource?: 'table' | 'grid';
}

interface TicketTableProps {
    tickets: Ticket[];
    onTicketClick?: (ticket: Ticket) => void;
}

const getPriorityStyle = (priority: Ticket['priority']) => {
    switch (priority) {
        case 'Critical':
            return { text: '#B91C1C', bg: '#FFF6F6' };
        case 'Medium':
            return { text: '#F6810C', bg: '#FFF8F2' };
        case 'Low':
            return { text: '#02882C', bg: '#F0FFF5' };
        default:
            return { text: '#4B5563', bg: '#F3F4F6' };
    }
};

const getStatusStyle = (status: Ticket['status']) => {
    switch (status) {
        case 'New':
            return { text: '#4744E5' };
        case 'In Progress':
            return { text: '#F6810C' };
        case 'Waiting':
            return { text: '#CBC706' };
        case 'Resolved':
            return { text: '#02882C' }
        case 'Closed':
            return { text: '#767587' };
        default:
            return { text: '#4B5563' };
    }
};

const TicketTable: React.FC<TicketTableProps> = ({ tickets, onTicketClick }) => {
    return (
        <div className="bg-white rounded-[16px] overflow-visible border border-[#F3F4F6] shadow-[0_4px_20px_rgba(237,243,253,0.4)]">
            <div className="overflow-x-auto scrollbar-thin">
                <table className="w-full min-w-[900px] border-collapse text-left">
                    <thead>
                        <tr className="bg-[#FAFBFF] border-b border-[#F3F4F6] h-[52px]">
                            <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap">
                                Ticket ID
                            </th>
                            <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap">
                                Subject
                            </th>
                            <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap text-center">
                                Customer
                            </th>
                            <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap text-center">
                                Priority
                            </th>
                            <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap text-center">
                                Status
                            </th>
                            <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap text-center">
                                Created
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EDF3FD]">
                        {tickets.length > 0 ? (
                            tickets.map((ticket) => {
                                const priorityStyle = getPriorityStyle(ticket.priority);
                                const statusStyle = getStatusStyle(ticket.status);
                                return (
                                    <tr
                                        key={`${ticket.id}-${ticket.status}-${ticket.createdAtTimestamp}`}
                                        onClick={() => onTicketClick && onTicketClick(ticket)}
                                        className="hover:bg-slate-50/60 transition-colors group cursor-pointer h-[72px]"
                                    >
                                        {/* Ticket ID */}
                                        <td className="px-6 py-3 whitespace-nowrap text-[14px] text-[#111827] font-medium">
                                            #{ticket.id}
                                        </td>

                                        {/* Subject */}
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex flex-col justify-center">
                                                <h4 className="font-semibold text-[14px] text-[#111827] leading-tight">
                                                    {ticket.subject}
                                                </h4>
                                                <span className="text-[12px] font-medium text-[#6B7280] leading-tight mt-0.5">
                                                    {ticket.category}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Customer */}
                                        <td className="px-6 py-3 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-3">
                                                <div
                                                    className="w-[32px] h-[32px] rounded-full flex items-center justify-center font-medium text-[13px] shrink-0 bg-[#F4F3FF] text-[#07006C]"
                                                >
                                                    {ticket.customerInitials}
                                                </div>
                                                <div className="min-w-0 flex flex-col justify-center text-left">
                                                    <h4 className="font-semibold text-[14px] text-[#111827] leading-tight">
                                                        {ticket.customerName}
                                                    </h4>
                                                    <span className="font-medium text-[12px] text-[#6B7280] leading-tight">
                                                        {ticket.customerEmail}
                                                    </span>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Priority */}
                                        <td className="px-6 py-3 whitespace-nowrap text-center">
                                            <span
                                                className="font-medium text-[14px] rounded-[12px] px-2 inline-block"
                                                style={{ color: priorityStyle.text, backgroundColor: priorityStyle.bg }}
                                            >
                                                {ticket.priority}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-3 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-1.5">
                                                <span
                                                    className="w-1.5 h-1.5 rounded-full"
                                                />
                                                <span
                                                    className="font-bold text-[14px] items-center justify-center"
                                                    style={{ color: statusStyle.text }}
                                                >
                                                    {ticket.status}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Created */}
                                        <td className="px-6 py-3 whitespace-nowrap text-[14px] text-[#000000] text-center">
                                            {ticket.created}
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                                    No tickets matching current filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketTable;
