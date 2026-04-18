import React, { useState } from 'react';
import { X } from 'lucide-react';

interface NoResponseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoResponseDrawer: React.FC<NoResponseDrawerProps> = ({ isOpen, onClose }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('All');

  const allLeads = [
    { name: 'Ravi Sharma', phone: '+91 98765 43210', status: 'No Response', initials: 'RS' },
    { name: 'John Doe', phone: '+1 555-0199', status: 'Interested', initials: 'JD' },
    { name: 'Anita Malik', phone: 'anita@globalops.in', status: 'No Response', initials: 'AM' },
    { name: 'Priya Mehta', phone: 'priyam@techcorp.com', status: 'Not Interested', initials: 'PM' },
    { name: 'Suresh Raina', phone: '+91 92837 46554', status: 'No Response', initials: 'SR' },
    { name: 'Megha Gupta', phone: 'megha@example.com', status: 'Interested', initials: 'MG' },
    { name: 'Rahul Verma', phone: '+91 98123 45678', status: 'Not Interested', initials: 'RV' },
  ];

  const filteredLeads = allLeads.filter(lead =>
    activeTab === 'All' || lead.status === activeTab
  );

  const visibleLeads = showAll ? filteredLeads : filteredLeads.slice(0, 4);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-all duration-300"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transform transition-transform duration-300 ease-in-out rounded-l-[10px] ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="pt-[30px] px-[20px] flex justify-between items-start bg-white border-b border-[#5A5A5A]/20 rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">No Response</h2>
              <p className="text-[#64748B] text-[12px]">Leads without response after outreach</p>
            </div>
            <button
              onClick={onClose}
              className="w-[20px] h-[20px] bg-[#004370] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-[20px] no-scrollbar bg-white">
            <div className="mb-6">
              <h3 className="text-[12px] font-bold text-[#000000] mb-3">Response Overview</h3>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'TOTAL LEADS', value: allLeads.length.toString() },
                  { label: 'NOT RESPOND', value: allLeads.filter(l => l.status === 'No Response').length.toString() },
                  { label: 'INTERESTED', value: allLeads.filter(l => l.status === 'Interested').length.toString() },
                  { label: 'NOT INTERESTED', value: allLeads.filter(l => l.status === 'Not Interested').length.toString() }
                ].map((stat, i) => (
                  <div key={i} className="bg-[#F2F4F6] p-[5px] rounded-[5px] flex flex-col items-center">
                    <span className="text-[8px] font-bold text-[#64748B] mb-1 text-center whitespace-nowrap">{stat.label}</span>
                    <span className="text-[16px] font-extrabold text-[#004370]">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[12px] font-bold text-[#000000]">Lead Status List</h3>
              </div>

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
                {['All', 'Interested', 'Not Interested', 'No Response'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-[5px] text-[14px] font-bold transition-all 
                      ${activeTab === tab
                        ? 'bg-[#004370] text-white'
                        : 'text-[#64748B] hover:bg-slate-50'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                {visibleLeads.length > 0 ? (
                  visibleLeads.map((item, i) => (
                    <div key={i} className="p-2">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-[40px] h-[40px] rounded-[12px] bg-[#DBEAFE] flex items-center justify-center text-[12px] font-bold text-[#004370]">
                            {item.initials}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[12px] font-bold text-[#191C1E]">{item.name}</span>
                            <span className="text-[11px] text-[#94A3B8]">{item.phone}</span>
                          </div>
                        </div>
                        <span className={`text-[6px] font-bold px-2 py-0.5 rounded-[5px] tracking-tighter ${item.status === 'Interested' ? 'bg-green-100 text-green-700' :
                          item.status === 'No Response' ? 'bg-[#DFE0E0] text-[#6B7280]' :
                            item.status === 'Not Interested' ? 'bg-[#FEE2E2] text-[#BA1A1A]' :
                              'bg-[#236C11]/30 text-[#115700]'
                          }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 bg-[#F4F6F8] rounded-[5px]">
                    <p className="text-[#64748B] text-[13px]">No leads found in this category.</p>
                  </div>
                )}
              </div>

              {filteredLeads.length > 4 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full mt-8 h-[40px] bg-[#F2F4F6] text-[#878788] text-[13px] font-bold rounded-[5px] hover:bg-[#E2E8F0] transition-colors"
                >
                  {showAll ? 'See less' : 'See more'}
                </button>
              )}

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoResponseDrawer;


