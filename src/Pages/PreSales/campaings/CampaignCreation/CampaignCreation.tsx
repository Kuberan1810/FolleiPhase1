import { useState } from 'react';
import { Sparkles, MoreHorizontal, TrendingUp, Plus, Mic, ChevronLeft } from 'lucide-react';
import StarIcon from '../../../../assets/logo/star.svg';


const GmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="21" height="21" viewBox="0 0 48 48">
    <path fill="#4caf50" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"></path><path fill="#1e88e5" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"></path><polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"></polygon><path fill="#c62828" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"></path><path fill="#fbc02d" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"></path>
  </svg>
);

const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 21 21" fill="none">
    <path
      d="M5.5 9.5C5.5 6.9 7.7 5 10.5 5C13.3 5 15.5 6.9 15.5 9.5C15.5 12.1 13.3 14 10.5 14H9.5L7.2 16V13.5C6.1 12.7 5.5 11.2 5.5 9.5Z"
      fill="white"
    />
    <circle cx="8.3" cy="9.5" r="0.8" fill="#0066FF" />
    <circle cx="10.5" cy="9.5" r="0.8" fill="#0066FF" />
    <circle cx="12.7" cy="9.5" r="0.8" fill="#0066FF" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 48 48">
    <path fill="#fff" d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"></path><path fill="#fff" d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"></path><path fill="#cfd8dc" d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"></path><path fill="#40c351" d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"></path><path fill="#fff" fill-rule="evenodd" d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z" clip-rule="evenodd"></path>
  </svg>
);

import { useNavigate } from 'react-router-dom';

const CampaignCreation = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleGenerate = () => {
    navigate('/presales/campaigns/preview', {
      state: { title: prompt.trim() ? prompt : "Summer Collection Win-Back" }
    });
  };

  const suggestions = [
    "Launch our new product",
    "Re-engage inactive customers",
    "Seasonal flash sale for VIPs"
  ];

  const recentCampaigns = [
    {
      title: "Summer Apparel Drop",
      status: "Active",
      statusColor: "bg-[#E0F2FE] text-[#0369A1] border-[#BAE6FD]",
      time: "Created 2 days ago",
      channels: [
        { icon: <GmailIcon key="m" />, },
        { icon: <WhatsAppIcon key="wa" />, bgClass: "bg-[#25D366]" },
        { icon: <MessageIcon key="msg" />, bgClass: "bg-[#0066FF]" }
      ],
      metric: "+8.2% Conv."
    },
    {
      title: "VIP Loyalty Refresh",
      status: "Completed",
      statusColor: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
      time: "Created 32 days ago",
      channels: [
        { icon: <GmailIcon key="m" />, },
        { icon: <WhatsAppIcon key="wa" />, bgClass: "bg-[#25D366]" }
      ],
      metric: "+15.1%"
    },
    {
      title: "Enterprise Webinar Funnel",
      status: "Completed",
      statusColor: "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]",
      time: "Created 12 days ago",
      channels: [
        { icon: <GmailIcon key="m" />, },
        { icon: <WhatsAppIcon key="wa" />, bgClass: "bg-[#25D366]" }
      ],
      metric: "+15% LTV"
    }
  ];

  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <div className="w-full min-h-screen bg-transparent py-6 font-manrope flex flex-col items-center relative">
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-1 rounded-xl transition-all duration-300 hover:bg-[#F1F5F9] text-[#464555] hover:text-[#004370] cursor-pointer group"
        >
          <ChevronLeft size={26} className="transition-transform duration-300 group-hover:-translate-x-1" />
        </button>
      </div>
      <div className="w-full px-4 flex-1 flex flex-col justify-center">
        <div className="flex flex-col items-center justify-center text-center py-8">

          <div className="w-[80px] h-[74px] rounded-[24px] bg-white flex items-center justify-center mb-6 shadow-[0px_1px_8px_0px_#00437040]">
            <img src={StarIcon} className="w-7 h-7" alt="Star Icon" />
          </div>

          <h1 className="w-full max-w-[600px] text-[32px] sm:text-[48px] font-medium text-[#131B2E] leading-tight mb-8">
            What campaign would you like to <span className="text-[#004370] font-bold">Create today?</span>
          </h1>

          <div className="w-full max-w-[820px] bg-white rounded-[16px] border border-[#004370] shadow-[0px_4px_20px_rgba(0,0,0,0.04)] p-3 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 transition-all focus-within:ring-2 focus-within:ring-[#004370]/10 focus-within:border-[#004370]/40">
            <div className="flex items-center flex-1 gap-3">
              <div className='w-[26px] h-[26px] bg-[#EBF5FF] rounded-full flex justify-center items-center cursor-pointer shrink-0'>
                <Plus color="black" size={18} />
              </div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && prompt.trim()) {
                    handleGenerate();
                  }
                }}
                placeholder="Describe your goal, audience, and budget..."
                className="flex-1 bg-transparent border-none text-[#767587] placeholder:text-[#767587] text-[16px] sm:text-[18px] font-medium outline-none min-w-0"
              />
            </div>
            <div className="flex items-center justify-end gap-3.5 pr-2 border-t sm:border-t-0 border-[#EDF3FD] pt-3 sm:pt-0">
              <button className="text-[#464555] hover:text-[#004370] transition-colors cursor-pointer p-1">
                <Mic size={18} />
              </button>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className={`h-[48px] sm:h-[56px] rounded-[14px] px-5 sm:px-6 py-2 sm:py-4 font-semibold text-[15px] sm:text-[16px] flex items-center gap-3 transition-all select-none shrink-0 ${prompt.trim()
                  ? 'bg-[#004370] text-white hover:bg-[#002e62] cursor-pointer'
                  : 'bg-[#E2E8F0] text-gray-400 cursor-not-allowed'
                  }`}
              >
                Generate <Sparkles size={18} />
              </button>
            </div>
          </div>

          {/* Suggestions  */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 border border-[#E2E8F0] hover:border-[#CBD5E1] text-[#131B2E] bg-[#EAEDFF] hover:bg-slate-50 rounded-full transition-colors text-[13px] font-normal cursor-pointer"
              >
                "{suggestion}"
              </button>
            ))}
          </div>

          {/* Recent Campaigns */}
          <div className="w-full text-left">
            <h2 className="text-[20px] font-semibold text-[#131B2E] mb-5 pl-1">Recent Campaigns</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentCampaigns.map((camp, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#94A3B8]/16 rounded-[20px] p-6 flex flex-col justify-between hover:shadow-[0px_8px_20px_rgba(0,0,0,0.05)] transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-0.5 rounded-[6px] text-[11px] font-bold border ${camp.statusColor}`}>
                      {camp.status}
                    </span>
                    <button className="text-[#C7C4D8] cursor-pointer">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-medium text-[#131B2E] text-[16px] leading-[22px] transition-colors">
                      {camp.title}
                    </h3>
                    <p className="text-[#767587] text-[12px] font-normal mt-1">
                      {camp.time}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-0.5">
                      {camp.channels.map((ch, i) => (
                        <div
                          key={i}
                          className={`w-6.5 h-6.5 rounded-full flex items-center justify-center ${ch.bgClass}`}
                        >
                          {ch.icon}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-[#047C2E] text-[13px]">
                      <TrendingUp size={14} />
                      <span>{camp.metric}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default CampaignCreation;
