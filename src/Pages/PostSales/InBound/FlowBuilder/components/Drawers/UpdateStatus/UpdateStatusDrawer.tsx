import React, { useState } from 'react';
import { X, Search, ChevronDown, Check, Send, Smartphone, Mail, Phone, MessageCircle } from 'lucide-react';
import BtnCom from '../../../../../../../Component/BtnCom';

interface UpdateStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const UpdateStatusDrawer: React.FC<UpdateStatusDrawerProps> = ({ isOpen, onClose }) => {
  const [delayValue, setDelayValue] = useState('15');
  const [delayUnit, setDelayUnit] = useState('Days');
  const [businessHoursOnly, setBusinessHoursOnly] = useState(true);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['sms']);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Today');
  const [isTimeframeOpen, setIsTimeframeOpen] = useState(false);
  const [isUnitOpen, setIsUnitOpen] = useState(false);

  const stats = [
    { label: 'TODAY', value: '130' },
    { label: 'PENDING', value: '56' },
    { label: 'RESPONSE', value: '60' },
    { label: 'NO RESPONSE', value: '25' }
  ];

  const channels = [
    { id: 'sms', icon: Smartphone, label: 'SMS' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'phone', icon: Phone, label: 'Phone' },
    { id: 'whatsapp', icon: MessageCircle, label: 'Whatsapp' }
  ];

  const audience = [
    { name: 'Ravi Sharma', phone: '+91 98765 43210', initial: 'Rs', status: 'Reminder Sent', color: '#DBEAFE', statusColor: 'bg-[#86F2E4]/30 text-[#006A61]', channelIcon: Phone, channelColor: '#11629D' },
    { name: 'John Doe', phone: '+1 555-0199', initial: 'JD', status: 'Delivered', color: '#FFEDD5', statusColor: 'bg-[#EFF6FF] text-[#2563EB]', channelIcon: MessageCircle, channelColor: '#11629D' }
  ];

  const filteredAudience = audience.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

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
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight">Automation Reminder</h2>
              <p className="text-[#434655] text-[12px] font-medium leading-none mt-1">Queue And Configuration</p>
            </div>
            <button
              onClick={onClose}
              className="w-[24px] h-[24px] bg-[#004370] rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity cursor-pointer"
            >
              <X size={14} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-[20px] py-6 no-scrollbar bg-white">
            <div className="grid grid-cols-4 gap-2 mb-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-[#F2F4F6] p-2.5 rounded-[5px] flex flex-col gap-1.5 items-center">
                  <span className="text-[8px] font-bold text-[#94A3B8] tracking-tight text-center">{stat.label}</span>
                  <span className="text-[16px] font-extrabold text-[#004370] leading-none">{stat.value}</span>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <h3 className="text-[12px] font-bold text-[#191C1E] mb-4">Delay before sending</h3>
              <div className="flex gap-3 mb-4">
                <div className="relative w-[180px]">
                  <input
                    type="text"
                    value={delayValue}
                    onChange={(e) => setDelayValue(e.target.value)}
                    className="w-full h-[24px] border border-[#E2E8F0] rounded-[5px] px-3 pr-8 text-[13px] font-medium text-[#191C1E] outline-none"
                  />
                  <div className="absolute right-2 top-0 bottom-0 flex flex-col items-center justify-center">
                    <button
                      onClick={() => setDelayValue(prev => (parseInt(prev) + 1).toString())}
                      className="hover:text-[#004370] transition-colors cursor-pointer"
                    >
                      <ChevronDown size={10} className="rotate-180" />
                    </button>
                    <button
                      onClick={() => setDelayValue(prev => Math.max(0, parseInt(prev) - 1).toString())}
                      className="hover:text-[#004370] transition-colors cursor-pointer"
                    >
                      <ChevronDown size={10} />
                    </button>
                  </div>
                </div>
                <div className="relative flex-1">
                  <button
                    onClick={() => setIsUnitOpen(!isUnitOpen)}
                    className={`w-full h-[24px] px-3 border border-[#E2E8F0] rounded-[5px] flex items-center justify-between text-[13px] font-medium text-[#191C1E] transition-all group cursor-pointer ${isUnitOpen ? 'border-[#3B82F6]' : ''}`}
                  >
                    <span>{delayUnit}</span>
                    <ChevronDown size={14} strokeWidth={2} className={`text-[#64748B] transition-transform duration-200 ${isUnitOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUnitOpen && (
                    <>
                      <div className="fixed inset-0 z-[85] cursor-pointer" onClick={() => setIsUnitOpen(false)} />
                      <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg z-[90] py-1 animate-in fade-in zoom-in-95 duration-100 overflow-hidden">
                        {['Days', 'Hours'].map((unit) => (
                          <button
                            key={unit}
                            onClick={() => {
                              setDelayUnit(unit);
                              setIsUnitOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-[13px] font-semibold transition-colors flex items-center justify-between group cursor-pointer
                              ${delayUnit === unit
                                ? 'bg-[#F1F5F9] text-[#004370]'
                                : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
                          >
                            {unit}
                            {delayUnit === unit && <Check size={14} className="text-[#004370]" />}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setBusinessHoursOnly(!businessHoursOnly)}
                  className={`w-[44px] h-[22px] rounded-full transition-colors relative cursor-pointer ${businessHoursOnly ? 'bg-[#004370]' : 'bg-[#CBD5E1]'}`}
                >
                  <div className={`absolute top-1 w-3.5 h-3.5 bg-white rounded-full transition-all ${businessHoursOnly ? 'left-[26px]' : 'left-1'}`} />
                </button>
                <span className="text-[12px] text-[#434655] font-medium">Send within business hours only</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-8">
              {channels.map((channel) => (
                <button
                  key={channel.id}
                  onClick={() => {
                    setSelectedChannels(prev =>
                      prev.includes(channel.id)
                        ? prev.filter(id => id !== channel.id)
                        : [...prev, channel.id]
                    );
                  }}
                  className={`BoxStyle !p-2 flex flex-col items-center justify-center gap-1.5 h-auto py-3 transition-all cursor-pointer
                    ${selectedChannels.includes(channel.id)
                      ? '!bg-[#004370] !text-white !border-[#004370]'
                      : '!bg-white text-[#64748B] !border-[#E2E8F0] hover:!bg-[#F8FAFC]'}`}
                >
                  <channel.icon size={14} className={selectedChannels.includes(channel.id) ? 'text-white' : 'text-[#004370]'} />
                  <span className={`text-[10px] font-bold ${selectedChannels.includes(channel.id) ? 'text-white' : 'text-[#64748B]'}`}>{channel.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-8">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Search Activity"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[36px] pl-10 pr-4 bg-[#F2F4F6] rounded-[5px] text-[14px] outline-none"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
                  className="h-[40px] px-4 bg-[#F2F4F6] rounded-[5px] flex items-center gap-2 text-[14px] text-[#64748B] font-medium cursor-pointer transition-all hover:bg-[#E2E8F0]"
                >
                  {selectedTimeframe}
                  <ChevronDown size={14} className={`transition-transform duration-200 ${isTimeframeOpen ? 'rotate-180' : ''}`} />
                </button>

                {isTimeframeOpen && (
                  <>
                    <div className="fixed inset-0 z-[85] cursor-pointer" onClick={() => setIsTimeframeOpen(false)} />
                    <div className="absolute right-0 top-[calc(100%+4px)] w-[140px] bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg z-[90] py-1 animate-in fade-in zoom-in-95 duration-100">
                      {['Today', 'Yesterday', 'Last Week', 'All Time'].map((tf) => (
                        <button
                          key={tf}
                          onClick={() => {
                            setSelectedTimeframe(tf);
                            setIsTimeframeOpen(false);
                          }}
                          className={`w-full px-4 py-2 text-left text-[13px] font-semibold transition-colors flex items-center justify-between group cursor-pointer
                            ${selectedTimeframe === tf
                              ? 'bg-[#F1F5F9] text-[#004370]'
                              : 'text-[#64748B] hover:bg-[#F8FAFC]'}`}
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

            <div className="mb-10">
              <h3 className="text-[12px] font-semibold text-[#191C1E] mb-6">Target Audience</h3>
              <div className="space-y-8">
                {filteredAudience.map((item, i) => (
                  <div key={i} className="flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-[12px] font-bold"
                          style={{ backgroundColor: item.color, color: '#004370' }}
                        >
                          {item.initial}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-md">
                          <item.channelIcon size={12} style={{ color: item.channelColor }} strokeWidth={2.5} />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[12px] font-bold text-[#191C1E] leading-tight mb-1">{item.name}</span>
                        <span className="text-[11px] text-[#94A3B8] font-medium leading-none">{item.phone}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-[6px] text-[10px] font-bold ${item.statusColor}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>

              <BtnCom
                title="See more"
                variant="secondary"
                className="w-full mt-10 h-[36px] !bg-[#E6E8EA] !text-[#878788]"
              />
            </div>

            <div className="mt-auto">
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

export default UpdateStatusDrawer;
