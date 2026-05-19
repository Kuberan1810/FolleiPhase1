import React, { useState } from 'react';
import { X, Search, ChevronDown, Check } from 'lucide-react';
import BtnCom from '../../../../../../Component/BtnCom';

interface SendMessageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const SendMessageDrawer: React.FC<SendMessageDrawerProps> = ({ isOpen, onClose }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today');
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);

  const timeframes = ['Today', 'Yesterday', 'Last Week', 'All Time'];

  const allActivity = [
    { name: 'Ravi Sharma', phone: '+91 98765 43210', status: 'Discovery call completed, duration: 8:25s', time: 'Today, 4:33 PM', type: 'Response' },
    { name: 'John Doe', phone: '+1 555 0199', status: 'We would love to support your business goals.', time: 'Today, 1:50 PM', type: 'Sent' },
    { name: 'Anita Malik', phone: 'anita@globalops.in', status: 'Discovery call completed, duration: 9:25s', time: 'Today, 9:00 AM', type: 'Response' },
    { name: 'Suresh Raina', phone: '+91 92837 46554', status: 'Initial Outreach message sent.', time: 'Yesterday, 5:00 PM', type: 'Sent' },
    { name: 'Megha Gupta', phone: 'megha@example.com', status: 'Follow-up email opened.', time: 'Yesterday, 2:15 PM', type: 'Delivered' },
    { name: 'Rahul Verma', phone: '+91 98123 45678', status: 'Message delivered to recipient.', time: '2 days ago', type: 'Delivered' },
    { name: 'David Wilson', phone: '+44 20 7946 0958', status: 'Introductory call scheduled.', time: 'Last Week', type: 'Response' },
  ];

  const filteredActivity = allActivity.filter(item => {
    const matchesTab = activeTab === 'All' || item.type.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTimeframe = true;
    if (selectedTimeframe !== 'All Time') {
      matchesTimeframe = item.time.includes(selectedTimeframe);

    }

    return matchesTab && matchesSearch && matchesTimeframe;
  });

  const visibleActivity = showAll ? filteredActivity : filteredActivity.slice(0, 4);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-all duration-300 cursor-pointer"
          onClick={() => {
            onClose();
            setIsTimeframeOpen(false);
          }}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transform transition-transform duration-300 ease-in-out rounded-l-[10px] ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="pt-[30px] px-[20px] flex justify-between items-start bg-white border-b border-[#5A5A5A]/20 rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">Send Message Activity</h2>
              <p className="text-[#434655] text-[12px]">See delivery status, opens, and replies in one place.</p>
            </div>
            <button
              onClick={onClose}
              className="w-[20px] h-[20px] bg-[#004370] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-[20px] no-scrollbar bg-[#FFFFFF]">
            <div className="flex gap-2 mb-6 overscroll-x-auto no-scrollbar">
              {['All', 'Sent', 'Delivered', 'Response'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-[5px] text-[14px] font-bold transition-all whitespace-nowrap 
                    ${activeTab === tab
                      ? 'bg-[#004370] text-white'
                      : 'text-[#64748B] hover:bg-slate-50'} cursor-pointer`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-6 relative">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" />
                <input
                  type="text"
                  placeholder="Search Activity"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[40px] pl-10 pr-4 bg-[#F2F4F6] rounded-[5px] text-[14px] outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
                  className={`h-[40px] px-4 bg-[#F2F4F6] rounded-[5px] flex items-center gap-3 text-[#64748B] text-[14px] font-bold transition-colors cursor-pointer ${isTimeframeOpen ? 'bg-[#E2E8F0]' : ''}`}
                >
                  <span>{selectedTimeframe}</span>
                  <ChevronDown size={16} strokeWidth={3} className={`transition-transform duration-200 ${isTimeframeOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTimeframeOpen && (
                  <div className="absolute right-0 top-[45px] w-[140px] bg-white border border-[#E2E8F0] rounded-[10px] shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => {
                          setSelectedTimeframe(tf);
                          setIsTimeframeOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#004370] flex items-center justify-between group cursor-pointer"
                      >
                        {tf}
                        {selectedTimeframe === tf && <Check size={14} className="text-[#004370]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-[14px] font-bold text-[#191C1E] mb-4">Send message activity</h3>
            <div className="space-y-4">
              {visibleActivity.length > 0 ? (
                visibleActivity.map((item, i) => (
                  <div key={i} className="p-2">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-[12px] flex items-center justify-center text-[12px] font-bold ${[
                          'bg-blue-100 text-blue-700',
                          'bg-purple-100 text-purple-700',
                          'bg-green-100 text-green-700',
                          'bg-amber-100 text-amber-700',
                          'bg-pink-100 text-pink-700',
                          'bg-indigo-100 text-indigo-700',
                          'bg-emerald-100 text-emerald-700',
                          'bg-rose-100 text-rose-700',
                          'bg-sky-100 text-sky-700',
                          'bg-orange-100 text-orange-700'
                        ][i % 10]}`}>
                          {item.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-[#191C1E]">{item.name}</span>
                          <span className="text-[11px] text-[#94A3B8]">{item.phone}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#64748B] font-bold">{item.time}</span>
                    </div>
                    <div className="bg-[#F4F6F8] p-[10px] rounded-[5px] text-[10px] text-[#595C5E] italic border-[#1D7EBE]">
                      "{item.status}"
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-white rounded-[8px] border border-dashed border-[#E2E8F0]">
                  <p className="text-[#64748B] text-[14px]">No activity found for this timeframe.</p>
                </div>
              )}
            </div>

            {filteredActivity.length > 4 && (
              <BtnCom
                title={showAll ? 'See less' : 'See more'}
                onClick={() => setShowAll(!showAll)}
                variant="secondary"
                className="w-full mt-5 h-[40px] !bg-[#E6E7E9] !text-[#878788]"
              />
            )}

            <div className="mt-8">
              <BtnCom
                title="Assign to Sales Rep"
                className="w-full h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SendMessageDrawer;


