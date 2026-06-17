import React from 'react';
import { MessageCircle } from 'lucide-react';

const MetricsCards = () => {
  const metrics = [
    { title: 'LEAD SCORE', value: '92', suffix: '/100', sub: 'High Intent', subColor: 'text-green-500', valueColor: 'text-green-500' },
    { title: 'DEAL VALUE', value: '₹90K', suffix: '', sub: 'Estimated Opportunity', subColor: 'text-[#A0B0C0]' },
    { title: 'RESPONSE RATE', value: '68%', suffix: '', sub: 'Above Average', subColor: 'text-[#A0B0C0]' },
    { title: 'HEALTH', value: 'Excellent', suffix: '', sub: 'Actively Engaged', valueColor: 'text-green-500', subColor: 'text-[#A0B0C0]' },
    { title: 'LAST ACTIVITY', value: '2m ago', suffix: '', sub: 'WhatsApp Reply', subColor: 'text-[#A0B0C0]', icon: true },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {metrics.map((m, i) => (
        <div key={i} className="bg-white rounded-[20px] p-5 border border-[#EDF3FD] flex flex-col justify-center">
          <span className="text-[11px] font-bold text-[#64748B] tracking-wider mb-2">{m.title}</span>
          <div className="flex items-baseline gap-1 mb-1.5">
            <span className={`text-[28px] font-extrabold tracking-tight ${m.valueColor || 'text-[#191C1E]'}`}>{m.value}</span>
            {m.suffix && <span className="text-[13px] font-semibold text-[#64748B]">{m.suffix}</span>}
          </div>
          <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${m.subColor}`}>
            {m.icon && <MessageCircle className="w-3.5 h-3.5 text-green-500" fill="#22C55E" stroke="white" />}
            {m.sub}
          </div>
        </div>
      ))}
    </div>
  )
}
export default MetricsCards;
