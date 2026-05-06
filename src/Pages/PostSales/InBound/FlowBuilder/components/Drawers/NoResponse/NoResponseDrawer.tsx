import React, { useState } from 'react';
import { X, Search, ChevronDown, Check, Info, FileText, CircleSlash, MessageCircle, Phone, Send } from 'lucide-react';
import BtnCom from '../../../../../../../Component/BtnCom';

interface NoResponseDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NoResponseDrawer: React.FC<NoResponseDrawerProps> = ({ isOpen, onClose }) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today');
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);

  const timeframes = ['Today', 'Yesterday', 'Last Week', 'All Time'];

  const allActivity = [
    {
      name: 'Ravi Sharma',
      phone: '+91 98765 43210',
      initials: 'Rs',
      time: 'Today,4:30 PM',
      msg: 'No feedback after delivery',
      statusIcon: Info,
      channelIcon: Phone,
      channelColor: '#004370',
      type: 'Sent',
      avatarBg: '#E0F2FE',
      avatarText: '#004370'
    },
    {
      name: 'John Doe',
      phone: '+1 555-0199',
      initials: 'JD',
      time: 'Today,1:30 PM',
      msg: 'Reminder sent,No response',
      statusIcon: FileText,
      channelIcon: MessageCircle,
      channelColor: '#004370',
      type: 'Delivered',
      avatarBg: '#FFEDD5',
      avatarText: '#9A3412'
    },
    {
      name: 'Anita Malik',
      phone: 'anita@globalops.in',
      initials: 'AM',
      time: 'Today,9:00 AM',
      msg: 'Feedback request ignored',
      statusIcon: CircleSlash,
      channelIcon: Phone,
      channelColor: '#004370',
      type: 'Response',
      avatarBg: '#FCE7F3',
      avatarText: '#9D174D'
    },
  ];

  const filteredActivity = allActivity.filter(item => {
    const matchesTab = activeTab === 'All' || item.type.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.msg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase());

    let matchesTimeframe = true;
    if (selectedTimeframe !== 'All Time') {
      matchesTimeframe = item.time.includes(selectedTimeframe);
    }

    return matchesTab && matchesSearch && matchesTimeframe;
  });

  const visibleActivity = showAll ? filteredActivity : filteredActivity.slice(0, 2);

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
          <div className="pt-[30px] px-[25px] flex justify-between items-start bg-white border-b border-[#E2E8F0] rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">No Review Activity</h2>
              <p className="text-[#434655] text-[12px]">See delivery status, opens, and replies in one place.</p>
            </div>
            <button
              onClick={onClose}
              className="w-[24px] h-[24px] bg-[#004370] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[20px] py-6 no-scrollbar bg-white">
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Sent', 'Delivered', 'Response'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap px-4.5 py-1.5 rounded-[5px] text-[12px] font-bold transition-all 
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
                  className="w-full h-[40px] pl-10 pr-4 bg-[#F2F4F6] rounded-[5px] text-[14px] outline-none focus:border-[#3B82F6] transition-all"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
                  className={`h-[40px] px-4 rounded-[5px] bg-[#F2F4F6] flex items-center justify-between gap-3 transition-all group ${isTimeframeOpen ? 'border-[#3B82F6] ring-1 ring-[#3B82F6]' : 'border-[#E2E8F0]'}`}
                >
                  <span className="text-[13px] text-[#64748B] font-bold">{selectedTimeframe}</span>
                  <ChevronDown size={16} strokeWidth={3} className={`text-[#64748B] transition-transform duration-200 ${isTimeframeOpen ? 'rotate-180' : ''}`} />
                </button>
                {isTimeframeOpen && (
                  <>
                    <div className="fixed inset-0 z-[85] cursor-pointer" onClick={() => setIsTimeframeOpen(false)} />
                    <div className="absolute right-0 top-[calc(100%+8px)] w-[140px] bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg z-[90] py-1">
                      {timeframes.map((tf) => (
                        <button
                          key={tf}
                          onClick={() => {
                            setSelectedTimeframe(tf);
                            setIsTimeframeOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-[13px] font-semibold transition-colors flex items-center justify-between group cursor-pointer
                            ${selectedTimeframe === tf ? 'bg-[#F1F5F9] text-[#004370]' : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
                        >
                          {tf}
                          {selectedTimeframe === tf && <Check size={14} className="text-[#004370]" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <h3 className="text-[12px] font-bold text-[#191C1E] mb-4 px-1">Recent Review activity</h3>
            <div className="space-y-4">
              {visibleActivity.map((item, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div
                          className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[12px] font-bold shadow-sm"
                          style={{ backgroundColor: item.avatarBg, color: item.avatarText }}
                        >
                          {item.initials}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center shadow-sm">
                          <item.channelIcon size={10} style={{ color: item.channelColor }} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#191C1E] leading-none mb-1">{item.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-[#94A3B8] font-medium leading-none">{item.phone}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#191C1E] font-bold">{item.time}</span>
                  </div>
                  <div className="bg-[#F4F6F8] p-3 rounded-[5px] text-[10px] text-[#000000] flex items-center gap-2">
                    <item.statusIcon size={14} className="text-[#42474F] shrink-0" />
                    <p className="font-medium">"{item.msg}"</p>
                  </div>
                </div>
              ))}
            </div>

            {filteredActivity.length > 2 && (
              <BtnCom
                title={showAll ? 'See less' : 'See more'}
                onClick={() => setShowAll(!showAll)}
                variant="secondary"
                className="w-full mt-6 h-[40px] !bg-[#E6E7E9] !text-[#878788]"
              />
            )}

            <div className="mt-10">
              <BtnCom
                title="Send Reminder"
                icon={Send}
                className="w-full h-[40px]"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoResponseDrawer;