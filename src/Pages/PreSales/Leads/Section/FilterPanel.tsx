import React, { useState, useEffect } from 'react';
import { 
  ListFilter, 
  ChevronDown 
} from 'lucide-react';

type FilterPanelProps = {
  show: boolean;
  activeLeads: string[];
  activeStatuses: string[];
  activeSources: string[];
  activeScores: string[];
  activeCampaignStatus: string;
  activeCampaignName: string;
  onApplyFilters: (filters: {
    leads: string[];
    statuses: string[];
    sources: string[];
    scores: string[];
    campaignStatus: string;
    campaignName: string;
  }) => void;
  onCancel: () => void;
  onClearAll: () => void;
};

const LEADS_OPTIONS = [
  { id: 'all', label: 'All Leads' },
  { id: 'my', label: 'My Leads' },
  { id: 'today', label: "Today's Leads" },
  { id: 'spam', label: 'Spam Leads' },
  { id: 'unread', label: 'Unread Leads' },
  { id: 'open', label: 'Open Leads' },
  { id: 'unsubscribed', label: 'Unsubscribed Leads' }
];

const STATUS_OPTIONS = [
  { id: 'NEW INQUIRY', label: 'New Inquiry' },
  { id: 'CONTACTED', label: 'Contacted' },
  { id: 'QUALIFIED', label: 'Qualified' },
  { id: 'DEMO SCHEDULED', label: 'Demo scheduled' },
  { id: 'PROPOSAL', label: 'Proposal' },
  { id: 'NEGOTIATION', label: 'Negotiation' },
  { id: 'CONVERTED', label: 'Converted' },
  { id: 'NOT CONVERTED', label: 'Not Converted' }
];

const SOURCE_OPTIONS = [
  { id: 'website', label: 'Website' },
  { id: 'campaign', label: 'Ads' },
  { id: 'shield', label: 'Referral' },
  { id: 'external', label: 'Import' }
];

const SCORE_OPTIONS = [
  { id: 'Hot', label: 'Hot' },
  { id: 'Warm', label: 'Warm' },
  { id: 'Cold', label: 'Cold' }
];

type FilterSectionProps = {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  options: { id: string; label: string }[];
  draftValues: string[];
  onChange: (id: string) => void;
};

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  isOpen,
  onToggle,
  options,
  draftValues,
  onChange
}) => (
  <div>
    <div 
      onClick={onToggle}
      className="flex items-center gap-2 py-2.5 cursor-pointer select-none group"
    >
      {isOpen ? (
        <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
          <path d="M5 8h14l-7 11z" />
        </svg>
      ) : (
        <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      )}
      <span 
        style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.6px',
          textTransform: 'uppercase',
          color: '#004370'
        }}
      >
        {title}
      </span>
    </div>
    {isOpen && (
      <div className="pl-1 pr-1 pb-3 space-y-2.5">
        {options.map(option => {
          const checked = draftValues.includes(option.id);
          return (
            <div 
              key={option.id} 
              className="flex items-center gap-2.5 cursor-pointer text-slate-700 hover:text-slate-900 group/item"
              onClick={() => onChange(option.id)}
            >
              <div className={`w-[18px] h-[18px] rounded border flex items-center justify-center transition-colors ${
                checked 
                  ? 'bg-[#004370] border-[#004370] text-white' 
                  : 'bg-white border-slate-300'
              }`}>
                {checked && (
                  <svg className="w-2.5 h-2.5 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-[13px] font-medium leading-none font-manrope select-none">
                {option.label}
              </span>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const FilterPanel: React.FC<FilterPanelProps> = ({
  show,
  activeLeads,
  activeStatuses,
  activeSources,
  activeScores,
  activeCampaignStatus,
  activeCampaignName,
  onApplyFilters,
  onCancel,
  onClearAll
}) => {
  const [leadsOpen, setLeadsOpen] = useState(true);
  const [statusOpen, setStatusOpen] = useState(true);
  const [sourceOpen, setSourceOpen] = useState(true);
  const [scoreOpen, setScoreOpen] = useState(true);
  const [campaignOpen, setCampaignOpen] = useState(true);

  // Temporary draft state for the filters
  const [draftLeads, setDraftLeads] = useState<string[]>([]);
  const [draftStatuses, setDraftStatuses] = useState<string[]>([]);
  const [draftSources, setDraftSources] = useState<string[]>([]);
  const [draftScores, setDraftScores] = useState<string[]>([]);
  const [draftCampaignStatus, setDraftCampaignStatus] = useState('');
  const [draftCampaignName, setDraftCampaignName] = useState('');

  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [nameDropdownOpen, setNameDropdownOpen] = useState(false);

  // Sync draft state with active parent state when panel opens
  useEffect(() => {
    if (show) {
      setDraftLeads(activeLeads);
      setDraftStatuses(activeStatuses);
      setDraftSources(activeSources);
      setDraftScores(activeScores);
      setDraftCampaignStatus(activeCampaignStatus);
      setDraftCampaignName(activeCampaignName);
    }
  }, [show, activeLeads, activeStatuses, activeSources, activeScores, activeCampaignStatus, activeCampaignName]);

  if (!show) return null;

  const toggleDraftItem = (list: string[], setList: (ids: string[]) => void, id: string) => {
    if (list.includes(id)) {
      setList(list.filter(x => x !== id));
    } else {
      setList([...list, id]);
    }
  };

  const handleClear = () => {
    setDraftLeads(['all']);
    setDraftStatuses([]);
    setDraftSources([]);
    setDraftScores([]);
    setDraftCampaignStatus('');
    setDraftCampaignName('');
    onClearAll();
  };

  const handleApply = () => {
    onApplyFilters({
      leads: draftLeads,
      statuses: draftStatuses,
      sources: draftSources,
      scores: draftScores,
      campaignStatus: draftCampaignStatus,
      campaignName: draftCampaignName
    });
  };

  return (
    <div className="w-[260px] bg-white border border-slate-100 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.015)] shrink-0 select-none flex flex-col gap-1">
      {/* Filter Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-2">
        <div className="flex items-center gap-2 text-slate-800">
          <ListFilter className="w-4 h-4 text-[#004370]" />
          <span className="font-bold text-[13px] tracking-wider uppercase font-manrope text-[#004370]">Filter</span>
        </div>
        <button 
          onClick={handleClear}
          className="text-[#0A71B7] hover:text-[#004370] text-[10px] font-bold tracking-wider hover:underline transition-colors cursor-pointer"
        >
          CLEAR ALL
        </button>
      </div>

      {/* Accordion LEADS */}
      <FilterSection 
        title="Leads"
        isOpen={leadsOpen}
        onToggle={() => setLeadsOpen(!leadsOpen)}
        options={LEADS_OPTIONS}
        draftValues={draftLeads}
        onChange={(id) => toggleDraftItem(draftLeads, setDraftLeads, id)}
      />

      <div className="h-px bg-slate-50 w-full my-1" />

      {/* Accordion STATUS */}
      <FilterSection 
        title="Status"
        isOpen={statusOpen}
        onToggle={() => setStatusOpen(!statusOpen)}
        options={STATUS_OPTIONS}
        draftValues={draftStatuses}
        onChange={(id) => toggleDraftItem(draftStatuses, setDraftStatuses, id)}
      />

      <div className="h-px bg-slate-50 w-full my-1" />

      {/* Accordion SOURCE */}
      <FilterSection 
        title="Source"
        isOpen={sourceOpen}
        onToggle={() => setSourceOpen(!sourceOpen)}
        options={SOURCE_OPTIONS}
        draftValues={draftSources}
        onChange={(id) => toggleDraftItem(draftSources, setDraftSources, id)}
      />

      <div className="h-px bg-slate-50 w-full my-1" />

      {/* Accordion SCORE */}
      <FilterSection 
        title="Score"
        isOpen={scoreOpen}
        onToggle={() => setScoreOpen(!scoreOpen)}
        options={SCORE_OPTIONS}
        draftValues={draftScores}
        onChange={(id) => toggleDraftItem(draftScores, setDraftScores, id)}
      />

      <div className="h-px bg-slate-50 w-full my-1" />

      {/* Accordion CAMPAIGN */}
      <div>
        <div 
          onClick={() => setCampaignOpen(!campaignOpen)}
          className="flex items-center gap-2 py-2.5 cursor-pointer select-none group"
        >
          {campaignOpen ? (
            <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
              <path d="M5 8h14l-7 11z" />
            </svg>
          ) : (
            <svg className="w-3 h-3 fill-[#004370] text-[#004370] shrink-0" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
          <span 
            style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              fontSize: '12px',
              lineHeight: '16px',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              color: '#004370'
            }}
          >
            Campaign
          </span>
        </div>
        {campaignOpen && (
          <div className="pl-1 pr-1 pb-3 space-y-3">
            {/* Dropdown 1: Select Campaign Status */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setStatusDropdownOpen(!statusDropdownOpen);
                  setNameDropdownOpen(false);
                }}
                className="w-full bg-[#F8FAFC] border border-slate-200 text-slate-700 text-[13px] rounded-xl px-3 py-2 flex items-center justify-between cursor-pointer font-manrope font-semibold"
              >
                <span className={draftCampaignStatus ? "text-slate-700" : "text-slate-400"}>
                  {draftCampaignStatus === 'active' && 'Active'}
                  {draftCampaignStatus === 'inactive' && 'Inactive'}
                  {!draftCampaignStatus && 'Select Campaign Status'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              
              {statusDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setStatusDropdownOpen(false)} />
                  <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 overflow-hidden">
                    <div
                      onClick={() => {
                        setDraftCampaignStatus(draftCampaignStatus === 'active' ? '' : 'active');
                        setStatusDropdownOpen(false);
                      }}
                      className={`px-4 py-2 text-[13px] font-manrope font-semibold cursor-pointer hover:bg-slate-50 transition-colors ${
                        draftCampaignStatus === 'active' ? 'bg-[#EFF6FF] text-[#004370]' : 'text-slate-700'
                      }`}
                    >
                      Active
                    </div>
                    <div
                      onClick={() => {
                        setDraftCampaignStatus(draftCampaignStatus === 'inactive' ? '' : 'inactive');
                        setStatusDropdownOpen(false);
                      }}
                      className={`px-4 py-2 text-[13px] font-manrope font-semibold cursor-pointer hover:bg-slate-50 transition-colors ${
                        draftCampaignStatus === 'inactive' ? 'bg-[#EFF6FF] text-[#004370]' : 'text-slate-700'
                      }`}
                    >
                      Inactive
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Dropdown 2: Campaign Name */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setNameDropdownOpen(!nameDropdownOpen);
                  setStatusDropdownOpen(false);
                }}
                className="w-full bg-[#F8FAFC] border border-slate-200 text-slate-700 text-[13px] rounded-xl px-3 py-2 flex items-center justify-between cursor-pointer font-manrope font-semibold"
              >
                <span className={draftCampaignName ? "text-slate-700" : "text-slate-400"}>
                  {draftCampaignName === 'campaign_a' && 'Campaign A'}
                  {draftCampaignName === 'campaign_b' && 'Campaign B'}
                  {!draftCampaignName && 'Campaign Name'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              
              {nameDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setNameDropdownOpen(false)} />
                  <div className="absolute left-0 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-1.5 overflow-hidden">
                    <div
                      onClick={() => {
                        setDraftCampaignName(draftCampaignName === 'campaign_a' ? '' : 'campaign_a');
                        setNameDropdownOpen(false);
                      }}
                      className={`px-4 py-2 text-[13px] font-manrope font-semibold cursor-pointer hover:bg-slate-50 transition-colors ${
                        draftCampaignName === 'campaign_a' ? 'bg-[#EFF6FF] text-[#004370]' : 'text-slate-700'
                      }`}
                    >
                      Campaign A
                    </div>
                    <div
                      onClick={() => {
                        setDraftCampaignName(draftCampaignName === 'campaign_b' ? '' : 'campaign_b');
                        setNameDropdownOpen(false);
                      }}
                      className={`px-4 py-2 text-[13px] font-manrope font-semibold cursor-pointer hover:bg-slate-50 transition-colors ${
                        draftCampaignName === 'campaign_b' ? 'bg-[#EFF6FF] text-[#004370]' : 'text-slate-700'
                      }`}
                    >
                      Campaign B
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Cancel and Apply Buttons at the bottom */}
      <div className="flex items-center justify-end gap-4 mt-5 pt-4 border-t border-slate-100">
        <button 
          onClick={onCancel} 
          className="text-[#64748B] hover:text-slate-800 text-[13px] font-bold cursor-pointer transition-colors"
        >
          Cancel
        </button>
        <button 
          onClick={handleApply} 
          className="bg-[#004370] text-white px-4 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#003152] transition-colors cursor-pointer shadow-sm"
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
