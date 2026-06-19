import React from 'react';
import { Whatsapp } from 'iconsax-react';

interface MetricsCardsProps {
  customer: {
    activeProducts: number;
    daysRemaining: string;
    renewalDate: string;
    lastActivity: string;
    lastActivityPlatform: string;
  };
}


const MetricsCards: React.FC<MetricsCardsProps> = () => {
  const metricsData = [
    {
      label: 'Active Products',
      value: '4',
      footerText: null,
      footerColor: 'text-[#64748B]'
    },
    {
      label: 'Contract Value',
      value: '₹4.8L / Year',
      footerText: '+12% vs last year',
      footerColor: 'text-[#16A34A] font-bold'
    },
    {
      label: 'Renewal In',
      value: '45 Days',
      footerText: 'Exp: 14 Jan 2025',
      footerColor: 'text-[#64748B]'
    },
    {
      label: 'Open Tickets',
      value: '3 ',
      footerText: 'Requires Attention',
      footerColor: 'text-[#64748B]'
    },
    {
      label: 'Last Activity',
      value: '2m ago',
      icon: Whatsapp,
      footerText: 'WhatsApp Reply',
      footerColor: 'text-[#64748B]'
    }
  ];

  return (
    <div className="flex flex-wrap gap-5 w-full">
      {metricsData.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className="bg-white border border-[#EDF3FD] rounded-[24px] p-5 shadow-[0_4px_20px_rgba(237,243,253,0.25)] flex flex-col justify-between h-[120px] w-full sm:w-[calc(50%-10px)] lg:w-[200px] xl:flex-1 min-w-[200px]"
          >
            <span className="text-[12px] font-bold text-[#64748B] uppercase tracking-wider">{card.label}</span>
            <span className="text-[32px] font-bold text-[#0D1C2E] leading-none">
              {card.label === 'Contract Value' ? (
                <>
                  {card.value.split(' / ')[0]}
                  <span className="text-sm font-medium text-[#64748B]"> / {card.value.split(' / ')[1]}</span>
                </>
              ) : (
                card.value
              )}
            </span>
            {card.footerText && (
              <div className={`flex items-center gap-1.5 text-xs ${card.footerColor}`}>
                {IconComponent && <IconComponent className="w-3.5 h-3.5" size={14} variant="Bold" />}
                <span className="capitalize">{card.footerText}</span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MetricsCards;
