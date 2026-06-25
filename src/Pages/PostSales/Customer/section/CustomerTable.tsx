import React, { useState, useRef, useEffect } from 'react';

export type Customer = {
  id: string;
  name: string;
  email: string;
  initials: string;
  status: 'Active' | 'At Risk' | 'Onboarding' | 'Renewal Due';
  renewalDate: string;
  daysRemaining: string;
  usage: 'High' | 'Medium' | 'Low';
  lastActivity: string;
  lastActivityPlatform: string;
  phone: string;
  location: string;
  company: string;
  title: string;
  activeProducts: number;
};

type CustomerTableProps = {
  customers: Customer[];
  selectedCustomer: Customer | null;
  onCustomerClick: (customer: Customer) => void;
  selectedLetter: string;
  onSelectLetter: (letter: string) => void;
};

const getStatusBadgeStyle = (status: Customer['status']) => {
  switch (status) {
    case 'Active':
      return { bg: '#EFF6FF', text: '#2563EB' };
    case 'At Risk':
      return { bg: '#FFF1F1', text: '#B91C1C' };
    case 'Onboarding':
      return { bg: '#FFF7ED', text: '#F6810C' };
    case 'Renewal Due':
      return { bg: '#FFF7ED', text: '#A4AF06' };
    default:
      return { bg: '#F1F5F9', text: '#475569' };
  }
};

const UsageIndicator: React.FC<{ usage: Customer['usage'] }> = ({ usage }) => {
  let filledCount = 0;
  let filledColor = '#E2E8F0';

  if (usage === 'High') {
    filledCount = 3;
    filledColor = '#10B981';
  } else if (usage === 'Medium') {
    filledCount = 2;
    filledColor = '#F67F08';
  } else if (usage === 'Low') {
    filledCount = 1;
    filledColor = '#EF4444';
  }

  return (
    <div className="flex flex-col gap-1.5 min-w-[70px]">
      <span className="text-[14px] font-bold text-[#0F172A] leading-none">{usage}</span>
      <div className="flex items-center gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="w-[24px] h-[6px] rounded-full"
            style={{
              backgroundColor: i < filledCount ? filledColor : '#EAEFF6'
            }}
          />
        ))}
      </div>
    </div>
  );
};

const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  selectedCustomer,
  onCustomerClick,
  selectedLetter,
  onSelectLetter
}) => {
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

  return (
    <div className="bg-white rounded-[10px] overflow-visible border border-[#DDEBFF] shadow-[0_4px_20px_rgba(237,243,253,0.4)]">
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="bg-[#FAFBFF] border-b border-[#EDF3FD] h-[52px]">
              <th className="px-6 py-3 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.5px] whitespace-nowrap">
                Customer ID
              </th>
              <th className="px-6 py-3 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.5px] whitespace-nowrap relative">
                <div className="flex items-center gap-1.5 select-none">
                  <span>Customer A-Z</span>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowAZPopup(!showAZPopup);
                    }}
                    className="inline-flex items-center gap-[2px] cursor-pointer hover:bg-slate-50 transition-colors"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: '1px solid rgba(234, 243, 255, 0.97)',
                      borderRadius: '5px',
                      padding: '0 5px',
                      height: '18px',
                      fontWeight: 600,
                      fontSize: '10px',
                      lineHeight: '18px',
                      color: '#004370',
                    }}
                  >
                    <span>A-Z</span>
                    <span className="text-[12px] leading-none select-none ml-0.5">
                      {selectedLetter !== 'All' ? '▲' : '▼'}
                    </span>
                  </div>
                </div>

                {showAZPopup && (
                  <div
                    ref={popupRef}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-[42px] left-6 mt-1 z-50 bg-white border border-[#E2E8F0] rounded-[16px] p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] max-h-[260px] overflow-y-auto scrollbar-thin w-14 flex flex-col items-center gap-0.5"
                  >
                    {['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')].map((letter) => (
                      <button
                        key={letter}
                        onClick={() => {
                          onSelectLetter(letter);
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
              <th className="px-6 py-3 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.5px] whitespace-nowrap">
                Status
              </th>
              <th className="px-6 py-3 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.5px] whitespace-nowrap">
                Renewal Date
              </th>
              <th className="px-6 py-3 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.5px] whitespace-nowrap">
                Usage
              </th>
              <th className="px-6 py-3 text-[12px] font-semibold text-[#434655] uppercase tracking-[0.5px] whitespace-nowrap">
                Last Activity
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EDF3FD]">
            {customers.length > 0 ? (
              customers.map((cust) => {
                const badgeStyle = getStatusBadgeStyle(cust.status);
                const isSelected = selectedCustomer?.id === cust.id;
                return (
                  <tr
                    key={cust.id}
                    onClick={() => onCustomerClick(cust)}
                    className={`hover:bg-slate-50/60 transition-colors group cursor-pointer h-[72px] ${isSelected ? 'bg-slate-50/80' : ''
                      }`}
                  >
                    {/* Customer ID */}
                    <td className="px-6 py-3 whitespace-nowrap text-[14px] text-black">
                      {cust.id}
                    </td>

                    {/* Avatar  */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-[32px] h-[32px] rounded-full flex items-center justify-center font-medium text-[13px] shrink-0 bg-[#F4F3FF] text-[#07006C]"
                        >
                          {cust.initials}
                        </div>
                        <div className="min-w-0 flex flex-col justify-center">
                          <h4 className="font-semibold text-[14px] text-[#111827] leading-tight">
                            {cust.name}
                          </h4>
                          <span className="font-medium text-[12px] text-[#6B7280] leading-tight">
                            {cust.email}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <span
                        className="inline-flex items-center justify-center px-2.5 py-1 rounded-[6px] text-[14px] font-medium"
                        style={{
                          backgroundColor: badgeStyle.bg,
                          color: badgeStyle.text
                        }}
                      >
                        {cust.status}
                      </span>
                    </td>

                    {/* Renewal Date */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex flex-col justify-center">
                        <span className="text-[14px] text-[#334155] leading-tight">
                          {cust.renewalDate}
                        </span>
                        <span className="text-[12px] text-[#10B981] font-semibold leading-tight mt-0.5">
                          {cust.daysRemaining}
                        </span>
                      </div>
                    </td>

                    {/* Usage */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <UsageIndicator usage={cust.usage} />
                    </td>

                    {/* Last Activity */}
                    <td className="px-6 py-3 whitespace-nowrap">
                      <div className="flex flex-col justify-center">
                        <span className="text-[14px] font-medium text-[#222222] leading-tight">
                          {cust.lastActivityPlatform}
                        </span>
                        <span className="text-[12px] text-[#94A3B8] leading-tight mt-0.5">
                          {cust.lastActivity}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 text-sm">
                  No customers matching current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerTable;
