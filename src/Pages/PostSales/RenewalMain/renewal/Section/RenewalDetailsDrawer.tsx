import React from 'react';
import { X, Sparkles, Calendar, TrendingUp } from 'lucide-react';
import { Ticket, Happyemoji } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import type { RenewalDetail } from '../Renewal';

interface RenewalDetailsDrawerProps {
  isOpen: boolean;
  detail: RenewalDetail | null;
  onClose: () => void;
}

export default function RenewalDetailsDrawer({ isOpen, detail, onClose }: RenewalDetailsDrawerProps) {
  const navigate = useNavigate();

  return (
    <>
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      <div className={`fixed top-0 right-0 bottom-0 w-full sm:w-[420px] bg-white z-[1000] transition-transform duration-300 overflow-y-auto shadow-[-4px_0px_20px_rgba(0,0,0,0.1)] flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {detail && (
          <>
            <div className="flex-1">
              {/* 1. HEADER SECTION */}
              <div className="p-6 pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img 
                      src={detail.avatar} 
                      alt={detail.name} 
                      className="w-12 h-12 rounded-full object-cover shrink-0" 
                    />
                    <div className="flex flex-col">
                      <span className="font-semibold text-[16px] sm:text-lg leading-6 text-[#0D1C2E]">
                        {detail.name}
                      </span>
                      <span className="font-normal text-[13px] sm:text-sm leading-5 text-[#434655]">
                        {detail.email}
                      </span>
                    </div>
                  </div>
                  <X 
                    className="w-6 h-6 text-[#464555] cursor-pointer hover:text-black transition-colors" 
                    onClick={onClose} 
                  />
                </div>
              </div>
              <div className="border-b border-[#C7C4D87D]" />

              {/* 2. PLAN + SEATS CARDS */}
              <div className="px-6 py-5 flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-[#F1F6FF] rounded-xl p-4 flex flex-col">
                  <span className="font-normal text-[11px] leading-[16.5px] text-[#464555]">PLAN</span>
                  <span className="font-semibold text-[13px] leading-[16.5px] text-[#0B1C30]">{detail.plan}</span>
                  <span className="font-normal text-[10px] leading-5 text-[#0B1C30]">{detail.planUpgradeNote}</span>
                </div>
                <div className="flex-1 bg-[#F1F6FF] rounded-xl p-4 flex flex-col">
                  <span className="font-normal text-[11px] leading-[16.5px] text-[#464555]">SEATS</span>
                  <span className="font-semibold text-[20px] leading-7 text-[#0B1C30]">{detail.seatsUsed} / {detail.seatsTotal}</span>
                  <div className="w-full h-1.5 rounded-full bg-[#E2E8F0] mt-1">
                    <div className="h-1.5 rounded-full bg-black" style={{ width: `${(detail.seatsUsed / detail.seatsTotal) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* 3. AI RENEWAL INSIGHTS SECTION */}
              <div className="px-6 pb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-[22px] h-[22px] text-[#004370]" />
                  <span className="font-semibold text-sm leading-[16.8px] tracking-[1.4px] uppercase text-[#45464D]">
                    AI RENEWAL INSIGHTS
                  </span>
                </div>
                <div className="rounded-2xl p-5 bg-[#F8FAFF]" style={{ background: 'radial-gradient(120% 120% at 100% 0%, rgba(0, 81, 213, 0.15) 0%, rgba(0, 81, 213, 0) 60%)' }}>
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm leading-[21px] text-[#0051D5]">Renewal Chance</span>
                      <span className="font-bold text-[48px] leading-[57.6px] tracking-[-0.96px] text-[black]">{detail.renewalChance}%</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="font-semibold text-sm leading-[21px] text-[#059669]">Churn Risk</span>
                      <span className="font-semibold text-2xl leading-[33.6px] text-[#059669]">{detail.churnRisk}</span>
                    </div>
                  </div>
                  <div className="BoxStyle flex flex-col bg-white rounded-xl p-4 mt-4 border border-[#EDF3FD]">
                    <span className="font-medium text-xs leading-[14.4px] tracking-[0.12px] text-[#45464D]">
                      BEST NEXT ACTION
                    </span>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span className="font-bold text-base leading-[25.6px] text-[#0D1C2E]">
                        {detail.bestAction.title}
                      </span>
                      <Calendar className="w-[13.5px] h-[15px] text-[#0D1C2E]" />
                    </div>
                    <span className="font-normal text-sm leading-[22.75px] text-[#45464D] mt-2">
                      {detail.bestAction.caption}
                    </span>
                  </div>
                </div>
              </div>

              {/* 4. PRODUCT USAGE SECTION */}
              <div className="px-6 pb-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-sm leading-[16.8px] tracking-[1.4px] uppercase text-[#45464D]">
                    PRODUCT USAGE
                  </span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5 text-[#059669]" />
                    <span className="font-bold text-xs leading-[18px] text-[#059669]">
                      {detail.usageTrend}
                    </span>
                  </div>
                </div>
                <div className="bg-[#F7F9FB] rounded-2xl p-4">
                  <div className="flex items-end gap-3 h-[140px]">
                    {detail.usageBars.map((bar) => (
                      <div key={bar.month} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                        {bar.highlight && (
                          <span className="text-[11px] font-semibold text-[#0D1C2E] mb-1">{bar.month}</span>
                        )}
                        <div 
                          className="w-full rounded-t-md transition-colors"
                          style={{ height: `${bar.value}%`, backgroundColor: bar.highlight ? '#004370' : '#E6EDF1' }} 
                        />
                        {/* Tooltip on Hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-[#111827] text-white text-[11px] font-medium py-1 px-2 rounded whitespace-nowrap pointer-events-none z-10">
                          {bar.value}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 5. TICKETS + CSAT CARDS */}
              <div className="px-6 pb-5 flex flex-col sm:flex-row gap-3">
                <div className="BoxStyle flex-1 bg-[#F1F6FF] rounded-xl p-4 flex items-center gap-3.5 border border-[#EDF3FD]">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,218,214,0.2)] flex items-center justify-center shrink-0">
                    <Ticket size="20" color="#BA1A1A" variant="Linear" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-xs leading-[14.4px] tracking-[0.12px] text-[#45464D]">Tickets</span>
                    <span className="font-semibold text-base leading-snug text-[#0D1C2E]">{detail.tickets} Open</span>
                  </div>
                </div>
                <div className="BoxStyle flex-1 bg-[#F1F6FF] rounded-xl p-4 flex items-center gap-3.5 border border-[#EDF3FD]">
                  <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] flex items-center justify-center shrink-0">
                    <Happyemoji size="20" color="#059669" variant="Linear" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-xs leading-[14.4px] tracking-[0.12px] text-[#45464D]">CSAT</span>
                    <span className="font-semibold text-base leading-snug text-[#0D1C2E]">{detail.csat} / 5</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 6. STICKY BOTTOM CTA */}
            <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-[#C7C4D87D]">
              <button 
                onClick={() => navigate(`/postsales/renewals/${detail.id}`)}
                className="w-full bg-[#004370] hover:bg-[#003258] transition-colors text-white font-bold text-xs leading-4 text-center rounded-full py-3.5 border-none cursor-pointer"
              >
                View Renewal details
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}