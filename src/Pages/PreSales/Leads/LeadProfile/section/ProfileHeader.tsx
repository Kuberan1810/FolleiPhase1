import Email from "../../../../../assets/socialMediaIcons/Gmail.svg"
import Whatsapp from "../../../../../assets/socialMediaIcons/WhatsApp.svg"
import Messenger from "../../../../../assets/socialMediaIcons/Messenger.svg"
import Calls from "../../../../../assets/socialMediaIcons/Calls.svg"
import { Edit, Global } from "iconsax-react";

const ProfileHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-[20px] p-6 border border-[#EDF3FD]">
            <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="w-[100px] h-[100px] rounded-[20px] bg-[#E1EDFE] flex items-center justify-center shrink-0">
                    <span className="text-[#0D1C2E] text-[24px] font-semibold tracking-wide">SM</span>
                </div>

                {/* Lead Info */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                        <h1 className="md:text-[32px] text-xl font-semibold text-[#131B2E] leading-tight ">
                            Sophia Miller
                        </h1>
                        <div className="flex items-center gap-1 bg-[#FEF2F2] px-2 py-0.5 rounded-md text-[#DC2626] text-[11px] font-bold">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame">
                                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                            </svg>
                            Hot
                        </div>
                    </div>

                    <p className="text-[18px] text-[#464555] font-semibold ">
                        Senior Procurement Manager @ ABC Technologies
                    </p>

                    <div className="flex items-center gap-5 mt-1">
                        <div className="flex items-center gap-2.5 text-[16px] font-medium text-[#0B1C30]">
                            <Global className=" text-[#004370]" color="currentColor" size={18} />
                            Website
                        </div>
                        <div className="flex items-center gap-2.5 text-[16px] font-medium text-[#0B1C30]">
                            <Edit className="text-[#004370] " color="currentColor" size={18} />
                            22 Dec, 2025
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 mt-4 sm:mt-0">
                <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <img src={Messenger} alt="Messenger" />

                </button>
                <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <img src={Email} alt="Email" />
                </button>
                <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <img src={Whatsapp} alt="Whatsapp" />

                </button>
                <button className="p-2 rounded-[12px] border border-[#EDF3FD] flex items-center justify-center hover:bg-slate-50 transition-colors">
                    <img src={Calls} alt="Phone-calls" />

                </button>
            </div>
        </div>
    )
}

export default ProfileHeader