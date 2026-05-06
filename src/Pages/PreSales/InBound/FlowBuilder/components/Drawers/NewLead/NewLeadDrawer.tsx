import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import BtnCom from '../../../../../../../Component/BtnCom';

interface NewLeadDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewLeadDrawer: React.FC<NewLeadDrawerProps> = ({ isOpen, onClose }) => {
  const [showAllLeads, setShowAllLeads] = useState(false);

  const recentLeads = [
    { name: 'Ravi Sharma', phone: '+91 98765 43210', initial: 'RS', color: '#DBEAFE' },
    { name: 'John Doe', phone: '+1 555 0199', initial: 'JD', color: '#F3E8FF' },
    { name: 'Anita Malik', phone: 'anita@globalops.in', initial: 'AM', color: '#FCE7F3' },
    { name: 'Priya Mehta', phone: 'priya@techcorp.com', initial: 'PM', color: '#DCFCE7' },
    { name: 'Suresh Raina', phone: '+91 92837 46554', initial: 'SR', color: '#DBEAFE' },
    { name: 'Megha Gupta', phone: 'megha@example.com', initial: 'MG', color: '#F3E8FF' },
    { name: 'Rahul Verma', phone: '+91 98765 12345', initial: 'RV', color: '#FCE7F3' },
    { name: 'Sneha Kapur', phone: 'sneha@abc.com', initial: 'SK', color: '#DCFCE7' }
  ];

  const visibleLeads = showAllLeads ? recentLeads : recentLeads.slice(0, 4);
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-all duration-300 cursor-pointer"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transform transition-transform duration-300 ease-in-out rounded-l-[10px] ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="pt-[30px] px-[25px] flex justify-between items-start bg-white border-b border-[#E2E8F0] rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">New Lead</h2>
              <p className="text-[#434655] text-[12px]">Track newly joined leads in real-time</p>
            </div>
            <button
              onClick={onClose}
              className="w-[24px] h-[24px] bg-[#004370] rounded-full flex items-center justify-center text-white cursor-pointer"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[25px] py-6 no-scrollbar bg-white">
            <div className="mb-6">
              <h3 className="text-[12px] font-[600] text-[#000000] mb-4">Performance Overview</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'TODAY', value: '74' },
                  { label: 'THIS WEEK', value: '254' },
                  { label: 'THIS MONTH', value: '1056' },
                  { label: 'THIS MONTH', value: '1056' }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#F2F4F6] p-2.5 rounded-[5px] flex flex-col gap-1.5">
                    <span className="text-[8px] font-bold text-[#94A3B8] tracking-tight">{stat.label}</span>
                    <span className="text-[16px] font-extrabold text-[#004370] leading-none">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]" />
                  <h3 className="text-[11px] font-[900] text-[#191C1E] tracking-wider uppercase">LIVE ACTIVITY</h3>
                </div>
                <button className="text-[11px] font-[700] text-[#1D7EBE] hover:underline cursor-pointer">View All</button>
              </div>

              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {[
                  { name: 'Ravi Sharma', phone: '+91 98765 43210', initial: 'RS', color: '#DBEAFE' },
                  { name: 'Jhon Doe', phone: '+91 98765 43210', initial: 'JD', color: '#FEF3C7' },
                  { name: 'Anita Malik', phone: '+91 98765 43210', initial: 'AM', color: '#FEE2E2' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 p-[5px] bg-[#F8F9FB] min-w-[108px] h-[35px] border border-transparent">
                    <div className="w-[25px] h-[25px] rounded-[5px] flex items-center justify-center text-[11px] font-bold text-[#004370]" style={{ backgroundColor: item.color }}>
                      {item.initial}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-[#191C1E] whitespace-nowrap">{item.name}</span>
                      <span className="text-[8px] text-[#94A3B8] font-medium">{item.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mb-6 w-full">
              <div className="relative flex items-center w-full h-[48px] px-4 bg-[#F2F4F6] rounded-[10px] group transition-all">
                <Search size={18} className="text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search Leads"
                  className="w-full h-full ml-2.5 bg-transparent text-[13px] font-medium text-[#191C1E] outline-none placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            <div>
              <h3 className="text-[14px] font-[700] text-[#191C1E] mb-4">Recent Leads</h3>
              <div className="space-y-3">
                {visibleLeads.map((item, i) => (
                  <div key={i} className="flex items-center justify-between pt-3.5 bg-white cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[12px] font-bold text-[#004370]" style={{ backgroundColor: item.color }}>
                        {item.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#191C1E] group-hover:text-[#1D7EBE] transition-colors">{item.name}</span>
                        <span className="text-[11px] text-[#64748B] font-medium">{item.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {recentLeads.length > 4 && (
                <BtnCom
                  title={showAllLeads ? 'See less' : 'See more'}
                  onClick={() => setShowAllLeads(!showAllLeads)}
                  variant="secondary"
                  className="w-full mt-5 h-[40px] !bg-[#E6E7E9] !text-[#878788]"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewLeadDrawer;

