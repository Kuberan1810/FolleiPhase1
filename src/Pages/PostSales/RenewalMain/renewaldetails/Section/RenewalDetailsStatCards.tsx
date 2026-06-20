
import type { RenewalDetailsStatCard } from '../RenewalDetailsPage';
import { Calendar, Receipt21, PresentionChart, Heart } from 'iconsax-react';

interface Props {
  cards: RenewalDetailsStatCard[];
}

export default function RenewalDetailsStatCards({ cards }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-row gap-3 w-full">
      {cards.map((card, idx) => {
        let IconElement = <Calendar size="20" color="#014370" variant="Linear" />;
        if (idx === 1) IconElement = <Receipt21 size="20" color="#004AC6" variant="Linear" />;
        else if (idx === 2) IconElement = <PresentionChart size="20" color="#0D9488" variant="Linear" />;
        else if (idx === 3) IconElement = <Heart size="20" color="#16A34A" variant="Linear" />;

        return (
          <div key={card.id} className="BoxStyle flex-1 flex flex-col bg-white rounded-xl p-5 border border-[#EDF3FD]">
            {/* Row 1 */}
            <div className="flex items-center justify-between">
              <div 
                className="rounded-xl w-10 h-10 flex items-center justify-center shrink-0" 
                style={{ backgroundColor: card.iconBg }}
              >
                {IconElement}
              </div>
              {card.pillText && (
                <div 
                  className="font-medium text-xs leading-4 text-right"
                  style={{ color: card.iconColor }}
                >
                  {card.pillText}
                </div>
              )}
            </div>

            {/* Row 2 */}
            <div className="flex items-baseline gap-0 mt-2">
              <span className="font-semibold text-2xl leading-8 text-[#0D1C2E]">
                {card.value}
              </span>
              {card.unit && (
                <span className="font-semibold text-2xl leading-8 text-[#6B7280]">
                  {card.unit}
                </span>
              )}
            </div>

            {/* Row 3 */}
            <div className="mt-1">
              <span className="font-medium text-[13px] leading-4 text-[#464555]">
                {card.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
