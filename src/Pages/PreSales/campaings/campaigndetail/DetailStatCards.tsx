import React from 'react';
import { Profile2User, Pointer, TrendUp, WalletMoney, ChartSquare } from 'iconsax-react';

export default function DetailStatCards() {
  const cards = [
    {
      label: 'Remaining Leads',
      number: '1,450',
      badge: '70% Left',
      badgeColor: '#240596',
      icon: <Profile2User size="20" color="#004370" variant="Linear" />,
      iconBg: '#E5EEFF'
    },
    {
      label: 'Conversions',
      number: '700',
      badge: '+12% vs avg',
      badgeColor: '#059669',
      icon: <Pointer size="20" color="#0A6621" variant="Linear" />,
      iconBg: '#E9FFE5'
    },
    {
      label: 'Engagement Rate',
      number: '19.8%',
      badge: '-2.3%',
      badgeColor: '#B91C1C',
      icon: <TrendUp size="20" color="#3A0070" variant="Linear" />,
      iconBg: '#FEF1FF'
    },
    {
      label: 'Revenue Generated',
      number: '₹ 3.2L',
      badge: '+12%',
      badgeColor: '#059669',
      icon: <WalletMoney size="20" color="#004370" variant="Linear" />,
      iconBg: '#E5EEFF'
    },
    {
      label: 'Campaign Health',
      number: '95% AI Score',
      badge: '+12%',
      badgeColor: '#059669',
      icon: <ChartSquare size="20" color="#4744E5" variant="Linear" />,
      iconBg: '#E5EEFF'
    },
  ];

  return (
    <div className="flex flex-row gap-3 w-full" style={{ fontFamily: 'Manrope, sans-serif' }}>
      {cards.map((card, index) => (
        <div key={index} className="flex-1 BoxStyle flex flex-col">
          {/* Row 1: icon box left, badge right */}
          <div className="flex items-center justify-between">
            <div style={{ background: card.iconBg }} className="rounded-xl w-10 h-10 flex items-center justify-center shrink-0">
              {card.icon}
            </div>
            <span style={{
              fontFamily: 'Manrope', fontWeight: 700, fontSize: '12px',
              lineHeight: '16px', color: card.badgeColor
            }}>{card.badge}</span>
          </div>

          {/* Row 2: number */}
          <div className="mt-3">
            <span style={{
              fontFamily: 'Manrope', fontWeight: 600, fontSize: '24px',
              lineHeight: '32px', color: '#0F172A'
            }}>{card.number}</span>
          </div>

          {/* Row 3: label */}
          <div className="mt-1">
            <span style={{
              fontFamily: 'Manrope', fontWeight: 500, fontSize: '13px',
              lineHeight: '16px', color: '#64748B'
            }}>{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
