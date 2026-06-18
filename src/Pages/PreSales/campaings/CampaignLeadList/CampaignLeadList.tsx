import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PauseCircle, Trash, ArrowDown2 } from 'iconsax-react';
import { ChevronLeft } from 'lucide-react';
import CampaignLeadTable from './section/CampaignLeadTable';

export default function CampaignLeadList() {
  const [sortBy, setSortBy] = React.useState('Newest');
  const [sortOpen, setSortOpen] = React.useState(false);
  const navigate = useNavigate();

  const [filterOpen, setFilterOpen] = React.useState(false);
  const [selectedStatuses, setSelectedStatuses] = React.useState<string[]>([]);
  const [revenueRange, setRevenueRange] = React.useState<[number, number]>([0, 100000]);
  const [searchFilter, setSearchFilter] = React.useState('');
  const filterRef = React.useRef<HTMLDivElement>(null);
  
  const [statusDropdownOpen, setStatusDropdownOpen] = React.useState(false);
  const allStatuses = ['Converted', 'Demo Requested', 'Proposal Sent'];
  
  // State for actually applied filters
  const [appliedFilters, setAppliedFilters] = React.useState({
    search: '',
    statuses: [] as string[],
    revenue: [0, 100000] as [number, number]
  });

  // Close on outside click
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setFilterOpen(false);
      }
    };
    if (filterOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [filterOpen]);

  const removeStatus = (s: string) => setSelectedStatuses(prev => prev.filter(x => x !== s));

  return (
    <div className="w-full" style={{ }}>
      {/* ── HEADER ROW ── */}
      <div className="flex items-start justify-between mb-6 w-full">

        {/* Left: back + title + pill + date */}
        <div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
            >
              <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
            </button>
            <h1 style={{
              fontWeight: 700, fontSize: '32px',
              lineHeight: '40px', letterSpacing: '-0.32px', color: '#0F172A'
            }}>GrowthX</h1>
          </div>
          <div className="flex items-center gap-2 mt-1 ml-8">
            <span style={{
              fontWeight: 700, fontSize: '14px',
              lineHeight: '20px', color: '#2563EB',
              backgroundColor: '#EFF6FF', borderRadius: '9999px', padding: '2px 10px'
            }}>Active</span>
            <span style={{
              fontWeight: 400, fontSize: '12px',
              lineHeight: '16px', color: '#464555'
            }}>Started Oct 12, 2026</span>
          </div>
        </div>

        {/* Right: Filter + Sort + Pause + Trash */}
        <div className="flex items-center gap-3">

          {/* Filter button */}
          <div className="relative" ref={filterRef}>
            <div
              className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[8px] px-3 h-[32px] flex items-center gap-1 cursor-pointer"
              onClick={() => setFilterOpen(!filterOpen)}
            >
              <span style={{ color: '#0F172A', fontSize: '14px', fontWeight: 400 }}>Filter</span>
              <ArrowDown2 size="14" color="#0F172A" variant="Linear" />
            </div>

            {/* ── FILTER DROPDOWN ── */}
            {filterOpen && (
              <div className="absolute right-0 top-[38px] z-50 bg-white rounded-[16px] overflow-hidden"
                style={{
                  width: '360px',
                  boxShadow: '0px 8px 32px 0px #00000020',
                  border: '1px solid #E2E8F0'
                }}>

                {/* Header */}
                <div className="flex items-center justify-between px-5 pt-5 pb-4">
                  <span style={{ fontWeight:700, fontSize:'20px', lineHeight:'28px', color:'#0F172A' }}>
                    Filters
                  </span>
                  <span
                    className="cursor-pointer text-[#64748B] hover:text-[#0F172A]"
                    style={{ fontSize: '18px', lineHeight: 1 }}
                    onClick={() => setFilterOpen(false)}
                  >✕</span>
                </div>

                {/* Search input */}
                <div className="px-5 pb-4">
                  <div className="flex items-center gap-2 border border-[#E2E8F0] rounded-[8px] px-3 py-2">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="8" cy="8" r="5.5" stroke="#94A3B8" strokeWidth="1.5"/>
                      <path d="M13 13l2.5 2.5" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search campaign name or ID..."
                      value={searchFilter}
                      onChange={e => setSearchFilter(e.target.value)}
                      className="flex-1 outline-none bg-transparent"
                      style={{ fontWeight:400, fontSize:'14px', lineHeight:'100%', color:'#0F172A' }}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #F1F5F9' }} />

                {/* Status section */}
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <span style={{ fontWeight:600, fontSize:'14px', lineHeight:'20px', color:'#1E293B' }}>
                      Status
                    </span>
                    <span style={{ fontWeight:500, fontSize:'12px', lineHeight:'16px', color:'#64748B' }}>
                      {selectedStatuses.length} selected
                    </span>
                  </div>

                  {/* Tag chips row */}
                  <div className="relative">
                    <div 
                      className="flex items-center gap-2 flex-wrap border border-[#E2E8F0] rounded-[8px] px-3 py-2 min-h-[40px] cursor-pointer"
                      onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    >
                      {selectedStatuses.length === 0 && (
                        <span style={{ fontWeight:400, fontSize:'14px', color:'#94A3B8' }}>Select status...</span>
                      )}
                      {selectedStatuses.map(s => (
                        <span key={s} className="flex items-center gap-1 px-2 py-1 rounded-[6px]"
                          style={{ backgroundColor: '#F3F4F6' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span style={{ fontWeight:500, fontSize:'12px', lineHeight:'19.5px', color:'#000000' }}>
                            {s}
                          </span>
                          <span
                            className="cursor-pointer ml-0.5 hover:text-red-500"
                            style={{ fontSize:'14px', color:'#64748B', lineHeight:1 }}
                            onClick={(e) => { e.stopPropagation(); removeStatus(s); }}
                          >×</span>
                        </span>
                      ))}
                      {/* Dropdown arrow */}
                      <div className="ml-auto">
                        <ArrowDown2 size="14" color="#64748B" variant="Linear" />
                      </div>
                    </div>
                    
                    {/* Status Dropdown Menu */}
                    {statusDropdownOpen && (
                      <div className="absolute top-[100%] left-0 w-full z-10 mt-1 bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg overflow-hidden">
                        {allStatuses.filter(s => !selectedStatuses.includes(s)).map(status => (
                          <div 
                            key={status}
                            className="px-4 py-2 cursor-pointer hover:bg-[#F8FBFF]"
                            style={{ fontWeight:400, fontSize:'14px', color:'#0F172A' }}
                            onClick={() => {
                              setSelectedStatuses(prev => [...prev, status]);
                              setStatusDropdownOpen(false);
                            }}
                          >
                            {status}
                          </div>
                        ))}
                        {allStatuses.filter(s => !selectedStatuses.includes(s)).length === 0 && (
                          <div className="px-4 py-2 text-center" style={{ fontSize:'14px', color:'#94A3B8' }}>
                            All statuses selected
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #F1F5F9' }} />

                {/* Revenue / POT slider */}
                <div className="px-5 py-4">
                  <span style={{ fontWeight:600, fontSize:'14px', lineHeight:'20px', color:'#1E293B' }}>
                    Revenue / POT
                  </span>

                  {/* Slider */}
                  <div className="mt-4 relative">
                    <input
                      type="range"
                      min={0}
                      max={100000}
                      step={1000}
                      value={revenueRange[1]}
                      onChange={e => setRevenueRange([revenueRange[0], Number(e.target.value)])}
                      className="w-full appearance-none h-1.5 rounded-full outline-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #004370 ${(revenueRange[0]/100000)*100}%, #004370 ${(revenueRange[1]/100000)*100}%, #E2E8F0 ${(revenueRange[1]/100000)*100}%)`,
                        accentColor: '#004370'
                      }}
                    />
                  </div>

                  {/* Range labels */}
                  <div className="flex items-center justify-between mt-2">
                    <span style={{ fontWeight:500, fontSize:'12px', lineHeight:'16px', color:'#0F172A' }}>
                      ₹{(revenueRange[0]/1000).toFixed(0)}k
                    </span>
                    <span style={{ fontWeight:500, fontSize:'12px', lineHeight:'16px', color:'#0F172A' }}>
                      ₹{(revenueRange[1]/1000).toFixed(0)}k
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #F1F5F9' }} />

                {/* Footer buttons */}
                <div className="flex items-center justify-between px-5 py-4">
                  <button
                    className="cursor-pointer bg-transparent border-none"
                    style={{ fontWeight:500, fontSize:'14px', color:'#999999' }}
                    onClick={() => {
                      setSelectedStatuses([]);
                      setRevenueRange([0, 100000]);
                      setSearchFilter('');
                      setAppliedFilters({ search: '', statuses: [], revenue: [0, 100000] });
                      setFilterOpen(false);
                    }}
                  >
                    Clear All
                  </button>
                  <button
                    className="flex items-center justify-center rounded-[8px] cursor-pointer"
                    style={{
                      backgroundColor: '#004370',
                      padding: '10px 20px', fontWeight:700, fontSize:'12px',
                      lineHeight:'100%', color:'#FFFFFF', border: 'none'
                    }}
                    onClick={() => {
                      setAppliedFilters({ search: searchFilter, statuses: selectedStatuses, revenue: revenueRange });
                      setFilterOpen(false);
                    }}
                  >
                    Apply Filter ({selectedStatuses.length})
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* Sort by dropdown */}
          <div className="relative">
            <div
              className="bg-[#FFFFFF] border border-[#E2E8F0] rounded-[8px] px-3 h-[32px] flex items-center justify-between cursor-pointer w-[159px]"
              onClick={() => setSortOpen(!sortOpen)}
            >
              <div className="flex items-center gap-1">
                <span style={{ color: '#94A3B8', fontSize: '14px' }}>Sort by:</span>
                <span style={{ color: '#0F172A', fontSize: '14px', fontWeight: 500 }}>{sortBy}</span>
              </div>
              <ArrowDown2 size="14" color="#0F172A" variant="Linear" />
            </div>
            {sortOpen && (
              <div className="absolute top-[36px] left-0 z-50 bg-white border border-[#E2E8F0] rounded-[8px] w-[159px] shadow-md overflow-hidden">
                {['Newest', 'Oldest', 'Most Sent', 'Most Replies'].map((option) => (
                  <div
                    key={option}
                    className="px-3 py-2 cursor-pointer hover:bg-[#F8FBFF]"
                    style={{
                      fontSize: '14px',
                      color: sortBy === option ? '#004370' : '#0F172A',
                      fontWeight: sortBy === option ? 600 : 400
                    }}
                    onClick={() => { setSortBy(option); setSortOpen(false); }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pause + Trash */}
          <div className="flex items-center gap-3">
            <PauseCircle size="28" color="#464555" variant="Linear" />
            <Trash size="24" color="#BA1A1A" variant="Bold" />
          </div>
        </div>
      </div>

      {/* ── TABLE ── */}
      <CampaignLeadTable appliedFilters={appliedFilters} />
    </div>
  );
}
