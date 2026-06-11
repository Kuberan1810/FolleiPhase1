import { useState } from 'react';
import { Pencil, History, MessageSquare, Mail, Phone, MessageCircle, Clock, Sparkles } from 'lucide-react';
import { ChartSquare } from 'iconsax-react';

const EditActionPage = () => {
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [hotMin, setHotMin] = useState(80);
  const [hotMax, setHotMax] = useState(100);
  const [warmMin, setWarmMin] = useState(50);
  const [warmMax, setWarmMax] = useState(79);
  const [coldMin, setColdMin] = useState(0);
  const [coldMax, setColdMax] = useState(49);
  
  const [firstTouch, setFirstTouch] = useState(1);
  const [followUpInterval, setFollowUpInterval] = useState(24);
  const [maxRetries, setMaxRetries] = useState(5);
  const [isBusinessHoursOnly, setIsBusinessHoursOnly] = useState(true);
  const [stopOnReply, setStopOnReply] = useState(true);

  const [hotScript, setHotScript] = useState("Hello {{CustomerName}}, I noticed you're interested in {{CompanyName}}. Our senior consultant will call you in 5 minutes to discuss how we can help with your Sentinel deployment. Talk soon!");
  const [warmFlow, setWarmFlow] = useState("Hi {{CustomerName}}, thanks for checking out Sentinel. I've attached our enterprise case studies. Which part of the automation flow interested you most? Best, the Team.");
  const [coldDrip, setColdDrip] = useState("Hello {{CustomerName}}, just sharing our monthly automation trends. Sentinel recently updated its AI Lead Scoring engine. Have a look when you have a moment!");

  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 font-['Inter'] min-h-screen lg:mb-0 mb-20 pb-24 bg-[#F7F9FB]">
      <div className="px-4 lg:px-6 pt-4 lg:pt-6">
        <div className="flex items-end justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
          <div>
            <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#0F172A] font-manrope leading-none">
              Edit Action
            </h1>
            <p className="text-[13px] md:text-base text-[#64748B] mt-1 font-regular font-inter whitespace-nowrap">
              Smart Customer Activity Tracking
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[500px_minmax(0,1fr)] gap-5 items-start px-4 lg:px-6">
        <div className="BoxStyle p-6 w-full flex flex-col gap-6">
          {/* Card title row */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ChartSquare size={20} color="#004370" variant="Bold" />
              <h2 className="text-[#191C1E] font-['Inter'] font-semibold text-[18px] leading-[25.2px] tracking-[0px]">
                Lead Scoring
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[#191C1E]">
              <Pencil size={18} className="cursor-pointer hover:text-[#004370] transition-colors" />
              <History size={18} className="cursor-pointer hover:text-[#004370] transition-colors" />
            </div>
          </div>

          {/* Lead scoring rows */}
          <div className="flex flex-col gap-4">
            {/* Hot Leads */}
            <div className="bg-[#F7F9FB] rounded-[8px] p-[14px] px-[16px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-['Inter'] font-semibold text-[11px] leading-[11px] tracking-[0.55px] text-[#BA1A1A] uppercase">
                  Hot Leads
                </span>
                <span className="font-['Inter'] font-normal text-[11px] leading-[16.5px] tracking-[0px] text-[#464554]">
                  Immediate manual intervention triggered.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  value={hotMin}
                  onChange={(e) => setHotMin(Number(e.target.value))}
                  className="w-[48px] h-[32px] bg-white rounded-[4px] text-center font-['Inter'] font-bold text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none focus:border-[#004370]"
                />
                <span className="text-[#94A3B8] font-bold">-</span>
                <input
                  type="number"
                  value={hotMax}
                  onChange={(e) => setHotMax(Number(e.target.value))}
                  className="w-[48px] h-[32px] bg-white rounded-[4px] text-center font-['Inter'] font-bold text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none focus:border-[#004370]"
                />
              </div>
            </div>

            {/* Warm Leads */}
            <div className="bg-[#F7F9FB] rounded-[8px] p-[14px] px-[16px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-['Inter'] font-semibold text-[11px] leading-[11px] tracking-[0.55px] text-[#004370] uppercase">
                  Warm Leads
                </span>
                <span className="font-['Inter'] font-normal text-[11px] leading-[16.5px] tracking-[0px] text-[#464554]">
                  Automatic sequence and nurturing path.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  value={warmMin}
                  onChange={(e) => setWarmMin(Number(e.target.value))}
                  className="w-[48px] h-[32px] bg-white rounded-[4px] text-center font-['Inter'] font-bold text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none focus:border-[#004370]"
                />
                <span className="text-[#94A3B8] font-bold">-</span>
                <input
                  type="number"
                  value={warmMax}
                  onChange={(e) => setWarmMax(Number(e.target.value))}
                  className="w-[48px] h-[32px] bg-white rounded-[4px] text-center font-['Inter'] font-bold text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none focus:border-[#004370]"
                />
              </div>
            </div>

            {/* Cold Leads */}
            <div className="bg-[#F7F9FB] rounded-[8px] p-[14px] px-[16px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-['Inter'] font-semibold text-[11px] leading-[11px] tracking-[0.55px] text-[#767586] uppercase">
                  Cold Leads
                </span>
                <span className="font-['Inter'] font-normal text-[11px] leading-[16.5px] tracking-[0px] text-[#464554]">
                  Low frequency long-term nurture.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  value={coldMin}
                  onChange={(e) => setColdMin(Number(e.target.value))}
                  className="w-[48px] h-[32px] bg-white rounded-[4px] text-center font-['Inter'] font-bold text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none focus:border-[#004370]"
                />
                <span className="text-[#94A3B8] font-bold">-</span>
                <input
                  type="number"
                  value={coldMax}
                  onChange={(e) => setColdMax(Number(e.target.value))}
                  className="w-[48px] h-[32px] bg-white rounded-[4px] text-center font-['Inter'] font-bold text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none focus:border-[#004370]"
                />
              </div>
            </div>
          </div>

          {/* Card CTAs */}
          <div className="flex items-center gap-3 mt-2">
            <button className="flex-1 h-[40px] bg-[#004370] hover:bg-[#003152] text-white rounded-[8px] font-['Inter'] font-semibold text-[13px] leading-[19.5px] transition-colors cursor-pointer">
              Save Rules
            </button>
            <button 
              onClick={() => {
                setHotMin(80); setHotMax(100);
                setWarmMin(50); setWarmMax(79);
                setColdMin(0); setColdMax(49);
              }}
              className="flex-1 h-[40px] bg-[#F7F9FB] hover:bg-[#E2E8F0] text-[#191C1E] rounded-[8px] font-['Inter'] font-semibold text-[13px] leading-[19.5px] transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Right Column Wrapper */}
        <div className="w-full flex flex-col gap-5 min-w-0">
          {/* Select Channel */}
          <div className="BoxStyle !p-4 w-full flex flex-col gap-4">
          <h2 className="text-[#191C1E] font-['Inter'] font-semibold text-[18px] leading-[25.2px] tracking-[0px]">
            Select Channel
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: MessageSquare, label: 'SMS' },
              { icon: Mail, label: 'Email' },
              { icon: Phone, label: 'Phone' },
              { icon: MessageCircle, label: 'WhatsApp' }
            ].map((item, i) => {
              const isSelected = selectedChannels.includes(item.label);
              return (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedChannels(prev =>
                      prev.includes(item.label)
                        ? prev.filter(c => c !== item.label)
                        : [...prev, item.label]
                    );
                  }}
                  className={`BoxStyle !py-2 !px-2 flex flex-col items-center justify-center gap-1.5 h-[60px] transition-all cursor-pointer
                    ${isSelected
                      ? '!text-white !border-transparent'
                      : '!bg-white !border-[#E2E8F0] text-[#595C5E] hover:!bg-[#F8FAFC]'}`}
                  style={isSelected ? { background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)' } : {}}
                >
                  <div className={`${isSelected ? 'text-white' : 'text-[#004370]'}`}>
                    <item.icon size={24} className={`w-[20px] h-[20px] rounded-[4px] p-1 ${isSelected ? 'bg-white/20' : 'bg-[#C1C7D1]/30'}`} />
                  </div>
                  <span className={`text-[12px] font-bold ${isSelected ? 'text-white' : 'text-[#595C5E]'}`}>{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Reminder Cadence */}
        <div className="BoxStyle p-6 w-full flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <Clock size={20} color="#004370" />
            <h2 className="text-[#191C1E] font-['Inter'] font-semibold text-[18px] leading-[25.2px] tracking-[0px]">
              Reminder Cadence
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1: FIRST TOUCH */}
            <div className="bg-[#F7F9FB] rounded-[8px] p-[14px] px-[16px] flex flex-col gap-2">
              <span className="font-['Inter'] font-bold text-[11px] leading-[16.5px] tracking-[0px] text-[#464554] uppercase">
                FIRST TOUCH
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={firstTouch}
                  onChange={(e) => setFirstTouch(Number(e.target.value))}
                  className="bg-white rounded-[8px] h-[38px] w-full max-w-[150px] text-left px-4 font-['Inter'] font-normal text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="font-['Inter'] font-normal text-[13px] leading-[19.5px] text-[#464554] whitespace-nowrap">
                  Hours After
                </span>
              </div>
            </div>

            {/* Box 2: FOLLOW-UP INTERVAL */}
            <div className="bg-[#F7F9FB] rounded-[8px] p-[14px] px-[16px] flex flex-col gap-2">
              <span className="font-['Inter'] font-bold text-[11px] leading-[16.5px] tracking-[0px] text-[#464554] uppercase">
                FOLLOW-UP INTERVAL
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={followUpInterval}
                  onChange={(e) => setFollowUpInterval(Number(e.target.value))}
                  className="bg-white rounded-[8px] h-[38px] w-full max-w-[150px] text-left px-4 font-['Inter'] font-normal text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="font-['Inter'] font-normal text-[13px] leading-[19.5px] text-[#464554] whitespace-nowrap">
                  Hours Gap
                </span>
              </div>
            </div>

            {/* Box 3: MAX RETRIES */}
            <div className="bg-[#F7F9FB] rounded-[8px] p-[14px] px-[16px] flex flex-col gap-2">
              <span className="font-['Inter'] font-bold text-[11px] leading-[16.5px] tracking-[0px] text-[#464554] uppercase">
                MAX RETRIES
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={maxRetries}
                  onChange={(e) => setMaxRetries(Number(e.target.value))}
                  className="bg-white rounded-[8px] h-[38px] w-full max-w-[150px] text-left px-4 font-['Inter'] font-normal text-[13px] leading-none tracking-[0px] text-[#191C1E] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="font-['Inter'] font-normal text-[13px] leading-[19.5px] text-[#464554] whitespace-nowrap">
                  Attempts
                </span>
              </div>
            </div>

            {/* Box 4: Toggles */}
            <div className="bg-[#F7F9FB] rounded-[8px] p-[14px] px-[16px] flex flex-col justify-center gap-4">
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] font-semibold text-[13px] leading-[19.5px] text-[#1B1B23]">
                  Business Hours Only
                </span>
                <div
                  onClick={() => setIsBusinessHoursOnly(!isBusinessHoursOnly)}
                  className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors duration-200 ${isBusinessHoursOnly ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all duration-200 ${isBusinessHoursOnly ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-['Inter'] font-semibold text-[13px] leading-[19.5px] text-[#1B1B23]">
                  Stop on Reply
                </span>
                <div
                  onClick={() => setStopOnReply(!stopOnReply)}
                  className={`w-10 h-5 rounded-full relative p-1 cursor-pointer transition-colors duration-200 ${stopOnReply ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all duration-200 ${stopOnReply ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Engagement Templates */}
      <div className="px-4 lg:px-6">
        <div className="BoxStyle bg-white border border-[#C6C5D74D] w-full p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageSquare size={20} color="#004370" />
              <h2 className="text-[#191C1E] font-['Inter'] font-semibold text-[18px] leading-[25.2px] tracking-[0px]">
                Engagement Templates
              </h2>
            </div>
            <button
              className="flex items-center justify-center gap-2 bg-[#004370] hover:bg-[#003152] text-white font-['Inter'] font-semibold text-[13px] leading-[19.5px] tracking-[0px] px-4 h-[36px] rounded-[8px] transition-colors whitespace-nowrap cursor-pointer"
            >
              <Sparkles size={16} color="white" />
              AI Generate All
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hot Lead Script */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-['Inter'] font-semibold text-[11px] leading-[11px] tracking-[0.55px] text-[#BA1A1A] uppercase">
                  Hot Lead Script
                </span>
                <span className="font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                  320 chars max
                </span>
              </div>
              <textarea
                value={hotScript}
                onChange={(e) => setHotScript(e.target.value)}
                className="w-full min-h-[150px] bg-[#F7F9FB] border border-[#C6C5D74D] rounded-[8px] p-[12px] font-['Inter'] font-normal text-[13px] leading-[19.5px] text-[#1B1B23] outline-none focus:border-[#004370] resize-none"
              />
              <div className="flex justify-between items-center mt-1">
                <div className="flex gap-2">
                  <span className="bg-[#EFECF8] rounded-[4px] px-2 py-[2px] font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                    {`{{CustomerName}}`}
                  </span>
                  <span className="bg-[#EFECF8] rounded-[4px] px-2 py-[2px] font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                    {`{{CompanyName}}`}
                  </span>
                </div>
                <Pencil size={14} color="#1B1B23" className="cursor-pointer hover:text-[#004370] transition-colors" />
              </div>
            </div>

            {/* Warm Lead Flow */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-['Inter'] font-semibold text-[11px] leading-[11px] tracking-[0.55px] text-[#004370] uppercase">
                  Warm Lead Flow
                </span>
                <span className="font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                  Email Body
                </span>
              </div>
              <textarea
                value={warmFlow}
                onChange={(e) => setWarmFlow(e.target.value)}
                className="w-full min-h-[150px] bg-[#F7F9FB] border border-[#C6C5D74D] rounded-[8px] p-[12px] font-['Inter'] font-normal text-[13px] leading-[19.5px] text-[#1B1B23] outline-none focus:border-[#004370] resize-none"
              />
              <div className="flex justify-between items-center mt-1">
                <div className="flex gap-2">
                  <span className="bg-[#EFECF8] rounded-[4px] px-2 py-[2px] font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                    {`{{CustomerName}}`}
                  </span>
                  <span className="bg-[#EFECF8] rounded-[4px] px-2 py-[2px] font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                    {`{{CompanyName}}`}
                  </span>
                </div>
                <Pencil size={14} color="#1B1B23" className="cursor-pointer hover:text-[#004370] transition-colors" />
              </div>
            </div>

            {/* Cold Lead Drip */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-['Inter'] font-semibold text-[11px] leading-[11px] tracking-[0.55px] text-[#767586] uppercase">
                  Cold Lead Drip
                </span>
                <span className="font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                  General Intro
                </span>
              </div>
              <textarea
                value={coldDrip}
                onChange={(e) => setColdDrip(e.target.value)}
                className="w-full min-h-[150px] bg-[#F7F9FB] border border-[#C6C5D74D] rounded-[8px] p-[12px] font-['Inter'] font-normal text-[13px] leading-[19.5px] text-[#1B1B23] outline-none focus:border-[#004370] resize-none"
              />
              <div className="flex justify-between items-center mt-1">
                <div className="flex gap-2">
                  <span className="bg-[#EFECF8] rounded-[4px] px-2 py-[2px] font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                    {`{{CustomerName}}`}
                  </span>
                  <span className="bg-[#EFECF8] rounded-[4px] px-2 py-[2px] font-['Inter'] font-normal text-[10px] leading-[15px] text-[#464554]">
                    {`{{CompanyName}}`}
                  </span>
                </div>
                <Pencil size={14} color="#1B1B23" className="cursor-pointer hover:text-[#004370] transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Page Actions */}
      <div className="px-4 lg:px-6 flex justify-end gap-3 mt-auto">
        <button className="bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] font-inter font-semibold text-[14px] px-6 h-[44px] rounded-[8px] transition-colors cursor-pointer">
          Cancel
        </button>
        <button
          className="text-white font-inter font-semibold text-[14px] px-6 h-[44px] rounded-[8px] shadow-sm hover:shadow-lg transition-all cursor-pointer"
          style={{ background: 'linear-gradient(180deg, #1D7EBE 0%, #11629D 100%)' }}
        >
          Save changes
        </button>
      </div>
    </div>
  );
};

export default EditActionPage;
