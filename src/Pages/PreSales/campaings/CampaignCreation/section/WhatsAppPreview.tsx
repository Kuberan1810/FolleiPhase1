import { ArrowLeft, Video, Phone, MoreVertical, CheckCheck } from 'lucide-react';
import summerBeachBanner from '../../../../../assets/img/summer_beach_banner.jpg';
import FolleiCircle from '../../../../../assets/logo/FolleiCircle.svg';
import wabg from '../../../../../assets/img/wabg.png';

const WhatsAppPreview = () => {
  return (
    <div className="w-full flex justify-center py-4 animate-in fade-in duration-300">
      <div className="w-full max-w-[320px] h-[640px] bg-[#E5DDD5] rounded-[48px] border-[6px] border-[#222222] shadow-2xl relative overflow-hidden flex flex-col shrink-0">

        <div className="bg-[#075E54] text-white pt-7 pb-2.5 px-3 flex items-center justify-between shrink-0 shadow-md">
          <div className="flex items-center gap-1.5">
            <ArrowLeft size={16} className="cursor-pointer" />
            <img src={FolleiCircle} alt="Follei Logo" className="w-8 h-8 rounded-full object-cover bg-white" />
            <div>
              <div className="flex items-center gap-1">
                <p className="font-bold text-[14px] leading-tight">Follei</p>
                <span className="w-3 h-3 bg-[#00E676] rounded-full flex items-center justify-center text-white shrink-0" title="Verified">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2 h-2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </span>
              </div>
              <p className="text-[10px] text-white/80">online</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/90">
            <Video size={15} />
            <Phone size={14} />
            <MoreVertical size={14} />
          </div>
        </div>

        <div
          style={{ backgroundImage: `url(${wabg})` }}
          className="flex-1 p-3 overflow-y-auto flex flex-col justify-start gap-3 relative bg-repeat"
        >
          <div className="self-center bg-[#E1EBF1] text-[#556b72] text-[9px] font-bold px-2 py-0.5 rounded-[6px] select-none shadow-[0_0.5px_0.5px_rgba(0,0,0,0.08)] uppercase tracking-wider">
            TODAY
          </div>

          <div className="max-w-[85%] bg-white rounded-[12px] p-2 self-start shadow-[0_1px_1px_rgba(0,0,0,0.12)] relative">
            <div className="px-1.5 pb-2">
              <p className="text-[#131B2E] text-[12px] leading-normal font-normal">
                Hey <span className="text-[#004370]">{"{{First Name}}"}</span>!  Summer is officially here. We've missed you! Use code <span className="text-[#6FC5FE]">SUMMER20</span> for 20% off your next purchase.
              </p>
            </div>

            <div className="w-full h-[110px] bg-slate-100 rounded-[8px] overflow-hidden mb-1 relative select-none">
              <img
                src={summerBeachBanner}
                alt="Product Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-y-0 right-0 w-[65%] flex items-center justify-center p-2 text-center">
                <h4 className="font-extrabold text-[#333333] text-[9px] leading-tight">
                  Hello <span className="text-[#004370] font-bold">{"{{First Name}}"}</span>. We've missed you in <span className="text-[#004370] font-bold">{"[[City]]"}</span>.
                </h4>
              </div>
            </div>

            <div className="flex justify-end items-center gap-1 px-1.5">
              <span className="text-[9px] text-gray-400 font-medium">12:00 AM</span>
              <CheckCheck size={11} className="text-[#34B7F1]" />
            </div>

            <div className="border-t border-[#F0F2F5] mt-2 pt-2 text-center">
              <button className="text-[#004370] font-bold text-[13px] hover:underline cursor-pointer flex items-center justify-center gap-1 w-full">
                Shop Now
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default WhatsAppPreview;
