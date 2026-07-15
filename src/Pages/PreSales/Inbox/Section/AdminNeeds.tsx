import { useState, useRef, useEffect } from 'react';
import { ArrowUpDown, ChevronLeft, Play, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Sort } from 'iconsax-react';
import { initialLeads } from '../../Leads/data/mockLeads';


const getInitials = (name: string): string => {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
    }
    return name.trim().charAt(0).toUpperCase();
};

const getAvatarColors = (name: string) => {
    const charCode = name.charCodeAt(0) || 0;
    const colors = [
        { bg: 'bg-[#EEF2FF]', text: 'text-[#004370]' },
        { bg: 'bg-[#ECFDF5]', text: 'text-[#065F46]' },
        { bg: 'bg-[#FFF1D7]', text: 'text-[#9A3412]' },
        { bg: 'bg-[#FDF2F8]', text: 'text-[#9D174D]' }
    ];
    return colors[charCode % colors.length];
};
interface ActivityItem {
    id: number | string;
    date: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    avatar?: string;
}

interface AllEngagementActivitiesProps {
    campaign?: {
        id: number;
        name: string;
        date: string;
        status: string;
        statusColor: string;
    };
    activities?: ActivityItem[];
    onBack?: () => void;
    setExportCallback?: (cb: (() => void) | null) => void;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
    {
        id: 1,
        date: '12 Jan, 2026',
        name: 'Sophia Miller',
        email: 'sophia.m@gmail.com',
        phone: '9874563210',
        status: 'CONVERTED',
    },
    {
        id: 2,
        date: '12 Jan, 2026',
        name: 'David Foster',
        email: 'david.f@gmail.com',
        phone: '9874563210',
        status: 'DOUBTED',
    },
    {
        id: 3,
        date: '12 Jan, 2026',
        name: 'Marcus Bennett',
        email: 'm.bennett@gmail.com',
        phone: '9874563210',
        status: 'CONVERTED',
    },
    {
        id: 4,
        date: '12 Jan, 2026',
        name: 'David Foster',
        email: 'david.f@gmail.com',
        phone: '9874563210',
        status: 'ANGRY',
    },
    {
        id: 5,
        date: '12 Jan, 2026',
        name: 'Marcus Bennett',
        email: 'm.bennett@gmail.com',
        phone: '9874563210',
        status: 'CONVERTED',
        avatar: ''
    },
    {
        id: 6,
        date: '12 Jan, 2026',
        name: 'David Foster',
        email: 'david.f@gmail.com',
        phone: '9874563210',
        status: 'ANGRY',
    },
    {
        id: 7,
        date: '12 Jan, 2026',
        name: 'Sophia Miller',
        email: 'sophia.m@gmail.com',
        phone: '9874563210',
        status: 'PRICING',
    },
    {
        id: 8,
        date: '12 Jan, 2026',
        name: 'Marcus Bennett',
        email: 'm.bennett@gmail.com',
        phone: '9874563210',
        status: 'DOUBTED',
        avatar: ''
    },
    {
        id: 9,
        date: '12 Jan, 2026',
        name: 'David Foster',
        email: 'david.f@gmail.com',
        phone: '9874563210',
        status: 'PRICING',
    },
    {
        id: 10,
        date: '12 Jan, 2026',
        name: 'Sophia Miller',
        email: 'sophia.m@gmail.com',
        phone: '9874563210',
        status: 'CONVERTED',
    }
];

interface MessageItem {
    sender: 'handle' | 'follei';
    text?: string;
    time: string;
    isAudio?: boolean;
    duration?: string;
}

const CHAT_HISTORY: Record<string, MessageItem[]> = {
    "1": [
        { sender: 'handle', text: 'Hi, I saw your website and wanted to know more about your AI-powered sales assistant.', time: '10:20 AM' },
        { sender: 'follei', text: 'Sure! Follei helps businesses automate lead qualification, follow-ups, and customer engagement through AI conversations.', time: '10:20 AM' },
        { sender: 'handle', text: 'Sounds good. Does it integrate with WhatsApp?', time: '10:20 AM' },
        { sender: 'follei', text: 'Yes, it integrates directly with WhatsApp and can handle customer inquiries automatically while escalating important conversations to your team.', time: '10:20 AM' },
        { sender: 'handle', text: "That's exactly what we're looking for. Can you explain the pricing?", time: '10:20 AM' },
        { sender: 'handle', isAudio: true, duration: '02:45', time: '10:20 AM' }
    ],
    "default": [
        { sender: 'handle', text: 'Is there a free trial for the premium features?', time: '11:15 AM' },
        { sender: 'follei', text: 'Yes! We offer a 14-day free trial with full access to all AI intelligence features. No credit card is required to sign up.', time: '11:16 AM' }
    ]
};

const AdminNeeds: React.FC<AllEngagementActivitiesProps> = ({
    campaign,
    activities,
    setExportCallback
}) => {
    const navigate = useNavigate();
    const listData = activities || MOCK_ACTIVITIES;

    const [selectedHandle, setSelectedHandle] = useState<any | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleOpenHistory = (handle: any) => {
        setSelectedHandle(handle);
        setIsDrawerOpen(true);
    };

    const handleCloseHistory = () => {
        setIsDrawerOpen(false);
    };

    const [activeStatuses, setActiveStatuses] = useState<string[]>([]);
    const [tempStatuses, setTempStatuses] = useState<string[]>([]);
    const [selectedLetter, setSelectedLetter] = useState('All');
    const [showAZPopup, setShowAZPopup] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
                setShowAZPopup(false);
            }
        };
        if (showAZPopup) {
            document.addEventListener('mousedown', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showAZPopup]);

    const [isStatusExpanded, setIsStatusExpanded] = useState(true);

    const [sortField, setSortField] = useState<'name' | 'date' | 'phone'>('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [tempSortField, setTempSortField] = useState<'name' | 'date' | 'phone' | null>('name');
    const [tempSortOrder, setTempSortOrder] = useState<'asc' | 'desc' | null>('asc');

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);
    const sortRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const openFilterPopover = () => {
        setTempStatuses([...activeStatuses]);
        setIsFilterOpen(true);
        setIsSortOpen(false);
    };
    const handleToggleTempStatus = (status: string) => {
        const upperStatus = status.toUpperCase();
        if (tempStatuses.includes(upperStatus)) {
            setTempStatuses(tempStatuses.filter(s => s !== upperStatus));
        } else {
            setTempStatuses([...tempStatuses, upperStatus]);
        }
    };

    const handleApplyFilter = () => {
        setActiveStatuses([...tempStatuses]);
        setIsFilterOpen(false);
    };

    const handleApplySort = () => {
        if (tempSortField && tempSortOrder) {
            setSortField(tempSortField);
            setSortOrder(tempSortOrder);
        }
        setIsSortOpen(false);
    };

    const statusOptions = [
        'Converted',
        'Doubted',
        'Angry',
        'Pricing'
    ];

    const filteredActivities = listData.filter(act => {
        const matchesStatus =
            activeStatuses.length === 0 ||
            activeStatuses.includes(act.status.toUpperCase());

        const matchesLetter = selectedLetter === 'All' || act.name.trim().toUpperCase().startsWith(selectedLetter);

        return matchesStatus && matchesLetter;
    });

    const sortedActivities = [...filteredActivities].sort((a, b) => {
        let valA: any = '';
        let valB: any = '';

        if (sortField === 'name') {
            valA = a.name.toLowerCase();
            valB = b.name.toLowerCase();
        } else if (sortField === 'date') {
            valA = new Date(a.date).getTime() || 0;
            valB = new Date(b.date).getTime() || 0;
        } else if (sortField === 'phone') {
            valA = a.phone || '';
            valB = b.phone || '';
        }

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    const handleExportCSV = () => {
        const headers = ['Date', 'Name', 'Email', 'Phone Number', 'Status'];
        const rows = sortedActivities.map(act => [
            act.date,
            act.name,
            act.email,
            act.phone,
            act.status
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(val => `"${String(val).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${campaign?.name ? campaign.name.replace(/\s+/g, '_') : 'admin_needs'}_leads_export.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (setExportCallback) {
            setExportCallback(() => handleExportCSV);
        }
        return () => {
            if (setExportCallback) {
                setExportCallback(null);
            }
        };
    }, [sortedActivities, setExportCallback]);

    const getStatusClass = (status: string) => {
        switch (status.toUpperCase()) {
            case 'CONVERTED':
                return 'bg-[#E4EDFF] text-[#222222]';
            case 'DOUBTED':
                return 'bg-[#FFE3C6]  text-[#222222] ';
            case 'ANGRY':
                return 'bg-[#FEE2E2]  text-[#222222]';
            case 'PRICING':
                return 'bg-[#FFE7FC]  text-[#222222]';
            default:
                return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="font-manrope animate-in fade-in slide-in-from-bottom-4 duration-500 pb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        {/* Back Button */}
                        <div className="pt-4 mb-5">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-[#464555] hover:text-[#004370] transition-all duration-300 cursor-pointer font-semibold group"
                            >
                                <ChevronLeft size={20} className="transition-transform duration-300 group-hover:-translate-x-1.5" />
                            </button>
                        </div>
                        <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">
                            Admin Needs
                        </h1>
                    </div>
                    <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">
                        Management suite for automated intelligence and data synchronization
                    </p>
                </div>

                <div className="flex items-center gap-6 px-1 relative">

                {/* Filters Dropdown */}
                <div className="relative" ref={filterRef}>
                    <button
                        onClick={isFilterOpen ? () => setIsFilterOpen(false) : openFilterPopover}
                        className="flex items-center gap-2 text-[#464555] hover:text-[#004370] font-manrope font-bold text-[12px] uppercase tracking-[1px] cursor-pointer transition-colors"
                    >
                        <Sort size={14} className="stroke-[2.5]" color="#464555" />
                        Filters
                    </button>

                    {isFilterOpen && (
                        <div className="absolute left-0 sm:left-auto sm:right-0 mt-3.5 w-[200px] bg-white z-50 font-manrope animate-in fade-in slide-in-from-top-2 duration-200 border border-slate-200 rounded-2xl p-4 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                            <div className="mb-4">
                                <div
                                    onClick={() => setIsStatusExpanded(!isStatusExpanded)}
                                    className="flex items-center gap-1.5 mb-2.5 bg-[#F6FAFF] p-3 cursor-pointer hover:bg-slate-100 transition-colors select-none"
                                >
                                    <span className="text-[#3525CD] text-[9px] select-none">
                                        {isStatusExpanded ? '▼' : '▶'}
                                    </span>
                                    <span className="text-[12px] font-bold text-[#004370] uppercase tracking-[1px]">
                                        Status
                                    </span>
                                </div>
                                {isStatusExpanded && (
                                    <div className="space-y-1.5 pl-1 animate-in fade-in slide-in-from-top-1 duration-150">
                                        {statusOptions.map(status => (
                                            <label key={status} className="flex items-center gap-2.5 py-1 px-1 cursor-pointer select-none text-[14px] font-medium text-[#0B1C30] hover:text-slate-800 transition-colors">
                                                <input
                                                    type="checkbox"
                                                    checked={tempStatuses.includes(status.toUpperCase())}
                                                    onChange={() => handleToggleTempStatus(status)}
                                                    className="accent-[#3525CD] rounded border-[#626262] w-4 h-4 cursor-pointer"
                                                />
                                                {status}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center justify-between pt-2 mt-3 border-t border-slate-100">
                                <button
                                    onClick={() => setIsFilterOpen(false)}
                                    className="py-2 text-[12px] font-bold text-[#999999] hover:text-[#004370] transition-colors cursor-pointer text-left pl-1 bg-transparent border-none"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleApplyFilter}
                                    className="py-2 px-4 text-[12px] font-bold text-white bg-[#004370] rounded-[10px] hover:bg-[#003356] transition-colors cursor-pointer text-center border-none"
                                >
                                    Apply Filter
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sort Dropdown */}
                <div className="relative" ref={sortRef}>
                    <button
                        onClick={() => setIsSortOpen(!isSortOpen)}
                        className="flex items-center gap-1.5 bg-transparent border-none text-[11px] font-bold text-[#464555] hover:text-[#004370] transition-colors cursor-pointer"
                    >
                        <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                        SORT
                    </button>

                    {isSortOpen && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setIsSortOpen(false)}
                            />

                            <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-[220px] bg-white border border-slate-200 rounded-2xl z-50 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
                                {/* Dropdown Header */}
                                <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-[#F8FAFC]">
                                    <ArrowUpDown className="w-3.5 h-3.5 text-[#004370]" />
                                    <span
                                        style={{
                                            fontFamily: 'Inter, sans-serif',
                                            fontWeight: 700,
                                            fontSize: '11px',
                                            lineHeight: '16px',
                                            letterSpacing: '0.6px',
                                            textTransform: 'uppercase',
                                            color: '#004370'
                                        }}
                                    >
                                        SORT
                                    </span>
                                </div>

                                {tempSortField && (
                                    <div
                                        className="px-4 py-2.5 flex items-center gap-2 text-slate-700 cursor-pointer hover:bg-slate-50 border-b border-slate-100/50"
                                        onClick={() => {
                                            setTempSortField(null);
                                            setTempSortOrder(null);
                                        }}
                                    >
                                        <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <span className="text-[13px] font-medium font-manrope">
                                            {tempSortField === 'name' && 'Lead Name'}
                                            {tempSortField === 'date' && 'Date'}
                                            {tempSortField === 'phone' && 'Phone Number'}
                                        </span>
                                    </div>
                                )}

                                {tempSortField && tempSortOrder && (
                                    <div
                                        className="px-4 py-2.5 flex items-center gap-2 text-slate-700 cursor-pointer hover:bg-slate-50 border-b border-slate-100/50"
                                        onClick={() => {
                                            setTempSortOrder(null);
                                        }}
                                    >
                                        <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                        <span className="text-[13px] font-medium font-manrope">
                                            {tempSortOrder === 'asc' ? 'Ascending' : 'Descending'}
                                        </span>
                                    </div>
                                )}

                                {(!tempSortField || !tempSortOrder) && (
                                    <div>
                                        <div className="bg-[#EFF6FF]/40 px-4 py-2 flex items-center gap-2 border-b border-slate-100">
                                            <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
                                                <path d="M5 8h14l-7 11z" />
                                            </svg>
                                            <span
                                                style={{
                                                    fontFamily: 'Inter, sans-serif',
                                                    fontWeight: 700,
                                                    fontSize: '11px',
                                                    lineHeight: '16px',
                                                    letterSpacing: '0.6px',
                                                    textTransform: 'uppercase',
                                                    color: '#004370'
                                                }}
                                            >
                                                CHOOSE
                                            </span>
                                        </div>

                                        <div className="py-1">
                                            {!tempSortField ? (
                                                <>
                                                    <div
                                                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                                                        onClick={() => setTempSortField('name')}
                                                    >
                                                        Lead Name
                                                    </div>
                                                    <div
                                                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                                                        onClick={() => setTempSortField('date')}
                                                    >
                                                        Date
                                                    </div>
                                                    <div
                                                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                                                        onClick={() => setTempSortField('phone')}
                                                    >
                                                        Phone Number
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div
                                                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                                                        onClick={() => setTempSortOrder('asc')}
                                                    >
                                                        Ascending
                                                    </div>
                                                    <div
                                                        className="px-8 py-2 text-[13px] font-medium font-manrope text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer transition-colors"
                                                        onClick={() => setTempSortOrder('desc')}
                                                    >
                                                        Descending
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="p-3 border-t border-slate-100 flex justify-end gap-2 bg-[#F8FAFC]">
                                    <button
                                        onClick={() => {
                                            setTempSortField(sortField);
                                            setTempSortOrder(sortOrder);
                                            setIsSortOpen(false);
                                        }}
                                        className="px-3 py-1.5 text-[12px] font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer bg-transparent border-none"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleApplySort}
                                        className="px-4 py-1.5 bg-[#004370] text-white rounded-lg text-[12px] font-semibold hover:bg-[#002D4C] transition-colors cursor-pointer border-none"
                                    >
                                        Apply
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>

            <div className="flex gap-6 items-start">
                <div className="flex-1 min-w-0 bg-white rounded-[10px] shadow-[0_4px_20px_rgba(0,0,0,0.015)] overflow-hidden">
                    <div className={`overflow-x-auto min-h-[320px] transition-all duration-200 ${showAZPopup ? 'pb-28' : ''}`}>
                        <table className="w-full text-left font-manrope">
                            <thead>
                                <tr>
                                    <th className="h-12 py-0 pl-8 pr-6 text-[12px] font-semibold text-[#434655] bg-[#F6FAFF] uppercase tracking-[1.5px] whitespace-nowrap">
                                        Date
                                    </th>
                                    <th className="h-12 py-0 px-6 bg-[#F6FAFF] relative whitespace-nowrap">
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowAZPopup(!showAZPopup);
                                            }}
                                            className="flex items-center gap-1 cursor-pointer select-none group/hdr"
                                        >
                                            <span className="text-[12px] font-semibold text-[#434655] uppercase tracking-[1.5px] group-hover/hdr:text-[#004370] transition-colors">Name</span>
                                            <div className="flex items-center gap-0.5 text-[#434655] hover:text-[#004370] transition-colors font-bold text-[11px] tracking-normal ml-2 bg-white/90 px-1.5 py-0.5 rounded border border-slate-200 shadow-sm">
                                                <span>A-Z</span>
                                                <span className="text-[8px] leading-none select-none">
                                                    {sortField === 'name' && sortOrder === 'asc' ? '▲' : sortField === 'name' && sortOrder === 'desc' ? '▼' : '▼'}
                                                </span>
                                            </div>
                                        </div>

                                        {showAZPopup && (
                                            <div
                                                ref={popupRef}
                                                onClick={(e) => e.stopPropagation()}
                                                className="absolute top-[42px] left-4 mt-1 z-50 bg-white border border-[#E2E8F0] rounded-[10px] p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] max-h-[260px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent w-16 flex flex-col items-center gap-0.5"
                                            >
                                                {['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map((letter) => (
                                                    <button
                                                        key={letter}
                                                        onClick={() => {
                                                            setSelectedLetter(letter);
                                                            setShowAZPopup(false);
                                                        }}
                                                        className={`w-10 h-8 shrink-0 flex items-center justify-center text-[13px] font-bold transition-all duration-150 cursor-pointer ${selectedLetter === letter
                                                            ? 'text-[#004370]'
                                                            : 'text-[#434655] hover:bg-slate-50 hover:text-[#004370]'
                                                            }`}
                                                    >
                                                        {letter}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </th>
                                    <th className="h-12 py-0 px-6 text-[12px] font-semibold text-[#434655] bg-[#F6FAFF] uppercase tracking-[1.5px] whitespace-nowrap">
                                        Phone Number
                                    </th>
                                    <th className="h-12 py-0 pl-6 pr-8 text-[12px] font-semibold text-[#434655] bg-[#F6FAFF] uppercase tracking-[1.5px] whitespace-nowrap">
                                        Status
                                    </th>
                                    <th className="h-12 py-0 px-6 text-[12px] font-semibold text-[#434655] bg-[#F6FAFF] uppercase tracking-[1.5px] whitespace-nowrap">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedActivities.length > 0 ? (
                                    sortedActivities.map((act) => (
                                        <tr
                                            key={act.id}
                                            onClick={() => {
                                                const lead = initialLeads.find(l => l.email.toLowerCase() === act.email.toLowerCase()) || {
                                                    id: act.id.toString(),
                                                    name: act.name,
                                                    email: act.email,
                                                    phone: act.phone,
                                                    score: 75,
                                                    temperature: 'Warm' as const,
                                                    source: 'website',
                                                    status: act.status,
                                                    addedTime: act.date,
                                                    activityTime: '1 day ago',
                                                    activityType: 'MEETING SETUP',
                                                    initials: getInitials(act.name),
                                                    bgColor: getAvatarColors(act.name).bg,
                                                    textColor: getAvatarColors(act.name).text,
                                                    company: 'Company Inc.'
                                                };
                                                navigate('/presales/leads/profile', { state: { lead } });
                                            }}
                                            className="hover:bg-slate-50/80 transition-all duration-200 cursor-pointer group"
                                        >
                                            <td className="py-4 pl-8 pr-6 text-[16px] text-[#0D1C2E] font-medium align-middle whitespace-nowrap">
                                                {act.date}
                                            </td>
                                            <td className="py-4 px-6 align-middle whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-slate-100 ${getAvatarColors(act.name).bg} ${getAvatarColors(act.name).text}`}>
                                                        {getInitials(act.name)}
                                                    </div>
                                                    <div>
                                                        <div className="text-[18px] font-semibold text-[#0D1C2E] leading-snug">
                                                            {act.name}
                                                        </div>
                                                        <div className="text-[14px] text-[#434655] font-medium leading-none mt-1">
                                                            {act.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-[14px] text-[#0D1C2E] font-medium align-middle whitespace-nowrap">
                                                {act.phone}
                                            </td>
                                            <td className="py-4 pl-6 pr-8 align-middle whitespace-nowrap">
                                                <span className={`px-2.5 py-1 rounded-[10px] text-[12px] font-semibold uppercase tracking-wider ${getStatusClass(act.status)}`}>
                                                    {act.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 align-middle whitespace-nowrap">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOpenHistory(act);
                                                    }}
                                                    className="relative text-[#23669C] hover:text-[#194E73] text-[16px] font-medium cursor-pointer border-none bg-transparent active:scale-95 transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:duration-300 after:ease-out after:bg-[#194E73]"
                                                >
                                                    History
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="py-12 text-center">
                                            <div className="flex flex-col items-center justify-center text-slate-400 gap-2">
                                                <span className="text-[16px] font-semibold text-slate-500">No records found</span>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* History Drawer */}
            <div
                className={`fixed inset-0 bg-black/40 z-[9998] transition-opacity duration-300 ${isDrawerOpen && selectedHandle ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={handleCloseHistory}
            />
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-[450px] bg-white z-[9999] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${isDrawerOpen && selectedHandle ? "translate-x-0" : "translate-x-full"}`}
            >
                {selectedHandle && (
                    <>
                        <div className="p-6 bg-white flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-[20px] font-bold shrink-0 bg-linear-to-t from-[#6C86C9] to-[#0B4984]`}>
                                {selectedHandle.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <h3 className=" font-semibold md:text-[20px] text-lg text-[#0F172A] leading-snug capitalize">
                                    {selectedHandle.name}
                                </h3>
                                <p className=" text-[14px] font-medium text-[#64748B] leading-none mt-1">
                                    {selectedHandle.email}
                                </p>
                            </div>
                            <div className="ml-auto">
                                <button
                                    onClick={handleCloseHistory}
                                    className="p-1.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer border-none bg-transparent flex items-center justify-center text-[#64748B] hover:text-[#0F172A]"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        <div className="w-full shadow-xs">
                            <hr className="border border-[#EDF3FD] m-0" />
                        </div>
                        <div className="flex-1 overflow-y-auto px-6 py-3 space-y-6 bg-slate-50/20">
                            {(CHAT_HISTORY[selectedHandle.id] || CHAT_HISTORY['default']).map((msg, idx) => {
                                const isMe = msg.sender === 'follei';
                                return (
                                    <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                                        {msg.isAudio ? (
                                            <>
                                                <div className="border border-[#EDF3FD] rounded-[10px] p-2.5 pl-3 pr-5 flex items-center gap-4 bg-[#F8FAFC] mt-2 select-none shadow-xs">
                                                    <button className="w-9 h-9 rounded-[12px] bg-[#059669] flex items-center justify-center text-white cursor-pointer hover:bg-[#059669] transition-colors border-none shrink-0 flex items-center justify-center">
                                                        <Play size={18} color="#fff" fill="#fff " />
                                                    </button>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-end gap-[3px] h-[22px] px-1">
                                                            {[4, 6, 3, 4, 7, 10, 8, 6, 5, 8, 11, 9, 7, 6, 4, 5, 7, 9, 6, 5, 9, 11, 7, 9, 6, 5, 8].map((height, i) => (
                                                                <div
                                                                    key={i}
                                                                    className="w-[4px] rounded-full"
                                                                    style={{
                                                                        height: `${height * 1.8}px`,
                                                                        backgroundColor: i % 3 === 0 ? "#34D399" : i % 3 === 1 ? "#10B981" : "#6EE7B7"
                                                                    }}
                                                                />
                                                            ))}
                                                        </div>
                                                        <div className="flex justify-between text-[10px] text-[#64748B] font-normal px-1">
                                                            <span>00:00</span>
                                                            <span>{msg.duration}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                className={`shadow-sm rounded-[16px] p-[16px] text-[14px] leading-relaxed max-w-[85%] flex flex-col gap-1 
                                                ${isMe ? 'bg-[#004370] text-white' : 'bg-[#DFF2FE] text-[#004370]'}`}
                                            >
                                                <span>{msg.text}</span>
                                                <span className={`text-[12px] font-medium font-manrope mt-1 px-1 ${isMe ? 'text-blue-100/80 self-end' : 'text-[#94A3B8] self-start'}`}>
                                                    {msg.time}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AdminNeeds;
