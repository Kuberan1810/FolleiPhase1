import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';

export type OnboardingCustomer = {
  id: string;
  name: string;
  product: string;
  plan: 'Enterprise' | 'Professional' | 'Basic';
  adoptionScore: number;
  lastLogin: string;
  lastLoginMs: number;
  stage: 'Account Setup' | 'Data Import' | 'Training' | 'Completion';
  learningProgress: number;
  initials: string;
  avatarBg: string;
  avatarText: string;
  activationDate?: string;
  status?: 'ON TRACK' | 'AT RISK' | 'BEHIND';
};

const mockCustomers: OnboardingCustomer[] = [
  {
    id: 'CUS-101',
    name: 'Sophia Miller',
    product: 'Acme Corp',
    plan: 'Enterprise',
    adoptionScore: 88,
    lastLogin: '2 hours ago',
    lastLoginMs: Date.now() - 2 * 60 * 60 * 1000,
    stage: 'Account Setup',
    learningProgress: 80,
    initials: 'SM',
    avatarBg: '#DDEBFF',
    avatarText: '#004370',
    activationDate: 'Oct 12, 2023',
    status: 'ON TRACK'
  },
  {
    id: 'CUS-102',
    name: 'Marcus Davids',
    product: 'Global Logistics',
    plan: 'Professional',
    adoptionScore: 45,
    lastLogin: '1 day ago',
    lastLoginMs: Date.now() - 24 * 60 * 60 * 1000,
    stage: 'Data Import',
    learningProgress: 65,
    initials: 'MD',
    avatarBg: '#E0F2FE',
    avatarText: '#0369A1',
    activationDate: 'Nov 02, 2023',
    status: 'ON TRACK'
  },
  {
    id: 'CUS-103',
    name: 'Riley Wong',
    product: 'TechFlow Inc.',
    plan: 'Enterprise',
    adoptionScore: 22,
    lastLogin: '5 days ago',
    lastLoginMs: Date.now() - 5 * 24 * 60 * 60 * 1000,
    stage: 'Data Import',
    learningProgress: 40,
    initials: 'RW',
    avatarBg: '#FFE4E6',
    avatarText: '#BE123C',
    activationDate: 'Dec 15, 2023',
    status: 'AT RISK'
  },
  {
    id: 'CUS-104',
    name: 'Beth Lopez',
    product: 'Urban Design',
    plan: 'Basic',
    adoptionScore: 5,
    lastLogin: '2 weeks ago',
    lastLoginMs: Date.now() - 14 * 24 * 60 * 60 * 1000,
    stage: 'Account Setup',
    learningProgress: 25,
    initials: 'BL',
    avatarBg: '#F1F5F9',
    avatarText: '#475569',
    activationDate: 'Jan 10, 2024',
    status: 'BEHIND'
  },

];

const getPlanBadgeStyle = (plan: OnboardingCustomer['plan']) => {
  switch (plan) {
    case 'Enterprise':
      return { bg: '#D3E4FE', text: '#0B1C30' };
    case 'Professional':
      return { bg: '#DAE2FD', text: '#131B2E' };
    case 'Basic':
      return { bg: '#DBE1FF', text: '#00174B' };
  }
};


const OnboardingTable: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlans, setSelectedPlans] = useState<string[]>([]);
  const [selectedStages, setSelectedStages] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('Name');

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [showSortPanel, setShowSortPanel] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterPanel(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setShowSortPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePlanToggle = (plan: string) => {
    setSelectedPlans(prev =>
      prev.includes(plan) ? prev.filter(p => p !== plan) : [...prev, plan]
    );
    setCurrentPage(1);
  };

  const handleStageToggle = (stage: string) => {
    setSelectedStages(prev =>
      prev.includes(stage) ? prev.filter(s => s !== stage) : [...prev, stage]
    );
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSelectedPlans([]);
    setSelectedStages([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const filteredAndSortedCustomers = useMemo(() => {
    let result = [...mockCustomers];

    // Plan filter
    if (selectedPlans.length > 0) {
      result = result.filter(c => selectedPlans.includes(c.plan));
    }

    // Stage filter
    if (selectedStages.length > 0) {
      result = result.filter(c => selectedStages.includes(c.stage));
    }

    // Sort sorting
    result.sort((a, b) => {
      if (sortOption === 'Name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'AdoptionHigh') {
        return b.adoptionScore - a.adoptionScore;
      } else if (sortOption === 'AdoptionLow') {
        return a.adoptionScore - b.adoptionScore;
      } else if (sortOption === 'LearningHigh') {
        return b.learningProgress - a.learningProgress;
      } else if (sortOption === 'LoginRecent') {
        return b.lastLoginMs - a.lastLoginMs;
      }
      return 0;
    });

    return result;
  }, [searchQuery, selectedPlans, selectedStages, sortOption]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedCustomers.length / rowsPerPage));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [filteredAndSortedCustomers.length, totalPages, currentPage]);

  const activePage = Math.min(currentPage, totalPages);
  const startIndex = (activePage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCustomers = filteredAndSortedCustomers.slice(startIndex, endIndex);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pt-4">
        <div>
          <h2 className="text-[20px] font-bold text-[#191C1E]">Customer list</h2>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0">
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => {
                setShowFilterPanel(!showFilterPanel);
                setShowSortPanel(false);
              }}
              className={`flex items-center justify-center gap-2 border-[1px] border-[#C3C6D7] bg-white text-[#191C1E] px-3 py-1.5 rounded-[8px] text-[14px] transition-colors cursor-pointer hover:bg-slate-50 shadow-[0_2px_8px_rgba(237,243,253,0.3)] ${showFilterPanel || selectedPlans.length > 0 || selectedStages.length > 0
                ? 'border-[#004370] bg-[#EFF4FF]/50 text-[#004370]'
                : ''
                }`}
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
              {(selectedPlans.length > 0 || selectedStages.length > 0) && (
                <span className="ml-1 w-2 h-2 rounded-full bg-[#004370]" />
              )}
            </button>

            {showFilterPanel && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-72 max-w-[calc(100vw-32px)] bg-white border border-slate-200 rounded-2xl z-[100] p-4 shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-left sm:origin-top-right">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm">Filters</h3>
                  {(selectedPlans.length > 0 || selectedStages.length > 0) && (
                    <button
                      onClick={handleClearFilters}
                      className="text-xs text-[#004370] font-bold hover:underline"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="mt-3">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Plan</h4>
                  <div className="flex flex-wrap gap-2">
                    {['Enterprise', 'Professional', 'Basic'].map(plan => {
                      const active = selectedPlans.includes(plan);
                      return (
                        <button
                          key={plan}
                          onClick={() => handlePlanToggle(plan)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${active
                            ? 'bg-[#004370] border-[#004370] text-white'
                            : 'bg-white border-[#EDF3FD] text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                          {plan}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Onboarding Stage</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {['Account Setup', 'Data Import', 'Training', 'Completion'].map(stage => {
                      const active = selectedStages.includes(stage);
                      return (
                        <button
                          key={stage}
                          onClick={() => handleStageToggle(stage)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer text-left ${active
                            ? 'bg-[#004370] border-[#004370] text-white'
                            : 'bg-white border-[#EDF3FD] text-slate-600 hover:bg-slate-50'
                            }`}
                        >
                          {stage}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={sortRef}>
            <button
              onClick={() => {
                setShowSortPanel(!showSortPanel);
                setShowFilterPanel(false);
              }}
              className={`flex items-center justify-center gap-2 border-[1px] border-[#C3C6D7] bg-white text-[#191C1E] px-3 py-1.5 rounded-[8px] text-[14px] transition-colors cursor-pointer hover:bg-slate-50 shadow-[0_2px_8px_rgba(237,243,253,0.3)] ${showSortPanel ? 'border-[#004370] bg-[#EFF4FF]/50 text-[#004370]' : ''
                }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span>Sort</span>
            </button>

            {showSortPanel && (
              <div className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-32px)] bg-white border border-slate-200 rounded-2xl z-[100] py-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                {[
                  { label: 'Customer Name (A-Z)', value: 'Name' },
                  { label: 'Adoption Score (High to Low)', value: 'AdoptionHigh' },
                  { label: 'Adoption Score (Low to High)', value: 'AdoptionLow' },
                  { label: 'Learning Progress (Highest)', value: 'LearningHigh' },
                  { label: 'Last Login (Most Recent)', value: 'LoginRecent' }
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortOption(opt.value);
                      setShowSortPanel(false);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition-colors cursor-pointer ${sortOption === opt.value
                      ? 'bg-[#EFF4FF] text-[#004370] font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table Card container */}
      <div className="bg-white rounded-[16px] overflow-visible border border-[#F3F4F6] shadow-[0_4px_20px_rgba(237,243,253,0.4)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-center">
            <thead>
              <tr className="bg-[#FAFBFF] border-b border-[#F3F4F6] h-[52px]">
                <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap text-left">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap text-left">
                  Product Name
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap">
                  Plan
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap">
                  Adoption Score
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap">
                  Last Login
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap">
                  Stage
                </th>
                <th className="px-6 py-3 text-[12px] font-semibold text-[#222222] uppercase tracking-[0.5px] whitespace-nowrap">
                  Learning Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDF3FD]">
              {paginatedCustomers.length > 0 ? (
                paginatedCustomers.map(cust => {
                  const planStyle = getPlanBadgeStyle(cust.plan);

                  return (
                    <tr
                      key={cust.id}
                      onClick={() => navigate(`/postsales/onboarding/enablement/${cust.id}`, { state: { customer: cust } })}
                      className="hover:bg-slate-50/60 transition-colors group cursor-pointer h-[72px]"
                    >
                      <td className="px-6 py-3 whitespace-nowrap text-left">
                        <div className="flex items-center justify-start gap-3">
                          <div
                            className="w-[32px] h-[32px] rounded-full flex items-center justify-center font-medium text-[13px] shrink-0"
                            style={{ backgroundColor: cust.avatarBg, color: cust.avatarText }}
                          >
                            {cust.initials}
                          </div>
                          <span className="font-semibold text-[14px] text-[#111827] whitespace-nowrap">
                            {cust.name}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-3 whitespace-nowrap text-[14px] text-[#111827] text-left">
                        {cust.product}
                      </td>

                      <td className="px-6 py-3 whitespace-nowrap">
                        <span
                          className="font-medium text-[13px] rounded-[12px] px-2.5 py-0.5 inline-block"
                          style={{
                            backgroundColor: planStyle.bg,
                            color: planStyle.text
                          }}
                        >
                          {cust.plan}
                        </span>
                      </td>

                      {/* Adoption Score */}
                      <td className="px-6 py-3 whitespace-nowrap font-bold text-[14px] text-[#111827]">
                        {cust.adoptionScore}%
                      </td>

                      {/* Last Login */}
                      <td className="px-6 py-3 whitespace-nowrap text-[14px] text-[#111827]">
                        {cust.lastLogin}
                      </td>

                      {/* Stage */}
                      <td className="px-6 py-3 whitespace-nowrap font-bold text-[14px] text-[#111827]">
                        {cust.stage}
                      </td>

                      {/* Learning Progress */}
                      <td className="px-6 py-3 whitespace-nowrap font-bold text-[14px] text-[#111827]">
                        {cust.learningProgress}%
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400 text-sm">
                    No accounts match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#F3F4F6] py-4 px-6 bg-white rounded-b-[16px]">
          <div className="text-xs text-[#434655] font-medium">
            Showing {filteredAndSortedCustomers.length === 0 ? 0 : startIndex + 1}-{Math.min(endIndex, filteredAndSortedCustomers.length)} of {filteredAndSortedCustomers.length} accounts
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => activePage > 1 && setCurrentPage(activePage - 1)}
              disabled={activePage === 1}
              className={`w-9 h-9 rounded-xl border border-[#F3F4F6] flex items-center justify-center bg-white text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors ${activePage === 1 ? 'opacity-40 cursor-not-allowed' : ''
                }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => activePage < totalPages && setCurrentPage(activePage + 1)}
              disabled={activePage === totalPages}
              className={`w-9 h-9 rounded-xl border border-[#F3F4F6] flex items-center justify-center bg-white text-slate-500 hover:bg-slate-50 cursor-pointer transition-colors ${activePage === totalPages ? 'opacity-40 cursor-not-allowed' : ''
                }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTable;
