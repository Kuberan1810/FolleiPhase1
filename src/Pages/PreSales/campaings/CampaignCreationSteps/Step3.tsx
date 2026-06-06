import {
  CalendarDays, Clock, Zap, Check, ArrowLeft, ChevronRight
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

interface Step3Props {
  scheduleType: string;
  setScheduleType: (val: string) => void;
  launchDate: Date;
  setLaunchDate: (val: Date) => void;
  launchTime: Date;
  setLaunchTime: (val: Date) => void;
  autoResponseEnabled: boolean;
  setAutoResponseEnabled: (val: boolean) => void;
  intentTrackingEnabled: boolean;
  setIntentTrackingEnabled: (val: boolean) => void;
  followUpTiming: string;
  setFollowUpTiming: (val: string) => void;
  onBack: () => void;
  onLaunch: () => void;
  onSaveDraft?: () => void;
}

const Step3 = ({
  scheduleType, setScheduleType,
  launchDate, setLaunchDate,
  launchTime, setLaunchTime,
  onBack, onLaunch, onSaveDraft
}: Step3Props) => {
  const isSendNow = scheduleType === 'send-now';

  return (
    <div className="space-y-12 font-manrope animate-in slide-in-from-right-4 duration-500">
      {/* Scheduling Section */}
      <section>
        <div className="flex items-center gap-2 mb-6">
          <CalendarDays className="text-[#001E40]" size={20} />
          <h2 className="text-[20px] font-[700] text-[#001E40] leading-[100%] tracking-[0px]">Scheduling</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Send Now Card */}
          <div
            onClick={() => {
              setScheduleType('send-now');
              setLaunchDate(new Date());
              setLaunchTime(new Date());
            }}
            className={`w-full h-auto min-h-[98px] p-4 rounded-[10px] border cursor-pointer transition-all relative flex items-center ${scheduleType === 'send-now'
              ? 'border-[#C3C6D1]/48 bg-white'
              : 'border-[#C3C6D1]/48'
              }`}
          >
            <div className="flex flex-col items-start gap-3">
              <Zap className="text-[#004370]" size={20} />
              <div>
                <p className="text-[#001E40] font-[600] text-[16px] leading-[24px]">Send Now</p>
                <p className="text-[#737780] text-[12px] font-normal leading-[16px]">Deploy immediately to 2,450 leads</p>
              </div>
            </div>
            {scheduleType === 'send-now' && (
              <div className="absolute top-4 right-4 w-[24px] h-[24px] bg-[#001E40] rounded-full flex items-center justify-center scale-in-90 animation-duration-200">
                <Check size={14} className="text-white" strokeWidth={4} />
              </div>
            )}
          </div>

          {/* Schedule Later Card */}
          <div
            onClick={() => setScheduleType('schedule-later')}
            className={`w-full h-auto min-h-[98px] p-4 rounded-[10px] border cursor-pointer transition-all relative flex items-center ${scheduleType === 'schedule-later'
              ? 'border-[#C3C6D1]/48 bg-white'
              : 'border-[#C3C6D1]/48'
              }`}
          >
            <div className="flex flex-col items-start gap-3">
              <Clock className="text-[#004370]" size={20} />
              <div>
                <p className="text-[#001E40] font-[600] text-[16px] leading-[24px]">Schedule Later</p>
                <p className="text-[#737780] text-[12px] font-normal leading-[16px]">Pick a custom window for launch</p>
              </div>
            </div>
            {scheduleType === 'schedule-later' && (
              <div className="absolute top-4 right-4 w-[24px] h-[24px] bg-[#001E40] rounded-full flex items-center justify-center scale-in-90 animation-duration-200">
                <Check size={14} className="text-white" strokeWidth={4} />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className={`text-[11px] font-[600] uppercase tracking-[1.1px] leading-[16.5px] mb-3 transition-colors ${isSendNow ? 'text-[#94A3B8]' : 'text-[#737780]'
              }`}>Launch Date</h3>
            <div className={`w-full h-[48px] rounded-[10px] px-4 flex items-center gap-3 font-medium text-[14px] relative transition-all ${isSendNow ? 'bg-[#E5ECF1]/50 opacity-60 cursor-not-allowed' : 'bg-[#F3F3F3] text-[#191C1E]'
              }`}>
              <CalendarDays size={16} className={isSendNow ? 'text-[#94A3B8]' : 'text-[#64748B]'} />
              <DatePicker
                selected={launchDate}
                onChange={(date: Date | null) => date && setLaunchDate(date)}
                dateFormat="MMM d, yyyy"
                disabled={isSendNow}
                className={`bg-transparent border-none outline-none w-full font-manrope text-[14px] ${isSendNow ? 'cursor-not-allowed text-[#737780]' : 'cursor-pointer text-[#191C1E]'
                  }`}
                calendarClassName="follei-datepicker"
              />
            </div>
          </div>
          <div>
            <h3 className={`text-[11px] font-[600] uppercase tracking-[1.1px] leading-[16.5px] mb-3 transition-colors ${isSendNow ? 'text-[#94A3B8]' : 'text-[#43474F]'
              }`}>Time (EST)</h3>
            <div className={`w-full h-[48px] rounded-[10px] px-4 flex items-center gap-3 font-medium text-[14px] relative transition-all ${isSendNow ? 'bg-[#E5ECF1]/50 opacity-60 cursor-not-allowed' : 'bg-[#F3F3F3] text-[#191C1E]'
              }`}>
              <Clock size={16} className={isSendNow ? 'text-[#94A3B8]' : 'text-[#64748B]'} />
              <DatePicker
                selected={launchTime}
                onChange={(date: Date | null) => date && setLaunchTime(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
                disabled={isSendNow}
                className={`bg-transparent border-none outline-none w-full font-manrope text-[14px] ${isSendNow ? 'cursor-not-allowed text-[#737780]' : 'cursor-pointer text-[#191C1E]'
                  }`}
                calendarClassName="follei-datepicker"
              />
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section
      <section className="pt-4">
        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="text-[#001E40]" size={20} />
          <h2 className="text-[20px] font-[700] text-[#001E40] leading-[100%] tracking-[0px]">AI Features</h2>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-5 bg-white border border-[#E2E8F0] rounded-[16px]">
            <div className="flex items-center gap-4">
              <MessageSquare className="text-[#004370]" size={18} />
              <p className="text-[#191C1E] font-[600] text-[14px]">Auto-response</p>
            </div>
            <button
              onClick={() => setAutoResponseEnabled(!autoResponseEnabled)}
              className={`w-[52px] h-[28px] rounded-full transition-all duration-300 relative cursor-pointer ${autoResponseEnabled ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${autoResponseEnabled ? 'left-[26px]' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-5 bg-white border border-[#E2E8F0] rounded-[16px]">
            <div className="flex items-center gap-4">
              <Target className="text-[#004370]" size={18} />
              <p className="text-[#191C1E] font-[600] text-[14px]">Intent Tracking</p>
            </div>
            <button
              onClick={() => setIntentTrackingEnabled(!intentTrackingEnabled)}
              className={`w-[52px] h-[28px] rounded-full transition-all duration-300 relative cursor-pointer ${intentTrackingEnabled ? 'bg-[#004370]' : 'bg-[#E2E8F0]'}`}
            >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${intentTrackingEnabled ? 'left-[26px]' : 'left-1'}`} />
            </button>
          </div>
        </div>

        <div className="relative" ref={dropdownRef}>
          <h3 className="text-[11px] font-[600] text-[#43474F] uppercase tracking-[1.1px] leading-[16.5px] mb-3">Smart Follow-up Timing</h3>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full h-[52px] bg-white border border-[#E2E8F0] rounded-[12px] px-5 flex items-center justify-between text-[#191C1E] font-[500] text-[14px] cursor-pointer hover:bg-gray-50 transition-colors"
          >
            {followUpTiming}
            <ChevronDown size={20} className={`text-[#94A3B8] transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </div>

          {isDropdownOpen && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-[#E2E8F0] rounded-[12px] z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              {options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setFollowUpTiming(option);
                    setIsDropdownOpen(false);
                  }}
                  className={`px-5 py-4 text-[14px] font-[500] cursor-pointer transition-colors ${followUpTiming === option
                    ? 'bg-[#F2F4F6] text-[#004370]'
                    : 'text-[#191C1E] hover:bg-gray-50'
                    }`}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </section> */}

      {/* Footer Navigation Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-8 mt-12 bg-transparent border-t border-slate-100">
        
        {/* Left side — Back button only */}
        <div className="flex items-center w-full sm:w-auto">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 text-[#001E40] font-bold text-[14px] hover:translate-x-[-4px] transition-transform w-full sm:w-auto p-2 cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        {/* Right side — Save as Draft + Launch Campaign */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={onSaveDraft}
            className="border border-[#004370] text-[#004370] font-inter font-semibold text-[13px] px-4 py-2 rounded-[8px] hover:bg-[#EFF4FF] transition-colors cursor-pointer w-full sm:w-auto"
          >
            Save as Draft
          </button>
          <button
            onClick={onLaunch}
            className="flex items-center justify-center gap-2 w-full sm:w-[210px] h-[48px] bg-[#004370] text-white rounded-[6px] font-bold text-[14px] hover:bg-[#003152] transition-all group cursor-pointer"
          >
            Launch Campaign <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default Step3;
