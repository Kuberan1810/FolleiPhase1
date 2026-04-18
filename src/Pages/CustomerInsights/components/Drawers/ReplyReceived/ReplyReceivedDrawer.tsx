import React, { useState } from 'react';
import { X, Search, ChevronDown, Check } from 'lucide-react';

interface ReplyReceivedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReplyReceivedDrawer: React.FC<ReplyReceivedDrawerProps> = ({ isOpen, onClose }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today');
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);

  const timeframes = ['Today', 'Yesterday', 'Last Week', 'All Time'];

  const allReplies = [
    { name: 'Ravi Sharma', phone: '+91 98765 43210', initials: 'RS', time: 'Today, 2:30 PM', msg: "I'm interested. Could you explain the pricing and next steps?", type: 'Interested', avatarBg: '#DBEAFE', avatarText: '#004370' },
    { name: 'John Doe', phone: '+1 555-0199', initials: 'JD', time: 'Today, 1:50 PM', msg: "I'm interested. Could you explain the pricing and next steps?", type: 'Interested', avatarBg: '#F3E8FF', avatarText: '#6B21A8' },
    { name: 'Anita Malik', phone: 'anita@globalops.in', initials: 'AM', time: 'Today, 9:00 AM', msg: "I'm interested. Could you explain the pricing and next steps?", type: 'Interested', avatarBg: '#FCE7F3', avatarText: '#9D174D' },
    { name: 'Suresh Raina', phone: '+91 92837 46554', initials: 'SR', time: 'Yesterday, 4:20 PM', msg: 'Please call me tomorrow morning.', type: 'Interested', avatarBg: '#DCFCE7', avatarText: '#166534' },
    { name: 'Megha Gupta', phone: 'megha@example.com', initials: 'MG', time: 'Yesterday, 11:30 AM', msg: "Sounds good, let's proceed.", type: 'Interested', avatarBg: '#FEF3C7', avatarText: '#92400E' },
    { name: 'Vikram Singh', phone: '+91 91234 56789', initials: 'VS', time: '2 days ago', msg: 'Not interested at this moment.', type: 'Not Interested', avatarBg: '#DBEAFE', avatarText: '#004370' },
    { name: 'Sarah Parker', phone: '+1 555-0123', initials: 'SP', time: '3 days ago', msg: 'Please remove me from your list.', type: 'Not Interested', avatarBg: '#F3E8FF', avatarText: '#6B21A8' },
  ];

  const filteredReplies = allReplies.filter(item => {
    const matchesTab = activeTab === 'All' || item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.msg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTimeframe = true;
    if (selectedTimeframe !== 'All Time') {
      matchesTimeframe = item.time.includes(selectedTimeframe);
    }

    return matchesTab && matchesSearch && matchesTimeframe;
  });

  const visibleReplies = showAll ? filteredReplies : filteredReplies.slice(0, 3);

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-16 left-0 lg:left-64 right-0 bottom-0 bg-black/40 z-[30] transition-all duration-300"
          onClick={() => {
            onClose();
            setIsTimeframeOpen(false);
          }}
        />
      )}

      <div className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-[379px] bg-white z-[40] transform transition-transform duration-300 ease-in-out rounded-l-[10px] ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="pt-[30px] px-[25px] flex justify-between items-start bg-white border-b border-[#E2E8F0] rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">Reply Received</h2>
              <p className="text-[#434655] text-[12px]">View and manage responses from emails, SMS, and more.</p>
            </div>
            <button
              onClick={onClose}
              className="w-[24px] h-[24px] bg-[#004370] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[20px] py-6 no-scrollbar bg-white">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Interested', 'Not Interested', 'No Response'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-[5px] text-[12px] font-bold transition-all 
                    ${activeTab === tab
                      ? 'bg-[#004370] text-white'
                      : 'text-[#64748B] hover:bg-slate-50'}`}
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
                  placeholder="Search leads..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[40px] pl-10 pr-4 bg-[#F2F4F6] rounded-[5px] text-[14px] outline-none border border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
                  className={`h-[40px] px-4 bg-[#F2F4F6] rounded-[5px] flex items-center gap-3 text-[#64748B] text-[14px] font-bold transition-colors ${isTimeframeOpen ? 'bg-[#E2E8F0]' : ''}`}
                >
                  <span>{selectedTimeframe}</span>
                  <ChevronDown size={16} strokeWidth={3} className={`transition-transform duration-200 ${isTimeframeOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTimeframeOpen && (
                  <div className="absolute right-0 top-[45px] w-[140px] z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                    {timeframes.map((tf) => (
                      <button
                        key={tf}
                        onClick={() => {
                          setSelectedTimeframe(tf);
                          setIsTimeframeOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-[13px] font-semibold text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#004370] flex items-center justify-between group"
                      >
                        {tf}
                        {selectedTimeframe === tf && <Check size={14} className="text-[#004370]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-[12px] font-bold text-[#191C1E] mb-4 px-1">Recent Replies</h3>
            <div className="space-y-3">
              {visibleReplies.length > 0 ? (
                visibleReplies.map((item, i) => (
                  <div key={i} className="p-2 group">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[12px] font-bold"
                          style={{ backgroundColor: item.avatarBg, color: item.avatarText }}
                        >
                          {item.initials}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[12px] font-bold text-[#191C1E] leading-none mb-1">{item.name}</span>
                          <span className="text-[11px] text-[#94A3B8] font-medium leading-none">{item.phone}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-[#64748B] font-bold">{item.time}</span>
                    </div>
                    <div className="bg-[#F4F6F8] p-[12px] rounded-[8px] text-[10px] text-[#000000] italic">
                      "{item.msg}"
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-[#F2F4F6] rounded-[5px]">
                  <p className="text-[#64748B] text-[13px] font-medium">No replies found.</p>
                </div>
              )}
            </div>

            {filteredReplies.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full mt-8 h-[40px] bg-[#F2F4F6] text-[#878788] text-[13px] font-bold rounded-[5px] hover:bg-[#E2E8F0] transition-colors"
              >
                {showAll ? 'See less' : 'See more'}
              </button>
            )}

            <div className="mt-8">
              <button
                className="w-full h-[40px] rounded-[10px] text-white font-bold text-[15px] shadow-sm hover:shadow-lg transition-all active:scale-[0.98]"
                style={{ background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)' }}
                onClick={onClose}
              >
                Assign to Sales Rep
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReplyReceivedDrawer;
