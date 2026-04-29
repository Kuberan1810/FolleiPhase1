import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { MoreVertical, Zap, ChevronLeft, ChevronRight, Eye, Archive, Trash2, Download } from 'lucide-react';

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

interface CustomerTableProps {
  filteredAccounts: Account[];
  filterMode: 'all' | 'upsell' | 'cross-sell';
  onDelete: (id: string) => void;
}

const CustomerTable: React.FC<CustomerTableProps> = ({ filteredAccounts, filterMode, onDelete }) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = React.useState<string | null>(null);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <>
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

      {/* Scrollable Container */}
      <div className="overflow-x-auto">
        <div className="min-w-[1000px]">
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
              <div key={`${account.id}-${index}`} className="grid grid-cols-[1.6fr_1fr_1fr_1fr_1fr_1fr_0.4fr] gap-4 px-6 py-4 items-center border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors group cursor-pointer relative">

                {/* Account Name */}
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => navigate('/postsales/outbound/customer/profile')}
                >
                  <div className={`w-8 h-8 rounded text-white flex items-center justify-center text-xs font-bold ${account.logoColor}`}>
                    {account.initials}
                  </div>
                  <span className="text-[16px] font-semibold text-[#0F172A] font-manrope leading-none group-hover:text-[#004370] transition-colors">{account.name}</span>
                </div>

                {/* Column 2: Health / Usage / Cross-sell */}
                <div className="flex flex-col w-[120px] gap-1 mx-auto">
                  {filterMode === 'cross-sell' ? (
                    <div className="flex items-start gap-2">
                      <Zap className="w-3.5 h-3.5 mt-1 shrink-0" style={{ color: account.crossSellSignal?.color || '#64748B' }} />
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
                <div className="flex justify-center relative">
                  <button
                    onClick={(e) => toggleMenu(e, account.id)}
                    className={`p-1.5 rounded-md transition-all duration-200 cursor-pointer ${openMenuId === account.id ? 'bg-slate-100 text-[#004370]' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {openMenuId === account.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 top-10 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-100 py-1.5 animate-in fade-in zoom-in-95 duration-150 origin-top-right"
                    >
                      <button
                        onClick={() => navigate('/postsales/outbound/customer/profile')}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-slate-400" /> View Account
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                        <Archive className="w-4 h-4 text-slate-400" /> Archive Account
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                        <Download className="w-4 h-4 text-slate-400" /> Export
                      </button>
                      <div className="my-1 border-t border-slate-100" />
                      <button
                        onClick={() => {
                          setDeleteConfirmationId(account.id);
                          setOpenMenuId(null);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-[13px] font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Account
                      </button>
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
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
          <button className="hidden sm:flex w-8 h-8 items-center justify-center rounded-[2px] text-slate-600 hover:bg-slate-100 text-sm font-semibold transition-colors font-manrope cursor-pointer">
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

      {deleteConfirmationId && createPortal(
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-9999">
            <div className="w-[400px] p-6 shadow-xl BoxStyle bg-white rounded-2xl">
                <h3 className="text-lg font-semibold text-[#333333] mb-2">
                    Are you sure?
                </h3>

                <p className="text-sm text-[#626262] mb-8">
                    Do you really want to delete this account?
                </p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => setDeleteConfirmationId(null)}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-[#F7F5F9] text-[#333333] hover:bg-[#EFEAF3] cursor-pointer border border-[#E2E8F080] hover:border-[#E2E8F0]"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                          onDelete(deleteConfirmationId);
                          setDeleteConfirmationId(null);
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default CustomerTable;

