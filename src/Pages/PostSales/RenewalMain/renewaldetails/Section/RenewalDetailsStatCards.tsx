import React from 'react';
import type { RenewalDetailsStatCard } from '../RenewalDetailsPage';
import { Calendar, DollarSquare, Activity } from 'iconsax-react';

interface Props {
  cards: RenewalDetailsStatCard[];
}

export default function RenewalDetailsStatCards({ cards }: Props) {
  return (
    <div className="flex flex-row gap-3 w-full">
      {cards.map((card, idx) => {
        let IconComponent = Calendar;
        if (idx === 1) IconComponent = DollarSquare;
        else if (idx === 2) IconComponent = Activity;
        else if (idx === 3) IconComponent = Activity;

        return (
          <div key={card.id} className="BoxStyle flex-1 flex flex-col">
            {/* Row 1 */}
            <div className="flex items-center justify-between">
              <div style={{ backgroundColor: card.iconBg, borderRadius: '12px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <IconComponent style={{ width: '20px', height: '20px', color: card.iconColor }} />
              </div>
              {card.pillText && (
                <div style={{
                  fontWeight: 500,
                  fontSize: '12px',
                  lineHeight: '16px',
                  color: card.iconColor,
                  textAlign: 'right'
                }}>
                  {card.pillText}
                </div>
              )}
            </div>

            {/* Row 2 */}
            <div className="flex items-baseline gap-[6px]" style={{ marginTop: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '24px', lineHeight: '32px', color: '#0D1C2E' }}>
                {card.value}
              </span>
              {card.unit && (
                <span style={{ fontWeight: 400, fontSize: '14px', color: '#6B7280' }}>
                  {card.unit}
                </span>
              )}
            </div>

            {/* Row 3 */}
            <div style={{ marginTop: '4px' }}>
              <span style={{ fontWeight: 500, fontSize: '13px', lineHeight: '16px', color: '#464555' }}>
                {card.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
