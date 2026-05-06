import React, { useState } from 'react';
import { X, ChevronDown, Bell, Send, Check, Clock } from 'lucide-react';
import BtnCom from '../../../../../../../Component/BtnCom';

interface UpdateStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateStatusDrawer: React.FC<UpdateStatusDrawerProps> = ({ isOpen, onClose }) => {
  const [showAll, setShowAll] = useState(false);
  const [filterSource, setFilterSource] = useState('No Response');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [reminderEnabled, setReminderEnabled] = useState(true);

  const filterOptions = ['All', 'No Response', 'Interested'];

  const allLeads = [
    { name: 'Ravi Sharma', phone: '+91 98765 43210', initials: 'RS', lastMessage: 'Last message 2 days ago', avatarBg: '#DBEAFE', avatarText: '#004370', status: 'No Response' },
    { name: 'John Doe', phone: '+91 98765 43210', initials: 'oD', lastMessage: 'Last message 1 day ago', avatarBg: '#F3E8FF', avatarText: '#6B21A8', status: 'No Response' },
    { name: 'Anita malik', phone: '+91 98765 43210', initials: 'AM', lastMessage: 'Last message 12 hours ago', avatarBg: '#FCE7F3', avatarText: '#9D174D', status: 'No Response' },
    { name: 'priya Mehta', phone: '+91 98765 43210', initials: 'PM', lastMessage: 'Last message 6 hours ago', avatarBg: '#DCFCE7', avatarText: '#166534', status: 'No Response' },
    { name: 'John Doe', phone: '+91 98765 43210', initials: 'oD', lastMessage: 'Last message 1 days ago', avatarBg: '#FEF3C7', avatarText: '#92400E', status: 'No Response' },
    { name: 'Vikram Singh', phone: '+91 91234 56789', initials: 'VS', lastMessage: 'Last message 3 hours ago', avatarBg: '#DBEAFE', avatarText: '#004370', status: 'No Response' },
    { name: 'Sneha Kapur', phone: '+91 98765 54321', initials: 'SK', lastMessage: 'Last message 1 hour ago', avatarBg: '#FCE7F3', avatarText: '#9D174D', status: 'No Response' },
  ];

  const filteredLeads = allLeads.filter(lead =>
    filterSource === 'All' || lead.status === filterSource
  );

  const visibleLeads = showAll ? filteredLeads : filteredLeads.slice(0, 4);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-all duration-300 cursor-pointer"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transition-transform duration-300 ease-in-out overflow-hidden flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="pt-[30px] px-[25px] flex justify-between items-start bg-white border-b border-[#E2E8F0] rounded-b-[10px] pb-4">
          <div className="flex flex-col gap-[5px]">
            <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">Update Status</h2>
            <p className="text-[#434655] text-[12px]">Update lead progress and track status changes.</p>
          </div>
          <button
            onClick={onClose}
            className="w-[24px] h-[24px] bg-[#004370] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
          >
            <X size={14} strokeWidth={3} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 no-scrollbar bg-white">
          <div className="mb-6 relative z-50">
            <label className="block text-[14px] font-bold text-[#000000] mb-2 px-1">Filter Source</label>
            <div className="relative">
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full h-[44px] bg-[#F2F4F6] rounded-[5px] flex items-center justify-between px-4 cursor-pointer hover:bg-[#E2E8F0] transition-all"
              >
                <span className="text-[#004370] text-[14px] font-bold">{filterSource}</span>
                <ChevronDown size={18} className={`text-[#64748B] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isDropdownOpen && (
                <div className="absolute top-[50px] left-0 w-full bg-white border border-[#E2E8F0] rounded-[10px] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {filterOptions.map((option) => (
                    <div
                      key={option}
                      onClick={() => {
                        setFilterSource(option);
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2.5 hover:bg-[#F8FAFC] flex items-center justify-between cursor-pointer group"
                    >
                      <span className={`text-[13px] font-semibold ${filterSource === option ? 'text-[#004370]' : 'text-[#64748B] group-hover:text-[#004370]'}`}>
                        {option}
                      </span>
                      {filterSource === option && <Check size={14} className="text-[#004370]" />}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4 px-1">
              <h3 className="text-[14px] font-bold text-[#000000]">{filterSource} Lead list</h3>

            </div>

            <div className="space-y-6">
              {visibleLeads.length > 0 ? (
                visibleLeads.map((lead, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[12px] font-bold"
                        style={{ backgroundColor: lead.avatarBg, color: lead.avatarText }}
                      >
                        {lead.initials}
                      </div>
                      <div className="flex flex-col text-left">
                        <span className="text-[12px] font-bold text-[#191C1E] leading-none mb-1">{lead.name}</span>
                        <span className="text-[10px] text-[#94A3B8] font-medium leading-none mb-1">{lead.phone}</span>
                        <div className="flex items-center gap-1">
                          <Clock size={8} className="text-[#004370]" />
                          <span className="text-[6px] text-[#004370] font-medium">{lead.lastMessage}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-0.5 py-0.5 rounded-[3px] flex items-center justify-center min-w-[70px] ${lead.status === 'Interested' ? 'bg-[#DCFCE7] text-[#166534]' :
                      lead.status === 'No Response' ? 'bg-[#DFE0E0] text-[#6B7280]' :
                        'bg-[#F2F4F6] text-[#64748B]'
                      }`}>
                      <span className="text-[8px] font-bold uppercase tracking-wider">
                        {lead.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-[#F2F4F6] rounded-[5px]">
                  <p className="text-[#64748B] text-[13px] font-medium">No leads match this filter.</p>
                </div>
              )}
            </div>

            {filteredLeads.length > 4 && (
              <BtnCom
                title={showAll ? 'See less' : 'See more'}
                onClick={() => setShowAll(!showAll)}
                variant="secondary"
                className="w-full mt-5 h-[48px] !bg-[#E6E7E9] !text-[#878788]"
              />
            )}
          </div>

          <div className="mb-5">
            <div className={`flex items-center justify-between bg-[#F2F5F8] p-[10px] rounded-[5px] transition-all ${reminderEnabled ? 'border-[#DBEAFE]' : ''}`}>
              <div className="flex items-center gap-3">
                <Bell size={18} className="text-[#004370]" />
                <span className="text-[14px] font-bold text-[#004370]">Reminder Settings</span>
              </div>
              <button
                onClick={() => setReminderEnabled(!reminderEnabled)}
                className={`w-[36px] h-[20px] rounded-full relative transition-colors duration-200 flex items-center px-1 cursor-pointer ${reminderEnabled ? 'bg-[#0058BC]' : 'bg-[#E2E8F0]'}`}
              >
                <div className={`w-[12px] h-[12px] bg-white rounded-full transition-transform duration-200 ${reminderEnabled ? 'translate-x-[16px]' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 h-[41px] bg-[#004370]/5 rounded-[5px] hover:bg-[#F2F4F6] group transition-all cursor-pointer">
              <Send size={14} className="text-[#004370]" />
              <span className="text-[12px] font-semibold text-[#004370]">Send Now</span>
            </button>
            <button className="flex items-center justify-center gap-2 h-[41px] bg-[#004370]/5 rounded-[5px] hover:bg-[#F2F4F6] group transition-all cursor-pointer">
              <Check size={16} className="text-[#004370]" />
              <span className="text-[12px] font-semibold text-[#004370]">Followed up</span>
            </button>
          </div>

          <div className="mt-8">
            <BtnCom
              title="Save Changes"
              className="w-full h-[40px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateStatusDrawer;




