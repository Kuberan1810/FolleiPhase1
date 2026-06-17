import React from 'react';
import { Layer, PresentionChart, Messages1, TrendUp, MoneyRecive } from 'iconsax-react';

export default function StatCards() {
  const cards = [
    {
      id: 1,
      label: 'TOTAL CAMPAIGNS',
      icon: <Layer size="20" color="#003366" variant="Linear" />,
      iconBoxBg: 'bg-[#E6EDF1]',
      badge: 'VariantA',
      number: '8',
      sub: '+1 this month'
    },
    {
      id: 2,
      label: 'ACTIVE CAMPAIGNS',
      icon: <PresentionChart size="20" color="#006A61" variant="Linear" />,
      iconBoxBg: 'bg-[#ECFDF5]',
      badge: 'VariantB',
      number: '8',
      sub: '40% of total'
    },
    {
      id: 3,
      label: 'TOTAL REPLIES',
      icon: <Messages1 size="20" color="#003366" variant="Linear" />,
      iconBoxBg: 'bg-[#E6EDF1]',
      badge: 'VariantD',
      number: '12k',
      sub: 'Avg 8/camp'
    },
    {
      id: 4,
      label: 'CONVERSION RATE',
      icon: <TrendUp size="20" color="#004370" variant="Linear" />,
      iconBoxBg: 'bg-[#E6EDF1]',
      badge: 'VariantC',
      number: '19.8%',
      sub: ''
    },
    {
      id: 5,
      label: 'TOTAL REVENUE',
      icon: <MoneyRecive size="20" color="#004370" variant="Linear" />,
      iconBoxBg: 'bg-[#E5EEFF]',
      badge: 'VariantB',
      number: '₹ 50L',
      sub: ''
    }
  ];

  const renderBadge = (badgeType: string) => {
    switch (badgeType) {
      case 'VariantA':
        return (
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '-0.55px' }}>
            OVERALL
          </span>
        );
      case 'VariantB':
        return (
          <span className="bg-[#E6F1F1] text-[#006A6A] rounded-full px-2 py-0.5 flex items-center" style={{ fontSize: '10px', fontWeight: 700, lineHeight: '15px' }}>
            <span style={{ fontSize: '8px', color: '#006A6A' }} className="mr-1">●</span> Live
          </span>
        );
      case 'VariantC':
        return (
          <span className="bg-[#E6F1F1] text-[#006A6A] rounded-full px-2 py-0.5" style={{ fontSize: '10px', fontWeight: 700, lineHeight: '15px' }}>
            Excellent
          </span>
        );
      case 'VariantD':
        return (
          <span style={{ color: '#006A61', fontSize: '12px', fontWeight: 700, lineHeight: '16px' }}>
            ↑ 12%
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row gap-3 w-full" style={{ }}>
      {cards.map((card) => (
        <div key={card.id} className="flex-1 BoxStyle flex flex-col">
          {/* Row 1: Icon + Badge */}
          <div className="flex items-center justify-between">
            <div className={`${card.iconBoxBg} rounded-xl w-10 h-10 flex items-center justify-center shrink-0`}>
              {card.icon}
            </div>
            <div>{renderBadge(card.badge)}</div>
          </div>

          {/* Row 2: Label */}
          <div className="mt-3">
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '1.1px', lineHeight: '16.5px' }}>
              {card.label}
            </span>
          </div>

          {/* Row 3: Number + Sub */}
          <div className="mt-1 flex items-baseline gap-2">
            <span style={{ fontSize: '32px', fontWeight: 700, lineHeight: '40px', color: '#0F172A' }}>
              {card.number}
            </span>
            {card.sub && (
              <span style={{ fontSize: '12px', fontWeight: 500, color: card.id === 1 ? '#006A61' : '#94A3B8', lineHeight: '16px' }}>
                {card.sub}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
