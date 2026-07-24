
const MetricsCards = () => {
  const metrics = [
    { title: 'LEAD SCORE', value: '92', suffix: '/100', sub: 'High Intent', subColor: 'text-[#10B981]', valueColor: 'text-[#10B981]' },
    { title: 'DEAL VALUE', value: '₹90K', suffix: '', sub: 'Estimated Opportunity', subColor: 'text-[#6B7280]' },
    { title: 'RESPONSE RATE', value: '68%', suffix: '', sub: 'Above Average', subColor: 'text-[#6B7280]' },
    { title: 'BANT SCORE', value: '96%', suffix: '', sub: 'Excellent', valueColor: 'text-[#006A6A] text-[14px] bg-[#DBFEE8]', subColor: 'text-[#006A6A]' },
    { title: 'MEDDIC SCORE', value: '78%', suffix: '', sub: 'Strong Opportunity', valueColor: 'text-[#4F46E5]', subColor: 'text-[#4F46E5]' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {metrics.map((m, i) => (
        <div key={i} className="BoxStyle flex flex-col justify-center">
          <span className="md:text-[16px] text-[12px] font-semibold text-[#464555] tracking-wider mb-2">{m.title}</span>
          <div className="flex items-baseline gap-1 mb-1.5">
            <span className={`md:text-[30px] text-[20px] font-bold tracking-tight rounded-full px-2 ${m.valueColor || 'text-[#191C1E]'}`}>{m.value}</span>
            {m.suffix && <span className="md:text-[18px] text-[14px] font-medium text-[#6B7280]">{m.suffix}</span>}
          </div>
          <div className={`flex items-center gap-1.5 text-[14px] font-medium ${m.subColor}`}>
            {m.sub}
          </div>
        </div>
      ))}
    </div>
  )
}
export default MetricsCards;
