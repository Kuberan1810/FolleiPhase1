import * as React from 'react';
import { Users, Heart, Calendar, Filter, ListFilter, Download, ChevronLeft, ChevronRight, CheckCircle, MoreVertical, Clock, ArrowDownWideNarrow, Zap } from 'lucide-react';

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

const accountsData: Account[] = [
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
  const [isFilterOpen, setIsFilterOpen] = React.useState(false);
  const [filterMode, setFilterMode] = React.useState<'all' | 'upsell' | 'cross-sell'>('all');

  const filteredAccounts = filterMode === 'upsell' 
    ? accountsData.filter(a => a.name === 'Apex Partners' || a.name === 'NovaStream Systems').slice(0, 2)
    : filterMode === 'cross-sell'
    ? accountsData.filter(a => a.crossSellSignal)
    : accountsData;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8 font-sans">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        {/* Total Accounts Card */}
        <div className="relative bg-white rounded-[20px] p-6 border border-slate-100 h-[132px] flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col">
            <p className="text-[11px] font-bold text-[#454655] uppercase tracking-[0.55px] font-manrope mb-1">TOTAL ACCOUNTS</p>
            <h2 className="text-[28px] font-bold text-[#0F172A] leading-[42px] font-manrope">248</h2>
          </div>
          <p className="text-[12px] font-medium text-[#004370] font-manrope flex items-center gap-1 leading-[16px]">
            <span className="text-[#004370]">↑</span> 12% vs last month
          </p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-[4px] bg-[#EFF6FF] flex items-center justify-center text-[#004370]">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Portfolio Health Card */}
        <div className="relative bg-white rounded-[20px] p-6 border border-slate-100 h-[132px] flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col">
            <p className="text-[11px] font-bold text-[#454655] uppercase tracking-[0.55px] font-manrope mb-1">PORTFOLIO HEALTH</p>
            <h2 className="text-[28px] font-bold text-[#0F172A] leading-[42px] font-manrope">92.4%</h2>
          </div>
          <p className="text-[12px] font-medium text-[#16A34A] font-manrope flex items-center gap-1 leading-[16px]">
            <CheckCircle className="w-[14px] h-[14px]" /> Stable momentum
          </p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-[4px] bg-[#ECFDF5] flex items-center justify-center text-[#16A34A]">
            <Heart className="w-5 h-5" />
          </div>
        </div>

        {/* Upcoming Renewals Card */}
        <div className="relative bg-white rounded-[20px] p-6 border border-slate-100 h-[132px] flex flex-col justify-between overflow-hidden">
          <div className="flex flex-col">
            <p className="text-[11px] font-bold text-[#454655] uppercase tracking-[0.55px] font-manrope mb-1">UPCOMING RENEWALS</p>
            <h2 className="text-[28px] font-bold text-[#0F172A] leading-[42px] font-manrope">$142,500</h2>
          </div>
          <p className="text-[12px] font-medium text-[#D97706] font-manrope flex items-center gap-1 leading-[16px]">
            <Clock className="w-[14px] h-[14px]" /> 8 accounts this quarter
          </p>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-[4px] bg-[#FFFBEB] flex items-center justify-center text-[#B45309]">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Action Bar */}
      <div className="flex justify-end gap-3 mb-4">
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-[5px] px-[10px] py-[8px] h-[32px] bg-white border border-[#E2E8F0] rounded-[6px] text-[12px] font-medium text-[#222222] font-manrope hover:bg-slate-50 transition-colors cursor-pointer leading-none min-w-[80px] justify-center"
          >
            <ListFilter className="w-4 h-4" strokeWidth={1.5} /> 
            {filterMode === 'upsell' ? 'Up sell' : filterMode === 'cross-sell' ? 'Cross sell' : 'Filter'}
          </button>
          
          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl z-10 py-2">
              <button 
                onClick={() => { setFilterMode('all'); setIsFilterOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-manrope cursor-pointer"
              >
                All Accounts
              </button>
              <button 
                onClick={() => { setFilterMode('upsell'); setIsFilterOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-manrope cursor-pointer"
              >
                Upsell
              </button>
              <button 
                onClick={() => { setFilterMode('cross-sell'); setIsFilterOpen(false); }}
                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors font-manrope cursor-pointer"
              >
                Cross sell
              </button>
            </div>
          )}
        </div>
        <button className="flex items-center gap-[5px] px-[10px] py-[8px] h-[32px] bg-white border border-[#E2E8F0] rounded-[6px] text-[12px] font-medium text-[#222222] font-manrope hover:bg-slate-50 transition-colors cursor-pointer leading-none">
          <ArrowDownWideNarrow className="w-4 h-4" strokeWidth={1.5} /> Sort by
        </button>
        <button className="flex items-center gap-[5px] px-[10px] py-[8px] h-[32px] bg-white border border-[#E2E8F0] rounded-[6px] text-[12px] font-medium text-[#222222] font-manrope hover:bg-slate-50 transition-colors cursor-pointer leading-none">
          <Download className="w-4 h-4" strokeWidth={1.5} /> Export List
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        {/* Table Header */}
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr_0.4fr] gap-4 px-6 py-4 border-b border-slate-100 bg-white">
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.55px] font-manrope">ACCOUNT NAME</div>
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.55px] font-manrope text-center">
            {filterMode === 'upsell' ? 'USAGE INTENSITY' : filterMode === 'cross-sell' ? 'CROSS-SELL SIGNAL' : 'HEALTH SCORE'}
          </div>
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.55px] font-manrope text-center">SEGMENT</div>
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.55px] font-manrope text-center">ARR</div>
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.55px] font-manrope text-center">LAST INTERACTION</div>
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.55px] font-manrope text-center">RENEWAL DATE</div>
          <div className="text-[11px] font-bold text-[#64748B] uppercase tracking-[0.55px] font-manrope text-center">ACTIONS</div>
        </div>

        {/* Table Body */}
        <div className="flex flex-col">
          {filteredAccounts.map((account, index) => (
            <div key={`${account.id}-${index}`} className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr_0.4fr] gap-4 px-6 py-4 items-center border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group cursor-pointer">

              {/* Account Name */}
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded text-white flex items-center justify-center text-xs font-bold ${account.logoColor}`}>
                  {account.initials}
                </div>
                <span className="text-[16px] font-semibold text-[#0F172A] font-manrope leading-none">{account.name}</span>
              </div>

              {/* Column 2: Health / Usage / Cross-sell */}
              <div className="flex flex-col w-[120px] gap-1 mx-auto">
                {filterMode === 'cross-sell' ? (
                  <div className="flex items-start gap-2">
                    <Zap className="w-3.5 h-3.5 mt-1 flex-shrink-0" style={{ color: account.crossSellSignal?.color || '#64748B' }} />
                    <div className="flex flex-col">
                      <span 
                        className="text-[13px] font-semibold leading-[18px] font-manrope whitespace-pre-line"
                        style={{ color: account.crossSellSignal?.color || '#64748B' }}
                      >
                        {account.crossSellSignal?.type.includes('Add-on') 
                          ? account.crossSellSignal.type.replace(' Add-on', '\nAdd-on')
                          : account.crossSellSignal?.type.includes('Upgrade')
                          ? account.crossSellSignal.type.replace(' Upgrade', '\nUpgrade')
                          : account.crossSellSignal?.type || 'N/A'}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${filterMode === 'upsell' ? 'bg-[#004370]' : account.healthScore >= 80 ? 'bg-emerald-500' : 'bg-amber-400'}`}
                        style={{ width: `${account.healthScore}%` }}
                      ></div>
                    </div>
                    <span className="text-[13px] font-medium text-slate-600 self-end leading-none">{account.healthScore}%</span>
                  </>
                )}
              </div>

              {/* Segment */}
              <div className="text-center">
                <span className="inline-flex items-center px-2 py-[2px] rounded-[2px] bg-[#EEF2FF] text-[11px] font-bold text-[#004370] font-manrope uppercase leading-none">
                  {account.segment}
                </span>
              </div>

              {/* ARR */}
              <div className="text-[13px] font-medium text-[#0F172A] font-manrope text-center leading-[18px]">
                ${account.arr.toLocaleString()}
              </div>

              {/* Last Interaction */}
              <div className="text-[13px] text-[#64748B] font-normal font-manrope text-center leading-[18px]">
                {account.lastInteraction}
              </div>

              {/* Renewal Date */}
              <div className="text-[13px] text-[#64748B] font-normal font-manrope text-center leading-[18px]">
                {account.renewalDate}
              </div>

              {/* Actions */}
              <div className="flex justify-center">
                <button className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-400 hover:text-slate-600 cursor-pointer">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <div className="text-[13px] text-[#64748B] font-normal font-manrope leading-[18px]">
            Showing {filteredAccounts.length} {filteredAccounts.length === 1 ? 'account' : 'accounts'}
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[2px] bg-[#004370] text-white text-sm font-semibold font-manrope cursor-pointer">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[2px] text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors font-manrope cursor-pointer">
              2
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-[2px] text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors font-manrope cursor-pointer">
              3
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-slate-400 text-sm">
              ...
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded-[2px] text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors font-manrope cursor-pointer">
              48
            </button>
            <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:text-slate-800 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default NewCustomer;
