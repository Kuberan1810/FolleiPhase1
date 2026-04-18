import React from 'react';
import { X, MessageSquare, Mail, Phone, MessageCircle, Pen, ChevronUp, ChevronDown } from 'lucide-react';

interface EditActionDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  delayValue: number;
  setDelayValue: (val: number | ((prev: number) => number)) => void;
  delayUnit: string;
  setDelayUnit: (val: string) => void;
  isBusinessHoursOnly: boolean;
  setIsBusinessHoursOnly: (val: boolean) => void;
}

const EditActionDrawer: React.FC<EditActionDrawerProps> = ({
  isOpen,
  onClose,
  delayValue,
  setDelayValue,
  delayUnit,
  setDelayUnit,
  isBusinessHoursOnly,
  setIsBusinessHoursOnly,
}) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[70] transition-all duration-300"
          onClick={onClose}
        />
      )}

      <div className={`fixed top-0 right-0 h-screen w-[379px] bg-white z-[80] transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full shadow-none'}`}>
        <div className="h-full flex flex-col overflow-hidden">
          <div className="h-[92px] pt-[30px] px-[20px] flex justify-between items-start bg-white border-b border-[#5A5A5A]/20 rounded-b-[10px] pb-4">
            <div className="flex flex-col gap-[5px]">
              <h2 className="text-[#004370] text-[20px] font-bold tracking-tight leading-none">Edit Action</h2>
              <p className="text-[#64748B] text-[13px] leading-none">Automation node</p>
            </div>
            <button
              onClick={onClose}
              className="w-[20px] h-[20px] bg-[#004370] rounded-full flex items-center justify-center transition-colors text-white mt-[-4px]"
            >
              <X size={16} strokeWidth={3} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-[20px] no-scrollbar">
            <div className="space-y-4">
              <div>
                <label className="text-[14px] font-[700] text-[#191C1E] block mb-2">Select Channel</label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: MessageSquare, label: 'SMS' },
                    { icon: Mail, label: 'Email' },
                    { icon: Phone, label: 'Phone' },
                    { icon: MessageCircle, label: 'WhatsApp' }
                  ].map((item, i) => (
                    <button key={i} className="flex flex-col items-center justify-center gap-2.5 p-3 rounded-[10px] border-[1px] border-[#E2E8F0] transition-all hover:bg-[#F8FAFC]">
                      <div className="text-[#004370] ">
                        <item.icon size={24} className='w-[20px] h-[20px] rounded-[4px] bg-[#C1C7D1]/30 p-1' />
                      </div>
                      <span className="text-[12px] font-bold text-[#595C5E]">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-[14px] font-[700] text-[#191C1E]">Message Template</label>
                  <button className="text-[13px] font-[700] text-[#1D7EBE] hover:underline">Create New</button>
                </div>
                <div className="flex items-center justify-between p-3.5 border border-[#E2E8F0] rounded-[8px] bg-[#F8FAFC] group cursor-pointer hover:border-[#CBD5E1] transition-all">
                  <span className="text-[14px] text-[#191C1E] font-medium">Welcome Email - New Leads</span>
                  <div className="flex items-center gap-2">
                    <button className="text-[#64748B] p-1.5 hover:bg-white rounded-md border border-transparent hover:border-[#E2E8F0] transition-all">
                      <Pen size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[14px] font-[700] text-[#191C1E] block mb-4">Delay before sending</label>
                <div className="flex gap-4">
                  <div className="flex-[0.4] relative flex border border-[#E2E8F0] rounded-[8px] bg-white group focus-within:border-[#004370] transition-all overflow-hidden">
                    <input
                      type="number"
                      value={delayValue}
                      onChange={(e) => setDelayValue(Number(e.target.value))}
                      className="w-full h-[46px] px-4 bg-transparent text-[14px] font-bold text-[#191C1E] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <div className="flex flex-col w-[32px] shrink-0 ">
                      <button
                        onClick={() => setDelayValue(prev => (typeof prev === 'number' ? prev + 1 : prev))}
                        className="flex-1 flex items-center justify-center hover:bg-slate-50 transition-color text-[#64748B] hover:text-[#004370]"
                      >
                        <ChevronUp size={12} strokeWidth={3} />
                      </button>
                      <button
                        onClick={() => setDelayValue(prev => (typeof prev === 'number' ? Math.max(0, prev - 1) : prev))}
                        className="flex-1 flex items-center justify-center hover:bg-slate-50 transition-colors text-[#64748B] hover:text-[#004370]"
                      >
                        <ChevronDown size={12} strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 relative group">
                    <select
                      value={delayUnit}
                      onChange={(e) => setDelayUnit(e.target.value)}
                      className="w-full h-[48px] px-4 pr-10 border border-[#E2E8F0] rounded-[8px] bg-white text-[14px] text-[#191C1E] outline-none focus:border-[#004370] transition-all appearance-none cursor-pointer font-medium"
                    >
                      <option>Minutes</option>
                      <option>Hours</option>
                      <option>Days</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => setIsBusinessHoursOnly(!isBusinessHoursOnly)}
                      className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors duration-200 ${isBusinessHoursOnly ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`}
                    >
                      <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all duration-200 ${isBusinessHoursOnly ? 'right-1' : 'left-1'}`} />
                    </div>
                    <span className="text-[14px] font-medium text-[#595C5E]">Send within business hours only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-18 p-6 mt-auto border-t border-[#E2E8F0] flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 h-[48px] rounded-[10px] bg-[#F1F5F9] text-[#64748B] font-bold text-[15px] hover:bg-[#E2E8F0] transition-colors"
            >
              Cancel
            </button>
            <button
              className="flex-1 h-[48px] rounded-[10px] text-white font-bold text-[15px] shadow-sm hover:shadow-lg transition-all"
              style={{
                background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)',
              }}
              onClick={onClose}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditActionDrawer;
