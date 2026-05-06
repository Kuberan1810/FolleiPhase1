import React, { useState } from 'react';
import { Filter, Upload, ChevronDown } from 'lucide-react';
import AdvancedFilters from './AdvancedFilters';

const RecentActivity = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [callStatus, setCallStatus] = useState('Completed');
  
  const rawData = [
    { name: 'Indhu', phone: '+91 8976543278', status: 'Completed', conversion: '8.5 %' },
    { name: 'Indhu', phone: '+91 8976543278', status: 'Completed', conversion: '8.5 %' },
    { name: 'Indhu', phone: '+91 8976543278', status: 'Busy', conversion: '4.2 %' },
    { name: 'Indhu', phone: '+91 8976543278', status: 'No Answer', conversion: '0.0 %' },
    { name: 'Indhu', phone: '+91 8976543278', status: 'Completed', conversion: '8.5 %' },
    { name: 'Indhu', phone: '+91 8976543278', status: 'Busy', conversion: '4.2 %' },
    { name: 'Indhu', phone: '+91 8976543278', status: 'No Answer', conversion: '0.0 %' },
    { name: 'Indhu', phone: '+91 8976543278', status: 'Completed', conversion: '8.5 %' },
  ];

  const filteredData = rawData.filter(item => !callStatus || item.status === callStatus);

  const getStatusStyle = (status: string) => {
    const baseStyle = "inline-flex items-center justify-center w-[100px] h-[26px] rounded-[10px] bg-[#F2F7F7] text-[14px] font-medium transition-colors";
    
    switch (status) {
      case 'Completed':
        return `${baseStyle} text-[#006D77]`;
      case 'Busy':
        return `${baseStyle} text-[#D93025]`;
      case 'No Answer':
        return `${baseStyle} text-[#64748B]`;
      default:
        return `${baseStyle} text-[#64748B]`;
    }
  };

  return (
    <div className="relative">
      <AdvancedFilters 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        callStatus={callStatus}
        setCallStatus={setCallStatus}
      />

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="md:text-2xl text-xl font-medium text-[#222]">Recent Activity</h2>
        <div className="flex gap-3">
          <div className="">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setIsFilterOpen(!isFilterOpen);
              }}
              className="flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer shadow-xs"
            >
              <Filter size={16} />
              Filter
              <span className="ml-1 "><ChevronDown size={16}/></span>
            </button>
          </div>

          <button className="flex items-center gap-2 px-3 py-1.5 border border-[#E2E8F0] rounded-lg bg-white text-sm font-medium text-slate-600 hover:bg-slate-50 cursor-pointer shadow-xs">
            <Upload size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white border border-[#E2E8F090] rounded-[16px] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#E0F2FE]/40 border-b border-[#E2E8F0]">
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider">Phone Number</th>
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider text-center">Call Status</th>
                <th className="px-6 py-4 text-sm font-bold text-[#1e3a8a] uppercase tracking-wider text-center">Conversion Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F090] text-[#333333] font-medium">
              {filteredData.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-[16px]">{row.name}</td>
                  <td className="px-6 py-4 text-[16px]">{row.phone}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={getStatusStyle(row.status)}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[16px] text-center">{row.conversion}</td>
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