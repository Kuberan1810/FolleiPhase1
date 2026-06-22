import { useState } from 'react';
import { ArrowLeft, Calendar, Users, TrendingUp, Eye, TagIcon, ChevronDown } from 'lucide-react';
import EmailPreview from './EmailPreview';
import WhatsAppPreview from './WhatsAppPreview';
import StarIcon from '../../../../../assets/logo/star.svg';

const GmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0 0 48 48">
    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0 0 48 48">
    <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
  </svg>
);

const MessageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none">
    <rect width="24" height="24" rx="12" fill="#0066FF" />
    <path
      d="M6.5 11.5C6.5 8.9 8.7 7 11.5 7C14.3 7 16.5 8.9 16.5 11.5C16.5 14.1 14.3 16 11.5 16H10.5L8.2 18V15.5C7.1 14.7 6.5 13.2 6.5 11.5Z"
      fill="white"
    />
    <circle cx="9.3" cy="11.5" r="0.8" fill="#0066FF" />
    <circle cx="11.5" cy="11.5" r="0.8" fill="#0066FF" />
    <circle cx="13.7" cy="11.5" r="0.8" fill="#0066FF" />
  </svg>
);

import { useLocation, useNavigate } from 'react-router-dom';

const CampaignReady = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const campaignTitle = location.state?.title || "Summer Collection Win-Back";
  const onBack = () => navigate(-1);

  const [activeTab, setActiveTab] = useState<'email' | 'whatsapp'>('email');
  const [isEditing, setIsEditing] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'timeline' | 'audience' | 'channels' | 'tone' | null>(null);

  const [timeline, setTimeline] = useState('Today - 01 July, 2026');
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>(['Cold Leads (12,540)']);
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['Mail', 'WhatsApp']);
  const [selectedTones, setSelectedTones] = useState<string[]>(['Premium']);

  const handleToggleAudience = (opt: string) => {
    setSelectedAudiences(prev =>
      prev.includes(opt)
        ? prev.filter(item => item !== opt)
        : [...prev, opt]
    );
  };

  const handleToggleChannel = (opt: string) => {
    setSelectedChannels(prev => {
      const next = prev.includes(opt)
        ? prev.filter(item => item !== opt)
        : [...prev, opt];

      if (opt === 'Mail' && next.includes('WhatsApp') && !next.includes('Mail')) {
        setActiveTab('whatsapp');
      } else if (opt === 'WhatsApp' && next.includes('Mail') && !next.includes('WhatsApp')) {
        setActiveTab('email');
      }

      return next;
    });
  };

  const handleToggleTone = (opt: string) => {
    setSelectedTones(prev =>
      prev.includes(opt)
        ? prev.filter(item => item !== opt)
        : [...prev, opt]
    );
  };

  return (
    <div className="w-full px-4 font-manrope text-left">
      {openDropdown && (
        <div
          className="fixed inset-0 z-20 bg-transparent cursor-default"
          onClick={() => setOpenDropdown(null)}
        />
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-gray-100 pb-3">
        <div>

          <h1 className="text-[28px] sm:text-[32px] font-semibold text-[#131B2E] tracking-tight">
            Campaign Ready
          </h1>
          <p className="text-[#464555] text-[14px]">
            AI analyzed your request and prepared a complete campaign.
          </p>
        </div>

        <div className="w-[165px] flex items-center gap-2 bg-[#FFFFFF] text-[#464555] border border-[#E2E8F0] rounded-full px-3 py-1.5 text-[12px] font-medium sm:self-center">
          <img src={StarIcon} className="w-3 h-3" alt="Star Icon" />
          <span>AI Confidence • 95%</span>
        </div>
      </div>

      <div className="relative bg-white border-[1px] border-[#E2E8F0] rounded-[12px] p-6 sm:p-8 shadow-[0px_4px_20px_rgba(0,0,0,0.02)] mb-8">
        <div className="absolute top-[0px] left-0 right-0 h-[4px] bg-gradient-to-b from-[#004370] to-[#6FC5FE] rounded-t-[12px]"></div>
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-3">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#004370] ">
              Executive Summary
            </span>
            <h2 className="text-[22px] sm:text-[18px] font-semibold text-[#131B2E] mb-1.5">
              {campaignTitle || "Summer Collection Win-Back"}
            </h2>
            <p className="text-[#464555] text-[14px]">
              Objective: Re-engage inactive customers and increase sales.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-0.5 text-left sm:text-right shrink-0 mb-10">
            <div className="flex items-center gap-1.5 text-[#047C2E] bg-[#EFFFF5] px-2 py-1 rounded-[10px]">
              <span className="w-2 h-2 rounded-full bg-[#047C2E]"></span>
              <span className="text-[11px] font-medium text-[#047C2E]">Ready to Launch</span>
            </div>
            <p className="text-[13px] text-[#767587] mt-0.5">Generated in 4 seconds</p>
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#EDF3FA] rounded-[16px] p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-4">
          <div className="flex flex-col gap-1.5 text-left select-none">
            <span className="text-[12px] font-bold text-[#464555] uppercase tracking-wider">Timeline</span>
            {isEditing ? (
              <div className={`relative w-full ${openDropdown === 'timeline' ? 'z-30' : ''}`}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'timeline' ? null : 'timeline')}
                  className={`w-full flex items-center justify-between border rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#334155] cursor-pointer min-h-[38px] transition-all ${openDropdown === 'timeline'
                    ? 'bg-white border-[#004370] ring-1 ring-[#004370]/10'
                    : 'bg-[#F8FAFC] border-[#EBF4FF] hover:border-[#CBD5E1] hover:bg-[#F1F5F9]'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#004370]" />
                    <span className="truncate">{timeline}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-[#64748B] shrink-0 transition-transform duration-200 ${openDropdown === 'timeline' ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {openDropdown === 'timeline' && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded-[8px] shadow-lg z-30 py-1 max-h-[150px] overflow-y-auto">
                    {['Today - 01 July, 2026', 'Today - 15 July, 2026', 'Today - 31 July, 2026'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setTimeline(opt);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-2 text-[13px] transition-colors cursor-pointer ${timeline === opt
                          ? 'bg-[#F8FAFC] font-semibold text-[#004370]'
                          : 'hover:bg-slate-50 text-[#334155]'
                          }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#EFF6FF] text-[#004370] rounded-[8px] flex items-center justify-center shrink-0">
                  <Calendar size={15} />
                </div>
                <span className="text-[#334155] font-medium text-[15px]">{timeline}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-left select-none">
            <span className="text-[12px] font-bold text-[#464555] uppercase tracking-wider">Target Audience</span>
            {isEditing ? (
              <div className={`relative w-full ${openDropdown === 'audience' ? 'z-30' : ''}`}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'audience' ? null : 'audience')}
                  className={`w-full flex items-center justify-between border rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#334155] cursor-pointer min-h-[38px] transition-all ${openDropdown === 'audience'
                    ? 'bg-white border-[#004370] ring-1 ring-[#004370]/10'
                    : 'bg-[#F8FAFC] border-[#EBF4FF] hover:border-[#CBD5E1] hover:bg-[#F1F5F9]'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-[#004370]" />
                    <span className="truncate">{selectedAudiences.join(', ') || 'Select Audience'}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-[#64748B] shrink-0 transition-transform duration-200 ${openDropdown === 'audience' ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {openDropdown === 'audience' && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg z-30 py-1 max-h-[180px] overflow-y-auto">
                    {['Hot Leads (24,345)', 'Warm Leads (19,678)', 'Cold Leads (12,540)'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleToggleAudience(opt)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] hover:bg-slate-50 text-[#334155] transition-colors cursor-pointer text-left"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${selectedAudiences.includes(opt) ? 'bg-[#004370] border-[#004370]' : 'border-[#CBD5E1] bg-white'
                          }`}>
                          {selectedAudiences.includes(opt) && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`font-medium ${selectedAudiences.includes(opt) ? 'text-[#004370]' : 'text-[#334155]'}`}>{opt}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#EFF6FF] text-[#004370] rounded-[8px] flex items-center justify-center shrink-0">
                  <Users size={15} />
                </div>
                <span className="text-[#334155] font-medium text-[15px]">{selectedAudiences.join(', ') || 'None'}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-left select-none">
            <span className="text-[12px] font-bold text-[#464555] uppercase tracking-wider">Preferred Channels</span>
            {isEditing ? (
              <div className={`relative w-full ${openDropdown === 'channels' ? 'z-30' : ''}`}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'channels' ? null : 'channels')}
                  className={`w-full flex items-center justify-between border rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#334155] cursor-pointer min-h-[38px] transition-all ${openDropdown === 'channels'
                    ? 'bg-white border-[#004370] ring-1 ring-[#004370]/10'
                    : 'bg-[#F8FAFC] border-[#EBF4FF] hover:border-[#CBD5E1] hover:bg-[#F1F5F9]'
                    }`}
                >
                  <div className="flex items-center gap-2 min-h-[22px]">
                    {selectedChannels.length > 0 ? (
                      <div className="flex items-center gap-1.5">
                        {selectedChannels.includes('Mail') && <GmailIcon />}
                        {selectedChannels.includes('WhatsApp') && <WhatsAppIcon />}
                        {selectedChannels.includes('Message') && <MessageIcon />}
                      </div>
                    ) : (
                      <span className="text-gray-400">Select Channels</span>
                    )}
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-[#64748B] shrink-0 transition-transform duration-200 ${openDropdown === 'channels' ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {openDropdown === 'channels' && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#EBF4FF] rounded-[8px] z-30 py-1">
                    {['Mail', 'WhatsApp', 'Message'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleToggleChannel(opt)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] hover:bg-slate-50 text-[#334155] transition-colors cursor-pointer text-left"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${selectedChannels.includes(opt) ? 'bg-[#004370] border-[#004370]' : 'border-[#CBD5E1] bg-white'
                          }`}>
                          {selectedChannels.includes(opt) && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {opt === 'Mail' && <GmailIcon />}
                          {opt === 'WhatsApp' && <WhatsAppIcon />}
                          {opt === 'Message' && <MessageIcon />}
                          <span className={`font-medium ${selectedChannels.includes(opt) ? 'text-[#004370]' : 'text-[#334155]'}`}>{opt}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 pt-1.5">
                {selectedChannels.includes('Mail') && <GmailIcon />}
                {selectedChannels.includes('WhatsApp') && <WhatsAppIcon />}
                {selectedChannels.includes('Message') && <MessageIcon />}
                {selectedChannels.length === 0 && <span className="text-[#94A3B8] text-[14px]">None selected</span>}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1.5 text-left select-none">
            <span className="text-[12px] font-bold text-[#464555] uppercase tracking-wider">Tone</span>
            {isEditing ? (
              <div className={`relative w-full ${openDropdown === 'tone' ? 'z-30' : ''}`}>
                <button
                  onClick={() => setOpenDropdown(openDropdown === 'tone' ? null : 'tone')}
                  className={`w-full flex items-center justify-between border rounded-[10px] px-3 py-2 text-[13px] font-medium text-[#334155] cursor-pointer min-h-[38px] transition-all ${openDropdown === 'tone'
                    ? 'bg-white border-[#004370] ring-1 ring-[#004370]/10'
                    : 'bg-[#F8FAFC] border-[#EBF4FF] hover:border-[#CBD5E1] hover:bg-[#F1F5F9]'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <TagIcon size={14} className="text-[#004370]" />
                    <span className="truncate">{selectedTones.join(', ') || 'Select Tone'}</span>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-[#64748B] shrink-0 transition-transform duration-200 ${openDropdown === 'tone' ? 'rotate-180' : ''
                      }`}
                  />
                </button>
                {openDropdown === 'tone' && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#E2E8F0] rounded-[8px] shadow-lg z-30 py-1 max-h-[180px] overflow-y-auto">
                    {['Professional', 'Friendly', 'Personalized', 'Premium'].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleToggleTone(opt)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[13px] hover:bg-slate-50 text-[#334155] transition-colors cursor-pointer text-left"
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors shrink-0 ${selectedTones.includes(opt) ? 'bg-[#004370] border-[#004370]' : 'border-[#CBD5E1] bg-white'
                          }`}>
                          {selectedTones.includes(opt) && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className={`font-medium ${selectedTones.includes(opt) ? 'text-[#004370]' : 'text-[#334155]'}`}>{opt}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#EFF6FF] text-[#004370] rounded-[8px] flex items-center justify-center shrink-0">
                  <TagIcon size={15} color='currentColor' />
                </div>
                <span className="text-[#334155] font-medium text-[15px]">{selectedTones.join(', ') || 'None'}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-3">
        <div>
          <h3 className="text-[18px] font-semibold text-[#131B2E] flex items-center gap-2">
            <Eye size={22} className="text-[#004370]" /> Campaign Preview
          </h3>
          <p className="text-[#767587] text-[14px] mt-0.5">Review how your message appears across channels.</p>
        </div>

        <div className="flex bg-[#E9ECF1] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.08)] border border-[#E2E8F0] p-1 rounded-lg w-fit shrink-0 self-end sm:self-auto">
          {selectedChannels.includes('Mail') && (
            <button
              onClick={() => setActiveTab('email')}
              className={`w-[32px] h-[32px] rounded-md flex items-center justify-center transition-all cursor-pointer ${activeTab === 'email'
                ? 'bg-white border border-[#E2E8F0]'
                : 'border border-transparent opacity-40'
                }`}
              title="Email Preview"
            >
              <GmailIcon />
            </button>
          )}
          {selectedChannels.includes('WhatsApp') && (
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`w-[32px] h-[32px] rounded-md flex items-center justify-center transition-all cursor-pointer ${activeTab === 'whatsapp'
                ? 'bg-white border border-[#E2E8F0]'
                : 'border border-transparent opacity-40'
                }`}
              title="WhatsApp Preview"
            >
              <WhatsAppIcon />
            </button>
          )}
        </div>
      </div>

      {activeTab === 'email' && selectedChannels.includes('Mail') ? (
        <div className="p-6 bg-white border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-[0px_1px_8px_0px_#00437040] mb-8 text-left">
          <EmailPreview />
        </div>
      ) : activeTab === 'whatsapp' && selectedChannels.includes('WhatsApp') ? (
        <div className="mb-8 text-left">
          <WhatsAppPreview />
        </div>
      ) : (
        <div className="p-12 text-center bg-white border border-[#E2E8F0] rounded-[24px] mb-8 text-[#767587]">
          Select email or whatsapp channel above to preview the campaign content.
        </div>
      )}


      <div className="p-6 bg-white rounded-[12px] border border-[#E2E8F0]">
        <h3 className="text-[18px] font-semibold text-[#131B2E] pb-4">
          Predicted Results
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#FBFDFF] border border-[#E7F0FD] p-5 rounded-[16px] flex flex-col justify-between">
            <div className="flex justify-between items-start gap-2">
              <p className="text-[11px] font-semibold text-[#767587] uppercase tracking-wider">OPEN RATE</p>
              <span className="text-[11px] text-[#10B981] flex items-center gap-0.5 font-medium shrink-0">
                <TrendingUp size={12} /> +12% vs avg
              </span>
            </div>
            <div className="mt-6">
              <span className="text-[28px] font-bold text-[#131B2E] leading-none">42%</span>
            </div>
          </div>

          <div className="bg-[#FBFDFF] border border-[#E7F0FD] p-5 rounded-[16px] flex flex-col justify-between">
            <div className="flex justify-between items-start gap-2">
              <p className="text-[11px] font-semibold text-[#767587] uppercase tracking-wider">Click-Through Rate (CTR)</p>
              <span className="text-[11px] text-[#10B981] flex items-center gap-0.5 font-medium shrink-0">
                <TrendingUp size={12} /> +3% vs avg
              </span>
            </div>
            <div className="mt-6">
              <span className="text-[28px] font-bold text-[#131B2E] leading-none">11%</span>
            </div>
          </div>

          <div className="bg-[#FBFDFF] border border-[#E7F0FD] p-5 rounded-[16px] flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#767587] uppercase tracking-wider">EST. REVENUE</p>
            </div>
            <div className="mt-6">
              <span className="text-[28px] font-bold text-[#131B2E] leading-none">₹4.2L</span>
              <p className="text-[11px] text-[#767587] mt-1">Based on past behaviors</p>
            </div>
          </div>

          <div className="bg-[#FBFDFF] border border-[#E7F0FD] p-5 rounded-[16px] flex flex-col justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[#767587] uppercase tracking-wider">CONFIDENCE</p>
              <span className="text-[28px] font-bold text-[#131B2E] leading-none mt-2 block">95%</span>
            </div>
            <div className="w-full bg-[#E2E8F0] h-[6px] rounded-full mt-4 overflow-hidden">
              <div className="bg-[#004370] h-full rounded-full w-[95%]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between pt-8 pb-4 gap-4 border-t border-[#EDF3FD] mt-8">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-1.5 px-6 py-2.5 text-[#464555] hover:text-[#004370] font-bold text-[14px] transition-colors cursor-pointer bg-white order-2 sm:order-1 border sm:border-0 border-[#E2E8F0] rounded-[12px]"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-3 order-1 sm:order-2">
          <button
            onClick={() => {
              setIsEditing(!isEditing);
              setOpenDropdown(null);
            }}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 border font-semibold text-[14px] rounded-[12px] transition-colors cursor-pointer ${isEditing ? 'bg-[#E1DFFF] border-[#004370] text-[#004370]' : 'border-[#E2E8F0] hover:bg-slate-50 text-[#131B2E]'
              }`}
          >
            {isEditing ? 'Save' : 'Edit'}
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 sm:px-8 py-2.5 bg-[#004370] hover:bg-[#002e62] text-white font-semibold sm:font-bold text-[14px] sm:text-[16px] rounded-[12px] transition-colors cursor-pointer shadow-sm whitespace-nowrap">
            Launch Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignReady;
