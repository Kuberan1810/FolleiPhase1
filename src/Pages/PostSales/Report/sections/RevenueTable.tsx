import { RefreshCcw, TrendingUp, ChevronRight } from 'lucide-react';

const RevenueTable = () => {
  const activities = [
    {
      id: 1,
      initials: 'GL',
      name: 'Global Logistics Corp',
      segment: 'Enterprise Segment',
      action: 'Renewal + Upsell',
      icon: RefreshCcw,
      value: '$42,000',
      status: 'COMPLETED',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      id: 2,
      initials: 'SV',
      name: 'Skyline Ventures',
      segment: 'Growth Segment',
      action: 'Cross-sell (Module B)',
      icon: TrendingUp,
      value: '$12,500',
      status: 'IN PROGRESS',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      id: 3,
      initials: 'GL',
      name: 'Global Logistics Corp',
      segment: 'Enterprise Segment',
      action: 'Renewal + Upsell',
      icon: RefreshCcw,
      value: '$42,000',
      status: 'COMPLETED',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
  ];

  return (
    <div className="mt-6 bg-white rounded-[24px] shadow-xs border border-gray-50 overflow-hidden font-[Inter]">
      {/* Header */}
      <div className="px-8 py-6 flex justify-between items-center border-b border-gray-50">
        <h2 className="text-[18px] font-bold text-[#0B1C30]">Recent Account Activities</h2>
        <button className="flex items-center gap-1 text-sm font-bold text-[#004370] hover:opacity-80 transition-opacity">
          View Full History <ChevronRight size={16} />
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="bg-[#f8fafc]">
              <th className="px-8 py-4 text-left text-[11px] font-bold text-[#767686] uppercase tracking-widest">Account Name</th>
              <th className="px-8 py-4 text-left text-[11px] font-bold text-[#767686] uppercase tracking-widest">Action Type</th>
              <th className="px-8 py-4 text-left text-[11px] font-bold text-[#767686] uppercase tracking-widest">Value</th>
              <th className="px-8 py-4 text-left text-[11px] font-bold text-[#767686] uppercase tracking-widest">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {activities.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                {/* Account Name */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <div className={`${item.bgColor} ${item.textColor} w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm`}>
                      {item.initials}
                    </div>
                    <div>
                      <p className="font-bold text-[14px] text-[#0B1C30]">{item.name}</p>
                      <p className=" text-[11px] text-[#94A3B8] font-medium">{item.segment}</p>
                    </div>
                  </div>
                </td>

                {/* Action Type */}
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-slate-600">
                    <item.icon size={16} className="text-slate-400" />
                    <span className="text-sm font-medium">{item.action}</span>
                  </div>
                </td>

                {/* Value */}
                <td className="px-8 py-5">
                  <span className="text-sm font-bold text-slate-800">{item.value}</span>
                </td>

                {/* Status */}
                <td className="px-8 py-5">
                  <span className={`text-[10px] font-bold px-3 py-1.5 rounded-md ${
                    item.status === 'COMPLETED' 
                      ? 'bg-emerald-50 text-emerald-600' 
                      : 'bg-orange-50 text-orange-600'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RevenueTable;