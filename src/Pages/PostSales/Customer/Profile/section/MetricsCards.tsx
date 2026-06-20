
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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {metrics.map((m, i) => (
        <div key={i} className="BoxStyle flex flex-col justify-center">
          <span className="text-[16px] font-semibold text-[#464555] tracking-wider mb-2">{m.title}</span>
          <div className="flex items-baseline gap-1 mb-1.5">
            <span className={`text-[30px] font-bold tracking-tight text-[#191C1E]`}>{m.value}</span>
            {m.suffix && <span className="text-[18px] font-medium text-[#6B7280]">{m.suffix}</span>}
          </div>
          <div className={`flex items-center gap-1.5 text-[14px] font-medium ${m.subColor}`}>
            {m.icon && <Whatsapp size={16} className=" text-[#10B981]" color='currentColor' fill="#22C55E" stroke="white" />}
            {m.sub}
          </div>
        </div>
      ))}
    </div>
  )
}
export default MetricsCards;
