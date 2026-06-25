import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
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
    const rowsDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedStatuses, selectedPriorities, selectedTicketTypes, viewType]);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (rowsDropdownRef.current && !rowsDropdownRef.current.contains(e.target as Node)) {
                setShowRowsDropdown(false);
            }
        };
        if (showRowsDropdown) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showRowsDropdown]);

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

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) {
                pages.push('ellipsis-start');
            }
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }
            if (currentPage < totalPages - 2) {
                pages.push('ellipsis-end');
            }
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    if (selectedTicket) {
        return (
            <div className="min-h-screen">
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

                        {/* Table Pagination Footer */}
                        <div className="flex items-center justify-between mt-6 w-full px-2">
                            {/* Pagination Left */}
                            <div className="flex items-center gap-1.5">
                                {/* Previous Button */}
                                <button
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] transition-colors bg-white ${currentPage === 1 ? 'opacity-40 cursor-not-allowed text-slate-300' : 'hover:bg-slate-50 text-slate-500 cursor-pointer'
                                        }`}
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {/* Page numbers */}
                                {getPageNumbers().map((page, idx) => {
                                    if (typeof page === 'string') {
                                        return (
                                            <span key={`ellipsis-${idx}`} className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">
                                                ...
                                            </span>
                                        );
                                    }
                                    return (
                                        <button
                                            key={`page-${page}`}
                                            onClick={() => setCurrentPage(page)}
                                            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors font-medium text-sm cursor-pointer ${currentPage === page
                                                ? 'bg-[#0F365C] text-white font-semibold'
                                                : 'bg-white text-slate-500 border border-[#E2E8F0] hover:bg-slate-50'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                {/* Next Button */}
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg border border-[#E2E8F0] transition-colors bg-white ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed text-slate-300' : 'hover:bg-slate-50 text-slate-500 cursor-pointer'
                                        }`}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Rows per page Right */}
                            <div className="flex items-center gap-2" ref={rowsDropdownRef}>
                                <span className="text-[13px] text-slate-500 font-medium">Rows per page:</span>
                                <div className="relative">
                                    <button
                                        onClick={() => setShowRowsDropdown(!showRowsDropdown)}
                                        className="flex items-center justify-between gap-1.5 border border-[#E2E8F0] px-3 py-1.5 rounded-lg text-[13px] font-semibold text-[#0F365C] hover:bg-slate-50 transition-colors bg-white cursor-pointer"
                                    >
                                        <span>{rowsPerPage}</span>
                                        <ChevronDown className="w-4 h-4 text-slate-400" />
                                    </button>
                                    {showRowsDropdown && (
                                        <div className="absolute bottom-full right-0 mb-1.5 z-50 bg-white border border-[#E2E8F0] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.08)] py-1 min-w-[70px] flex flex-col">
                                            {[5, 10, 20, 50].map((val) => (
                                                <button
                                                    key={val}
                                                    onClick={() => {
                                                        setRowsPerPage(val);
                                                        setCurrentPage(1);
                                                        setShowRowsDropdown(false);
                                                    }}
                                                    className={`px-3 py-1.5 text-left text-[13px] font-medium transition-colors hover:bg-slate-50 cursor-pointer ${rowsPerPage === val ? 'text-[#0F365C] font-semibold bg-slate-50/50' : 'text-slate-600'
                                                        }`}
                                                >
                                                    {val}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
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
