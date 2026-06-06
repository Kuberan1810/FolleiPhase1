import { Filter, Upload, ChevronDown } from 'lucide-react';

const RecentActivity = () => {
  const tableData = Array(7).fill({
    name: 'Indhu',
    phone: '+91 8976543278',
    status: 'Completed',
    conversion: '8.5 %',
    aiResult: 'High Interest',
    followUp: 'WhatsApp',
  });

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="md:text-2xl text-xl font-medium text-[#222]">Recent Activity</h2>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer shadow-xs">
            <Filter size={16} />
            Filter
            <span className="ml-1 "><ChevronDown size={16}/></span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer shadow-xs">
            <Upload size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Container - Mobile Responsive Scroll */}
      <div className="bg-white border border-[#E2E8F090] rounded-[16px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#E0F2FE]/40 border-b border-[#E2E8F0]">
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider ">Name</th>
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider text-center">Call Status</th>
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider text-center">Conversion Rate</th>
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider">AI Result</th>
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider">Follow-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F090] text-[#333333] font-medium">
              {tableData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-[16px] ">{row.name}</td>
                  <td className="px-6 py-4 text-[16px]  ">{row.phone}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[16px]  border border-emerald-100">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-center text-[16px] ">{row.conversion}</td>
                  <td className="px-6 py-4 text-[16px] ">{row.aiResult}</td>
                  <td className="px-6 py-4 text-[16px] ">{row.followUp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;