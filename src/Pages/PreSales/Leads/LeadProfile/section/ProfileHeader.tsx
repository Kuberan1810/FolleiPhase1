import Email from "../../../../../assets/socialMediaIcons/Gmail.svg"
import Whatsapp from "../../../../../assets/socialMediaIcons/WhatsApp.svg"
import Messenger from "../../../../../assets/socialMediaIcons/Messenger.svg"
import Calls from "../../../../../assets/socialMediaIcons/Calls.svg"
import { Edit, Global } from "iconsax-react";
import { Flame } from "lucide-react"

const ProfileHeader = () => {
    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white rounded-[20px] p-6 border border-[#EDF3FD]">
            <div className="flex items-center gap-5">
                {/* Avatar */}
                <div className="w-[100px] h-[100px] rounded-[20px] bg-[#E1EDFE] border border-[#EDF3FD] flex items-center justify-center shrink-0">
                    <span className="text-[#131B2E] text-[32px] font-semibold tracking-wide">SM</span>
                </div>

                {/* Lead Info */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-3">
                        <h1 className="md:text-[32px] text-xl font-semibold text-[#131B2E] leading-tight ">
                            Sophia Miller
                        </h1>
                        <div className="flex items-center gap-1 bg-[#B91C1C10] px-2.5 py-1 rounded-lg text-[#DC2626] text-[16px] font-bold">
                            <Flame size={18}  color="currentColor" className="text-[#B91C1C]" fill="#B91C1C"/>
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