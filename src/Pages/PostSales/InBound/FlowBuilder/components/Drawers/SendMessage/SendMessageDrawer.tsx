import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import BtnCom from '../../../../../../../Component/BtnCom';

interface SendMessageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendMessageDrawer: React.FC<SendMessageDrawerProps> = ({ isOpen, onClose }) => {
  const [showAllLeads, setShowAllLeads] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const recentLeads = [
    { name: 'Ravi Sharma', status: 'Feedback Received', time: '2 Mins ago', initial: 'RS', color: '#DBEAFE' },
    { name: 'John Doe', status: 'Feedback Received', time: '2 Mins ago', initial: 'JD', color: '#FEF3C7' },
    { name: 'Anita Malik', status: 'Review Submitted', time: '15 Mins ago', initial: 'AM', color: '#FEE2E2' },
    { name: 'Priya Mehta', status: 'Review Submitted', time: '30 Mins ago', initial: 'PM', color: '#D1FAE5' },
    { name: 'Suresh Raina', status: 'Feedback Received', time: '1 Hour ago', initial: 'SR', color: '#DBEAFE' },
    { name: 'Megha Gupta', status: 'Review Submitted', time: '2 Hours ago', initial: 'MG', color: '#FEF3C7' },
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
              <h2 className="text-[#004370] text-[20px] font-semibold tracking-tight">Engage Customer</h2>
              <p className="text-[#434655] text-[12px]">Post sale engagement with smart automation</p>
            </div>
            <button
              onClick={onClose}
              className="w-[24px] h-[24px] bg-[#004370] rounded-full flex items-center justify-center text-white cursor-pointer"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[20px] py-4 no-scrollbar bg-white">
            <div className="mb-6">
              <h3 className="text-[12px] font-[600] text-[#000000] mb-4">Performance Overview</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'TODAY', value: '74' },
                  { label: 'THIS WEEK', value: '254' },
                  { label: 'THIS MONTH', value: '1056' },
                  { label: 'THIS MONTH', value: '1056' }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#F2F4F6] p-[5px] rounded-[5px] flex flex-col gap-1.5">
                    <span className="text-[8px] font-medium text-[#94A3B8] tracking-tight">{stat.label}</span>
                    <span className="text-[16px] font-extrabold text-[#004370] leading-none">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-[8px] h-[8px] rounded-full bg-[#006058]" />
                  <h3 className="text-[10px] font-[900] text-[#006058] tracking-wider uppercase">LIVE ACTIVITY</h3>
                </div>
                <button className="text-[10px] font-[700] text-[#004370] hover:underline cursor-pointer">View All</button>
              </div>

              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {[
                  { name: 'Ravi Sharma', phone: '+91 98765 43210', initial: 'RS', color: '#DBEAFE' },
                  { name: 'John Doe', phone: '+91 98765 43210', initial: 'JD', color: '#FEF3C7' },
                  { name: 'Anita Malik', phone: '+91 98765 43210', initial: 'AM', color: '#FEE2E2' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-1.5 p-[5px] bg-[#F8F9FB] min-w-[108px] h-[35px] rounded-[5px]">
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

            <div className="relative mb-8">
              <div className="relative flex items-center w-full h-[36px] px-4 bg-[#F2F4F6] rounded-[5px]">
                <Search size={18} className="text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search Leads"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-full ml-2.5 bg-transparent text-[14px] font-medium text-[#191C1E] outline-none placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            <div>
              <h3 className="text-[14px] font-[600] text-[#191C1E] mb-6">Recent Leads</h3>
              <div className="space-y-6">
                {visibleLeads.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 cursor-pointer group">
                    <div
                      className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[12px] font-bold text-[#004370]"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.initial}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[12px] font-bold text-[#191C1E]">{item.name}</span>
                        <span className="text-[10px] text-[#94A3B8]">→</span>
                        <span className="text-[10px] text-[#6C6E6F] font-semibold">{item.status}</span>
                      </div>
                      <span className="text-[11px] text-[#5E6164] font-medium leading-none">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <BtnCom
                title={showAllLeads ? 'See less' : 'See more'}
                onClick={() => setShowAllLeads(!showAllLeads)}
                variant="secondary"
                className="w-full mt-10 h-[40px] !bg-[#E6E7E9] !text-[#878788]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMessageDrawer;
