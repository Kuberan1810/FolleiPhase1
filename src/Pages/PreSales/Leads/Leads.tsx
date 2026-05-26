import React, { useState, useEffect } from 'react';
import { 
  ListFilter, 
  Download, 
  Search, 
  LayoutGrid, 
  List 
} from 'lucide-react';

import LeadsTable from './Section/LeadsTable';
import KanbanView from './Section/KanbanView';
import FilterPanel from './Section/FilterPanel';
import SortDropdown from './Section/SortDropdown';
import ViewSelector from './Section/ViewSelector';
import { initialLeads } from './data/mockLeads';
import LeadProfile from './Section/LeadProfile';

export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  initials?: string;
  bgColor?: string;
  textColor?: string;
  score: number; // 0-100
  temperature: 'Hot' | 'Warm' | 'Cold';
  source: 'website' | 'campaign' | 'shield' | 'external';
  status: 'NEW INQUIRY' | 'CONTACTED' | 'DEMO SCHEDULED';
  addedTime: string; // e.g. "12 Jan, 2026"
  activityTime: string; // e.g. "2 mins ago"
  activityType: 'WHATSAPP' | 'CALL LOGGED' | 'MEETING SETUP';
  company?: string;
  notes?: string;
};

const Leads: React.FC = () => {
  const [leadsList] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'activity' | 'budget' | 'assigned'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [draftSortField, setDraftSortField] = useState<'name' | 'activity' | 'budget' | 'assigned' | null>('name');
  const [draftSortDirection, setDraftSortDirection] = useState<'asc' | 'desc' | null>('asc');
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  useEffect(() => {
    if (showSortDropdown) {
      setDraftSortField(sortField);
      setDraftSortDirection(sortDirection);
    }
  }, [showSortDropdown, sortField, sortDirection]);

  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [selectedLeads, setSelectedLeads] = useState<string[]>(['all']);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedScores, setSelectedScores] = useState<string[]>([]);
  const [campaignStatus, setCampaignStatus] = useState('');
  const [campaignName, setCampaignName] = useState('');
  
  // Filters state
  const [showFilters, setShowFilters] = useState(false);

  // Custom Views state
  const [currentView, setCurrentView] = useState('Default View');

  // Selected lead for detail profile view
  const [selectedLeadForProfile, setSelectedLeadForProfile] = useState<Lead | null>(null);

  const handleClearAll = () => {
    setSelectedLeads(['all']);
    setSelectedStatuses([]);
    setSelectedSources([]);
    setSelectedScores([]);
    setCampaignStatus('');
    setCampaignName('');
  };

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

    return matchesSearch && matchesStatus && matchesSource && matchesScore;
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

  if (selectedLeadForProfile) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-12 font-manrope">
        <LeadProfile 
          lead={selectedLeadForProfile} 
          onBack={() => setSelectedLeadForProfile(null)} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12 font-manrope">
      
      {/* Search Input bar (Integrated top page width style) */}
      <div className="relative w-full max-w-sm mb-8">
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search leads, companies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-slate-200/80 rounded-xl text-sm font-manrope focus:outline-none focus:ring-2 focus:ring-[#004370] bg-[#EFF6FF]/20 transition-all"
        />
      </div>

      {/* Title & Description Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
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
            className="mt-2"
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
              className="cursor-pointer hover:underline"
              style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                color: '#0A71B7'
              }}
            >
              1,284 Leads
            </span>{' '}
            across your sales pipeline.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-[#004370] text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-[#003152] transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      </div>

      {/* Toolbar Options (Filters, Sort, Toggle Layout) */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          {/* FILTERS Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 bg-transparent border-none text-[11px] font-bold text-slate-600 hover:text-slate-800 transition-colors cursor-pointer"
          >
            <ListFilter className="w-3.5 h-3.5 text-slate-500" />
            FILTERS
          </button>

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
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('list')}
              className="flex items-center justify-center transition-all cursor-pointer"
              style={{
                width: '36.89px',
                height: '32px',
                borderRadius: '8px',
                padding: '8px 12px',
                backgroundColor: viewMode === 'list' ? '#EFF4FF' : 'transparent',
                color: viewMode === 'list' ? '#004370' : '#64748B'
              }}
            >
              <List className="w-4 h-4 shrink-0" />
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className="flex items-center justify-center transition-all cursor-pointer"
              style={{
                width: '36.89px',
                height: '32px',
                borderRadius: '8px',
                padding: '8px 12px',
                backgroundColor: viewMode === 'kanban' ? '#EFF4FF' : 'transparent',
                color: viewMode === 'kanban' ? '#004370' : '#64748B'
              }}
            >
              <LayoutGrid className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>

        {/* Custom View Select & Edit Button */}
        <ViewSelector 
          currentView={currentView}
          setCurrentView={setCurrentView}
          onClearAll={handleClearAll}
          setSelectedScores={setSelectedScores}
          setSelectedStatuses={setSelectedStatuses}
          setSelectedSources={setSelectedSources}
        />
      </div>

      {/* Side-by-Side Sidebar + Content Layout */}
      <div className="flex gap-6 items-start">
        <FilterPanel 
          show={showFilters}
          activeLeads={selectedLeads}
          activeStatuses={selectedStatuses}
          activeSources={selectedSources}
          activeScores={selectedScores}
          activeCampaignStatus={campaignStatus}
          activeCampaignName={campaignName}
          onApplyFilters={(filters) => {
            setSelectedLeads(filters.leads);
            setSelectedStatuses(filters.statuses);
            setSelectedSources(filters.sources);
            setSelectedScores(filters.scores);
            setCampaignStatus(filters.campaignStatus);
            setCampaignName(filters.campaignName);
          }}
          onCancel={() => setShowFilters(false)}
          onClearAll={handleClearAll}
        />

        <div className="flex-1 min-w-0">
          {/* List Layout View */}
          {viewMode === 'list' && (
            <LeadsTable 
              leads={filteredLeads}
              sortField={sortField}
              sortDirection={sortDirection}
              onSortChange={(field, direction) => {
                setSortField(field);
                setSortDirection(direction);
              }}
              onLeadClick={setSelectedLeadForProfile}
            />
          )}

          {/* Kanban Layout View */}
          {viewMode === 'kanban' && (
            <KanbanView 
              leads={filteredLeads}
              onLeadClick={setSelectedLeadForProfile}
            />
          )}
        </div>
      </div>



    </div>
  );
};

export default Leads;