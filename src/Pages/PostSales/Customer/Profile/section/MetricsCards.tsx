
import { Whatsapp } from 'iconsax-react';

const MetricsCards = () => {
  const metrics = [
    { title: 'ACTIVE PRODUCTS', value: '4', suffix: '', sub: '', subColor: 'text-[#6B7280]' },
    { title: 'CONTRACT VALUE', value: '₹4.8L', suffix: '/ Year', sub: '+12% from Last Year', subColor: 'text-[#10B981]' },
    { title: 'RENEWAL IN', value: '45 Days', suffix: '', sub: 'Exp. 14 Jan 2026', subColor: 'text-[#6B7280]' },
    { title: 'OPEN TICKETS', value: '3', suffix: '', sub: 'Requires Attention', subColor: 'text-[#6B7280]' },
    { title: 'LAST ACTIVITY', value: '2m ago', suffix: '', sub: 'WhatsApp Reply', subColor: 'text-[#6B7280]', icon: true },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 lg:grid-cols-5 gap-4 w-full">
      {metrics.map((m, i) => {
        let colSpanClass = "";
        if (i === 4) {
          // Last card
          colSpanClass = "col-span-2 sm:col-span-3 lg:col-span-1";
        } else if (i === 3) {
          // Card 4
          colSpanClass = "col-span-1 sm:col-span-3 lg:col-span-1";
        } else {
          // Cards 1, 2, 3
          colSpanClass = "col-span-1 sm:col-span-2 lg:col-span-1";
        }

        return (
          <div key={i} className={`BoxStyle flex flex-col justify-center min-h-[120px] ${colSpanClass}`}>
            <span className="text-[12px] font-bold text-[#64748B] tracking-[1.2px] uppercase mb-2">{m.title}</span>
            <div className="flex items-baseline gap-0.5 mb-1.5">
              <span className="text-[26px] font-bold tracking-tight text-[#191C1E] leading-none">{m.value}</span>
              {m.suffix && <span className="text-[14px] font-medium text-[#6B7280] leading-none">{m.suffix}</span>}
            </div>
            <div className={`flex items-center gap-1.5 text-[12px] font-medium ${m.subColor} leading-none`}>
              {m.icon && <Whatsapp size={14} className="text-[#10B981] shrink-0" color='currentColor' fill="#22C55E" stroke="white" />}
              <span>{m.sub}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default MetricsCards;
