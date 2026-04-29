import * as React from 'react';
import { ListFilter, Download, ArrowDownWideNarrow } from 'lucide-react';
import CustomerHeader from './section/CustomerHeader';
import CustomerTable from './section/CustomerTable';

type Account = {
  id: string;
  name: string;
  initials: string;
  logoColor: string;
  healthScore: number;
  segment: 'ENTERPRISE' | 'MID-MARKET';
  arr: number;
  lastInteraction: string;
  renewalDate: string;
  crossSellSignal?: {
    type: string;
    color: string;
  };
};

const initialAccountsData: Account[] = [
  { id: '1', name: 'NovaStream Systems', initials: 'NV', logoColor: 'bg-[#1e293b]', healthScore: 88, segment: 'ENTERPRISE', arr: 48000, lastInteraction: '2 days ago', renewalDate: 'Jan 14, 2026', crossSellSignal: { type: 'Analytics Add-on Match', color: '#15803D' } },
  { id: '2', name: 'Lumina Labs', initials: 'LX', logoColor: 'bg-[#0f4a8a]', healthScore: 62, segment: 'MID-MARKET', arr: 48000, lastInteraction: '2 days ago', renewalDate: 'Jan 14, 2026' },
  { id: '3', name: 'Apex Partners', initials: 'AP', logoColor: 'bg-[#0d9488]', healthScore: 95, segment: 'ENTERPRISE', arr: 124000, lastInteraction: 'Just now', renewalDate: 'Jan 14, 2026', crossSellSignal: { type: 'Security Suite Upgrade', color: '#B45309' } },
  { id: '4', name: 'Quantum Data', initials: 'QD', logoColor: 'bg-[#dc2626]', healthScore: 95, segment: 'ENTERPRISE', arr: 124000, lastInteraction: 'Just now', renewalDate: 'Jan 14, 2026' },
  { id: '5', name: 'Horizon Tech', initials: 'HT', logoColor: 'bg-indigo-500', healthScore: 45, segment: 'MID-MARKET', arr: 22100, lastInteraction: '1 day ago', renewalDate: 'Feb 12, 2026', crossSellSignal: { type: 'Storage Expansion', color: '#15803D' } },
  { id: '6', name: 'Lumina Labs', initials: 'LX', logoColor: 'bg-[#0f4a8a]', healthScore: 62, segment: 'MID-MARKET', arr: 48000, lastInteraction: '2 days ago', renewalDate: 'Jan 14, 2026' },
  { id: '7', name: 'Apex Partners', initials: 'AP', logoColor: 'bg-[#0d9488]', healthScore: 95, segment: 'ENTERPRISE', arr: 124000, lastInteraction: 'Just now', renewalDate: 'Jan 14, 2026' },
  { id: '8', name: 'Quantum Data', initials: 'QD', logoColor: 'bg-[#dc2626]', healthScore: 95, segment: 'ENTERPRISE', arr: 124000, lastInteraction: 'Just now', renewalDate: 'Jan 14, 2026' },
];

const NewCustomer: React.FC = () => {
  const [accountsData, setAccountsData] = React.useState<Account[]>(initialAccountsData);
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [isSortOpen, setIsSortOpen] = React.useState(false);
  const [filterMode, setFilterMode] = React.useState<'all' | 'upsell' | 'cross-sell'>('all');
  const [sortMode, setSortMode] = React.useState<'none' | 'name' | 'health' | 'arr'>('none');
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const sortRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAccounts = [...(filterMode === 'upsell' 
    ? accountsData.filter(a => a.name === 'Apex Partners' || a.name === 'NovaStream Systems').slice(0, 2)
    : filterMode === 'cross-sell'
    ? accountsData.filter(a => a.crossSellSignal)
    : accountsData)].sort((a, b) => {
    if (sortMode === 'name') return a.name.localeCompare(b.name);
    if (sortMode === 'health') return b.healthScore - a.healthScore;
    if (sortMode === 'arr') return b.arr - a.arr;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">

      {/* Summary Cards */}
      <CustomerHeader />


      {/* Action Bar */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-3 mb-6">
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-[5px] px-[10px] py-[8px] h-[32px] bg-white border border-[#E2E8F0] rounded-[6px] text-[12px] font-medium text-[#222222] font-manrope hover:bg-slate-50 transition-colors cursor-pointer leading-none min-w-[80px] justify-center"
          >
            <ListFilter className="w-4 h-4" strokeWidth={1.5} /> 
            {filterMode === 'upsell' ? 'Upsell' : filterMode === 'cross-sell' ? 'Cross sell' : 'Filter'}
          </button>
          
          {isFilterOpen && (
            <div className="absolute left-0 sm:right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl z-[100] py-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-left sm:origin-top-right">
              <button 
                onClick={() => { setFilterMode('all'); setIsFilterOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-manrope cursor-pointer ${filterMode === 'all' ? 'bg-slate-50 text-[#004370] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                All Accounts
              </button>
              <button 
                onClick={() => { setFilterMode('upsell'); setIsFilterOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-manrope cursor-pointer ${filterMode === 'upsell' ? 'bg-slate-50 text-[#004370] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Upsell
              </button>
              <button 
                onClick={() => { setFilterMode('cross-sell'); setIsFilterOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-manrope cursor-pointer ${filterMode === 'cross-sell' ? 'bg-slate-50 text-[#004370] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Cross sell
              </button>
            </div>
          )}
        </div>

        <div className="relative" ref={sortRef}>
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-[5px] px-[10px] py-[8px] h-[32px] bg-white border border-[#E2E8F0] rounded-[6px] text-[12px] font-medium text-[#222222] font-manrope hover:bg-slate-50 transition-colors cursor-pointer leading-none min-w-[80px] justify-center"
          >
            <ArrowDownWideNarrow className="w-4 h-4" strokeWidth={1.5} /> 
            {sortMode === 'none' ? 'Sort by' : sortMode === 'name' ? 'Name' : sortMode === 'health' ? 'Health' : 'ARR'}
          </button>

          {isSortOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl z-[100] py-2 shadow-xl animate-in fade-in zoom-in-95 duration-200 origin-top-right">
              <button 
                onClick={() => { setSortMode('name'); setIsSortOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-manrope cursor-pointer ${sortMode === 'name' ? 'bg-slate-50 text-[#004370] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Account Name
              </button>
              <button 
                onClick={() => { setSortMode('health'); setIsSortOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-manrope cursor-pointer ${sortMode === 'health' ? 'bg-slate-50 text-[#004370] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                Health Score
              </button>
              <button 
                onClick={() => { setSortMode('arr'); setIsSortOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors font-manrope cursor-pointer ${sortMode === 'arr' ? 'bg-slate-50 text-[#004370] font-semibold' : 'text-slate-700 hover:bg-slate-50'}`}
              >
                ARR
              </button>
            </div>
          )}
        </div>

        <button className="flex items-center gap-[5px] px-[10px] py-[8px] h-[32px] bg-white border border-[#E2E8F0] rounded-[6px] text-[12px] font-medium text-[#222222] font-manrope hover:bg-slate-50 transition-colors cursor-pointer leading-none">
          <Download className="w-4 h-4" strokeWidth={1.5} /> Export List
        </button>
      </div>

        <CustomerTable 
          filteredAccounts={filteredAccounts} 
          filterMode={filterMode} 
          onDelete={(id) => setAccountsData(prev => prev.filter(a => a.id !== id))}
        />

    </div>
  );
};

export default NewCustomer;
