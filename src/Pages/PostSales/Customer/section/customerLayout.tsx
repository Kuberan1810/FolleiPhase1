import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CustomerTable, { type Customer } from './CustomerTable';
import CustomerHeader from './CustomerHeader';

const mockCustomers: Customer[] = [
    {
        id: 'CUS-000124',
        name: 'Sophia Miller',
        email: 'sophia.m@gmail.com',
        initials: 'SM',
        status: 'Active',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'High',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43210',
        location: 'Bangalore, India',
        company: 'ABC Technologies',
        title: 'Senior Procurement Manager',
        activeProducts: 4
    },
    {
        id: 'CUS-000125',
        name: 'Noah Davis',
        email: 'noah03@gmail.com',
        initials: 'ND',
        status: 'Active',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'High',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43211',
        location: 'Mumbai, India',
        company: 'Nova Labs',
        title: 'VP of Technology',
        activeProducts: 3
    },
    {
        id: 'CUS-000126',
        name: 'Liam Anderson',
        email: 'anderson@gmail.com',
        initials: 'LA',
        status: 'At Risk',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'Medium',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43212',
        location: 'Delhi, India',
        company: 'Apex Partners',
        title: 'Head of Engineering',
        activeProducts: 2
    },
    {
        id: 'CUS-000127',
        name: 'Mia Thompson',
        email: 'miathompson09@gmail.com',
        initials: 'MT',
        status: 'Onboarding',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'Medium',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43213',
        location: 'Chennai, India',
        company: 'Quantum Co',
        title: 'Operations Specialist',
        activeProducts: 2
    },
    {
        id: 'CUS-000128',
        name: 'Benjamin Clark',
        email: 'ben08@gmail.com',
        initials: 'BC',
        status: 'At Risk',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'Low',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43214',
        location: 'Pune, India',
        company: 'Horizon Tech',
        title: 'Product Lead',
        activeProducts: 1
    },
    {
        id: 'CUS-000129',
        name: 'Meera Nair',
        email: 'meera04@gmail.com',
        initials: 'MN',
        status: 'Renewal Due',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'High',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43215',
        location: 'Kochi, India',
        company: 'Lumina Co',
        title: 'HR Specialist',
        activeProducts: 3
    },
    {
        id: 'CUS-000130',
        name: 'Emma Wilson',
        email: 'emmaw@gmail.com',
        initials: 'EW',
        status: 'Active',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'High',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43216',
        location: 'Hyderabad, India',
        company: 'CloudScale',
        title: 'Account Director',
        activeProducts: 4
    },
    {
        id: 'CUS-000131',
        name: 'Ananya Rao',
        email: 'ananya62@gmail.com',
        initials: 'AR',
        status: 'Onboarding',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'High',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43217',
        location: 'Bangalore, India',
        company: 'Infosys Co',
        title: 'Lead Analyst',
        activeProducts: 3
    },
    {
        id: 'CUS-000132',
        name: 'James Miller',
        email: 'james32@gmail.com',
        initials: 'JM',
        status: 'Renewal Due',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'Medium',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43218',
        location: 'Noida, India',
        company: 'HCL Tech',
        title: 'Director of Ops',
        activeProducts: 2
    },
    {
        id: 'CUS-000133',
        name: 'Marcus Bennett',
        email: 'm.bennett@gmail.com',
        initials: 'MB',
        status: 'Onboarding',
        renewalDate: 'Jan 28, 2026',
        daysRemaining: '45 days',
        usage: 'High',
        lastActivity: '2 mins ago',
        lastActivityPlatform: 'Whatsapp',
        phone: '+91 93765 43219',
        location: 'Mumbai, India',
        company: 'Reliance Corp',
        title: 'Procurement Lead',
        activeProducts: 4
    }
];

const PostSalesCustomer = () => {
    const navigate = useNavigate();
    const [customersList] = useState<Customer[]>(mockCustomers);
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(mockCustomers[0]);
    const [searchQuery] = useState('');
    const [selectedLetter, setSelectedLetter] = useState('All');
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedUsages, setSelectedUsages] = useState<string[]>([]);
    const [sortOption, setSortOption] = useState<'Newest' | 'Name'>('Newest');
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showRowsDropdown, setShowRowsDropdown] = useState(false);
    const rowsDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedStatuses, selectedUsages, selectedLetter]);

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
        const headers = ['Customer ID', 'Name', 'Email', 'Status', 'Renewal Date', 'Usage', 'Last Activity', 'Phone', 'Location', 'Company'];
        const rows = customersList.map(c => [
            c.id,
            c.name,
            c.email,
            c.status,
            c.renewalDate,
            c.usage,
            c.lastActivity,
            c.phone,
            c.location,
            c.company
        ]);

        const csvContent = "data:text/csv;charset=utf-8,"
            + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `customer_export_${Date.now()}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const filteredCustomers = customersList.filter(cust => {
        const matchesSearch =
            cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cust.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cust.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cust.id.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(cust.status);
        const matchesUsage = selectedUsages.length === 0 || selectedUsages.includes(cust.usage);
        const matchesLetter = selectedLetter === 'All' || cust.name.trim().toUpperCase().startsWith(selectedLetter.toUpperCase());

        return matchesSearch && matchesStatus && matchesUsage && matchesLetter;
    }).sort((a, b) => {
        if (sortOption === 'Name') {
            return a.name.localeCompare(b.name);
        }
        return b.id.localeCompare(a.id);
    });

    const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / rowsPerPage));
    const activePage = Math.min(currentPage, totalPages);
    const startIndex = (activePage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

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

    return (
        <div className="min-h-screen pb-12">
            {/* Header & Controls Section */}
            <CustomerHeader
                selectedStatuses={selectedStatuses}
                selectedUsages={selectedUsages}
                onApplyFilters={(filters) => {
                    setSelectedStatuses(filters.statuses);
                    setSelectedUsages(filters.usages);
                }}
                sortOption={sortOption}
                setSortOption={setSortOption}
                onExport={handleExportCSV}
            />

            <div className="flex flex-col lg:flex-row gap-6 items-start relative">
                <div className={`flex-1 min-w-0 w-full transition-all duration-300`}>
                    <CustomerTable
                        customers={paginatedCustomers}
                        selectedCustomer={selectedCustomer}
                        onCustomerClick={(cust) => {
                            setSelectedCustomer(cust);
                            navigate('/postsales/customers/profile', { state: { customer: cust } });
                        }}
                        selectedLetter={selectedLetter}
                        onSelectLetter={setSelectedLetter}
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
                </div>
            </div>
        </div>
    );
};

export default PostSalesCustomer;

