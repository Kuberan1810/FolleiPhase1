import React from 'react';
import { Profile2User, Calendar, UserTick } from 'iconsax-react';
import type { RenewalStatCard } from '../Renewal';

interface RenewalStatCardsProps {
  cards: RenewalStatCard[];
}

export default function RenewalStatCards({ cards }: RenewalStatCardsProps) {
  const renderIcon = (iconName: string) => {
    if (iconName === 'users') return <Profile2User size="20" color="#014370" variant="Linear" />;
    if (iconName === 'calendar') return <Calendar size="20" color="#014370" variant="Linear" />;
    if (iconName === 'userCheck') return <UserTick size="20" color="#014370" variant="Linear" />;
    return null;
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      {cards.map((card) => (
        <div key={card.id} className="flex-1 BoxStyle flex flex-col bg-white rounded-[20px] p-6 border border-[#EDF3FD]">
          {/* Row 1: Icon + Badge */}
          <div className="flex items-center justify-between">
            <div className={`rounded-xl w-10 h-10 flex items-center justify-center shrink-0`} style={{ backgroundColor: '#F1F6FF' }}>
              {renderIcon(card.icon)}
            </div>
            <div>
              <span 
                className="font-medium text-xs leading-[14.4px] tracking-[0.12px] rounded-md px-2 py-0.5 inline-block"
                style={{ color: card.pillColor, backgroundColor: card.pillBg }}
              >
                {card.pillText}
              </span>
            </div>
          </div>

          {/* Row 2: Label */}
          <div className="mt-4">
            <span className="font-bold text-[11px] text-[#64748B] uppercase tracking-[1.1px] leading-[16.5px]">
              {card.label}
            </span>
          </div>

          {/* Row 3: Number */}
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-extrabold text-[36px] leading-[40px] text-[#191C1E]">
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}