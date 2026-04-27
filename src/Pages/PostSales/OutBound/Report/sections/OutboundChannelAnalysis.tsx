
const OutboundChannelAnalysis = () => {
  const channels = [
    { name: 'SMS', value: 65, color: 'bg-[#004370]' },
    { name: 'Call', value: 36, color: 'bg-[#0E9F6E]' },
    { name: 'Email', value: 24, color: 'bg-[#FFB781]' },
  ];

  const engagementData = [
    { label: 'High Engagement', value: 58, color: '#0E9F6E', colorClass: 'bg-[#059669]' },
    { label: 'Medium Engagement', value: 18, color: '#FBB356', colorClass: 'bg-[#F59E0B]' },
    { label: 'Low Engagement', value: 8, color: '#FB5154', colorClass: 'bg-[#EF4444]' },
  ];

  const total = engagementData.reduce((acc, item) => acc + item.value, 0);
  let currentOffset = 0;
  const gap = 5.5;
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-[24px] lg:pr-6">
      <div className="xl:col-span-6 bg-white rounded-[16px] p-[36px]">
        <h3 className="text-[16px] font-bold text-[#64748B] tracking-[1.5px] uppercase mb-8">
          TOP CHANNELS
        </h3>
        <div className="space-y-6">
          {channels.map((channel) => (
            <div key={channel.name} className="flex items-center gap-2">
              <span className="text-[18px] font-bold text-[#1E293B] min-w-[50px] leading-[24px] font-manrope">{channel.name}</span>
              <div className="flex-1 flex items-center gap-4">
                <div className="flex-1 h-[30px] flex items-center gap-3">
                  <div
                    className={`h-full ${channel.color} rounded-r-full rounded-l-none transition-all duration-1000`}
                    style={{ width: ` ${channel.value}%` }}
                  />
                  <span className="text-[18px] font-bold text-[#1E293B] whitespace-nowrap font-manrope">
                    {channel.value}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="xl:col-span-6 bg-white rounded-[16px] p-8 flex flex-col">
        <div className="flex flex-col gap-1 mb-8">
          <h3 className="text-[16px] font-bold text-[#64748B] tracking-[1.5px] uppercase">
            ENGAGEMENT ANALYSIS
          </h3>
          <p className="text-[16px] font-medium text-[#222222] leading-snug max-w-[340px] font-inter">
            Track audience interaction across all outreach channels.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 flex-1">
          <div className="relative w-[125px] h-[125px]">
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              {engagementData.map((item, idx) => {
                const percentage = (item.value / total) * 100;
                const dashArray = `${percentage - gap} ${100 - (percentage - gap)}`;
                const offset = -currentOffset;
                currentOffset += percentage;

                return (
                  <circle
                    key={idx}
                    cx="18"
                    cy="18"
                    r="15.915"
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth="4.5"
                    strokeDasharray={dashArray}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                );
              })}
            </svg>
          </div>

          <div className="flex-1 w-full space-y-4">
            {engagementData.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-[12px] h-[12px] rounded-full ${item.colorClass}`} />
                  <span className="text-[16px] font-bold text-[#222222] font-manrope">{item.label}</span>
                </div>
                <span className="text-[16px] font-bold text-[#222222] font-manrope">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutboundChannelAnalysis;
