import React, { useState, useEffect } from 'react';
import { Download, LayoutGrid, List, Flame, Phone, UserPlus, X, ChevronDown } from 'lucide-react';
import { Calendar2 } from 'iconsax-react';
import LeadsTable from './LeadsTable';
import KanbanView from './KanbanView';
import FilterPanel from './FilterPanel';
import SortDropdown from './SortDropdown';
import LeadsHeaderCard from './LeadsHeaderCard';
import { initialLeads } from '../data/mockLeads';

import type { Lead } from '../Leads';

interface HeaderCardDataItem {
  icon: any;
  iconColorClass: string;
  title: string;
  count: string | number;
  countBgClass: string;
  avatarText: string;
  avatarBgClass: string;
  avatarTextColorClass: string;
  leadName: string;
  email: string;
  badgeText: string;
  badgeBorderClass: string;
  badgeBgClass: string;
  badgeTextColorClass: string;
  description: React.ReactNode;
  fallbackLead?: Lead;
}

const headerCardsData: HeaderCardDataItem[] = [
  {
    icon: Flame,
    iconColorClass: "text-[#DC2626]",
    title: "Needs Attention",
    count: "18",
    countBgClass: "bg-[#E41E1E]",
    avatarText: "SM",
    avatarBgClass: "bg-[#F3E8FF]",
    avatarTextColorClass: "text-[#6B21A8]",
    leadName: "Sophia Miller",
    email: "sophia.m@gmail.com",
    badgeText: "Hot",
    badgeBorderClass: "border-[#FCA5A5]",
    badgeBgClass: "bg-[#FEF2F2]",
    badgeTextColorClass: "text-[#DC2626]",
    description: '"Asked pricing twice and opened proposal."',
  },
  {
    icon: Phone,
    iconColorClass: "text-[#2563EB]",
    title: "Follow Up Today",
    count: "08",
    countBgClass: "bg-[#2563EB]",
    avatarText: "MB",
    avatarBgClass: "bg-[#EEF2FF]",
    avatarTextColorClass: "text-[#004370]",
    leadName: "Marcus Bennett",
    email: "m.bennett@gmail.com",
    badgeText: "Warm",
    badgeBorderClass: "border-[#FDBA74]",
    badgeBgClass: "bg-[#FFF7ED]",
    badgeTextColorClass: "text-[#EA580C]",
    description: '"Interested in enterprise plan. Waiting for call."',
    fallbackLead: {
      id: 'temp_mb',
      name: 'Marcus Bennett',
      email: 'm.bennett@gmail.com',
      phone: '+91 98765 00002',
      score: 75,
      temperature: 'Warm',
      source: 'website',
      status: 'CONTACTED',
      addedTime: 'Today',
      activityTime: '1 hour ago',
      activityType: 'CALL LOGGED',
      initials: 'MB',
      bgColor: 'bg-[#EEF2FF]',
      textColor: 'text-[#004370]',
      company: 'Bennett Enterprise',
      notes: 'Interested in enterprise plan. Waiting for call.'
    }
  },
  {
    icon: Calendar2,
    iconColorClass: "text-[#7C3AED]",
    title: "Upcoming Demos",
    count: "03",
    countBgClass: "bg-[#A855F7]",
    avatarText: "OC",
    avatarBgClass: "bg-[#ECFDF5]",
    avatarTextColorClass: "text-[#047857]",
    leadName: "Olivia Carter",
    email: "olivia.c@gmail.com",
    badgeText: "Demo",
    badgeBorderClass: "border-[#C084FC]",
    badgeBgClass: "bg-[#FAF5FF]",
    badgeTextColorClass: "text-[#7C3AED]",
    description: (
      <>
        Demo scheduled on <span className="text-[#191C1E] font-medium text-[11px] inline">14 Jan, 2026</span>
      </>
    ),
    fallbackLead: {
      id: 'temp_oc',
      name: 'Olivia Carter',
      email: 'olivia.c@gmail.com',
      phone: '+91 98765 00003',
      score: 85,
      temperature: 'Warm',
      source: 'website',
      status: 'DEMO SCHEDULED',
      addedTime: 'Upcoming',
      activityTime: '1 day ago',
      activityType: 'MEETING SETUP',
      initials: 'OC',
      bgColor: 'bg-[#ECFDF5]',
      textColor: 'text-[#047857]',
      company: 'Carter Industries',
      notes: 'Demo scheduled on 14 Jan, 2026.'
    }
  },
  {
    icon: UserPlus,
    iconColorClass: "text-[#EA580C]",
    title: "New Leads",
    count: "01",
    countBgClass: "bg-[#F6733B]",
    avatarText: "DW",
    avatarBgClass: "bg-[#FEF3C7]",
    avatarTextColorClass: "text-[#D97706]",
    leadName: "Daniel Wilson",
    email: "daniel.w@gmail.com",
    badgeText: "New",
    badgeBorderClass: "border-[#93C5FD]",
    badgeBgClass: "bg-[#EFF6FF]",
    badgeTextColorClass: "text-[#475569]",
    description: '"Downloaded whitepaper on AI sales."',
    fallbackLead: {
      id: 'temp_dw',
      name: 'Daniel Wilson',
      email: 'daniel.w@gmail.com',
      phone: '+91 98765 00004',
      score: 90,
      temperature: 'Hot',
      source: 'campaign',
      status: 'NEW INQUIRY',
      addedTime: 'New',
      activityTime: '30 mins ago',
      activityType: 'WHATSAPP',
      initials: 'DW',
      bgColor: 'bg-[#FEF3C7]',
      textColor: 'text-[#D97706]',
      company: 'Wilson Co',
      notes: 'Downloaded whitepaper on AI sales.'
    }
  }
];

const Leadslayout: React.FC = () => {
  const [leadsList] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedScores, setSelectedScores] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  // Draft filter states for the popover/modal
  const [draftSearchQuery, setDraftSearchQuery] = useState('');
  const [draftStatuses, setDraftStatuses] = useState<string[]>([]);
  const [draftScores, setDraftScores] = useState<string[]>([]);
  const [draftSources, setDraftSources] = useState<string[]>([]);

  const [showFilters, setShowFilters] = useState(false);
  const [sortField, setSortField] = useState<'name' | 'activity' | 'budget' | 'assigned'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [draftSortField, setDraftSortField] = useState<'name' | 'activity' | 'budget' | 'assigned' | null>('name');
  const [draftSortDirection, setDraftSortDirection] = useState<'asc' | 'desc' | null>('asc');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showHighlightCards, setShowHighlightCards] = useState(true);

  useEffect(() => {
    if (showSortDropdown) {
      setDraftSortField(sortField);
      setDraftSortDirection(sortDirection);
    }
  }, [showSortDropdown, sortField, sortDirection]);

  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  // Header Style settings state
  const headerStyle = 'Multi Color';
  const categorizeBy = 'Lead Source';

  // Selected lead for detail profile view
  const [selectedLeadForProfile, setSelectedLeadForProfile] = useState<Lead | null>(null);
  const [selectedLetter, setSelectedLetter] = useState('All');

  useEffect(() => {
    if (selectedLeadForProfile) {
      console.log('Lead profile selected:', selectedLeadForProfile.name);
    }
  }, [selectedLeadForProfile]);

  const handleExportCSV = () => {
    const headers = ['Date', 'Lead Name', 'Email', 'Phone', 'Company', 'Source', 'Status', 'Score', 'Temperature', 'ActivityTime', 'ActivityType'];
    const rows = leadsList.map(l => [
      l.addedTime,
      l.name,
      l.email,
      l.phone,
      l.company || '',
      l.source,
      l.status,
      l.score,
      l.temperature,
      l.activityTime,
      l.activityType
    ]);

    const csvContent = "data:text/csv;charset=utf-8,"
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `leads_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leadsList.filter(lead => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(lead.status);
    const matchesSource = selectedSources.length === 0 || selectedSources.includes(lead.source);
    const matchesScore = selectedScores.length === 0 || selectedScores.includes(lead.temperature);
    const matchesLetter = selectedLetter === 'All' || lead.name.trim().toUpperCase().startsWith(selectedLetter.toUpperCase());

    return matchesSearch && matchesStatus && matchesSource && matchesScore && matchesLetter;
  }).sort((a, b) => {
    let comparison = 0;
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'activity') {
      comparison = (a.activityTime || '').localeCompare(b.activityTime || '');
    } else if (sortField === 'budget') {
      comparison = a.score - b.score;
    } else if (sortField === 'assigned') {
      comparison = (a.initials || '').localeCompare(b.initials || '');
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });


  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 px-6 font-manrope">
      {/* Title & Description Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pt-4">
        <div>
          <h1
            className="tracking-tight"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '36px',
              lineHeight: '44px',
              letterSpacing: '-0.72px',
              color: '#0D1C2E'
            }}
          >
            Leads Management
          </h1>
          <p
            className="mt-1"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: '24px',
              letterSpacing: '0px',
              color: '#434655'
            }}
          >
            Manage and track{' '}
            <span
              className="cursor-pointer hover:underline font-bold text-[#0A71B7]"
            >
              1,284 Leads
            </span>{' '}
            across your sales pipeline.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 self-end md:self-center">
          {/* FILTER Button with Popover */}
          <div className="relative">
            <button
              onClick={() => {
                setDraftSearchQuery(searchQuery);
                setDraftStatuses(selectedStatuses);
                setDraftScores(selectedScores);
                setDraftSources(selectedSources);
                setShowFilters(!showFilters);
              }}
              className="flex items-center gap-2 border border-[#EDF3FD] bg-white text-[#434655] font-semibold px-4 py-2 rounded-xl text-sm transition-colors cursor-pointer hover:bg-slate-50 filter-btn-trigger"
            >
              <span>Filter</span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            <FilterPanel
              show={showFilters}
              onClose={() => setShowFilters(false)}
              searchQuery={draftSearchQuery}
              onSearchChange={setDraftSearchQuery}
              selectedStatuses={draftStatuses}
              onStatusesChange={setDraftStatuses}
              selectedScores={draftScores}
              onScoresChange={setDraftScores}
              selectedSources={draftSources}
              onSourcesChange={setDraftSources}
              onApply={() => {
                setSearchQuery(draftSearchQuery);
                setSelectedStatuses(draftStatuses);
                setSelectedScores(draftScores);
                setSelectedSources(draftSources);
                setShowFilters(false);
              }}
              onClear={() => {
                setDraftSearchQuery('');
                setDraftStatuses([]);
                setDraftScores([]);
                setDraftSources([]);
                setSearchQuery('');
                setSelectedStatuses([]);
                setSelectedScores([]);
                setSelectedSources([]);
                setShowFilters(false);
              }}
            />
          </div>

          {/* SORT Button */}
          <SortDropdown
            sortField={sortField}
            sortDirection={sortDirection}
            draftSortField={draftSortField}
            draftSortDirection={draftSortDirection}
            setDraftSortField={setDraftSortField}
            setDraftSortDirection={setDraftSortDirection}
            showSortDropdown={showSortDropdown}
            setShowSortDropdown={setShowSortDropdown}
            setSortField={setSortField}
            setSortDirection={setSortDirection}
          />

          <div className="w-px h-6 bg-slate-200/80 mx-1" />

          {/* View Toggle Layout */}
          <div className="flex items-center gap-1 bg-white border border-[#EDF3FD] p-1 rounded-xl">
            <button
              onClick={() => setViewMode('list')}
              className="flex items-center justify-center transition-all cursor-pointer rounded-lg p-1.5"
              style={{
                backgroundColor: viewMode === 'list' ? '#EFF4FF' : 'transparent',
                color: viewMode === 'list' ? '#004370' : '#64748B'
              }}
            >
              <List className="w-4 h-4 shrink-0" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className="flex items-center justify-center transition-all cursor-pointer rounded-lg p-1.5"
              style={{
                backgroundColor: viewMode === 'kanban' ? '#EFF4FF' : 'transparent',
                color: viewMode === 'kanban' ? '#004370' : '#64748B'
              }}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
            </button>
          </div>

          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-[#004370] text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-[#003152] transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* 4 Cards Alert Block */}
      {viewMode === 'list' && showHighlightCards && (
        <div className="relative mb-8 pt-2">
          {/* Close button in the top right of the section */}
          <button
            onClick={() => setShowHighlightCards(false)}
            className="absolute -top-4 right-0 p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {headerCardsData.map((card, idx) => (
              <LeadsHeaderCard
                key={idx}
                icon={card.icon}
                iconColorClass={card.iconColorClass}
                title={card.title}
                count={card.count}
                countBgClass={card.countBgClass}
                avatarText={card.avatarText}
                avatarBgClass={card.avatarBgClass}
                avatarTextColorClass={card.avatarTextColorClass}
                leadName={card.leadName}
                email={card.email}
                badgeText={card.badgeText}
                badgeBorderClass={card.badgeBorderClass}
                badgeBgClass={card.badgeBgClass}
                badgeTextColorClass={card.badgeTextColorClass}
                description={card.description}
                onViewLead={() => setSelectedLeadForProfile(
                  leadsList.find(l => l.name === card.leadName) || card.fallbackLead || initialLeads[0]
                )}
              />
            ))}
          </div>
        </div>
      )}

      {/* Side-by-Side Sidebar + Content Layout */}
      <div className="flex gap-6 items-start relative">
        <div className="flex-1 min-w-0">
          {/* List Layout View */}
          {viewMode === 'list' && (
            <LeadsTable
              leads={filteredLeads}
              onLeadClick={setSelectedLeadForProfile}
              selectedLetter={selectedLetter}
              onSelectLetter={setSelectedLetter}
            />
          )}

          {/* Kanban Layout View */}
          {viewMode === 'kanban' && (
            <KanbanView
              leads={leadsList}
              onLeadClick={setSelectedLeadForProfile}
              headerStyle={headerStyle}
              categorizeBy={categorizeBy}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Leadslayout;