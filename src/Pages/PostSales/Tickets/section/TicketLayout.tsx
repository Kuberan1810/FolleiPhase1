import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import TicketHeader from './TicketHeader';
import TicketStats from './TicketStats';
import TicketTable, { type Ticket } from './TicketTable';
import TicketGridView from './TicketGridView';
import { TicketDetail } from './TicketDetail';

const ticketsList: Ticket[] = [
    {
        "id": "TK-8892",
        "subject": "API connectivity issue",
        "category": "Product & Usage",
        "customerName": "James Miller",
        "customerEmail": "james32@gmail.com",
        "customerInitials": "JM",
        "priority": "Critical",
        "status": "In Progress",
        "created": "2 mins ago",
        "createdAtTimestamp": 1781938800000
    },
    {
        "id": "TK-8891",
        "subject": "Data mismatch in Q3 report",
        "category": "Billing & Subscription",
        "customerName": "Ananya Rao",
        "customerEmail": "ananya62@gmail.com",
        "customerInitials": "AR",
        "priority": "Medium",
        "status": "New",
        "created": "2 mins ago",
        "createdAtTimestamp": 1781938700000
    },
    {
        "id": "TK-8890",
        "subject": "Password reset loop",
        "category": "Account & Access",
        "customerName": "Meera Nair",
        "customerEmail": "meera34@gmail.com",
        "customerInitials": "MN",
        "priority": "Low",
        "status": "Waiting",
        "created": "1 hour ago",
        "createdAtTimestamp": 1781935200000
    },
    {
        "id": "TK-8892",
        "subject": "API connectivity issue",
        "category": "Product & Usage",
        "customerName": "James Miller",
        "customerEmail": "james32@gmail.com",
        "customerInitials": "JM",
        "priority": "Critical",
        "status": "Resolved",
        "created": "2 mins ago",
        "createdAtTimestamp": 1781938600000
    },
    {
        "id": "TK-8890",
        "subject": "Password reset loop",
        "category": "Account & Access",
        "customerName": "Meera Nair",
        "customerEmail": "meera34@gmail.com",
        "customerInitials": "MN",
        "priority": "Low",
        "status": "Closed",
        "created": "1 day ago",
        "createdAtTimestamp": 1781852400000
    }
];

const TicketLayout: React.FC = () => {
    const [showStats, setShowStats] = useState(true);
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedPriorities, setSelectedPriorities] = useState<string[]>([]);
    const [selectedTicketTypes, setSelectedTicketTypes] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<'Newest' | 'Priority' | 'Subject'>('Newest');
    const [viewType, setViewType] = useState<'list' | 'grid'>('list');
    const [groupByOption, setGroupByOption] = useState<'Status' | 'Priority' | 'Ticket Type' | 'Product Plan'>('Status');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showRowsDropdown, setShowRowsDropdown] = useState(false);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedStatuses, selectedPriorities, selectedTicketTypes, viewType]);

    const handleExportCSV = () => {
        const headers = ['Ticket ID', 'Subject', 'Category', 'Customer Name', 'Customer Email', 'Priority', 'Status', 'Created'];
        const rows = filteredTickets.map(t => [
            t.id,
            t.subject,
            t.category,
            t.customerName,
            t.customerEmail,
            t.priority,
            t.status,
            t.created
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `ticket_export_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredTickets = ticketsList.filter(t => {
        const matchesSearch =
            t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(t.status);
        const matchesPriority = selectedPriorities.length === 0 || selectedPriorities.includes(t.priority);
        const matchesTicketType = selectedTicketTypes.length === 0 || selectedTicketTypes.includes(t.category);

        return matchesSearch && matchesStatus && matchesPriority && matchesTicketType;
    }).sort((a, b) => {
        if (sortOption === 'Subject') {
            return a.subject.localeCompare(b.subject);
        }
        if (sortOption === 'Priority') {
            const rank = { Critical: 3, Medium: 2, Low: 1 };
            return rank[b.priority] - rank[a.priority];
        }
        return b.createdAtTimestamp - a.createdAtTimestamp;
    });

    const openCount = ticketsList.filter(t => t.status !== 'Closed' && t.status !== 'Resolved').length;
    const criticalCount = ticketsList.filter(t => t.priority === 'Critical').length;

    const totalPages = Math.max(1, Math.ceil(filteredTickets.length / rowsPerPage));
    const activePage = Math.min(currentPage, totalPages);
    const startIndex = (activePage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedTickets = filteredTickets.slice(startIndex, endIndex);

    if (selectedTicket) {
        return (
            <div className="min-h-screen  pb-12 px-6 pt-4">
                <TicketDetail
                    ticket={selectedTicket}
                    onBack={() => setSelectedTicket(null)}
                />
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-12">
            {/* Header and Controls */}
            <TicketHeader
                searchQuery={searchQuery}
                selectedStatuses={selectedStatuses}
                selectedPriorities={selectedPriorities}
                selectedTicketTypes={selectedTicketTypes}
                onApplyFilters={(filters) => {
                    setSearchQuery(filters.search);
                    setSelectedStatuses(filters.statuses);
                    setSelectedPriorities(filters.priorities);
                    setSelectedTicketTypes(filters.ticketTypes);
                }}
                sortOption={sortOption}
                setSortOption={setSortOption}
                viewType={viewType}
                setViewType={setViewType}
                groupByOption={groupByOption}
                setGroupByOption={setGroupByOption}
                onExport={handleExportCSV}
            />

            {/* Stats Cards Section */}
            {viewType === 'list' && showStats && (
                <TicketStats
                    onClose={() => setShowStats(false)}
                    openCount={openCount}
                    criticalCount={criticalCount}
                />
            )}

            {/* Main Listing Section */}
            <div className="w-full">
                {viewType === 'list' ? (
                    <>
                        <TicketTable
                            tickets={paginatedTickets}
                            onTicketClick={(ticket) => setSelectedTicket(ticket)}
                        />

                        {/* Pagination Controls */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4">
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => activePage > 1 && setCurrentPage(activePage - 1)}
                                    disabled={activePage === 1}
                                    className={`w-8 h-8 rounded-lg border border-[#F3F4FC] flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer ${activePage === 1 ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setCurrentPage(p)}
                                        className={`w-8 h-8 rounded-lg font-bold text-sm cursor-pointer transition-colors ${p === activePage
                                            ? 'bg-[#004370] text-white'
                                            : 'hover:bg-slate-50 text-slate-600'
                                            }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    onClick={() => activePage < totalPages && setCurrentPage(activePage + 1)}
                                    disabled={activePage === totalPages}
                                    className={`w-8 h-8 rounded-lg border border-[#F3F4FC] flex items-center justify-center text-slate-500 hover:bg-slate-50 cursor-pointer ${activePage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                >
                                    &gt;
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-slate-500 text-sm relative">
                                <span>Rows per page:</span>
                                <button
                                    onClick={() => setShowRowsDropdown(!showRowsDropdown)}
                                    className="flex items-center gap-1 bg-white border border-slate-100 px-2.5 py-1.5 rounded-lg font-semibold text-slate-700 cursor-pointer"
                                >
                                    {rowsPerPage} <ChevronDown className="w-3.5 h-3.5" />
                                </button>
                                {showRowsDropdown && (
                                    <div className="absolute right-0 bottom-full mb-1 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 min-w-[60px] flex flex-col">
                                        {[5, 10, 20].map((option) => (
                                            <button
                                                key={option}
                                                onClick={() => {
                                                    setRowsPerPage(option);
                                                    setCurrentPage(1);
                                                    setShowRowsDropdown(false);
                                                }}
                                                className={`px-3 py-1.5 text-xs text-left hover:bg-slate-50 cursor-pointer font-medium ${option === rowsPerPage
                                                    ? 'bg-[#E6F2FF] text-[#007BFF] font-semibold'
                                                    : 'text-slate-700'
                                                    }`}
                                            >
                                                {option}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <TicketGridView
                        tickets={filteredTickets}
                        groupByOption={groupByOption}
                        onTicketClick={(ticket) => setSelectedTicket(ticket)}
                    />
                )}
            </div>
        </div>
    );
};

export default TicketLayout;
