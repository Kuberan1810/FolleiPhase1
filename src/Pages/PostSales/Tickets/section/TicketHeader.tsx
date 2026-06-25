import React, { useState } from 'react';
import { Download, List, LayoutGrid, ChevronDown } from 'lucide-react';
import { FilterPanel } from './FilterPanel';

interface TicketHeaderProps {
    searchQuery: string;
    selectedStatuses: string[];
    selectedPriorities: string[];
    selectedTicketTypes: string[];
    onApplyFilters: (filters: {
        search: string;
        statuses: string[];
        priorities: string[];
        ticketTypes: string[];
    }) => void;
    sortOption: 'Newest' | 'Priority' | 'Subject';
    setSortOption: (sort: 'Newest' | 'Priority' | 'Subject') => void;
    viewType: 'list' | 'grid';
    setViewType: (view: 'list' | 'grid') => void;
    groupByOption: 'Status' | 'Priority' | 'Ticket Type' | 'Product Plan';
    setGroupByOption: (group: 'Status' | 'Priority' | 'Ticket Type' | 'Product Plan') => void;
    onExport: () => void;
}

const TicketHeader: React.FC<TicketHeaderProps> = ({
    searchQuery,
    selectedStatuses,
    selectedPriorities,
    selectedTicketTypes,
    onApplyFilters,
    sortOption,
    setSortOption,
    viewType,
    setViewType,
    groupByOption,
    setGroupByOption,
    onExport
}) => {
    const [showFilterPanel, setShowFilterPanel] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [showGroupDropdown, setShowGroupDropdown] = useState(false);

    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pt-4">
            <div>
                <h1 className="m-0 font-semibold text-[24px] md:text-[30px] leading-[32px] md:leading-[36px] text-[#0D1C2E]">

                    Support Ticket Intelligence
                </h1>
                <p className="m-0 font-normal text-sm md:text-base leading-[24px] md:leading-[36px] text-[#6B7280]">

                    Real time oversight of enterprise post-sale support operations and SLA health across the portfolio.
                </p>
            </div>

            {/* Action Controls */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-start md:justify-end mt-4 md:mt-0">

                {viewType === 'list' && (
                    <div className="relative">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowFilterPanel(!showFilterPanel);
                                setShowSortDropdown(false);
                                setShowGroupDropdown(false);
                            }}
                            className={`flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50 ${showFilterPanel ? 'border-[#004370] bg-[#EFF4FF]/50' : ''
                                }`}
                        >
                            <span>Filter</span>
                            <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                        </button>

                        {showFilterPanel && (
                            <div className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[1px] md:hidden" onClick={() => setShowFilterPanel(false)} />
                        )}

                        <FilterPanel
                            isOpen={showFilterPanel}
                            onClose={() => setShowFilterPanel(false)}
                            currentSearch={searchQuery}
                            currentStatuses={selectedStatuses}
                            currentPriorities={selectedPriorities}
                            currentTicketTypes={selectedTicketTypes}
                            onApply={(filters) => {
                                onApplyFilters(filters);
                                setShowFilterPanel(false);
                            }}
                        />
                    </div>
                )}

                {/* Sort Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => {
                            setShowSortDropdown(!showSortDropdown);
                            setShowFilterPanel(false);
                            setShowGroupDropdown(false);
                        }}
                        className="flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50"
                    >
                        <span>Sort by: {sortOption}</span>
                        <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                    </button>

                    {showSortDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl z-[100] py-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                            {(['Newest', 'Priority', 'Subject'] as const).map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => {
                                        setSortOption(opt);
                                        setShowSortDropdown(false);
                                    }}
                                    className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${sortOption === opt
                                        ? 'bg-[#E6F2FF] text-[#007BFF] font-semibold'
                                        : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Group By Dropdown*/}
                {viewType === 'grid' && (
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowGroupDropdown(!showGroupDropdown);
                                setShowFilterPanel(false);
                                setShowSortDropdown(false);
                            }}
                            className="flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50"
                        >
                            <span>{groupByOption}</span>
                            <ChevronDown className="w-4 h-4 text-[#6B7280]" />
                        </button>

                        {showGroupDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl z-[100] py-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                                {(['Status', 'Priority', 'Ticket Type', 'Product Plan'] as const).map((group) => (
                                    <button
                                        key={group}
                                        onClick={() => {
                                            setGroupByOption(group);
                                            setShowGroupDropdown(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm transition-colors cursor-pointer ${groupByOption === group
                                            ? 'bg-[#E6F2FF] text-[#007BFF] font-semibold'
                                            : 'text-slate-700 hover:bg-slate-50'
                                            }`}
                                    >
                                        {group}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                <div className="w-px h-6 bg-[#EDF3FD] mx-1" />

                {/* View Toggle Layout */}
                <div className="flex items-center gap-1 bg-white border border-[#EDF3FD] p-1 rounded-xl">
                    <button
                        onClick={() => setViewType('list')}
                        className={`flex items-center justify-center transition-all rounded-lg p-1.5 cursor-pointer ${viewType === 'list'
                            ? 'bg-[#EFF6FF] text-[#004370]'
                            : 'bg-transparent text-[#64748B]'
                            }`}
                        title="List View"
                    >
                        <List className="w-4 h-4 shrink-0" />
                    </button>
                    <button
                        onClick={() => setViewType('grid')}
                        className={`flex items-center justify-center transition-all rounded-lg p-1.5 cursor-pointer ${viewType === 'grid'
                            ? 'bg-[#EFF6FF] text-[#004370]'
                            : 'bg-transparent text-[#64748B]'
                            }`}
                        title="Grid View"
                    >
                        <LayoutGrid className="w-4 h-4 shrink-0" />
                    </button>
                </div>

                {/* Export Button */}
                <button
                    onClick={onExport}
                    className="flex items-center gap-2 bg-[#004370] hover:bg-[#003152] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                >
                    <Download className="w-4 h-4" />
                    Export
                </button>
            </div>
        </div>
    );
};

export default TicketHeader;
