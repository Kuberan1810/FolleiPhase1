
import { Profile2User, Calendar, UserTick } from 'iconsax-react';
import type { RenewalStatCard } from '../Renewal';

interface RenewalStatCardsProps {
  cards: RenewalStatCard[];
}

export default function RenewalStatCards({ cards }: RenewalStatCardsProps) {
  const renderIcon = (iconName: string) => {
    const props = { color: '#004370', style: { width: '18.82px', height: '14.55px' } };
    if (iconName === 'users') return <Profile2User {...props} />;
    if (iconName === 'calendar') return <Calendar {...props} />;
    if (iconName === 'userCheck') return <UserTick {...props} />;
    return null;
  };

  return (
    <div className="flex flex-row gap-3 w-full">
      {cards.map((card) => (
        <div key={card.id} className="flex-1 BoxStyle flex flex-col">
          {/* Row 1: Icon + Badge */}
          <div className="flex items-center justify-between">
            <div className={`${card.iconBoxBg} rounded-xl w-10 h-10 flex items-center justify-center shrink-0`}>
              {renderIcon(card.icon)}
            </div>
            <div>
              <span style={{
                fontWeight: 500,
                fontSize: '12px',
                lineHeight: '14.4px',
                letterSpacing: '0.12px',
                color: card.pillColor,
                backgroundColor: card.pillBg,
                borderRadius: '6px',
                padding: '2px 8px',
                width: 'fit-content',
                display: 'inline-block'
              }}>
                {card.pillText}
              </span>
            </div>
          </div>

          {/* Row 2: Label */}
          <div className="mt-3">
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1.1px', lineHeight: '16.5px' }}>
              {card.label}
            </span>
          </div>

          {/* Row 3: Number */}
          <div className="mt-1 flex items-baseline gap-2">
            <span style={{ fontSize: '36px', fontWeight: 800, lineHeight: '40px', color: '#191C1E' }}>
              {card.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}