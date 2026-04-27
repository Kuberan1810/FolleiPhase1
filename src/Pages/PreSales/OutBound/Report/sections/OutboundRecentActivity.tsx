import { useState, useRef, useEffect } from 'react';
import { Filter, Download, ChevronDown, Check } from 'lucide-react';

const OutboundRecentActivity = () => {
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('All Status');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const initialData = [
    { name: 'Indhu', contact: '+91 8976543278', channel: 'Email', status: 'Sent', engagement: 'Opened', result: 'Demo Schedule', action: 'Follow up' },
    { name: 'Indhu', contact: '+91 8976543278', channel: 'Email', status: 'Sent', engagement: 'Opened', result: 'Demo Schedule', action: 'Follow up' },
    { name: 'Indhu', contact: '+91 8976543278', channel: 'Email', status: 'Sent', engagement: 'Opened', result: 'Demo Schedule', action: 'Follow up' },
    { name: 'Indhu', contact: '+91 8976543278', channel: 'Email', status: 'Sent', engagement: 'Opened', result: 'Demo Schedule', action: 'Follow up' },
    { name: 'Indhu', contact: '+91 8976543278', channel: 'Email', status: 'Sent', engagement: 'Opened', result: 'Demo Schedule', action: 'Follow up' },
    { name: 'Indhu', contact: '+91 8976543278', channel: 'Email', status: 'Sent', engagement: 'Opened', result: 'Demo Schedule', action: 'Follow up' },
    { name: 'Indhu', contact: '+91 8976543278', channel: 'Email', status: 'Sent', engagement: 'Opened', result: 'Demo Schedule', action: 'Follow up' },

  ];

  const statusOptions = ['All Status', 'Sent', 'Pending', 'Failed'];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsStatusOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredData = selectedStatus === 'All Status'
    ? initialData
    : initialData.filter(item => item.status === selectedStatus);

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 pr-6">
        <h2 className="text-[20px] font-bold text-[#222222]">Recent Outreach Activity</h2>
        <div className="flex gap-3">
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsStatusOpen(!isStatusOpen)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-[12px] text-[13px] font-bold cursor-pointer transition-all 
                ${isStatusOpen || selectedStatus !== 'All Status'
                  ? 'bg-[#FFFFFF] border-[#EBEBEB] text-[#000000]'
                  : 'bg-[#FFFFFF] border-[#EBEBEB] text-[#000000] hover:bg-slate-50'
                }`}
            >
              <Filter size={14} />
              {selectedStatus}
              <ChevronDown size={14} className={`transition-transform duration-200 ${isStatusOpen ? 'rotate-180' : ''}`} />
            </button>

            {isStatusOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-[180px] bg-white border border-[#E2E8F0] rounded-[12px] shadow-xl z-[100] py-2 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-1.5 border-b border-[#F1F5F9] mb-1">
                  <span className="text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider">Filter Status</span>
                </div>
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setSelectedStatus(status);
                      setIsStatusOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-[13px] font-medium transition-colors cursor-pointer
                      ${selectedStatus === status
                        ? 'bg-[#F0F9FF] text-[#004370]'
                        : 'text-[#475569] hover:bg-slate-50'
                      }`}
                  >
                    {status}
                    {selectedStatus === status && <Check size={14} className="text-[#004370]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 px-4 py-2 border border-[#EBEBEB] rounded-[12px] bg-white text-[14px] font-bold text-[#000000] hover:bg-slate-50 cursor-pointer transition-all">
            <Download size={14} />
            Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#EBEBEB] rounded-[16px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#015891]/10 border-b-[1px] border-[#EBEBEB]">
                <th className="px-6 py-4 text-[16px] font-semibold text-[#015891] tracking-wider whitespace-nowrap">Name</th>
                <th className="px-6 py-4 text-[16px] font-semibold text-[#015891] tracking-wider whitespace-nowrap">Contact Info</th>
                <th className="px-6 py-4 text-[16px] font-semibold text-[#015891] tracking-wider whitespace-nowrap">Channel</th>
                <th className="px-6 py-4 text-[16px] font-semibold text-[#015891] tracking-wider whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-[16px] font-semibold text-[#015891] tracking-wider whitespace-nowrap">Engagement</th>
                <th className="px-6 py-4 text-[16px] font-semibold text-[#015891] tracking-wider whitespace-nowrap">Result</th>
                <th className="px-6 py-4 text-[16px] font-semibold text-[#015891] tracking-wider whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#1E293B]">
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-5 text-[16px] font-medium whitespace-nowrap">{row.name}</td>
                  <td className="px-6 py-5 text-[16px] text-[#475569] whitespace-nowrap">{row.contact}</td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[11px] font-bold ${row.channel === 'Email' ? 'bg-[#D0E4FF] text-[#00497A]' :
                      row.channel === 'LinkedIn' ? 'bg-[#EEF2FF] text-[#4338CA]' :
                        'bg-[#D0E4FF] text-[#166534]'
                      }`}>
                      {row.channel}
                    </span>
                  </td>
                  <td className="px-6 py-5 whitespace-nowrap">
                    <span className={`text-[13px] font-bold px-2.5 py-1 rounded-[10px] ${row.status === 'Sent' ? 'bg-[#F2F7F7] text-[#006A6A]' :
                      row.status === 'Failed' ? 'bg-[#FEF2F2] text-[#EF4444]' : 'bg-[#FFFBEB] text-[#F59E0B]'
                      }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[16px] text-[#000000] font-medium whitespace-nowrap">{row.engagement}</td>
                  <td className="px-6 py-5 text-[16px] text-[#000000] font-medium whitespace-nowrap">{row.result}</td>
                  <td className="px-6 py-5 text-[16px] whitespace-nowrap">
                    <button className="text-[#333333] font-bold hover:underline cursor-pointer">
                      {row.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="py-20 text-center text-[#94A3B8] font-medium">
              No results found for status "{selectedStatus}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutboundRecentActivity;
